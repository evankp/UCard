import React from 'react'
import {Text, View, Switch} from "react-native";
import {connect} from 'react-redux';

import {Button, ScreenContainer, CardBox, TextInput} from '../styles/common-styles'
import * as colors from '../utils/colors'
import {addCard, deleteDeck} from "../redux/actions";
import {MaterialDialog} from "react-native-material-dialog";
import {generateID} from "../utils/helpers";
import {modifyDeck} from "../utils/async-storage";

class DeckScreen extends React.Component {
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
            answer: this.state.newQuestion.answer
        };

        this.props.dispatch(addCard(this.props.deck.id, card));

        modifyDeck({
            ...this.props.deck,
            cards: [...this.props.deck.cards, card]
        });

        this.setState({
            dialogVisible: false,
            newQuestion: {
                title: '',
                answer: ''
            }
        })
    };

    render() {
        const title = this.props.deck ? this.props.deck.title : '';
        const numCards = this.props.deck ? this.props.deck.cards.length : 0;

        return (
            <ScreenContainer center>
                <CardBox style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 50}}>{title}</Text>
                    <Text style={{fontSize: 20, marginBottom: 30}}>{numCards} Cards</Text>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Button onPress={() => this.setState({dialogVisible: true})} type="secondary"
                                color={colors.grey}
                                style={{width: 100}}>
                            Add Card
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('Question', {
                            deck: this.props.deck,
                            question: {
                                number: 1,
                                key: this.props.deck.cards[0].key
                            },
                            showAnswer: false
                        })}
                                type="primary" color={colors.main.regular}
                                style={{width: 100}} disabled={this.props.deck.cards.length === 0}>
                            Start
                        </Button>
                    </View>
                    <Button onPress={this.deleteDeck} type="tertiary" color={colors.negative}>Delete</Button>
                </CardBox>

                <MaterialDialog
                    title="Add Card"
                    okLabel="SAVE"
                    cancelLabel="CANCEL"
                    onOk={this.submitNewQuestion}
                    onCancel={() => this.setState({dialogVisible: false})}
                    visible={this.state.dialogVisible}>
                    <View>
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
                        <View style={{width: 120, flexDirection: 'row'}}>
                            <Text>Correct?</Text>
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
