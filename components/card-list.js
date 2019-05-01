import React from 'react'
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import Styled from 'styled-components'
import {MaterialDialog} from "react-native-material-dialog";

import {CardBox, Heading, TextInput, Button} from '../styles/common-styles'

import * as colors from '../utils/colors'

const EmptyListText = Styled.TextInput`
    text-align: center;
    font-size: 18px;
    color: ${colors.metaText}
`

class Card extends React.Component {
    render() {
        const {card, deleteCard, index, openDialog} = this.props;

        return (
            <CardBox>
                <View style={{flexDirection: 'row'}}>
                    <Heading type="h3" style={{flex: 1}}>Card {(index + 1)}</Heading>
                    <Button onPress={() => deleteCard(card.key)} type="tertiary" color={colors.negative}>Delete</Button>
                </View>
                <Text style={{marginBottom: 5}}>Question: {card.title ? card.title : 'None'}</Text>
                <Text style={{marginBottom: 10}}>Answer: {card.answer ? card.answer : 'None'}</Text>
                <Button onPress={() => openDialog(index, card.title, card.answer)} type="secondary" color={colors.main.regular}>Edit</Button>
            </CardBox>
        )
    }
}

class CardList extends React.Component {
    state = {
        dialog: {
            id: 0,
            visible: false,
            question: '',
            answer: ''
        }
    };

    openDialog = (id, question, answer) => {
        this.setState(state => ({
            dialog: {
                id,
                visible: !state.dialog.visible,
                question,
                answer
            }
        }))
    };

    toggleDialog = () => {
        this.setState(state => ({
            dialog: {
                ...state.dialog,
                visible: !state.dialog.visible
            }
        }))
    };

    setValue = (property, value) => {
        this.setState(state => ({
            dialog: {
                ...state.dialog,
                [property]: value
            }
        }))
    };

    render() {
        const {cards, deleteCard, editCard} = this.props;
        let dialog = this.state.dialog;

        return (
            <View style={{width: '100%', alignItems: 'center'}}>
                {!cards.length && (
                    <EmptyListText>No cards currently in this deck.</EmptyListText>
                )}

                <MaterialDialog visible={dialog.visible}
                                title={`Card ${dialog.id + 1}`}
                                okLabel="SAVE"
                                onOk={() => {
                                    editCard(dialog.id, 'title', dialog.question);
                                    editCard(dialog.id, 'answer', dialog.answer);
                                    this.toggleDialog()
                                }}
                                onCancel={() => {
                                    this.toggleDialog();
                                    this.setValue('question', '');
                                    this.setValue('answer', '')
                                }}>
                    <View>
                        <TextInput placeholder='Card Name' value={dialog.question}
                                   onChangeText={value => this.setValue('question', value)}/>
                        <TextInput placeholder='Answer' value={dialog.answer}
                                   onChangeText={value => this.setValue('answer', value)}/>
                    </View>
                </MaterialDialog>

                <FlatList
                    data={cards}
                    style={{height: 480, marginBottom: 20}}
                    renderItem={({item, index}) => <Card card={item} index={index} deleteCard={deleteCard}
                                                         editCard={editCard} openDialog={this.openDialog}/>}
                />
            </View>
        )
    }
}

export default CardList