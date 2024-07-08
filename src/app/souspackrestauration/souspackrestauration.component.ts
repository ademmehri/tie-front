import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-souspackrestauration',
  templateUrl: './souspackrestauration.component.html',
  styleUrls: ['./souspackrestauration.component.css']
})
export class SouspackrestaurationComponent implements OnInit {
email=''
constructor(private route:Router,private router:ActivatedRoute){}
  ngOnInit(): void {
    document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  }
acheter(ch:string){
    if(ch==='SUPPERIEUR'){

      localStorage.setItem("pack",'rest_supperieur');
      this.route.navigate(['/packsup'])
    }
    else if(ch==='RESTAURER'){
      localStorage.setItem("pack",'rest_restaurer');
      this.route.navigate(['/packsup'])
    }
    else if(ch==='SERVIR'){
      localStorage.setItem("pack",'rest_servir');
      this.route.navigate(['/packsup'])
    }
    else{
      localStorage.setItem("pack",'rest_gold');
      this.route.navigate(['/packsup'])
    }
  

  
  }
}
