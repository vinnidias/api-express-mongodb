const router = require("express").Router();
require("dotenv");
import { hash, compare } from 'bcryptjs';
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { User } from "../models/User";



router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).json({ message: "O email é um dado obrigatório!" })
  }
  if (!password) {
    return res.status(422).json({ message: "A senha é um dado obrigatório!" })
  }

  const user = await User.findOne({ email: email });
  const userReturnedObject = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    createdAt: user?.createdAt
  } 

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" })
  }

  const checkPassword = await compare(password, user.password)

  if (!checkPassword) {
    return res.status(422).json({ message: "Senha inválida" })
  }

  try {
    const secret = process.env.SECRET

    const token = jwt.sign({
      id: user._id,
    }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTE0YzZkNDQ3ZDZmMzhiMjYxMTliOCIsImlhdCI6MTY1ODk0MjUzNn0.RYmjW1jANLPvGAIGdbKFfMC-4qgBUvZsmueYKyWD0-I")

    res.status(200).json({ message: "Autenticação realizada com sucesso.", token, user: userReturnedObject })

  } catch (error) {
    res.status(500).json({ message: "Erro no servidor, tente mais tarde" });
    console.log(error)
  }

});

module.exports = router