import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { filee } from 'src/app/models/filee.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patronprofil',
  templateUrl: './patronprofil.component.html',
  styleUrls: ['./patronprofil.component.css']
})
export class PatronprofilComponent implements OnInit {
  id!:bigint;
  emp!:employee
  file!:filee
  url!:string
  cin!:string
  constructor(private router:ActivatedRoute,private userservice:UserService,private route:Router){
    this.router.params.subscribe(
      (param)=>{
        this.id=param['id']
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
