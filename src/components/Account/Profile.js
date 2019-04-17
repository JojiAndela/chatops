import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform,FlatList} from 'react-native';
import styles from './styles';
import { logoutUser } from '../../store/actions/auth';
// import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {
  state = {
    
  }


  static navigationOptions = {
    title: 'Profile',
  };


  async componentDidMount(){

  }

  logout = () => {
    const { dispatch } = this.props;
    return dispatch(logoutUser(this.props.navigation))
  }

  renderRow = ({ item }) => <TouchableOpacity onPress={item.action} style={styles.card}>

  <View style={styles.cardName}>
    <Icon name={item.icon} size={25} color="#555"/>
    <Text style={{ marginHorizontal: 10, textTransform: 'capitalize'}}>{item.name}</Text>
  </View>
  <Icon name="chevron-right" size={10} color="#555" style={{ margin: 5}}/>
  </TouchableOpacity>;
  render() {
    const user = this.props.currentUser;
    const data = [{
      name: `${user.username}`,
      action: null,
      icon: 'user'
    },{
      name: `${user.email}`,
      action: null,
      icon: 'inbox'
    },{
      name: 'Log out',
      action: this.logout,
      icon: 'sign-out'
    }]
    return (
      <View style={styles.container}>
        <FlatList
          data = {data}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  const { currentUser } = state.users;
  return { currentUser }
};

export default connect(mapStateToProps)(Profile);