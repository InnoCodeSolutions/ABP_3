import mongoose from "mongoose";
const { Schema } = mongoose;

// define os schemas
const UserSchema = new Schema({
  mail: {
    type: String,
    maxlength: [50, "O e-mail pode ter no máximo 30 caracteres"],
    unique: true,
    required: [true, "O e-mail é obrigatório"],
    validate: {
      validator: function (value: string) {
        // expressão regular para validar o formato do e-mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      },
      message: (props: any) =>
        `${props.value} não é um formato de e-mail válido`,
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, "A senha precisa ter no mínimo 6 caracteres"],
    maxlength: [10, "A senha precisa ter no máximo 10 caracteres"],
    select: false,
    required: [true, "A senha é obrigatória"],
  },
  name: {
    type: String,
    trim: true,
    select: false,
  required: [true, "O nome é obrigatório"],
  },  
  lastName: {
    type: String,
    trim: true,
    select: false,
    required: [true, "O sobrenome é obrigatório"],
  }

});

// mongoose.model compila o modelo
const PerfilSchema = new Schema({
  mail: {
    type: String,
    maxlength: [50, "O e-mail pode ter no máximo 30 caracteres"],
    unique: true,
    required: [true, "O e-mail é obrigatório"],
    validate: {
      validator: function (value: string) {
        // expressão regular para validar o formato do e-mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      },
      message: (props: any) =>
        `${props.value} não é um formato de e-mail válido`,
    }},
  peso: {
    type: Number, // Alterado para Number para representar pesos de forma mais apropriada
    required: [true, "O peso é obrigatório"],
    min: [0, "O peso deve ser um valor positivo"], // Validação para garantir que o peso seja positivo
  },
  altura: {
    type: Number, // Alterado para Number para representar alturas de forma mais apropriada
    required: [true, "A altura é obrigatória"],
    min: [0, "A altura deve ser um valor positivo"], // Validação para garantir que a altura seja positiva
  },
  idade: {
    type: Number, // Alterado para Number para representar idades de forma mais apropriada
    required: [true, "A idade é obrigatória"],
    min: [0, "A idade deve ser um valor positivo"], // Validação para garantir que a idade seja positiva
    max: [150, "A idade deve ser um valor razoável (0-150)"], // Validação para garantir que a idade esteja dentro de um intervalo razoável
  },
  atividade: {
    type: String, // Alterado para Number para representar idades de forma mais apropriada
    required: [true, "Atividade é Obrigatória"],
    min: [0, "A Atividade deve ser um valor positivo"], // Validação para garantir que a idade seja positiva
    max: [150, "A Atividade deve ser um valor razoável (0-30)"], // Validação para garantir que a idade esteja dentro de um intervalo razoável
  },
  genero: {
    type: String, // Alterado para Number para representar idades de forma mais apropriada
    required: [true, "Genero é Obrigatória"],
    min: [0, "A Genero deve ser um valor positivo"], // Validação para garantir que a idade seja positiva
    max: [12, "A Genero deve ser um valor razoável (0-30)"], // Validação para garantir que a idade esteja dentro de um intervalo razoável
  },
  tmb: { type: Number, required: true }
})

// mongoose.model compila o modelo
const User = mongoose.model("User", UserSchema);
const Perfil = mongoose.model("Perfil", PerfilSchema)
export { Perfil,User };

