import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { employee } from '../models/employee.model';
import { filee } from '../models/filee.model';
import { Router } from '@angular/router';
import { Role } from '../models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedin=false;
  private url="https://tie-job.com"
  constructor(private httpclt:HttpClient,private route:Router) {

   }
   getItem(){
    return sessionStorage.getItem("jwt");
  }
   login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.loggedin=true;
    const options = { headers, observe: 'response' as 'response' };
    return this.httpclt.post<any>(this.url+`/login`, credentials, options);
  }

   existmail(email:string):Observable<Boolean>{
    return this.httpclt.get<Boolean>(this.url+"/auth/exists/"+email);
   }
   verificationemail(email:string):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.httpclt.post<any>(this.url+"/auth/verifieremail",formData);
   }
   addemployee(us:employee):Observable<employee>{
    return this.httpclt.post<employee>(this.url+"/auth/addUser",us);
   }
   addentreprise(us:employee):Observable<employee>{
    return this.httpclt.post<employee>(this.url+"/auth/addUserentr",us);
   }
   getuserbyemail(email:string):Observable<employee>{
    return this.httpclt.get<employee>(this.url+"/auth/getuserbyemail/"+email);
   }
   updateuser(us:employee):Observable<employee>{
    return this.httpclt.post<employee>(this.url+"/auth/updateuser",us);
   }
   updatepack(us:employee):Observable<employee>{
    return this.httpclt.post<employee>(this.url+"/auth/updatepack",us);
   }
   getemployees():Observable<employee[]>{
    return this.httpclt.get<employee[]>(this.url+"/auth/allemployee");
   }
   getuserbyid(id:bigint):Observable<employee>{
    return this.httpclt.get<employee>(this.url+"/auth/getuser/"+id);
   }

  
         
  



 

  
  
   save(acessToken:string,email:string,role:string){
    sessionStorage.setItem("jwt",acessToken);
    sessionStorage.setItem("email",email);
    sessionStorage.setItem("role",role);
   }
   logout(){
  
    sessionStorage.clear();
    this.loggedin=false;
    this.route.navigate(["login"]);
   }

  updatepassword(use:employee):Observable<any>{
            return this.httpclt.post(this.url+"/auth/updatePassword",use,{responseType: 'text'});
           }
         
           getemployeeGoldh(): Observable<employee[]> {
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.getItem(),
            });
        
            return this.httpclt.get<employee[]>(`${this.url}/auth/rechercheemployeeGold`, { headers })
            // .pipe(map(clients => this.filterClientsBySession(clients, this.getItem()!))
             // );
          }
          getemployeeGoldr():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeGold_r",{headers})
           // .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          //)
          }
          getemployeeSuperieur():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeesuperieur",{headers})
            //.pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          //)
          }
          getemployeeRestaurer():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeerestaurer",{headers})
           // .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
         // )
          }
          getemployeeServir():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeServir",{headers})
          //  .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
         // )
          }
          getemployeeSuperieur_res():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeSuperieur_r",{headers})
           // .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
         // )
          }
          getemployeeRestaurer_res():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeRestaurer_r",{headers})
           // .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
         // )
          }
          getemployeeServir_res():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeServir_r",{headers})
           // .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
         // )
          }
          getemployeeGold_res():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeGold",{headers})
           // .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
           // )
         
          }
       
          getoffrecrrerparemployeur(id:bigint):Observable<any[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<any[]>(this.url+"/offre/getoffrecrerparemployeur/"+id,{headers});
          }
         deleteoffre(id:bigint):Observable<string>{
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +this.getItem(),
          });
            return this.httpclt.delete(this.url+"/offre/deleteoffre/"+id,{responseType: 'text',headers});
          }
          isLoggedIn() {
            if(sessionStorage.getItem('email')!=undefined){
              return true
            }
            return false
          }
          getnbsp():Observable<any>{
           
            return this.httpclt.get<any>(this.url+"/auth/getsp");
          }
        

           /* --------- get token cration date ------------*/
   getTokenCreationDate(authtoken:string): Date | null {
   
    if (authtoken) {
      const tokenPayload = JSON.parse(atob(authtoken.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000; 
        const creationTime = expirationTime - (60 * 60 * 1000); 
        return new Date(creationTime);
    }
    return null;
  }
  /***------------ end ------------ */
  

  filterClientsBySession(clients: any[],authtoken:string): any[] {
   
    const tokenCreationDate = this.getTokenCreationDate(authtoken); // Assuming you have a method to get token creation date
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filter clients based on session creation date
    return clients.filter(client => {
      const sessionCreationDate = new Date(client.sessionCreationDate);
      return (sessionCreationDate >= thirtyDaysAgo) && tokenCreationDate && (sessionCreationDate <= tokenCreationDate);
    });
  }
/*  getlistemployeegouv(gouv: string, authtoken: string): Observable<patronemp[]> {
    return this.httpclt.get<patronemp[]>("http://localhost:8087/auth/recherchegouver/" + gouv)
      .pipe(
        map(clients => this.filterClientsBySession(clients, authtoken))
      );
} */


}
