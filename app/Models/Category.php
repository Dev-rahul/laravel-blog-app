<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function blogPosts()
    {
        return $this->belongsToMany(BlogPost::class,'category_post','blog_post_id','category_id');
    }
}
