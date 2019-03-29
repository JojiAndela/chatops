import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform, AsyncStorage} from 'react-native';
import styles from './styles';
import { loginUser } from '../../store/actions/auth';

class Login extends Component {
  state ={
    login: '',
    password: '',
  }

  async componentDidMount(){
    const user = await AsyncStorage.getItem('token');
    if(user){
      return this.props.navigation.navigate('Main');
    }
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
        <Text style={styles.head}>Log In</Text>
        </View>

        <View style={{ width: '90%'}}>
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
        </View>


        <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}><Text>New here? <Text style={{fontWeight: 'bold'}}>Sign Up</Text></Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const mapStateToProps = (state) => {
  const { users } = state;
  return { users }
};

export default connect(mapStateToProps)(Login);