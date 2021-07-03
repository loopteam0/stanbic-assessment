import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../interfaces/student';
import * as pdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as fs from 'file-saver';
import * as xlsx from 'xlsx';
import { FileType } from '../interfaces/enum';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const PDF_TYPE = 'application/pdf;charset=UTF-8';
@Injectable({
  providedIn: 'root'
})
export class Service {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }
  private baseUrl = 'http://localhost:3000';

  async signin(data: any) {
    try {

      const res = await this.http.get(this.baseUrl + '/auth').toPromise()
      this.isLoggedIn = true;
      return res;
    } catch (error) {
      return error;
    }
  }

  async signUp(data: any) {
    try {

      const res = await this.http.post(this.baseUrl + '/auth', {
        data: data,
      }).toPromise()

      this.isLoggedIn = true;
      return res;
    } catch (error) {
      return error;
    }
  }

  async getStudents() {
    try {

      const res = await this.http.get(this.baseUrl + '/students').toPromise()
      return res;
    } catch (error) {
      return error;
    }
  }


  public exportAsExcelFile(data: Student[], excelFileName: string): void {
    if (data.length == 0) {
      this.snackbar.open('There is not data to export', 'OK', {
        duration: 3000
      });
      return;
    }
    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(data);
    const workbook: xlsx.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsFile(excelBuffer, excelFileName);
  }

  private saveAsFile(buffer: any, fileName: string): void {
    let data: Blob = new Blob([buffer], { type: EXCEL_TYPE })
    fs.saveAs(data, fileName);
  }

  async saveAsPdf(id: string, fileName: string) {
    let doc: any = new pdf.jsPDF()
    autoTable(doc, {
      html: id,
    });
    doc.save(fileName);
  }

  signOut() {
    this.isLoggedIn = false;
  }
}
