import React, {Component, PropTypes} from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { List } from 'immutable';
import messages from '../messages';
import instrumentStrings from '../instrumentStrings';
import Button from 'components/Button';


class InstrumentStep extends Component {
    render() {
        const {instruments} = this.props;

        return (
            <div>
                <div>
                    <FormattedMessage {...messages.selectInstruments} />                
                </div>
                {instruments.map(instrument => (
                    <Button key={instrument.get('value')} onClick={() => this.props.toggleInstrument(instrument)}>
                        <FormattedMessage {...instrumentStrings[instrument.get('value')]} />
                        {instrument.get('selected') ? <span> ok</span> : ''}
                    </Button>
                ))}
                <Button handleRoute={this.props.onNextStep}>
                    <FormattedMessage {...messages.next} />
                </Button>           
            </div>
        );
    }
}

export default InstrumentStep;