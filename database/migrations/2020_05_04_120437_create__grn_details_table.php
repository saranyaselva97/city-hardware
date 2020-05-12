<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGrnDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grn_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('Quantity');
            $table->double('Unit_Price');
            $table->double('Net_Amount');
            $table->double('Discount');
            $table->double('Gross_Amount');
            $table->unsignedBigInteger('Item');
            $table->unsignedBigInteger('Grn_Header');
            $table->foreign('Item')->references('id')->on('items')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('Grn_Header')->references('id')->on('Grn_header')->onUpdate('cascade')->onDelete('cascade');
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
        $table->dropForeign('expences_Item_foreign');
        $table->dropForeign('expences_Grn_Header_foreign');
        Schema::dropIfExists('_grn_details');
    }
}
