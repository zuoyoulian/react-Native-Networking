<?php

  
  if(!function_exists('apache_request_headers')) {
    $appName = $_SERVER['app'];
  } else {
    $appName =  apache_request_headers()['app'];
  }
  
  $data = $_REQUEST;
  if($appName == 'ios-networking') {
	$json = file_get_contents('php://input');
    $data = json_decode($json, TRUE);
  }
  
  /*
$array = array();
  $array["connect"] = "success";
  echo(json_encode($data));
  die();
*/
  $name = $data["name"];
  $password = $data["password"];
  
  
    
  $array = array();
    
  // 登录服务器数据库  第一个参数：数据库服务器地址；第二个参数：服务器用户名；第三个参数：密码
  $connect = mysql_connect("127.0.0.1", "root", "");
  if($connect){
  //echo('链接服务器成功');
        
    $array["connect"] = "success";
  } else {
  //echo("链接失败");
  //die;
    $array["connect"] = "error";
  }
    
// 选择数据库
  mysql_select_db("Person", $connect);
    
// 将用户名、密码插入到数据库中
  if($name != ''){
    // 查询用户名是否存在
    $result = mysql_query("select * from register where username = '$name'");
    $row = mysql_fetch_array($result);
     
    if($row) {
	  $array["error"] = "用户名已经存在";
    } else {
	  if(mysql_query("INSERT INTO register(username, password) VALUES ('$name','$password')")){
        //echo("插入成功");
        $array["result"] = "insert success";
      } else {
        //echo("插入失败");
        //die;
        $array["error"] = "插入失败";
      }
    }
  } else {
	$array["error"] = "用户名为空";
  }
  
  echo(json_encode($array));
?>


