import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { MembersService } from './members.service';

const members = [
  { firstName: 'Jake', lastName: 'Miller', lineName: 'State Farm' },
];

class MemberModel {
  constructor(private data) {}
  static find = jest.fn().mockReturnThis();
  static exec = jest.fn().mockResolvedValue(members);
  static findOne = jest.fn().mockResolvedValue('member');
  save = jest.fn().mockResolvedValue({ firstName: 'TestUser' });
  static findOneAndUpdate = jest.fn().mockResolvedValue('updatedMember');
  static findOneAndDelete = jest.fn().mockResolvedValue('deletedMember');
}

describe('MembersService', () => {
  let membersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getModelToken('Member'),
          useValue: MemberModel,
        },
      ],
    }).compile();

    membersService = await module.get<MembersService>(MembersService);
  });

  describe('getMembers', () => {
    it('calls getMembers and returns an array of Members', () => {
      expect(membersService.getMembers()).resolves.toEqual(members);
    });
  });

  describe('getMemberById', () => {
    it('calls getMemberById and returns a member', async () => {
      const result = await membersService.getMemberById('id');

      expect(membersService.getMemberById()).resolves.toEqual(result);
    });
  });

  describe('createMember', () => {
    it('calls membersService.createMember and returns result', async () => {
      const result = await membersService.createMember({ firstName: 'TestUser' });

      expect(membersService.createMember()).resolves.toEqual(result);
    });
  });

  describe('updateMember', () => {
    it('calls membersService.updateMember and returns an updated member', async () => {
      const result = await membersService.updateMember('id', { firstName: 'TestUser' });

      expect(await membersService.updateMember()).toEqual(result);
    });
  });

  describe('deleteMember', () => {
    it('calls membersService.deleteMember and returns the removed member', async () => {
      const result = await membersService.deleteMember('id');

      expect(membersService.deleteMember()).resolves.toEqual(result);
    });
  });
});
