/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import { Provider } from 'react-redux';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllUsers from 'components/AllUsers';
import Message from 'components/Message';
import SignUp from 'components/Account/SignUp';
import Login from 'components/Account/Login';
import store from './src/store';

const UserStack = createStackNavigator({
  Home: AllUsers,
  Message: Message
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
      borderWidth: 0,
      borderBottomColor: '#fff'
    },
    headerTintColor: '#444',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
      padding: 10
    },
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
});

const TabNavigator = createBottomTabNavigator({
  chats: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: 'All Chats',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-chatbubbles" size={30} color={tintColor} />
      )
    }},
  AllUsers: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: 'All Users',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-people" size={30} color={tintColor} />
      )
    }}
  },{
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#238ACC',
      inactiveTintColor: 'gray',
    },
  });


  const wholeApp = createStackNavigator({
    Login: Login,
    SignUp: SignUp,
    Main: TabNavigator
  }, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  })
  const AppContainer = createAppContainer(wholeApp);

export default class App extends Component {

  constructor(props){
    super(props);
    // this.socket = openSocket('http://localhost:3000')
  }

  render() {
    return <Provider store={ store }>
      <AppContainer />
    </Provider>;
  }
};
