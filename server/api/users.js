const router = require('express').Router();
const { User, Meme, Order, OrderItem } = require('../db');
module.exports = router;
const { requireToken, isAdmin } = require('../security/gatekeeping');

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'username',
        'email',
        'street1',
        'street2',
        'city',
        'state',
        'zip',
        'phoneNumber',
        'firstName',
        'lastName',
        'roleId',
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id',requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User doesnt not exist');
    }
  } catch (err) {
    next(err);
  }
});
router.put('/:id/update', requireToken, async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findByPk(req.params.id);
    const updated = await user.update(req.body);
    res.json(updated);
  } catch (error) {
    next(console.error(error));
  }
});

router.delete('/:id',requireToken,isAdmin, async (req, res, next) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.id },
    });
    if (user) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/update',requireToken, isAdmin, async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findByPk(req.params.id);
    const updated = await user.update(req.body);
    res.json(updated);
  } catch (error) {
    next(console.error(error));
  }
});
