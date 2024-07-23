import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';


import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  dateexpiration!:Date
  id!:bigint
s=""
r=""
c=""
dur!:any
droitpayement!:boolean


ch!:string
resultat!:string
formsignin!:FormGroup;

 empr!:employee
 region=""
 test!:any
 employees!:employee[]
 etat=''
 hotelsup=["Directeur d’hôtel", "Directeur d'hebergement", 
 "Adjoint de directeur en hotellerie","Directeur de la restauration",
 "Directuer financier d'un hotel","Guest relation manager",
 "Manager dans la restauration","Spa manager","Yield manager"]
 hotelrest=["Chef de cuisine","Chef de partie",
 "Commis de cuisine","Chef-gérant en restauration collective", 
 "Cuisinier","Pizzaiolo",
 "Barman","Patissier",
 "Boucher","Boulanger","Poissonnier","Chocalatier-confisseur","Charcutier-traiteur","Econome","Gérant"]
 hotelserv=["Serveur de restaurant ","Chef de rang", 
 "Maitre d'hotel","Garçon de café",
 "Plongeur","Serveuse",
 "Majordome(Butler)","Bagagiste","Chasseur","liftier","Groom","Portier"]
 sup=["Directeur de la restauration",
 "Directeur financier d'un restaurant", 
 "Gérant","Econome",
 "Manager de restauration"]
 rest=["Chef de cuisine","Chef de partie",
 "Commis de cuisine", 
 "Cuisinier","Pizzaiolo",
 "Barman","Patissier",
 "Boucher","Boulanger","Poissonnier","Chocalatier-confisseur","Charcutier-traiteur","Econome","Gérant"]
 serv=["Serveur","Chef de rang",
 "Plongeur","Serveuse",
 "Portier"]
 hotelgold=["Directeur d’hôtel", "Directeur d'hebergement", 
 "Adjoint de directeur en hotellerie","Directeur de la restauration",
 "Directuer financier d'un hotel","Guest relation manager",
 "Manager dans la restauration","Spa manager","Yield manager","Chef de cuisine","Chef de partie",
 "Commis de cuisine","Chef-gérant en restauration collective", 
 "Cuisinier","Pizzaiolo",
 "Barman","Patissier",
 "Boucher","Boulanger","Poissonnier","Chocalatier-confisseur","Charcutier-traiteur","Econome","Gérant","Serveur de restaurant ","Chef de rang", 
 "Maitre d'hotel","Garçon de café",
 "Plongeur","Serveuse",
 "Majordome(Butler)","Bagagiste","Chasseur","liftier","Groom","Portier"]
 gold=["Directeur de la restauration",
 "Directeur financier d'un restaurant", 
 "Gérant","Econome",
 "Manager de restauration","Chef de cuisine","Chef de partie",
 "Commis de cuisine", 
 "Cuisinier","Pizzaiolo",
 "Barman","Patissier",
 "Boucher","Boulanger","Poissonnier","Chocalatier-confisseur","Charcutier-traiteur","Econome","Gérant","Serveur","Chef de rang",
 "Plongeur","Serveuse",
 "Portier"]
 pageSize: string|number|undefined;
p: string|number|undefined;

