import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { compare as bcryptCompare, hashSync as bcryptHash } from 'bcrypt';
import { User } from '@prisma/client';
import { SignUpDto } from '../dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (user) {
      const compare = await bcryptCompare(pass, user.password);
      if (compare) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async signIn(payload: Omit<User, 'password'>) {
    return {
      user: payload,
      access_token: this.jwtService.sign({ id: payload.id }),
      refresh_token: this.jwtService.sign(
        { id: payload.id },
        { expiresIn: '7d' },
      ),
    };
  }

  async createUser(data: SignUpDto) {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await bcryptHash(data.password, 10),
        avatar: null,
      },
    });
  }
}
