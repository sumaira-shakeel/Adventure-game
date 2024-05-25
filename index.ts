#!/usr/bin/env node

import inquirer from "inquirer" 
//..................Games variable.................
let enemies = ['Skeleton' ,'Zombie','Warrier','Assassin']
let maxEnemyHealth = 75;
let enemyAttackDamageToHero =25;

//.......................player variable.....................
let heroHealth = 100
let attackDemageToEnemy = 50
let numHealthPortion  = 3
let HealthPortionHealAmount = 30
let healthPortionDropChance = 50

//...................while loops conditions..................
let gameRunning = true;
console.log("Welcome to Deadzone!");
Game:
while(gameRunning){
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1)
    let enemyIndex = Math.floor(Math.random() * enemies.length)
    let enemy = enemies[enemyIndex]

    console.log(`# ${enemy} has appeared #\n`);
    while(enemyHealth > 0 ){
        console.log(`Your health: ${heroHealth}`);
        console.log(`${enemy} health: ${enemyHealth}`);
        let options = await inquirer.prompt({
            name:"ans",
            type:"list",
            message:"would you like to do?",
            choices:["1. Attack","2. Take Health portion","3. Run"]
        })
        if(options.ans === "1. Attack"){
            let demageToEnemy = Math.floor(Math.random() * attackDemageToEnemy + 1)
            let demageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1)

            enemyHealth -= demageToEnemy
            heroHealth -= demageToHero
            console.log(`you strike the enemy ${enemy} for ${demageToEnemy}`);
            console.log(`${enemy} strike you for ${demageToHero} damage.`);
            
            if(heroHealth < 1){
                console.log("You have taken too much demage. you are too weak to continue.");
                break;

            }

        }
        else if(options.ans ==="2. Take Health portion" ){
            if(numHealthPortion > 0){
                heroHealth += HealthPortionHealAmount
                numHealthPortion--
                console.log(`you use health portion for ${HealthPortionHealAmount}`);
                console.log(`you now have ${heroHealth} health`);
                console.log(`you have ${numHealthPortion}health portion left.`);
            }else{
                console.log('you have no health portions left. defeat enemy  for a chance to get health portion');
            }
        }
        else if(options.ans === "3. Run"){
            console.log(`you run away from ${enemy}`);
            continue Game;
        }
    }
    if(heroHealth < 1 ){
        console.log('you are out from battle.you are too weak.');
        break
    }
    console.log(`${enemy} was defeated!`);
    console.log(`you have ${heroHealth} health.`);
    let randomNumber = Math.floor(Math.random() *  100 + 1)
    if(randomNumber < healthPortionDropChance){
    numHealthPortion++
    console.log('enemy give you health potion');
    console.log(`Your health is ${heroHealth}`);
    console.log(`Your health portion is ${numHealthPortion}`);
}
let userOption = await inquirer.prompt({
    name:"ans",
    type:"list",
    message:"What would you like to do now",
    choices:['1. continue' ,'2. Exit']
})
if(userOption.ans === '1. continue'){
    console.log("you are continue to your adventure");
}else{
    console.log("you successfully Exit from Deadzone");
    break;
}
console.log("Thank you for played.\n");


}
