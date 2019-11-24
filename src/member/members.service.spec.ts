import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';

import { MembersService } from './members.service';
import { Member } from './member.interface';

const mockMember: (Member) => Member = (firstName = 'Harry', lastName = 'Potter', lineName = 'Sorcerer Stone') => {
  return { firstName, lastName, lineName };
};

const members = [
  { firstName: 'Jake', lastName: 'Miller', lineName: 'State Farm' },
];

// class MockMemberModel {
//   constructor(private data) {}
//   static find = jest.fn().mockReturnThis();
//   static exec = jest.fn().mockResolvedValue(members);
//   static findOne = jest.fn().mockResolvedValue('member');
//   save = jest.fn().mockResolvedValue({ firstName: 'TestUser' });
//   static findOneAndUpdate = jest.fn().mockResolvedValue('updatedMember');
//   static findOneAndDelete = jest.fn().mockResolvedValue('deletedMember');
// }

describe('MembersService', () => {
  let membersService;
  let model: Model<Member>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getModelToken('Member'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockMember({})),
            constructor: jest.fn().mockResolvedValue(mockMember({})),
            find: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(members),
            findOne: jest.fn().mockResolvedValue('member'),
            create: jest.fn().mockResolvedValue({ firstName: 'TestUser' }),
            findOneAndUpdate: jest.fn().mockResolvedValue('updatedMember'),
            findOneAndDelete: jest.fn().mockResolvedValue('deletedMember'),
          },
        },
      ],
    }).compile();

    membersService = module.get<MembersService>(MembersService);
    model = module.get<Model<Member>>(getModelToken('Member'));
  });

  describe('getMembers', () => {
    it('calls getMembers and returns an array of Members', async () => {
      const result = await membersService.getMembers();

      expect(membersService.getMembers()).resolves.toEqual(result);
    });
  });

  describe('getMemberById', () => {
    it('calls getMemberById and returns a member', async () => {
      const result = await membersService.getMemberById('id');

      expect(membersService.getMemberById()).resolves.toEqual(result);
    });

    it('calls membersService.getmemberById and throws a NotFound Exception when member does not exist', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

      expect(model.findOne).not.toHaveBeenCalled();
      const result = membersService.getMemberById('unknownId');

      expect(model.findOne).toHaveBeenCalled();
      expect(result).rejects.toThrow(NotFoundException);
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

    it('calls membersService.updateMember and throws an Exception when member does not exists', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(null);

      expect(model.findOneAndUpdate).not.toHaveBeenCalled();
      const result = membersService.updateMember('unknownId', { firstName: 'TestUser' });

      expect(model.findOneAndUpdate).toHaveBeenCalled();
      expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteMember', () => {
    it('calls membersService.deleteMember and returns the removed member', async () => {
      const result = await membersService.deleteMember('id');

      expect(membersService.deleteMember()).resolves.toEqual(result);
    });

    it('calls membersService.deleteMember and throws an Exception when member does not exist', async () => {
      jest.spyOn(model, 'findOneAndDelete').mockResolvedValueOnce(null);

      expect(model.findOneAndDelete).not.toHaveBeenCalled();
      const result = membersService.deleteMember('unknownId');

      expect(model.findOneAndDelete).toHaveBeenCalled();
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
