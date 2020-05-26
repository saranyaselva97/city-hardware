<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('Quantity');
            $table->double('Unit_Price');
            $table->double('Net_Amount');
            $table->double('Discount');
            $table->double('Discount_Price');
            $table->double('Gross_Amount');
            $table->double('Profit');
            $table->unsignedBigInteger('Item');
            $table->unsignedBigInteger('Invoice_Header');
            $table->foreign('Item')->references('id')->on('items')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('Invoice_Header')->references('id')->on('invoice_header')->onUpdate('cascade')->onDelete('cascade');
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
        $table->dropForeign('invoice_details_Invoice_Header_foreign');
        $table->dropForeign('invoice_details_Item_foreign');
        Schema::dropIfExists('invoice_details');
    }
}
