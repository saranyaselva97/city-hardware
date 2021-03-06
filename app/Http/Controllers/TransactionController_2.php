<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController_2 extends Controller
{
    public function create()
    {

        return view('transaction.create_grn');
    }

    public function makeinvoice()
    {

        return view('transaction.create_invoice');
    }
    public function salesOrderList()
    {

        return view('transaction.sales_order_list');
    }
    public function invreturn()
    {

        return view('transaction.invoice_return');
    }
    public function dueRecive()
    {

        return view('transaction.duerecive');
    }
    public function payrecieve()
    {

        return view('transaction.payementrecivable');
    }
    public function  grnReturn()
    {

        return view('transaction.grn_return');
    }
    public function  addexpense()
    {

        return view('transaction.expenses');
    }
    public function  salesOrder()
    {

        return view('transaction.sales_order');
    }
    public function  itemTransfer()
    {

        return view('transaction.item_transfer');
    }
    
    public function  salesinvoice()
    {

        return view('transaction.sales_invoice');
    }
    public function  getstock()
    {

        return view('stock.stockdetails');
    }
    public function  total_sales_amount_report()
    {

        return view('reports.total_sales_amount_reports');
    }
    public function  item_wise_sales()
    {

        return view('reports.item_wise_sales');
    }
    
    public function   date_wise_payments()
    {

        return view('reports.date_vice_payments');
    }
    public function   allstockreport()
    {

        return view('stock.fullstock');
    }
}
