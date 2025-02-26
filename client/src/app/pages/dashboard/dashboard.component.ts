import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../interface/posts.interface';
import { ConfigEnum } from '../../Enum/config.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public posts: Post[] = [];

  constructor(
    private postService: PostService,
    public router:Router,
    private authService: AuthService
  ) {}

  ngOnInit():void {
    this.loadPosts();
  }

  public loadPosts():void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  public deletePost(id: number):void {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  public viewPostDetails(postId: number):void {
    this.router.navigate([ConfigEnum.Post, postId]);
  }

  public routeTocreatePosts():void {
    this.router.navigate([ConfigEnum.CreatePost]); 
  }
  
  public logout():void{
      this.authService.logout();
      this.router.navigate([ConfigEnum.Login]);
  }
}


