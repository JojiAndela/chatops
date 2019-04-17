import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView, Image, FlatList, Platform } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import dummy from 'assets/images/dummy.jpg';
import MessageRender from './MessageRender';
import { sendMessage } from '../../store/actions/chat';

class Message extends Component {
  state={
    active: true,
    message: '',
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  sendIt = (id) => {
    this.props.dispatch(sendMessage(id, this.state.message))
    return this.setState({ message: '' });
  }
  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name', 'Messages');
    const chatDetail = navigation.getParam('chat', 'Messages');
    const messages = this.props.chat.messages;
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' && 'padding'}>
          <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Chats')}><Icon name="chevron-left" size={25} color="#555" style={{ margin: 5}}/></TouchableOpacity>
          <Image source={dummy} style={styles.image}/>
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', padding: 5, textTransform: 'capitalize' }}>{name}</Text>
            <View style={{paddingHorizontal: 5,flexDirection: 'row'}}>
              <View style={[styles.status, this.state.active && styles.active]}></View>
              <View><Text style={{paddingHorizontal: 5, color: '#777'}}>{this.state.active ? 'active' : 'inactive'}</Text></View>
            </View>
          </View>
          </View>
          <View style={{flex: 1}}>
          <InvertibleScrollView
            inverted
            style={styles.messages}
            enableAutomaticScroll={true}
            automaticallyAdjustContentInsets={false}
            // keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={() => {
              this.scrollView.scrollTo({ y: 0, animated: true });
             }}
            extraScrollHeight={0}
            >
             <FlatList
             data={messages}
             renderItem={({item, index}) => <MessageRender message={item} currentUser={this.props.currentUser}/>}
             keyExtractor={(item, index) =>  `${index}`}
             ListEmptyComponent={<Text style={{alignSelf: 'center', color: '#ccc', fontSize: 14, marginTop:20}}> No chat yet :( </Text>}
             />
              </InvertibleScrollView>
             <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingTop: 5}}>
              <TextInput
              placeholder="type message"
              placeholderTextColor="#ccc"
              style={styles.input}
              onChangeText={text => this.setState({ message: text})}
              value={this.state.message}
              multiline={true}
              />

              {this.state.message !== '' && <TouchableOpacity style={styles.btn} onPress={() => this.sendIt(chatDetail.id)}>
              <Icon name="send" color='#238ACC' size={25} style={{alignSelf: 'flex-start'}}/>
              </TouchableOpacity>}
          </View>
          </View>
          </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 20
  },
  status: {
    height: 10,
    width:10,
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 5,
    marginTop: 4
  },
  active: {
    backgroundColor: 'green'
  },
  row: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row'
  },
  image: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  input: {
    marginBottom: 10,
    padding: 10,
    color: '#333',
    paddingTop: 10,
    borderWidth: Platform.OS === 'ios' ? .5 : 2,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 2,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    minHeight: 40,
    flex: 1
  },
  messages: {
    flex: 1,
    // flexDirection: 'column-reverse',
    backgroundColor: '#fefefe'
  },
  chatHead: {
    backgroundColor: '#efe',
    padding: 10,
    alignSelf: 'flex-end',
    margin: 10,
    borderRadius: 5,
    height: 80,
    maxWidth: '80%',
    color: '#333',
  },
  chatHead2: {
    backgroundColor: '#eef',
    padding: 10,
    alignSelf: 'flex-start',
    margin: 10,
    borderRadius: 5,
    maxWidth: '80%',
    color: '#333',
  },
  btn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
  }

});

const mapStateToProps = (state) => {
  const { chat } = state.chat;
  const { currentUser } = state.users;
  return { chat, currentUser }
};

export default connect(mapStateToProps)(Message);