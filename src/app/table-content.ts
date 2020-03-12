import {Component,Inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder } from '@angular/forms';
/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content-example',
  templateUrl: 'table-content.html',
  styleUrls : ['./table-content.css']
})


export class DialogContentExample {
  constructor(public dialog: MatDialog) {}
   ELEMENT_DATA = [
  { name: 'Rahul', contact: 9712345678},
  { name: 'Rohan', contact: 9712345678, },
  { name: 'Nikhil', contact: 9712345678,},
  { name: 'Sneha', contact: 9712345678},
  { name: 'Burhan', contact: 9712345678, },
  
];
mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  displayedColumns: string[] = ['name', 'contact','delete','edit' ];
  dataSource =new MatTableDataSource(this.ELEMENT_DATA); 
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(this.isFormEmtpy(result)) {
        return;
      }
      this.ELEMENT_DATA.unshift({
        'name' : result.firstName,
        'contact' : result.phno
      });
      this.dataSource =new MatTableDataSource(this.ELEMENT_DATA); 
      console.log(`Dialog result:`,result);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  removeAt(i){    
    this.ELEMENT_DATA.splice(i,1);
    this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);// this line is to refresh view and detect changes for updating table view

}
  editContact(i) {
    this.ELEMENT_DATA[i];
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      data:  this.ELEMENT_DATA[i],
    });
    dialogRef.afterClosed().subscribe(result => {
      if(this.isFormEmtpy(result)) {
        return;
      }
      this.ELEMENT_DATA[i] = {
        'name' : result.firstName,
        'contact' : result.phno
      };
      this.dataSource =new MatTableDataSource(this.ELEMENT_DATA); 
    });
  }
  isFormEmtpy(obj) {
    let isEmpty = true;
    let i = 0 ;
    let values = Object.values(obj);
    while( i < values.length) {
      if(values[i]) {
         isEmpty = false;
         break;
       }
       i++;
    }
    //  Object.values(obj).forEach((val) => { 
    //    if(!val) {
    //      isEmpty = true;
    //     //  break;
    //    }
    // });
    return isEmpty;
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-add.html',
   
})
export class DialogContentExampleDialog {
  private addContactForm;
  constructor(
    private fb : FormBuilder,
    private dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.info(this.data)
    this.addContactForm = this.fb.group({
      'firstName': this.data ? this.data.name : '',
      'phno' : this.data ? this.data.contact : ''
    })
  }

  ngOnInit() {
    console.info(this.data)
  }

  save() {
        this.dialogRef.close(this.addContactForm.value);
    }
}




/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */