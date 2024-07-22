import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filee } from '../models/filee.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url="https://www.tie-job.com:8080"
  constructor(private httpclt:HttpClient,private route:Router) {

   }
   addimage(file:File,id:bigint):Observable<filee>{
    const formData = new FormData();
    formData.append('file', file);
    return this.httpclt.post<filee>(this.url+"/auth/addimage/"+id,formData);
   }
   addcv(file:File,id:bigint):Observable<filee>{
    const formData = new FormData();
    formData.append('file', file);
    return this.httpclt.post<filee>(this.url+"/auth/addcv/"+id,formData);
   }
   getimage(id:bigint):Observable<filee>{
    return this.httpclt.get<filee>(this.url+"/auth/getimage/"+id);
   }
   updatefile(file:File,id:bigint):Observable<filee>{
    const formData = new FormData();
    formData.append('file', file);
    return this.httpclt.post<filee>(this.url+"/auth/updatefile/"+id,formData);
   }
}
