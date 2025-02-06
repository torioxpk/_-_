const emojis = ["🍎", "🍌", "🍒", "🍉", "🍇", "🍓", "🍍", "🥝", "🥥", "🍋", "🍑", "🍈"];
const totalPairs = emojis.length;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

// สร้างการ์ดทั้งหมด 2 ชุด (เพื่อจับคู่)
function generateCards() {
  const allEmojis = [...emojis, ...emojis];
  allEmojis.sort(() => 0.5 - Math.random()); // สุ่มตำแหน่งการ์ด

  const gameContainer = document.getElementById('game-container');
  gameContainer.innerHTML = '';

  allEmojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
    cards.push(card);
  });
}

// พลิกการ์ด
function flipCard() {
  if (this.classList.contains('flipped') || this.classList.contains('matched') || flippedCards.length === 2) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 700);
  }
}

// ตรวจสอบการจับคู่
function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    document.getElementById('matched').textContent = `คู่ที่จับได้: ${matchedPairs} / ${totalPairs}`;
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '';
    card2.textContent = '';
  }

  flippedCards = [];
  moves++;
  document.getElementById('moves').textContent = `จำนวนการเปิด: ${moves} ครั้ง`;

  if (matchedPairs === totalPairs) {
    setTimeout(() => alert(`ยินดีด้วย! คุณจับคู่ครบทั้งหมดใน ${moves} ครั้ง`), 500);
  }
}

// เริ่มเกมใหม่
function resetGame() {
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  cards = [];
  document.getElementById('moves').textContent = `จำนวนการเปิด: 0 ครั้ง`;
  document.getElementById('matched').textContent = `คู่ที่จับได้: 0 / ${totalPairs}`;
  generateCards();
}

// เพิ่ม Event Listener ให้ปุ่มรีเซ็ต
document.getElementById('reset-btn').addEventListener('click', resetGame);

// เรียกใช้ฟังก์ชันเริ่มเกม
generateCards();