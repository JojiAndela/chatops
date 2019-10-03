import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform} from 'react-native';
import dummy from 'assets/images/dummy.jpg';

const UserRows = ({ user, toMessage }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={toMessage}>
      <Image source={dummy} style={styles.image}/>
      <View style={{width: '80%'}}>
        <Text style={styles.title}>{user.username}</Text>
        <Text style={styles.foot}>{user.lastseen? new Date(user.lastseen).toDateString() : 'Not Active'}</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    row: {
      borderBottomWidth: Platform.OS === 'ios' ? .2 : 2,
      borderBottomColor: '#ccc',
      paddingHorizontal: 10,
      paddingVertical: 15,
      flexDirection: 'row'
    },
    image: {
      marginHorizontal: 10,
      width: 40,
      height: 40,
      borderRadius: 20
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: '#555',
      textTransform: 'capitalize',
   },
    foot: {
      fontSize: 10,
      alignSelf: 'flex-end',
      color: '#777'
    }
});

export default UserRows;
