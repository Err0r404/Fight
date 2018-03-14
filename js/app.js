new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameStarted: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameStarted = true;

            this.turns = [];

            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function () {
            var maxDamage = 10;
            var minDamage = 2;
            var damage = this.calculateDamage(maxDamage, minDamage)
            this.monsterHealth -= damage;

            this.turns.push({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });

            if(this.checkEnd()){
                return;
            }

            this.monsterAttack();
        },
        specialAttack: function () {
            var maxDamage = 20;
            var minDamage = 10;
            var damage = this.calculateDamage(maxDamage, minDamage);
            this.monsterHealth -= damage;

            if(this.checkEnd()){
                return;
            }

            this.turns.push({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });

            // Monster doesn't have a special attack (yet ?)
            this.monsterAttack();
        },
        heal: function () {
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }
            else {
                this.playerHealth = 100;
            }

            this.turns.push({
                isPlayer: true,
                text: 'Player heals himself for 10'
            });

            this.monsterAttack();
        },
        giveUp: function () {
            this.gameStarted = false;
        },
        monsterAttack: function () {
            var maxDamage = 15;
            var minDamage = 5;
            var damage = this.calculateDamage(maxDamage, minDamage);
            this.playerHealth -= damage;

            this.turns.push({
                isPlayer: false,
                text: 'Monster hits you for ' + damage
            });

            this.checkEnd();
        },
        calculateDamage: function (maxDamage, minDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage)+1, minDamage);
        },
        checkEnd: function () {
            if (this.monsterHealth <= 0) {
                if(confirm("You win!\r\nWant to start a new game?")){
                    this.startGame();
                }
                else{
                    this.gameStarted = false;
                }

                return true;
            }else if (this.playerHealth <= 0) {
                if(confirm("You lose!\r\nWant to start a new game?")){
                    this.startGame();
                }
                else{
                    this.gameStarted = false;
                }

                return true;
            }

            return false;
        }
    }
});