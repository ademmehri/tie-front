import { HttpErrorResponse } from '@angular/common/http';
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
aff=false
  constructor(private router:ActivatedRoute,private offreserv:OffreService,private userserv:UserService,private route:Router){

  }

  async ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    localStorage.clear();
    const userEmail = sessionStorage.getItem('email');
    if (userEmail) {
      try {
        const empResult = await this.userserv.getuserbyemail(userEmail).toPromise();
        if (empResult) {
          this.emp = empResult;
          
          if(this.emp.fls!=undefined){
            if(this.emp.fls['image']!=undefined){
             this.url = 'uploads/'+this.emp.fls['image'];
            }
            if(this.emp.fls['cv']!=undefined){
             this.aff=true
             }
             }
  
          try {
            const ofsResult = await this.offreserv.getoffredeemployee(this.emp.id).toPromise();
            if (ofsResult) {
              this.ofs = ofsResult;
              this.nombreOffres = this.ofs.length;
            }
          } catch (error) {
            if (error instanceof HttpErrorResponse && error.status === 403) {
              this.route.navigate(['/login']);
            }
          }
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.route.navigate(['/login']);
        }
      }
    }
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
