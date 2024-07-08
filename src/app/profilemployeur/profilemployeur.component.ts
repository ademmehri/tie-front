import { Component, OnInit } from '@angular/core';
import { employee } from '../models/employee.model';
import { filee } from '../models/filee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profilemployeur',
  templateUrl: './profilemployeur.component.html',
  styleUrls: ['./profilemployeur.component.css']
})
export class ProfilemployeurComponent implements OnInit {
  id!:bigint;
emp!:employee
file!:filee
url='assets/par2.png'
$element:any
cv!:filee
bcolor=""
  constructor(private router:ActivatedRoute,private userserv:UserService,private route:Router){
    const userEmail = sessionStorage.getItem('email')!;
    if(userEmail!=undefined){
   this.userserv.getuserbyemail(userEmail).subscribe(
     res=>{
       this.emp=res
    if(this.emp.files!=undefined){
     this.file=this.emp.files.find(file => file.nomfichier === 'image')!;
   if(this.file!=undefined){
     this.url='assets/'+this.file.titlefile
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
}
