import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // Extract user from request
    const user = req.user;
    const redirectUrl = `/google/success?user=${encodeURIComponent(JSON.stringify(user))}`;

    console.log(redirectUrl, process.env.REDIRECT_URL);
    res.redirect(redirectUrl);
  }

  @Get('success')
  async googlLoginSuccess(@Req() req: Request, @Res() res: Response) {
    // Extract user from request
    // const user = req.user;
    const redirectUrl = `${process.env.REDIRECT_URL}/user=${JSON.stringify(req.query.user)}`;

    console.log(redirectUrl, process.env.REDIRECT_URL);
    res.redirect(redirectUrl);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }
}
