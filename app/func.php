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

if (!function_exists('apache_request_headers')) {
  function apache_request_headers() {
    $arh = array();
    $rx_http = '/\AHTTP_/';
    foreach ($_SERVER as $key => $val) {
      if (preg_match($rx_http, $key)) {
        $arh_key = preg_replace($rx_http, '', $key);
        $rx_matches = array();
        // do some nasty string manipulations to restore the original letter case
        // this should work in most cases
        $rx_matches = explode('_', $arh_key);
        if (count($rx_matches) > 0 and strlen($arh_key) > 2) {
          foreach ($rx_matches as $ak_key => $ak_val)
            $rx_matches[$ak_key] = ucfirst($ak_val);
          $arh_key = implode('-', $rx_matches);
        }
        $arh[$arh_key] = $val;
      }
    }
    return ($arh);
  }

}
