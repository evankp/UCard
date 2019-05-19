import React from 'react';
import {Platform, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';

export default function WithTouchable(props) {
    if (Platform.OS === 'ios') {
        return (
            <TouchableOpacity onPress={() => props.onPress('Opacity')} style={{width: '100%'}}>
                {props.children}
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableNativeFeedback onPress={() => props.onPress('Feedback')} useForeground>
                {props.children}
            </TouchableNativeFeedback>
        )
    }
}

WithTouchable.propTypes = {
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func.isRequired
}
