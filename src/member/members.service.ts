import { Model } from 'mongoose';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Member } from './member.interface';
import { CreateMemberDto } from './dto/create-member-dto';

@Injectable()
export class MembersService {
  constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}

  async getMembers(): Promise<Member[]> {
    return await this.memberModel.find().exec();
  }

  async getMemberById(id: string): Promise<Member> {
    return await this.memberModel.findOne({_id: id});
  }

  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const createdMember = this.memberModel.create(createMemberDto);
    return createdMember;
  }

  async updateMember(id: string, createMemberDto: CreateMemberDto): Promise<Member> {
    let updatedMember: Member;
    try {
      updatedMember = await this.memberModel.findOneAndUpdate({_id: id}, createMemberDto, {new: true});
      return updatedMember;
    } catch (error) {
      if (error.message && error.message.message.includes('ObjectId failed')) {
        throw new NotFoundException(`Member with id "${id}" does not exist!`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteMember(id: string) {
    const deletedMember = await this.memberModel.findOneAndDelete({_id: id});
    return deletedMember;
  }
}
