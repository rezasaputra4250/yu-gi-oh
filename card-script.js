let userDeck = localStorage.getItem('userDeck');

if (userDeck) {
  try {
    userDeck = JSON.parse(userDeck);

    if (Array.isArray(userDeck) && userDeck.length > 0) {
      let deckContainer = document.getElementById('deck-container');

      userDeck.forEach(card => {
        let cardImageUrl = card.card_images && card.card_images[0] && card.card_images[0].image_url_small;

        if (cardImageUrl) {
          let cardImage = document.createElement('img');
          cardImage.src = cardImageUrl;
          cardImage.classList.add('w-40', 'h-auto', 'm-2', 'shadow-md', 'cursor-pointer');

          cardImage.addEventListener('click', () => {
            openModal(card.card_images[0].image_url);
          });

          deckContainer.appendChild(cardImage);
        } else {
          let noImageText = document.createElement('p');
          noImageText.innerText = 'No image available';
          noImageText.classList.add('text-gray-500', 'text-center', 'mt-2');

          deckContainer.appendChild(noImageText);
        }
      });
    } else {
      document.getElementById('deck-container').innerText = 'No valid cards in the deck.';
    }
  } catch (e) {
    console.error('Terjadi kesalahan saat parsing JSON:', e);
    document.getElementById('deck-container').innerText = 'Error loading card data.';
  }
} else {
  document.getElementById('deck-container').innerText = 'No cards selected yet.';
}

function openModal(imageUrl) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  modal.classList.remove('hidden');
  modalImage.src = imageUrl;
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('imageModal').classList.add('hidden');
});

document.getElementById('imageModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('imageModal').classList.add('hidden');
  }
});
