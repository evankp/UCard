import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DeckScreen from "../screens/deck-screen";
import * as colors from '../utils/colors'
import QuestionScreen from "../screens/question-screen";
import QuizResults from '../screens/quiz-results'

const AppContainer = createAppContainer(createStackNavigator({
    Main: {
        screen: MainTabNavigator,
        navigationOptions: {
            header: null
        }
    },
    Deck: {
        screen: DeckScreen,
        navigationOptions: ({navigation}) => ({
            title: `Deck Info`,
        })
    },
    Question: {
        screen: QuestionScreen
    },
    QuizResults: {
        screen: QuizResults
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.main.regular
        },
        headerTintColor: colors.white,
        headerForceInset: {top: 'never', bottom: 'never'}
    }
}));

export default AppContainer
