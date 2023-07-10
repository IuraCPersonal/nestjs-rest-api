import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any, @Res() res: Response) {
    const access_token = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).send(access_token);
  }
}
