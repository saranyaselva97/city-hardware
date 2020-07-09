<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sales_order_details extends Model
{
    protected $table = 'sales_order_details';
    protected $fillable = [
          'Quantity','Unit_Price', 'Discount', 'Net_Amount','Item', 
          'Sales_Order_Header'];
}
