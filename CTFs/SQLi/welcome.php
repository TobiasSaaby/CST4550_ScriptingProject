<?php
/* Initialize the session */
session_start();
 
/* Check if the user is logged in, if not then redirect him to login page */
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="assets/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>
    <div class="page-header">
        <h1>Welcome <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. </h1>
        <p>you have successfully logged in.</p>
        <?php
            if(empty($_SESSION["id"])){
                echo "FLAG-9c4e69e4cfd239d4e16ba0c189f8d643";
            }
        ?>
    </div>
    <p>
        <a href="logout.php" class="btn btn-danger">logout</a>
    </p>
</body>
</html>