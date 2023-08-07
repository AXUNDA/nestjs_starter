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

describe('APP e2e', () => { 
  let app:INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule]
    }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
    whitelist:true
    }))
    await app.init()
   
  })
  afterAll(() => {
    app.close()
  })
  // it.todo("should pass")
  describe("Auth",()=>{
    describe("signup",()=>{
    
    })
    describe("login",()=>{
    
    })

  })
  describe("User",()=>{
    
  })
  describe("Bookmarks",()=>{
    
  })
 })