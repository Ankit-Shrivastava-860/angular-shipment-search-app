import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shipment-app';
  constructor( private translate: TranslateService) 
      {
        translate.setDefaultLang('en');
        translate.use('en');
     }
}
