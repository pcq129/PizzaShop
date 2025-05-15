import { Injectable } from '@angular/core';
import { Modifier, ModifierGroup} from 'src/app/common/interfaces/modifier';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/common/_services/snackbar.service';
@Injectable({
  providedIn: 'root',
})
export class ModifierService {
  search(modifierName: any, pageChange?: any) {
    const params = {
      page: pageChange?.pageIndex + 1 || 1,
      perPage: pageChange?.pageSize || 5,
    };
    return this.http.get(
      environment.baseURL + `modifier/search/${modifierName}`,
      { params }
    );
  }

  //services for mappers

  // getMapper(){
  //   return this.http.get(environment.baseURL + `modifier-mapper`);
  // }

  //services for modifiers

  addModifier(result: any) {
    return this.http.post(environment.baseURL + `modifier`, result);
  }
  deleteModifier(modifierId: any) {
    return this.http.delete(environment.baseURL + `modifier/${modifierId}`);
  }
  constructor(private http: HttpClient) {}

  editModifier(data: any) {
    return this.http.put(environment.baseURL + `modifier/${data.id}`, data);
  }

  deleteMultipleModifiers(modifierIds : number[]){
    const data = {
      modifierIds : modifierIds
    }
    return this.http.post(environment.baseURL + 'delete-modifiers' , data);
  }

  getModifierData() {
    return this.http.get(environment.baseURL + `modifier`);
  }

  //services for modifiergroups

  getModifierGroupsData() {
    return this.http.get(environment.baseURL + `modifier-group`);
  }

  getModifierGroupList() {
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
      environment.baseURL + `modifier-group` + '/' + modifierId
    );
  }

  modifierByModifierGroup(groupId: number, pageChange?: any) {
    let params = {};
    params = {
      page: pageChange?.pageIndex + 1 || 1,
      perPage: pageChange?.pageSize || 5,
    };

    console.log(params);

    return this.http.get(
      environment.baseURL + `modifiergroup-modifiers/${groupId}`,
      { params: params }
    );
  }
}
