import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { employee } from '../models/employee.model';

@Component({
  selector: 'app-propos',
  templateUrl: './propos.component.html',
  styleUrls: ['./propos.component.css']
})
export class ProposComponent implements OnInit{
user_connect!:employee
specialite!:string
  constructor(private router: Router,private userserv:UserService){
    const userEmail = sessionStorage.getItem('email');

  }
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  tests(){
    this.router.navigate(["/signup"])
  }
  test(){
    if(this.specialite=="Hotel"){
      this.router.navigate(["/souspackpayment"])
    }
    else if(this.specialite=="restaurant"){
      this.router.navigate(["/spackrest"])
    }
    else{
      this.router.navigate(["/signuppatron"])
    }
  }

}
