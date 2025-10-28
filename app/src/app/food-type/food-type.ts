import { HttpClient } from '@angular/common/http';
import { Component,OnInit,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import config from '../../config';
import Swal from 'sweetalert2';
import { MyModal } from "../my-modal/my-modal";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-food-type',
  imports: [FormsModule, MyModal],
  templateUrl: './food-type.html',
  styleUrl: './food-type.css'
})
export class FoodType {

  @ViewChild(MyModal) myModal!: MyModal;
  name: string  = '';
  remark: string = '';
  foodTypes:any = []; 
  id: number =0; 

  constructor(private http: HttpClient){}
  ngOnInit(){
    this.fetchData();
  }

  openModal() {
    // รีเซ็ตค่าในฟอร์มก่อนเปิด
    this.name = '';
    this.remark = '';
    // เรียกใช้ฟังก์ชัน open() ของ child component
    this.myModal.open();
  }

  save(){
    try{
      const payload = {
        name : this.name,
        remark : this.remark,
        id: 0 ,
      };
      if (this.id > 0){ //เท่ากับไม่ได้สร้าง ใหม่
        payload.id = this.id;

        this.http.put(config.apiServer + 'api/foodType/update', payload).subscribe((res:any) =>{
          this.fetchData();
          this.myModal.close(); // สั่งปิด Modal หลังจากบันทึกสำเร็จ
          this.id = 0; // reset id after update datda to wait new data round
        })  

      }else{// create new transaction
        this.http.post(config.apiServer + 'api/foodType/create',payload)
        .subscribe((res) => {
          this.fetchData();
          this.myModal.close(); // สั่งปิด Modal หลังจากบันทึกสำเร็จ
          Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลเรียบร้อย', icon: 'success' });
        })
      }
     
    }catch(e: any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error',
      });
    }
  }

  fetchData(){
    this.http.get(config.apiServer + 'api/foodType/list')
    .subscribe((res : any)=>{
        this.foodTypes = res.results;   
        console.log("output from foodtypelist:",res.results)     
    })  
  }


  async remove(item: any){
    try{
      const button = await Swal.fire({
        title : 'ลบรายการ',
        text :  "ต้องการลบรายการหรือไม่",
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true
    })
    if(button.isConfirmed){
      this.http.delete(config.apiServer + 'api/foodType/remove/' + item.id)
      .subscribe((res: any) =>{
        this.fetchData()
      })
    }
    }
    catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }

  edit(item: any){
    this.name = item.name;
    this.remark = item.remark;
    this.id =item.id;

    //open modal
    this.myModal.open();
  }






}
