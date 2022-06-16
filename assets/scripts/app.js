const USER_ATTACK = 10;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentUserHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster() {
    const damage = dealMonsterDamage(USER_ATTACK);
    currentMonsterHealth -= damage;
}

attackBtn.addEventListener('click', attackMonster);