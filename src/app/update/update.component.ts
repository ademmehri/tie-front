import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from '../models/employee.model';
import { filee } from '../models/filee.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  filee!:filee
  mp!:string
   file!:File
   spe=['Barman','Chef de projet événementiel','Responsable communication et événementiel','Réceptionniste','Chef-réceptionniste','Veilleur de nuit','Directeur d’hébergement','Directeur d’hôtel','Adjoint de direction en hôtellerie','Directeur financier d’un hôtel','Directeur de la restauration','Manager spécialisé dans le luxe','Spa manager','Femme de chambre et valet de chambre','Gouvernante','Lingère','Guest Relation Manager','Yield manager','Chef de cuisine','Chef de partie','Commis de cuisine','Chef cuisinier ou chef de production en restauration collective','Chef-gérant en restauration collective','Économe','Manager dans la restauration','Directeur en restauration rapide','Manager d’un restaurant rapide','Gérant','Chef d’équipe d’un restaurant rapide','Pizzaïolo','Pâtissier','Boucher','Boulanger','Poissonnier','Chocolatier-confiseur','Serveur de restaurant','Chef de rang','Maître d’hôtel','Garçon de café','Plongeur','Majordome (Butler)','portier','Crêpier']
   input: string = '';
   emptyarray=['hello']
   listfinal=['']
   result!:employee
 url='assets/par2.png'
 id!:bigint
   emp!:employee
   formsignin!:FormGroup;
 getcv!:filee
   cv!:File
   afficherTexte!:boolean
   bdate=""
 date=""
 exp=""
 bexp=""
 bsexe=""
 sexe=""
 etat=""
 betat=""
 breg=""
 reg=""
 bsp=""
 sp=""
 gov=""
 bgov=""
   timg=""
   bnpm=''
   bemail=''
   bnumero=''
   constructor(private fb:FormBuilder,private userserv:UserService,private fileserv:FileService,private route:Router,private router:ActivatedRoute){
     this.formsignin=this.fb.group(
       {
         
         "num":["",Validators.required],
         "sp":["",[Validators.required]],
        
         "gov":["",[Validators.required]],
     
         "nom":["",[Validators.required]],
        
         "email":["",[Validators.required]],
   
       }
     )
     const userEmail = sessionStorage.getItem('email')!;
     if(userEmail!=undefined){
    this.userserv.getuserbyemail(userEmail).subscribe(
      res=>{
        this.emp=res
        
        this.formsignin.controls['nom'].setValue(this.emp.nom)
        this.formsignin.controls['email'].setValue(this.emp.email)
        this.formsignin.controls['gov'].setValue(this.emp.gouvernerat)
        this.formsignin.controls['num'].setValue(this.emp.num)
        this.formsignin.controls['sp'].setValue(this.emp.specialite)
        if(this.emp.fls!=undefined){
          if(this.emp.fls['image']!=undefined){
           this.url = '/var/www/html/uploads/'+this.emp.fls['image'];
          }
           }
     
    
      },(error) => {
        if (error.status === 403) {
          this.route.navigate(["/login"]);
        }
      }
    )
     }
   }
   ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    

  
    
   }
   onsubmit(){}
     selctimg(){
       Swal.fire({
         title: 'Modifier votre image',
         input: 'file',
       
       }).then(
         file=>{
     if(this.emp.fls['image']!=undefined){

this.userserv.updatefile(file.value,this.emp.id,'image').subscribe(
  res=>{

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Image modifié",
      showConfirmButton: false,
      timer: 1500
    });
    this.relod()
  }
)
     }else{
      this.userserv.addfile(file.value,this.emp.id,'image').subscribe(
        res=>{
      
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Image ajouté",
            showConfirmButton: false,
            timer: 1500
          });
          this.relod()
        },(error) => {
          if (error.status === 403) {
            this.route.navigate(["/login"]);
          }
        }
      )
     }
         }
       )
   }
   modifier(){
     if(this.formsignin.controls['gov'].errors?.['required']){
       this.bgov="border: red 2px solid;"
       this.gov="champ obligatoire"
     }
     else{
       this.bgov="border: green 2px solid;"
       this.gov=""
     }
     if(this.formsignin.controls['sp'].errors?.['required']){
       this.bsp="border: red 2px solid;"
       this.sp="champ obligatoire"
     }
     else{
       this.bsp="border: green 2px solid;"
       this.sp=""
     }
     if(this.formsignin.controls['email'].errors?.['required']){
       this.bemail="border: red 2px solid;"
       this.sp="champ obligatoire"
     }
     else{
       this.bemail="border: green 2px solid;"
       this.sp=""
     }
     if(this.formsignin.controls['nom'].errors?.['required']){
       this.bnpm="border: red 2px solid;"
       this.sp="champ obligatoire"
     }
     else{
       this.bnpm="border: green 2px solid;"
       this.sp=""
     }
     if(this.formsignin.controls['num'].errors?.['required'] && this.verifierChaine(this.formsignin.controls['num'].value)==false){
       this.bnumero="border: red 2px solid;"
       this.sp="champ obligatoire"
     }
     else{
       this.bnumero="border: green 2px solid;"
       this.sp=""
     }
     
     if(this.formsignin.valid && this.verifierChaine(this.formsignin.controls['num'].value)){
      
    this.emp.nom=this.formsignin.controls['nom'].value
       this.emp.specialite=this.formsignin.controls['sp'].value;
       this.emp.gouvernerat=this.formsignin.controls['gov'].value;
       this.emp.email=this.formsignin.controls['email'].value;
       this.userserv.updateuser(this.emp).subscribe(
        res=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Employeur modifié",
            showConfirmButton: false,
            timer: 1500
          });
          this.route.navigate(["profilemployeur"]);
        },(error) => {
          if (error.status === 403) {
            this.route.navigate(["/login"]);
          }
        }
       )
                }
             
       
     
   }
   annuler(){
    this.route.navigate(["profilemployeur"]);
   }
   verifierChaine(chaine:string) {
    const regex = /^\d{8}$/;
    return regex.test(chaine);
  }
 
  relod(){
    
    const currentUrl = this.route.url;

    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }


}
