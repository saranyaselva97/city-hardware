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


        
        
}
