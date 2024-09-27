class GameBoard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(this.#template());
  
      this.cardList = this.shadowRoot.querySelector('.memory-board');
      
      // Cards data (You can expand this list)
      this.cards = [
        { path: "./img/1_pig.png", id: 1 },
        { path: "./img/2_squirrel.png", id: 2 },
        { path: "./img/3_rabbit.png", id: 3 },
        { path: "./img/4_frog.png", id: 4 },
        { path: "./img/5_fox.png", id: 5 },
        { path: "./img/6_bear.png", id: 6 },
        { path: "./img/7_monkey.png", id: 7 },
        { path: "./img/8_panda.png", id: 8 },
        { path: "./img/9_chick.png", id: 9 },
        { path: "./img/10_tiger.png", id: 10 },
        { path: "./img/11_penguin.png", id: 11 },
        { path: "./img/12_racoon.png", id: 12 },
        { path: "./img/1_pig.png", id: 1 },
        { path: "./img/2_squirrel.png", id: 2 },
        { path: "./img/3_rabbit.png", id: 3 },
        { path: "./img/4_frog.png", id: 4 },
        { path: "./img/5_fox.png", id: 5 },
        { path: "./img/6_bear.png", id: 6 },
        { path: "./img/7_monkey.png", id: 7 },
        { path: "./img/8_panda.png", id: 8 },
        { path: "./img/9_chick.png", id: 9 },
        { path: "./img/10_tiger.png", id: 10 },
        { path: "./img/11_penguin.png", id: 11 },
        { path: "./img/12_racoon.png", id: 12 },
      ];
  
      this.flippedCards = [];  
      this.lockBoard = false; // Prevent further clicks during flips
    
      // Shuffle the cards before rendering
      this.shuffle(this.cards);
    
      // Display the shuffled cards
      this.displayCards(this.cards);
    }

    shuffle(array) {

      let currentIndex = array.length;
      while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]
        ];
      }
    }
    
    displayCards(cards) {
      cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id; // Store the card ID for match checking
  
        // Create an img element for each card
        const imgElement = document.createElement('img');
        imgElement.src = './img/back.png'; // Initial back image
  
        // Append the img to the card div
        cardElement.appendChild(imgElement);
        
        // Append the card element to the container
        this.cardList.appendChild(cardElement);
  
        // Add click event to flip the card
        cardElement.addEventListener('click', () => this.flipCard(cardElement, card));
      });
    }
  
    flipCard(cardElement, card) {
      if (this.lockBoard || cardElement.classList.contains('flipped')) return; // Prevent action if board is locked or card is already flipped
      
      cardElement.classList.add('flipped');
      const imgElement = cardElement.querySelector('img');
      imgElement.src = card.path; // Reveal the card's front image (animal image)
  
      this.flippedCards.push(cardElement);
  
      if (this.flippedCards.length === 2) {
        this.checkForMatch();
      }
    }
  
    checkForMatch() {
      const [card1, card2] = this.flippedCards;
      const id1 = card1.dataset.id;
      const id2 = card2.dataset.id;
  
      if (id1 === id2) {
        // Cards match
        this.disableCards();
      } else {
        // No match
        this.unflipCards();
      }
    }
  
    disableCards() {
      // Disable click on matched cards
      this.flippedCards.forEach(card => {
        card.removeEventListener('click', this.flipCard);
      });
      this.flippedCards = []; // Reset flipped cards array
    }
  
    unflipCards() {
      this.lockBoard = true; // Lock the board
  
      setTimeout(() => {
        this.flippedCards.forEach(card => {
          card.classList.remove('flipped');
          card.querySelector('img').src = './img/back.png'; // Flip back to the back image
        });
  
        this.flippedCards = [];
        this.lockBoard = false; // Unlock the board
      }, 1000); // Wait 1 second before flipping back
    }

    #template() {
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
  
          .memory-board {
            display: grid;
            grid-template-columns: repeat(6, 150px);
            grid-template-rows: repeat(4, 152px);
            grid-gap: 15px;
            justify-content: center;
            align-items: center;
            margin: 50px auto;
            background-color: #FDD017;
          }
  
          .card {
            width: 100%;
            height: auto;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.5s;
            cursor: pointer;
          }
  
          .card:hover {
            transform: scale(1.05);
          }
          
          .card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
  
          .card.flipped img {
            transform: rotateY(180deg); /* Flip image */
          }
        </style>
  
        <div class="memory-board"></div>
      `;
      return template.content.cloneNode(true);
    }
  }
  
  window.customElements.define('game-board', GameBoard);