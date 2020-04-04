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
}
