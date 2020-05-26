<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceHeaderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_header', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Invoice_Number');
            $table->date('Invoice_Date');
            $table->double('Net_Amount');
            $table->double('Total_Discount');
            $table->double('Gross_Amount');
            $table->string('Payment_Type');
            $table->double('Payment');
            $table->double('Balance');
            $table->String('Location');
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
        $table->dropForeign('invoice_header_user_id_foreign');
        $table->dropForeign('invoice_header_customer_id_foreign');
        $table->dropForeign('invoice_header_status_foreign');
        Schema::dropIfExists('invoice_header');
    }
}
