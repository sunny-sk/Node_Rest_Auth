const express = require("express");
const router = express.Router();

const { Customer, validateCustomer } = require("../model/customer.model");

router.get("/", async (req, res, next) => {
  try {
    const customer = await Customer.find().sort("name");
    res.status(200).send({ success: true, customer });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send({ success: false, result: "not found" });
    }
    res.status(200).send({ success: true, customer });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    let customer = new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    });
    customer = await customer.save();
    res.status(201).send({ success: true, customer });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details);

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      },
      {
        new: true
      }
    );
    if (!customer)
      return res.status(404).send({ success: false, result: "not found" });
    res.status(200).send({ success: true, customer });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
      return res.status(404).send({ success: false, result: "not found" });
    }
    res.status(200).send({ success: true, customer });
  } catch (error) {}
});

module.exports = router;
