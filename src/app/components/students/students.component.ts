import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(private service: Service, private router: Router) {

  }

  loading: boolean = false;
  title = 'Stanbic Assessment';
  unPaidFilterKey = ''
  paidFilterKey = ''
  displayedColumns: string[] = ['index', 'name', 'fees', 'status'];
  unPaidDataSource!: MatTableDataSource<Student>;
  paidDataSource = new MatTableDataSource<Student>([]);
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.loading = true;
    this.service.getStudents().then(v => {
      this.unPaidDataSource = new MatTableDataSource<Student>(v)
      this.unPaidDataSource.sort = this.sort;
      this.paidDataSource.sort = this.sort
    }).finally(() => {
      this.loading = false;
    })
  }


  ngOnInit(): void { }

  ///? filter table data depending on key event
  filterPaidData(event: any) {
    this.paidFilterKey = event.target.value;
    this.paidDataSource.filter = this.paidFilterKey.trim().toLocaleLowerCase();
  }
  ///? filter table data depending on key event
  filterUnPaidData(event: any) {
    this.unPaidFilterKey = event.target.value;
    ///? compare the data in the table with the search key
    this.unPaidDataSource.filter = this.unPaidFilterKey.trim().toLocaleLowerCase();
  }

  onDrop(event: CdkDragDrop<MatTableDataSource<Student>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.data, event.previousIndex, event.currentIndex);
      this.refreshTable()
    } else {

      ///? transfer data from one table to the other
      transferArrayItem(
        event.previousContainer.data.data,
        event.container.data.data,
        event.previousIndex,
        event.currentIndex);
      this.refreshTable()
    }

  }

  ///? sign out current user
  signOut() {
    this.service.signOut();
    this.router.navigate(['/'])
  }

  ///? a helper function to refresh the table
  ///? since the data table depends on streams
  ///? this will will trigger refresh 
  refreshTable() {
    this.unPaidDataSource.filter = this.unPaidFilterKey;
    this.paidDataSource.filter = this.paidFilterKey;
  }
}




