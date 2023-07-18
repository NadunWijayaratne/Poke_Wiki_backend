import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './pokedata/pokedata.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://nad_free_database1:Q9bIxjvSZ4zl74U9@pokedatabase.dlyba0s.mongodb.net/poke_database',
    ),
  ],
})
export class AppModule {}
