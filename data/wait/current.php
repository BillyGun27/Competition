<?php
include("../connect.php");
//header('Content-Type: application/json');
$id = $_POST["id"];
$cat = $_POST["cat"];


    
$DB = new DB();
  //  $DB->query("INSERT INTO waiting_list( NoPeserta,kategori,base,urutan ) VALUES(?,?,?,(SELECT COUNT(NoPeserta) + 1   FROM  (SELECT * FROM waiting_list) wl  WHERE kategori = ? AND  base = ?  ) ) ")
   // ->param( [$NoPeserta ,$kategori ,$base ,$kategori ,$base ] );
   $DB->query("SET SQL_SAFE_UPDATES = 0; UPDATE race_list SET current = null WHERE kategori = ?")
   ->param( [ $cat ] );

   $DB->send() ;

    $DB->query("UPDATE race_list SET current = 'checked' WHERE id = ? ")
    ->param( [$id ] );

    if($DB->send()){
        echo $cat;
    }else{
        echo "error";
    }

    


?>