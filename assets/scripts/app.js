const USER_ATTACK = 10;
const STRONG_USER_ATTACK = 17;
const MONSTER_ATTCK = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentUserHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster() {
    const damage = dealMonsterDamage(USER_ATTACK);
    currentMonsterHealth -= damage;
    const userDamage = dealPlayerDamage(MONSTER_ATTCK);
    currentUserHealth -= userDamage;

    if (currentMonsterHealth <= 0 && currentUserHealth > 0) {
        alert('You Won!!');
    } else if (currentUserHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost :(');
    } else if (currentMonsterHealth <= 0 && currentUserHealth <= 0) {
        alert('Its a TIE');
    }
}

function strongAttackMonster() {
    const damage = dealMonsterDamage(STRONG_USER_ATTACK);
    currentMonsterHealth -= damage;
    const userDamage = dealPlayerDamage(MONSTER_ATTCK);
    currentUserHealth -= userDamage;

    if (currentMonsterHealth <= 0 && currentUserHealth > 0) {
        alert('You Won!!');
    } else if (currentUserHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost :(');
    } else if (currentMonsterHealth <= 0 && currentUserHealth <= 0) {
        alert('Its a TIE');
    }
}

attackBtn.addEventListener('click', attackMonster);
strongAttackBtn.addEventListener('click', strongAttackMonster);