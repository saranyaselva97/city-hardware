<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCashCreditAcoountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cash_credit_acoount', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Doc_type');
            $table->integer('Doc_Id');
            $table->double('Amount');
            $table->unsignedBigInteger('status');
            $table->unsignedBigInteger('user_id');
            $table->foreign('status')->references('id')->on('system_status')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');

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
        $table->dropForeign('cash_credit_acoount_user_id_foreign');
        $table->dropForeign('cash_credit_acoount_status_foreign');
        Schema::dropIfExists('cash_credit_acoount');
    }
}
