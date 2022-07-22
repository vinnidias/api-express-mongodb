const router = require("express").Router();
import { Request, Response } from "express";
import { Customer } from "../models/Customer";

router.post("/", async (req: Request, res: Response) => {
  const { name, email, cellphone, message } = req.body

  const toLocaleTimeString = new Date().toLocaleTimeString("pt-br")
  const dateString = new Date().toDateString()

  if (!name || !email || !cellphone) {
    res.status(422).json({ message: "some required data missed!" })
    return
  }

  const customer = {
    name,
    email,
    cellphone,
    message,
    createdAt: `${dateString} ${toLocaleTimeString}`
  }

  try {
    await Customer.create(customer)
    res.status(201).json({ message: "Customer create sucess!" })
  } catch (error) {
    res.status(500).json({ message: "Server problems! Try later" })
    console.log("create fail: ", error)
  }
})

router.get("/", async (req: Request, res: Response) => {
  try {
    const allCustomers = await Customer.find();
    res.status(200).json(allCustomers)
  } catch (error) {
    res.status(500).json({ message: "Server problems! Try later" })
    console.log("create fail: ", error)
  }
})


router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const customer = await Customer.findOne({ _id: id });
    if (!customer) {
      res.status(422).json({ message: "Invalid ID, customer not found!" });
      return
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ message: "Server problems! Try later" })
    console.log("create fail: ", error)
  }
})


router.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const toLocaleTimeString = new Date().toLocaleTimeString("pt-br")
  const dateString = new Date().toDateString()

  const { name, email, cellphone, message } = req.body
  const customer = { name, email, cellphone, message, updatedAt: `${dateString} ${toLocaleTimeString}` }

  try {
    const updateCustomer = await Customer.updateOne({ _id: id }, customer)

    if (updateCustomer.matchedCount === 0) {
      res.status(422).json({ message: "Customer not found!" });
      return
    }

    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ message: "Server problems! Try later" })
    console.log("create fail: ", error)
  }

})

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const customer = await Customer.findOne({ _id: id });
  if (!customer) {
    res.status(422).json({ message: "Customer not found!" });
    return
  }

  try {
    await Customer.deleteOne({ _id: id });

    res.status(200).json({ message: "Customer successfully removed" })
  } catch (error) {
    res.status(500).json({ message: "Server problems! Try later" })
    console.log("create fail: ", error)
  }
})

module.exports = router