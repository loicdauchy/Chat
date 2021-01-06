// Variables globales
let lastId = 0 // id du dernier message affiché

// On attend le chargement du document
window.onload = () => {
    // On va chercher la zone texte
    let texte = document.querySelector("#texte")
    texte.addEventListener("keyup", verifEntree)

    // On va chercher le bouton valid
    let valid = document.querySelector("#valid")
    valid.addEventListener("click", ajoutMessage)

    // On charge les nouveaux messages
    setInterval(chargeMessages, 100)
}

/**
 * Charge les derniers messages en Ajax et les insère dans la discussion
 */
function chargeMessages(){
    // On instancie XMLHttpRequest
    let xmlhttp = new XMLHttpRequest()

    // On gère la réponse
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4){
            if(this.status == 200){
                // On a une réponse
                // On convertit la réponse en objet JS
                let messages = JSON.parse(this.response)
                // On retourne l'objet
                messages.reverse()

                // On récupère la div #discussion
                let discussion = document.querySelector("#discussion")

                for(let message of messages){
                    // On transforme la date du message en JS
                    let dateMessage = new Date(message.created_at)

                    // On ajoute le contenu avant le contenu actuel de discussion
                    var userName = document.getElementById('userName').value;
                    if(userName == message.pseudo){
                        discussion.innerHTML += `<div id='msg'><div id="msgP">${message.message}<span id="timeMsg">Moi, le ${dateMessage.toLocaleString()}</span></div><img id='avatar' src='${message.avatar}'></div>`
                        document.getElementById('discussion').scrollTop = document.getElementById('discussion').scrollHeight;
                    }else{
                        discussion.innerHTML += `<div id='msgA'><img id='avatar' src='${message.avatar}'><div id="msgP2">${message.message}<span id="timeMsg2">${message.pseudo}, le ${dateMessage.toLocaleString()}</span></div></div>`
                        document.getElementById('discussion').scrollTop = document.getElementById('discussion').scrollHeight;
                    }
                    

                    // On met à jour le lastId
                    lastId = message.id
                }
            }else{
                // On gère les erreurs
                let erreur = JSON.parse(this.response)
                alert(erreur.message)
            }
        }
    }

    // On ouvre la requête
    xmlhttp.open("GET", "ajax/chargeMessages.php?lastId="+lastId)

    // On envoie
    xmlhttp.send()
}


/**
 * Cette fonction vérifie si on a appuyé sur la touche entrée
 */
function verifEntree(e){
    if(e.key == "Enter"){
        ajoutMessage();
    }
}

/**
 * Cette fonction envoie le message en ajax à un fichier ajoutMessage.php
 */
function ajoutMessage(){
    // On récupère le message
    let message = document.querySelector("#texte").value
    
    // On vérifie si le message n'est pas vide
    if(message != ""){
        // On crée un objet JS
        let donnees = {}
        donnees["message"] = message

        // On convertit les données en JSON
        let donneesJson = JSON.stringify(donnees)

        // On envoie les données en POST en Ajax
        // On instancie XMLHttpRequest
        let xmlhttp = new XMLHttpRequest()

        // On gère la réponse
        xmlhttp.onreadystatechange = function(){
            // On vérifie si la requête est terminée
            if(this.readyState == 4){
                // On vérifie qu'on reçoit un code 201
                if(this.status == 201){
                    // L'enregistrement a fonctionné
                    // On efface le champ texte
                    document.querySelector("#texte").value = ""
                }else{
                    // L'enregistrement a échoué
                    let reponse = JSON.parse(this.response)
                    alert(reponse.message)
                }
            }
        }

        // On ouvre la requête
        xmlhttp.open("POST", "ajax/ajoutMessage.php")

        // On envoie la requête en incluant les données
        xmlhttp.send(donneesJson)
    }
}

