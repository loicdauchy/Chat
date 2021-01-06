<?php
session_start();
require_once('inc/bdd.php');
$sql = 'UPDATE users SET `online` = :onlines WHERE id = :user ';
            $query = $db->prepare($sql);
            $query->bindValue(':onlines', 2 , PDO::PARAM_STR);
            $query->bindValue(':user', $_SESSION['user']['id'], PDO::PARAM_INT);
            $query->execute();
unset($_SESSION['user']);

header('Location: '.$_SERVER['HTTP_REFERER']);