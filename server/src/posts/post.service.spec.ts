import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const postsServiceMock = {
      getAllPosts: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Post', content: 'Test Content' }]),
      getPostById: jest.fn().mockImplementation((id) => {
        if (id === 1) return Promise.resolve({ id: 1, title: 'Test Post', content: 'Test Content' });
        throw new NotFoundException('Post not found');
      }),
      createPost: jest.fn().mockImplementation((title, content) =>
        Promise.resolve({ id: 2, title, content })
      ),
      deletePost: jest.fn().mockImplementation((id) => {
        if (id !== 1) throw new NotFoundException('Post not found');
        return Promise.resolve({ message: 'Post deleted successfully' });
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: postsServiceMock }],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should return all posts', async () => {
    const result = await postsController.getAllPosts();
    expect(result).toEqual([{ id: 1, title: 'Test Post', content: 'Test Content' }]);
    expect(postsService.getAllPosts).toHaveBeenCalled();
  });

  it('should return a single post by ID', async () => {
    const result = await postsController.getPostById(1);
    expect(result).toEqual({ id: 1, title: 'Test Post', content: 'Test Content' });
    expect(postsService.getPostById).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException for a non-existing post', async () => {
    await expect(postsController.getPostById(99)).rejects.toThrow(NotFoundException);
  });

  it('should create a new post', async () => {
    const newPost = { title: 'New Post', content: 'New Content' };
    const result = await postsController.createPost(newPost);
    expect(result).toEqual({ id: 2, title: 'New Post', content: 'New Content' });
    expect(postsService.createPost).toHaveBeenCalledWith('New Post', 'New Content');
  });

  it('should delete an existing post', async () => {
    const result = await postsController.deletePost(1);
    expect(result).toEqual({ message: 'Post deleted successfully' });
    expect(postsService.deletePost).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when deleting a non-existing post', async () => {
    await expect(postsController.deletePost(99)).rejects.toThrow(NotFoundException);
  });
});
