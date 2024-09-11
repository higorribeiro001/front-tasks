import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

interface Person {
  id: number
  name: string
  date_birth: string
  cpf: string
  sex: string
  height: number
  weight: number
}

interface IdealWeight {
  user: string,
  ideal_weight: number
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = `${environment.apiUrl}person/api/v1/`;
  private apiUrlIdealWeight = `${environment.apiUrl}ideal-weight/api/v1/`;

  constructor(private client: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.client.get<Person[]>(this.apiUrl)
  }

  getPerson(id: number): Observable<Person> {
    return this.client.get<Person>(`${this.apiUrl}${id}/`)
  }

  createPerson(name: string, date_birth: string, cpf: string, sex: string, height: number, weight: number): Observable<Person[]> {
    return this.client.post<Person[]>(this.apiUrl, {name, date_birth, cpf, sex, height, weight})
  }

  updatePerson(id: number, name: string, date_birth: string, cpf: string, sex: string, height: number, weight: number): Observable<Person[]> {
    return this.client.put<Person[]>(`${this.apiUrl}${id}/`, {name, date_birth, cpf, sex, height, weight})
  }

  deletePerson(id: number): Observable<Person[]> {
    return this.client.delete<Person[]>(`${this.apiUrl}${id}/`)
  }

  getIdealWeight(id: number): Observable<IdealWeight> {
    return this.client.get<IdealWeight>(`${this.apiUrlIdealWeight}${id}/`)
  }
}
