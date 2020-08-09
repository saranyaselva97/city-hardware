<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice_header extends Model
{
    protected $table = 'invoice_header';
    protected $fillable = [
          'Invoice_Number','Invoice_Date', 'Net_Amount', 'Total_Discount','Gross_Amount', 
          'Payment_Type','Payment','Balance','Location', 'customer_id', 'user_id','status'];


}
