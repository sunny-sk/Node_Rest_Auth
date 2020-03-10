const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../model/customer.model");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const customer = await Customer.find().sort("name");
    res.status(200).send({ success: true, customer });
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send({ success: false, result: "not found" });
    }
    res.status(200).send({ success: true, customer });
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res, next) => {
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
    res.status(201).send({ success: true, code: 201, customer });
  })
);

router.put(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
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
      return res
        .status(404)
        .send({ success: false, code: 404, result: "not found" });
    res.status(200).send({ success: true, code: 200, customer });
  })
);

router.delete(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .send({ success: false, code: 404, result: "not found" });
    }
    res.status(200).send({ success: true, code: 200, customer });
  })
);

module.exports = router;
