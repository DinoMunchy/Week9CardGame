// What do we need for a WAR card games?

/**
 * Deck
 * - 52 cards (should each card have its own class? Should it be an object with 3 values?)
 *  - Rank
 *  - Suit (hearts, diamonds, clubs, spades)
 *  - Values (2-10, J, Q, K, A)
 * - a way to shuffle
 * - a way to pass the cards to the players ( should this be in my deck? or my game logic?)
 * 
 * Players (do I need a player class? or can I just put in my game logic?)
 * - Name?
 * - Score
 * - Hand
 * 
 * Logic to actually play the game... we can use a deck in any card game,
 *  but we're playing a specific one.
 * - Ways to compare the cards... number values on each card
 */

//Deck Class
/** Should have:
 * An array to store the cards
 * An array to store all the cards ranks
 * An array to store all the cards suits
 */

/* Deck class to manage the playing cards */
class Deck {
    constructor() {
        this.deck = [];  /* Array to store all cards */
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];  /* All possible card ranks */
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];  /* All possible card suits */
    }

    /* Creates a standard 52-card deck */
    createDeck() {
        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.ranks.length; j++) {
                let value;
                /* Assign values: Ace = 1, Face cards = 10, Number cards = their face value */
                if (this.ranks[j] === 'A') {
                    value = 1;
                } else if (['J', 'Q', 'K'].includes(this.ranks[j])) {
                    value = 10;
                } else {
                    value = parseInt(this.ranks[j]);
                }
                /* Create card object with suit, rank, and numeric value */
                let card = {
                    suit: this.suits[i],
                    rank: this.ranks[j],
                    value: value
                };
                this.deck.push(card);
            }
        }
    }

    /* Shuffles the deck using Fisher-Yates algorithm */
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
}

//Class for a game (Specifically our WAR game)
/** Needs:
 * - A deck... instantiate a deck inside of our game class
 * 
 * - Create the deck, shuffle the deck, and pass the deck...
 * 
 * - Logic to play the game
 *  -Turn based, how many turns?
 *  - Do our Players have a hand yet?
 *  - control flow statement logic to decide the wins?
 * 
 *  - 2 players
 *   - Hand
 *   - Score
 *   - Name
 */
/* Game class to manage the War card game */
class Game {
    constructor() {
        /* Initialize players with name, score, and empty hand */
        this.player1 = {
            name: 'Player 1',
            score: 0,
            hand: []
        };
        this.player2 = {
            name: 'Player 2',
            score: 0,
            hand: []
        };
    }

    /* Main game method that handles the entire game flow */
    playGame() {
        /* Set up the game */
        const deck = new Deck();
        deck.createDeck();
        deck.shuffleDeck();

        /* Deal cards to players */
        while (deck.deck.length !== 0) {
            this.player1.hand.push(deck.deck.shift());
            this.player2.hand.push(deck.deck.shift());
        }

        /* Log initial hands */
        console.log(this.player1.hand);
        console.log(this.player2.hand);

        /* Play through all cards */
        for (let i = 0; i < this.player1.hand.length; i++) {
            /* Compare card values and award points */
            if (this.player1.hand[i].value > this.player2.hand[i].value) {
                this.player1.score++;
                console.log(`
                    P1 Card: ${this.player1.hand[i].rank} of ${this.player1.hand[i].suit}
                    P2 Card: ${this.player2.hand[i].rank} of ${this.player2.hand[i].suit}
                    Player 1 Wins a point!
                    Current Score: P1: ${this.player1.score} P2: ${this.player2.score}
                `);
            } else if (this.player2.hand[i].value > this.player1.hand[i].value) {
                this.player2.score++;
                console.log(`
                    P1 Card: ${this.player1.hand[i].rank} of ${this.player1.hand[i].suit}
                    P2 Card: ${this.player2.hand[i].rank} of ${this.player2.hand[i].suit}
                    Player 2 Wins a point!
                    Current Score: P1: ${this.player1.score} P2: ${this.player2.score}
                `);
            } else {
                console.log(`
                    P1 Card: ${this.player1.hand[i].rank} of ${this.player1.hand[i].suit}
                    P2 Card: ${this.player2.hand[i].rank} of ${this.player2.hand[i].suit}
                    Tie: No points awarded
                    Current Score: P1: ${this.player1.score} P2: ${this.player2.score}
                `);
            }
        }

        /* Display final game results */
        if (this.player1.score > this.player2.score) {
            console.log(`Player 1 wins!
                Final Score: P1: ${this.player1.score} 
                            P2: ${this.player2.score}`);
        } else if (this.player2.score > this.player1.score) {
            console.log(`Player 2 wins!
                Final Score: P1: ${this.player1.score} 
                            P2: ${this.player2.score}`);
        } else {
            console.log(`Tie!
                Final Score: P1: ${this.player1.score} 
                            P2: ${this.player2.score}`);
        }
    }
}

/* Start a new game */
const game = new Game();
game.playGame();
