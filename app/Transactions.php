<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    protected $table = 'transactions';
    protected $fillable = [
          'Tran_Type','DocType', 'DocId', 'Unit_Price','Quantity', 
          'Net_Amount','Discount','Gross_Amount','Previous_Quantity', 'New_Quantity', 'Payment_Type','Location', 'Item','user_id'];
}
