import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet} from 'react-native';


const MessageRender = ({ message, currentUser }) => {
  return (
    <View style={message.sender.id === currentUser.id ? styles.chatHead : styles.chatHead2}>
      <Text>
        {message.msg}{' '}
        <Text style={{ fontSize: 8, alignSelf: "flex-end", color: '#aaa'}}>{ moment(message.createdAt).format('LT')}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatHead: {
    backgroundColor: '#efe',
    padding: 10,
    alignSelf: 'flex-end',
    margin: 5,
    borderRadius: 5,
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
  }

});

export default MessageRender;