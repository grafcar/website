const SUITS = ['Diamond','Club','Heart','Spade']
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
// COLOR = ['red','black']

class Card{
    constructor (suit, rank){
        this.suit = suit;
        this.rank = rank;
    }
    toString(){
        return `Card ${this.rank} ${this.suit}`
    }
    
}
    

class Deck{
    constructor (){
        this.deck = []
        this.build_deck();
    }
    
    build_deck(){
        for (const suit of SUITS){
            for (const rank of RANKS){
                this.deck.push(new Card(suit, rank));
            }   
        }  
    }
    
    print_deck(){
        for (const card of this.deck){
            console.log(card.toString());
        }
    }
        
    shuffle(){
        const random = Math.floor((Math.random()*10)+1);
        console.log(`Random is ${random}`);
        for (let i = 0; i < random; i++){
            this.deck.sort(() => Math.random() -0.5);
            console.log("TEST");
        }
        
    }

    // def shuffle(self) -> None:
    //     random.shuffle(self.deck)

    // def cardsLeft(self) -> int:
    //     return len(self.deck)
    
    // def removeCard(self, card: Card) -> None:
    //     pass
}
    

const test = new Deck();
test.shuffle();
test.print_deck();
