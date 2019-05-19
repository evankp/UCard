import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

import {Button, ScreenContainer} from '../styles/common-styles';
import Styled from 'styled-components/native';
import DeckItem from '../components/deck-item';
import {clearStorage, getDeckList} from '../utils/async-storage';
import {clearDecks, initDecks} from '../redux/actions';
import * as colors from '../utils/colors';
import {setLocalNotification} from '../utils/notification-helpers';

const DeckList = Styled.FlatList`
    width: 100%
`;

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        getDeckList()
            .then(decks => {
                this.props.dispatch(initDecks(decks));

                // Only set local notifications if there is a deck
                if (decks) {
                    setLocalNotification()
                }
            });
    };

    clearDecks = () => {
        this.props.dispatch(clearDecks());
        clearStorage()
            .catch(err => console.log(err))
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
                <Button onPress={this.clearDecks} color={colors.main.regular} type="tertiary" style={{marginTop: 40}}>Clear Decks</Button>
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
