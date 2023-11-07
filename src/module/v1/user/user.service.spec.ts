import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../user/user.dto';
import { getModelToken } from '@nestjs/mongoose';
import { hashPassword } from '../../../common/utils/helper';
import { Model } from 'mongoose';

jest.mock('../../../common/utils/helper', () => ({
  hashPassword: jest.fn().mockReturnValue('hashedPassword'),
  comparePassword: jest.fn().mockReturnValue(true),
}));

describe('AuthService', () => {
  let userService: UserService;
  let mockUserModel: Model<User>;
  const userModelToken = getModelToken(User.name);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: userModelToken,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    mockUserModel = module.get<Model<User>>(userModelToken);
  });

  describe('Testing<getUserById>', () => {
    it('should return user', async () => {
      const mockUser = new User() as UserDocument;

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      await userService.getUserById(mockUser._id);

      expect(mockUserModel.findOne).toHaveBeenCalled();
    });
  });

  describe('Testing<getUserWithEmailAndPassword>', () => {
    it('should return user', async () => {
      const mockEmail = '2G5Pz@example.com';
      const mockUser = new User() as UserDocument;
      mockUser.email = mockEmail;

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockUser),
        }),
      } as any);

      await userService.getUserWithEmailAndPassword(mockUser.email);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: mockUser.email,
      });
    });
  });

  describe('Testing<createUser>', () => {
    const payload: CreateUserDto = {
      name: 'John Doe',
      email: '2G5Pz@example.com',
      password: '123456',
    };

    const passwordHash = hashPassword(payload.password);

    const mockUser = new User();
    Object.assign(mockUser, {
      name: payload.name,
      email: payload.email,
      password: passwordHash,
    });

    it('should return error if email already exists', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(mockUser);

      await expect(userService.createUser(payload)).rejects.toThrow(
        'Email already exists',
      );
    });

    it('should create user', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(mockUserModel, 'create').mockReturnValue(mockUser as any);

      await userService.createUser(payload);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: payload.email,
      });
      expect(mockUserModel.create).toHaveBeenCalledWith({
        name: payload.name,
        email: payload.email,
        password: passwordHash,
      });
    });
  });

  describe('Testing<validateUser>', () => {
    it('should return user ', async () => {
      const mockEmail = '2G5Pz@example.com';
      const mockUser = new User() as UserDocument;
      mockUser.email = mockEmail;

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockUser),
        }),
      } as any);

      await userService.validateUser(mockUser.email, '123456');

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: mockUser.email,
      });
    });
  });
});
