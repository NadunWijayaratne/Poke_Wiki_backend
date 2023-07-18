import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PokedataService } from './pokedata.service';

@Controller('pokedata')
export class PokedataController {
  constructor(private readonly pokedataService: PokedataService) {}

  @Post()
  async addProduct(
    @Body('name') pokeName: string,
    @Body('description') pokeDesc: string,
    @Body('type') pokeType: string,
    @Body('hp') pokeHp: number,
    @Body('atk') pokeAtk: number,
    @Body('def') pokeDef: number,
  ) {
    const generatedId = await this.pokedataService.insertPokemon(
      pokeName,
      pokeDesc,
      pokeType,
      pokeHp,
      pokeAtk,
      pokeDef,
    );
    return { id: generatedId };
  }

  @Get()
  async getallPokemon() {
    const allpokemon = await this.pokedataService.getallPokemon();
    return allpokemon;
  }

  @Get(':id')
  getPokemon(@Param('id') pokeId: string) {
    return this.pokedataService.getsinglePokemon(pokeId);
  }

  @Patch(':id')
  async updatePokemon(
    @Param('id') pokeId: string,
    @Body('name') pokeName: string,
    @Body('description') pokeDesc: string,
    @Body('type') pokeType: string,
    @Body('hp') pokeHp: number,
    @Body('attack') pokeAtk: number,
    @Body('defence') pokeDef: number,
  ) {
    await this.pokedataService.updatePokemon(
      pokeId,
      pokeName,
      pokeDesc,
      pokeType,
      pokeHp,
      pokeAtk,
      pokeDef,
    );
    return null;
  }

  @Delete(':id')
  async removePokemon(@Param('id') pokeId: string) {
    await this.pokedataService.deletePokemon(pokeId);
    return null;
  }
}
