<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sales_order_header extends Model
{
    protected $table = 'sales_order_header';
    protected $fillable = [
          'Order_Number','Location', 'Order_Date', 'Net_Amount','customer_id', 
          'user_id','status'];



        public function user(){
            return $this->belongsTo(User::class);
        }
        public function customer(){
            return $this->belongsTo(Customers::class);
        }
}
