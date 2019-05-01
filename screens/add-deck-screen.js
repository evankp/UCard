import React from 'react'
import {Text, TouchableOpacity, Platform, Modal} from 'react-native'
import {Icon} from 'expo'
import {ScreenContainer, Heading, TextInput, CardBox, Button} from '../styles/common-styles'

import * as colors from '../utils/colors'
import {generateID} from '../utils/helpers'
import CardList from '../components/card-list'

export default class AddDeckScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        cards: [{key: generateID(), title: '', answer: ''}, {key: generateID(), title: '', answer: ''}]
    };

    inputChange = e => {

    };

    deleteCard = key => {
        this.setState(state => ({
            cards: state.cards.filter(card => card.key !== key)
        }))
    };

    addCard = () => {
        this.setState(state => ({
            cards: [...state.cards, {key: generateID(), title: '', answer: ''}]
        }))
    };

    editCard = (index, key, value) => {
        this.setState(state => {
            return ({
                cards: state.cards.map((card, i) => i === index ? {...card, [key]: value} : card)
            })
        })
    };

    render() {
        const cardFunctions = {
            deleteCard: this.deleteCard,
            addCard: this.addCard,
            editCard: this.editCard
        };

        return (
            <ScreenContainer centerHorizontal>
                <CardBox>
                    <Heading type="h2">Deck Info</Heading>
                    <TextInput placeholder="Deck title, subject, etc."
                               onChangeText={this.inputChange}
                    />
                </CardBox>

                <CardList cards={this.state.cards} {...cardFunctions}/>

                <Button onPress={() => this.addCard()}
                        type="secondary"
                        color={colors.main.regular}>
                    Add Card
                </Button>
            </ScreenContainer>
        )
    }
}