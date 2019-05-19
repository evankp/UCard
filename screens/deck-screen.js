import React from 'react';
import {Text, View, Switch} from 'react-native';
import {connect} from 'react-redux';

import {Button, ScreenContainer, CardBox, TextInput} from '../styles/common-styles';
import * as colors from '../utils/colors';
import {addCard, deleteDeck} from '../redux/actions';
import {MaterialDialog} from 'react-native-material-dialog';
import {generateID} from '../utils/helpers';
import {modifyDeck} from '../utils/async-storage';
import {HeaderBackButton} from 'react-navigation';

class DeckScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')}
                                          tintColor={colors.white}/>
        }
    };

    state = {
        dialogVisible: false,
        newQuestion: {
            key: generateID(),
            title: '',
            answer: '',
            correct: true
        }
    };

    deleteDeck = () => {
        const {id} = this.props.deck;

        this.props.dispatch(deleteDeck(id));
        this.props.navigation.goBack()
    };

    submitNewQuestion = () => {
        let card = {
            key: generateID(),
            title: this.state.newQuestion.title,
            answer: this.state.newQuestion.answer,
            correct: this.state.newQuestion.correct
        };

        // Add to Redux
        this.props.dispatch(addCard(this.props.deck.id, card));

        // Add to localstorage
        modifyDeck({
            ...this.props.deck,
            cards: [...this.props.deck.cards, card]
        });

        // clear state
        this.setState({
            dialogVisible: false,
            newQuestion: {
                key: generateID(),
                title: '',
                answer: '',
                correct: true
            }
        })
    };

    render() {
        const title = this.props.deck ? this.props.deck.title : '';
        const numCards = this.props.deck ? this.props.deck.cards.length : 0;

        return (
            <ScreenContainer center>
                <CardBox style={{alignItems: 'center', justifyContent: 'center'}}>
                    {/* Deck Info */}
                    <Text style={{fontSize: 50}}>{title}</Text>
                    <Text style={{fontSize: 20, marginBottom: 30}}>{numCards} Cards</Text>
                    {/* Button Row */}
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        {/* Add card button */}
                        <Button onPress={() => this.setState({dialogVisible: true})} type="secondary"
                                color={colors.grey}
                                style={{width: 100}}>
                            Add Card
                        </Button>

                        {/* Start quiz button */}
                        <Button onPress={() => this.props.navigation.navigate('Question', {
                            deck: this.props.deck,
                            question: {
                                number: 1,
                                key: this.props.deck.cards[0].key
                            },
                            showAnswer: false
                        })}
                                type="primary" color={colors.main.regular}
                                style={{width: 100}} disabled={numCards === 0}>
                            Start
                        </Button>
                    </View>
                    {/* Delete Button */}
                    <Button onPress={this.deleteDeck} type="tertiary" color={colors.negative}>Delete</Button>
                </CardBox>

                {/* Dialog popup for new question */}
                <MaterialDialog
                    title="Add Card"
                    okLabel="SAVE"
                    cancelLabel="CANCEL"
                    onOk={this.submitNewQuestion}
                    onCancel={() => this.setState({dialogVisible: false})}
                    visible={this.state.dialogVisible}>
                    <View>
                        {/* Question text input */}
                        <TextInput
                            placeholder="Question"
                            value={this.state.newQuestion.title}
                            onChangeText={value => this.setState(state => ({
                                newQuestion: {
                                    ...state.newQuestion,
                                    title: value
                                }
                            }))}
                        />

                        {/* Answer text input */}
                        <TextInput
                            placeholder="Answer"
                            value={this.state.newQuestion.answer}
                            onChangeText={value => this.setState(state => ({
                                newQuestion: {
                                    ...state.newQuestion,
                                    answer: value
                                }
                            }))}
                            style={{marginBottom: 20}}
                        />

                        {/* How does the app know if, when the user presses correct/incorrect, that the answer the user
                        provided is correct? Therefore, let the user tell the app which button should count as "correct"
                         guess. */}
                        <View style={{width: 120, flexDirection: 'row'}}>
                            <Text>Is the answer a "Yes/Correct"?</Text>
                            <Switch value={this.state.newQuestion.correct}
                                    onValueChange={() => this.setState(state => ({
                                        newQuestion: {
                                            ...state.newQuestion,
                                            correct: !state.newQuestion.correct
                                        }
                                    }))}/>
                        </View>
                    </View>
                </MaterialDialog>
            </ScreenContainer>
        )
    }
}

function mapStateToProps(decks, ownProps) {
    return {
        deck: decks[ownProps.navigation.state.params.id]
    }
}

export default connect(mapStateToProps)(DeckScreen)
