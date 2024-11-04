import mongoose, { Schema, Document } from 'mongoose';

// Interface para Alimento utilizado em uma Refeição
interface AlimentoNaRefeicao {
  id: string;
  preparacao: string;
  descricao: string;
  energia: number;
  proteina: number;
  lipidios: number;
  carboidrato: number;
  fibra_alimentar_g: number;
  colesterol_mg: number;
  agsaturado_g: number;
  agmono_g: number;
  agpoli_g: number;
  aglinoleico_g: number;
  aglinolenico_g: number;
  agtranstotal_g: number;
  acucartotal_g: number;
  acucaradicao_g: number;
  calcio_mg: number;
  magnesio_mg: number;
  manganes_mg: number;
  fosforo_mg: number;
  ferro_mg: number;
  sodio_mg: number;
  sodioadicao_mg: number;
  potassio_mg: number;
  cobre_mg: number;
  zinco_mg: number;
  selenio_mg: number;
  retinol_mcg: number;
  vitamina_a_mcg: number;
  tiamina_mg: number;
  riboflavina_mg: number;
  niacina_mg: number;
  niacina_ne_mg: number;
  piridoxina_mg: number;
  cobalamina_mg: number;
  folato_mcg: number;
  vitamina_d_mcg: number;
  vitamina_e_mg: number;
  vitamina_c_mg: number;
}

// Interface para a Refeição
interface Refeicao extends Document {
  tipo: string;
  nomePersonalizado?: string;  // Novo campo opcional
  alimentos: AlimentoNaRefeicao[];
}

// Definição do RefeicaoSchema
const RefeicaoSchema: Schema = new Schema({
  tipo: {
    type: String,
    required: [true, 'O tipo de refeição é obrigatório'],
    enum: {
      values: ['cafeDaManha', 'almoco', 'cafeDaTarde', 'jantar'],
      message: '{VALUE} não é um tipo de refeição válido'
    },
    validate: {
      validator: (v: string) => v !== null && v.trim() !== '',
      message: 'O tipo de refeição não pode ser nulo ou vazio'
    }
  },
  nomePersonalizado: { type: String }, // Campo opcional para nome personalizado
  alimentos: [
    {
      id: { type: String, required: true },
      preparacao: { type: String, required: true },
      descricao: { type: String, required: true },
      energia: { type: Number, required: true },
      proteina: { type: Number, required: true },
      lipidios: { type: Number, required: true },
      carboidrato: { type: Number, required: true },
      fibra_alimentar_g: { type: Number, required: true },
      colesterol_mg: { type: Number, required: true },
      agsaturado_g: { type: Number, required: true },
      agmono_g: { type: Number, required: true },
      agpoli_g: { type: Number, required: true },
      aglinoleico_g: { type: Number, required: true },
      aglinolenico_g: { type: Number, required: true },
      agtranstotal_g: { type: Number, required: true },
      acucartotal_g: { type: Number, required: true },
      acucaradicao_g: { type: Number, required: true },
      calcio_mg: { type: Number, required: true },
      magnesio_mg: { type: Number, required: true },
      manganes_mg: { type: Number, required: true },
      fosforo_mg: { type: Number, required: true },
      ferro_mg: { type: Number, required: true },
      sodio_mg: { type: Number, required: true },
      sodioadicao_mg: { type: Number, required: true },
      potassio_mg: { type: Number, required: true },
      cobre_mg: { type: Number, required: true },
      zinco_mg: { type: Number, required: true },
      selenio_mg: { type: Number, required: true },
      retinol_mcg: { type: Number, required: true },
      vitamina_a_mcg: { type: Number, required: true },
      tiamina_mg: { type: Number, required: true },
      riboflavina_mg: { type: Number, required: true },
      niacina_mg: { type: Number, required: true },
      niacina_ne_mg: { type: Number, required: true },
      piridoxina_mg: { type: Number, required: true },
      cobalamina_mg: { type: Number, required: true },
      folato_mcg: { type: Number, required: true },
      vitamina_d_mcg: { type: Number, required: true },
      vitamina_e_mg: { type: Number, required: true },
      vitamina_c_mg: { type: Number, required: true },
    }
  ]
}, {
  timestamps: true // Habilita createdAt e updatedAt automaticamente
});

// Exporta o modelo de Refeição
const RefeicaoModel = mongoose.model<Refeicao>('Refeicao', RefeicaoSchema);
export default RefeicaoModel;