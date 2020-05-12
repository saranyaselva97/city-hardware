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

          public function __construct($data = array()) {
            if (isset($data["Id"])) {
                $this->id = preg_replace("/[^\.\,\-\_'\"\@\?\!\:\$ a-zA-Z0-9()]/", "", $data["Id"]);
            }
            if (isset($data["Quantity"])) {
                $this->quantity = preg_replace("/[^\.\,\-\_'\"\@\?\!\:\$ a-zA-Z0-9()]/", "", $data["Quantity"]);
            }
            if (isset($data["Average_Price"])) {
                $this->average_price = preg_replace("/[^\.\,\-\_'\"\@\?\!\:\$ a-zA-Z0-9()]/", "", $data["Average_Price"]);
            }
            if (isset($data["Location"])) {
                $this->location = preg_replace("/[^\.\,\-\_'\"\@\?\!\:\$ a-zA-Z0-9()]/", "", $data["Location"]);
            }
            if (isset($data["Item"])) {
                $this->item = preg_replace("/[^\.\,\-\_'\"\@\?\!\:\$ a-zA-Z0-9()]/", "", $data["Item"]);
            }
        }

    public static function getStockByItemAndLocation($item, $location){
    
    
        } 
        public function update(array $attributes = [], array $options = []) {
           
           
         }
      
        
        
}
