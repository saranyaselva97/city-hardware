<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesOrderHeaderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_order_header', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Order_Number');
            $table->string('Location');
            $table->date('Order_Date');
            $table->double('Net_Amount');
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('status');
            $table->foreign('customer_id')->references('id')->on('customers')->onUpdate('cascade')->onDelete('cascade');
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
    {
        $table->dropForeign('salesorder_header_user_id_foreign');
        $table->dropForeign('salesorder_header_customer_id_foreign');
        $table->dropForeign('salesorder_header_status_foreign');
        Schema::dropIfExists('sales_order_header');
    }
}
