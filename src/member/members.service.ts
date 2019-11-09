import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Member } from './member.interface';
import { CreateMemberDto } from './dto/create-member-dto';

@Injectable()
export class MembersService {
  members = [
    { firstName: 'Jake', lastName: 'Miller', lineName: 'State Farm' },
  ];

  constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}

  async getMembers(): Promise<Member[]> {
    return await this.memberModel.find().exec();
  }

  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const createdMember = new this.memberModel(createMemberDto);
    return await createdMember.save();
  }
}
