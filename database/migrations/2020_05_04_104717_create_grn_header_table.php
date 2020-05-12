<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGrnHeaderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grn_header', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Grn_Code');
            $table->string('Grn_Invoice_Code');
            $table->date('Due_Date');
            $table->double('Net_Amount');
            $table->double('Total_Discount');
            $table->double('Gross_Amount');
            $table->string('Payment_Type');
            $table->double('Payment');
            $table->double('Balance');
            $table->String('Location');
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('user_id');
      
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onUpdate('cascade')->onDelete('cascade');
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
        $table->dropForeign('expences_supplier_id_foreign');

        Schema::dropIfExists('grn_header');
    }
}
