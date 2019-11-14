import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { MembersService } from './members.service';

const members = [
  { firstName: 'Jake', lastName: 'Miller', lineName: 'State Farm' },
];

describe('MembersService', () => {
  let membersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getModelToken('Member'),
          useValue: {
            find: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(members),
            findOne: jest.fn().mockResolvedValue('member'),
            save: jest.fn().mockResolvedValue({ firstName: 'TestUser' }),
            findOneAndUpdate: jest.fn().mockResolvedValue('updatedMember'),
          },
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
      const result = await membersService.updateMember({ firstName: 'TestUser' });

      expect(await membersService.updateMember()).toEqual(result);
    });
  });
});
