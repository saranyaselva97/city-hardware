<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expences', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('expence_type');
            $table->string('description');
            $table->double('amount');
            $table->date('dated');
            $table->string('customer');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('expence_type')->references('id')->on('expences_types')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->dropForeign('expences_user_id_foreign');
        $table->dropForeign('expences_expence_type_foreign');
        Schema::dropIfExists('expences');
    }
}
