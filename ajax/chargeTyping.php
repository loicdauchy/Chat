<?php

if($_SERVER['REQUEST_METHOD'] == 'GET'){
 
        require_once('../inc/bdd.php');

        $sql = 'SELECT `users`.`pseudo` , `users`.`avatar` , `users`.`typing` FROM `users` WHERE `users`.`typing` = 1';

        $query = $db->query($sql);

        $typings = $query->fetch();

        $typing = json_encode($typings);

        echo $typing;
    
}else{
    http_response_code(405);
    echo json_encode(['message' => 'Mauvaise méthode']);
}