<!doctype html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>PHP Piotr Kowalski</title>
</head>
<body>
<?php
if (!filter_has_var(INPUT_GET, 'id')) {
    echo('Missing ID');
    exit(1);
}

$aID = filter_var($_REQUEST['id'], FILTER_SANITIZE_NUMBER_INT);
$anID = filter_var($aID, FILTER_VALIDATE_INT);

if (!is_int($anID)) {
    echo('Invalid ID');
    exit(1);
}

$apMySQLi = new \mysqli('localhost', 'root', '', 'phppai', 3306);
if ($apMySQLi->connect_errno) {
    echo('connect_erno= ' . $apMySQLi->connect_errno . ';' . $apMySQLi->connect_error);
    exit(1);
}

$astrQuery = 'SELECT * FROM Records WHERE id='.$anID;
$aResult = $apMySQLi->query($astrQuery);
if(!($aResult instanceof MySQLI_Result)){
    echo ('errno = '.$apMySQLi->errno.';'.$apMySQLi->error);
    exit(1);
}

$aRow = $aResult->fetch_assoc();
if(!is_array($aRow)){
    echo('No data for id!');
    exit(1);
}

$astrAdded = $aRow['Added'] ?? 'No data';
$astrName = $aRow['FirstName'] ?? 'No name';
$astrSurname = $aRow['Surname'] ?? 'No surname';
$astrAge = $aRow['Age'] ?? 'No age';

echo "<div>Dodano <b>{$astrAdded}</b></div>";
echo "<div>Imię <b>{$astrName}</b></div>";
echo "<div>Nazwisko <b>{$astrSurname}</b></div>";
echo "<div>Wiek <b>{$astrAge}</b></div>";

$apMySQLi->close();
?>
</body>
</html>