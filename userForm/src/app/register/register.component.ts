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
  registerForm: FormGroup; //reactiveform için kullanıyoruz
  errorMessage: string;

  constructor(private router: Router, private dataService: DataserviceService ) { }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fullname : new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{6,30})'),
      ]),
    });
  }

  onSubmit(){
    if(this.registerForm.valid)
    {
      const userInfo = {
        fullname: this.registerForm.get('fullname').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      };

      this.dataService.postData(userInfo).subscribe((key) => {
        console.log(key);
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
    //       this.registerForm.reset();
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
