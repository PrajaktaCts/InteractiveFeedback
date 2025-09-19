import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

   constructor(private http: HttpClient) { }
  private Url='https://localhost:44383/api/Feedback'
  private userUrl='https://localhost:44383/api/User/Users'
  private imageUrl='https://localhost:44383/api/Feedback/download/'

  getImage(url:any): Observable<Blob>{
    return this.http.get<any>(this.imageUrl+url);
  }
  getAllUsers(){ 
    return this.http.get<any>(this.userUrl);
  }
  getAllFeedback(){
    return this.http.get<any>(this.Url+'/'+'Comments');
  }
  addFeedback(item: any): Observable<any> {
    console.log(item)
    return this.http.post<any>(this.Url, item);
  }
  createProjectFeedback(item: any): Observable<any> {
    console.log(item)
    return this.http.post<any>(this.Url, item);
  }

  

  editFeedback(id:any,item:any){
    return this.http.put<any>(`https://localhost:44383/api/Feedback/Update/${id}`, item);
  }

  deleteFeedback(id:any){
    return this.http.delete(`https://localhost:44383/api/Feedback/Delete/${id}`);
  }
}
