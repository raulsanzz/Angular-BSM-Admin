import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from '../property.service';
import { AuthService } from 'src/app/common/auth.service';
import { HttpBackend } from '@angular/common/http';
import { PropertyComponent } from '../property.component';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  @Input() propertyDetails;
  propertyForm: FormGroup;
  PropertyList: any = [];

  // Validation Patterns
  alphaNumeric = /^[a-z\d\-_\s]+$/i;
  characterOnly = /^[a-zA-Z ]*$/;
  spaceOnly = /^[^-\s]/;
  numericOnly = /^\d+$/;

  constructor(private fb: FormBuilder, private service: PropertyService, private authService: AuthService, private parentComponent: PropertyComponent ) { 
    
   
    
  }

  ngOnInit() {
    this.propertyForm = this.fb.group({
      name: [this.propertyDetails.name, Validators.compose([Validators.required, Validators.compose([
        Validators.pattern(this.characterOnly), Validators.pattern(this.spaceOnly)])])],  
        type: [this.propertyDetails.type, Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.alphaNumeric), Validators.pattern(this.spaceOnly)
        ])])],
        area: [this.propertyDetails.area, Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)
        ])])] 
    });
  
  }
  back(){
    this.parentComponent.propertyViewList();
  }
 
  updateProperty(value){
    this.service.editProperty(value, this.propertyDetails.id).subscribe
    (
      data =>{
        this.propertyDetails.name = value.name;
        this.propertyDetails.type = value.type;
        this.propertyDetails.area = value.area;
        console.log('here is data', data);
        this.back();
      },
      error =>{
        console.log('here is error ', error);
      }
    )
  }

}
