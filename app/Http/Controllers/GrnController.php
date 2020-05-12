<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Grn_Header;
use App\Grn_details;
use App\Stocks;
use Auth;
use DB;
class GrnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = Auth::user()->id;

        $grnCode = filter_input(INPUT_POST, "Grn_Code", FILTER_SANITIZE_STRING);
        $supplierId = filter_input(INPUT_POST, "supplier_id", FILTER_SANITIZE_NUMBER_INT);
        $grnInvoiceCode = filter_input(INPUT_POST, "Grn_Invoice_Code", FILTER_SANITIZE_STRING);
        $dueDate = filter_input(INPUT_POST, "Due_Date", FILTER_SANITIZE_STRING);
        $paymentType = filter_input(INPUT_POST, "Payment_Type", FILTER_SANITIZE_STRING);
        $totalGrossAmount = filter_input(INPUT_POST, "Gross_Amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $totalDiscount = filter_input(INPUT_POST, "Total_Discount", FILTER_SANITIZE_STRING, FILTER_FLAG_ALLOW_FRACTION);
        $totalNetAmount = filter_input(INPUT_POST, "Net_Amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $payment = filter_input(INPUT_POST, "Payment", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $balance = filter_input(INPUT_POST, "Balance", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    
        $rowCount = filter_input(INPUT_POST, "Row_Count", FILTER_SANITIZE_NUMBER_INT);
    
        $grnHeaderDetails = array("Grn_Code" => $grnCode, "Grn_Invoice_Code" => $grnInvoiceCode,
            "Due_Date" =>$dueDate, "Net_Amount" => $totalGrossAmount, "Total_Discount" => $totalDiscount, "Gross_Amount" => $totalNetAmount,
            "Payment_Type" => $paymentType, "Payment" => $payment, "Balance" => $balance, "Location" => "W", "supplier_id" => $supplierId, "user_id" => $user_id);
    
        $grnHeader = new Grn_Header($grnHeaderDetails);
        $grnHeader->save();

        /**To Add the GRN Details Table */
        for ($i = 0; $i <= $rowCount; $i++) {
            if (isset($_POST["Item_Id" . $i])) {
                $itemId = filter_input(INPUT_POST, "Item_Id" . $i, FILTER_SANITIZE_NUMBER_INT);
                $quantity = filter_input(INPUT_POST, "Quantity" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                $unitPrice = filter_input(INPUT_POST, "Unit_Price" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                $grossAmount = filter_input(INPUT_POST, "Gross_Amount" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                $discount = filter_input(INPUT_POST, "Discount" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                $netAmount = filter_input(INPUT_POST, "Net_Amount" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                $averagePrice = filter_input(INPUT_POST, "Average_Price" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    
                $grnDetails = array("Quantity" => $quantity, "Unit_Price" => $unitPrice, "Net_Amount" => $grossAmount, "Discount" => $discount,
                    "Gross_Amount" => $netAmount, "Item" => $itemId, "Grn_Header" => $grnHeader->id);
    
                $grnDetail = new Grn_details($grnDetails);
                $grnDetail->save();
    
            }
        }
        /**To Add the Stocks */
        $stock=Stocks::select('id','Quantity','Average_Price','Location')->where('Item',$itemId)->first();
         

            $previousQty = 0;
            $newQty = 0;

            if ($stock === null) {
                $stockDetails = array("Quantity" => $quantity, "Average_Price" => $averagePrice, "Location" => "W",
                    "Item" => $itemId);

                $stock = new Stocks($stockDetails);
                $stock->save();

                $newQty = $quantity;
            } else {
                $previousQty = $stock->Quantity;
                $newQty = $stock->quantity + $quantity;

                $stock->quantity += $quantity;
                $stock->average_price = $averagePrice;
                $stock->save();
            }

        return redirect('/create_grn')->with('success','GRN Added Successfully');
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
