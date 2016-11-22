require('better-log/install');
const { expect } = require('chai');
const CollectJamDates = require('../../../../service/jamDate/createJob/CollectjamDates');

const {
    // instrumentalists
    guitarists,
    bassPlayers,
    drummers,
    keyers,

    // geners
    rap,
    eighties,
    metal,
    pop,
    blues,
} = require('./fixture');

describe('Collect jam dates', () => {
    it ('should create a rap group', () => {
        /*
         * genreBuckets: {
         *      rap: [ {email: 'sap@mail.com', instrumentId: 10},{email: 'sap@mail.com', instrumentId: 11},{email: 'sap@mail.com', instrumentId: 12} ],
         *      metal: [ {email: 'sap4@mail.com', instrumentId: 11},{email: 'sa77p@mail.com', instrumentId: 11},{email: 'sapj@mail.com', instrumentId: 12} ],
         * }
         * 
         */ 
        const genreBuckets = new Map();
        
        const rapBucket = guitarists.slice(0, 3).concat(
            bassPlayers.slice(1, 4)).concat(
            drummers.slice(2, 5)).concat(
            keyers.slice(3, 7));

        genreBuckets.set(rap, rapBucket);

        const jamGroups = new CollectJamDates(genreBuckets).collect();

        jamGroups.forEach(jamGroup => {
            console.log('\n');
            Object.keys(jamGroup).forEach(k => {
                console.log(`[${k}]     `, jamGroup[k]);
            })
        });
    });

    it ('should create a rap, and a blues group', () => {

        // TODO: duno if this test works. so test it

        /*
         * genreBuckets: {
         *      rap: [ {email: 'sap@mail.com', instrumentId: 10},{email: 'sap@mail.com', instrumentId: 11},{email: 'sap@mail.com', instrumentId: 12} ],
         *      metal: [ {email: 'sap4@mail.com', instrumentId: 11},{email: 'sa77p@mail.com', instrumentId: 11},{email: 'sapj@mail.com', instrumentId: 12} ],
         * }
         * 
         */ 
        const genreBuckets = new Map();
        
        const rapBucket = guitarists.slice(0, 3).concat(
            bassPlayers.slice(1, 4)).concat(
            drummers.slice(2, 5)).concat(
            keyers.slice(3, 7));
        
        const bluesBucket = guitarists.slice(0, 1).concat(
            bassPlayers.slice(4, 7)).concat(
            drummers.slice(2, 8)).concat(
            keyers.slice(6, 9));

        genreBuckets.set(rap, rapBucket);
        genreBuckets.set(blues, bluesBucket);

        const jamGroups = new CollectJamDates(genreBuckets).collect();

        jamGroups.forEach(jamGroup => {
            console.log('\n');
            Object.keys(jamGroup).forEach(k => {
                console.log(`[${k}]     `, jamGroup[k]);
            })
        });
    });

    // TODO: make sure buckets are (in CreateJamDatesService) created like this.
    // then do a new function: for every jamgroup that is complete,
    // create a new jamgroup instance and set state to pending.
    // send email to all participants and schedule a time for them.
    // set user_jam_participation status to in-active. Make sure 
    // in-active's arent included when we try to create jam groups (think I forgot that part) 
});
