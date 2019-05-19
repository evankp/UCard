import React from 'react';
import {BackHandler, Text} from 'react-native';
import {HeaderBackButton} from 'react-navigation';
import Toast from 'react-native-easy-toast';

import * as colors from '../utils/colors';
import {ScreenContainer, CardBox, Button, Heading} from '../styles/common-styles';
import {clearLocalNotification, setLocalNotification} from '../utils/notification-helpers';

class QuizResults extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Quiz Results',
            headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Deck', {id: navigation.state.params.deck.id})}
                                          tintColor={colors.white}/>
        }
    };

    constructor(props) {
        super(props);
        this.toast = React.createRef();
    };


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        clearLocalNotification()
            .then(setLocalNotification)
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    };

    handleBackButton = () => {
        this.toast.current.show('Cannot go back to quiz');
        return true;
    };

    render() {
        const {deck, correct} = this.props.navigation.state.params;
        const {navigate} = this.props.navigation;

        return (
            <ScreenContainer center>
                <CardBox style={{alignItems: 'center'}}>
                    <Heading type="h1">Questions Correct</Heading>
                    <Text style={{fontSize: 20, marginBottom: 20}}>{correct} correct</Text>

                    <Button onPress={() => navigate('Question', {
                        deck: deck,
                        question: {
                            number: 1,
                            key: deck.cards[0].key
                        },
                        showAnswer: false
                    })}
                            type="secondary" color={colors.main.regular}>
                        Restart Quiz
                    </Button>

                    <Button onPress={() => navigate('Deck', {id: deck.id})} type="secondary" color={colors.main.regular}>
                        Back to deck view
                    </Button>
                </CardBox>
                <Toast ref={this.toast}/>
            </ScreenContainer>
        )
    }
}

export default QuizResults
