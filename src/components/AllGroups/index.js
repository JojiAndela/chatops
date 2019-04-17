import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import UserRows from '../AllUsers/UserRows';
// import { getAllChats, getChat } from '../../store/actions/chat';


class AllGroups extends Component {
state = {
      filter: '',
  }

  // componentDidMount(){
  //   this.props.dispatch(getAllChats());
  // }

    static navigationOptions = {
      title: 'Groups',
    };

  // gotoMessage = (item, name) => {
  //   this.props.dispatch(getChat(item.id));
  //   return this.props.navigation.navigate('Message', { name, chat: item })};
  render() {
    const users = [];//(this.props.chats[0] && this.props.chats[0].users) && this.props.chats.filter(user => {
    //   return !this.state.filter ||
    //     user.users[0].username.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
    // });
    return (
      <View style={{flex: 1, backgroundColor: '#fff', marginTop: 20}}>
        {/* <TextInput
        style={styles.input}
        placeholder="Search User"
        onChangeText={
          text => {this.setState({ filter: text });
        }}
        value={this.state.search}
        /> */}
        <KeyboardAwareScrollView style={{margin: 0, padding: 0}}>
        {users ? <FlatList
          style={{margin: 0, padding: 0}}
          data={users}
          renderItem={({item, index}) => <UserRows user={item.users ? item.users[0] : {}} toMessage={() => this.gotoMessage(item, item.users && item.users[0].username)} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={{alignSelf: 'center', color: '#ccc', fontSize: 18, fontWeight: 'bold', marginTop:20}}> No group available :( </Text>}
        /> : <Text style={{alignSelf: 'center', color: '#ccc', fontSize: 18, fontWeight: 'bold', marginTop:20}}> No group available :( e</Text>}
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
  const { chats } = state.chat;
  return { chats }
};

export default connect(mapStateToProps)(AllGroups);