import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import { SignupDto } from 'src/auth/dto';
import * as pactum from 'pactum'
import { EditUser } from 'src/user/edit-user.dto';

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
    const port = 3007 ;
    pactum.request.setBaseUrl(`http://127.0.0.1:${port}`)
    await app.init();
    await app.listen(port) // testing webserver for pactum to call
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
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    })

    describe('sigin', () => {
      it('sigin', () => {
        return pactum.spec()
          .post('/auth/signin')
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
          .get('/users/me')
          .expectStatus(401);
      })
    })
    describe('me', () => {
      it('should return user', () => {
        return pactum.spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      })
    })

    const dto: EditUser = {
      email: 'diaa2@gmail.com',      
      firstName: 'Diaa2',
      lastName: 'Nest34',
    };

    describe('update', () => {
      it('should return updated user', () => {
        return pactum.spec()
          .put('/users/edit')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .inspect()
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.lastName);
          
      })
    })
  });


})
