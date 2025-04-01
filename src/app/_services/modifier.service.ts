import { Injectable } from '@angular/core';
import { Modifier, ModifierGroup } from '../common/interfaces/modifier';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';
@Injectable({
  providedIn: 'root',
})
export class ModifierService {

  //services for mappers

  // getMapper(){
  //   return this.http.get(environment.baseURL + `modifier-mapper`);
  // }

  //services for modifiers


  addModifier(result: any) {
    return this.http.post(environment.baseURL + `modifier`, result);
  }
  deleteModifier(modifierId: any) {
    return this.http.delete(
      environment.baseURL + `modifier/${modifierId}`
    );
  }
  constructor(private http: HttpClient) {}

  editModifier(data: any) {
    return this.http.put(
      environment.baseURL + `modifier/${data.id}`,
      data
    );
  }

  getModifierData() {
    return this.http.get(environment.baseURL + `modifier`);
  }

  //services for modifiergroups

  getModifierGroupsData() {
    return this.http.get(environment.baseURL + `modifier-group`);
  }

  getModifierGroupList(){
    return this.http.get(environment.baseURL + `modifier-group-list`);
  }

  editModifierGroup(data: ModifierGroup) {
    return this.http.put(
      environment.baseURL + `modifier-group/${data.id}`,
      data
    );
  }

  addModifierGroup(data: any) {
    return this.http.post(environment.baseURL + `modifier-group`, data);
  }

  deleteModifierGroup(modifierId: any) {
    return this.http.delete(
      environment.baseURL + `modifier-group`+ '/' + modifierId);
  }
}
