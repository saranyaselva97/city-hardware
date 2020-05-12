<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Doc_Type');
            $table->string('Doc_No');
            $table->double('Due_Amount');
            $table->double('Total_Discount');
            $table->double('Gross_Amount');
            $table->date('payement_Date');
            $table->date('System_Date');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('status');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('status')->references('id')->on('system_status')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {   $table->dropForeign('expences_user_id_foreign');
         $table->dropForeign('expences_status_foreign');
        Schema::dropIfExists('payments');
    }
}
