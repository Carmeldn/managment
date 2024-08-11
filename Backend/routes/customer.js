var express = require("express")
const router = express.Router()
var {Customer} = require('../models')


router.get('/', async(req,res)=>{
    try {
        const customer = await Customer.findAll()
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/:id', async(req,res)=>{
    const{id} = req.params
    try {
        const customer = await Customer.findByPk(id)
        if (!customer) {
          return res.status(404).json({ error: "Customer not found!" });
        }
        res.status(200).json(customer)
    } catch (error) {
        res.status(400).json({error : error.message})
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
        res.status(200).json(newCustomer)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/:id', async(req,res)=>{
    const {id} = req.params
    const{first_name,last_name,phone,adresse} = req.body
    try {
        const customer = await Customer.findByPk(id)
        if(!customer){
            res.status(400).json({error:'Customer not found'})
        }
        customer.first_name = first_name || customer.first_name
        customer.last_name = last_name || customer.last_name
        customer.phone = phone || customer.phone
        customer.adresse = adresse || adresse

        await customer.save()
        res.status(200).json(customer)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.delete('/:id', async(req,res)=>{
    const{id} = req.params
    try {
        const customer = await Customer.findByPk(id)
        if(!customer){
          return  res.status(400).json({error:'Customer not found'})
        }

        await customer.destroy()
      return  res.status(200).send()
    } catch (error) {
      return  res.status(400).json({error: error.message})
    }
})

    module.exports = router;
