class GameBoard extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#template());

        // Cards data (You can expand this list)
    this.cards = [
        { name: "card1", id: 1 },
        { name: "card2", id: 2 },
        { name: "card3", id: 3 },
        { name: "card4", id: 4 },
        { name: "card1", id: 5 },
        { name: "card2", id: 6 },
        { name: "card3", id: 7 },
        { name: "card4", id: 8 },
      ];
  
      // Shuffle the cards before rendering
      this.shuffle(this.cards);
  
      // Append the template to the shadow DOM
      this.shadowRoot.appendChild(this.#template());
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
          grid-template-columns: repeat(4, 150px);
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