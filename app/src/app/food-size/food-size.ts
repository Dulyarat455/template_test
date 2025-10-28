import { Component,ViewChild } from '@angular/core';
import { MyModal } from "../my-modal/my-modal";
import config from '../../config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-food-size',
  imports: [MyModal, FormsModule],
  templateUrl: './food-size.html',
  styleUrl: './food-size.css'
})
export class FoodSize {
    constructor(private http: HttpClient){};

    @ViewChild(MyModal) myModal!: MyModal;
    foodTypes: any[] = [];
    foodSizes: any[] = [];
    id: number = 0;
    name: string = '';
    price: number = 0;
    remark: string = '';
    foodTypeId: number = 0;

    ngOnInit(){
      this.fetchData(); 
      this.fetchDataFoodType();
    }

    openModal(){
      this.id = 0;
      this.name = '';
      this.price = 0;
      this.remark = '';
      if (this.foodTypes.length > 0) {
        this.foodTypeId = this.foodTypes[0].id;
      }
      this.myModal.open();
    }

    edit(item: any){
      this.id = parseInt(item.id);
      this.name = item.name;
      this.price = item.moneyAdded; 
      this.remark = item.remark;
      this.foodTypeId = item.foodTypeId;
      this.myModal.open();
      
    }

    fetchData(){
      try{
        this.http.get(config.apiServer + 'api/foodSize/list').subscribe((res: any) =>{
          this.foodSizes = res.results;
        })
      }catch(e:any){
        Swal.fire({
          title: 'error',
          text: e.message,
          icon: 'error'
        })
      }
    }

    fetchDataFoodType(){
      this.http.get(config.apiServer + 'api/foodType/list')
      .subscribe((res: any) =>{
        this.foodTypes = res.results;
        this.foodTypeId = this.foodTypes[0].id;
      })
    }

    save(){
      const payload = {  
        name: this.name,
        price: this.price,
        remark: this.remark,
        id: this.id,
        foodTypeId: this.foodTypeId
      }
      if(this.id > 0){
        
        this.http.put(config.apiServer + 'api/foodSize/update', payload).subscribe((res:any)=>{
          this.fetchData();
          this.myModal.close();
          Swal.fire('สำเร็จ!', 'บันทึกข้อมูลเรียบร้อย', 'success');
          this.id = 0;
        })
      }else{
        this.http
        .post(config.apiServer + 'api/foodSize/create', payload)
        .subscribe((res: any) =>{
          // OG version
          // this.fetchData(); 
          // this.id = 0; 
          this.fetchData();
          this.myModal.close();
          Swal.fire('สำเร็จ!', 'บันทึกข้อมูลเรียบร้อย', 'success');
          this.id = 0; 
          
        })
      }
      // document.getElementById('modalFoodSize_btnClose')?.click();
    }


    private handleSaveSuccess() {
      this.fetchData();
      this.myModal.close();
      Swal.fire('สำเร็จ!', 'บันทึกข้อมูลเรียบร้อย', 'success');
    }
  
    private handleSaveError(err: any) {
      console.error('Save failed:', err);
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
    }

  async remove(item:any){
      try{
        const button = await Swal.fire(
          {
            title: 'ลบข้อมูล',
            text: 'คุณต้องการลบข้อมูลใช่หรือไม่',
            icon: 'question',
            showCancelButton:true,
            showConfirmButton:true
          })
          if(button.isConfirmed){
            this.http.delete(config.apiServer + 'api/foodSize/remove/' + item.id)
            .subscribe((res: any) =>{
              this.fetchData();
              console.log("after delete item");
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

}
