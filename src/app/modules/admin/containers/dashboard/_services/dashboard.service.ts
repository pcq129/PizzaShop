import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from 'src/app/core/model/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboardData(filter?: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.baseURL + `dashboard/${filter}`);
  }
}
