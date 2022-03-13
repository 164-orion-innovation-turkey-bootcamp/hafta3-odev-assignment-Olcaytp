import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup; //reactiveform için kullanıyoruz
  errorMessage: string;

  constructor(private router: Router, private dataService: DataserviceService ) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{6,30})'),
      ]),
    });
  }

  onSubmit(){
    if(this.loginForm.valid)
    {
      const userInfo = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };

      this.dataService.postData(userInfo).subscribe((olcay) => {
        console.log(olcay);
        this.router.navigate(['/login'])
      });
    }







    // yaptığımız requeste karşılık database in(api'nin) bize yaptığı tepki
    //   this.dataService.getData().subscribe((elm) => {
    //   // console.log(elm);
    //   elm.forEach(user => {
    //     // console.log(user);
    //     if(userInfo.email == user.email && userInfo.password == user.password)
    //     {
    //       localStorage.setItem('user', JSON.stringify(user))
    //       //local storage ne için kullanılır?Guard.service te de kullanıyoruz.
    //       //burda browserin deposu olan localstorage'a bi tane string yazıyoruz.
    //       //Sadece string veya number primitive yapı koyuyoruz.user başlığı altında user email ve passwordünü json.
    //       //stringify metodu ile stringe çevirip local storage a kaydediyoruz
    //       this.loginForm.reset();
    //       this.router.navigate(['/home']);
    //     } else {
    //       this.errorMessage = 'Böyle bir kullanıcı yok !!!';
    //       this.timer();
    //     }
    //   });
    // })
}

/* timer() {
  setTimeout(() => {
    this.errorMessage = '';
  },3000)
} */

}
