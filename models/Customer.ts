import mongoose from "mongoose";

type ICostumer = {
  name: string;
  email: string;
  cellphone: string;
  message?: string;
  createdAt: string;
  updatedAt?: string 
}

const ConstumerSchema = new mongoose.Schema<ICostumer>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  cellphone: {type: String, required: true},
  message: String,
  createdAt: {type: String, required: true},
  updatedAt: String
})

export const Customer = mongoose.model<ICostumer>("Costumer", ConstumerSchema)

