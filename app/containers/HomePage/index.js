/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import Modal from 'components/Modal/Modal';

import messages from './messages';

import DateSetupManager from './components/DateSetupManager';

import { fetchInstruments, fetchGenres } from './actions';

import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.css';

export class HomePage extends React.Component {

    state = {
        registerClicked: false,
    };

    componentDidMount() {
        this.props.fetchInstruments();
        this.props.fetchGenres();
    }
    /**
     * Changes the route
     *
     * @param  {string} route The route we want to go to
     */
    openRoute = (route) => {
        this.props.changeRoute(route);
    };

    onGetStarted = () => {
        this.setState({ registerClicked: true });
    };

    onFinished = () => {
        this.setState({ registerClicked: false });
    }

    renderModal() {
        if (this.state.registerClicked) {
            return <Modal><DateSetupManager onFinished={this.onFinished} /></Modal>;
        }
    }

    render() {
        return (
            <article>
                <Helmet
                  title="Home Page"
                  meta={[
                        { name: 'description', content: 'A React.js Boilerplate application homepage' },
                    ]}
                />
                <div>
                    <section className={`${styles.textSection} ${styles.centered}`}>
                        <H2>
                            <FormattedMessage {...messages.startProjectHeader} />
                        </H2>
                        <p>
                            <FormattedMessage {...messages.startProjectMessage} />
                        </p>
                    </section>
                    <section className={styles.textSection}>
                        <H2>
                            <FormattedMessage {...messages.trymeHeader} />
                        </H2>
                        {this.renderModal() }
                    </section>
                    <Button handleRoute={this.onGetStarted}>
                        <FormattedMessage {...messages.getStarted} />
                    </Button>
                </div>
            </article>
        );
    }
}

HomePage.propTypes = {
    changeRoute: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        fetchInstruments: () => dispatch(fetchInstruments()),
        changeRoute: (url) => dispatch(push(url)),
        fetchGenres: () => dispatch(fetchGenres()),
    };
}

const mapStateToProps = () => ({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
