import { Controller, Get, Post, Body, Param } from '@nestjs/common';

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
}
