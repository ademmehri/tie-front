import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-packsup',
  templateUrl: './packsup.component.html',
  styleUrls: ['./packsup.component.css']
})
export class PacksupComponent implements OnInit{
  pac=''
  email=''
constructor(private route:Router){
  this.pac=localStorage.getItem('pack')!
  localStorage.clear()
}
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


acheter(ch:string,p:string){
  this.email=sessionStorage.getItem('email')!
  if(ch==='sixmois'){
    localStorage.setItem('duree','six_mois')
    localStorage.setItem('pack',p)
  }
  else{
    localStorage.setItem('duree','un_ans')
    localStorage.setItem('pack',p)
  }
  if(this.email!=undefined){
    this.route.navigate(['/test'])
  }else{
    localStorage.setItem('redirectUrl','true')
    this.route.navigate(['login'])
  }
 
  
}
}
