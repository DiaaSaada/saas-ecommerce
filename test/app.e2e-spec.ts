import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('test', () => {

    let app: INestApplication;
    let prisma : PrismaService
    beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true // show only vlaidated params for incomming http request
    }))
    const prisma = app.get(PrismaService)
    await prisma.cleanDB();
    await app.init();
  });

 
})

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
