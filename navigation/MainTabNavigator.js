import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation'
import * as colors from '../utils/colors'
import {Icon} from 'expo'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/home-screen'
import AddDeckScreen from '../screens/add-deck-screen'
import Colors from '../constants/Colors'
import DeckScreen from "../screens/deck-screen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Deck list',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home`
                    : 'md-home'
            }
        />
    ),
};

const AddDeckStack = createStackNavigator({
    Add: AddDeckScreen
});

AddDeckStack.navigationOptions = {
    tabBarLabel: 'Add Deck',
    tabBarIcon: ({focused}) => (
        <Icon.AntDesign
            name={
                Platform.OS === 'ios'
                    ? 'plussquareo'
                    : 'plussquare'
            }
            size={26}
            style={{marginBottom: -3}}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}

        />
    ),
};

let tabNavigator;

const screens = {
    HomeStack,
    AddDeckStack,
};

const options = {
    tabBarOptions: {
        style: {
            backgroundColor: colors.main.regular
        }
    }
};

if (Platform.OS === 'ios') {
    tabNavigator = createBottomTabNavigator(screens, options)
} else {
    tabNavigator = createMaterialTopTabNavigator(screens, options)
}

export default tabNavigator
