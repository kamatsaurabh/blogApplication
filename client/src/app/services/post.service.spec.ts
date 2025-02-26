import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigEnum } from '../Enum/config.enum';
import { DeletePostResponse, Post } from '../interface/posts.interface';
import { environment } from '../../environments/environment.development';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.Url}${ConfigEnum.Posts}`;

  const mockPost: Post = { id: 1, title: 'Test Post', content: 'This is a test post' };
  const mockPosts: Post[] = [mockPost, { id: 2, title: 'Another Post', content: 'More content' }];
  const mockDeleteResponse: DeletePostResponse = { message: 'Post deleted successfully' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all posts', (done) => {
    service.getAllPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
      done();
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should fetch a post by ID', (done) => {
    service.getPostById(1).subscribe(post => {
      expect(post).toEqual(mockPost);
      done();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should create a new post', (done) => {
    const newPost = { title: 'New Post', content: 'New post content' };
    const createdPost: Post = { id: 3, ...newPost };

    service.createPost(newPost.title, newPost.content).subscribe(post => {
      expect(post).toEqual(createdPost);
      done();
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);
    req.flush(createdPost);
  });

  it('should delete a post', (done) => {
    service.deletePost(1).subscribe(response => {
      expect(response).toEqual(mockDeleteResponse);
      done();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockDeleteResponse);
  });
});
