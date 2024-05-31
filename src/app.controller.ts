import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { lastPath } from './save-origin.middleware';
@Controller('google')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Query('origin') origin: string) {
    this.logger.debug(`Origin: ${origin}`);
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // Extract user from request
    const user = req.user;
    this.logger.debug(`session ${JSON.stringify(req.query)}`);
    console.log(`query ${req.query.context}`);

    const redirectUrl = `${process.env[(req.query as any).context || lastPath]}?user=${encodeURIComponent(JSON.stringify(user))}`;
    // Redirect to the origin URL with user info or token
    res.redirect(redirectUrl);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }
}
