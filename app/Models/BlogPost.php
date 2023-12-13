<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class, 'name');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
