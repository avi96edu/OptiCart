import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'advweb',
      database: 'SmartBazar',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminModule,
    ProfileModule,
    ProjectModule,
    AuthModule,
    SellerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}