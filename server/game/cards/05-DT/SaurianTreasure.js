const Card = require('../../Card.js');

class SaurianTreasure extends Card {
    // Play: Put 4 on Saurian Treasure ?.
    // At the start of a player's turn, if they control at least four creatures with on them, move all from Saurian Treasure ? to their pool.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.placeAmber({
                amount: 4,
                target: this
            })
        });

        this.reaction({
            when: {
                onBeginRound: (_, context) =>
                    context.player &&
                    context.game.activePlayer &&
                    context.player.creaturesInPlay.filter((card) => card.amber).length >= 4
            },
            gameAction: ability.actions.removeAmber({ all: true }),
            then: {
                gameAction: ability.actions.gainAmber((context) => ({
                    amount: context.preThenEvent.amount,
                    target: context.game.activePlayer
                }))
            }
        });
    }
}

SaurianTreasure.id = 'saurian-treasure';

module.exports = SaurianTreasure;
