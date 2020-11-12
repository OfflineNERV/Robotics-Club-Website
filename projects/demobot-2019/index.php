<?php

// header functions and include
include_once("../../assets/templates/header.php");
$pageDescription = "Demobot was our roaming demonstrative robot in 2019.";
$keywords = "UCF robotics club, University of Central Florida, UCF, robotics club, robotics club,
                               UCF robotics, UCF club, RSO, AUVSI, autonomous, SUAS, AHRS, IMU, i2C, ROS, ROS melodic,
                               melodic, linux, ubuntu, open source, opensource, engineering, mechanical,
                               mechanical engineering, electrical, eletrical engineering, computer, computers,
                               computer science, FOSS, undergraduate, graduate, operating system, vehicles, unmanned,
                               machine learning, computer vision, sensors, lidar, demobot, citrobot, Robotics Club of
                               Central Florida, central florida, robotics club, demobot, demonstrative robot, demostrative, robot
                               demonstration robot, demonstration";
$headerGen = new Header("Alexandra French", "September 10, 2020", "Alexandra French", "November 12, 2020");
$headerGen->generateComment();
$headerGen->generateCommon("Robotics Club Project: Demobot 2019", $pageDescription, $keywords, "https://robotics.ucf.edu/projects/demobot-2019/index");
$headerGen->generateCSS();
$headerGen->genProjectSEO("https://robotics.ucf.edu/projects/demobot-2019/index", "Robotics Club Project: Demobot 2019", $pageDescription, "August 2018", "https://robotics.ucf.edu/projects/assets/imgs/demobot-2019.jpg");
$headerGen->endHeader();


// navbar
include_once("../../assets/templates/navbar.php");


// page content
include_once('assets/templates/demobot-2019.html');


// footer functions and include
include_once("../../assets/templates/footer.php");
$footerGen = new Footer();

$footerGen->generateFooter(2020);
$footerGen->generateJs();
$footerGen->endFile();
?>
