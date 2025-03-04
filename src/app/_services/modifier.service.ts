import { Injectable } from '@angular/core';
import { Modifier, ModifierGroup } from '../common/interfaces/modifier';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ModifierService {
  addModifier(result: any) {
    return this.http.post(environment.baseURL + `modifier`, result);
  }
  deleteModifier(modifierId: any) {
    return this.http.delete(
      environment.baseURL + `modifier` + '/' + modifierId
    );
  }
  constructor(private http: HttpClient) {}

  editModifier(data: Modifier) {
    return this.http.put(
      environment.baseURL + `modifier` + '/' + data.modifierId,
      data
    );
  }

  getModifier() {
    return this.http.get(environment.baseURL + `modifier`);
  }

  //services for modifiergroups

  getModifierGroups() {
    return this.http.get(environment.baseURL + `modifierGroup`);
  }

  editModifierGroup(data: ModifierGroup) {
    return this.http.put(
      environment.baseURL + `modifierGroup` + '/' + data.id,
      data
    );
  }

  addModifierGroup(data: any) {
    return this.http.post(environment.baseURL + `modifierGroup`, data);
  }

  deleteModifierGroup(modifierId: any) {
    return this.http.delete(
      environment.baseURL + `modifierGroup` + '/' + modifierId
    );
  }
}
