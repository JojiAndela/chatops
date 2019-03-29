import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


const MessageRender = ({ message }) => {
  return (
    <View style={message.sender === 1 ? styles.chatHead : styles.chatHead2}>
      <Text>
        {message.msg}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatHead: {
    backgroundColor: '#efe',
    padding: 10,
    alignSelf: 'flex-end',
    margin: 10,
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