import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from "react-native";

import {ScreenContainer, CardBox, Button} from "../styles/common-styles";

class QuizResults extends React.component {
    render () {
        const {deck, correct} = this.props.navigation.state.params;

        return (
            <ScreenContainer center>
                <CardBox>
                    {/* TODO: Test*/}
                    <Text>{deck.title} Results</Text>
                    <Text>{correct} correct</Text>
                </CardBox>
            </ScreenContainer>
        )
    }
}

export default QuizResults
