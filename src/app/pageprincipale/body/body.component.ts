import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carouselRef: ElementRef | undefined;

  private startX: any;
  private startScrollLeft: any;
  private timeoutId: any;
  formsignin!:FormGroup;
  private isAutoPlay = true;
  reponse:any=[]
constructor(private userserv:UserService,private fb:FormBuilder){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  /*this.userserv.getnbsp().subscribe(
    res=>{
      this.reponse=res
    }
  )*/
  this.formsignin=this.fb.group(
    {
    
      "email":["",[Validators.required,Validators.email]],
      "nom":["",Validators.required],
      "desc":["",Validators.required],
    }
  )
}
nav(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
  ngAfterViewInit(): void {

    if (this.carouselRef && this.carouselRef.nativeElement) {
   
      const carousel = this.carouselRef.nativeElement;
      const firstCard = carousel.querySelector('.card');
      const firstCardWidth = (firstCard as HTMLElement)?.offsetWidth || 0;
      const totalCards = carousel.querySelectorAll('.card').length;
    
      // Nombre de cartes à afficher en même temps
      const cardsInView = Math.round(carousel.offsetWidth / firstCardWidth);

      
      let currentPosition = 0;
    
     
      const moveCards = (distance: number) => {
        carousel.scrollLeft += distance;
    
        // Si nous atteignons le début, réinsérez les dernières cartes
        if (carousel.scrollLeft === 0) {
            for (let i = 0; i < cardsInView; i++) {
                const lastCard = carousel.querySelector('.card:last-child');
                carousel.insertAdjacentElement('afterbegin', lastCard!);
            }
            carousel.scrollLeft = firstCardWidth * cardsInView;
        }
        
        // Si nous atteignons la fin, réinsérez les premières cartes
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
            for (let i = 0; i < cardsInView; i++) {
                //const firstCard = carousel.querySelector('.card:first-child');
               // carousel.appendChild(firstCard!);
            

            }
            carousel.scrollLeft = 0;
        }
    };
      const autoPlay = () => {
        if (window.innerWidth < 800 || !this.isAutoPlay) return;
    
        this.timeoutId = setInterval(() => {
          moveCards(firstCardWidth);
        }, 2500);
    
      
      };
    
      autoPlay();
    }
  }
  contact(){
    if(this.formsignin.valid){
      this.userserv.contact(this.formsignin.controls['desc'].value,this.formsignin.controls['nom'].value,this.formsignin.controls['email'].value.trim()).subscribe(
        res=>{
          this.nav()
          this.formsignin.reset()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Votre réclamation a bien été envoyée. Nous vous remercions pour votre contact",
            showConfirmButton: false,
            timer: 1500
          });
        }
      )
    }
  }

}
