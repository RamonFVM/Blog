import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostService {
    constructor(private readonly prisma:PrismaService){}

    async CreatePost( Content:Prisma.PostCreateInput){
       const post= await this.prisma.post.create({
            data:Content
        });
        
        return post
       
   
}
   async DeletePost(postId: string){

    try{
        const post =await this.prisma.post.findUnique({
            where:{id:postId}
        })
    
        if(!post){
            throw{
                statusCode:404,
                message:'Post não encontrado'
            }
        }

        await this.prisma.post.delete({
            where:{id:postId}
        })
            
    }catch(error){
        throw error 
    }

   
}

}

