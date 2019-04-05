import React from 'react'
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
    }

    state = {
        decks: null
    }

    componentDidMount() {
        getDeckList()
            .then(data => this.setState({decks: Object.keys(data).map(deck => data[deck])}))
    }

    render() {
        return (
            <ScreenContainer centerHorizontal>
                <DeckList
                    data={this.state.decks}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <DeckItem deck={item}/>}
                />
            </ScreenContainer>
        )
    }
}
