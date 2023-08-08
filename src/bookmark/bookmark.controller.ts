import { Controller,Get,Post,Patch,Put,Delete, UseGuards,Param, ParseIntPipe } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly service:BookmarkService){}

    @Get()
    getBookmarks(@GetUser("id") userId :number){

    }

    @Post()
    createBookmark(@GetUser("id") userId :number){

    }

    @Get('/:id')
    getBookmarkById(@Param("id",ParseIntPipe) id:number,@GetUser("id") userId :number){

    }

    @Put("/:id")
    editBookmarkById(@Param("id",ParseIntPipe) id:number,@GetUser("id") userId :number){

    }

    @Delete("/:id")
    deleteBookmarkById(@Param("id",ParseIntPipe) id:number ,@GetUser("id") userId :number){

    }



}
