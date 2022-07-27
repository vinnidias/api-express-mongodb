const router = require("express").Router();
import { hash } from 'bcryptjs';
// import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";


router.post("/", async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body
  const toLocaleTimeString = new Date().toLocaleTimeString("pt-br")
  const dateString = new Date().toDateString()

  if (!name) {
    return res.status(422).json({ message: "O nome é um dado obrigatório!" })
  }

  if (!email) {
    return res.status(422).json({ message: "O email é um dado obrigatório!" })
  }
  if (!password) {
    return res.status(422).json({ message: "A senha é um dado obrigatório!" })
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ message: "As senhas não conferem!" })
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ message: "E-mail já cadastrado" })
  }

  const passwordHash = await hash(password, 12)

  const user = new User({
    name,
    email,
    password: passwordHash,
    createdAt: `${dateString} ${toLocaleTimeString}`
  })

  try {
    await user.save()
    res.status(201).json({ message: "Usuário criado com sucesso!" });

  } catch (error) {
    res.status(500).json({ message: "Erro no servidor, tente mais tarde" });
    console.log(error)
  }

})

module.exports = router