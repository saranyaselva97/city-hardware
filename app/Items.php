<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    protected $table = 'items';
    protected $fillable = [
          'item_code','item_name', 're_order_level', 'selling_price','label_price', 
          'category','measure_unit'];
}
