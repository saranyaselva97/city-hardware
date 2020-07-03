<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemTransferHistorysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_transfer_historys', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Transfer_Number');
            $table->string('From_location');
            $table->string('To_location');
            $table->double('Quantity');
            $table->unsignedBigInteger('Item');
            $table->unsignedBigInteger('user_id');
            $table->foreign('Item')->references('id')->on('items')->onUpdate('cascade')->onDelete('cascade');
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
        $table->dropForeign('transfer_Item_foreign');
        $table->dropForeign('transfer_user_id_foreign');
        Schema::dropIfExists('item_transfer_historys');
    }
}
