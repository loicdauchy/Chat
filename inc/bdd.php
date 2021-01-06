<?php

try
        {
            $db = new PDO('mysql:host=localhost;dbname=loicd_chat;port=3306;charset=utf8', 'loicd', 'nFOn9al54TPigA==');
            return $db;        
        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
            
        }
