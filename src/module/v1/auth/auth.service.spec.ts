import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User, UserDocument } from '../user/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../user/user.dto';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  const userModelToken = getModelToken(User.name);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: userModelToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('Testing<signup>', () => {
    it('should create user', async () => {
      const mockPayload: CreateUserDto = {
        name: 'test',
        email: 'test',
        password: 'test',
      };

      const mockUser = new User() as UserDocument;

      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser);

      await authService.signup(mockPayload);

      expect(userService.createUser).toHaveBeenCalledWith(mockPayload);
    });
  });

  describe('Testing<login>', () => {
    const mockPayload: LoginDto = {
      email: 'test',
      password: 'test',
    };

    it('should return error if invalid credentials', async () => {
      jest.spyOn(userService, 'validateUser').mockResolvedValue(null);

      await expect(authService.login(mockPayload)).rejects.toThrow(
        'Invalid credentials',
      );
    });

    it('should login user', async () => {
      const mockUser = new User() as UserDocument;
      mockUser.email = mockPayload.email;
      mockUser.password = mockPayload.password;

      jest.spyOn(userService, 'validateUser').mockReturnValue(mockUser as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      await authService.login(mockPayload);

      expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUser._id });
    });
  });
});
