// Mendapatkan userDeck dari localStorage, jika tidak ada maka mengatur deck default (40 kartu)
const userDeck = JSON.parse(localStorage.getItem('userDeck')) || generateDefaultDeck();
console.log('User deck:', userDeck);

// Membuat salinan acakDeck dari userDeck
let acakDeck = shuffleDeck([...userDeck]);
console.log('Initial acakDeck:', acakDeck);

// Inisialisasi Hand Zone
const handZone = document.getElementById("hand-zone");

// Tombol Draw Card
const drawCardButton = document.getElementById("draw-card-btn");

// Menyimpan life points yang bisa digunakan dalam permainan
let lifePoints = parseInt(localStorage.getItem('lifePoints')) || 8000;
console.log('Initial lifePoints:', lifePoints);

function generateDefaultDeck() {
    const defaultDeck = [
        { card_images: [{ image_url: 'image_url_1' }], name: 'Card 1', type: 'Monster Card' },
        { card_images: [{ image_url: 'image_url_2' }], name: 'Card 2', type: 'Spell Card' },
    ];
    localStorage.setItem('userDeck', JSON.stringify(defaultDeck));
    console.log('Default deck generated:', defaultDeck);
    return defaultDeck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log('Deck shuffled:', deck);
    return deck;
}

function startGame() {
    acakDeck = shuffleDeck([...userDeck]);
    localStorage.setItem('acakDeck', JSON.stringify(acakDeck));
    console.log('Game started, acakDeck reset and shuffled:', acakDeck);

    const handZone = document.getElementById('hand-zone');
    handZone.innerHTML = '<h3 class="w-full text-center mb-2">Hand Zone</h3>';

    const initialHand = acakDeck.slice(0, 5);
    console.log('Initial hand:', initialHand);

    initialHand.forEach((card, index) => {
        const cardImage = document.createElement('img');
        const imageUrl = card.card_images[0].image_url;
        cardImage.src = imageUrl;
        cardImage.alt = card.name;
        cardImage.classList.add('card', 'cursor-pointer', 'mb-2');
        cardImage.setAttribute('data-card-id', index);
        cardImage.setAttribute('data-card-type', card.type);
        handZone.appendChild(cardImage);

        cardImage.addEventListener('click', function () {
            moveCardToZone(cardImage);
        });
    });

    acakDeck = acakDeck.slice(5);
    localStorage.setItem('acakDeck', JSON.stringify(acakDeck));
    console.log('Updated acakDeck after drawing 5 cards:', acakDeck);
}

function moveCardToZone(cardImage) {
    const cardType = cardImage.getAttribute('data-card-type');
    console.log(cardType);

    let targetZone;
    let zoneId;
    let zone;

    // Cek jenis kartu dan tentukan zona tujuan
    if (cardType === 'Spell Card' || cardType == 'Trap Card') {
        // Periksa zona satu per satu
        zoneId = 'spell-trap-zone-1';
        zone = document.getElementById(zoneId);
        console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

        // Cek apakah zona hanya memiliki elemen <h3>, jika ya, dianggap kosong untuk kartu
        if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
            targetZone = zone;  // Pilih zona yang kosong untuk kartu
            console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
        }

        // Jika zona 1 sudah terisi, periksa zona 2
        if (!targetZone) {
            zoneId = 'spell-trap-zone-2';
            zone = document.getElementById(zoneId);
            console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

            if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
                targetZone = zone;
                console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
            }
        }

        // Jika zona 2 sudah terisi, periksa zona 3
        if (!targetZone) {
            zoneId = 'spell-trap-zone-3';
            zone = document.getElementById(zoneId);
            console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

            if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
                targetZone = zone;
                console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
            }
        }

        // Cek zona 4 dan 5 jika diperlukan
        if (!targetZone) {
            zoneId = 'spell-trap-zone-4';
            zone = document.getElementById(zoneId);
            console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

            if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
                targetZone = zone;
                console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
            }
        }

        if (!targetZone) {
            zoneId = 'spell-trap-zone-5';
            zone = document.getElementById(zoneId);
            console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

            if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
                targetZone = zone;
                console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
            }
        }
    } else if (cardType === 'Monster Card' || cardType === 'Normal Monster' || cardType === 'Effect Monster' || cardType === 'Flip Effect Monster') {
        // Sama seperti sebelumnya, periksa setiap zona untuk Monster Card
        zoneId = 'monster-zone-1';
        zone = document.getElementById(zoneId);
        console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

        if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
            targetZone = zone;
            console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
        }

        if (!targetZone) {
            zoneId = 'monster-zone-2';
            zone = document.getElementById(zoneId);
            console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

            if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
                targetZone = zone;
                console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
            }
        }

        if (!targetZone) {
            zoneId = 'monster-zone-3';
            zone = document.getElementById(zoneId);
            console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

            if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
                targetZone = zone;
                console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
            }
        }

        if (!targetZone) {
            zoneId = 'monster-zone-4';
            zone = document.getElementById(zoneId);
            console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

            if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
                targetZone = zone;
                console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
            }
        }

        if (!targetZone) {
            zoneId = 'monster-zone-5';
            zone = document.getElementById(zoneId);
            console.log(`Mengecek ${zoneId}, jumlah anak: ${zone.children.length}`);

            if (zone && zone.children.length === 1 && zone.querySelector('h3')) {
                targetZone = zone;
                console.log(`${zoneId} kosong, bisa dipindahkan kartu`);
            }
        }
    }

    // Jika zona ditemukan, pindahkan cardImage ke zona tersebut
    if (targetZone) {
        targetZone.appendChild(cardImage);
        console.log('Card moved to', targetZone.id);
    } else {
        console.log('No empty zone found');
    }
}

function drawCard() {
    if (acakDeck.length > 0) {
        // Mengambil kartu pertama dari Deck
        const drawnCard = acakDeck.shift();

        // Menyimpan perubahan deck kembali ke LocalStorage
        // localStorage.setItem("acakDeck", JSON.stringify(acakDeck));

        // Menampilkan kartu di Hand Zone
        const cardImage = document.createElement('img');
        const imageUrl = drawnCard.card_images[0].image_url; // Gunakan drawnCard
        cardImage.src = imageUrl;
        cardImage.alt = drawnCard.name;
        cardImage.classList.add('card', 'cursor-pointer', 'mb-2');
        cardImage.setAttribute('data-card-name', drawnCard.name);
        cardImage.setAttribute('data-card-type', drawnCard.type);
        handZone.appendChild(cardImage);

        // Tambahkan event listener untuk memindahkan kartu
        cardImage.addEventListener('click', function () {
            moveCardToZone(cardImage);
        });

        console.log(`Kartu ditarik: ${drawnCard.name}`);
    } else {
        alert("Deck kosong! Tidak ada kartu yang dapat ditarik.");
    }
}


// Tambahkan event listener pada tombol Draw Card
drawCardButton.addEventListener("click", drawCard);


startGame();
