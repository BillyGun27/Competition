<?php
include("../connect.php");
header('Content-Type: application/json');

$cat = ["Elementary","Junior","Senior","Open"];//$_GET["cat"]." Category";
//$base = $_GET["base"];

$bigscreen = array();

$DB = new DB();

for($i=0;$i<4;$i++){
    $DB->query("
SELECT race_list.id, race_list.A AS NoPeserta, race_list.kategori, current ,name
FROM race_list JOIN peserta2018 ON race_list.A = peserta2018.NoPeserta
WHERE race_list.kategori = ?  AND race_list.id >=(SELECT id FROM race_list WHERE current='checked' AND race_list.kategori = ?)
ORDER BY race_list.id ASC
LIMIT 8;
")->param([$cat[$i]." Category",$cat[$i]." Category"]);
$A =$DB->view();

$DB->query("
SELECT race_list.id, race_list.B AS NoPeserta, race_list.kategori, current ,name
FROM race_list JOIN peserta2018 ON race_list.B = peserta2018.NoPeserta
WHERE race_list.kategori = ? AND race_list.id >=(SELECT id FROM race_list WHERE current='checked'AND race_list.kategori = ?)
ORDER BY race_list.id ASC
LIMIT 8;
")->param([$cat[$i]." Category",$cat[$i]." Category" ]);
$B =$DB->view();
    
    
    $fields = array(
        'A' => $A,
        'B' => $B
    );

    $bigscreen[$cat[$i]] = $fields;
 
}

echo json_encode($bigscreen);

?>