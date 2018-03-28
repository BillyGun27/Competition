<?php
include("../connect.php");
header('Content-Type: application/json');

$cat = $_GET["cat"]." Category";

$DB = new DB();
$DB->query("SELECT * FROM peserta2018 WHERE kategori = ?")
->param([$cat]);

echo json_encode($DB->view());
?>