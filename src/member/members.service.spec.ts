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
    it('calls getMembers and returns an array of Members', async () => {

      expect(membersService.getMembers()).resolves.toEqual(members);
    });
  });
});
