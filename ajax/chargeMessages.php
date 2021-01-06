<?php

if($_SERVER['REQUEST_METHOD'] == 'GET'){
 
    if(isset($_GET['lastId'])){
        $lastId = (int)strip_tags($_GET['lastId']);

        $filtre = ($lastId > 0) ? " WHERE `messages`.`id` > $lastId" : '';

        require_once('../inc/bdd.php');

        $sql = 'SELECT `messages`.`id`, `messages`.`message`, `messages`.`created_at`, `users`.`pseudo` , `users`.`avatar` , `users`.`typing` FROM `messages` LEFT JOIN `users` ON `messages`.`users_id` = `users`.`id`'.$filtre.' ORDER BY `messages`.`id` DESC LIMIT 5000;';

        $query = $db->query($sql);

        $messages = $query->fetchAll();

        $messagesJson = json_encode($messages);
        
        echo $messagesJson;
    }
}else{
    http_response_code(405);
    echo json_encode(['message' => 'Mauvaise méthode']);
}