import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform} from 'react-native';
import styles from './styles';
import { signUpUser } from '../../store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { getAllChats } from '../../store/actions/chat';

class SignUp extends Component {
  state ={
    username: '',
    email: '',
    password: '',
    passwordCorrect: true,
    passwordConfirm: ''
  }

  componentDidMount(){
    const user = this.props.users.currentUser;
    if(user.token){
      this.props.dispatch(getAllChats());
      return this.props.navigation.navigate('Main');
    }
  }

  componentWillReceiveProps(nextProps){
    const user = nextProps.users.currentUser;
    if(user.token){
      this.props.dispatch(getAllChats());

      return this.props.navigation.navigate('Main');
    }
  } 

  signup = () => {
    const { dispatch } = this.props;

    dispatch(signUpUser({...this.state }))
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.contain} behavior='padding' enabled={Platform.OS === 'ios' ? true : false}>
      {this.props.users.loading && <View style={styles.loader}><ActivityIndicator size={"large"}/></View>}
        <View>
          <Text style={styles.head}>Sign Up</Text>
        </View>

        <View style={{ width: '90%'}}>

          <View style={styles.sec}>
            <TextInput 
              style={styles.input}
              value={this.state.username}
              placeholder='Enter a unique username'
              onChangeText={username => this.setState({ username })}
            />
          </View>

          <View style={styles.sec}>
            <TextInput 
              style={styles.input}
              value={this.state.email}
              placeholder='Enter a valid email'
              onChangeText={email => this.setState({ email })}
            />
          </View>
          

          <View style={styles.sec}>
          <TextInput 
            style={styles.input}
            placeholder='Enter a strong password'
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => {
              if(this.state.passwordConfirm !== ''){
                this.setState({ passwordConfirm: ''})
              }
              this.setState({ password });
            }}
          />
          </View>

          <View style={styles.sec}>
            <TextInput 
              style={styles.input}
              placeholder='Confirm password entered above'
              value={this.state.passwordConfirm}
              secureTextEntry={true}
              onChangeText={password => {
                this.setState({ passwordConfirm: password});
                if(this.state.password === password){
                  this.setState({ passwordCorrect: true});
                } else {
                  this.setState({ passwordCorrect: false});         
                }
              }}
            />
          { (!this.state.passwordCorrect && this.state.passwordConfirm !== '') && <Text style={styles.error}>Password does not match</Text>}
          </View>

          <TouchableOpacity style={styles.btn} onPress={this.signup}><Text style={styles.btntext}>Sign Up</Text></TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text>Already have an account? <Text style={{fontWeight: 'bold'}}>Login</Text></Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state;
  return { users }
};

export default connect(mapStateToProps)(SignUp);