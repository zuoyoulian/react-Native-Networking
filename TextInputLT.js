import React, { Component } from 'react';
 import {

   Text,
   TextInput,
   View,
   StyleSheet,
} from 'react-native';


export default class TextInputLT extends React.Component {

// 默认设置Props
  static defaultProps={
    title: '名称',
    defaultText: '内容',
    ispassword: false,
  }
  // 初始化设置state
  constructor(props) {
    super(props);
    this.state = {
      textValue: ''
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.txtBorder}>
          <Text style={styles.txtName}> {this.props.title} </Text>
          <TextInput ref='txt'
            autoCapitalize="none"
            placeholder={this.props.defaultText}
            autoCorrect={false}
            secureTextEntry={this.props.ispassword}
            onChangeText = {(result) => {
              this.setState({
                textValue: result
              })
            }}
            value = {this.state.textValue}
            style={styles.textInput}
          />
        </View>
      </View>
    )
  }

  getTextValue() {
    return this.state.textValue
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtBorder: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51A7F9',
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 25,
    flexDirection: 'row'
  },
  txtName: {
    height: 20,
    width: 40,
    marginLeft: 20,
    fontSize: 15,
    marginTop: 15,
    color: '#51A7F9',
    marginRight: 10,
    fontSize: 14,
  },
  textInput: {
    height: 50,
    width: 200
  }
})
