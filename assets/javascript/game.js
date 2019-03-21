$(document).ready(function () {

    //Global Variables
    var player;
    var defender;
    var charArray = [];
    var moveToPlayer = false;
    var moveToDefender = false;
    var playerAttack = 0;

    // Character object constructor function

    function character(name, hp, attack, counter, pic) {
        this.name = name;
        this.hp = hp;
        this.ap = attack;
        this.cp= counter;
        this.pic = pic;
    }

    // Variables for characters and link to images in HTML

    function charValue() {
        var obi = new character("Obi-Wan Kenobi", 150, 20, 15, "assets/images/obi.jpg");
        var luke = new character("Luke Skywalker", 100, 15, 10, "assets/images/luke.jpg");
        var vader = new character("Darth Vader", 200, 25, 20, "assets/images/vader.jpg");
        var pal = new character("Emperor Palpatine", 160, 15, 20, "assets/images/pal.jpg");

        charArray.push(obi, luke, vader, pal);
    }

    charValue();

    // Function to display characters on screen

    function printChar(ogDiv, newDiv) {
        $(ogDiv).remove()
        for (i = 0; i < charArray.length; i++) {
            var charPic = $("<img>");
            charPic.addClass("charImg");
            charPic.attr("id", charArray[i].name);
            charPic.css("height", "100%");
            charPic.css("width", "200px")
            charPic.attr("src", charArray[i].pic);
            $(newDiv).append(charPic);
        }
    }

    printChar("#placeholder", "#character");

    // Function to move characters from one div to another

    // function moveChar(ogDiv, newDiv) {
    //     $(ogDiv).remove()
    //     for (i = 0; i < charArray.length; i++) {
    //         var charPic = $("<img>");
    //         charPic.addClass("charImg");
    //         charPic.attr("id", charArray[i].name);
    //         charPic.css("height", "100%");
    //         charPic.css("width", "200px")
    //         charPic.attr("src", charArray[i].pic);
    //         $(newDiv).prepend(charPic);
    //     }
    // }

    //Increase attack function//
    character.prototype.attackIncre = function(){
        this.ap = this.ap + playerAttack;
    }

    //Attack function//

    character.prototype.attack = function(char){
        char.hp = char.hp - this.ap;
        this.attackIncre();
    }

    //Counter attach function//

    character.prototype.counter = function(char){
        char.hp = char.hp - this.cp;
    }

    //


    // Click Function for character and enemy selection

    $(document).on("click", "img", function () {
        if (!moveToPlayer) {
            for (i = 0; i < charArray.length; i++) {
                if (charArray[i].name === this.id) {
                    $("#player").append(this);
                    moveToPlayer = true;
                    player = charArray[i];
                    charArray.splice(i, 1);
                    playerAttack = player.ap;
                    console.log(playerAttack);
                }
                // $("#enemy").append("#character");
                // else {
                //     $("#enemy").append(charArray[i].pic);
                // }
                // $("#enemy").append("#character" + "img:last-child");

            }
            $("#header").hide();
            printChar("#character", "#enemy");
        }

        else if (moveToPlayer && !moveToDefender && this.id != player.name){
            for (i = 0; i < charArray.length; i++) {
                if (charArray[i].name === this.id) {
                    $("#defender").append(this);
                    moveToDefender = true;
                    defender = charArray[i];
                    charArray.splice(i, 1);
                    console.log(charArray);

                }
            }
        }

    })

    //attack button function
    $(document).on("click", "#attack", function () {
        if (moveToPlayer && moveToDefender){
            if (player.hp > 0 && defender.hp >0){
                player.attack(defender);
                defender.counter(player);
                console.log("player's health " + player.hp);
                console.log("defender's health " + defender.hp);
                if (player.hp <= 0){
                    console.log("player lose");
                }
                else if (defender.hp <= 0){
                    console.log("defender lose")
                    moveToDefender = false;
                    $("#defender").children().remove();

                }
            }
            else if (defender.hp <=0){

            }
        }

    })

    //Reset button function
    $(document).on("click", "#reset", function(){
        location.reload();
    })

    






    // Function to display selected character
    // if (charSelect === undefined || charSelect.length === 0){
    //     $(".charImg").on("click", function () {
    //         $("#player").append(this);
    //         charSelect.push(charPic.data());
    //         console.log(charSelect);

    // for (i = 0; i < character.length; i++){
    //     if( character[i].name != charSelect.name){
    //         charLeft.push(character[i]);
    //     }
    //     console.log(charLeft + "This is the characters left");
    // }


    // else {
    //     $(".charImg").on("click", function () {
    //         $("#defender").append(this);
    //         enemySelect.push(charPic.data());
    //     });
    // }
    // else {
    //     $(".charImg").on("click", function () {
    //         $("#defender").append(this);
    //         charSelect.push(charPic.data());
    //         console.log(charSelect);
    //     });
    // }


    // Function to display enemy character in "defender area"

    // Attack function
    // Loop to keep track of attack power (increase each time player clicks attack button)

    // Loop to keep track of enemy's HP 

    //When enemy's HP reaches zero, remove from screen

    //When no more enemy on screen, player wins



    //JSON = javascript object notation






})



