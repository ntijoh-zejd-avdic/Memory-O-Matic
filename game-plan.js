class GameBoard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(this.#template());
      
      this.cardList = this.shadowRoot.querySelector('.memory-board');
    //   this.card = this.shadowRoot.querySelectorAll('.card')
  
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
      ];
  
      // Shuffle the cards before rendering
      this.shuffle(this.cards);
  
      // Display the shuffled cards
      this.displayCards(this.cards);
    }

    connectedCallback() {
        // You don't need to add an event listener here since you're doing it in displayCards.
    }

    Flip_card(){

        alert("Är du säker?")
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
        // Loop through the cards and create an HTML element for each one
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            // Create an img element for each card
            const imgElement = document.createElement('img');
            imgElement.id = card.path;
            imgElement.src = './img/back.png'; // Set the image source

            // Append the img to the card div
            cardElement.appendChild(imgElement);

            // Add a click event listener for each card
            cardElement.addEventListener('click', this.Flip_card);

            // Append the card element to the container
            this.cardList.appendChild(cardElement);
        });
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
            transform: scale(1);
            transform-style: preserve-3d;
            transition: transform 0.5s;
          }
  
          .card:hover {
            transform: scale(1.05);
          }
          
          .card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        </style>
  
        <div class="memory-board"></div>
      `;
      return template.content.cloneNode(true);
    }
  }
  
  window.customElements.define('game-board', GameBoard);
  