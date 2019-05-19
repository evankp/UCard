import React from 'react'
import {ScreenContainer, Heading, TextInput, CardBox, Button} from '../styles/common-styles'
import {connect} from 'react-redux'

import * as colors from '../utils/colors'
import {generateID} from '../utils/helpers'
import {submitDeck} from "../redux/actions";

class AddDeckScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        id: generateID(),
        cards: [],
        title: ''
    };

    submitDeck = () => {
        // Add deck to store
        this.props.dispatch(submitDeck(this.state));

        // Separate id from state for later
        const newDeckId = this.state.id;

        // Reset screen to get ready for another deck to be added if needed
        this.setState({
            id: generateID(),
            cards: [],
            title: ''
        });

        // Navigate to the new deck screen
        this.props.navigation.navigate('Deck', {id: newDeckId})
    };

    render() {

        return (
            <ScreenContainer center>
                <CardBox>
                    <Heading type="h2">Deck Info</Heading>
                    {/* Deck title text input */}
                    <TextInput placeholder="Deck title, subject, etc."
                               value={this.state.title}
                               onChangeText={value => this.setState(() => ({
                                   title: value
                               }))}
                               style={{marginBottom: 20}}
                    />
                </CardBox>

                <Button onPress={this.submitDeck} type="primary" color={colors.main.regular}>
                    Add Deck
                </Button>
            </ScreenContainer>
        )
    }
}

export default connect()(AddDeckScreen)
