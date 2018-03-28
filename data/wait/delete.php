<?php
include("../connect.php");
//header('Content-Type: application/json');
$id = $_POST['id'];

$DB = new DB();

    $DB->query("DELETE FROM race_list WHERE id = ? ")
    ->param( [$id] );

    if($DB->send()){
        echo "sucess";
    }

?>