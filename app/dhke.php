<?php
/**
 * The script for D-H key exchange.
 * Noticed with Secure-Session-Ex header.
 */

ini_set("session.use_only_cookies", 1);
ini_set("session.cookie_httponly", true);
ini_set("session.gc_maxlifetime", 60 * 60 * 10);

$wd = dirname($_SERVER["SCRIPT_NAME"]);

session_start();
if (!isset($_SESSION["name"])) {
  // header("Location: " . $wd . "/login.php");
} else {
  session_regenerate_id(true);
}
header("Access-Control-Allow-Origin: *");

if (!isset($_POST["GBmodP"])) {
  $PG = exec("./dh/msg");
  $PG = explode(",", $PG);
  $_SESSION["R"] = $PG[1];
  $prm = explode(":", $PG[0]);
  $prm = $prm[0];
  $_SESSION["P"] = $prm;
  echo $PG[0];
} else if(preg_match("/^[0-9]+$/", $_POST["GBmodP"])) {
  $_SESSION["GBmodP"] = $_POST["GBmodP"];
  $_SESSION["key"] = exec("./dh/key {$_POST['GBmodP']} {$_SESSION['R']} {$_SESSION['P']}");
  // var_dump($_SESSION);
}
