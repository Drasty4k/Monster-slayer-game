function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 1,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // A draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // Player lost
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // A draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // Monster lost
                this.winner = 'player'
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = null
            this.currentRound = 1
            this.logMessages = []
        },
        attackMonster() {
            let round =  this.currentRound++
            const attackValue = getRandomValue(5, 12)
            this.monsterHealth -= attackValue
            //this.monsterHealth = this.monsterHealth - attackValue
            this.addLogMessage('player', 'attack', attackValue, round)
            this.attackPlayer()
        },
        attackPlayer() {
            let round =  this.currentRound - 1
            const attackValue = getRandomValue(8, 15)
            this.addLogMessage('monster', 'attack', attackValue, round)
            this.playerHealth -= attackValue
        },
        specialAttackMonster() {
            let round =  this.currentRound++
            const attackValue = getRandomValue(10, 25)
            this.monsterHealth -= attackValue
            this.addLogMessage('player', 'attack', attackValue, round)
            this.attackPlayer()
        },
        healPlayer() {
            let round = this.currentRound++
            const healValue = getRandomValue(8, 20)
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue
            }
            this.addLogMessage('player', 'heal', healValue, round)
            this.attackPlayer()
        },
        surrender() {
            this.winner = 'giveUp'
        },
        addLogMessage(who, what, value, thisRound) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
                round: thisRound,
            })
            
        }
    } 
})

app.mount('#game')