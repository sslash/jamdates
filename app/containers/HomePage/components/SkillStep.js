import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import Button from 'components/Button';

const BEGINNER = 1;
const MID_LEVEL = 10;
const SKILLED = 20;
const PROFESSIONAL = 30;


class SkillStep extends Component {
  render() {
    return (
            <div>
              <div>
                  <FormattedMessage {...messages.selectSkill} />
              </div>
              <Button handleRoute={() => this.props.selectSkill(BEGINNER)}>
                  <FormattedMessage {...messages.beginner} />
              </Button>
              <Button handleRoute={() => this.props.selectSkill(MID_LEVEL)}>
                  <FormattedMessage {...messages.midLevel} />
              </Button>
              <Button handleRoute={() => this.props.selectSkill(SKILLED)}>
                  <FormattedMessage {...messages.skilled} />
              </Button>
              <Button handleRoute={() => this.props.selectSkill(PROFESSIONAL)}>
                  <FormattedMessage {...messages.professional} />
              </Button>
            </div>
        );
  }
}

SkillStep.propTypes = {
  selectSkill: PropTypes.func,
};

export default SkillStep;
