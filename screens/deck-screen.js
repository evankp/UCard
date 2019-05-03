import React from 'react'
import {Text} from "react-native";

import {getDeck} from "../utils/async-storage";
import {ScreenContainer} from '../styles/common-styles'

export default class DeckScreen extends React.Component {
    static navigationOptions = {
    };

    state = {
      deckInfo: {}
    };

    componentDidMount() {
        getDeck(this.props.navigation.state.params.id)
            .then(deck => console.log(deck))
            // .then(deck => this.setState({deckInfo: deck}))
            .catch(err => console.log(err))
    };

    render() {
        // const {title} = this.state.deckInfo;

        return (
            <ScreenContainer centerHorizontal>
                <Text>{'placeholder'}</Text>
            </ScreenContainer>
        )
    }
}