import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { SignIn } from './sign-in/sign-in';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidebar, SignIn],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   token: string | undefined = "";
   ngOnInit(){
     this.token = localStorage.getItem('angular_token')!; // เป็นค่า NULL ก็ได้ if use "!"
     console.log("from app page : ",this.token)
   }
}
