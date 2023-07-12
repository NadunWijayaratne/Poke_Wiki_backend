import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './pokedata/pokedata.module';
// import { PokeController } from './pokeData/pokedata.controller';
// import { PokeService } from './pokeData/pokedata.service';
// import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://nad_free_database1:Q9bIxjvSZ4zl74U9@pokedatabase.dlyba0s.mongodb.net/poke_database',
    ),
  ],
})
export class AppModule {}
