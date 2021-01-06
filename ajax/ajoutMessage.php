<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
 
    if(isset($_SESSION['user']['id'])){
     
        $donneesJson = file_get_contents('php://input');

        $donnees = json_decode($donneesJson);

        if(isset($donnees->message) && !empty($donnees->message)){
     
            require_once('../inc/bdd.php');

            $sql = 'INSERT INTO `messages`(`message`, `users_id`) VALUES (:message, :user);';

            $query = $db->prepare($sql);

            $query->bindValue(':message', strip_tags($donnees->message), PDO::PARAM_STR);
            $query->bindValue(':user', $_SESSION['user']['id'], PDO::PARAM_INT);

            if($query->execute()){
                http_response_code(201);
                echo json_encode(['message' => 'Enregistrement effectué']);
            }else{
                http_response_code(400);
                echo json_encode(['message' => 'Une erreur est survenue']);
            }
        }else{
            // Pas de message
            http_response_code(400);
            echo json_encode(['message' => 'Le message est vide']);
        }
    }else{
        // Non connecté
        http_response_code(400);
        echo json_encode(['message' => 'Vous devez vous connecter']);
    }
}else{
    // Mauvaise méthode
    http_response_code(405);
    echo json_encode(['message' => 'Mauvaise méthode']);
}