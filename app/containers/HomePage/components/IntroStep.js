import React, {Component, PropTypes} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import Button from 'components/Button';


class IntroStep extends Component {
    render() {
        return (
            <div>
                <div>
                    <FormattedMessage {...messages.intro} />                
                </div>
                <Button handleRoute={this.props.onNextStep}>
                    <FormattedMessage {...messages.next} />
                </Button>               
            </div>
        );
    }
}

IntroStep.propTypes = {
    onNextStep: PropTypes.func,
};

export default IntroStep;