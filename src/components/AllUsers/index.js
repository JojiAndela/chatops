import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import UserRows from './UserRows';


class AllUsers extends Component {
state = {
      filter: '',
      users: [
        {
      name: 'Sandra Okereke',
      time: 'today'
      },{
      name: 'Philip Jones',
      time: 'today'
    },{
      name: 'Amaka dispo',
      time: 'today'
    },{
      name: 'Tomi Lasda',
      time: 'today'
    },{
      name: 'Harry Smith',
      time: 'today'
    },{
      name: 'Mary peters',
      time: 'today'
    },{
      name: 'Mark poliska',
      time: 'today'
    },{
      name: 'matheris dones',
      time: 'today'
    },{
      name: 'Jones kaka',
      time: 'today'
    },{
      name: 'Newman james',
      time: 'today'
    },{
      name: 'luska ferman',
      time: 'today'
    },{
      name: 'aherdisx mannar',
      time: 'today'
    },{
      name: 'Misera kier',
      time: 'today'
    },{
      name: 'Mika laspora',
      time: 'today'
    },{
      name: 'openka looply',
      time: 'today'
    }],
  
  }

  static navigationOptions = {
    title: 'Chats',
  };

  gotoMessage = (name) => this.props.navigation.navigate('Message', { name });
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', marginTop: 20}}>
        <TextInput 
        style={styles.input} 
        placeholder="Search User"
        onChangeText={
          text => {this.setState({ filter: text });
        }}
        value={this.state.search}
        />
        <KeyboardAwareScrollView style={{margin: 0, padding: 0}}>
        <FlatList 
          style={{margin: 0, padding: 0}}
          data={this.props.allUsers.filter(user => {
            return !this.state.filter || 
              user.username.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
          })}
          renderItem={({item, index}) => <UserRows user={item} toMessage={() => this.gotoMessage(item.username)} />}
          keyExtractor={(item) => item.id}
        />
        </KeyboardAwareScrollView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  head: {
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    marginTop: 20,
    padding:10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff'

  }
});

const mapStateToProps = (state) => {
  const { allUsers } = state.users;
  return { allUsers }
};

export default connect(mapStateToProps)(AllUsers);