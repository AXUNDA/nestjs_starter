import { Controller,Get,Post,Patch,Put,Delete, UseGuards,Param, ParseIntPipe,Body,HttpCode,HttpStatus } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { bookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly service:BookmarkService){}

    @Get()
    getBookmarks(@GetUser("id") userId :number){

    }
     @HttpCode(HttpStatus.CREATED)
    @Post()
    async createBookmark(@GetUser("id") userId :number,@Body() dto :bookmarkDto){
        return await this.service.createBookmark(userId,dto)


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
