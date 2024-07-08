import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { filee } from 'src/app/models/filee.model';
import { Offre } from 'src/app/models/listoffre.model';
import { OffreService } from 'src/app/services/offre.service';


import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  isDropdownOpen: boolean = false;
previousListLength: number = 0;
ofs!:Offre[]

  id!:bigint;
emp!:employee
file!:filee
url='assets/par2.png'
cin!:string
nombreOffres!: number 
empr!:employee;
$element:any
cv!:filee
bcolor=""

  constructor(private router:ActivatedRoute,private offreserv:OffreService,private userserv:UserService,private route:Router){
    const userEmail = sessionStorage.getItem('email')!;
 if(userEmail!=undefined){
this.userserv.getuserbyemail(userEmail).subscribe(
  res=>{
    this.emp=res
   
 if(this.emp.files!=undefined){
  this.file=this.emp.files.find(file => file.nomfichier === 'image')!;
  this.cv=this.emp.files.find(file => file.nomfichier === 'cv')!;
if(this.file!=undefined){
  this.url='assets/'+this.file.titlefile
}
 }
 this.offreserv.getoffredeemployee(this.emp.id).subscribe(
  res=>{
this.ofs=res
if(this.ofs!=undefined){
  this.nombreOffres= this.ofs.length
}
  },(error) => {
    if (error.status === 403) {
      this.route.navigate(["/login"]);
    }
  }
 )
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
    localStorage.clear();
  }
  logout(){
    
   this.userserv.logout();
    this.route.navigate(["pageprincipale"]);
  }
 // this.route.navigate(["pageprincipale"]);
  consult(id:number){
    this.route.navigate(["pageoffreemployeur/"+id]);
  }
scroll(){
  window.scrollTo(0, document.body.scrollHeight);
}
toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  if (!this.isDropdownOpen) {
  
    this.nombreOffres = 0;
  }
}
navigate(id:bigint){
 sessionStorage.setItem('idoffre',id.toString())
  this.route.navigate(["pageoffreemployeur"]);
}

}
