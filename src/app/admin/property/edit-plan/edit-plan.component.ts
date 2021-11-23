import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from '../property.service';
import { AuthService } from 'src/app/common/auth.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {
  PlanForm: FormGroup;
  @Input() planDetails;

  // Validation Patterns
  alphaNumeric = /^[a-z\d\-_\s]+$/i;
  characterOnly = /^[a-zA-Z ]*$/;
  spaceOnly = /^[^-\s]/;
  numericOnly = /^\d+$/;

  constructor(private fb : FormBuilder, private service: PropertyService,
    private authService: AuthService) {
   this.PlanForm = fb.group({
     name: ['', Validators.compose([Validators.required, Validators.compose([
       Validators.pattern(this.characterOnly), Validators.pattern(this.spaceOnly)])])],  
       description: ['', Validators.compose([Validators.required, Validators.compose([
         Validators.pattern(this.characterOnly), Validators.pattern(this.spaceOnly)
       ])])],
       amount: ['', Validators.compose([Validators.required, Validators.compose([
         Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)
       ])])],
       occurrence: [''] 
   });
  }
  ngOnInit() {
  }

  updatePlan(value){

  }

}
