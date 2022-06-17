const USER_ATTACK = 10;
const STRONG_USER_ATTACK = 17;
const MONSTER_ATTACK = 14;
const HEAL_VALUE = 15;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const enteredValue = prompt('Enter the max life of You and the Monster', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentUserHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentUserHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function endRound() {
	let initialUserHealth = currentUserHealth;
	const userDamage = dealPlayerDamage(MONSTER_ATTACK);
	currentUserHealth -= userDamage;

	if (currentUserHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentUserHealth = initialUserHealth;
		setPlayerHealth(initialUserHealth);
		alert('You are saved by the bonus life!');
	}
	if (currentMonsterHealth <= 0 && currentUserHealth > 0) {
			alert('You Won!!');
	} else if (currentUserHealth <= 0 && currentMonsterHealth > 0) {
			alert('You Lost :(');
	} else if (currentMonsterHealth <= 0 && currentUserHealth <= 0) {
			alert('Its a TIE');
  }

  if (currentUserHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
	let maxDamage;
	if (mode === MODE_ATTACK) {
			maxDamage = USER_ATTACK;
	} else if (mode === MODE_STRONG_ATTACK) {
			maxDamage = STRONG_USER_ATTACK;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	endRound();
}

function attackHandler() {
	attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
	attackMonster(MODE_STRONG_ATTACK);
}

function healUserHandler() {
	let healValue;
	if (currentUserHealth >= chosenMaxLife - HEAL_VALUE) {
		alert("You can't heal more than your initial max health");
		healValue = chosenMaxLife - currentUserHealth;
	} else {
		healValue = HEAL_VALUE;
	}
	increasePlayerHealth(healValue);
	currentUserHealth += healValue;
	endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healUserHandler);