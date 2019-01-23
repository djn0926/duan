<?php
$pdo = new PDO('mysql:host=127.0.0.1;dbname=rb','root','root');
$sql = "select * from img";
$data=$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
//print_r($data);die;
?>
<!DOCTYPE html>
<html>
<head>
    <title>Bootstrap 实例 - 简单的轮播（Carousel）插件</title>
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<center>
	<div id="myCarousel" class="carousel slide" style="width: 300px;">
    <!-- 轮播（Carousel）指标 -->
    <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    <!-- 轮播（Carousel）项目 -->
    <div class="carousel-inner" >
        
        <?php foreach ($data as $key => $v): ?>
        	<?php if ($key == 0) { ?>
        		<div class="item active">
		            <img src="http://127.0.0.1/xiao4/yii/img/<?=$v['img_img'] ?>" alt="First slide">
		        </div>
        	<?php }else { ?>
        		<div class="item">
		            <img src="http://127.0.0.1/xiao4/yii/img/<?=$v['img_img'] ?>" alt="Second slide">
		        </div>
        	<?php } ?>
        	

        <?php endforeach ?>
        
    </div>
    <!-- 轮播（Carousel）导航 -->
    <a class="carousel-control left" href="#myCarousel"
       32.      data-slide="prev">&lsaquo;</a>
    <a class="carousel-control right" href="#myCarousel"
       34.      data-slide="next">&rsaquo;</a>
</div>
</center>


</body>
</html>
