import React from 'react'
import {Platform, StatusBar, View} from 'react-native'
import Styled from 'styled-components'
import {Constants} from 'expo'
import {createStore} from "redux";
import {Provider} from 'react-redux'

import AppNavigator from './navigation/AppNavigator'
import * as colors from './utils/colors'
import {Container} from './styles/common-styles'

import reducer from './redux/reducers'
import middleware from './redux/middleware'

const StatusBarBackground = Styled.View`
    background-color: ${colors.main.dark};
    height: ${Constants.statusBarHeight}
`

const store = createStore(reducer, middleware);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <StatusBar barStyle="default"/>
                    <StatusBarBackground/>
                    <AppNavigator/>
                </Container>
            </Provider>
        )
    }
}
