import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  AlertIOS,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import TextInputLT from './TextInputLT'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // get  登录
  _loginRequest() {
    // 隐藏键盘
    this._hideKeyboard.bind(this);

    // 获取用户名输入框和密码输入框
    var userNameInput = this.refs.userNameInput
    var passwordInput = this.refs.passwordInput
    if (!userNameInput.getTextValue()) {
      this._showAlert('用户名错误', '您输入的用户名为空，请输入')
      return;
    }
    if (!passwordInput.getTextValue()) {
      this._showAlert('密码错误', '您输入的密码为空，请输入')
      return;
    }
    // 请求登录接口
    fetch(`http://127.0.0.1/zuojianjun/rnapi/login.php?name=${userNameInput.getTextValue()}&password=${passwordInput.getTextValue()}`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson);
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  // post 注册
  _registerRequest() {
    // 隐藏键盘
    this._hideKeyboard.bind(this)

    var userNameInput = this.refs.userNameInput
    var passwordInput = this.refs.passwordInput
    if (!userNameInput.getTextValue()) {
      this._showAlert('用户名错误', '您输入的用户名为空，请输入')
      return;
    }
    if (!passwordInput.getTextValue()) {
      this._showAlert('密码错误', '您输入的密码为空，请输入')
      return;
    }

    fetch('http://127.0.0.1/zuojianjun/rnapi/register.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'app': 'ios-networking'
      },
      body: JSON.stringify({
        'name': userNameInput.getTextValue(),
        'password': passwordInput.getTextValue(),
      })
    })
    .then((response)=>response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson);
    })
    .catch((error) => {
      console.log('error', error);
    }
    )
  }

  // 转表单数据
  toQueryString(obj) {
    body = obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
    console.log(body);
    return body;
  }
  // body: this.toQueryString({
  //   name: 'az',
  //   password: 'za',
  // })

  _showAlert(title, message) {
    Alert.alert(
      title,
      message,
    )
  }

  // 隐藏键盘
  _hideKeyboard() {
    var userNameInput = this.refs.userNameInput
    var passwordInput = this.refs.passwordInput
    if (userNameInput != null) {
      userNameInput.refs.txt.blur()
    }
    if (passwordInput != null) {
      passwordInput.refs.txt.blur()
    }
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.container} onPress={this._hideKeyboard.bind(this)}>
      <View >
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TextInputLT ref='userNameInput'
          {...this.props} title='用户名' defaultText='请输入用户名' ispassword={false} />
        <TextInputLT ref='passwordInput'
          {...this.props} title='密码' defaultText='请输入密码' ispassword={true} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this._loginRequest.bind(this)}
            style={{flex: 1, backgroundColor: 'green'}}>
            <Text style={styles.instructions}>
              登录
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._registerRequest.bind(this)}
            style={{flex: 1, backgroundColor: 'red'}}>
            <Text style={styles.instructions}>
              注册
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'yellow'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
