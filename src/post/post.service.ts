import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }
  async CreatePost(content: string, userId: string) {

    if (!userId) {
      throw new Error('Requer Id do usuario');
    }


    const post = await this.prisma.post.create({
      data: {
        content: content,
        user: {
          connect: { id: userId },
        },
      },
    });

    return post;
  }


  async DeletePost(postId: string) {

    try {
      const post = await this.prisma.post.findUnique({
        where: { id: postId }
      })

      if (!post) {
        throw {
          statusCode: 404,
          message: 'Post não encontrado'
        }
      }

      await this.prisma.post.delete({
        where: { id: postId }
      })

    } catch (error) {
      throw error
    }



  }
  async GetPostByUsername(username: string) {
    return this.prisma.post.findMany({
      where: {
        user: {
          name: username,  
        },
      },
    });
  }

}

