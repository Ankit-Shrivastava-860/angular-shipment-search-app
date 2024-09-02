import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrl: './shipment-details.component.scss'
})
export class ShipmentDetailsComponent implements OnInit {

  shipment: any;
  isShowInfo: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private shipmentService: ShipmentService) {}

  ngOnInit() {
    const shipmentNo = this.route.snapshot.paramMap.get('id');
    this.shipmentService.getShipmentDetails(shipmentNo).subscribe(data => {
      if(data.Shipment.ShipmentNo.toLowerCase() == shipmentNo.toLowerCase()){
        this.shipment = data.Shipment;
      }else{
        console.log("SHIPMENT NOT FOUND");
        this.goBack();
      }
      
    });
  }

  goBack() {
    this.router.navigate(['/shipment/results']);
  }

  hideInfo() {
    this.isShowInfo = false;
  }

  showInfo() {
    this.isShowInfo = true;
  }
}


