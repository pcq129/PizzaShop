import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(){
    return this.http.get(environment.baseURL + `user`);
  }

  addUser(data : any){
    return this.http.post(environment.baseURL + 'user', data);
  }

  editUser(data: any, id : number){
    return this.http.put(environment.baseURL + `user/${id}`, data)
  }

  deleteUser(id:number){
    console.log(id);

    return this.http.delete(environment.baseURL + `user/${id}`);
  }
}
