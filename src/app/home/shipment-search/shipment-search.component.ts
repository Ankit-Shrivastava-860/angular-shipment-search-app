import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'app-shipment-search',
  templateUrl: './shipment-search.component.html',
  styleUrl: './shipment-search.component.scss'
})
export class ShipmentSearchComponent {
  searchCriteria = { shipmentNumber: undefined, orderNumber: undefined, firstName: undefined, lastName: undefined, emailId: undefined, phoneNo: undefined };

  constructor(private router: Router, private shipmentService: ShipmentService) {}

  onSearch() {
    this.router.navigate(['/shipment/results'], { queryParams: this.searchCriteria});
  }
}

