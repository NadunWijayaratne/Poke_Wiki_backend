import * as mongoose from 'mongoose';

export const PokedataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  type: { type: String, required: true },
  hp: { type: Number, required: true },
  atk: { type: Number, required: true },
  def: { type: Number, required: true },
});

export interface Pokedata extends mongoose.Document {
  id: string;
  name: string;
  desc: string;
  type: string;
  hp: number;
  atk: number;
  def: number;
}
