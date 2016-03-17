<? 
$nome_server = "sql.xdomain.it";
$nome_utente = "xdomaini09636";
$password = "cygnx1";
$nome_db = "xdomaini09636";

$table = $_GET['t'];
$connessione = @mysql_connect($nome_server, $nome_utente, $password) or die("Arrrrgggghhhh! Non riesco a connettermi!!!");
$db = @mysql_select_db($nome_db,$connessione);
$table = $_GET['table'];
$query = mysql_query ($sql, $connessione);

function build_json_table($query){
	echo "[";
	while ($row = mysql_fetch_row($query)) {
		echo "{";
		echo " id: '".$row[0];
		echo "', Nome: '".$row[1];
		echo "', Cognome: '".$row[2];
		echo "', Email: '".$row[3];
		echo "'},";
	}
	echo "]";		
}

function build_json_select($query){
	echo "[";
	while ($row = mysql_fetch_row($query)) {
		echo "{";
		echo "Email: '".$row[3].",";
		echo "'},";
	}
	echo "]";		
}

switch($_GET['test']){	
	case "home":
		echo "Home Ajax generated text. Welcome in OpenJAjax!";		
	break;
    case "m_table":
		echo "Build table from JSON Object";		
	break;
	case "m_select":
		echo "Build select menu from JSON Object";		
	break;
}

switch($_GET['action']){	
	case "home":
		echo "Home Ajax generated text. Welcome in OpenJAjax!";		
	break;
	case "do_select":
		//$sql = "SELECT email from demoTable";
		$sql = "SELECT  id, name, surname, email from demoTable";
		build_json_select(mysql_query ($sql, $connessione));
	break;
	case "do_table":
		$sql = "SELECT  id, name, surname, email from demoTable";
		build_json_table(mysql_query ($sql, $connessione));
	break;
	case "test_string":
		echo "Im a string. I was returned from Ajax, nice!";
	break;	
}

?>
