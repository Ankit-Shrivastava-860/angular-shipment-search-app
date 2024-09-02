import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';
import { ShipmentResultsComponent } from './shipment-results/shipment-results.component';

const routes: Routes = [
  { path: 'results', component: ShipmentResultsComponent },
  { path: 'details/:id', component: ShipmentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
