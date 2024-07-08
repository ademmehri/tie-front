import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-souspack',
  templateUrl: './souspack.component.html',
  styleUrls: ['./souspack.component.css']
})
export class SouspackComponent implements OnInit {
  email=''
constructor(private route:Router,private router:ActivatedRoute){

}
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
acheter(ch:string){
this.email=sessionStorage.getItem('email')!
  if(ch==='SUPPERIEUR'){
  
    localStorage.setItem("pack",'superieur');
    this.route.navigate(['/packsup'])
  }
  else if(ch==='RESTAURER'){
    localStorage.setItem("pack",'restaurer');
    this.route.navigate(['/packsup'])
  }
  else if(ch==='SERVIR'){
    localStorage.setItem("pack",'servir');
    this.route.navigate(['/packsup'])
  }
  else{
    localStorage.setItem("pack",'gold');
    this.route.navigate(['/packsup'])
  }
}
}
