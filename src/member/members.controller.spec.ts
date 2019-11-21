import { TestingModule, Test } from '@nestjs/testing';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';

describe('membersController', () => {
  let controller: MembersController;
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        {
          provide: MembersService,
          useValue: {
            getMembers: jest.fn().mockResolvedValue('getAllMembers'),
            getMemberById: jest.fn().mockResolvedValue('getMember'),
            createMember: jest.fn().mockResolvedValue('newMember'),
          },
        },
      ],
    }).compile();

    controller = module.get<MembersController>(MembersController);
    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMembers', () => {
    it('should get all members', () => {
      expect(controller.getMembers()).resolves.toEqual('getAllMembers');
    });
  });

  describe('getMemberById', () => {
    it('should return a member with the specified id', () => {
      expect(controller.getMemberById('id')).resolves.toEqual('getMember');
    });
  });

  describe('createMember', () => {
    it('should create a member and return the new member', () => {
      expect(controller.createMember({ firstName: 'Tester', lastName: 'Breaker', lineName: 'coder' })).resolves.toEqual('newMember');
    });
  });
});
