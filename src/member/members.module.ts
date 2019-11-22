import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { MemberSchema } from './schema/member.schema';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
  ],
  controllers: [
    MembersController,
  ],
  providers: [
    MembersService,
  ],
})
export class MembersModule {}
