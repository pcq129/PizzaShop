import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Section, Table } from '../layout/table-section/table-section';

@Injectable({
  providedIn: 'root'
})
export class TableSectionService {

  constructor(private http: HttpClient) { }


  //services for tables
  getAllTableData(){
    return this.http.get(environment.baseURL + `table`);
  }

  getTableDataBySection(id : number){
    return  this.http.get(environment.baseURL + `sectionstable/${id}`);
  }

  addTable(data : any){
    return this.http.post(environment.baseURL + `table`, data);
  }

  editTable(data : Table){
    return this.http.put(environment.baseURL + `table/${data.id}`, data);
  }

  getTable(id: number){
    return this.http.get(environment.baseURL + `table/${id}`);
  }

  deleteTable(id: number){
    return this.http.delete(environment.baseURL + `table/${id}`);
  }




  //services for sections

  getAllSectionData(){
    return this.http.get(environment.baseURL + `section`);
  }

  addSection(data : any){
    return this.http.post(environment.baseURL + `section`, data);
  }

  editSection(data : Section){
    return this.http.put(environment.baseURL + `section/${data.id}`, data);
  }

  getSection(id: number){
    return this.http.get(environment.baseURL + `section/${id}`);
  }

  deleteSection(id: number){
    return this.http.delete(environment.baseURL + `section/${id}`);
  }
}
