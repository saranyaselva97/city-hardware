<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Suppliers extends Model
{
    protected $table = 'suppliers';
    protected $fillable = [
          'supplier_code',
          'supplier_name','address', 'contact', 
    ];
}
