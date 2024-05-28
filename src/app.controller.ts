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
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { user } = this.appService.googleLogin(req) as any;
    const targetUrl: string = req.headers.host;
    console.log(targetUrl);
    const redirectUrl: string = targetUrl.includes('http')
      ? targetUrl
      : `http://${targetUrl}`;
    return res.redirect(
      `${redirectUrl}?data=${user ? JSON.stringify(user) : ''}`,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }
}
