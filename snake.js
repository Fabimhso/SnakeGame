class Snake {
	constructor(x, y, size) {
		this.x = Math.floor((Math.random() * canvas.width) / size) * size;
		this.y = Math.floor((Math.random() * canvas.height) / size) * size;
		this.size = size;
		this.tail = [{ x: this.x, y: this.y }];
		this.rotateX = 0;
		this.rotateY = 1;
	}

	move() {
		var newRect;

		if (this.rotateX == 1) {
			newRect = {
				x: this.tail[this.tail.length - 1].x + this.size,
				y: this.tail[this.tail.length - 1].y,
			};
		} else if (this.rotateX == -1) {
			newRect = {
				x: this.tail[this.tail.length - 1].x - this.size,
				y: this.tail[this.tail.length - 1].y,
			};
		} else if (this.rotateY == 1) {
			newRect = {
				x: this.tail[this.tail.length - 1].x,
				y: this.tail[this.tail.length - 1].y + this.size,
			};
		} else if (this.rotateY == -1) {
			newRect = {
				x: this.tail[this.tail.length - 1].x,
				y: this.tail[this.tail.length - 1].y - this.size,
			};
		}

		this.tail.shift();
		this.tail.push(newRect);
	}
}

class Apple {
	constructor() {
		var isTouching;
		while (true) {
			isTouching = false;
			this.x =
				Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
			this.y =
				Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;
			this.color = "red";
			this.size = snake.size;

			for (var i = 0; i < snake.tail.length; i++) {
				if (this.x == snake.tail[i].x && this.y == snake.tail[i].y)
					isTouching = true;
			}

			if (!isTouching) break;
		}
	}
}

var canvas = document.getElementById("canvas");
var main = getComputedStyle(document.querySelector("#main"));

canvas.width = parseInt(main.width);

var snake = new Snake(20, 20, 20);

var apple = new Apple();

var canvasContext = canvas.getContext("2d");

var pause = false;

window.onload = () => {
	if (navigator.userAgent.includes("Mobile")) {
		var body = document.getElementsByTagName("body");
		body.innerHTMl = `<h2>Acesse este website em um computador ou notebook.</h2>`;
		// body.style.
		return;
	} else {
		gameLoop();
	}
};

function gameLoop() {
	setInterval(show, 1000 / 15);
}

function show() {
	update();
	draw();
}

function update() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	checkCollisionWithWall();
	checkCOllisionWithTail();
	eatApple();

	if (!pause) snake.move();
}

function eatApple() {
	if (
		snake.tail[snake.tail.length - 1].x == apple.x &&
		snake.tail[snake.tail.length - 1].y == apple.y
	) {
		snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
		apple = new Apple();
	}
}

function checkCOllisionWithTail() {
	var tail = snake.tail;
	var headTail = tail[tail.length - 1];

	// for ()
}

function checkCollisionWithWall() {
	var headTail = snake.tail[snake.tail.length - 1];

	if (headTail.x > canvas.width) {
		headTail.x = 0;
	} else if (headTail.x < 0) {
		headTail.x = canvas.width;
	}

	if (headTail.y > canvas.height) {
		headTail.y = 0;
	} else if (headTail.y < 0) {
		headTail.y = canvas.height;
	}
}

function draw() {
	createRect(0, 0, canvas.width, canvas.height, "#2B2B2B");
	for (let i = 0; i < snake.tail.length; i++) {
		createRect(
			snake.tail[i].x + 2.5,
			snake.tail[i].y + 2.5,
			snake.size - 5,
			snake.size - 5,
			"#FFFFFF"
		);
	}

	canvasContext.font = "20px Arial";
	canvasContext.fillStyle = "#FFFFFF";
	canvasContext.fillText(`Score: ${snake.tail.length - 1}`, 20, 40, 200);
	createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (event) => {
	setTimeout(() => {
		if (!pause) {
			if (event.keyCode == 37 && snake.rotateX != 1) {
				snake.rotateX = -1;
				snake.rotateY = 0;
			} else if (event.keyCode == 38 && snake.rotateY != 1) {
				snake.rotateX = 0;
				snake.rotateY = -1;
			} else if (event.keyCode == 39 && snake.rotateX != -1) {
				snake.rotateX = 1;
				snake.rotateY = 0;
			} else if (event.keyCode == 40 && snake.rotateY != -1) {
				snake.rotateX = 0;
				snake.rotateY = 1;
			}
		}

		if (event.keyCode == 13) {
			pause = pause == true ? false : true;
		}
	});
});
