<?php
ini_set("session.use_only_cookies", 1);
ini_set("session.cookie_httponly", true);
ini_set("session.gc_maxlifetime", 60 * 60 * 10);

$wd = dirname($_SERVER["SCRIPT_NAME"]);

session_start();
$_SESSION = array();
setcookie(session_name(), '', time() - 2592000, '/');
if (session_destroy()) {
  header("Location: " . $wd . "/login.php");
}
