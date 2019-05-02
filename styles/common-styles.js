import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import Styled from 'styled-components/native'
import * as colors from '../utils/colors'
import PropTypes from 'prop-types'

export const Container = Styled.View`
    flex-grow: 1;
    background-color: #fff;
`;

export const CardBox = Styled.View`
    background-color: #fff;
    border-radius: 2px;
    padding: 24px;
    margin-bottom: 20px;
    width: 350px;
`;

export const ScreenContainer = Styled.View`
    flex-grow: 1;
    padding: 20px;
    ${props => props.centerHorizontal ? 'align-items: center;' : ''}
    ${props => props.center ? 'align-items: center; justify-content: center; ' : ''}
    background-color: ${colors.lightGrey};
`;

const StyledButton = Styled.TouchableOpacity`
    ${props => {
        switch (props.type) {
            case 'primary':
                return `
                    border-radius: 3;
                    padding-horizontal: 10;
                    padding-vertical: 5;
                    border-width: 2;
                    border-style: solid;
                    border-color: ${props.color};
                    background-color: ${props.color};
                    align-items: center;
                `;
            case 'secondary':
                return `
                    border-radius: 3;
                    padding-horizontal: 5;
                    padding-vertical: 5;
                    border-width: 2;
                    border-style: solid;
                    border-color: ${props.color};
                    width: 25%;
                    align-items: center;
                `
        }
    }}
`;

export const Button = (props) => {
    const {onPress, type, color, children} = props;

    return (
        <StyledButton color={color} type={type} onPress={onPress}>
            <Text style={{color: type === 'primary' ? '#fff' : color}}>{children}</Text>
        </StyledButton>
    )
};

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    color: PropTypes.string

};


export const Heading = Styled.Text`
    margin-bottom: 10px;
    font-size: ${props => {
    switch (props.type) {
        case 'h1':
            return 30;

        case 'h2':
            return 25;

        case 'h3':
            return 20;

        default:
            return 16
    }
}};
`;
Heading.propTypes = {
    type: PropTypes.oneOf(['h1', 'h2', 'h3'])
};

const StyledTextInput = Styled.TextInput`
    border-bottom-color: black;
    border-bottom-width: 1px;
    font-size: 16px;
    min-width: 100%;
    padding: 5px 5px 5px 10px;
`;

export class TextInput extends React.Component {
    state = {
        focusStyling: {
            ...this.props.style
        }
    };

    onFocus = () => {
        this.setState({focusStyling: {borderBottomColor: colors.secondary.regular, borderBottomWidth: 2, ...this.props.style}})
    };

    onBlur = () => {
        this.setState({focusStyling: {borderBottomColor: 'black', borderBottomWidth: 1, ...this.props.style}})
    };

    render() {
        return <StyledTextInput
            {...this.props}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            style={this.state.focusStyling}
            blurOnSubmit
        />
    }
}