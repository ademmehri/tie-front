import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Page1Component } from './patron/pagepatron/page1/page1.component';
import { PagepatronComponent } from './patron/pagepatron/pagepatron.component';
import { PetitcvComponent } from './petitcv/petitcv.component';
import { PcvComponent } from './petitcv/pcv/pcv.component';
import { PageprincipaleComponent } from './pageprincipale/pageprincipale.component';
import { HeaderComponent } from './pageprincipale/header/header.component';
import { BodyComponent } from './pageprincipale/body/body.component';
import { FooterComponent } from './pageprincipale/footer/footer.component';
import { SignuppComponent } from './signupp/signupp.component';
import { ProfilemployeeComponent } from './profilemployee/profilemployee.component';
import { EmployeeComponent } from './profilemployee/employee/employee.component';
import { PatronprofilComponent } from './profilpatron/patronprofil/patronprofil.component';
import { ProfilpatronComponent } from './profilpatron/profilpatron.component';
import { UpdateComponent } from './update/update.component';

import { PackpaymentComponent } from './packpayment/packpayment.component';
import { SouspackComponent } from './packpayment/souspack/souspack.component';
import { UpdatepComponent } from './updatep/updatep.component';
import { NextformComponent } from './nextform/nextform.component';
import { PageoffreemployeurComponent } from './pageoffreemployeur/pageoffreemployeur.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { SouspackrestaurationComponent } from './souspackrestauration/souspackrestauration.component';
import { ProfilemployeurComponent } from './profilemployeur/profilemployeur.component';
import { ProposComponent } from './propos/propos.component';
import { TestComponent } from './test/test.component';
import { PacksupComponent } from './packsup/packsup.component';
import { OffreajouterComponent } from './offreajouter/offreajouter.component';
import { AuthGuard } from './models/Auth.guard';





const routes: Routes = [
  {path:'pagepatron',component:PagepatronComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
 
  {path:'signup',component:SignupComponent},
  {path:'patron',component:Page1Component},
  {path:'petitcv',component:PetitcvComponent,canActivate:[AuthGuard]},
  {path:'pcv',component:PcvComponent,canActivate:[AuthGuard]},
  {path:'pageprincipale',component:PageprincipaleComponent},
  {path:'signuppatron',component:SignuppComponent},
  {path:'profilemployee',component:ProfilemployeeComponent,canActivate:[AuthGuard]},
  {path:'employee',component:EmployeeComponent},
  {path:'profilpatron/:id',component:ProfilpatronComponent,canActivate:[AuthGuard]},
  {path:'patronprofil',component:PatronprofilComponent,canActivate:[AuthGuard]},
  {path:'updatepatron',component:UpdateComponent,canActivate:[AuthGuard]},
  {path:'packpayment/:id',component:PackpaymentComponent},
  {path:'dachbord',component:DashbordComponent,canActivate:[AuthGuard]},
  {path:'souspackpayment',component:SouspackComponent},
  {path:'updateemp',component:UpdatepComponent,canActivate:[AuthGuard]},
  {path:'nextform',component:NextformComponent},
  {path:'pageoffreemployeur',component:PageoffreemployeurComponent,canActivate:[AuthGuard]},
  {path:'updatepass/:email',component:UpdatepasswordComponent},
  {path:'spackrest',component:SouspackrestaurationComponent},
  {path:'profilemployeur',component:ProfilemployeurComponent,canActivate:[AuthGuard]},
  {path:'propos',component:ProposComponent},
  {path:'test',component:TestComponent},
  {path:'packsup',component:PacksupComponent},
  {path:'offreajouter',component:OffreajouterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
