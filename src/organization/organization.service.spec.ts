import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { OrganizationService } from './organization.service';
import { Prisma } from '@prisma/client';
import e from 'express';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    organization: {
      create: jest.fn(),
    },
  };

  const organizationData = {
    name: 'Test Organization',
    address: [
      {
        street: '123 Test St',
        city: 'Test City',
        province: 'ON',
        postalCode: 'A1A 1A1',
        country: 'Canada',
      },
    ],
    phoneNumber: '(123) 456-7890',
    email: 'duplicate@example.com',
    adminName: 'John Doe',
    websiteUrl: 'https://www.example.com',
    logoUrl: 'https://www.example.com/logo.png',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an organization', async () => {
    const createdOrganization = {
      ...organizationData,
      id: '1',
    };
    mockPrismaService.organization.create.mockResolvedValue(
      createdOrganization,
    );
    const organization = await service.createOrganization(organizationData);
    expect(organization).toEqual(organizationData);
    expect(organization).toEqual(createdOrganization);
  });

  it('should throw an error when trying to create an organization with a duplicate email', async () => {
    const duplicateEmailError = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed on the constraint: `organization_email_key`',
      {
        code: 'P2002',
        clientVersion: '2.30.0',
        meta: {},
        batchRequestIdx: 0,
      },
    );

    mockPrismaService.organization.create.mockImplementationOnce(() => {
      throw duplicateEmailError;
    });

    await expect(service.createOrganization(organizationData)).rejects.toThrow(
      duplicateEmailError,
    );
  });
});
