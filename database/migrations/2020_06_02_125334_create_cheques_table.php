<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChequesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cheques', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Chq_Number');
            $table->date('Chq_Date');
            $table->string('Bank');
            $table->double('Amount');
            $table->unsignedBigInteger('Payment');
        
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('status');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('status')->references('id')->on('system_status')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('Payment')->references('id')->on('payments')->onUpdate('cascade')->onDelete('cascade');
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
        $table->dropForeign('cheques_user_id_foreign');
        $table->dropForeign('cheques_status_foreign');
        $table->dropForeign('cheques_Payment_foreign');
        Schema::dropIfExists('cheques');
    }
}
