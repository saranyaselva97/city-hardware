<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use PDO;
class Stocks extends \Illuminate\Database\Eloquent\Model
{
    

    protected $table = 'stocks';
    protected $fillable = [
          'Quantity','Average_Price', 'Location', 'Item'];

    public static function getStockReport($location) {
        $connectionString = 'mysql:host=127.0.0.1;dbname=cityhardware';
        $conn = new PDO( $connectionString, 'root', '');
            $sql = "SELECT i.item_code, i.item_name, SUM(s.Quantity) AS Quantity, (SUM(s.Quantity) * s.Average_Price) AS Total_Amount, i.selling_price,"
                    . "s.Average_Price "
                    . "FROM stocks s "
                    . "INNER JOIN items i On i.id = s.Item "
                    . "WHERE s.Location = (CASE '$location' WHEN '' THEN s.Location ELSE '$location' END) "
                    . "GROUP BY i.id "
                    . "ORDER BY i.item_name";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
    
            $list = array();
    
            while ($row = $stmt->fetch()) {
                $list[] = $row;
            }
    
            $conn = null;
    
            return $list;
        }
        
        
}
