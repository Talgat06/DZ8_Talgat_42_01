    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const ground = new Image();
    ground.src = "./img/ground.png";

    const foodImg = new Image();
    foodImg.src = "./img/food.png";

    let box = 32;
    let score = 0;
    let game;

    let food = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
    }

    let snake = [];

    snake[0] = {
        x: 9 * box,
        y: 10 * box,
    }

    let dir;
    function direction(e) {
        if (e.keyCode === 37 &&dir !== 'right') dir = 'left';
        else if(e.keyCode === 38 && dir !== 'down') dir = 'up';
        else if(e.keyCode === 39 && dir !== 'left') dir = 'right';
        else if(e.keyCode === 40 && dir !== 'up') dir = 'down';
    }

    document.addEventListener("keydown", direction);

    function eatTail(head, arr){
        for(let i = 0; i < arr.length; i++) {
            if(head.x === arr[i].x && head.y === arr[i]) {
                clearInterval(game);
                setModal();
            }
        }
    }

    function setModal() {
        const div = document.createElement("div");
        div.setAttribute("class", "modal");
        document.body.style.background = "rgba(0,0,0,0,5)";
        document.body.append(div);


        const scoreText = document.createElement("p");
        scoreText.textContent = `Score: ${score}`;
        scoreText.style.textAlign = "center";
        scoreText.style.color = "red";
        div.append(scoreText);

        const restart = document.createElement("button");
        restart.textContent = "Restart";
        restart.style.marginLeft = "42%";
        restart.style.borderRadius = "30px";
        restart.style.backgroundColor = "green";
        restart.style.color = "yellow";
        restart.style.fontSize = "18px";

        restart.addEventListener("click", function() {
            div.remove();
            restartGame();
        })

        div.append(restart);
        document.body.append(div);
    }

        function restartGame() {
            score = 0;
            dir = null;

            food = {
                x: Math.floor((Math.random() * 17 + 1)) * box,
                y: Math.floor((Math.random() * 15 + 3)) * box,
            }

            snake = [];

            snake[0] = {
                x: 9 * box,
                y: 10 * box,
            }

            clearInterval(game);
            game = setInterval(drawGame, 100);
        }
    function drawGame() {
        ctx.drawImage(ground, 0, 0);
        ctx.drawImage(foodImg, food.x, food.y)

        for(let i = 0; i < snake.length; i++){
            ctx.fillStyle = i === 0 ? "green" : "red"; //тирнарные операторы
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(score, box *1.8, box *1.7);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(snakeX === food.x && snakeY === food.y) {
            score++;
             food = {
                x: Math.floor((Math.random() * 17 + 1)) * box,
                y: Math.floor((Math.random() * 15 + 3)) * box,
            };
        } else snake.pop();

        if (
            snakeX < box ||
            snakeX > box * 17 ||
            snakeY < 3 * box ||
            snakeY > box * 17
        ) {
            clearInterval(game);
            setModal();
        }


        if (dir === 'left') snakeX -= box;
        if (dir === 'right') snakeX += box;
        if (dir === 'up') snakeY -= box;
        if (dir === 'down') snakeY += box;

        let newHead = {
            x: snakeX,
            y: snakeY,
        }

        eatTail(newHead, snake);
        snake.unshift(newHead);
    }

       game = setInterval(drawGame, 100);