import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { customer } from '../models/customer';
import { customerorder } from '../models/cutomer-order';
import { order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class CustomerOrdersService {

  private url = "CustomerOrder";
  constructor(private http: HttpClient) { }
  
  public getCustomers() : Observable<customer[]> {
    return this.http.get<customer[]>(`${environment.apiUrl}/${this.url}/${'customers'}`);
  }

  public getOrders() : Observable<order[]>  {
    return this.http.get<order[]>(`${environment.apiUrl}/${this.url}/${'orders'}`);
  }

  public getCutomerOrders() : Observable<customerorder[]> {
    return this.http.get<customerorder[]>(`${environment.apiUrl}/${this.url}/${'customerorders'}`);
  }
}
