<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doc_settings extends Model
{
    protected $table = 'doc_settings';
    protected $fillable = [
          'Prefix','Next_No', 'Length', 'Code'];

  
        public static function createDocNo($code) {
            $docSettings=Doc_settings::where('Prefix',$code)->first();
    
            $nextNo = ($docSettings->Next_No + 1);
    
            $prefix = $docSettings->Prefix;
    
            $docNoLength = $docSettings->Length;
    
            $nextNo = str_pad($nextNo, $docNoLength, "0", STR_PAD_LEFT);
            
            $newDocNo = $prefix.$nextNo;
    
            return $newDocNo;
        }



}

