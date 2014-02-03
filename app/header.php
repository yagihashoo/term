<?php
require_once("func.php");

ini_set("session.use_only_cookies", 1);
ini_set("session.cookie_httponly", true);
ini_set("session.gc_maxlifetime", 60 * 60 * 10);

$wd = dirname($_SERVER["SCRIPT_NAME"]);

session_start();
if (!isset($_SESSION["name"])) {
  header("Location: " . $wd . "/login.php");
} else {
  session_regenerate_id(true);
}

/**
 * Secure-session headers
 */
header("Secure-Session: 1");
header("Secure-Session-Ex: http://localhost/term/dhke.php");

$headers = getallheaders();
if(isset($headers["Secure-Session-Signature"]) and !$check_signature($headers["Secure-Session-Signature"])) {
  header("Location: ". $wd . "/logout.php");
}