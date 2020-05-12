<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grn_details extends Model
{
    protected $table = 'grn_details';
    protected $fillable = [
          'Quantity','Unit_Price', 'Net_Amount', 'Discount','Gross_Amount', 
          'Item','Grn_Header'];
}
