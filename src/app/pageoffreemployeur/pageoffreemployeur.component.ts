import { Component, OnInit } from '@angular/core';
import { employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { filee } from '../models/filee.model';
import { OffreService } from '../services/offre.service';
import { Offre } from '../models/listoffre.model';

@Component({
  selector: 'app-pageoffreemployeur',
  templateUrl: './pageoffreemployeur.component.html',
  styleUrls: ['./pageoffreemployeur.component.css']
})
export class PageoffreemployeurComponent implements OnInit {
  id!:bigint;
  emp!:employee
  file!:filee
  cv!:filee
  url='assets/par2.png'
  cin!:string
  desc=''
  idoff!:bigint
  off!:Offre
  constructor(private router:ActivatedRoute,private userservice:UserService,private offreserv:OffreService,private route:Router){
  this.idoff=JSON.parse(sessionStorage.getItem('idoffre')!)
  this.offreserv.getoffre(this.idoff).subscribe(
    res=>{
this.off=res
if(this.off.employeur.files!=undefined){
  this.file=this.off.employeur.files.find(file => file.nomfichier === 'image')!;
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
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;




  }
  logout(){
    this.userservice.logout();
    this.route.navigate(["pageprincipale"]);
  }
}
