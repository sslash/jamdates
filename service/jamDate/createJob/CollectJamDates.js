const bindAll = require('lodash/bindAll');
const faker = require('faker');
const uuid = require('uuid');
const GUITARIST = 4;
const GUITARIST_ONE = 'GTR1';
const GUITARIST_TWO = 'GTR2';

class CollectJamDates {
    constructor(genreBuckets) {
        this.genreBuckets = genreBuckets;
        bindAll(this, 'collect', 'createNewGroup');
    }

    createNewGroup() {
        return {
            groupName: faker.commerce.productName() + '-' + uuid.v1(),
        };
    }

    collect() {
        const jamGroups = [];

        // For each genre
        for (const genreBucket of this.genreBuckets.keys()) {
            // for each instrumentalist in this genre
            console.log('These ppl want to play rap:', this.genreBuckets.get(genreBucket));

            this.genreBuckets.get(genreBucket).forEach((instrumentalist) => {

                const instrument_id = instrumentalist.instrument_id;

                // find a jamgroup that lacks an instrumentalist
                const availableGroups = jamGroups.filter((jamGroup) => {
                    
                    // special case for guitarists. Important that the if's are nested.
                    if (instrument_id === GUITARIST) {

                        // Because they have a different keys in the group. 
                        // All others have their instrument key as key
                        if (!jamGroup[GUITARIST_ONE] || !jamGroup[GUITARIST_TWO]) {
                            return true;
                        } else {
                            return false;
                        }
                    }


                    // a group has no instrumentalist. (of this kind)
                    else if (!jamGroup[instrument_id]) {
                        return true;
                    }

                    else {
                        return false;
                    }

                });

                // create a new group, or add to existing
                const selectedGroup = availableGroups.length ?
                    availableGroups[0] : this.createNewGroup();


                // adding a guitarist
                if (instrument_id === GUITARIST) {
                    if (!selectedGroup[GUITARIST_ONE]) {
                        selectedGroup[GUITARIST_ONE] = instrumentalist;
                    } else if (!selectedGroup[GUITARIST_TWO]) {
                        selectedGroup[GUITARIST_TWO] = instrumentalist;
                    }

                // adding a "normal" instrumentalist
                } else {
                    selectedGroup[instrument_id] = instrumentalist;
                }

                // if we created a new group, add it
                if (!availableGroups.length) {
                    jamGroups.push(selectedGroup);
                }
            });

            return jamGroups;
        }
    }
}

module.exports = CollectJamDates;
