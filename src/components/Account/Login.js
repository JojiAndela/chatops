import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform} from 'react-native';
import styles from './styles';
import { loginUser } from '../../store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  state ={
    login: '',
    password: '',
    show: false
  }

  componentDidMount(){
    const user = this.props.users.currentUser;
    if(user.token){
      return this.props.navigation.navigate('Main');
    }
    return this.setState({ show: true});
  }

  componentWillReceiveProps(nextProps){
    const user = nextProps.users.currentUser;
    if(user.token){
      return this.props.navigation.navigate('Main');
    }
    return this.setState({ show: true});
  }


  login = () => {
    const { dispatch } = this.props;

    dispatch(loginUser({...this.state }, this.props.navigation))
  }
  render() {

    return (

      <KeyboardAvoidingView style={styles.contain} behavior='padding' enabled={Platform.OS === 'ios' ? true : false}>
       {this.props.users.loading && <View style={styles.loader}><ActivityIndicator size={"large"}/></View>}
        <View>
        {this.state.show && <Text style={styles.head}>Log In</Text>}
        </View>

        {this.state.show && <View style={{ width: '90%'}}>
        <View style={styles.sec}>
          <TextInput 
              value={this.state.login}
              style={styles.input}
            placeholder='Enter username or email'
            onChangeText={login => this.setState({ login })}
          />
          </View>
          <View style={styles.sec}>
          <TextInput 
            style={styles.input}
            value={this.state.password}
            placeholder='Enter a strong password'
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          </View>

        
          <TouchableOpacity style={styles.btn} onPress={this.login}><Text style={styles.btntext}>Log In</Text></TouchableOpacity>
        </View>}


        {this.state.show && <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}><Text>New here? <Text style={{fontWeight: 'bold'}}>Sign Up</Text></Text></TouchableOpacity>
        </View>}
      </KeyboardAvoidingView>
    );
  }
}


const mapStateToProps = (state) => {
  const { users } = state;
  return { users }
};

export default connect(mapStateToProps)(Login);