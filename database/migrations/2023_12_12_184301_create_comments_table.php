<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('content', 1000);
            $table->bigInteger('likes')->default(0);
            $table->bigInteger('dislike')->default(0);
            $table->string("author_name");
            $table->bigInteger('author_id')->unsigned();
            $table->foreign('author_id')->references('id')->on('users')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->bigInteger('blog_post_id')->unsigned();
            $table->foreign('blog_post_id')->references('id')->on('blog_posts')
                ->onDelete('cascade')->onUpdate('cascade');    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
