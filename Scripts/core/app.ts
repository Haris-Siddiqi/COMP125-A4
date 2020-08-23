/*
Filename: app.ts
Author: Haris Siddiqi
Student #: 301126020
Project: Slot Machine
Description: Slot machine game with a jackpot of 5000 (1 in 1000 odds)
*/

(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let assets: createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;
    let spinButton: UIObjects.Button;
    let bet1Button: UIObjects.Button;
    let bet10Button: UIObjects.Button;
    let bet100Button: UIObjects.Button;
    let betMaxButton: UIObjects.Button;
    let resetButton: UIObjects.Button;
    let exitButton: UIObjects.Button;
    let jackPotLabel: UIObjects.Label;
    let creditLabel: UIObjects.Label;
    let winningsLabel: UIObjects.Label;
    let betLabel: UIObjects.Label;
    let leftReel: Core.GameObject;
    let middleReel: Core.GameObject;
    let rightReel: Core.GameObject;
    let betLine: Core.GameObject;

    // variables
    let jackpot = 5000;
    let credits = 1000;
    let bet = 10;
    let winnings = 0;

    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;

    let manifest: Core.Item[] = [
        {id:"background", src:"./Assets/images/background.png"},
        {id:"banana", src:"./Assets/images/banana.gif"},
        {id:"bar", src:"./Assets/images/bar.gif"},
        {id:"bell", src:"./Assets/images/bell.gif"},
        {id:"bet_line", src:"./Assets/images/bet_line.gif"},
        {id:"bet1Button", src:"./Assets/images/bet1Button.png"},
        {id:"bet10Button", src:"./Assets/images/bet10Button.png"},
        {id:"bet100Button", src:"./Assets/images/bet100Button.png"},
        {id:"betMaxButton", src:"./Assets/images/betMaxButton.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"exitButton", src:"./Assets/images/exitButton.png"},
        {id:"blank", src:"./Assets/images/blank.gif"},
        {id:"cherry", src:"./Assets/images/cherry.gif"},
        {id:"grapes", src:"./Assets/images/grapes.gif"},
        {id:"orange", src:"./Assets/images/orange.gif"},
        {id:"seven", src:"./Assets/images/seven.gif"},
        {id:"spinButton", src:"./Assets/images/spinButton.png"},
    ];   

    // This function triggers first and "Preloads" all the assets
    function Preload()
    {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);

        assets.loadManifest(manifest);
    }

    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start():void
    {
        console.log("App Started...");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);

        stage.enableMouseOver(20);

        Config.Globals.AssetManifest = assets;

        Main();
    }

    // called every frame
    function Update():void
    {
        stage.update();
    }

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value:number, lowerBounds:number, upperBounds:number):number | boolean {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else {
            return !value;
        }
    }

    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels():string[] {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }

    /* This function calculates the player's winnings, if any */
    function determineWinnings()
    {
        // Generate random values for jackpot
        let jackPotTry = Math.floor(Math.random() * 1000);
        let jackPotWin = Math.floor(Math.random() * 1000);
        
        //console.log(jackPotWin);
        //console.log(jackPotTry);

        // If jackpot won
        if (jackPotTry == jackPotWin)
        {
            alert("You Won the $" + jackpot + " Jackpot!!");
            winnings = jackpot;
        }
        // Normal situation
        else if(blanks == 0)
        {
            if (grapes == 3) {
                winnings = bet * 10;
            }
            else if(bananas == 3) {
                winnings = bet * 20;
            }
            else if (oranges == 3) {
                winnings = bet * 30;
            }
            else if (cherries == 3) {
                winnings = bet * 40;
            }
            else if (bars == 3) {
                winnings = bet * 50;
            }
            else if (bells == 3) {
                winnings = bet * 75;
            }
            else if (sevens == 3) {
                winnings = bet * 100;
            }
            else if (grapes == 2) {
                winnings = bet * 2;
            }
            else if (bananas == 2) {
                winnings = bet * 2;
            }
            else if (oranges == 2) {
                winnings = bet * 3;
            }
            else if (cherries == 2) {
                winnings = bet * 4;
            }
            else if (bars == 2) {
                winnings = bet * 5;
            }
            else if (bells == 2) {
                winnings = bet * 10;
            }
            else if (sevens == 2) {
                winnings = bet * 20;
            }
            else if (sevens == 1) {
                winnings = bet * 5;
            }
            else {
                winnings = bet * 1;
            }
        }
    }

    /* Utility function to reset all fruit tallies */
    function resetFruitTally() {
        grapes = 0;
        bananas = 0;
        oranges = 0;
        cherries = 0;
        bars = 0;
        bells = 0;
        sevens = 0;
        blanks = 0;
    }

    // Initial build
    function buildInterface():void
    {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true );
        stage.addChild(slotMachineBackground);

        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);

        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);

        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);

        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);

        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);

        resetButton = new UIObjects.Button("resetButton", Config.Screen.CENTER_X - 108, Config.Screen.CENTER_Y -185, true);
        stage.addChild(resetButton);

        exitButton = new UIObjects.Button("exitButton", Config.Screen.CENTER_X + 108, Config.Screen.CENTER_Y -185, true);
        stage.addChild(exitButton);

        // Labels
        jackPotLabel = new UIObjects.Label(jackpot.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);

        creditLabel = new UIObjects.Label(credits.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);

        winningsLabel = new UIObjects.Label(winnings.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);

        betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);

        // Reel GameObjects
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);

        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);

        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);

        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }

    // App logic
    function interfaceLogic():void
    {
        spinButton.on("click", ()=>{
            if (credits == 0)
            {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    // reset
                    resetFruitTally();
                    credits = 1000;
                    winnings = 0;
                    bet = 10;

                    // reset bet label
                    stage.removeChild(betLabel);
                    betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
                    stage.addChild(betLabel);

                    // reset credit label
                    stage.removeChild(creditLabel);
                    creditLabel = new UIObjects.Label(credits.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
                    stage.addChild(creditLabel);

                    // reset winnings label
                    stage.removeChild(winningsLabel);
                    winningsLabel = new UIObjects.Label(winnings.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
                    stage.addChild(winningsLabel);

                    // reset reel GameObjects
                    stage.removeChild(leftReel);
                    stage.removeChild(middleReel);
                    stage.removeChild(rightReel);

                    leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
                    stage.addChild(leftReel);

                    middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
                    stage.addChild(middleReel);

                    rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
                    stage.addChild(rightReel);
                }
            }
            else if (bet > credits) {
                alert("You don't have enough Money to place that bet.");
            }
            else {
                // reset
                resetFruitTally();
                winnings = 0;

                // reel test
                let reels = Reels();

                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]) as HTMLImageElement;
                middleReel.image = assets.getResult(reels[1]) as HTMLImageElement;
                rightReel.image = assets.getResult(reels[2]) as HTMLImageElement;

                // Caluclate winnings
                determineWinnings();

                // Calculations
                credits = credits - bet + winnings;

                // Update gui
                stage.removeChild(creditLabel);
                stage.removeChild(winningsLabel);

                creditLabel = new UIObjects.Label(credits.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
                stage.addChild(creditLabel);

                winningsLabel = new UIObjects.Label(winnings.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
                stage.addChild(winningsLabel);
            }
        });

        bet1Button.on("click", ()=>{
            // Update bet value
            bet = 1;

            // Update label
            stage.removeChild(betLabel);
            betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(betLabel);
        });

        bet10Button.on("click", ()=>{
            // Update bet value
            bet = 10;

            // Update label
            stage.removeChild(betLabel);
            betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(betLabel);
        });

        bet100Button.on("click", ()=>{
            // Update bet value
            bet = 100;

            // Update label
            stage.removeChild(betLabel);
            betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(betLabel);
        });

        betMaxButton.on("click", ()=>{
            // Update bet value
            bet = credits;

            // Update label
            stage.removeChild(betLabel);
            betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(betLabel);
        });

        resetButton.on("click", ()=>{
            // reset
            resetFruitTally();
            credits = 1000;
            winnings = 0;
            bet = 10;

            // reset bet label
            stage.removeChild(betLabel);
            betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(betLabel);

            // reset credit label
            stage.removeChild(creditLabel);
            creditLabel = new UIObjects.Label(credits.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(creditLabel);

            // reset winnings label
            stage.removeChild(winningsLabel);
            winningsLabel = new UIObjects.Label(winnings.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(winningsLabel);

            // reset reel GameObjects
            stage.removeChild(leftReel);
            stage.removeChild(middleReel);
            stage.removeChild(rightReel);

            leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
            stage.addChild(leftReel);

            middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
            stage.addChild(middleReel);

            rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
            stage.addChild(rightReel);
        });

        exitButton.on("click", ()=>{
            // exit
            window.close();
        });
    }

    function Main():void
    {
        buildInterface();

        interfaceLogic();
    }

    window.addEventListener("load", Preload);
})();