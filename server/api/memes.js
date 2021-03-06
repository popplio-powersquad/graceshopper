const router = require('express').Router();
const Meme = require('../db/models/Meme');
module.exports = router;
const { body, validationResult } = require('express-validator');
const { requireToken, isAdmin } = require('../security/gatekeeping');

router.get('/', async (req, res, next) => {
  try {
    const memes = await Meme.findAll();
    res.json(memes);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const info = req.body;
    const meme = await Meme.create(info);
    res.json(meme);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const meme = await Meme.findByPk(id);
    if (meme) {
      res.json(meme);
    } else {
      res.status(404).send('this meme does not exist');
    }
  } catch (error) {
    next(error);
  }
});

//validate if price is valid currency value
router.put(
  '/:id',
  requireToken,
  isAdmin,
  body('price').isCurrency({ allow_negatives: false }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.mapped();
      }
      const meme = await Meme.findByPk(req.params.id);
      const info = req.body;
      const data = await meme.update(info);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);
