import { Component } from '@angular/core';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
email:string=''
emp!:employee
pack!:any
duree!:any
  constructor(private userserv:UserService){
this.email=localStorage.getItem('email')!

  }
update(){
  this.pack=localStorage.getItem('pack')!
  this.duree=localStorage.getItem('duree')!
  this.emp.pack=this.pack
  this.emp.duree=this.duree


}
}
