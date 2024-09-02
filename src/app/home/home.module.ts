import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HomeRoutingModule } from './home-routing.module';
import { ShipmentSearchComponent } from './shipment-search/shipment-search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShipmentSearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    TranslateModule
  ]
})
export class HomeModule { }
