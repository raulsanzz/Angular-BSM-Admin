import { Component , Input , OnChanges } from '@angular/core';

@Component({
  selector: 'app-no-record-found',
  templateUrl: './no-record.component.html',
  styleUrls: ['./no-record.component.scss']
})
export class NoRecordComponent implements OnChanges {

  @Input() loadingComponent: boolean;

  constructor() { }

  ngOnChanges(data) {
    if (data.loadingComponent) {
      this.loadingComponent = data.loadingComponent.currentValue;
    }
  }

}
