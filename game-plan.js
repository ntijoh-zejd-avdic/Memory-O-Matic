class GameBoard extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#template());
        this.cardList = document.querySelector('.memory-board');

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
  
    }

    shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    displayCards(cards) {
        // Loop through the cards and create an HTML element for each one
        cards.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');
  
          // Create an img element for each card
          const imgElement = document.createElement('img');
          imgElement.src = card.path; // Set the image source
  
          // Append the img to the card div
          cardElement.appendChild(imgElement);
          
          // Append the card element to the container
          this.cardList.appendChild(cardElement);
        });
      }

    #template() {
        const template = document.createElement('template')
        template.innerHTML =
        `
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
        }
        
        .card {
          width: 100px;
          height: 100px;
          position: relative;
          transform: scale(1);
          transform-style: preserve-3d;
          transition: transform 0.5s;
        }
        
        .card:hover {
          transform: scale(1.05);
        }
        
        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          backface-visibility: hidden;
        }
        
        .card-front {
          background-color: #1abc9c;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          color: white;
        }
        
        .card-back {
          background-color: #3498db;
          transform: rotateY(180deg);
        }
        
        .card.flipped {
          transform: rotateY(180deg);
        }
      </style>

      <div class="memory-board">

      </div>
        `;
        return template.content.cloneNode(true);
      }
}

window.customElements.define('game-board', GameBoard);