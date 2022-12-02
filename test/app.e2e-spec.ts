import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import { SignupDto } from 'src/auth/dto';
import * as pactum from 'pactum'

describe('test', () => {

  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true // show only vlaidated params for incomming http request
    }))
    const prisma = app.get(PrismaService)
    await prisma.cleanDB();
    await app.init();
    await app.listen(3007) // testing webserver for pactum to call
  });


  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: SignupDto = {
      email: 'diaa@gmail.com',
      password: '123',
      firstName: 'Diaa',
      lastName: 'Nest',
    };

    describe('signup', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post('http://127.0.0.1:3007/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    })

    describe('sigin', () => {
      it('sigin', () => {
        return pactum.spec()
          .post('http://127.0.0.1:3007/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      })
    })

  });

  describe('User', () => {
    describe('me', () => {
      it('should throw if no token provided', () => {
        return pactum.spec()
          .get('http://127.0.0.1:3007/users/me')
          .expectStatus(401);
      })
    })
    describe('me', () => {
      it('should return user', () => {
        return pactum.spec()
          .get('http://127.0.0.1:3007/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      })
    })
  });


})

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
