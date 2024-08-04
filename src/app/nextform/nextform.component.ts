import { Component, OnInit } from '@angular/core';
import { employee } from '../models/employee.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-nextform',
  templateUrl: './nextform.component.html',
  styleUrls: ['./nextform.component.css']
})
export class NextformComponent implements OnInit {
  days: number[] =  Array.from({length: 31}, (_, i) => i + 1);
  months: {name: string, value: number}[] = [
    {name: 'Janvier', value: 1},
    {name: 'Février', value: 2},
    {name: 'Mars', value: 3},
    {name: 'Avril', value: 4},
    {name: 'Mai', value: 5},
    {name: 'Juin', value: 6},
    {name: 'Juillet', value: 7},
    {name: 'Août', value: 8},
    {name: 'Septembre', value: 9},
    {name: 'Octobre', value: 10},
    {name: 'Novembre', value: 11},
    {name: 'Décembre', value: 12},
  ];
  currentYear=2024
  years: number[] = Array.from({length: 100}, (_, i) => this.currentYear - i);
  response!:any
  token=""
bdate=""
date=""
exp=""
bexp=""
bsexe=""
sexe=""
etat=""
betat=""
breg=""
reg=""
bsp=""
sp=""
gov=""
bgov=""
  timg=""
  showlist=false
d="";
  url="assets/uss.png";
spe=['Barman','Chef de projet événementiel','Responsable communication et événementiel','Réceptionniste','Chef-réceptionniste','Veilleur de nuit','Directeur d’hébergement','Directeur d’hôtel','Adjoint de direction en hôtellerie','Directeur financier d’un hôtel','Directeur de la restauration','Manager spécialisé dans le luxe','Spa manager','Femme de chambre et valet de chambre','Gouvernante','Lingère','Guest Relation Manager','Yield manager','Chef de cuisine','Chef de partie','Commis de cuisine','Chef cuisinier ou chef de production en restauration collective','Chef-gérant en restauration collective','Économe','Manager dans la restauration','Directeur en restauration rapide','Manager d’un restaurant rapide','Gérant','Chef d’équipe d’un restaurant rapide','Pizzaïolo','Pâtissier','Boucher','Boulanger','Poissonnier','Chocolatier-confiseur','Serveur de restaurant','Chef de rang','Maître d’hôtel','Garçon de café','Plongeur','Majordome (Butler)','portier','Crêpier']
  file!:File;
  cv!:File
 empl!:employee
num!:string
result!:employee
  formsignin!:FormGroup;
  input: string = '';
  emptyarray=['hello']
  listfinal=['']
  maxDate: Date;
  j=0
  m=0
  a=0
  wordCount: number = 0;
  maxLength: number = 10;
  wordsRemaining: number = 83;
  maxWords: number = 83;
  constructor(private fb:FormBuilder,private route:Router,private userserv:UserService,private fileserv:FileService,private router:ActivatedRoute){
    this.maxDate = new Date();
    this.formsignin=this.fb.group(
      {
        "j":["",Validators.required],
        "m":["",Validators.required],
        "a":["",Validators.required],
        "exp":["",[this.wordCountValidator.bind(this)]],
        "rad1":["",Validators.required],
        "rad2":["",Validators.required],
        "region":["",[Validators.required]],
        "sp":["",Validators.required],
        "gov":["",Validators.required],
        
      }
    )

    this.formsignin.get('exp')?.valueChanges.subscribe(value => {
      this.wordCount = this.countWords(value);
      this.wordsRemaining = this.maxWords - this.wordCount;
    });
  
  }
  countWords(text: string): number {
    if (!text) {
      return 0;
    }

    return text.trim().split(/\s+/).length;
  }

