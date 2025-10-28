import { Component,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import config from '../../config';
import { FormsModule } from '@angular/forms';
import { MyModal } from "../my-modal/my-modal";

@Component({
  selector: 'app-sale',
  imports: [FormsModule, MyModal],
  templateUrl: './sale.html',
  styleUrl: './sale.css'
})
export class Sale {
  constructor(private http: HttpClient){}
  @ViewChild(MyModal) myModal!: MyModal;

  foods:any = [];
  saleTemps:any = [];
  foodSizes: any =[];
  apiPath: string = '';
  tableNo: number = 1;
  userId: number = 0;
  amount: number = 0;
  saleTempId: number = 0;
  foodName: string = '';
  saleTempDetail: any = [];


  selectedFoodSize(saleTempId: number, foodSizeId:number){
    try{
      const payload ={
        saleTempId: saleTempId,
        foodSizeId: foodSizeId,
      }

      this.http
      .post(config.apiServer + 'api/saleTemp/updateFoodSize',payload)
      .subscribe((res:any)=>{
        this.fetchDataSaleTempDetail();
      })
       
    }catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error' 
      })
    }
  }

  chooseFoodSize(item:any)
  {
    let foodTypeId: number = item.Food.foodTypeId;
    this.saleTempId = item.id;
    this.foodName = item.Food.name;

     try{
      this.http.get(config.apiServer + 'api/foodSize/filter/' + foodTypeId)
      .subscribe((res:any)=>{
        this.foodSizes = res.results;
      })


      const payload ={ 
        foodId: item.foodId,
        qty: item.qty,
        saleTempId: item.id, 
      }

      this.http
      .post(config.apiServer + 'api/saleTemp/createDetail',payload)
      .subscribe((res:any) =>{
        this.fetchDataSaleTempDetail();
      });

      this.myModal.open();

     }catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
     }
  }

  fetchDataSaleTempDetail(){
      this.http
      .get(config.apiServer + 'api/saleTemp/listSaleTempDetail/' + this.saleTempId)
      .subscribe((res:any)=>{
        this.saleTempDetail = res.results;
        this.computeAmount();
      })
  }

  computeAmount(){
    this.amount = 0;
    
    for(let i=0 ; i< this.saleTemps; i++){
      const item = this.saleTemps[i];
      const totalPerRow = item.qty * item.price;

      for (let j = 0; j < item.SaleTempDetails.length;  j++){
        this.amount += item.SaleTempDetails[j].addedMoney;
      }
      this.amount += totalPerRow;
    }
    
    console.log("at computAmount : ",this.amount)


  }

  async removeItem(item:any){
    try{
      const button = await Swal.fire({
        title: 'ลบ' + item.food.name,
        text: 'คุณต้องการลบรายการหรือไม่',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
      })

      if(button.isConfirmed){  
        this.http.delete(config.apiServer + 'api/saleTemp/remove/'+ item.foodId + '/' + this.userId)
        .subscribe((res:any) =>{
          this.fetchDataScaleTemp();
        })
      }
    }catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }
  
// ปรับจำนวนลง
  changeQty(id:number, style: string){
    try{
      const payload ={
        id:id,
        style:style
      }
      this.http.put(config.apiServer + 'api/saleTemp/changeQty',payload)
      .subscribe((res:any)=>{
        this.fetchDataScaleTemp();
      })


    }catch(e: any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }


  ngOnInit(){
    this.fetchData();
   
    this.apiPath = config.apiServer;
    let userId =  localStorage.getItem('angular_id');

    if(userId !== null){
      this.userId = parseInt(userId) 
      this.fetchDataScaleTemp();
    }

   
  }


  saveToSaleTemp(item:any){
    try{
      
      const payload = {
        qty:1,
        tableNo: this.tableNo,
        foodId: item.id, 
        userId: this.userId,
      }
      this.http.post(config.apiServer +'api/saleTemp/create',payload)
      .subscribe((res:any) =>{
        this.fetchDataScaleTemp();
      })
    }catch(e: any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error',
      })
    }
  }

  fetchDataScaleTemp(){
    try{
      this.http
      .get(config.apiServer + 'api/saleTemp/list/' + this.userId)
      .subscribe((res:any)=>{
        this.saleTemps = res.results
        this.computeAmount();

      })

    }catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error', 
      });
    }
  }

  filter(foodType:string){
    try{
      this.http.get(config.apiServer + 'api/food/filter/' + foodType)
      .subscribe((res:any) => {
        this.foods = res.results;
      })
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
      this.http
      .get(config.apiServer + 'api/food/list')
      .subscribe((res: any) =>{
        this.foods = res.results;
      })
    }catch(e:any){
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }

  async clearAllRow() {
    const button = await Swal.fire({
      title: 'ล้างรายการ',
      text: 'คุณต้องการล้างรายการทั้งหมดใช่ไหม',
      showCancelButton: true,
      showConfirmButton: true,
      icon: 'question'
    })

    if(button.isConfirmed){
      this.http
      .delete(config.apiServer + 'api/saleTemp/clear/' + this.userId)
      .subscribe((res:any) =>{
        this.fetchDataScaleTemp();
      })
    }
  }

}
