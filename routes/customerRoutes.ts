const router = require("express").Router();
import { Request, Response } from "express";
import { Customer } from "../models/Customer";

router.post("/", async (req: Request, res: Response)=> {
  const {name, email, cellphone, message} = req.body

  if(!name || !email || !cellphone) {
    res.status(422).json({message: "some required data missed!"})
  }

  const customer = {
    name, 
    email, 
    cellphone, 
    message
  }

  try {
    await Customer.create(customer)
    res.status(201).json({message: "Customer create sucess!"})
  } catch (error) {
    res.status(500).json({message: "Server problems! Try later"})
    console.log("create fail: ", error)
  }
})

module.exports = router