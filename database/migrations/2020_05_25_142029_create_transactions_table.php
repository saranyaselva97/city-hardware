<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Tran_Type');
            $table->string('DocType');
            $table->integer('DocId');
            $table->double('Unit_Price');
            $table->double('Quantity');
            $table->double('Net_Amount');
            $table->double('Discount');
            $table->double('Gross_Amount');
            $table->double('Previous_Quantity');
            $table->double('New_Quantity');
            $table->String('Location');
            $table->unsignedBigInteger('Item');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->foreign('Item')->references('id')->on('items')->onUpdate('cascade')->onDelete('cascade');
           
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
       
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->dropForeign('transactions_Invoice_Header_foreign');
        $table->dropForeign('transactions_Item_foreign');
        Schema::dropIfExists('transactions');
    }
}
