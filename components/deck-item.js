import React from 'react';
import {View} from "react-native";
import {Heading} from '../styles/common-styles';
import Styled from 'styled-components';
import WithTouchable from '../components/with-touchable';
import * as colors from '../utils/colors';
import PropTypes from 'prop-types';

const Deck = Styled(View)`
    width: 100%;
    padding: 30px;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
    margin-bottom: 10px;
`;

export default class DeckItem extends React.Component {
    static propTypes = {
        deck: PropTypes.object.isRequired
    };

    render() {
        const {title, id} = this.props.deck;
        const numCards = this.props.deck.cards.length;

        return (
            <WithTouchable onPress={() => this.props.navigate('Deck', {id})}>
                <Deck>
                    <Heading type='h3'>{title}</Heading>
                    <Heading>{numCards} Cards</Heading>
                </Deck>
            </WithTouchable>
        )
    }
}