  wordCountValidator(control: any) {
    const text = control.value;
    if (text && text.length > this.maxLength) {
      return { 'maxLengthExceeded': true };
    }
    return null;
  }
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.empl=JSON.parse(localStorage.getItem("emp")!)

  }

  async onsubmit() {
    // Validation des champs
    if (this.formsignin.controls['region'].errors?.['required']) {
      this.breg = "border: red 2px solid;";
      this.reg = "champ obligatoire";
    } else {
      this.breg = "border: green 2px solid;";
      this.reg = "";
    }
  
    if (this.formsignin.controls['j'].invalid || this.formsignin.controls['m'].invalid || this.formsignin.controls['a'].invalid) {
      this.bdate = "border: red 2px solid;";
      this.date = "champ obligatoire";
    } else {
      this.bdate = "border: green 2px solid;";
      this.date = "";
    }
  
    if (this.url == "") {
      this.timg = "Choisie une image";
    } else {
      this.timg = "";
    }
  
    if (this.formsignin.controls['gov'].errors?.['required']) {
      this.bgov = "border: red 2px solid;";
      this.gov = "champ obligatoire";
    } else {
      this.bgov = "border: green 2px solid;";
      this.gov = "";
    }
  
    if (this.formsignin.controls['sp'].errors?.['required']) {
      this.bsp = "border: red 2px solid;";
      this.sp = "champ obligatoire";
    } else if (!this.spe.includes(this.formsignin.controls['sp'].value)) {
      this.sp = "Sélectionnez votre spécialité";
      this.bsp = "border: red 2px solid;";
    } else {
      this.bsp = "border: green 2px solid;";
      this.sp = "";
    }
  
    if (this.formsignin.controls['rad1'].errors?.['required']) {
      this.bsexe = "border: red 2px solid;";
      this.sexe = "champ obligatoire";
    } else {
      this.bsexe = "border: green 2px solid;";
      this.sexe = "";
    }
  
    if (this.formsignin.controls['rad2'].errors?.['required']) {
      this.betat = "border: red 2px solid;";
      this.etat = "champ obligatoire";
    } else {
      this.betat = "border: green 2px solid;";
      this.etat = "";
    }
  
    if (this.formsignin.valid) {
      this.empl.city = this.formsignin.controls['region'].value;
      this.empl.sexe = this.formsignin.controls['rad1'].value;
      this.empl.exp = this.formsignin.controls['exp'].value;
      this.empl.specialite = this.formsignin.controls['sp'].value;
      this.empl.gouvernerat = this.formsignin.controls['gov'].value;
      this.empl.date_nais = this.formsignin.controls['a'].value + '-' + this.formsignin.controls['m'].value + '-' + this.formsignin.controls['j'].value;
      this.empl.etat = this.formsignin.controls['rad2'].value;
  
      try {
        const emailExists = await this.userserv.existmail(this.empl.email).toPromise();
        if (!emailExists) {
          const verificationResponse = await this.userserv.verificationemail(this.empl.email).toPromise();
          this.response = verificationResponse;
          this.token = this.response.token;
  
          const { value: number } = await Swal.fire({
            title: 'Code de verification envoi par email',
            input: 'number',
            showCancelButton: true,
          });
  
          if (this.token == number) {
            const addEmployeeResponse = await this.userserv.addemployee(this.empl).toPromise();
            if (this.file !== undefined) {
              await this.userserv.addfile(this.file, addEmployeeResponse!.id,"image").toPromise();
            }
  
            if (this.cv !== undefined) {
              await this.userserv.addfile(this.cv, addEmployeeResponse!.id,'cv').toPromise();
            }
  
            if (this.cv == undefined && this.file == undefined) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Candidat enregistré",
                showConfirmButton: false,
                timer: 1500,
              });
              this.route.navigate(["login"]);
            }else{
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Candidat enregistré",
                showConfirmButton: false,
                timer: 1500,
              });
              this.route.navigate(["login"]);
            }
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
            text: 'Personne existe',
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue',
        });
      }
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
  
  onselectcv(e: any) {
    if (e.target.files) {
      const file = e.target.files[0];
      const maxSize = 1.2 * 1024 * 1024; // 1.2 Mo en octets
  
      // Vérification du type de fichier
      if (file.type !== 'application/pdf') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Le fichier doit être au format PDF',
        }).then(() => {
          // Réinitialiser l'input après l'affichage du message
          e.target.value = '';
        });
        return;
      }
  
      // Vérification de la taille du fichier
      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Le fichier PDF ne doit pas dépasser 1,2 Mo',
        }).then(() => {
          // Réinitialiser l'input après l'affichage du message
          e.target.value = '';
        });
        return;
      }
  
  
      var reader = new FileReader();
      reader.readAsDataURL(file);
      this.cv = file;
    }
  }
  
  onselecte(e:any){
    this.d=e.target.value;
  }
  onselectee(e:any){
    this.sp=e.target.value;
  }
  selectjours(e:any){
    this.d=e.target.value;
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
  onKeyUp(e:any): void {
    this.showlist=true

    let userdata=e.target.value
   if(e.target.value==''){
    this.showlist=false
   }
    if(userdata){
      this.emptyarray=this.spe.filter(
        (data)=>{
return data.toLocaleLowerCase().startsWith(userdata.toLocaleLowerCase());
        }
      );
      this.emptyarray=this.emptyarray.map(
  (data)=>{
    return data
  }
)
if(!this.emptyarray.length){
this.input=e.target.value
}
else{
  this.listfinal=this.emptyarray
  this.input=""
}

    }

  }
  clickli(e:any){
    this.formsignin.controls['sp'].setValue(e)
  this.showlist=false
  }
  validateDateInput(control: AbstractControl): { [key: string]: boolean } | null {
    const dateString = control.value;
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);

    // Vérification de la validité de l'année, du mois et du jour
    if (isNaN(year) || isNaN(month) || isNaN(day) || year < 1900 || year > 2024 || month < 1 || month > 12 || day < 1 || day > 31) {
        return { 'invalidDate': true };
    }

    return null; // Date valide
}


}
