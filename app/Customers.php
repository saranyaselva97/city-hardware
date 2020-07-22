<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use PDO;
class Customers extends Model
{
    protected $table = 'customers';
    protected $fillable = [
          'customer_code',
          'customer_name','address', 'contact', 
    ];

    public function sales_order_header(){
        return $this->hasMany(Sales_order_header::class);
       }

       public static function getCustomerDueByCustomerId($customerId){
        $connectionString = 'mysql:host=127.0.0.1;dbname=cityhardware';
        $conn = new PDO( $connectionString, 'root', '');
        $sql = "SELECT SUM(c.Amount) AS Customer_Due "
             . "FROM cash_credit_acoount c "
             . "INNER JOIN invoice_header i ON i.id = c.Doc_id AND c.Doc_type = 'INV' "
             . "INNER JOIN customers m ON m.id = i.customer_id "
             . "INNER JOIN system_status s ON s.id = c.status "
             . "WHERE m.id = :customerid AND s.Code = 'PND'";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":customerid", $customerId, PDO::PARAM_STR);
        $stmt->execute();
        
        $row = $stmt->fetch();
        
        $conn = null;
        
        return $row["Customer_Due"];
    }
}