constructor(private userserv:UserService,private router:ActivatedRoute,private fb:FormBuilder,private route:Router){

  

const userEmail = sessionStorage.getItem('email')!;
if(userEmail!=undefined){
this.userserv.getuserbyemail(userEmail).subscribe(
 res=>{
   this.empr=res
   this.dur=this.empr.duree
   if(this.dur=='set_jours'){
    Swal.fire({
      title: "Offre spéciale!",
      color:"#2772D6",
      text: "Cette offre est valable pendant 7 jours. Achetez maintenant!",
      imageUrl: "assets/ez.webp",
      imageWidth: 400,
      imageHeight: 250,
      imageAlt: "Custom image"
    });
   }
  })}


}


  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  this.verfieracces();
  }
  onselect(e:any){
    this.s=e.target.value;
  }
  onselectetat(e:any){
    this.etat=e.target.value;
  }
  onselectreg(e:any){
   
    this.r=e.target.value;
   
  }
  onselectregion(e:any){
   
    this.region=e.target.value;
   
  }
  onselectsexe(e:any){
    this.c=e.target.value;

  }
  consulter(idemp:number){
 
    this.route.navigate(["petitcv/"+this.id+"/"+idemp]);
  }
  rechercher(){
   this.employees= this.employees.filter(employee => {
      // Vérifier si les critères correspondent aux propriétés de l'employé
      return employee.etat === this.etat
          && employee.gouvernerat === this.r
          && employee.specialite === this.s
          && employee.sexe === this.c;
  });
  }

  payement(){
    //test de payment 7jours
    
    this.dur=this.empr.duree
  
    if(this.dur=='set_jours'){
   
      const dateActuelle: Date = new Date();
      const dateFinPack: Date = new Date(this.empr.d_inscrit);
      const d_p:number= 1;
      dateFinPack.setDate(dateFinPack.getDate()+7);
   
      if(dateActuelle >= dateFinPack){
       if(this.empr.specialite=='Hotel'){
        this.route.navigate(["/souspackpayment"])
        Swal.fire("Votre abonmment a été expiré !! Achetez de nouveau");
       }
        else{
          this.route.navigate(["/spackrest"])
          Swal.fire("Votre abonmment a été expiré !! Achetez de nouveau");
        }
      }
    }
    //test de payment 6mois
    this.dur=this.empr.duree
    if(this.dur=='six_mois'){
   
      const dateActuelle: Date = new Date();
      const dateFinPack: Date = new Date(this.empr.d_inscrit);
      
      dateFinPack.setMonth(dateFinPack.getMonth() + 6);
   
     
      if(dateActuelle >= dateFinPack){
        if(this.empr.specialite=='Hotel'){
          this.route.navigate(["/souspackpayment"])
          Swal.fire("Votre abonmment a été expiré !! Achetez de nouveau");
         }
          else{
            this.route.navigate(["/spackrest"])
        
          }
      }
    }
    //test de payment 1ans
    this.dur=this.empr.duree
    if(this.dur=='un_ans'){
     
      const dateActuelle: Date = new Date();
      const dateFinPack: Date = new Date(this.empr.d_inscrit);
      
      dateFinPack.setFullYear(dateFinPack.getFullYear() + 1);
      if(dateActuelle >= dateFinPack){
        if(this.empr.specialite=='Hotel'){
          this.route.navigate(["/souspackpayment"])
          Swal.fire("Votre abonmment a été expiré !! Achetez de nouveau");
         }
          else{
            this.route.navigate(["/spackrest"])
         
          }
      }
    }
  }

totalItems!:number
 verfieracces(){
  this.dateexpiration=new Date()
  const userEmail = sessionStorage.getItem('email')!;
  if(userEmail!=undefined){
 this.userserv.getuserbyemail(userEmail).subscribe(
   res=>{
     this.empr=res
    /* this.userserv.getemployees().subscribe(
      res=>{
        this.employees=res
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });

      }
     )
  */
     this.test=this.empr.pack
    this.payement();
     if(this.test=="superieur" && this.empr.specialite=="Hotel"){
       this.userserv.getemployeeSuperieur().subscribe(
         res=>{
         this.employees=res
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });
    
       })
     }
     else if(this.test=="restaurer" && this.empr.specialite=="Hotel"){
       this.userserv.getemployeeRestaurer().subscribe(
         res=>{
           this.employees=res
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });
       
         }
       )
     }
     else if(this.test=="servir"  && this.empr.specialite=="Hotel"){
       this.userserv.getemployeeServir().subscribe(
         res=>{
             this.employees=res
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });
         
         }
       )
     }
     
     else if(this.test=="gold"  && this.empr.specialite=="Hotel"){
  
       this.userserv. getemployeeGoldh().subscribe(
         res=>{
            this.employees=res
            console.log(this.employees)
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });
       
         }
       )
     }
     else if(this.test=="gold"  && this.empr.specialite!="Hotel"){
       this.userserv.getemployeeGoldr().subscribe(
         res=>{
           this.employees=res
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });
     
         }
       )
     }
     else if(this.test=="superieur"  && this.empr.specialite!="Hotel"){
       this.userserv.getemployeeSuperieur_res().subscribe(
         res=>{
            this.employees=res
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });
        
         }
       )
     }
     else if(this.test=="restaurer"  && this.empr.specialite!="Hotel"){
       this.userserv.getemployeeServir_res().subscribe(
         res=>{
            this.employees=res
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });
        
         }
       )
     }
     else if(this.test=="servir"  && this.empr.specialite!="Hotel"){
       this.userserv.getemployeeServir_res().subscribe(
         res=>{
            this.employees=res
        this.employees= this.employees.filter(employee => {
          // Vérifie si l'employé a au moins un rôle avec le nom "USER"
          return employee.roles.some(role => role.role === 'USER');
      });
        this.employees.forEach(employee => {
          // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
          employee.files = employee.files.filter(file => file.nomfichier === 'image');
      });
   
         }
       )
     }
  
   }
 )
  }
 }
 naviguer(id:bigint){
  sessionStorage.setItem('userId',id.toString());
  this.route.navigate(['/petitcv'])
 }
}
