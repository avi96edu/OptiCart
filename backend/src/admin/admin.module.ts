import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'avisarker04@gmail.com',
          pass: 'oglf ujbu kcvj nusx',
        },
      },
      defaults: {
        from: '"Admin Management System" <avisarker04@gmail.com>',
      },
    }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}