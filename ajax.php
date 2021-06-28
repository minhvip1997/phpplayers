<?php
$action  = $_REQUEST['action'];

if (!empty($action)) {
    require_once 'includes/players.php';
    $obj = new Player();
}

if($action == 'adduser' && !empty($_POST)){
$pname = $_POST['username'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$photo = $_FILES['photo'];
$pId = (!empty($_POST['userid'])) ? $_POST['userid'] : '';

$imagename = '';
if(!empty($photo['name'])){
    $imagename = $obj->uploadPhoto($photo);
    $playerData = [
        'pname' => $pname,
        'email' => $email,
        'phone' => $phone,
        'photo' => $imagename,
    ];
} else {
    $playerData = [
        'pname' => $pname,
        'email' => $email,
        'phone' => $phone,
    ]; 
}
$playerId = $obj->add($playerData);
if(!empty($playerId)){
    $player = $obj->getRow('id',$playerId);
    echo json_encode($player);
    exit();
    }
}

if($action == "getusers"){
    $page = (!empty($_GET['page'])) ?$_GET['page'] :1;
    $limit = 4;
    $start = ($page-1) * $limit;
    $players = $obj->getRows($start ,$limit );
    if(!empty($players)){
        $playerslist = $players;
    } else {
        $playerslist = [];
    }
    echo json_encode($playerslist);
    exit();
}
?>