import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(event: any){
    const params = {
      page: event?.pageIndex+1 || 1,
      perPage : event?.pageSize || 5
    }
    return this.http.get(environment.baseURL + `user`);
  }

  addUser(data : any){
    return this.http.post(environment.baseURL + 'user', data);
  }

  editUser(data: any, id : number){
    return this.http.put(environment.baseURL + `user/${id}`, data)
  }

  deleteUser(id:number){


    return this.http.delete(environment.baseURL + `user/${id}`);
  }

  searchUser(search : string){
    return this.http.get(environment.baseURL + `user/search/${search}`);
  }

  getRoles(){
    return this.http.get(environment.baseURL + `roles`)
  }

  updateRoles(id: number, permissions: string[]){
    let data = {
      permissions : permissions
    }
    return this.http.post(environment.baseURL + `update-role/${id}`, data)
  }
}
