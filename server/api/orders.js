const router = require('express').Router();
const {
    models: { User, Meme, Order, OrderItem },
  } = require('../db');
  module.exports = router;

router.get('/', async (req, res, next) => {
    try{
        const Orderss = await Order.findAll()
        res.json(Orderss)
    }catch(error){
        next(error)
    }
})

//finds open order by userId and changes status to complete
router.patch('/:id', async (req, res, next) => {
    try{
        const openOrder = await Order.findOne({
            where:
            {
                userId: req.params.id,
                status: 'open'
            }
        })

        if(openOrder.id){
            openOrder.update({status: 'complete'})
            res.status(200)
        }

    } catch(error) {
        next(error)
    }
})

//posts new open order to given order id if no open order exists
router.post('/:id', async (req,res,next) => {
    try{
        const openOrder = await Order.findOne({
            where:
            {
                userId: req.params.id,
                status: 'open'
            }
        })
        
        if(openOrder === null){
            const user = await User.findByPk(req.params.id)
            
            const newOrder = await Order.create()
            res.status(201).send(newOrder)
        } else throw new Error('Open Order Already Exists')
    }catch(error){
        next(error)
    }
})