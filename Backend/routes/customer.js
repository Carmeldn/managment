var express = require("express")
const router = express.Router()
var {Customer} = require('../models')


router.get('/', async(req,res)=>{
    try {
        const customer = await Customer.findAll()
        res.json({ success: true, message: "Successfully recovered customers", customer });
    } catch (error) {
        console.error("Error while retrieving customers:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
})

router.get('/:id', async(req,res)=>{
    const{id} = req.params
    try {
        const customer = await Customer.findByPk(id)
        if (customer) {
            res.json({ success: true, message: "Successfully recovered customer", customer });
        }
        else{
            res.status(404).json({ success: false, message: "Customer not found" });
        }
    } catch (error) {
        console.error("Error Retrieving the customer::", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
})

router.post('/', async(req,res)=>{
    const {first_name,last_name,phone,adresse} = req.body
    try {
        const newCustomer = await Customer.create({
          first_name,
          last_name,
          phone,
          adresse,
        });
        res.status(201).json({ success: true, message: "Successfully created customer", newCustomer });
    } catch (error) {
        console.error("Error creating the customer:", error.message);
    res.status(500).json({ success: false, message: "server error" });
    }
})

router.put('/:id', async(req,res)=>{
    const {id} = req.params
    const{first_name,last_name,phone,adresse} = req.body
    try {
        const customer = await Customer.findByPk(id)
        if(customer){
       
        customer.first_name = first_name || customer.first_name
        customer.last_name = last_name || customer.last_name
        customer.phone = phone || customer.phone
        customer.adresse = adresse || adresse

        await customer.save()
        res.json({ success: true, message: "Successfully updated customer", customer });
        }
        else{
            res.status(404).json({ success: false, message: "customer not found" });
        }
    } catch (error) {
        console.error("Error when modifying the customer:", error.message);
        res.status(500).json({ success: false, message: "server error" });    }
})

router.delete("/:id", async (req, res) => {
    try {
      const customer = await Customer.findByPk(req.params.id);
      if (customer) {
        await customer.destroy();
        res.status(200).json({ success: true, message: "Customer Successfully Deleted" });
      } else {
        res.status(404).json({ success: false, message: "Customer not found" });
      }
    } catch (error) {
      console.error("Error deleting customer:", error.message);
      res.status(500).json({ success: false, message: "server error" });
    }
  });

    module.exports = router;
