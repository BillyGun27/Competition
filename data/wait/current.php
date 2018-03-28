<?php
include("../connect.php");
//header('Content-Type: application/json');
$id = $_POST["id"];


    
$DB = new DB();
  //  $DB->query("INSERT INTO waiting_list( NoPeserta,kategori,base,urutan ) VALUES(?,?,?,(SELECT COUNT(NoPeserta) + 1   FROM  (SELECT * FROM waiting_list) wl  WHERE kategori = ? AND  base = ?  ) ) ")
   // ->param( [$NoPeserta ,$kategori ,$base ,$kategori ,$base ] );
   $DB->query("UPDATE race_list SET current = null ")
   ->param( [$id ] );

   $DB->send() ;

    $DB->query("UPDATE race_list SET current = 'checked' WHERE id = ? ")
    ->param( [$id ] );

    if($DB->send()){
        echo "sucess";
    }

    


?>