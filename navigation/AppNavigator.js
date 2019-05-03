import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DeckScreen from "../screens/deck-screen";
import * as colors from '../utils/colors'

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
            title: `Deck: ${navigation.getParam('title', 'Undefined')}`,
        })
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