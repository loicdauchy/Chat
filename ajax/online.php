<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == 'GET'){
 
    require_once('../inc/bdd.php');

    $sql = 'SELECT `users`.`pseudo` , `users`.`avatar` , `users`.`online` FROM `users` ';

    $query = $db->query($sql);

    $onlines = $query->fetchAll();

    $online = json_encode($onlines);
    echo $online;

}else{
http_response_code(405);
echo json_encode(['message' => 'Mauvaise méthode']);
}