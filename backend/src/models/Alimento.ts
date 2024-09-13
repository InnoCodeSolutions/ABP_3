/*import mongoose, { Schema, Document } from 'mongoose';

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
*/
import { Schema, model, Document } from 'mongoose';

interface IAlimento extends Document {
  id: number;
  preparacao: number;
  energia: number;
  proteina: number;
  lipidios: number;
  carboidrato: number;
  fibra: number;
  colesterol: number;
  agsaturado: number;
  agmono: number;
  agpoli: number;
  aglinoleico: number;
  aglinolenico: number;
  agtranstotal: number;
  acucartotal: number;
  acucaradicao: number;
  calcio: number;
  magnesio: number;
  manganes: number;
  fosforo: number;
  ferro: number;
  sodio: number;
  sodioadicao: number;
  potassio: number;
  cobre: number;
  zinco: number;
  selenio: number;
  retinol: number;
  vitamina_a: number;
  tiamina: number;
  riboflavina: number;
  niacina: number;
  niacina_ne: number;
  piridoxina: number;
  cobalamina: number;
  folato: number;
  vitamina_d: number;
  vitamina_e: number;
  vitamina_c: number;
}

const AlimentoSchema = new Schema<IAlimento>({
  id: { type: Number, required: true, unique: true },
  preparacao: { type: Number, required: true },
  energia: { type: Number, required: true },
  proteina: { type: Number, required: true },
  lipidios: { type: Number, required: true },
  carboidrato: { type: Number, required: true },
  fibra: { type: Number, required: true },
  colesterol: { type: Number, required: true },
  agsaturado: { type: Number, required: true },
  agmono: { type: Number, required: true },
  agpoli: { type: Number, required: true },
  aglinoleico: { type: Number, required: true },
  aglinolenico: { type: Number, required: true },
  agtranstotal: { type: Number, required: true },
  acucartotal: { type: Number, required: true },
  acucaradicao: { type: Number, required: true },
  calcio: { type: Number, required: true },
  magnesio: { type: Number, required: true },
  manganes: { type: Number, required: true },
  fosforo: { type: Number, required: true },
  ferro: { type: Number, required: true },
  sodio: { type: Number, required: true },
  sodioadicao: { type: Number, required: true },
  potassio: { type: Number, required: true },
  cobre: { type: Number, required: true },
  zinco: { type: Number, required: true },
  selenio: { type: Number, required: true },
  retinol: { type: Number, required: true },
  vitamina_a: { type: Number, required: true },
  tiamina: { type: Number, required: true },
  riboflavina: { type: Number, required: true },
  niacina: { type: Number, required: true },
  niacina_ne: { type: Number, required: true },
  piridoxina: { type: Number, required: true },
  cobalamina: { type: Number, required: true },
  folato: { type: Number, required: true },
  vitamina_d: { type: Number, required: true },
  vitamina_e: { type: Number, required: true },
  vitamina_c: { type: Number, required: true },
});

const Alimento = model<IAlimento>('Alimento', AlimentoSchema);

export { Alimento };

