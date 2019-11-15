import { Controller, Get, Post, Body, Param, Put, NotFoundException, Delete } from '@nestjs/common';

import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member-dto';
import { Member } from './member.interface';

@Controller('members')
export class MembersController {

  constructor(private membersService: MembersService) {}

  @Get()
  getMembers() {
    return this.membersService.getMembers();
  }

  @Get('/:id')
  getMemberById(@Param('id') id: string): Promise<Member> {
    return this.membersService.getMemberById(id);
  }

  @Post()
  createMember(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<Member> {
    return this.membersService.createMember(createMemberDto);
  }

  @Put('/:id')
  async updateMember(
    @Param('id') id: string,
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<Member> {
    const updatedMember = await this.membersService.updateMember(id, createMemberDto);
    if (!updatedMember) {
      throw new NotFoundException('Member does not exist!');
    }
    return updatedMember;
  }

  @Delete('/:id')
  async deleteMember(
    @Param('id') id: string,
  ) {
    const deletedMember = await this.membersService.deleteMember(id);
    return deletedMember;
  }
}
