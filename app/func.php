<?php
function html_escape($str) {
  return htmlspecialchars($str, ENT_QUOTES, "UTF-8");
}

function enhash($password) {
  $salt = bin2hex(openssl_random_pseudo_bytes(32));
  $hash = hash("sha512", $salt . $password);
  return "{$salt}:{$hash}";
}

function check_password($password, $hash) {
  $hash = explode(":", $hash);
  $salt = $hash[0];
  $hash = $hash[1];
  if (hash("sha512", $salt . $password) === $hash) {
    return true;
  }
  return false;
}

function check_signature($signature) {
  $key = $_SESSION["key"];
  $cookie = $_SERVER["HTTP_COOKIE"];
  return hash_hmac('sha256', $cookie, $key) === $signature;
}

function my_getallheaders() {
  global $HTTP_SERVER_VARS;
  $headers = array();
  if (!empty($HTTP_SERVER_VARS) && is_array($HTTP_SERVER_VARS)) {
    reset($HTTP_SERVER_VARS);
    while ($each_HTTP_SERVER_VARS = each($HTTP_SERVER_VARS)) {
      $name = $each_HTTP_SERVER_VARS['key'];
      $value = $each_HTTP_SERVER_VARS['value'];
      if (substr($name, 0, 5) == 'HTTP_')
        $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
    }
  }
  return $headers;
}
