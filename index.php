<?php
session_start();
include_once('inc/header.php');
if(isset($_SESSION['user']) && !empty($_SESSION['user'])){
    ?>
    <div id='topPage'><p id='bp'>Bonjour <span><?= $_SESSION['user']['pseudo'] ?> </span><input id="userName" type='hidden' value='<?= $_SESSION['user']['pseudo'] ?>'></p><a class="btn btn-danger" href="deconnexion.php">Déconnexion</a></div>
<?php
}else{
    ?>
    <a class="btn btn-primary mr-2" href="connexion.php">Connexion</a>
<?php
}
?>

<div id="main">
<div id="online" class="col-4 my-1">
    <div id="titleC"> Contact en ligne</div>
</div>
<div class="col-8 my-1">
<div style="width:100%" id="divAvatar" class="d-flex justify-content-around align-items-center">
    <h4 style="color:white; margin-right:10px; font-weight:400" class="text-center">Vos Avatar..</h4>
    <div id="f"><img class = "chooseAvatar" src="img/yoshi.jpg" alt=""> <input id="fv" type="hidden" value="img/yoshi.jpg"></div>
    <div id="g"><img class = "chooseAvatar" src="img/sonic.png" alt=""> <input id="gv" type="hidden" value="img/sonic.png"></div>
    <div id="h"><img class = "chooseAvatar" src="img/mario.jpg" alt=""> <input id="hv" type="hidden" value="img/mario.jpg"></div>
    <div id="i"><img class = "chooseAvatar" src="img/pika.png" alt=""> <input id="iv" type="hidden" value="img/pika.png"></div>
</div>
    <div style="width:100%">
        <div class="p-2" id="discussion">
        <div id="typing"></div>
        </div>
    </div>
    <div style="width:100%" class="card-footer">
        <div class=" saisie input-group">
        <textarea id="texte" name="" class="form-control type_msg" placeholder="Entrez votre message..."></textarea>
            <div class="input-group-append">
                <span id="valid" class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
            </div>
        </div>
    </div>
</div>
</div>


<?php
include_once('inc/footer.php');
