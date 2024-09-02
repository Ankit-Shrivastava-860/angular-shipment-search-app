import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentService } from '../../services/shipment.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, filter } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shipment-results',
  templateUrl: './shipment-results.component.html',
  styleUrl: './shipment-results.component.scss'
})
export class ShipmentResultsComponent implements OnInit {

  shipments: any[] = [];
  totalNoOfRecords: string = '';
  order: {} = {};
  //filters = { cancelled: false };
  showFilter = false;
  loading = false;
  page = 1;
  data: string  = '';
  orderNo: any;
  emailId: any;
  shipmentNo: any;
  phoneNo: any;
  firstName: any;
  lastName:any;
  filterForm: FormGroup;
  statuses: string[] = [
    'Ready for Backroom Pick',
    'Backroom Pick In Progress',
    'Ready for Customer Pickup',
    'Ready for Packing',
    'Packing in Progress',
    'Cancelled'
  ];

  constructor(private shipmentService: ShipmentService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit() {

    this.orderNo = this.route.snapshot.queryParams['orderNumber'] !== undefined ? this.route.snapshot.queryParams['orderNumber'].toLowerCase() : undefined;
    this.shipmentNo = this.route.snapshot.queryParams['shipmentNumber'] !== undefined ? this.route.snapshot.queryParams['shipmentNumber'].toLowerCase() : undefined;
    this.firstName = this.route.snapshot.queryParams['firstName'] !== undefined ? this.route.snapshot.queryParams['firstName'].toLowerCase() : undefined;
    this.lastName = this.route.snapshot.queryParams['lastName'] !== undefined ? this.route.snapshot.queryParams['lastName'].toLowerCase() : undefined;
    this.emailId = this.route.snapshot.queryParams['emailId'] !== undefined ? this.route.snapshot.queryParams['emailId'].toLowerCase() : undefined;
    this.phoneNo = this.route.snapshot.queryParams['phoneNo'] !== undefined ? this.route.snapshot.queryParams['phoneNo'] : undefined;

    this.filterForm = this.fb.group({
      statuses: this.fb.array(this.statuses.map(() => this.fb.control(false)))
    });

    this.loadShipments('load');
  }

  applyFilters(): void {
    console.log(this.filterForm.value);
    this.loadShipments('filter');
  }

  loadShipments(mode: string) {

    this.loading = true;
    this.shipmentService.getShipments(this.page).subscribe(data => {
      console.log(data);
      let count = 0;
      if(mode === 'filter'){
        console.log("FILTER");
      }else{
        if(this.orderNo !== undefined || this.shipmentNo !== undefined || this.emailId !== undefined || this.firstName !== undefined || this.lastName !== undefined || this.phoneNo !== undefined){
          for (let val of data.Shipments.Shipment) {
            if(val.OrderNo.toLowerCase() == this.orderNo || val.ShipmentNo.toLowerCase() == this.shipmentNo || val.BillToAddress.FirstName.toLowerCase() == this.firstName || val.BillToAddress.LastName.toLowerCase() == this.lastName
              || val.BillToAddress.EMailID.toLowerCase() == this.emailId || val.BillToAddress.DayPhone == this.phoneNo
            ){
              this.shipments = [...this.shipments, val];
              console.log(this.shipments);
              count++;
            }
          }
          this.totalNoOfRecords = count.toString();
          if(count == 1){
            this.viewDetails(this.shipments['0'].ShipmentNo);
          }
        }else{
          this.shipments = [...this.shipments, ...data.Shipments.Shipment];
          this.totalNoOfRecords = data.Shipments.TotalNumberOfRecords;
          this.loading = false;
          this.page++;
        }
      }
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  viewDetails(shipmentNo: string) {
    this.router.navigate(['/shipment/details', shipmentNo]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loading) {
      this.loadShipments('load');
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}


