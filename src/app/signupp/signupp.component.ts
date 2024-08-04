import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ActivatedRoute, Router } from '@angular/router';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-signupp',
  templateUrl: './signupp.component.html',
  styleUrls: ['./signupp.component.css']
})
export class SignuppComponent {
 nom=""
 bnom=""
 numero=""
 bnumero=""
 mp=""
 bmp=""
 email=""
 bemail=""
 bgov=""
 gov=""
 bsp=""
 sp=""
  s=""
  timg=""
  file!:File
  cin!:string
  num!:string
  result!:employee
  url="assets/uss.png"
  formsignin!:FormGroup;
  response!:any
  token=""
  constructor(private fb:FormBuilder,private userserv:UserService,private fileserv:FileService,private route:Router,private router:ActivatedRoute){
    this.formsignin=this.fb.group(
      {
        "nom":["",Validators.required],
        "numero":["",Validators.required],
         "email":["",[Validators.required,Validators.email]],
        "mp":["",Validators.required],
        "gov":["",Validators.required],
        "sp":["",Validators.required],
    
        
      }
    )
  }
  ngOnInit(): void {
   
  }
  async onsubmit() {
    this.validateForm();

    if (this.formsignin.valid && this.url !== "" && this.verifierNumero(this.formsignin.controls['numero'].value) && this.verifierMotDePasse(this.formsignin.controls['mp'].value)) {
      let empl = {
        nom: this.formsignin.controls['nom'].value.replace(/ /g, '').toLowerCase(),
        role: "entreprise",
        email: this.formsignin.controls['email'].value.trim(),
        password: this.formsignin.controls['mp'].value.trim(),
        gouvernerat: this.formsignin.controls['gov'].value,
        num: this.formsignin.controls['numero'].value,
        specialite: this.formsignin.controls['sp'].value,
        pack: 3,
        duree: 2
      } as employee;

      try {
        const emailExists = await this.userserv.existmail(empl.email).toPromise();
        if (!emailExists) {
          const verificationResponse = await this.userserv.verificationemail(empl.email).toPromise();
          this.response = verificationResponse;
          this.token = this.response.token;

          Swal.fire("Code Verification envoyé par email");
          const { value: number } = await Swal.fire({
            title: 'Code de verification envoyé par email',
            input: 'number'
          });

          if (this.token === number) {
            const addEntrepriseResponse = await this.userserv.addentreprise(empl).toPromise();
            localStorage.setItem('email', empl.email);

            if (this.file !== undefined) {
              await this.userserv.addfile(this.file, addEntrepriseResponse!.id,'image').toPromise();
            }

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Employeur enregistré",
              showConfirmButton: false,
              timer: 1500
            });
            this.route.navigate(['/login']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Code incorrect',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Personne existe déjà',
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'employeur :", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Erreur lors de l'enregistrement de l'employeur",
          showConfirmButton: true,
          timer: 3000
        });
      }
    }
  }
  validateForm() {
    // Réutilisez la logique de validation existante
    if (this.formsignin.controls['nom'].errors?.['required']) {
      this.bnom = "border: red 2px solid;";
      this.nom = "champ invalide";
    } else {
      this.bnom = "border: green 2px solid;";
      this.nom = "";
    }

    if (this.formsignin.controls['sp'].errors?.['required']) {
      this.bsp = "border: red 2px solid;";
      this.sp = "champ invalide";
    } else {
      this.bsp = "border: green 2px solid;";
      this.sp = "";
    }

    if (this.formsignin.controls['gov'].errors?.['required']) {
      this.bgov = "border: red 2px solid;";
      this.gov = "champ invalide";
    } else {
      this.bgov = "border: green 2px solid;";
      this.gov = "";
    }

    if (this.verifierNumero(this.formsignin.controls['numero'].value)) {
      this.bnumero = "border: green 2px solid;";
      this.numero = "";
    } else {
      this.bnumero = "border: red 2px solid;";
      this.numero = "champ invalide";
    }

    this.formsignin.controls['email'].setValue(this.formsignin.controls['email'].value.replace(/\s+/g, ''));
    if (this.formsignin.controls['email'].errors?.['email'] || this.formsignin.controls['email'].errors?.['required']) {
      this.bemail = "border: red 2px solid;";
      this.email = "champ invalide";
    } else {
      this.bemail = "border: green 2px solid;";
      this.email = "";
    }

    if (this.verifierMotDePasse(this.formsignin.controls['mp'].value)) {
      this.bmp = "border: green 2px solid;";
      this.mp = "";
    } else {
      this.bmp = "border: red 2px solid;";
      this.mp = "Le champ doit contenir des chiffres, des lettres minuscules et majuscules, et doit comporter au moins 8 caractères";
    }

    if (this.url === "") {
      this.timg = "Choisissez une image";
    } else {
      this.timg = "";
    }
  }

  onselectfile(e: any) {
    if (e.target.files) {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2 Mo en octets
  
      /* if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'L\'image ne doit pas dépasser 2 Mo',
        });
        return;
      }*/
  
      var reader = new FileReader();
      reader.readAsDataURL(file);
      this.file = file;
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  
      onselect(e:any){
   
      this.s=e.target.value;
     
    }
    onselecte(e:any){
    
      this.sp=e.target.value;
      
    }
  
  
    verifierNom(nom: string): boolean {
      // Vérifier la longueur minimale
      if (nom.length < 4) {
          return false;
      }
  
      // Vérifier s'il n'y a pas de chiffres dans le nom
      if (/\d/.test(nom)) {
          return false;
      }
  
      // Si toutes les conditions sont remplies, le nom est valide
      return true;
  }
  
  verifierNumero(champ: string): boolean {
    champ = champ.replace(/\s+/g, '');
    // Expression régulière pour vérifier si le champ contient exactement 8 chiffres
    const regex = /^\d{8}$/;
  
    // Teste si le champ correspond à l'expression régulière
    return regex.test(champ);
  }
 verifierMotDePasse(motDePasse: string): boolean {
    // Vérifier la longueur minimale
    if (motDePasse.length < 8) {
      return false;
    }
  
    // Vérifier la présence d'au moins un chiffre
    const aUnChiffre = /\d/.test(motDePasse);
  
    // Vérifier la présence d'au moins une lettre majuscule
    const aUneMajuscule = /[A-Z]/.test(motDePasse);
  
    // Vérifier la présence d'au moins une lettre minuscule
    const aUneMinuscule = /[a-z]/.test(motDePasse);
  
    // Retourner true si toutes les conditions sont remplies, sinon false
    return aUnChiffre && aUneMajuscule && aUneMinuscule;
  }


}
