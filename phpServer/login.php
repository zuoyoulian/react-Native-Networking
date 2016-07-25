<?php

  $data = $_REQUEST;
    
  $name = $data["name"];
  $password = $data["password"];
    
  $connent = mysql_connect("127.0.0.1", "root", "");
    
  mysql_select_db("Person", $connent);
    
  $result = mysql_query("select * from register where username = '$name'");
    
  // 从结果中查询数据
  $row = mysql_fetch_array($result);
    
  //echo(json_encode($row));
  
   $array = array();
  if (!$row) {
	$array["login"] = "用户不存在";
  } else {
	// 判断密码
	if($password == $row["password"]){
	  $array["login"] = "success";
	} else {
	  $array["login"] = "error";
	}
  }
  
  
  echo(json_encode($array));

?>