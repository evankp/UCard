import React from 'react'
import {Text} from "react-native";
import {connect} from 'react-redux'

import {ScreenContainer} from '../styles/common-styles'
import Styled from 'styled-components/native'
import DeckItem from '../components/deck-item'
import {clearStorage, getDeckList} from '../utils/async-storage'
import {initDecks} from "../redux/actions";

const DeckList = Styled.FlatList`
    width: 100%
`;

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        getDeckList()
            .then(decks => this.props.dispatch(initDecks(decks)))
    };

    render() {
        const {decks} = this.props;

        return (
            <ScreenContainer centerHorizontal>
                {decks && (
                    <DeckList
                        data={Object.keys(decks).map(deck => decks[deck])}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <DeckItem deck={item} navigate={this.props.navigation.navigate}/>}
                    />
                )}

                {!decks && (
                    <Text>No Decks</Text>
                )}
            </ScreenContainer>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(HomeScreen)
