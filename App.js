/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllUsers from 'components/AllUsers';
import AllChats from 'components/AllChats';
import AllMyGroups from 'components/AllMyGroups';
import AllGroups from 'components/AllGroups';
import Feeds from 'components/Feeds';
import Message from 'components/Message';
import SignUp from 'components/Account/SignUp';
import Login from 'components/Account/Login';
import Profile from 'components/Account/Profile';
import store from './src/store';
import AppStyles from 'assets/styles';


const UserStack = createStackNavigator({
  Home: AllUsers,
}, {
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

  const GroupStack = createStackNavigator({
    Home: AllGroups,
  }, {
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

const ChatStack = createStackNavigator({
  Home: AllChats,
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });

const MyChats = createMaterialTopTabNavigator({
  
  Chats: {
    screen: ChatStack,
    navigationOptions: { header: null, title: 'My chats' }
  },

  GroupsScreen: {
    screen: AllMyGroups,
    navigationOptions: { header: null, title: 'My groups' }
  },

  Feeds: {
    screen: Feeds,
    navigationOptions: { header: null, title: 'Feeds' }
  }
},
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: AppStyles.colors.accentColor,
      inactiveTintColor: AppStyles.colors.inactiveGreyColor,
      pressColor: AppStyles.colors.lightGreyColor,
      labelStyle: {
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 11 : 12,
      },
      indicatorStyle: {
        backgroundColor: AppStyles.colors.accentColor
      },
      style: {
        backgroundColor: 'white',
        marginTop: 30
      }
    }
  })

const ProfileStack = createStackNavigator({
  Home: Profile,
}, {
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
  MyChats: {
    screen: MyChats,
    navigationOptions: {
      tabBarLabel: 'Chats',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-chatbubbles" size={30} color={tintColor} />
      )
    }
  },
  AllUsers: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: 'Users',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-person-add" size={30} color={tintColor} />
      )
    }
  },
  AllGroups: {
    screen: GroupStack,
    navigationOptions: {
      tabBarLabel: 'Groups',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-people" size={30} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-person" size={30} color={tintColor} />
      )
    }
  }
}, {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: AppStyles.colors.accentColor,
      inactiveTintColor: 'gray',
    },
  });

const MainApp = createStackNavigator({
  Home: TabNavigator,
  Message: Message
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  })
const wholeApp = createSwitchNavigator({
  Login: Login,
  SignUp: SignUp,
  Main: MainApp,
}
  , {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);
const AppContainer = createAppContainer(wholeApp);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.socket = openSocket('http://127.0.0.1:3000')
  }

  render() {
    return <Provider store={store}>
      <AppContainer />
    </Provider>;
  }
};
