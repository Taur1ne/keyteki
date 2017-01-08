const DrawCard = require('../../../drawcard.js');

class TheSilverSteed extends DrawCard {
    constructor(owner, cardData) {
        super(owner, cardData);

        this.registerEvents(['afterChallenge', 'onChallengeFinished']);
    }

    setupCardAbilities() {
        this.reaction({
            when: {
                onRenown: (event, challenge, card) => card === this.parent
            },
            handler: () => {
                this.controller.sacrificeCard(this);

                this.controller.addChallenge('power', 1);

                this.game.addMessage('{0} sacrifices {1} to be able to initiate an additional {2} challenge this round', this.controller, this, 'power');
            }
        });
    }

    afterChallenge(event, challenge) {
        if(challenge.isParticipating(this.parent) && challenge.challengeType === 'power') {
            this.parent.addKeyword('Renown');

            this.renownAdded = true;
        }
    }

    onChallengeFinished() {
        if(this.renownAdded) {
            this.parent.removeKeyword('Renown');

            this.renownAdded = false;
        }
    }

    canAttach(player, card) {
        if(card.getType() !== 'character' || (!card.hasTrait('Dothraki') && card.name !== 'Daenerys Targaryen')) {
            return false;
        }

        return super.canAttach(player, card);
    }
}

TheSilverSteed.code = '02054';

module.exports = TheSilverSteed;
