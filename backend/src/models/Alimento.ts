import mongoose, { Schema, Document } from 'mongoose';

interface IAlimento extends Document {
  nome: string;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidratos: number;
  fibra: number;
}

const AlimentoSchema: Schema = new Schema({
  nome: { type: String, required: true },
  energia: { type: Number, required: true },
  proteina: { type: Number, required: true },
  lipideos: { type: Number, required: true },
  carboidratos: { type: Number, required: true },
  fibra: { type: Number, required: true }
});

export const Alimento = mongoose.model<IAlimento>('Alimento', AlimentoSchema);
