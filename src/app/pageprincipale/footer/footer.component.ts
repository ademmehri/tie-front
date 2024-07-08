import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
constructor(private router: Router){}
  nav(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
