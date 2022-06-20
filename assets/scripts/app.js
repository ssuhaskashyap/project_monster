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

let chosenMaxLife;

function chosenMaxLives() {
  const enteredValue = prompt('Enter the max life of You and the Monster', '100');
  parsedValue = parseInt(enteredValue);

  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw {message: 'Entered number is invalid. Not a number'};
  }
  return parsedValue;
}

try {
  chosenMaxLife = chosenMaxLives();
} catch(error) {
  console.log(error);
  chosenMaxLife = 100;
  alert('Default max life of user and monster is taken as 100');
}

let currentMonsterHealth = chosenMaxLife;
let currentUserHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];
let lastLogEntry;

adjustHealthBars(chosenMaxLife);

function writeLog (ev, val, userHealth, monsterHealth) {
  let logEntry;

  switch(ev) {
    case LOG_EVENT_USER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalUserHealth: userHealth,
        finalMonsterHealth: monsterHealth,
      };
      break;
    case LOG_EVENT_STRONG_USER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalUserHealth: userHealth,
        finalMonsterHealth: monsterHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'USER',
        finalUserHealth: userHealth,
        finalMonsterHealth: monsterHealth,
      };
      break;
    case LOG_EVENT_HEAL_USER:
      logEntry = {
        event: ev,
        value: val,
        target: 'USER',
        finalUserHealth: userHealth,
        finalMonsterHealth: monsterHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalUserHealth: userHealth,
        finalMonsterHealth: monsterHealth,
      };
      break;
    default:
      logEntry = {};
  }

  // if (ev === LOG_EVENT_USER_ATTACK) { // if else statements
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'MONSTER',
  //     finalUserHealth: userHealth,
  //     finalMonsterHealth: monsterHealth,
  //   };
  // } else if (ev === LOG_EVENT_STRONG_USER_ATTACK) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'MONSTER',
  //     finalUserHealth: userHealth,
  //     finalMonsterHealth: monsterHealth,
  //   };
  // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'USER',
  //     finalUserHealth: userHealth,
  //     finalMonsterHealth: monsterHealth,
  //   };
  // } else if (ev === LOG_EVENT_HEAL_USER) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'USER',
  //     finalUserHealth: userHealth,
  //     finalMonsterHealth: monsterHealth,
  //   };
  // } else if (ev === LOG_EVENT_GAME_OVER) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'MONSTER',
  //     finalUserHealth: userHealth,
  //     finalMonsterHealth: monsterHealth,
  //   };
  // }
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
  // for (let i = 0; i < battleLog.length; i++) { //normal for loop
  //   console.log(battleLog[i]);
  // }

  let i = 0; // index counter
  for (const log of battleLog) { // for-of loop -> used to loop arrays
    if (!lastLogEntry && lastLogEntry !== 0 || lastLogEntry < i) {
      console.log(`#${i}`);
      for (const key in log) {
        console.log(`${key} => ${log[key]}`);
      }
      lastLogEntry = i;
      break;
    }
    i++;
  }
  // console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healUserHandler);
logBtn.addEventListener('click', printLogHandler);