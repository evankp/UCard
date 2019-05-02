import React from 'react'
import {Text} from "react-native";
import {ScreenContainer} from '../styles/common-styles'
import Styled from 'styled-components/native'
import DeckItem from '../components/deck-item'
import {getDeckList} from '../utils/async-storage'

const DeckList = Styled.FlatList`
    width: 100%
`

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        decks: null
    };

    componentDidMount() {
        this.updateDeckList()
    };

    updateDeckList = () => {
        getDeckList()
            .then(data => data
                ? this.setState({decks: Object.keys(data).map(deck => data[deck])})
                : this.setState({decks: null}))
    };

    render() {
        const refresh = this.props.navigation.getParam('refresh', false);
        if (refresh) {
            this.updateDeckList()
        }

        return (
            <ScreenContainer centerHorizontal>
                {this.state.decks && (
                    <DeckList
                        data={this.state.decks}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <DeckItem deck={item}/>}
                    />
                )}

                {!this.state.decks && (
                    <Text>No Decks</Text>
                )}
            </ScreenContainer>
        )
    }
}
