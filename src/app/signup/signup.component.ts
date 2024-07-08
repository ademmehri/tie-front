import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
nom=""
bnom=""
email=""
bemail=""
numero=""
bnumero=""
password=""
bpassword=""
  s=""
  num=""
 mp!:string
  file!:File
  cin!:string
  result!:employee
  formsignin!:FormGroup;
JSON: any;
numr=''
  constructor(private fb:FormBuilder,private fileserv:FileService,private route:Router,private router:ActivatedRoute){
    this.formsignin=this.fb.group(
      {
        "nom":["",Validators.required],
         "email":["",[Validators.required,Validators.email]],
         "numero":["",Validators.required],
        "password":["",[Validators.required]],
        
      }
    )
  }
  ngOnInit(): void {
   
  }
  onsubmit(){
  
    if(this.verifierNom(this.formsignin.controls['nom'].value)){
      this.bnom="border: green 2px solid;"
      this.nom=""
    }
    else{
      this.bnom="border: red 2px solid;"
      this.nom="champ invalide"
    }
   
    if(this.verifierMotDePasse(this.formsignin.controls['password'].value)){
      this.bpassword="border: green 2px solid;"
  this.password=""
   }
   else{
    this.bpassword="border: red 2px solid;"
    this.password="Le champ doit contenir des chiffres, des lettres minuscules et majuscules,  et être d'au moins 8 caractères de long"
   }
   this.formsignin.controls['email'].setValue(this.formsignin.controls['email'].value.replace(/\s+/g, ''))
    if(this.formsignin.controls['email'].errors?.['email'] || this.formsignin.controls['email'].errors?.['required']){
      this.bemail="border: red 2px solid;"
      this.email="champ invalide"
    }
    else{
      this.bemail="border: green 2px solid;"
      this.email=""
    }
  
    if(this.verifierNumero(this.formsignin.controls['numero'].value)){
      this.bnumero="border: green 2px solid;"
      this.numero=""
    }
    else{
      this.bnumero="border: red 2px solid;"
      this.numero="champ obligatoire"
    }

if(this.formsignin.valid && this.verifierNom(this.formsignin.controls['nom'].value) && this.verifierMotDePasse(this.formsignin.controls['password'].value) && this.verifierNumero(this.formsignin.controls['numero'].value)){
  let emp:employee=new employee();
  emp.num=this.formsignin.controls['numero'].value;
  emp.nom=this.formsignin.controls['nom'].value;
  emp.email=this.formsignin.controls['email'].value.trim();
emp.password=this.formsignin.controls['password'].value.trim();

  localStorage.setItem("emp",JSON.stringify(emp))
      this.route.navigate(['nextform']);
}


  }
  onselectfile(e: any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.file=e.target.files[0]
      reader.onload=(event:any)=>{
        //this.url=event.target.result;
      }
    }
  
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
  onselect(e:any){
   
    this.s=e.target.value;

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
  verifierNumero(champ: string): boolean {
    champ = champ.replace(/\s+/g, '');
    // Expression régulière pour vérifier si le champ contient exactement 8 chiffres
    const regex = /^\d{8}$/;
  
    // Teste si le champ correspond à l'expression régulière
    return regex.test(champ);
  }

}
