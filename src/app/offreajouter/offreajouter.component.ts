import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filee } from '../models/filee.model';
import Swal from 'sweetalert2';
import { employee } from '../models/employee.model';
import { OffreService } from '../services/offre.service';
import { Offre } from '../models/listoffre.model';

@Component({
  selector: 'app-offreajouter',
  templateUrl: './offreajouter.component.html',
  styleUrls: ['./offreajouter.component.css']
})
export class OffreajouterComponent implements OnInit {
  offres!:any
  id!:bigint
  empr!:employee
  ofs!:Offre[]
constructor(private userserv:UserService,private offreserv:OffreService,private router:ActivatedRoute,private route:Router){
  const userEmail = sessionStorage.getItem('email')!;
  if(userEmail!=undefined){
 this.userserv.getuserbyemail(userEmail).subscribe(
   res=>{
     this.empr=res
    this.offreserv.getoffredeemployeur(this.empr.id).subscribe(
      res=>{
this.ofs=res
this.ofs.forEach(off => {
  // Filtrer les fichiers pour ne garder que ceux avec nomfichier === 'image'
  off.employee.files =  off.employee.files.filter(file => file.nomfichier === 'image');
});
      }
    )
   }
 )
  }


}
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
annuler(id:bigint){
  Swal.fire({
    title: "Est ce que vous voulez supprimer cette offre?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Oui",
    denyButtonText: `Non`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
 
     this.offreserv.deleteoffre(id).subscribe(
      res=>{
        window.location.reload();
      },(error) => {
        if (error.status === 403) {
          this.route.navigate(["login"]);
        }
      }
     )
     
    } else if (result.isDenied) {
      Swal.fire("Changement annuler", "", "info");
    }
  });
}
}
