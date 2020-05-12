<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doc_settings extends Model
{
    protected $table = 'doc_settings';
    protected $fillable = [
          'Prefix','Next_No', 'Length', 'Code'];
}

