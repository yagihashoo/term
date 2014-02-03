<?php
require_once (__DIR__ . "/head.php");
?>
<body>
<?php
  echo "<pre>";
  var_dump($_SERVER["HTTP_COOKIE"]);
  echo "</pre>";
?>
</body>

</html>