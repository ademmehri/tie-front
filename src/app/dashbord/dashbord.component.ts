import { Component } from '@angular/core';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  totalItems: string|number|undefined;
  p: string|number|undefined;
  emps!:employee[]
  empr!:employee[]
  emp!:employee[]
  emprcafe!:employee[]
  emprrest!:employee[]
  emprhotel!:employee[]
  sps!:string[]
  ds!:string[]
  us=true
  show=false
  upemr!:employee
  formsignin!:FormGroup;
  constructor(private fb:FormBuilder,private userservice:UserService,private route:Router){
    this.formsignin=this.fb.group(
      {
        "pa":["",],
        "du":["",],
      }
    )
this.userservice.getemployees().subscribe(
  res=>{
    this.emps=res
   
    this.empr=this.emps.filter((e:employee)=> e.roles[0].role==='ENTR')
    this.emp=this.emps.filter((e:employee)=> e.roles[0].role==='USER')
    this.emp.forEach(employee => {
      // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
      employee.files = employee.files.filter(file => file.nomfichier === 'image');
  });

  //on retourne les specialité distinct
 this.sps= this.emp.reduce((acc: string[], curr: any) => {
    if (!acc.includes(curr.specialite)) {
      acc.push(curr.specialite);
    }
    return acc;
  }, []);
  this.ds= this.empr.reduce((acc: string[], curr: any) => {
    if (!acc.includes(curr.specialite)) {
      acc.push(curr.specialite);
    }
    return acc;
  }, []);
   this.emprcafe=this.emps.filter((e:employee)=> e.specialite==='Salon de thé')
    this.emprrest=this.emps.filter((e:employee)=> e.specialite==='resturant')
    this.emprhotel=this.emps.filter((e:employee)=> e.specialite==='Hotel')
  }
)
    
  }
  afficheuser(){
    this.us=true
  }
  afficheempr(){
    this.us=false
  }
  onSelectdomaine(e:any){
    const ch=e.target.value
    if(ch=='tous'){
      this.userservice.getemployees().subscribe(
        res=>{
          this.emps=res
          this.emp=this.emps.filter((e:employee)=> e.roles[0].role==='USER')
        })
    }
    else{
      this.emp=this.emps.filter((e:employee)=> e.specialite===ch)
    }
  }
  onSelecttype(e:any){
    const ch=e.target.value
    if(ch=='tous'){
      this.userservice.getemployees().subscribe(
        res=>{
          this.emps=res
          this.empr=this.emps.filter((e:employee)=> e.roles[0].role==='ENTR')
        })
    }
    else{
      this.empr=this.emps.filter((e:employee)=> e.specialite===ch)
    }
  }
  modifier(){
    if(this.formsignin.controls['pa'].value==''){
      this.upemr.duree=this.formsignin.controls['du'].value
      this.upemr.d_inscrit = new Date();
      this.userservice.updatepack(this.upemr).subscribe(
        res=>{
          this.relod()
          this.show=false
          this.us=false
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Pack Modifié"
          });
        },(error) => {
          if (error.status === 403) {
            this.route.navigate(["login"]);
          }
        }
      )
    }
    else if( this.formsignin.controls['du'].value==''){
      this.upemr.pack= this.formsignin.controls['pa'].value
      this.upemr.d_inscrit = new Date();
      this.us=false
      this.userservice.updatepack(this.upemr).subscribe(
        res=>{
          this.show=false
          this.relod()
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Pack Modifié"
          });
        }
      )
    }
    else{
  
      this.upemr.duree=this.formsignin.controls['du'].value
      this.upemr.pack= this.formsignin.controls['pa'].value
      this.upemr.d_inscrit = new Date();
      this.userservice.updatepack(this.upemr).subscribe(
        res=>{
          this.show=false
          this.relod()
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Pack Modifié"
          });
        },(error) => {
          if (error.status === 403) {
            this.route.navigate(["/login"]);
          }
        }
      )
    }



  }
  annulerevent(){
    this.show=false
  }
  afficherevent(id:bigint){
    this.show=true
    this.upemr= this.empr.find(e => e.id === id)!;

  }
  relod(){
    
    const currentUrl = this.route.url;

    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

}
