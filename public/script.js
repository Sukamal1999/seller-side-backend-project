document.addEventListener('DOMContentLoaded', () => {
  const addCandyForm = document.getElementById('addCandyForm');
  const candyList = document.getElementById('candyList');

  addCandyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(addCandyForm);
    
    try {
      const response = await fetch('/candy/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchCandyList();
        addCandyForm.reset();
      } else {
        console.error('Failed to add candy');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  async function fetchCandyList() {
    try {
      const response = await fetch('/candy');
      const candyData = await response.json();
      
      candyList.innerHTML = '';

      candyData.forEach(candy => {
        addCandyToUI(candy.candyName, candy.description, candy.price, candy.quantity);
      });
    } catch (error) {
      console.error('Error fetching candy list:', error);
    }
  }

  function addCandyToUI(candyName, description, price, quantity) {
    const li = document.createElement('li');
    li.innerHTML = `
      <p><strong>${candyName}</strong></p>
      <p>${description}</p>
      <p>Price: $${price.toFixed(2)}</p>
      <p>Quantity: ${quantity}</p>
      <form class="buy-form">
        <input type="number" name="quantityToBuy" placeholder="Quantity to Buy" required>
        <button type="submit">Buy</button>
      </form>
      <hr>
    `;

    const buyForm = li.querySelector('.buy-form');
    buyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const quantityToBuy = parseInt(buyForm.querySelector('[name="quantityToBuy"]').value);
      
      if (quantityToBuy <= 0) {
        return;
      }
      
      try {
        const response = await fetch('/candy/buy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ candyName, quantityToBuy }),
        });

        if (response.ok) {
          fetchCandyList();
        } else {
          console.error('Failed to buy candy');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    candyList.appendChild(li);
  }

  fetchCandyList();
});
