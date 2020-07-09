<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
