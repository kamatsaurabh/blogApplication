import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigEnum } from '../Enum/config.enum';
import { DeletePostResponse, Post } from '../interface/posts.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.Url}${ConfigEnum.Posts}`;
  
  constructor(private http: HttpClient) {}

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  public getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  public createPost(title: string, content: string): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, { title, content });
  }

  public deletePost(id: number): Observable<DeletePostResponse> {
    return this.http.delete<DeletePostResponse>(`${this.apiUrl}/${id}`);
  }
}
