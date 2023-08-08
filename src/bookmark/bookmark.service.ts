import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { bookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private readonly prisma:PrismaService){}

    
s
    getBookmarks(){

    }

    async createBookmark(user:number,dto:bookmarkDto){
     return   await this.prisma.bookmark.create({
            data:{
                ...dto,
                userId:user
            }
        })
        
    }

 
    getBookmarkById(){

    }

    
    editBookmarkById(){

    }


    deleteBookmarkById(){

    }


}
