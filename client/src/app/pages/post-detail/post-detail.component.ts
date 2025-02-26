import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/posts.interface';
import { ConfigEnum } from '../../Enum/config.enum';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  public post!: Post;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private router: Router) {}

  backToDashboard() {
    this.router.navigate([ConfigEnum.Dashboard]);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(id).subscribe(data => {
      this.post = data;
    });
  }
}
