<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use PDO;
class Suppliers extends Model
{
    protected $table = 'suppliers';
    protected $fillable = [
          'supplier_code',
          'supplier_name','address', 'contact', 
    ];

    public static function getSupplierDueBySupplierId($supplierId){
        $connectionString = 'mysql:host=127.0.0.1;dbname=cityhardware';
        $conn = new PDO( $connectionString, 'root', '');
        $sql = "SELECT SUM(c.Amount) AS Supplier_Due "
             . "FROM cash_credit_acoount c "
             . "INNER JOIN grn_header g ON g.Id = c.Doc_id AND c.Doc_type = 'GRN' "
             . "INNER JOIN suppliers s ON s.Id = g.supplier_id "
             . "INNER JOIN system_status t ON t.Id = c.status "
             . "WHERE s.Id = :suppllierid AND t.Code = 'PND'";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":suppllierid", $supplierId, PDO::PARAM_STR);
        $stmt->execute();
        
        $row = $stmt->fetch();
        
        $conn = null;
        
        return $row["Supplier_Due"];
    }
}
