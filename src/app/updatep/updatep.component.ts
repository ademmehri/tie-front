import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filee } from '../models/filee.model';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { FileService } from '../services/file.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-updatep',
  templateUrl: './updatep.component.html',
  styleUrls: ['./updatep.component.css']
})
export class UpdatepComponent implements OnInit {
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
  filee!:filee
 mp!:string
  file!:File
  spe=['Barman','Chef de projet événementiel','Responsable communication et événementiel','Réceptionniste','Chef-réceptionniste','Veilleur de nuit','Directeur d’hébergement','Directeur d’hôtel','Adjoint de direction en hôtellerie','Directeur financier d’un hôtel','Directeur de la restauration','Manager spécialisé dans le luxe','Spa manager','Femme de chambre et valet de chambre','Gouvernante','Lingère','Guest Relation Manager','Yield manager','Chef de cuisine','Chef de partie','Commis de cuisine','Chef cuisinier ou chef de production en restauration collective','Chef-gérant en restauration collective','Économe','Manager dans la restauration','Directeur en restauration rapide','Manager d’un restaurant rapide','Gérant','Chef d’équipe d’un restaurant rapide','Pizzaïolo','Pâtissier','Boucher','Boulanger','Poissonnier','Chocolatier-confiseur','Serveur de restaurant','Chef de rang','Maître d’hôtel','Garçon de café','Plongeur','Majordome (Butler)','portier','Crêpier']
  input: string = '';
  emptyarray=['hello']
  listfinal=['']
  result!:employee
 url='assets/par2.png'
id!:bigint
  emp!:employee
  formsignin!:FormGroup;
cv!:filee
ncv!:File
  afficherTexte!:boolean
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
  bnpm=''
  bemail=''
  bnumero=''
  constructor(private fb:FormBuilder, private fileserv:FileService,private userserv:UserService,private route:Router,private router:ActivatedRoute){
    this.formsignin=this.fb.group(
      {
        
        "num":["",Validators.required],
        "sp":["",[Validators.required]],
        "exp":[""],
        "gov":["",[Validators.required]],
        "city":["",[Validators.required]],
        "nom":["",[Validators.required]],
        "j":["",[Validators.required]],
        "m":["",[Validators.required]],
        "a":["",[Validators.required]],
        "email":["",[Validators.required]],
        "rad":["",[Validators.required]],
        "rad2":["",[Validators.required]],
  
      }
    )
   
  }
  async ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const userEmail = sessionStorage.getItem('email')!;
    
