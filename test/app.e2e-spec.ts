// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
import { AppModule } from "../src/app.module"
import { Test } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common/interfaces"
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe"
import * as pactum from 'pactum';
import { AuthDto } from "src/auth/dto"
import { PrismaService } from "../src/prisma/prisma.service";

describe('APP e2e', () => { 
  let app:INestApplication
  let prisma: PrismaService;
  

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule]
    }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
    whitelist:true
    }))
    await app.init()
    await app.listen(3000)
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl("http://localhost:3000")
   
  })
  afterAll(() => {
    app.close()
  })
  // it.todo("should pass")
  describe("Auth",()=>{
    const dto:AuthDto={
      email:"axle@mail.com",
      password:"12345"

    }
    describe("signup",()=>{
      it("should signup",()=>{
       
        return pactum.spec().post("/auth/signup").withBody(dto).expectStatus(201)

      })
    
    })
    describe("login",()=>{
      it("should login",()=>{
        return pactum.spec().post("/auth/login").withBody(dto).expectStatus(200).stores('userAt',"access_token")

      })
    
    })

  })
  describe("User",()=>{
    describe("GET me",()=>{
      it("should get user",()=>{
        return pactum.spec().get("/users/me").withHeaders({Authorization:"Bearer $S{userAt}"}).expectStatus(200)

      })
    
    })
    describe("Edit user",()=>{
      it("should edit user",()=>{
        return pactum.spec().patch("/users/me").withHeaders({Authorization:"Bearer $S{userAt}"}).withBody({
          firstName:"charles",
          lastName:"Emmanuel"
        }).expectStatus(200).inspect()

      })
     

    
    })
    
  })
  describe("Bookmarks",()=>{
    describe("Create bookmark",()=>{
      it("should create a bookmark",()=>{
        return pactum.spec().post("/bookmark").withHeaders({Authorization:"Bearer $S{userAt}"}).withBody({
          title:"bookmark title",
          desc:"bookmark desc",
          link:"bookmark link"

        }).expectStatus(201).inspect()

      })
    
    })
    describe("Edit bookmark by id",()=>{
    
    })
    describe("Get Bookmark",()=>{
    
    })
    describe("Get bookmark by id",()=>{
    
    })
    describe("Delete bookmark by id",()=>{
    
    })
    
  })
 })