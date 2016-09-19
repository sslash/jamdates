import React, {Component, PropTypes} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import Button from 'components/Button';


class ShareStep extends Component {

    render() {
        return (
            <div>
                <div>
                    <FormattedMessage {...messages.share} />
                </div>
                
                <a href="#TODO">TODO URL</a>
                
                <Button handleRoute={this.props.onNextStep}>
                    <FormattedMessage {...messages.next} />
                </Button>
            </div>
        );
    }
}

ShareStep.propTypes = {
    onNextStep: PropTypes.func,
};

export default ShareStep;