import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Toast from 'react-native-easy-toast';

import {ScreenContainer, CardBox, Button, Heading} from '../styles/common-styles';
import * as colors from '../utils/colors';

class QuestionScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `Quiz - Question ${navigation.state.params.question.number}/${navigation.state.params.deck.cards.length}`
        }
    };

    constructor(props) {
        super(props);
        this.toast = React.createRef()
    }

    correctGuesses = 0;

    submitGuess = (guess) => {
        const {navigation} = this.props;
        let params = navigation.state.params;

        // If correct increase correct count
        if (guess === this.props.question.correct) {
            this.toast.current.show('Correct');
            this.correctGuesses += 1
        } else {
            this.toast.current.show('Incorrect')
        }

        // IF last card navigate to results screen and reset this screen's state
        // ELSE increase correct count and get new question data
        if (params.question.number === this.props.deck.cards.length) {
            navigation.navigate('QuizResults', {correct: this.correctGuesses, deck: this.props.deck});
            this.correctGuesses = 0
        } else {
            navigation.setParams({
                question: {
                    number: params.question.number + 1,
                    key: params.deck.cards[params.question.number].key
                }
            })
        }
    };

    render() {
        const {navigation} = this.props;

        return (
            <ScreenContainer center>
                <CardBox>
                    {/* The Question, or answer depending if the users presses the "show answer button" */}
                    <Heading type="h1">
                        {navigation.state.params.showAnswer ? this.props.question.answer : this.props.question.title}
                    </Heading>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {/* Show answer button */}
                        <Button onPress={() => navigation.setParams({showAnswer: !navigation.state.params.showAnswer})}
                                type="tertiary" color={colors.main.regular} style={{marginBottom: 10}}>
                            {navigation.state.params.showAnswer ? 'Show Question' : 'Show Answer'}
                        </Button>
                        {/* Correct guess button */}
                        <Button onPress={() => this.submitGuess(true)}
                                type="secondary" color={colors.positive}>
                            Correct
                        </Button>
                        {/* Incorrect guess button */}
                        <Button onPress={() => this.submitGuess(false)}
                                type="secondary" color={colors.negative}>
                            Incorrect
                        </Button>
                    </View>
                </CardBox>
                <Toast ref={this.toast} positionValue={150} opacity={0.5}/>
            </ScreenContainer>
        )
    }
}

function mapStateToProps(decks, ownProps) {
    const deck = decks[ownProps.navigation.state.params.deck.id];
    return {
        deck,
        question: deck.cards.find(card => card.key === ownProps.navigation.state.params.question.key)
    }
}

export default connect(mapStateToProps)(QuestionScreen)
