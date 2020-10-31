<!--
    Name: Aditya Viswanatham
    NetID: arv160730
    CS 6314.502
-->

<!doctype html>
<html>
	<head>
		<title>Popular Baby Names</title>
	</head>
	<body>
		<?php 
		?>
		<div align="center">
			<h1>Popular Baby Names</h1>
			<br>
			<br>
			<div id="babyform">
				<form name="form_baby" method="GET" action="#">
					<select name="year" id="year">
                        <option value="2005">2005</option>
						<option value="2006">2006</option>
						<option value="2007">2007</option>
						<option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
						<option value="2011">2011</option>
						<option value="2012">2012</option>
						<option value="2013">2013</option>
						<option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <!-- Default -->
						<option value="ALL YEARS" selected>All Years</option>
					</select>
					<script type="text/javascript">
						document.getElementById('year').value = "<?php echo $_GET['year'];?>";
                    </script>
                      
					<select name="gender" id="gender">
						<option value="m">Male</option>
                        <option value="f">Female</option>
                        <!-- Default -->
						<option value="BOTH" selected>Both</option>
					</select>
					<script type="text/javascript">
						document.getElementById('gender').value = "<?php echo $_GET['gender'];?>";
                    </script>
                      
					<input type="submit" name="Submit">
				</form>
			</div>
		</div>
		<div name="result">
        </div>
        <?php
            try {
                $conn = new PDO("mysql:host=localhost;dbname=SSA", "root", "root");
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            catch(PDOException $e) {
                echo "Connection Failed: ".$e->getMessage();
            }
            if (isset($_GET['Submit'])) {
                $year = $_GET['year'];
                $gender = $_GET['gender'];
                if (!isset($year) || trim($year) == "" || trim($year) == "ALL YEARS")
                    $bYear = "%%";
                else
                    $bYear = trim($year);
                if (!isset($gender) || trim($gender) == "" || trim($gender) == "BOTH")
                    $bGender = "%%";
                else
                    $bGender = trim($gender);
            }
            try {
                $sql = "SELECT * FROM BabyNames WHERE gender LIKE '" . $bGender . "' AND year LIKE '" . $bYear . "'";
                $result = $conn->query($sql);
                if ($result->rowCount() > 0) {
                    echo "<table><tr><th>Ranking</th><th>Name</th><th>Year</th><th>Gender</th></tr>";
					while($row = $result->fetch())
						echo "<tr><td>" . $row[2] . "</td><td>" . $row[0] . "</td><td>" . $row[1] . "</td><td>" . $row[3] . "</td></tr>"; 
					echo "</table>";
                }
                else
                    echo "Nothing to display";
            }
            catch(PDOException $e) {
                echo $e->getMessage();
            }
            $conn = null;
        ?>
	</body>
</html>