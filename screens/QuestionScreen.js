import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from "react-native";

import {ScreenContainer, CardBox, Button} from "../styles/common-styles";
import * as colors from '../utils/colors';

class QuestionScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `Quiz - Question ${navigation.state.params.question.number}/${navigation.state.params.deck.cards.length}`
        }
    };

    render() {
        const {navigation} = this.props;
        return (
            <ScreenContainer center>
                <CardBox>
                    <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>
                        {navigation.state.params.showAnswer ? this.props.question.answer : this.props.question.title}
                    </Text>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Button onPress={() => navigation.setParams({showAnswer: !navigation.state.params.showAnswer})}
                                type="tertiary" color={colors.main.regular} style={{marginBottom: 10}}>
                            {navigation.state.params.showAnswer ? 'Show Question' : 'Show Answer'}
                        </Button>
                        <Button onPress={() => console.log('correct pressed')}
                                type="secondary" color={colors.positive}>
                            Correct
                        </Button>

                        <Button onPress={() => console.log('negative pressed')}
                                type="secondary" color={colors.negative}>
                            Incorrect
                        </Button>
                    </View>
                </CardBox>
            </ScreenContainer>
        )
    }
}

function mapStateToProps(decks, ownProps) {
    let deck = decks[ownProps.navigation.state.params.deck.id];
    return {
        deck,
        question: deck.cards.find(card => card.key === ownProps.navigation.state.params.question.key)
    }
}

export default connect(mapStateToProps)(QuestionScreen)
