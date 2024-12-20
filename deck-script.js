const deckContainer = document.getElementById('deck-container');
const cardsGallery = document.getElementById('cards-gallery');
const searchBar = document.getElementById('search-bar');
const clearDeckButton = document.getElementById('clear-deck');
const viewMoreButton = document.getElementById('view-more');
const viewMoreContainer = document.getElementById('view-more-container');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const logoutLink = document.getElementById('logout-link');
const logoutLinkText = document.getElementById('logout-link-text');

let deck = JSON.parse(localStorage.getItem('userDeck')) || [];
let allCards = [];
let cardsToShow = 24;  // Initial number of cards to show (for "View More")

// Function to check if the user is logged in
function checkLoginStatus() {
  if (localStorage.getItem('loggedIn') === 'true') {
    loginLink.style.display = 'none';  // Hide login link
    registerLink.style.display = 'none';  // Hide register link
    logoutLink.style.display = 'block';  // Show logout link
  } else {
    loginLink.style.display = 'block';  // Show login link
    registerLink.style.display = 'block';  // Show register link
    logoutLink.style.display = 'none';  // Hide logout link
  }
}

// Function to log the user out
function logout() {
  localStorage.setItem('loggedIn', 'false');
  localStorage.removeItem('currentUser');  // Optionally clear the stored user data
  checkLoginStatus();  // Update the navbar
  alert('You have been logged out.');
}

// Attach logout function to the logout link
logoutLinkText.addEventListener('click', logout);

// display deck
function displayDeck() {
  deckContainer.innerHTML = '';
  deck.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('relative', 'inline-block', 'm-0');
    cardElement.innerHTML = `
  <div class="relative inline-block m-0"> <!-- Hapus spasi di sini -->
    <img src="${card.card_images[0].image_url}" alt="Card" class="w-40 h-auto shadow-md cursor-pointer card-${index} block" onload="onImageLoad(${index})" style="margin: 0;">
    <button class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-800 focus:outline-none" style="margin-top: -5px; margin-right: -5px;" onclick="removeCardFromDeck(${index})">
      X
    </button>
  </div> <!-- Jangan ada spasi di sini -->
`;

    deckContainer.appendChild(cardElement);
  });
}


// Function to fetch available cards from the API
async function fetchAvailableCards() {
  try {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      allCards = data.data;  // Save all available cards
      displayAvailableCards(allCards.slice(0, cardsToShow));  // Display initial cards
    }
  } catch (error) {
    console.error('Error fetching available cards:', error);
  }
}
function displayAvailableCards(cards) {
  cardsGallery.innerHTML = '';  // Clear previous results
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('text-center', 'p-2', 'cursor-pointer');
    cardElement.innerHTML = `
  <div class="relative">
    <img src="${card.card_images[0].image_url}" alt="Card" class="w-40 h-auto m-2 shadow-md cursor-pointer" onload="onImageLoad(${index})">
    <div class="absolute inset-0 flex justify-center items-center bg-gray-500 opacity-50 hidden" id="loading-${index}">
      <div class="spinner-border animate-spin w-8 h-8 border-t-2 border-white rounded-full"></div>
    </div>
  </div>
`;
    cardElement.addEventListener('click', () => addCardToDeck(card));
    cardsGallery.appendChild(cardElement);
  });
}

// Function to show the loading spinner when the image is loading
function onImageLoad(index) {
  const loadingElement = document.getElementById(`loading-${index}`);
  if (loadingElement) {
    loadingElement.classList.add('hidden');
  }
}

// Function to filter cards based on the search query
function searchCards() {
  const query = searchBar.value.toLowerCase();
  const filteredCards = allCards.filter(card => card.name.toLowerCase().includes(query));
  displayAvailableCards(filteredCards);
}

// Function to add a card to the deck (up to 3 identical cards)
function addCardToDeck(card) {
  if (deck.length >= 40) {
    alert('Your deck can only hold up to 40 cards.');
    return; // Stop the function if deck is full
  }

  const cardCount = deck.filter(existingCard => existingCard.id === card.id).length;

  if (cardCount < 3) {
    deck.push(card);
    localStorage.setItem('userDeck', JSON.stringify(deck));
    displayDeck(); // Re-render deck
  } else {
    alert('You can only add up to 3 identical cards.');
  }
}


// Function to remove a card from the deck
function removeCardFromDeck(index) {
  deck.splice(index, 1); // Remove the card from the deck array
  localStorage.setItem('userDeck', JSON.stringify(deck));
  displayDeck(); // Re-render deck
}

// Function to clear the deck
clearDeckButton.addEventListener('click', () => {
  deck = [];
  localStorage.removeItem('userDeck');
  displayDeck(); // Re-render deck after clearing
});

// View More Button Logic
viewMoreButton.addEventListener('click', () => {
  cardsToShow += 12;  // Increase the number of cards to show
  displayAvailableCards(allCards.slice(0, cardsToShow));  // Display the next set of cards
  // If all cards are displayed, hide the "View More" button
  if (cardsToShow >= allCards.length) {
    viewMoreContainer.style.display = 'none';
  }
});

// Initial setup
checkLoginStatus();  // Check if the user is logged in
displayDeck();
fetchAvailableCards();
