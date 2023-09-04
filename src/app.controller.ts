import {
  Controller,
  Get,
  Redirect,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './loggin.interceptor';

@UseInterceptors(new LoggingInterceptor())
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Render('index')
  @Get()
  getRoot() {
    return;
  }

  @Render('index')
  @UseInterceptors(LoggingInterceptor)
  @Get('/index.html')
  getIndex() {
    return { time: this.appService.getServerTime() };
  }

  @Render('portfolio')
  @Get('/portfolio.html')
  getPortfolio() {
    return;
  }

  @Render('toDo')
  @Get('/toDo.html')
  getToDo() {
    return;
  }

  @Render('contact')
  @Get('/contact.html')
  getContact() {
    return;
  }

  @Redirect('auth')
  @Get('/userPage.html')
  getProject() {
    return;
  }

  @Render('chat')
  @Get('/chat')
  getChat() {
    return;
  }

  @Render('creation')
  @Get('/creation.html')
  getQuotes() {
    return;
  }
}
