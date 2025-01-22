import { Component, OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatInputModule} from '@angular/material/input';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { core } from '@angular/compiler';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

 
  displayedColumns: string[] = ['id','FirstName','LastName','dob','email','gender','stprec','poste','experience','package','action',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private _dialog:MatDialog,
    private _empService:EmployeeService,
    private _coreService:CoreService){}
  ngOnInit(): void {
    this.getEmpolyeeLsit()
  }
  openAddEditEmpForm(){
   const dialogRef = this._dialog.open(EmpAddEditComponent);
   dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if(val){
        this.getEmpolyeeLsit();
      }

    },
   });
  }
  getEmpolyeeLsit(){
    this._empService.getEmployeeList().subscribe({
      next:(res)=>{
      console.log(res);
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
      },
      error:console.log,
      
      
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number) {
    this._empService.deleteEmployee(id).subscribe({
      next:  (res) => {
        this._coreService.openSnackBar('Employee deleted','done')
        this.getEmpolyeeLsit();

      },
      error:  console.log,
    });
  }
  openEditForm(data:any){
  const dialogRef = this._dialog.open(EmpAddEditComponent,{
    data,
   });
   dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if(val){
        this.getEmpolyeeLsit();
      }

    },
   });
  }
}
