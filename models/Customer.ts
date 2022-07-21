import mongoose from "mongoose";

type ICostumer = {
  name: string;
  email: string;
  cellphone: string;
  message?: string;
}

const ConstumerSchema = new mongoose.Schema<ICostumer>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  cellphone: {type: String, required: true},
  message: String
})

export const Customer = mongoose.model<ICostumer>("Costumer", ConstumerSchema)

