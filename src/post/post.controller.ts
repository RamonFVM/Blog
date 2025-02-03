import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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
  async CreatePost(@Body() data: Prisma.PostCreateInput) {
    return this.postService.CreatePost(data);
  }
}
