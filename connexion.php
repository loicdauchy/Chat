<?php

session_start();

if(isset($_POST) && !empty($_POST)){

    if(isset($_POST['email']) && !empty($_POST['email']) && isset($_POST['pass']) && !empty($_POST['pass'])){
        $mail = strip_tags($_POST['email']);
        $pass = $_POST['pass'];

        require_once('inc/bdd.php');

        $sql = 'SELECT * FROM `users` WHERE `email` = :email;';

        $query = $db->prepare($sql);

        $query->bindValue(':email', $mail, PDO::PARAM_STR);

        $query->execute();

        $user = $query->fetch(PDO::FETCH_ASSOC);

        if(!$user){
            echo 'Email et/ou mot de passe invalide';
        }else{
  
            if(password_verify($pass, $user['password'])){
      
                $_SESSION['user'] = [
                    'id'    => $user['id'],
                    'email' => $user['email'],
                    'pseudo'  => $user['pseudo']
                ];
            $sql = 'UPDATE users SET `online` = :onlines WHERE id = :user ';
            $query = $db->prepare($sql);
            $query->bindValue(':onlines', 1 , PDO::PARAM_STR);
            $query->bindValue(':user', $_SESSION['user']['id'], PDO::PARAM_INT);
            $query->execute();
            header('Location: index.php');
            }else{
                echo 'Email et/ou mot de passe invalide';
            }
        }

    }else{
        echo "Veuillez remplir tous les champs...";
    }
}

include_once('inc/header.php');
?>
<div class="col-12 my-1">
    <h1>Connexion</h1>
    <form method="post">
        <div class="form-group">
            <label for="email">E-mail :</label>
            <input class="form-control" type="email" id="email" name="email">
        </div>
        <div class="form-group">
            <label for="pass">Mot de passe :</label>
            <input class="form-control" type="password" id="pass" name="pass">
        </div>
        <button class="btn btn-primary">Me connecter</button>
    </form>
</div>
<?php
include_once('inc/footer.php');
