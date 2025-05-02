import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Section, Table } from '../admin/table-section/table-section';

@Injectable({
  providedIn: 'root'
})
export class TableSectionService {

  constructor(private http: HttpClient) { }


  //services for tables
  getAllTableData(pageChange? : any){
    // const params = {
    //   page : pageChange?.pageIndex+1 || 1,
    //   perPage : pageChange?.pageSize || 5
    // }{params: params}
    return this.http.get(environment.baseURL + `table`,);
  }

  getTableDataBySection(id : number, pageChange? : any){
    const params = {
      page : pageChange?.pageIndex+1 || 1,
      perPage : pageChange?.pageSize || 5
    }
    return  this.http.get(environment.baseURL + `sectionstable/${id}`, {params: params});
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

  assignTables(data: any){
    return this.http.post(environment.baseURL + 'customer/assign-table', data)
  }

  searchCustomer(data: any){
    console.log(data);
    return this.http.post(environment.baseURL + `customer/search`, data)
  }

  createWaitingToken(data : any){
    return this.http.post(environment.baseURL + 'customer/waiting-token', data)
  }

  updateWaitingToken(data : any){
    return this.http.post(environment.baseURL + 'customer/update-waiting-token', data)
  }

  searchTable(tableName: string){
    return this.http.get(environment.baseURL + `table/search/${tableName}`);
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
