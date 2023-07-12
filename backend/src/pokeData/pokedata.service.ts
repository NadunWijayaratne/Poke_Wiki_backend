import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokedata } from './pokedata.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class PokedataService {
  constructor(
    @InjectModel('Pokedata') private readonly pokedataModel: Model<Pokedata>,
  ) {}

  private async findPokemon(id: string): Promise<Pokedata> {
    let pokemon;
    try {
      pokemon = await this.pokedataModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find pokemon.');
    }
    if (!pokemon) {
      throw new NotFoundException('Could not find pokemon');
    }
    return pokemon;
  }

  async insertPokemon(
    name: string,
    desc: string,
    type: string,
    hp: number,
    atk: number,
    def: number,
  ) {
    const newProduct = new this.pokedataModel({
      name: name,
      desc: desc,
      type: type,
      hp: hp,
      atk: atk,
      def: def,
    });
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
  }

  async getallPokemon() {
    const allpokemon = await this.pokedataModel.find().exec();
    return allpokemon.map((poke) => ({
      id: poke.id,
      name: poke.name,
      description: poke.desc,
      type: poke.type,
      hp: poke.hp,
      atk: poke.atk,
      def: poke.def,
    }));
  }

  async getsinglePokemon(pokeId: string) {
    const pokemon = await this.findPokemon(pokeId);
    return {
      id: pokemon.id,
      name: pokemon.name,
      description: pokemon.desc,
      type: pokemon.type,
      hp: pokemon.hp,
      atk: pokemon.atk,
      def: pokemon.def,
    };
  }

  async updatePokemon(
    pokeId: string,
    name: string,
    description: string,
    type: string,
    hp: number,
    atk: number,
    def: number,
  ) {
    const updatedPokemon = await this.findPokemon(pokeId);

    if (name) {
      updatedPokemon.name = name;
    }
    if (description) {
      updatedPokemon.desc = description;
    }
    if (type) {
      updatedPokemon.type = type;
    }
    if (hp) {
      updatedPokemon.hp = hp;
    }
    if (atk) {
      updatedPokemon.atk = atk;
    }
    if (def) {
      updatedPokemon.def = def;
    }
    updatedPokemon.save();
  }

  async deletePokemon(pokeId: string) {
    await this.pokedataModel.deleteOne({ _id: pokeId }).exec();
  }
}
