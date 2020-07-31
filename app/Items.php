<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use PDO;
class Items extends Model
{
    protected $table = 'items';
    protected $fillable = [
          'item_code','item_name', 're_order_level', 'selling_price','label_price', 
          'category','measure_unit'];

          
    public static function getItemWiseSalesReport($itemName,$startDate,$endDate, $location){
        $connectionString = 'mysql:host=127.0.0.1;dbname=cityhardware';
        $conn = new PDO( $connectionString, 'root', '');
    if((isset ($itemName))) {
            $sql = "SELECT i.item_code, i.item_name, SUM(d.Quantity) AS Quantity, SUM(d.Net_Amount) AS Gross_Amount, 
                    SUM(d.Discount_Price) AS Total_Discount, SUM(d.Gross_Amount) AS Net_Amount
                    FROM invoice_header h 
                    INNER JOIN invoice_details d ON  d.Invoice_Header = h.id
                    INNER JOIN items i ON i.id = d.Item
                    WHERE (i.item_name='$itemName') AND (h.Invoice_Date BETWEEN '$startDate' AND '$endDate')AND (h.Location = (CASE '$location' WHEN '' THEN  h.Location ELSE '$location' END))
                    GROUP BY i.item_code
                    ORDER BY i.item_name";
        }
       
        
        
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
