import { Module } from '@nestjs/common';
import { PokedataController } from './pokedata.controller';
import { PokedataService } from './pokedata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokedataSchema } from './pokedata.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokedata', schema: PokedataSchema }]),
  ],
  controllers: [PokedataController],
  providers: [PokedataService],
})
export class ProductsModule {}
