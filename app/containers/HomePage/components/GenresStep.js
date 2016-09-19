import React, {Component, PropTypes} from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { List } from 'immutable';
import messages from '../messages';
import genreStrings from '../genreStrings';
import Button from 'components/Button';


class GenresStep extends Component {
    render() {
        const {genres} = this.props;

        return (
            <div>
                <div>
                    <FormattedMessage {...messages.genres} />                
                </div>
                {genres.map(genre => (
                    <Button key={genre.get('value')} onClick={() => this.props.toggleGenre(genre)}>
                        <div>{genre.get('value')}</div>
                        {genre.get('selected') ? <span> ok</span> : ''}
                    </Button>
                ))}
                <Button handleRoute={this.props.onNextStep}>
                    <FormattedMessage {...messages.next} />
                </Button>           
            </div>
        );
    }
}

export default GenresStep;