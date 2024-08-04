import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { filee } from 'src/app/models/filee.model';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  bgcol=""
currentUrl=""
showMenu = false;
showtarif=false
role=''
file!:filee

url='assets/par2.png'
user_connect!:employee
  constructor(private router: Router,private userserv:UserService,private fileserv:FileService){
    const userEmail = sessionStorage.getItem('email')!;
 if(userEmail!=undefined){
this.userserv.getuserbyemail(userEmail).subscribe(
  res=>{
    this.user_connect=res
    this.role=this.user_connect.roles[0].role
    if(this.user_connect.fls!=undefined){
      if(this.user_connect.fls['image']!=undefined){
       this.url = '/var/www/html/uploads/'+this.user_connect.fls['image'];
      }
       }
 

  }
)
 }
  }
  
  scroll(){
    this.router.navigate(['/pageprincipale']);
    window.scrollTo(0, document.body.scrollHeight);
  }
  nav(){
    if(this.currentUrl.substring(1,7)!="profil"){
   this.router.navigate(["login"])
          }
  }
  dropdownVisible: boolean = false;
  
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  toggleMenu() {
    this.showMenu =!this.showMenu;
  }
  Menuferme(){
    this.showMenu = false;
  }
  showt(){
    this.showtarif=!this.showtarif
  }


  scrollToContactIfOnHomePage(): void {
    // Vérifie si la route actuelle est la page d'accueil
    if (this.router.url === '/pageprincipale') {
      // Si oui, recherche et fait défiler jusqu'à la section 'contact'
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si non, navigue vers la page d'accueil puis fait défiler jusqu'à la section 'contact'
      this.router.navigate(['/pageprincipale']).then(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}
