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
        const {card, deleteCard, index, editCard} = this.props;

        return (
            <CardBox>
                <View style={{flexDirection: 'row'}}>
                    <Heading type="h3" style={{flex: 1}}>Card {(index + 1)}</Heading>
                    <Button onPress={() => deleteCard(card.key)} type="tertiary" color={colors.negative}>Delete</Button>
                </View>
                <TextInput placeholder='Question' value={card.title}
                           onChangeText={value => editCard(index, 'title', value)}/>
                <TextInput placeholder='Answer' value={card.answer}
                           onChangeText={value => editCard(index, 'answer', value)}/>
            </CardBox>
        )
    }
}

class CardList extends React.Component {
    render() {
        const {cards, deleteCard, editCard} = this.props;

        return (
            <View style={{width: '100%', alignItems: 'center'}}>
                {!cards.length && (
                    <EmptyListText>No cards currently in this deck.</EmptyListText>
                )}

                <FlatList
                    data={cards}
                    style={{height: 440, marginBottom: 10}}
                    renderItem={({item, index}) => <Card card={item} index={index} deleteCard={deleteCard}
                                                         editCard={editCard}/>}
                />
            </View>
        )
    }
}

export default CardList