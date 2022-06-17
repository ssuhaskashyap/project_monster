const USER_ATTACK = 10;
const STRONG_USER_ATTACK = 17;
const MONSTER_ATTACK = 14;
const HEAL_VALUE = 15;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_USER_ATTACK = 'USER_ATTACK';
const LOG_EVENT_STRONG_USER_ATTACK = 'STRONG_USER_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_HEAL_USER = 'HEAL_USER';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Enter the max life of You and the Monster', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentUserHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeLog (ev, val, userHealth, monsterHealth) {
  let logEntry;
  if (ev === LOG_EVENT_USER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'MONSTER',
      finalUserHealth: userHealth,
      finalMonsterHealth: monsterHealth,
    };
  } else if (ev === LOG_EVENT_STRONG_USER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'MONSTER',
      finalUserHealth: userHealth,
      finalMonsterHealth: monsterHealth,
    };
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'USER',
      finalUserHealth: userHealth,
      finalMonsterHealth: monsterHealth,
    };
  } else if (ev === LOG_EVENT_HEAL_USER) {
    logEntry = {
      event: ev,
      value: val,
      target: 'USER',
      finalUserHealth: userHealth,
      finalMonsterHealth: monsterHealth,
    };
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      target: 'MONSTER',
      finalUserHealth: userHealth,
      finalMonsterHealth: monsterHealth,
    };
  }
  battleLog.push(logEntry);
}

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentUserHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function endRound() {
	let initialUserHealth = currentUserHealth;
	const userDamage = dealPlayerDamage(MONSTER_ATTACK);
	currentUserHealth -= userDamage;
  writeLog(LOG_EVENT_MONSTER_ATTACK, userDamage, currentUserHealth, currentMonsterHealth);

	if (currentUserHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentUserHealth = initialUserHealth;
		setPlayerHealth(initialUserHealth);
		alert('You are saved by the bonus life!');
	}
	if (currentMonsterHealth <= 0 && currentUserHealth > 0) {
			alert('You Won!!');
      writeLog(LOG_EVENT_GAME_OVER, 'User Won', currentUserHealth, currentMonsterHealth);
	} else if (currentUserHealth <= 0 && currentMonsterHealth > 0) {
			alert('You Lost :(');
      writeLog(LOG_EVENT_GAME_OVER, 'Monster Won', currentUserHealth, currentMonsterHealth);
	} else if (currentMonsterHealth <= 0 && currentUserHealth <= 0) {
			alert('Its a TIE');
      writeLog(LOG_EVENT_GAME_OVER, 'Match Tied', currentUserHealth, currentMonsterHealth);
  }

  if (currentUserHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
	let maxDamage;
  let logEvent;
	if (mode === MODE_ATTACK) {
			maxDamage = USER_ATTACK;
      logEvent = LOG_EVENT_USER_ATTACK;
	} else if (mode === MODE_STRONG_ATTACK) {
			maxDamage = STRONG_USER_ATTACK;
      logEvent = LOG_EVENT_STRONG_USER_ATTACK;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
  writeLog(logEvent, damage, currentUserHealth, currentMonsterHealth);
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
  writeLog(LOG_EVENT_HEAL_USER, healValue, currentUserHealth, currentMonsterHealth);
	endRound();
}

function printLogHandler() {
  console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healUserHandler);
logBtn.addEventListener('click', printLogHandler);