import { TestingModule, Test } from '@nestjs/testing';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

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
            updateMember: jest.fn().mockResolvedValue('updatedMember'),
            deleteMember: jest.fn().mockResolvedValue('deletedMember'),
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
    it('calls MembersController.getMembers and returns an array of members', () => {
      expect(controller.getMembers()).resolves.toEqual('getAllMembers');
    });
  });

  describe('getMemberById', () => {
    it('calls MembersController.getMemberById with valid ID and returns the member', () => {
      expect(controller.getMemberById('id')).resolves.toEqual('getMember');
    });

    it('calls MembersController.getMemberById with unknown ID and returns a NotFoundException', async () => {
      jest.spyOn(service, 'getMemberById').mockRejectedValue(new NotFoundException(`Member with id "unknownId" does not exist!`));
      try {
        await controller.getMemberById('unknownId');
      } catch (error) {
        expect(error.message.message).toContain('Member with id "unknownId"');
      }
    });
  });

  describe('createMember', () => {
    it('calls MembersController.createMember and returns the new member', () => {
      expect(controller.createMember({ firstName: 'Tester', lastName: 'Breaker', lineName: 'coder' })).resolves.toEqual('newMember');
    });
  });

  describe('updateMember', () => {
    it('calls MembersController.updateMember and returns an updated member', () => {
      expect(controller.updateMember('id', { firstName: 'Tester', lastName: 'Breaker', lineName: 'coder' })).resolves.toEqual('updatedMember');
    });

    it('calls MembersController.updateMember with unknown ID and returns a NotFoundException', async () => {
      jest.spyOn(service, 'updateMember').mockRejectedValue(new NotFoundException(`Member with id "unknownId" does not exist!`));

      try {
        await controller.updateMember('unknownId', { firstName: 'Tester', lastName: 'Breaker', lineName: 'coder' });
      } catch (error) {
        expect(error.message.message).toContain('Member with id "unknownId"');
      }
    });
  });

  describe('deleteMember', () => {
    it('calls MembersController.deleteMember and returns the deleted member', () => {
      expect(controller.deleteMember('id')).resolves.toEqual('deletedMember');
    });

    it('calls MembersController.deleteMember with unknown ID and returns a NotFoundException', async () => {
      jest.spyOn(service, 'deleteMember').mockRejectedValue(new NotFoundException(`Member with id "unknownId" does not exist!`));

      try {
        await controller.deleteMember('unknownId');
      } catch (error) {
        expect(error.message.message).toContain('Member with id "unknownId"');
      }
    });
  });
});
