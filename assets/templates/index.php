<!DOCTYPE html>
<html class="navpage" lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="msapplication-TileColor" content="#ff9601">
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<link href="../style.css?v2" rel="stylesheet">
	<link rel="mask-icon" color="#ff9601">
	<title>URRAA.ru <?=str_replace("/", " / ", rtrim($_SERVER["SCRIPT_URL"], "/"))?></title>
</head>
<body>
<div class="title-over">
	<a href="/" class="logo"></a>
	<h1 class="title"><a href="/">URRAA.ru</a> <span><?=str_replace("/", " / ", rtrim($_SERVER["SCRIPT_URL"], "/"))?></span></h1>
</div>
<nav class="navigation">
	<?foreach(glob(__DIR__."/../*") as $path):
		if (!is_dir($path)) continue;
		$name = basename($path);
		?>
		<?if($name == trim($_SERVER["REQUEST_URI"], "/")):?>
			<span><?=$name?></span>
		<?else:?>
			<a href="/<?=$name?>/"><?=$name?></a>
		<?endif?>
	<?endforeach;?>
</nav>
<ul class="sitelist">
	<?
	foreach (glob($_SERVER["DOCUMENT_ROOT"].$_SERVER["SCRIPT_URL"]."*") as $file) {
		$filename = basename($file);
		$fileInfo = pathinfo($file);
		if (in_array($fileInfo["extension"], array("php", "js", "css"))) continue;
		if (in_array($filename, array("index.php", "ajax", "css", "favicon", "fonts", "img", "js", "pic"))) continue;
		?>
		<li><a href="<?= str_replace($_SERVER["DOCUMENT_ROOT"], "", $file) ?>"><?= $filename ?></a></li>
		<?
	}
	?>
</ul>
</body>
</html>