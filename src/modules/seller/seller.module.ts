import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerProfile } from './entities/seller.entity';

@Module({
  controllers: [SellerController],
  providers: [SellerService],
  imports: [TypeOrmModule.forFeature([SellerProfile])],
})
export class SellerModule {}
