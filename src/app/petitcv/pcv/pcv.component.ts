import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { filee } from 'src/app/models/filee.model';
import { OffreService } from 'src/app/services/offre.service';


import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pcv',
  templateUrl: './pcv.component.html',
  styleUrls: ['./pcv.component.css']
})
export class PcvComponent implements OnInit {
  idempr!:bigint;
  idemp!:bigint;
emp!:employee
cv!:filee
empr!:employee
file!:filee
url='assets/par2.png'
desc!:String
formsignin!:FormGroup;
result1!:string
aff=false
  constructor(private  router:ActivatedRoute,private userserv:UserService,private offreserv:OffreService,private fb:FormBuilder,private route:Router){
    this.formsignin=this.fb.group(
      {
        "offre":["",Validators.required],
        
      }
    )
  
  }
  async ngOnInit(): Promise<void> {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const userEmail = sessionStorage.getItem('email')!;
    this.idemp = JSON.parse(sessionStorage.getItem('userId')!);
  
    try {
      if (userEmail !== undefined) {
        const userResult = await this.userserv.getuserbyemail(userEmail).toPromise();
        if (userResult !== undefined) {
          this.empr = userResult;
        } else {
          this.route.navigate(['/login']);
        }
      }
  
      const empResult = await this.userserv.getuserbyid(this.idemp).toPromise();
      if (empResult !== undefined) {
        this.emp = empResult;
        if (this.emp.fls !== undefined) {
          if (this.emp.fls['image'] !== undefined) {
            this.url = 'uploads/' + this.emp.fls['image'];
          }
          if (this.emp.fls['cv'] !== undefined) {
            this.aff = true;
          }
        }
      } else {
        this.route.navigate(['/login']);
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        this.route.navigate(['login']);
      } else {
        this.route.navigate(['/login']);
      }
    }
  }
  
  async onsubmit(): Promise<void> {
    // Vérification des erreurs dans le formulaire
    if (this.formsignin.controls['offre'].errors?.['required']) {
      this.result1 = "S'il vous plaît, saisissez votre offre !";
    } else {
      this.result1 = "";
    }
  
    // Si le formulaire est valide
    if (this.formsignin.valid) {
      try {
        // Appel au service pour ajouter l'offre
        await this.offreserv.addoffre(this.idemp, this.empr.id, this.formsignin.controls['offre'].value).toPromise();
        
        // Affichage de l'alerte de succès
        await Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Offre enregistrée',
          showConfirmButton: false,
          timer: 1500
        });
      
          this.route.navigate(['pagepatron']);
       
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.route.navigate(['login']);
        } else {
          this.route.navigate(['/login']);
        }
      }
    }
  }
  
  annuler(){
    this.route.navigate(["profilemployee"]);
  }
 /* showcv(){
    if (typeof this.cv.taillefile === 'string') {
      // Supposons que img.image contient le contenu base64 du PDF
      const base64PDF = this.cv.taillefile;
  
      // Convertir le base64 en un Blob
      const binaryString = window.atob(base64PDF);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
  
      // Créer une URL Blob
      const url = URL.createObjectURL(blob);
  
      // Ouvrir cette URL dans un nouvel onglet
      window.open(url, '_blank');
  } 
  }*/

}
