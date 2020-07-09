<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_order_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('Quantity');
            $table->double('Unit_Price');
            $table->double('Discount');
            $table->double('Net_Amount');
            $table->unsignedBigInteger('Item');
            $table->unsignedBigInteger('Sales_Order_Header');
            $table->foreign('Item')->references('id')->on('items')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('Sales_Order_Header')->references('id')->on('sales_order_header')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('sales_order_details');
    }
}
