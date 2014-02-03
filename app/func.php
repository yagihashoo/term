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
  if(hash("sha512", $salt . $password) === $hash) {
    return true;
  }
  return false;
}

function check_signature($signature) {
  $key = $_SESSION["key"];
  $cookie = $_SERVER["HTTP_COOKIE"];
  return hash_hmac('sha256', $cookie, $key) === bin2hex(base64_decode($signature));
}
