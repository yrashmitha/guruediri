<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePapersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('papers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->default("");
            $table->boolean('isPaper');
            $table->string('path');
            //foreign
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('grade_id')->unsigned();
            $table->bigInteger('subject_id')->unsigned();
            $table->timestamps();
        });
        Schema::table('papers',function (Blueprint $table){
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('grade_id')->references('id')->on('grades');
            $table->foreign('subject_id')->references('id')->on('subjects');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('papers');
    }
}
