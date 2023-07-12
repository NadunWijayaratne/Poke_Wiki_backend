import { Module } from '@nestjs/common';
import { ProductsController } from './pokedata.controller';
import { ProductsService } from './pokedata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokedataSchema } from './pokedata.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokedata', schema: PokedataSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
