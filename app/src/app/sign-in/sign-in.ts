import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  token: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.token = localStorage.getItem('angular_token')!;
    console.log("check teoken = ",this.token);
  }
  signIn() {
    if (this.username == '' || this.password == '') {
      Swal.fire({
        title: 'ตรวจาสอบข้อมูล',
        text: 'please input data',
        icon: 'error',
      });
    } else {
      const payload = {
        username: this.username,
        password: this.password,
      }
      try{
        this.http.post('http://localhost:3001/api/user/signin',payload).subscribe((res: any) =>{
          this.token = res.token;
          localStorage.setItem('angular_token',this.token);
          localStorage.setItem('angular_name',res.name);
          localStorage.setItem('angular_id', res.id);

          location.reload();
        },
        (err:any) =>{
          Swal.fire({
            title: 'ตรวจสอบข้อมูล',
            text: 'username invalid',
            icon: 'error',
          });
        }
      )
      }catch(e: any) {
        Swal.fire({
          title: 'error',
          text: e.message,
          icon: 'error',
        });
      }
    }
  }
}
