import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }
  postData(user) {
    return this.http.post('http://localhost:3000/user', {user})
  }
  //http.get ile verileri alıp pipe ile dönüştürüyoruz, map key value objesi oluşturuyor.
  // observable dönüyor, js deki promise gibi.login de subscribe diyerek getir diyoruz loginde.array getirir.
  //pipe ardı ardına fonksiyonlar yazabilmemiz anlamına geliyor
  //pipe a gelen veriyi birçok veriyi farklı işlemlere tabi etme izni verir.
  //array func larda da pipe yapısı var.
  getData() {
    return this.http.get('http://localhost:3000/user').pipe(
      map ((responseData) => {
        let newArray = [];
        for(let key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            newArray.push(responseData[key]);
          }
        }
        return newArray;
      })
    );
  }
}
