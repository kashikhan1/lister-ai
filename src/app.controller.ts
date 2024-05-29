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

@Controller('google')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) { }
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Query('origin') origin: string) {
    this.logger.debug(`Origin: ${origin}`);
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @Query('state') state: string,
  ) {
    // Extract user from request
    const user = req.user;
    this.logger.debug(`State ${state}: ${JSON.stringify(req.session)}`);

    const redirectUrl = `${(req?.session as any)?.origin}?user=${encodeURIComponent(JSON.stringify(user))}`;
    console.log(state);
    // Redirect to the origin URL with user info or token
    res.redirect(redirectUrl);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }
}