function ajoutAvatar(avatar){
    // On récupère le message
    var avatar = avatar
    
    // On vérifie si le message n'est pas vide
    if(avatar != ""){
        // On crée un objet JS
        let donnee = {}
        donnee["avatar"] = avatar

        // On convertit les données en JSON
        let donneeJson = JSON.stringify(donnee)

        // On envoie les données en POST en Ajax
        // On instancie XMLHttpRequest
        let xmlhttp = new XMLHttpRequest()

        // On ouvre la requête
        xmlhttp.open("POST", "ajax/ajoutAvatar.php")

        // On envoie la requête en incluant les données
        xmlhttp.send(donneeJson)
    }
}
document.getElementById('f').addEventListener('click', function(){
    var avatar = document.getElementById('fv').value
    ajoutAvatar(avatar)
    alert('Les modifications seront effective au prochain message.')
})
document.getElementById('g').addEventListener('click', function(){
    var avatar = document.getElementById('gv').value
    ajoutAvatar(avatar)
    alert('Les modifications seront effective au prochain message.')
})
document.getElementById('h').addEventListener('click', function(){
    var avatar = document.getElementById('hv').value
    ajoutAvatar(avatar)
    alert('Les modifications seront effective au prochain message.')
})
document.getElementById('i').addEventListener('click', function(){
    var avatar = document.getElementById('iv').value
    ajoutAvatar(avatar)
    alert('Les modifications seront effective au prochain message.')
})

function typing(typingBool){
    let donneeeJson = JSON.stringify({ typingBool: typingBool });
    let xmlhttp = new XMLHttpRequest();
       
    xmlhttp.open("POST", "ajax/typing.php");
    xmlhttp.send(donneeeJson);
  }
  
  var typingText = document.getElementById('texte');
  typingText.addEventListener('keypress', function(){
    typing(1);
    setTimeout(function(){ typing(2); }, 3000);
  });

  function chargeTyping(){
    // On instancie XMLHttpRequest
    let xmlhttp = new XMLHttpRequest()

    // On gère la réponse
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4){
            if(this.status == 200){
                
                var typing = JSON.parse(this.response)

                let typingDiv = document.getElementById('typing')
                if(typing !== false){
                    typingDiv.innerHTML = `<p>${typing.pseudo} est en train d'écrire..</p>`
                }else{
                    typingDiv.innerHTML = ""
                }
                           
                                       
            }else{
                // On gère les erreurs
                let erreur = JSON.parse(this.response)
                alert(erreur.message)
            }
        }
    }

    xmlhttp.open("GET", "ajax/chargeTyping.php")
    xmlhttp.send()
}

setInterval(chargeTyping, 100)

function chargeOnline(){
    // On instancie XMLHttpRequest
    let xmlhttp = new XMLHttpRequest()

    // On gère la réponse
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4){
            if(this.status == 200){
                
                var onlines = JSON.parse(this.response)

                let onlineDiv = document.getElementById('online')
                for(let online of onlines){
                    var pseudo = online.pseudo.toString()
                    var div = document.getElementById('online').innerHTML
                    var n = div.includes(pseudo)
                    if(n !== false){
                
                    }else{
                        if(online.online != 2){
                            onlineDiv.innerHTML += `<div class="actifUser"><img class="actifAvatar" src="${online.avatar}"><div class="actifInfo"><p class="actifP">${online.pseudo}</p><p>est en ligne..</p> </div></div>`
                        }
                                                         
                    }
                  
                                       
                }                    
            }else{
                // On gère les erreurs
                let erreur = JSON.parse(this.response)
                alert(erreur.message)
            }
        }
    }

    xmlhttp.open("GET", "ajax/online.php")
    xmlhttp.send()
}


function chargeOnline2(){
    // On instancie XMLHttpRequest
    let xmlhttp = new XMLHttpRequest()

    // On gère la réponse
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4){
            if(this.status == 200){
                
                var onlines = JSON.parse(this.response)

                let onlineDiv = document.getElementById('online')
                for(let online of onlines){
                    var pseudo = online.pseudo.toString()
                    var div = document.getElementById('online').innerHTML
                    var n = div.includes(pseudo)
                    if(n !== true){
                
                    }else{
                        if(online.online == 2){
                            document.getElementById('online').innerHTML = ""
                        }
                                                         
                    }
                  
                                       
                }                    
            }else{
                // On gère les erreurs
                let erreur = JSON.parse(this.response)
                alert(erreur.message)
            }
        }
    }

    xmlhttp.open("GET", "ajax/online.php")
    xmlhttp.send()
}

setInterval(chargeOnline2, 100)
setInterval(chargeOnline, 100)









