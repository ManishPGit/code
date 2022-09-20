import { Component, OnInit } from '@angular/core';
import { customer } from './models/customer';
import { customerorder } from './models/cutomer-order';
import { order } from './models/order';
import { CustomerOrdersService } from './services/customer-orders.service';
// import { AgGridAngular } from 'ag-grid-angular';
// import { AgGridModule } from 'ag-grid-angular';
// import { AgGridColumn } from 'ag-grid-angular';
// import { AgGridCommon } from 'ag-grid-community/dist/lib/interfaces/iCommon';
// import { AgGridEvent, IGetRowsParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public gridOptions: any;

  custRowData$! : Observable<any[]>;
  ordRowData$! : Observable<any[]>;
  custordRowData$! : Observable<any[]>;

  custColumnDefs = [
    {headerName: 'CustomerID', field: 'customerID'},
    {headerName: 'CompanyName', field: 'companyName'},
    {headerName: 'ContactName', field: 'contactName'},
    {headerName: 'ContactTitle', field: 'contactTitle'},
    {headerName: 'Address', field: 'address'},
    {headerName: 'City', field: 'city'},
    {headerName: 'Region', field: 'region'},
    {headerName: 'PostalCode', field: 'postalCode'},
    {headerName: 'Country', field: 'country'},
    {headerName: 'Phone', field: 'phone'},
    {headerName: 'Fax', field: 'fax'},
  ];

  ordColumnDefs = [
    {headerName: 'OrderID', field: 'orderID'},
    {headerName: 'CustomerName', field: 'customerName'},
    {headerName: 'EmployeeName', field: 'employeeName'},
    {headerName: 'OrderDate', field: 'orderDate', cellRenderer: (data: { orderDate: moment.MomentInput; }) => { return moment(data.orderDate).format('MM/DD/YYYY')}},
    {headerName: 'RequiredDate', field: 'requiredDate', cellRenderer: (data: { requiredDate: moment.MomentInput; }) => { return moment(data.requiredDate).format('MM/DD/YYYY')}},
    {headerName: 'ShippedDate', field: 'shippedDate', cellRenderer: (data: { shippedDate: moment.MomentInput; }) => { return moment(data.shippedDate).format('MM/DD/YYYY')}},
    {headerName: 'ShipVia', field: 'shipVia'},
    {headerName: 'Freight', field: 'freight'},
    {headerName: 'ShipName', field: 'shipName'},
    {headerName: 'ShipAddress', field: 'shipAddress'},
    {headerName: 'ShipCity', field: 'shipCity'},
    {headerName: 'ShipRegion', field: 'shipRegion'},
    {headerName: 'ShipPostalCode', field: 'shipPostalCode'},
    {headerName: 'ShipCountry', field: 'shipCountry'},

  ];

  custordColumnDefs = [
    {headerName: 'CustomerID', field: 'customerID'},
    {headerName: 'CustomerName', field: 'customerName'},
    {headerName: 'ContactName', field: 'contactName'},
    {headerName: 'ContactName', field: 'contactName'},
    {headerName: 'ContactTitle', field: 'contactTitle'},
    {headerName: 'OrderID', field: 'orderID'},
    {headerName: 'ProductName', field: 'productName'},
    {headerName: 'OrderDate', field: 'orderDate', cellRenderer: (data: { orderDate: moment.MomentInput; }) => { return moment(data.orderDate).format('MM/DD/YYYY')}},
    {headerName: 'RequiredDate', field: 'requiredDate', cellRenderer: (data: { requiredDate: moment.MomentInput; }) => { return moment(data.requiredDate).format('MM/DD/YYYY')}},
    {headerName: 'ShippedDate', field: 'shippedDate', cellRenderer: (data: { shippedDate: moment.MomentInput; }) => { return moment(data.shippedDate).format('MM/DD/YYYY')}},
    {headerName: 'ShipVia', field: 'shipVia'},
    {headerName: 'Freight', field: 'freight'},
    {headerName: 'ShipName', field: 'shipName'},
    {headerName: 'ShipAddress', field: 'shipAddress'},
    {headerName: 'ShipCity', field: 'shipCity'},
    {headerName: 'ShipRegion', field: 'shipRegion'},
    {headerName: 'ShipPostalCode', field: 'shipPostalCode'},
    {headerName: 'ShipCountry', field: 'shipCountry'},
  ];
  

  title = 'cerbtest-app';

  customers: customer[] = [];
  orders: order[] = [];
  customerorders : customerorder[] = [];
    

  constructor(private custOrdService : CustomerOrdersService) {
    this.gridOptions = {
      rowSelection: 'single',
      pagination: true, 
      paginationPageSize: 20,
      //cacheBlockSize: 20, // LAZY LOAD GRID OPTIONS
      //maxBlocksInCache: 2, // LAZY LOAD GRID OPTIONS
      //rowModelType: 'infinite', // LAZY LOAD GRID OPTIONS
      //paginationAutoPageSize: true, // LAZY LOAD GRID OPTIONS
      //datasource: this.custRowData$ // LAZY LOAD GRID OPTIONS
    };
    
  }

  ngOnInit() : void {

    this.custRowData$! = this.custOrdService.getCustomers();

    this.ordRowData$! = this.custOrdService.getOrders();

    this.custordRowData$! = this.custOrdService.getCutomerOrders();
  }

  // LAZY LOAD 
  // onGridReady(params: any) {
  //   //params.api.setDatasource(this.custRowData$!); // LAZY LOAD 
  //   params.api.setRowData(this.custRowData$!); // LAZY LOAD
  // }
}
