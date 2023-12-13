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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("content", 10000);
            $table->bigInteger('likes')->default(0);
            $table->bigInteger('views')->default(0);
            $table->string("author_name");
            $table->string("plain_text");
            $table->bigInteger('author_id')->unsigned();
            $table->foreign('author_id')->references('id')->on('users')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
