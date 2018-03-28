<?php
include("../connect.php");
//header('Content-Type: application/json');
$A = $_POST['A'];
$B = $_POST['B']; 
$kategori = $_POST['kategori']; 


    
$DB = new DB();
  //  $DB->query("INSERT INTO waiting_list( NoPeserta,kategori,base,urutan ) VALUES(?,?,?,(SELECT COUNT(NoPeserta) + 1   FROM  (SELECT * FROM waiting_list) wl  WHERE kategori = ? AND  base = ?  ) ) ")
   // ->param( [$NoPeserta ,$kategori ,$base ,$kategori ,$base ] );
    
    $DB->query("INSERT INTO race_list( A,B,kategori ) VALUES(?,?,? ) ")
    ->param( [$A,$B,$kategori ] );

    if($DB->send()){
        echo "sucess";
    }

    


?>