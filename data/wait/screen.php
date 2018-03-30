<?php
include("../connect.php");
header('Content-Type: application/json');

$cat = $_GET["cat"]." Category";
//$base = $_GET["base"];


$DB = new DB();
$DB->query("
SELECT race_list.id, race_list.A AS NoPeserta, race_list.kategori, current ,name
FROM race_list JOIN peserta2018 ON race_list.A = peserta2018.NoPeserta
WHERE race_list.kategori = ?  AND race_list.id >=(SELECT id FROM race_list WHERE current='checked' AND race_list.kategori = ?)
ORDER BY race_list.id ASC
LIMIT 8;
")->param([$cat,$cat]);
$A =$DB->view();

$DB->query("
SELECT race_list.id, race_list.B AS NoPeserta, race_list.kategori, current ,name
FROM race_list JOIN peserta2018 ON race_list.B = peserta2018.NoPeserta
WHERE race_list.kategori = ? AND race_list.id >=(SELECT id FROM race_list WHERE current='checked'AND race_list.kategori = ?)
ORDER BY race_list.id ASC
LIMIT 8;
")->param([$cat,$cat]);
$B =$DB->view();
/*
$DB->query("
SELECT waiting_list.NoPeserta,waiting_list.urutan,waiting_list.base ,waiting_list.kategori
,name,anggota1,anggota2,anggota3 
FROM waiting_list JOIN peserta ON waiting_list.NoPeserta = peserta.NoPeserta
WHERE waiting_list.kategori = ? AND waiting_list.base = 'A'
ORDER BY waiting_list.urutan ASC;
")->param([$cat]);
$A =$DB->view();

$DB->query("
SELECT waiting_list.NoPeserta,waiting_list.urutan,waiting_list.base ,waiting_list.kategori
,name,anggota1,anggota2,anggota3 
FROM waiting_list JOIN peserta ON waiting_list.NoPeserta = peserta.NoPeserta
WHERE waiting_list.kategori = ? AND waiting_list.base = 'B'
ORDER BY waiting_list.urutan ASC;
")->param([$cat]);
$B =$DB->view();
*/
$fields = array(
    'A' => $A,
    'B' => $B
);

echo json_encode($fields);
?>