<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Grn_Header;
use App\Grn_details;
use App\Stocks;
use App\Doc_settings;
use App\Transactions;
use App\System_status;
use App\Payment;
use App\Cash_credit;
use App\Cheques;
use App\Invoice_header;
use App\Invoice_details;
use App\Suppliers;
use App\Items;
use App\Customers;
use App\Item_transfer_history;
use App\Sales_order_header;
use App\Sales_order_details;
use App\Locations;

use Auth;
use DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;
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
        $this->validate($request,[
            'Grn_Code'=>'required',
            'supplier_id'=>'required',
            'Grn_Invoice_Code'=>'required',
            'Due_Date'=>'required',
            'Payment_Type'=>'required',
            'Gross_Amount'=>'required',
            'Total_Discount'=>'required',
            'Net_Amount'=>'required',
            'Payment'=>'required',
            'Balance'=>'required',
          ]);

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
                    $newQty = $stock->Quantity + $quantity;
                    $stock->Quantity += $quantity;
                    $stock->average_price = $averagePrice;
                    $stock->save();
                }
                $transactionDetails = array("Tran_Type"=>"A", "DocType" => "GRN", "DocId" => $grnHeader->id, "Unit_Price" => $unitPrice, "Quantity" => $quantity,
                "Net_Amount" => $grossAmount, "Discount" => $discount, "Gross_Amount" => $netAmount, "Previous_Quantity" => $previousQty,
                "New_Quantity" => $newQty, "Location" => "W","Item" => $itemId, "user_id" => $user_id);

            $transaction = new Transactions($transactionDetails);
            $transaction->save();
            $pendingStatus = System_status::where('Code',"PND")->first();
          
            }
        }
        
        if ($grnHeader->Payment_Type === "CA") {
            $paymentDetails = array("Doc_Type" => "GRN", "Doc_No" => $grnHeader->Grn_Code, "Due_Amount" => $grnHeader->Gross_Amount,
                "Payment_Amount" => $grnHeader->Payment, "Balance" => $grnHeader->Balance, "Payment_Type" => "CA",
                "Payment_Date" => $grnHeader->created_at, "System_Date" => date("Y-m-d H:i:s"), "user_id" => $user_id,
                "status" => $pendingStatus->id);
    
            $payment = new Payment($paymentDetails);
            $payment->save();
         }
         else if ($grnHeader->Payment_Type === "CR") {
            $creditDetails = array("Doc_type" => "GRN", "Doc_Id" => $grnHeader->id, "Amount" => $grnHeader->Gross_Amount, "System_Date" => date("Y-m-d H:i:s"),
                "user_id" => $user_id, "status" => $pendingStatus->id);
    
            $cashCreditAccount = new Cash_credit($creditDetails);
            $cashCreditAccount->save();
        }
        else if ($grnHeader->Payment_Type === "CH") {
            $chequeNumber = filter_input(INPUT_POST, "Cheque_No", FILTER_SANITIZE_STRING);
            $chequeDate = filter_input(INPUT_POST, "Cheque_Date", FILTER_SANITIZE_STRING);
            $bank = filter_input(INPUT_POST, "Bank", FILTER_SANITIZE_STRING);
            $amount = filter_input(INPUT_POST, "Cheque_Amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    
            $paymentDetails = array("Doc_Type" => "GRN", "Doc_No" => $grnHeader->Grn_Code, "Due_Amount" => $grnHeader->Gross_Amount,
            "Payment_Amount" => $grnHeader->Payment, "Balance" => $grnHeader->Balance, "Payment_Type" => "CA",
            "Payment_Date" => $grnHeader->created_at, "System_Date" => date("Y-m-d H:i:s"), "user_id" => $user_id,
            "status" => $pendingStatus->id);

             $payment = new Payment($paymentDetails);
             $payment->save();
    
            $chequeDetails = array("Chq_Number" => $chequeNumber, "Chq_Date" =>$chequeDate, "Bank" => $bank, "Amount" => $amount,
               "Payment" => $payment->id, "user_id" => $user_id, "status" => $pendingStatus->id);
    
            $cheque = new Cheques($chequeDetails);
            $cheque->save();
    
            
        }
        if ($grnHeader->Payment_Type != "CR"){
            if($grnHeader->Balance > 0){
                $creditDetails = array("Doc_type" => "GRN", "Doc_Id" => $grnHeader->id, "Amount" => $grnHeader->Gross_Amount, "System_Date" => date("Y-m-d H:i:s"),
                "user_id" => $user_id, "status" => $pendingStatus->id);
    
            $cashCreditAccount = new Cash_credit($creditDetails);
            $cashCreditAccount->save();
            }
            }

           
            $docSettings = Doc_settings::where('Prefix',"GRN")->first();
    
            $docSettings->Next_No += 1;
            $docSettings->save();

         /******************************************************************************************************************** */
       

           /**To sent the print GRN page */
           $suppliers = Suppliers::where('id',$supplierId)->first();
           if($grnHeader->Payment_Type === "CA"){
               $payment_type="Cash";
           }
           else if($grnHeader->Payment_Type === "CR"){
            $payment_type="Credit";
           }
           else if($grnHeader->Payment_Type === "CH"){
            $payment_type="Cheque";
           }
            $data=array(
                'grncode' => $grnHeader->Grn_Code,
                'supplier'=>$suppliers,
                'paymentType'=>$payment_type,
                'grossamount'=>$grnHeader->Gross_Amount,
                'grndate'=>date("Y-m-d   H:i"),
                'grnDetails'=>$grnDetail,
                'itemid'=>$grnDetail->Item,
                'grnheader'=>$grnHeader,
                
            );
          
           return view('reports.printgrn')->with($data);
           
       
    }
    public function printGRN(){
        return view('reports.printgrn');
    }
    public function printInvo(){
        return view('reports.printinvo');
    }

  
    

    public function get_prefix(Request $request){
       $prefixCode = $request->prefix;

       $invoiceNumber = Doc_settings::createDocNo($prefixCode);

         echo json_encode($invoiceNumber);

    }

    /*****************ADDING INVOICE PART**************************************************************************************** */
    public function add_invoice(Request $request)
    {
        $user_id = Auth::user()->id;

        $invoiceNumber = filter_input(INPUT_POST, "Invoice_No", FILTER_SANITIZE_STRING);
        $saleLocation = filter_input(INPUT_POST, "Sale_Location", FILTER_SANITIZE_STRING);
        $invoiceDate = filter_input(INPUT_POST, "Invoice_Date", FILTER_SANITIZE_STRING);
        $customer = filter_input(INPUT_POST, "Customer_Id", FILTER_SANITIZE_NUMBER_INT);
        $paymentType = filter_input(INPUT_POST, "Payment_Type", FILTER_SANITIZE_STRING);
        $grossAmount = filter_input(INPUT_POST, "Gross_Amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $totalDiscount = filter_input(INPUT_POST, "Total_Discount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $netAmount = filter_input(INPUT_POST, "Net_Amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $payment = filter_input(INPUT_POST, "Payment", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $balance = filter_input(INPUT_POST, "Balance", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $prefix = "";
        
    
        $pendingStatus = System_status::where('Code',"PND")->first();
    
        $invoiceHeaderDetails = array("Invoice_Number" => $invoiceNumber, "Invoice_Date" => $invoiceDate, "Net_Amount" => $grossAmount,
            "Total_Discount" => $totalDiscount, "Gross_Amount" => $netAmount, "Payment_Type" => $paymentType, "Payment" => $payment,
            "Balance" => $balance, "Location" => $saleLocation, "customer_id" => $customer, "user_id" => $user_id,
            "status" => $pendingStatus->id);
    
        $invoiceHeader = new Invoice_header($invoiceHeaderDetails);
        $invoiceHeader->save();


        
     $rowCount = filter_input(INPUT_POST, "Row_Count", FILTER_SANITIZE_NUMBER_INT);

     for ($i = 0; $i <= $rowCount; $i++) {
        if (isset($_POST["Item_Id" . $i])) {
            $itemId = filter_input(INPUT_POST, "Item_Id" . $i, FILTER_SANITIZE_NUMBER_INT);
            $quantity = filter_input(INPUT_POST, "Quantity" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $unitPrice = filter_input(INPUT_POST, "Unit_Price" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $lineGrossAmount = filter_input(INPUT_POST, "Gross_Amount" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $discount = filter_input(INPUT_POST, "Discount" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $lineNetAmount = filter_input(INPUT_POST, "Net_Amount". $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

            $discountPrice = ($lineGrossAmount - $lineNetAmount);
            $matchThese = ['Item' => $itemId, 'Location' => $saleLocation];
            $stock=Stocks::select('id','Quantity','Average_Price','Location','Item')->where($matchThese)->first();
            $Average_Price=$stock->Average_Price;
            $profit = 0;

            if ($stock !== null) {
                if($paymentType == 'FR'){
                    $profit = 0.00;
                }  else {
                   $profit = ($lineNetAmount - ($Average_Price * $quantity)); 
                }
                
            }

            $invoiceDetails = array("Quantity" => $quantity, "Unit_Price" => $unitPrice, "Net_Amount" => $lineGrossAmount, "Discount" => $discount,
                "Discount_Price" => $discountPrice, "Gross_Amount" => $lineNetAmount, "Profit" => $profit, "Item" => $itemId, "Invoice_Header" => $invoiceHeader->id);

            $invoiceDetail = new Invoice_details($invoiceDetails);
            $invoiceDetail->save();
        
            $previousQty = $stock->Quantity;
            $newQty = $previousQty - $quantity;
            $stock->Quantity -= $quantity;
            $stock->save();

            $transactionDetails = array("Tran_Type"=>"D", "DocType" => "INV", "DocId" => $invoiceHeader->id, "Unit_Price" => $unitPrice, "Quantity" => $quantity,
                "Net_Amount" => $grossAmount, "Discount" => $discount, "Gross_Amount" => $netAmount, "Previous_Quantity" => $previousQty,
                "New_Quantity" => $newQty, "Location" => $saleLocation,"Item" => $itemId, "user_id" => $user_id);

            $transaction = new Transactions($transactionDetails);
            $transaction->save();    
       }
    }
    if ($invoiceHeader->Payment_Type === "CA") {
        $paymentDetails = array("Doc_Type" => "GRN", "Doc_No" => $invoiceHeader->Invoice_Number, "Due_Amount" => $invoiceHeader->Gross_Amount,
            "Payment_Amount" => $invoiceHeader->Payment, "Balance" => $invoiceHeader->Balance, "Payment_Type" => "CA",
            "Payment_Date" => $invoiceHeader->created_at, "System_Date" => date("Y-m-d H:i:s"), "user_id" => $user_id,
            "status" => $pendingStatus->id);

        $payment = new Payment($paymentDetails);
        $payment->save();
     }
     else if ($invoiceHeader->Payment_Type === "CR") {
        $creditDetails = array("Doc_type" => "INV", "Doc_Id" => $invoiceHeader->id, "Amount" => $invoiceHeader->Gross_Amount, "System_Date" => date("Y-m-d H:i:s"),
            "user_id" => $user_id, "status" => $pendingStatus->id);

        $cashCreditAccount = new Cash_credit($creditDetails);
        $cashCreditAccount->save();
    }
    else if ($invoiceHeader->Payment_Type === "CH") {
        $chequeNumber = filter_input(INPUT_POST, "Cheque_No", FILTER_SANITIZE_STRING);
        $chequeDate = filter_input(INPUT_POST, "Cheque_Date", FILTER_SANITIZE_STRING);
        $bank = filter_input(INPUT_POST, "Bank", FILTER_SANITIZE_STRING);
        $amount = filter_input(INPUT_POST, "Cheque_Amount", FILTER_SANITIZE_NUMBER_FLOAT);

        $paymentDetails = array("Doc_Type" => "INV", "Doc_No" => $invoiceHeader->Invoice_Number, "Due_Amount" => $invoiceHeader->Gross_Amount,
        "Payment_Amount" => $invoiceHeader->Payment, "Balance" => $invoiceHeader->Balance, "Payment_Type" => "CA",
        "Payment_Date" => $invoiceHeader->created_at, "System_Date" => date("Y-m-d H:i:s"), "user_id" => $user_id,
        "status" => $pendingStatus->id);

         $payment = new Payment($paymentDetails);
         $payment->save();

        $chequeDetails = array("Chq_Number" => $chequeNumber, "Chq_Date" =>$chequeDate, "Bank" => $bank, "Amount" => $invoiceHeader->Payment,
           "Payment" => $payment->id, "user_id" => $user_id, "status" => $pendingStatus->id);

        $cheque = new Cheques($chequeDetails);
        $cheque->save();
        
    }
    if ($invoiceHeader->Payment_Type != "CR"){
        if($invoiceHeader->balance > 0){
            $creditDetails = array("Doc_Type" => "INV", "Doc_Id" => $invoiceHeader->id, "Amount" => $invoiceHeader->Balance, "System_Date" => date("Y-m-d H:i:s"),
                "user_id" => $user->id, "status" => $pendingStatus->id);
    
            $cashCreditAccount = new Cash_credit($creditDetails);
            $cashCreditAccount->save();
        }
        }
        if($saleLocation == "B1"){
            $prefix = "INVB1";
        }elseif ($saleLocation == "B2") {
             $prefix = "INVB2";
        }elseif ($saleLocation == "B3") {
             $prefix = "INVB3";
        }
        elseif ($saleLocation == "W") {
            $prefix = "INVW";
       }
        
        if ($paymentType == "FR") {
             $prefix = "FOC";
        }
        
        $docSettings = Doc_settings::where('Prefix',$prefix)->first();
        $docSettings->Next_No  += 1;
        $docSettings->save();


             $customers = Customers::where('id',$customer)->first();
             if($invoiceHeader->Payment_Type === "CA"){
                $payment_type="Cash";
            }
            else if($invoiceHeader->Payment_Type === "CR"){
             $payment_type="Credit";
            }
            else if($invoiceHeader->Payment_Type === "CH"){
             $payment_type="Cheque";
            }
            
            $invoice_det=Invoice_details::where('Invoice_Header',$invoiceHeader->id)->first();
            $data=array(
            'invoice' => $invoiceHeader->Invoice_Number,
            'customer'=>$customers,
            'payment_type'=>$payment_type,
            'grossamount'=>$invoiceHeader->Gross_Amount,
            'grndate'=>date("Y-m-d   H:i"),
            'invoiceDetail'=>$invoice_det,
            'itemid'=>$invoiceDetail->Item,
            'invoiceheader'=>$invoiceHeader,

            );

        return view('reports.printinvo')->with($data);
}




/***********Item Transfer History */


public function itemTrasnfer(Request $request){
          $user_id = Auth::user()->id;
    $rowCount = filter_input(INPUT_POST, "Row_Count", FILTER_SANITIZE_NUMBER_INT);
    $transferCode = filter_input(INPUT_POST, "transfer_number", FILTER_SANITIZE_STRING);
    for($i=0; $i<=$rowCount; $i++){
        $fromLocation = filter_input(INPUT_POST, "FromLocation".$i, FILTER_SANITIZE_STRING);

        $toLocation = filter_input(INPUT_POST, "ToLocation".$i, FILTER_SANITIZE_STRING);
        $itemId = filter_input(INPUT_POST, "ItemId".$i, FILTER_SANITIZE_NUMBER_INT);
        $transferQty = filter_input(INPUT_POST, "TransferQty".$i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        
        $transferDetails = array("Transfer_Number"=>$transferCode, "From_location"=>$fromLocation, "To_location"=>$toLocation, "Quantity"=>$transferQty,
                           "Item"=>$itemId, "user_id"=>$user_id);
        
        $itemTransfer = new Item_transfer_history($transferDetails);
        $itemTransfer->save();

        $matchThese1 = ['Item' => $itemId, 'Location' => $fromLocation];
        $fromStock=Stocks::select('id','Quantity','Average_Price','Location','Item')->where($matchThese1)->first();
        $matchThese2 = ['Item' => $itemId, 'Location' => $toLocation];
        $toStock=Stocks::select('id','Quantity','Average_Price','Location','Item')->where($matchThese2)->first();
        

        $fromPreviousQty = ($fromStock === null ? 0 : $fromStock->Quantity);
        $toPreviousQty = ($toStock === null ? 0 : $toStock->Quantity);

        $fromStock->Quantity -= $transferQty;
        $fromStock->save();

        if($toStock !== null){
            $toStock->Quantity += $transferQty;
            $toStock->save();
        }else{
            $stockDetails = array("Quantity"=>$transferQty, "Average_Price"=>$fromStock->Average_Price, "Location"=>$toLocation, 
                            "Item"=>$itemId);
            $toStock = new Stocks($stockDetails);
            $toStock->save();
        }

        
        $fromtransactionDetails = array("Tran_Type"=>"A", "DocType" => "ITR", "DocId" => $itemTransfer->id, "Unit_Price" => $fromStock->Average_Price, "Quantity" => $transferQty,
        "Net_Amount" =>($transferQty * $fromStock->Average_Price), "Discount" => 0, "Gross_Amount" => ($transferQty * $fromStock->Average_Price), "Previous_Quantity" => $fromPreviousQty,
        "New_Quantity" => $fromStock->Quantity, "Location" => $fromLocation,"Item" => $itemId, "user_id" => $user_id);

         $fromTransaction = new Transactions($fromtransactionDetails);
         $fromTransaction->save();  

         $toTransactionDetails = array("Tran_Type"=>"A", "DocType" => "ITR", "DocId" => $itemTransfer->id, "Unit_Price" => $toStock->Average_Price, "Quantity" => $transferQty,
        "Net_Amount" =>($transferQty * $toStock->Average_Price), "Discount" => 0, "Gross_Amount" => ($transferQty * $toStock->Average_Price), "Previous_Quantity" => $toPreviousQty,
        "New_Quantity" => $toStock->Quantity, "Location" => $toLocation,"Item" => $itemId, "user_id" => $user_id);

         $toTransaction = new Transactions($fromtransactionDetails);
         $toTransaction->save();  
        
         $docSettings = Doc_settings::where('Prefix',"TNN")->first();
         $docSettings->Next_No  += 1;
         $docSettings->save();
    }
    

  return redirect('/item_transfer')->with('success','Items Transfer Saved Successfully');
}



public function newsalesorder(Request $request){

    $this->validate($request,[
        'Sale_Location'=>'required',
        'Order_Date'=>'required',
        'Customer_Id'=>'required',
        'Item_Id'=>'required',
        'Total_Net_Amount'=>'required',
      
    
        'Unit_Price'=>'required',
      
     
      ]);

    $user_id = Auth::user()->id;
    $orderNo = filter_input(INPUT_POST, "Order_Number", FILTER_SANITIZE_STRING);
    $saleLocation = filter_input(INPUT_POST, "Sale_Location", FILTER_SANITIZE_STRING);
    $orderDate = filter_input(INPUT_POST, "Order_Date", FILTER_SANITIZE_STRING);
    $customerId = filter_input(INPUT_POST, "Customer_Id", FILTER_SANITIZE_NUMBER_INT);
    $totalNetAmounr = filter_input(INPUT_POST, "Total_Net_Amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

    
    $pendingStatus = System_status::where('Code',"PND")->first();

    $orderHeaderDetails = array("Order_Number" => $orderNo, "Location"=>$saleLocation, "Order_Date" => date("Y-m-d", strtotime($orderDate)), "Net_Amount" => $totalNetAmounr, "System_Date" => date("Y-m-d H:i:s"),
    "customer_id" => $customerId, "user_id" => $user_id, "status" => $pendingStatus->id);

    $orderHeader = new Sales_order_header($orderHeaderDetails);
    $orderHeader->save();

    $rowCount = filter_input(INPUT_POST, "Row_Count", FILTER_SANITIZE_NUMBER_INT);

    for ($i = 0; $i <= $rowCount; $i++) {
        $itemId = filter_input(INPUT_POST, "Item_Id" . $i, FILTER_SANITIZE_NUMBER_INT);
        $quantity = filter_input(INPUT_POST, "Quantity" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $unitPrice = filter_input(INPUT_POST, "Unit_Price" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $discountRate = filter_input(INPUT_POST, "Discount_Rate" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $netAmount = filter_input(INPUT_POST, "Net_Amount" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

        $orderDetails = array("Quantity" => $quantity, "Unit_Price" => $unitPrice, "Discount" => $discountRate, "Net_Amount" => $netAmount, "Item" => $itemId, "Sales_Order_Header" => $orderHeader->id);

        $orderDetail = new Sales_order_details($orderDetails);
        $orderDetail->save();
    }
    $docSettings = Doc_settings::where('Prefix',"SOR")->first();
    $docSettings->Next_No += 1;
    $docSettings->save();


    return redirect('/sales_order_list');
}

public function action_session($id = null) {

    $user_id = Auth::user()->id;
    $salesorder = Sales_order_header::where('id',$id)->first();
    $status = System_status::where('id',$salesorder->status)->first();

    $saleLocation=Locations::where('loc_code',$salesorder->Location)->first();

    if($saleLocation->loc_code == 'B1'){
        $invoiceNumber = Doc_settings::createDocNo("INVB1");
    }elseif ($saleLocation->loc_code == 'B2') {
        $invoiceNumber = Doc_settings::createDocNo("INVB2");
    }elseif ($saleLocation->loc_code == 'B3') {
        $invoiceNumber =Doc_settings::createDocNo("INVB3");
    }
    elseif ($saleLocation->loc_code == 'W') {
        $invoiceNumber = Doc_settings::createDocNo("INVW");
    }
    
    
    $saleOrderDetails = Sales_order_details::where('Sales_Order_Header',$salesorder->id)->get();
    
    $customer = Customers::where('id',$salesorder->customer_id)->first();
    

    $salesRep = Auth::user()::where('id',$salesorder->user_id)->first();

    $data=array(
       'saleorder' => $salesorder, 
       'customer' => $customer, 
       'salesRep' => $salesRep , 
       'invoiceNumber' => $invoiceNumber , 
       'location'=>$salesorder->Location,
       'saleOrderDetails'=>$saleOrderDetails
        );

       

       // return $data;
       return view('transaction.sales_invoice')->with($data);
    
}

public function salesinvoicestore (Request $request){
    $user_id = Auth::user()->id;

    $invoiceNumber = filter_input(INPUT_POST, "Invoice_No", FILTER_SANITIZE_STRING);
    $saleLocation = filter_input(INPUT_POST, "Sale_Location", FILTER_SANITIZE_STRING);
    $invoiceDate = filter_input(INPUT_POST, "Invoice_Date", FILTER_SANITIZE_STRING);
    $customer = filter_input(INPUT_POST, "Customer_Id", FILTER_SANITIZE_NUMBER_INT);
    $paymentType = filter_input(INPUT_POST, "Payment_Type", FILTER_SANITIZE_STRING);
    $grossAmount = filter_input(INPUT_POST, "Gross_Amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $totalDiscount = filter_input(INPUT_POST, "Total_Discount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $netAmount = filter_input(INPUT_POST, "Net_Amount", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $payment = filter_input(INPUT_POST, "Payment", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $balance = filter_input(INPUT_POST, "Balance", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $prefix = "";
    

    $pendingStatus = System_status::where('Code',"PND")->first();

    $invoiceHeaderDetails = array("Invoice_Number" => $invoiceNumber, "Invoice_Date" => $invoiceDate, "Net_Amount" => $grossAmount,
        "Total_Discount" => $totalDiscount, "Gross_Amount" => $netAmount, "Payment_Type" => $paymentType, "Payment" => $payment,
        "Balance" => $balance, "Location" => $saleLocation, "customer_id" => $customer, "user_id" => $user_id,
        "status" => $pendingStatus->id);

    $invoiceHeader = new Invoice_header($invoiceHeaderDetails);
    $invoiceHeader->save();


        
    $rowCount = filter_input(INPUT_POST, "Row_Count", FILTER_SANITIZE_NUMBER_INT);

    for ($i = 0; $i <= $rowCount; $i++) {
       if (isset($_POST["Item_Id" . $i])) {
           $itemId = filter_input(INPUT_POST, "Item_Id" . $i, FILTER_SANITIZE_NUMBER_INT);
           $quantity = filter_input(INPUT_POST, "Quantity" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
           $unitPrice = filter_input(INPUT_POST, "Unit_Price" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
           $lineGrossAmount = filter_input(INPUT_POST, "Gross_Amount" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
           $discount = filter_input(INPUT_POST, "Discount" . $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
           $lineNetAmount = filter_input(INPUT_POST, "Net_Amount". $i, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

           $discountPrice = ($lineGrossAmount - $lineNetAmount);
           $matchThese = ['Item' => $itemId, 'Location' => $saleLocation];
           $stock=Stocks::where($matchThese)->first();

           if($stock){

            $Average_Price=$stock->Average_Price;
            $profit = 0;
 
            if ($stock !== null) {
                if($paymentType == 'FR'){
                    $profit = 0.00;
                }  else {
                   $profit = ($lineNetAmount - ($Average_Price * $quantity)); 
                }
                
            }
 
            $invoiceDetails = array("Quantity" => $quantity, "Unit_Price" => $unitPrice, "Net_Amount" => $lineGrossAmount, "Discount" => $discount,
                "Discount_Price" => $discountPrice, "Gross_Amount" => $lineNetAmount, "Profit" => $profit, "Item" => $itemId, "Invoice_Header" => $invoiceHeader->id);
 
            $invoiceDetail = new Invoice_details($invoiceDetails);
            $invoiceDetail->save();
        
            $previousQty = $stock->Quantity;
            $newQty = $previousQty - $quantity;
            $stock->Quantity -= $quantity;
            $stock->save();

            $transactionDetails = array("Tran_Type"=>"D", "DocType" => "INV", "DocId" => $invoiceHeader->id, "Unit_Price" => $unitPrice, "Quantity" => $quantity,
                "Net_Amount" => $grossAmount, "Discount" => $discount, "Gross_Amount" => $netAmount, "Previous_Quantity" => $previousQty,
                "New_Quantity" => $newQty, "Location" => $saleLocation,"Item" => $itemId, "user_id" => $user_id);

            $transaction = new Transactions($transactionDetails);
            $transaction->save();  


           }
           else{
            $_SESSION["save_success"] = "Selected Items Not Found the Location";
           }
          

        }
    }
    if ($invoiceHeader->Payment_Type === "CA") {
        $paymentDetails = array("Doc_Type" => "GRN", "Doc_No" => $invoiceHeader->Invoice_Number, "Due_Amount" => $invoiceHeader->Gross_Amount,
            "Payment_Amount" => $invoiceHeader->Payment, "Balance" => $invoiceHeader->Balance, "Payment_Type" => "CA",
            "Payment_Date" => $invoiceHeader->created_at, "System_Date" => date("Y-m-d H:i:s"), "user_id" => $user_id,
            "status" => $pendingStatus->id);

        $payment = new Payment($paymentDetails);
        $payment->save();
     }
     else if ($invoiceHeader->Payment_Type === "CR") {
        $creditDetails = array("Doc_type" => "INV", "Doc_Id" => $invoiceHeader->id, "Amount" => $invoiceHeader->Gross_Amount, "System_Date" => date("Y-m-d H:i:s"),
            "user_id" => $user_id, "status" => $pendingStatus->id);

        $cashCreditAccount = new Cash_credit($creditDetails);
        $cashCreditAccount->save();
    }
    else if ($invoiceHeader->Payment_Type === "CH") {
        $chequeNumber = filter_input(INPUT_POST, "Cheque_No", FILTER_SANITIZE_STRING);
        $chequeDate = filter_input(INPUT_POST, "Cheque_Date", FILTER_SANITIZE_STRING);
        $bank = filter_input(INPUT_POST, "Bank", FILTER_SANITIZE_STRING);
        $amount = filter_input(INPUT_POST, "Cheque_Amount", FILTER_SANITIZE_NUMBER_FLOAT);

        $paymentDetails = array("Doc_Type" => "INV", "Doc_No" => $invoiceHeader->Invoice_Number, "Due_Amount" => $invoiceHeader->Gross_Amount,
        "Payment_Amount" => $invoiceHeader->Payment, "Balance" => $invoiceHeader->Balance, "Payment_Type" => "CA",
        "Payment_Date" => $invoiceHeader->created_at, "System_Date" => date("Y-m-d H:i:s"), "user_id" => $user_id,
        "status" => $pendingStatus->id);

         $payment = new Payment($paymentDetails);
         $payment->save();

        $chequeDetails = array("Chq_Number" => $chequeNumber, "Chq_Date" =>$chequeDate, "Bank" => $bank, "Amount" => $invoiceHeader->Payment,
           "Payment" => $payment->id, "user_id" => $user_id, "status" => $pendingStatus->id);

        $cheque = new Cheques($chequeDetails);
        $cheque->save();
        
    }
    if ($invoiceHeader->Payment_Type != "CR"){
        if($invoiceHeader->balance > 0){
            $creditDetails = array("Doc_Type" => "INV", "Doc_Id" => $invoiceHeader->id, "Amount" => $invoiceHeader->Balance, "System_Date" => date("Y-m-d H:i:s"),
                "user_id" => $user->id, "status" => $pendingStatus->id);
    
            $cashCreditAccount = new Cash_credit($creditDetails);
            $cashCreditAccount->save();
        }
        }
        if($saleLocation == "B1"){
            $prefix = "INVB1";
        }elseif ($saleLocation == "B2") {
             $prefix = "INVB2";
        }elseif ($saleLocation == "B3") {
             $prefix = "INVB3";
        }
        elseif ($saleLocation == "W") {
            $prefix = "INVW";
       }
        
        if ($paymentType == "FR") {
             $prefix = "FOC";
        }
        
        $docSettings = Doc_settings::where('Prefix',$prefix)->first();
        $docSettings->Next_No  += 1;
        $docSettings->save();


        if(isset($_POST["Order_Number"])){
            $orderNumber = filter_input(INPUT_POST, "Order_Number", FILTER_SANITIZE_STRING);
            
            $settledStatus = System_status::where('code',"STL")->first();
            
            $orderHeader = Sales_order_header::where('Order_Number',$orderNumber)->first();
            
            if($orderHeader !== null){
                $orderHeader->status = $settledStatus->id;
                $orderHeader->save();
            }
        }

    return view('transaction.sales_order_list')->with('success','Invoice Created Successfully');
}

public function duerecive (Request $request){
   
        //        $invoiceId = "";
        $due_invoice_no = $request->due_invoice_no;
                $invoiceId = Invoice_header::where('Invoice_Number',$due_invoice_no)->first();
              $results=Payment::getCustomerDueByCustomerId($invoiceId->customer_id);
                $invoice_date = $invoiceId->Invoice_Date;
                $customer = Customers::where('id',$invoiceId->customer_id)->first();
                $invoice_details = Invoice_details::where('Invoice_Header',$invoiceId->id)->first();
                $data=array(
                    'due_invoice_no' => $due_invoice_no, 
                    'customer' => $customer->customer_name, 
                    'invoice_date' => $invoice_date , 
                    'Gross_amount' => $invoiceId->Net_Amount , 
                    'Discount' => $invoice_details->Discount , 
                    'net_amount' => $invoiceId->Net_Amount , 
                    'Paid' =>$invoiceId->Payment ,
                    'Balance' => $invoiceId->Balance ,
                     );
                
         return view('transaction.dueview')->with($data);
        

  

}

public function stockreport(Request $request)
{
   $location= $request->loc;
    $reportDetails=Stocks::getStockReport($location);
    $data=array(
        'reportDetails' => $reportDetails, 
         );
    return view('reports.stockreport')->with($data);

}
public function totalsalesamount(Request $request)
{
    $user_id = Auth::user()->id;
  

        $fromDate = filter_input(INPUT_GET, "frdte", FILTER_SANITIZE_STRING);
        $fromDate = date("Y-m-d", strtotime($fromDate));
        
        $toDate = filter_input(INPUT_GET, "todte", FILTER_SANITIZE_STRING);
        $toDate = date("Y-m-d", strtotime($toDate));
       
        $locationCode = $request->loc;
     
        if($locationCode === ""){
            $locationName = "All";
        }else{
            $location = Locations::where('loc_code',$request->loc)->first();
            
            $locationName = $location->loc_name;
        }
     
        $dategraph = Invoice_Header::where('Location',$request->loc)
        
        ->whereBetween(
            'Invoice_Date', 
            [
                $request->get('frdte'),
                $request->get('todte')
            ]
        )->get();
        $dates = $dategraph;
        $data=array(
            'details' => $dates, 
            'locationName'=> $locationName,
            'fromDate'=>$request->frdte,
            'toDate'=>$request->todte
             );
        return view('reports.total_sales_report_view')->with($data);
      
}
public function item_wise_sales(Request $request){

      $itemName = $request->item_name;
      $startDate = $request->frdte;
      $endDate = $request->todte;
      $location = $request->loc;
      $location = Locations::where('loc_code',$request->loc)->first();
            
      $locationName = $location->loc_name;

   $results=Items::getItemWiseSalesReport($itemName,$startDate,$endDate, $request->loc);
   $data=array(
    'details' => $results, 
    'locationName'=> $locationName,
    'fromDate'=>$startDate,
    'toDate'=>$endDate
     );

    return view('reports.item_report_view')->with($data);
//return $request;
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
