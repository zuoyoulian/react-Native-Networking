# react-Native-Networking
使用php模拟后台接口，通过网络请求实现登录注册功能。  
![示例](https://github.com/zuoyoulian/react-Native-Networking/blob/master/Images/示例.png?raw=true)
## TextInputLT.js
自定义的输入框组件。组件的结构是前面一个label标签标记是用户名输入还是密码输入，后面是一个输入框，用来输入用户名或密码。

![用户名](https://github.com/zuoyoulian/react-Native-Networking/blob/master/Images/用户名.png?raw=true)
![用户名](https://github.com/zuoyoulian/react-Native-Networking/blob/master/Images/密码.png?raw=true)  
自定义输入框组件的创建代码如下： 
 
 ```
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
 ```
 由于输入是在该组件中完成的，还需要将输入框中的内容传出来  
 
 ```
 getTextValue() {
    return this.state.textValue
  }
 ```
## App.js
 由于iOS和Android的入口不同，所以将登录、注册的功能都放到App.js中，然后两端都可以调用。  
### 登录
```
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
```
### 注册
```
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
```
## 运行
将phpServer中的登录、注册后台文件放到服务器上，然后修改登录和注册函数中的请求地址即可。 