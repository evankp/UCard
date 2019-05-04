import React from 'react'
import {Text, View} from "react-native";

import {getDeck} from "../utils/async-storage";
import {Button, ScreenContainer, CardBox} from '../styles/common-styles'
import * as colors from '../utils/colors'

export default class DeckScreen extends React.Component {
    static navigationOptions = {};

    state = {
        deckInfo: {
            id: 0,
            title: '',
            cards: []
        }
    };

    componentDidMount() {
        getDeck(this.props.navigation.state.params.id)
            .then(deck => this.setState({deckInfo: deck}))
            .catch(err => console.log(err))
    };

    render() {
        const {title} = this.state.deckInfo;
        const numCards = this.state.deckInfo.cards.length;

        return (
            <ScreenContainer center>
                <CardBox style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 50}}>{title}</Text>
                    <Text style={{fontSize: 20, marginBottom: 30}}>{numCards} Cards</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Button onPress={() => console.log('Add Card Pressed')} type="secondary" color={colors.grey}
                                style={{width: 100}}>
                            Add Card
                        </Button>
                        <Button onPress={() => console.log('Start Pressed')} type="primary" color={colors.main.regular}
                                style={{width: 100}}>
                            Start
                        </Button>
                    </View>
                </CardBox>
            </ScreenContainer>
        )
    }
}