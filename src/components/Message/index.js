import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView, Image, FlatList, Platform, ScrollView } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import dummy from 'assets/images/dummy.jpg';
import MessageRender from './MessageRender';

class Message extends Component {
  state={
    active: true, 
    message: '',
    messages: [
      {
        sender: 1,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },
      {
        sender: 1,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },
      {
        sender: 2,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },

      {
        sender: 1,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },
      {
        sender: 2,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },
      {
        sender: 1,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },

      {
        sender: 1,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },

      {
        sender: 2,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },

      {
        sender: 1,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },

      {
        sender: 1,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },

      {
        sender: 2,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },

      {
        sender: 1,
        msg: 'asamlsmal; aslmlam lm ms alsml ma s masmms kasm asm m mlas a sa '
      },
    ]
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name', 'Messages');
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Icon name="chevron-left" size={25} color="#555" style={{ margin: 5}}/></TouchableOpacity>
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
            <ScrollView
            style={styles.messages}
            extraHeight={0}
            enableAutomaticScroll={true}
            extraScrollHeight={0}
            >
             <FlatList 
             style={styles.messages}
             data={this.state.messages}
             renderItem={({item, index}) => <MessageRender message={item}/>}
             keyExtractor={(item, index) =>  `${index}`}
             />
              </ScrollView>
             <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingTop: 5}}>
              <TextInput
              placeholder="type message"
              placeholderTextColor="#ccc"
              style={styles.input}
              onChangeText={text => this.setState({ message: text})}
              value={this.state.message}
              multiline={true}
              />

              {this.state.message !== '' && <TouchableOpacity style={styles.btn} onPress={() => {
                alert(`Message: ${this.state.message} - has been sent!`);
                return this.setState({ message: '' });
                }}>
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
    backgroundColor: '#FFF'
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

export default Message;