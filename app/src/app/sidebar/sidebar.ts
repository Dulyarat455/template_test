import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
    name : String = '';

    ngOnInit(){
      this.name =localStorage.getItem('angular_name')!; 
    }

    async signout(){    
      const button = await Swal.fire({
        title: "Sign out",
        text: "You Sign Out Right?",
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
      })
      if(button.isConfirmed){
        localStorage.removeItem('angular_token');
        localStorage.removeItem('angular_name');

        location.reload();
      }
    }

}
