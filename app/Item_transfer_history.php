<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item_transfer_history extends Model
{
    protected $table = 'item_transfer_historys';
    protected $fillable = [
          'Transfer_Number','From_location', 'To_location', 'Quantity','Item', 
          'user_id'];
}
