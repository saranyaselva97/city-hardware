<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grn_Header extends Model
{
    protected $table = 'grn_header';
    protected $fillable = [
          'Grn_Code','Grn_Invoice_Code', 'Grn_Date', 'Due_Date','Net_Amount', 
          'Total_Discount','Gross_Amount','Payment_Type','Payment', 'Balance', 'Location','supplier_id', 
         'user_id',];
}
