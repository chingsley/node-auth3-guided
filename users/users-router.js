const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/checkRole');

router.get('/', restricted, checkRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id', restricted, (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      console.log('\n user = ', user, '\n');
      if (user) {
        res.json(user);
      } else {
        return res.status(404).json({ message: `Not found. No user matches the id of ${req.params.id}.` });
      }
    })
    .catch(err => res.status(500).json({ message: 'internal server error' }));
});

module.exports = router;
