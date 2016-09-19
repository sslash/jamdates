import React, {Component, PropTypes} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import Button from 'components/Button';


class FinalsStep extends Component {

    registerContactInfo = () => {
        const data = {
            email: this.email.value,
            name: this.username.value,
        };

        if (!data) { return alert('Please enter an email address and name, so we can contact you when we have gathered a group'); }

        this.props.registerContactInfo(data);
    }

    render() {
        return (
            <div>
                <div>
                    <FormattedMessage {...messages.finalMessage} />
                </div>
                <div>
                    <FormattedMessage {...messages.finalMessage2} />
                </div>
                <div>
                    <FormattedMessage {...messages.finalMessage3} />
                </div>

                <input placeholder="Your email" type="email" ref={ref => this.email = ref} />
                <input placeholder="Your username" type="text" ref={ref => this.username = ref} />
                
                <Button handleRoute={this.registerContactInfo}>
                    <FormattedMessage {...messages.next} />
                </Button>
            </div>
        );
    }
}

FinalsStep.propTypes = {
    registerContactInfo: PropTypes.func,
};

export default FinalsStep;