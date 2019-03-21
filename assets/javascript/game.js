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
        this.cp = counter;
        this.pic = pic;
    }

    // Variables for characters and link to images in HTML

    function charValue() {
        var obi = new character("Obi-Wan Kenobi", 300, 10, 25, "assets/images/obi.jpg");
        var luke = new character("Luke Skywalker", 150, 8, 20, "assets/images/luke.jpg");
        var vader = new character("Darth Vader", 400, 12, 30, "assets/images/vader.jpg");
        var pal = new character("Emperor Palpatine", 280, 10, 22, "assets/images/pal.jpg");

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
    character.prototype.attackIncre = function () {
        this.ap = this.ap + playerAttack;
    }

    //Attack function//

    character.prototype.attack = function (char) {
        char.hp = char.hp - this.ap;
        this.attackIncre();
    }

    //Counter attach function//

    character.prototype.counter = function (char) {
        char.hp = char.hp - this.cp;
    }

    //


    // Click Function for character and enemy selection

    $(document).on("click", "img", function () {
        $("#win").children().remove();
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

        else if (moveToPlayer && !moveToDefender && this.id != player.name) {
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
        $("#message").children().remove();
        $("#playerhealth").children().remove();
        $("#defenderhealth").children().remove();
        $("#win").children().remove();


        if (moveToPlayer && moveToDefender) {
            if (player.hp > 0 && defender.hp > 0) {
                player.attack(defender);
                defender.counter(player);
                var printAttk = $("<p>");
                printAttk.attr("id", "attackinfo");
                var printCount = $("<p>");
                printCount.attr("id", "counterinfo");
                $("#message").append(printAttk);
                $("#message").append(printCount);
                $("#attackinfo").append('You attacked ' + defender.name + ' for ' + player.ap);
                $("#counterinfo").append(defender.name + ' attacked you back for ' + defender.cp);
                console.log("player's health " + player.hp);
                console.log("defender's health " + defender.hp);
                var printPlayerhp = $("<p>");
                printPlayerhp.attr("id", "playerhp");
                $("#playerhealth").append(printPlayerhp);
                $("#playerhp").append(player.name + "'s HP: " + player.hp + "-hp");
                var printDefenderhp = $("<p>");
                printDefenderhp.attr("id", "defenderhp");
                $("#defenderhealth").append(printDefenderhp);
                $("#defenderhp").append(defender.name + "'s HP: " + defender.hp + "-hp");

                if (defender.hp <= 0 && charArray.length > 0) {
                    $("#message").children().remove();
                    var printWin = $("<p>");
                    printWin.attr("id", "winmessage");
                    $("#win").append(printWin);
                    $("#winmessage").append('You have defeated ' + defender.name + ", choose your next enemy.");
                    console.log("defender lose")
                    moveToDefender = false;
                    $("#defenderhealth").children().remove();

                    $("#defender").children().remove();

                }
                else if (charArray.length === 0) {
                    moveToDefender = false;
                    $("#message").children().remove();
                    var printWin = $("<p>");
                    printWin.attr("id", "winmessage");
                    $("#win").append(printWin);
                    $("#defender").children().remove();
                    $("#message").children().remove();
                    $("#defenderhealth").children().remove();
                    $("#winmessage").append('You have defeated all your enemies. You win!');
                }
            }
            if (player.hp <= 0) {
                console.log("player lose");
                $("#message").children().remove();
                $("#playerhealth").children().remove();
                $("#defenderhealth").children().remove();
                var printLost = $("<p>");
                printLost.attr("id", "lostmessage");
                $("#win").append(printLost);
                $("#lostmessage").append('You have been defeated...');
            }
        }

    })

    //Reset button function
    $(document).on("click", "#reset", function () {
        location.reload();
    })
})



