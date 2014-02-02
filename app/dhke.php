<?php
/**
 * The script for D-H key exchange.
 * Noticed with Secure-Session-Ex header.
 */
 ini_set( 'display_errors', 1 );
 
if(isset($_POST["GBmodP"])) {
  $PG = `./dh/msg`;
  echo $PG;
}
