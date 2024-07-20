import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offre } from '../models/listoffre.model';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  //private url="https://www.tie-job.com:8443"
  private url="https://up-tie-back-6.onrender.com"
  constructor(private httpclt:HttpClient,private route:Router) {}
  getItem(){
    return sessionStorage.getItem("jwt");
  }
  addoffre(idemp: bigint, idempr: bigint, desc: string): Observable<Offre> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getItem(), // Supposons que this.getItem() récupère le token d'authentification
    });
    const body = desc // Créer l'objet JSON pour la description
    return this.httpclt.post<Offre>(`${this.url}/auth/addoffre/${idemp}/${idempr}`, body, { headers: headers });
  }

  getoffredeemployee(idemp: bigint): Observable<Offre[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getItem(), // Supposons que this.getItem() récupère le token d'authentification
    });
    return this.httpclt.get<Offre[]>(`${this.url}/auth/getoffre/${idemp}`, { headers: headers });
  }
  getoffredeemployeur(idempr: bigint): Observable<Offre[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getItem(), // Supposons que this.getItem() récupère le token d'authentification
    });
    return this.httpclt.get<Offre[]>(`${this.url}/auth/getoffreempr/${idempr}`, { headers: headers });
  }
  deleteoffre(id: bigint): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getItem(), // Supposons que this.getItem() récupère le token d'authentification
    });
    return this.httpclt.delete<void>(`${this.url}/auth/deleteoffre/${id}`, { headers: headers });
  }
  getoffre(id: bigint): Observable<Offre> {
    return this.httpclt.get<Offre>(`${this.url}/auth/getseuloffre/${id}`);
  }
}
