import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './member/members.module';

@Module({
  imports: [
    MembersModule,
    MongooseModule.forRoot(
      'mongodb+srv://druwslugz:' + process.env.MONGO_ATLAS_PW + '@udemy-mean-course-gi57r.mongodb.net/zeta-data',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
