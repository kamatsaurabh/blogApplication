import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { ConfigEnum } from '../../Enum/config.enum';
import { Post } from '../../interface/posts.interface';
@Component({
  selector: 'app-create-post',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  public postForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private postService: PostService, 
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  public submitPost():void {
    if (this.postForm.valid) {
      const postData = this.postForm.value;

      this.postService.createPost(this.postForm.value.title, this.postForm.value.body).subscribe((res:Post) => {
        if(res){
          alert('Post created successfully!');
          this.postForm.reset();
          setTimeout(()=>{
            this.backToDashboard();
          },2000)
        }     
      });
    }
  }

  public backToDashboard():void {
    this.router.navigate([ConfigEnum.Dashboard]); // ✅ Navigate to dashboard
  }
}
