const express = require('express');
const router = express.Router();

let candies = [];

// Get all candies
router.get('/', (req, res) => {
  res.json(candies);
});

// Add a new candy
router.post('/add', (req, res) => {
  const { candyName, description, price, quantity } = req.body;
  const candy = { candyName, description, price, quantity: parseInt(quantity) };
  candies.push(candy);
  res.status(201).json({ message: 'Candy added successfully' });
});

// Buy candy
router.post('/buy', (req, res) => {
  const { candyName, quantityToBuy } = req.body;
  const candyIndex = candies.findIndex(candy => candy.candyName === candyName);

  if (candyIndex === -1) {
    return res.status(404).json({ message: 'Candy not found' });
  }

  const candy = candies[candyIndex];
  if (candy.quantity >= quantityToBuy) {
    candy.quantity -= quantityToBuy;
    res.json({ message: `Bought ${quantityToBuy} ${candy.candyName}(s)` });
  } else {
    res.status(400).json({ message: 'Not enough quantity available' });
  }
});

module.exports = router;
