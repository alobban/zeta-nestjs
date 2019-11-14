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

  describe('createMember', () => {
    it('calls membersService.createMember and returns result', async () => {
      const save = jest.fn().mockResolvedValue(true);

      expect(save).not.toHaveBeenCalled();
      const result = await membersService.createMember('newMember');

      expect(save).toHaveBeenCalled();
    });
  });
});
