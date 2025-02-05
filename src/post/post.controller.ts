import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

 
  @Delete(':id') 
  async DeletePost(@Param('id') id: string) {
    return this.postService.DeletePost(id); 
  }

  
  @Post()
   async CreatePost(@Body() data: { content: string; userId: string }) {

  if (!data.userId) {
    throw new Error('É necessario um id para criar um post');
  }
  return this.postService.CreatePost(data.content, data.userId);

}
@Get(':username')
async getPost(@Param('username') username: string) {
  const posts = await this.postService.GetPostByUsername(username);
  return posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString()  
  }));
}
}

