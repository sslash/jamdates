import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IntroStep from './IntroStep';
import InstrumentStep from './InstrumentStep';
import GenresStep from './GenresStep';
import SkillStep from './SkillStep';
import FinalsStep from './FinalsStep';
import ShareStep from './ShareStep';
import { toggleInstrument, toggleGenre, selectSkill, registerContactInfo } from '../actions';


const INTRO = 1;
const INSTRUMENT = 2;
const GENRES = 3;
const SKILL = 4;
const FINALS = 5;
const SHARE = 6;

class DateSetupManager extends Component {

  state = {
      step: INTRO,
    }

  onNextStep = () => {
      const nextStep = this.state.step + 1;

      if (nextStep > SHARE) {
          this.props.onFinished();
      } else {
        this.setState({ step:  nextStep });          
      }
  }

  onSelectSkill = (skillLevel) => {
      this.onNextStep();
      this.props.selectSkill(skillLevel);
  }

  registerContactInfo = (data) => {
      this.onNextStep();
      this.props.registerContactInfo(data);
  }

  renderState() {
      const props = {
          onNextStep: this.onNextStep,
        };

      switch (this.state.step) {
          case INTRO:

            return <IntroStep {...props} />;

          case INSTRUMENT:

            return (
                    <InstrumentStep
                      {...props}
                      instruments={this.props.instruments}
                      toggleInstrument={this.props.toggleInstrument}
                    />
                );

          case GENRES:

            return (
                    <GenresStep
                      {...props}
                      genres={this.props.genres}
                      toggleGenre={this.props.toggleGenre}
                    />
                );

          case SKILL:

            return <SkillStep {...props} selectSkill={this.onSelectSkill} />;

          case FINALS:

            return <FinalsStep {...props} registerContactInfo={this.registerContactInfo} />;

            case SHARE:

            return <ShareStep {...props} />;


          default:
            return null;
        }
    }

  render() {
      return (
            <div>
                {this.renderState()}
            </div>
        );
    }
}

DateSetupManager.propTypes = {
  onNextStep: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    toggleInstrument: (instrument) => dispatch(toggleInstrument(instrument.get('value'))),
    toggleGenre: (genre) => dispatch(toggleGenre(genre.get('value'))),
    selectSkill: (skillLevel) => dispatch(selectSkill(skillLevel)),
    registerContactInfo: (data) => dispatch(registerContactInfo(data))
  };
}

const mapStateToProps = (state) => ({
  instruments: state.getIn(['home', 'instruments']),
  genres: state.getIn(['home', 'genres']),
  user: state.getIn(['home', 'user'])
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(DateSetupManager);
