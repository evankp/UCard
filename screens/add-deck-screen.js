import React from 'react'
import {ScreenContainer, Heading, TextInput, CardBox, Button} from '../styles/common-styles'
import {connect} from 'react-redux'

import * as colors from '../utils/colors'
import {generateID} from '../utils/helpers'
import CardList from '../components/card-list'
import {addDeck, clearStorage} from "../utils/async-storage";
import {submitDeck} from "../redux/actions";

class AddDeckScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        id: generateID(),
        cards: [{key: generateID(), title: '', answer: ''}, {key: generateID(), title: '', answer: ''}],
        title: ''
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

    submitDeck = () => {
        // Add deck to store
        this.props.dispatch(submitDeck(this.state));

        // Reset screen to get ready for another deck to be added if needed
        this.setState({
            id: generateID(),
            cards: [{key: generateID(), title: '', answer: ''}, {key: generateID(), title: '', answer: ''}],
            title: ''
        });

        // Navigate to home screen
        this.props.navigation.navigate('Home', {refresh: false})
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
                               value={this.state.title}
                               onChangeText={value => this.setState(() => ({
                                   title: value
                               }))}
                               style={{marginBottom: 20}}
                    />
                    <Button onPress={() => this.addCard()}
                            type="tertiary"
                            color={colors.main.regular}>
                        Add Card
                    </Button>
                </CardBox>

                <CardList cards={this.state.cards} {...cardFunctions}/>
                <Button onPress={this.submitDeck} type="primary" color={colors.main.regular}>
                    Add Deck
                </Button>
            </ScreenContainer>
        )
    }
}

export default connect()(AddDeckScreen)
