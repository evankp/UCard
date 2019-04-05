import React from 'react'
import {Platform, StatusBar, View} from 'react-native'
import Styled from 'styled-components'
import {AppLoading, Asset, Font, Icon, Constants} from 'expo'
import AppNavigator from './navigation/AppNavigator'
import * as colors from './utils/colors'
import {Container} from './styles/common-styles'

const StatusBarBackground = Styled.View`
    background-color: ${colors.main.dark};
    height: ${Constants.statusBarHeight}
`

export default class App extends React.Component {
    render() {
        return (
            <Container>
                <StatusBar barStyle="default"/>
                <StatusBarBackground/>
                <AppNavigator/>
            </Container>
        )
    }
}
