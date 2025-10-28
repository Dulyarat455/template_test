import { Component,ViewChild } from '@angular/core';
import { MyModal } from "../my-modal/my-modal";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import config from '../../config';


@Component({
  selector: 'app-taste',
  imports: [MyModal,FormsModule],
  templateUrl: './taste.html',
  styleUrl: './taste.css'
})
export class Taste {

  constructor(private http:HttpClient){}

  @ViewChild(MyModal) myModal!: MyModal;
  id: number = 0;
  foodTypeId: number = 0;
  name: string = '';
  remark: string ='';
  tastes: any[] = [];
  foodTypes: any[] = []; 


  ngOnInit(){
    this.fetchDataFoodTypes();
    this.fetchData();
  }

  openModal(){
    this.id =0;
    this.name ='';
    this.remark =''
    if (this.foodTypes.length > 0) {
      this.foodTypeId = this.foodTypes[0].id;
    }
    this.myModal.open();
  }

  fetchDataFoodTypes(){
    try{
      this.http.get(config.apiServer + 'api/foodType/list')
      .subscribe((res: any)=>{
        this.foodTypes =  res.results;
        this.foodTypeId = this.foodTypes[0].id
      });
    }catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }

  fetchData(){
     try{
      this.http.get(config.apiServer + 'api/taste/list').subscribe((res:any) =>{
        this.tastes = res.results;
      });
     }catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
     }
  }

  save(){
    try{
      const payload = {
        id: this.id,
        foodTypeId: parseInt(this.foodTypeId.toString()),
        name: this.name,
        remark: this.remark
      }
      console.log("payload before =",payload)
      if(this.id > 0){
        this.http.put(config.apiServer + 'api/taste/update',payload)
        .subscribe((res: any)=>{
          this.fetchData();
          this.myModal.close();
          Swal.fire('สำเร็จ!', 'บันทึกข้อมูลเรียบร้อย', 'success');
          this.id = 0; 
        })
      }else{
        this.http.post(config.apiServer + 'api/taste/create',payload).subscribe((res:any)=>{
          this.fetchData(); 
          this.myModal.close();
          Swal.fire('สำเร็จ!', 'บันทึกข้อมูลเรียบร้อย', 'success');
        })
      }
    }catch(e: any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error',
      })
    }
  }


  edit(item:any){
    this.foodTypeId = item.foodTypeId;
    this.name = item.name;
    this.id = item.id;
    this.remark = item.remark;
 
    this.myModal.open();
  }


  async remove(item: any){
    try{
      const button = await Swal.fire({
        title: 'ลบข้อมูล',
        text: 'ต้องการลบหรือไม่',
        icon: 'question',
        showCancelButton:true,
        showConfirmButton: true
      })
      if(button.isConfirmed){
        this.http.delete(config.apiServer + 'api/taste/remove/' + item.id)
        .subscribe((res:any) => {
          this.fetchData();
        });
      }
    }catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error',
      })
    }
  }
}
