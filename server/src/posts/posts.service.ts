import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class PostsService {
  private readonly API_URL = process.env.JSON_FAKE_DATA;

  async getAllPosts() {
    const response = await axios.get(this.API_URL);
    return response.data;
  }

  async getPostById(id: number) {
    try {
      const response = await axios.get(`${this.API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new NotFoundException('Post not found');
    }
  }

  async createPost(title: string, content: string) {
    const response = await axios.post(this.API_URL, { title, body: content, userId: 1 });
    return response.data;
  }

  async deletePost(id: number) {
    try {
      await axios.delete(`${this.API_URL}/${id}`);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new NotFoundException('Post not found');
    }
  }
}
