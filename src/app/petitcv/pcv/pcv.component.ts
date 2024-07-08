import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { filee } from 'src/app/models/filee.model';
import { OffreService } from 'src/app/services/offre.service';


import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pcv',
  templateUrl: './pcv.component.html',
  styleUrls: ['./pcv.component.css']
})
export class PcvComponent implements OnInit {
  idempr!:bigint;
  idemp!:bigint;
emp!:employee
cv!:filee
empr!:employee
file!:filee
url='assets/par2.png'
desc!:String
formsignin!:FormGroup;
result1!:string
  constructor(private  router:ActivatedRoute,private userserv:UserService,private offreserv:OffreService,private fb:FormBuilder,private route:Router){
    this.formsignin=this.fb.group(
      {
        "offre":["",Validators.required],
        
      }
    )
  
  }
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const userEmail = sessionStorage.getItem('email')!;
    this.idemp=JSON.parse(sessionStorage.getItem('userId')!);
    if(userEmail!=undefined){
   this.userserv.getuserbyemail(userEmail).subscribe(
     res=>{
       this.empr=res
     },(error) => {
      if (error.status === 403) {
        this.route.navigate(["login"]);
      }
    }
   )
    }
    this.userserv.getuserbyid(this.idemp).subscribe(
      res=>{
        this.emp=res
        if(this.emp.files!=undefined){
          this.file=this.emp.files.find(file => file.nomfichier === 'image')!;
          this.cv=this.emp.files.find(file => file.nomfichier === 'cv')!;
        if(this.file!=undefined){
          this.url='assets/'+this.file.titlefile
        }
         }
      },(error) => {
        if (error.status === 403) {
          this.route.navigate(["login"]);
        }
      }
    )
  }
  onsubmit(){
    if(this.formsignin.controls['offre'].errors?.['required']){
      this.result1="s'il vous plait saisire votre offre!!!!";
      
    }
    else{
      this.result1="";
    }
    if(this.formsignin.valid){
      this.offreserv.addoffre(this.idemp,this.empr.id,this.formsignin.controls['offre'].value).subscribe(
        res=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Offre enregistré",
            showConfirmButton: false,
            timer: 1500
          });
          this.route.navigate(["pagepatron"]);
        },(error) => {
          if (error.status === 403) {
            this.route.navigate(["login"]);
          }
        }
      )
   

    }

  }
  annuler(){
    this.route.navigate(["profilemployee"]);
  }

}
