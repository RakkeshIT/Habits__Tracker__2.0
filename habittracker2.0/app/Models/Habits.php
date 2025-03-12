<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habits extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'name', 'description', 'start_date', 'end_date','completed'];

    // define use relationship

    public function user(){
        return $this->belongsTo(User::class);
    }
}
