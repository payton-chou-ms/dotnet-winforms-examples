import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Example, PaginatedResult, SplashScreenConfiguration } from '../models/example.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5002/api'; // Backend API URL

  getSplashScreenConfiguration(): Observable<SplashScreenConfiguration> {
    return this.http.get<SplashScreenConfiguration>(`${this.apiUrl}/configuration/splash-screen`);
  }

  getExamples(pageNumber: number = 1, pageSize: number = 10, category?: string): Observable<PaginatedResult<Example>> {
    let url = `${this.apiUrl}/examples?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (category) {
      url += `&category=${category}`;
    }
    return this.http.get<PaginatedResult<Example>>(url);
  }

  getExampleById(id: number): Observable<Example> {
    return this.http.get<Example>(`${this.apiUrl}/examples/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/examples/categories`);
  }
}
