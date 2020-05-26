<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice_details extends Model
{
    protected $table = 'invoice_details';
    protected $fillable = [
          'Quantity','Unit_Price', 'Net_Amount', 'Discount','Discount_Price','Gross_Amount', 
          'Profit','Item','Invoice_Header'];
}
