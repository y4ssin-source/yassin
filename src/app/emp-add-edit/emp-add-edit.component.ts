import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm:FormGroup;
  poste:string[]=[
    'sport',
    'médcine',
    'météo',
    'Politique',
    'autre',
  ];
  private _dialogRef: any;
  constructor(private _fb: FormBuilder,
    private _empService:EmployeeService,
    private_dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService:CoreService 
    ){
    this.empForm = this._fb.group({
      FirstName:'',
      LastName:'',
      dob:'',
      email:'',
      gender:'',
      stprec:'',
      poste:'',
      experience:'',
      package:'',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormsubmit(){
  if (this.empForm.valid){
    if(this.data){
      this._empService.updateemployee(this.data.id, this.empForm.value).subscribe({
        next:(val:any)=>{
  this._coreService.openSnackBar('Employee detail updated!!')
  this._dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error(err);
  
        },
  
      });

    }else{
this._empService.addemployee(this.empForm.value).subscribe({
      next:(val:any)=>{
this._coreService.openSnackBar('Employee added succefully',)
this._dialogRef.close(true);
      },
      error:(err:any)=>{
        console.error(err);

      },

    });
  }
}

  }
}
