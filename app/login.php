<?php
require_once("func.php");

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

header("Secure-Session: 1");
header("Secure-Session-Ex: http://test.yagihashoo.com/term/dhke.php");

if(isset($_SESSION["name"])) {
  header("Location: " . $wd . "/");
  dir("");
}

if (isset($_POST["name"]) and !is_array($_POST["name"]) and isset($_POST["password"]) and !is_array($_POST["password"])) {
  $name = $_POST["name"];
  $password = $_POST["password"];
}

/*
 * Temporary
 */
$users = file_get_contents("users");
$users = explode("\n", $users);
foreach ($users as &$user) {
  $user = explode(":", $user);
}
foreach ($users as $user) {
  if ($user[0] == $name and check_password($password, "{$user[1]}:{$user[2]}")) {
    $_SESSION["name"] = $user;
    header("Location: " . $wd . "/");
    break;
  }
}
/*
 * Temporary END
 */
?>
<!doctype html>

<html lang="ja">
  
<head>
  <meta charset="utf-8" />
  <title>＿|￣| Σ・∴'、-=≡(っ'ヮ'c)ｳｯﾋｮｫｫｫｫｫｧ</title>
  <link rel="stylesheet" href="css/style.css" />
  <script src="js/jquery-2.0.3.min.js"></script>
  <script src="js/script.js"></script>
</head>

<body id="login">
  <form method="POST">
    <h1>SECURE SESSION</h1>
    <label>Login name
      <input type="text" name="name" autofocus />
    </label>
    <label>Password
      <input type="password" name="password" />
    </label>
    <input type="submit" value="login" />
  </form>

</body>

</html>