    if (userEmail) {
      try {
        const emp = await this.userserv.getuserbyemail(userEmail).toPromise();
        
        if (emp) {  // Vérification que emp n'est pas undefined
          this.emp = emp;
          
          this.formsignin.controls['num'].setValue(this.emp.num);
          this.formsignin.controls['nom'].setValue(this.emp.nom);
          this.formsignin.controls['email'].setValue(this.emp.email);
          this.formsignin.controls['rad'].setValue(this.emp.sexe);
          this.formsignin.controls['rad2'].setValue(this.emp.etat);
          this.formsignin.controls['sp'].setValue(this.emp.specialite);
          this.formsignin.controls['exp'].setValue(this.emp.exp);
          this.formsignin.controls['gov'].setValue(this.emp.gouvernerat);
          this.formsignin.controls['city'].setValue(this.emp.city);
  
          const dateParts = this.emp.date_nais.split('-');
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10);
          const day = parseInt(dateParts[2], 10);
          this.formsignin.controls['a'].setValue(year);
          this.formsignin.controls['m'].setValue(month);
          this.formsignin.controls['j'].setValue(day);
  
          if (this.emp.files) {
            this.filee = this.emp.files.find(file => file.nomfichier === 'image')!;
            this.cv = this.emp.files.find(file => file.nomfichier === 'cv')!;
            if (this.filee) {
              this.url = 'data:' + this.filee.typefile + ';base64,' + this.filee.taillefile;
            }
          }
        } else {
          this.route.navigate(["/login"]);
        }
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.route.navigate(["/login"]);
        } else {
          this.route.navigate(["/login"]);
        }
      }
    }
  }
  
  

  onselectfile(e: any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.file=e.target.files[0]
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  
  }

    onselectcv(e: any){
      if(e.target.files){
        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        this.ncv=e.target.files[0];
        
      
      }
    
    }

    onKeyUp(e:any): void {
     
      let userdata=e.target.value
     
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
    }
  
    async selectimg() {
      const { value: file } = await Swal.fire({
        title: 'Modifier votre image',
        input: 'file',
      });
    
      if (file) {
        const maxSize = 2 * 1024 * 1024; // 2 Mo
        if (file.size > maxSize) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La taille de l\'image ne doit pas dépasser 2 Mo.',
          });
          return;
        }
    
        try {
          if (this.filee != undefined) {
            const updatedFile = await this.fileserv.updatefile(file, this.filee.idfile).toPromise();
            this.url = 'data:' + updatedFile!.typefile + ';base64,' + updatedFile!.taillefile;
            this.relod();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Image modifiée",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            const addedFile = await this.fileserv.addimage(file, this.emp.id).toPromise();
            this.relod();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Image ajoutée",
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No file selected',
          text: 'Please select a file to upload.',
        });
      }
    }
    
    
    async modifier() {
      try {
        // Validation des champs du formulaire
        if (this.formsignin.controls['city'].errors?.['required']) {
          this.breg = "border: red 2px solid;";
          this.reg = "champ obligatoire";
        } else {
          this.breg = "border: green 2px solid;";
          this.reg = "";
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
        } else {
          this.bsp = "border: green 2px solid;";
          this.sp = "";
        }
    
        if (this.formsignin.controls['email'].errors?.['required']) {
          this.bemail = "border: red 2px solid;";
          this.sp = "champ obligatoire";
        } else {
          this.bemail = "border: green 2px solid;";
          this.sp = "";
        }
    
        if (this.formsignin.controls['nom'].errors?.['required']) {
          this.bnpm = "border: red 2px solid;";
          this.sp = "champ obligatoire";
        } else {
          this.bnpm = "border: green 2px solid;";
          this.sp = "";
        }
    
        if (this.formsignin.controls['num'].errors?.['required']) {
          this.bnumero = "border: red 2px solid;";
          this.sp = "champ obligatoire";
        } else {
          this.bnumero = "border: green 2px solid;";
          this.sp = "";
        }
    
        if (this.formsignin.controls['j'].invalid || this.formsignin.controls['m'].invalid || this.formsignin.controls['a'].invalid) {
          this.bdate = "border: red 2px solid;";
          this.date = "champ obligatoire";
        } else {
          this.bdate = "border: green 2px solid;";
          this.date = "";
        }
    
        // Si le formulaire est valide
        if (this.formsignin.valid) {
          // Mise à jour des propriétés de l'objet `emp`
          this.emp.city = this.formsignin.controls['city'].value;
          this.emp.sexe = this.formsignin.controls['rad'].value;
          this.emp.exp = this.formsignin.controls['exp'].value;
          this.emp.specialite = this.formsignin.controls['sp'].value;
          this.emp.gouvernerat = this.formsignin.controls['gov'].value;
          this.emp.date_nais = `${this.formsignin.controls['a'].value}-${this.formsignin.controls['m'].value}-${this.formsignin.controls['j'].value}`;
          this.emp.etat = this.formsignin.controls['rad2'].value;
          this.emp.num = this.formsignin.controls['num'].value;
          this.emp.nom = this.formsignin.controls['nom'].value;
          this.emp.email = this.formsignin.controls['email'].value.trim();
          console.log(this.emp);
    
          // Appel au service pour mettre à jour l'utilisateur
          await this.userserv.updateuser(this.emp).toPromise();
    
          if (this.cv != undefined) {
            if (this.ncv != undefined) {
              // Mise à jour du CV
              await this.fileserv.updatefile(this.ncv, this.cv.idfile).toPromise();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Candidat Modifié",
                showConfirmButton: false,
                timer: 1500
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Candidat Modifié",
                showConfirmButton: false,
                timer: 1500
              });
            }
          } else {
            if (this.ncv != undefined) {
              // Ajout du CV
              await this.fileserv.addcv(this.ncv, this.emp.id).toPromise();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Candidat Modifié",
                showConfirmButton: false,
                timer: 1500
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Candidat Modifié",
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
          this.route.navigate(["profilemployee"]);
        }
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.route.navigate(["/login"]);
        } else {
          this.route.navigate(["/login"]);
        }
      }
    }
    
  annuler(){
    this.route.navigate(["profilemployee"]);
  }
  relod(){
    const currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

}
