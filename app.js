document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const scoreDisplay = document.getElementById('score');
	const level = document.getElementById('level');
	const start_game = document.getElementById('start_game');
	const gameOver = document.getElementById('gameover');
	const width = 28;
	let score = 0;
	let j = 1;
	start_game.style.display = 'none';

	const layout = [
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
		1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
		1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
		4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
		1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
		1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
		1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
		1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
		1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
		1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
		1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
		1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	];

	const squares = [];

	function createBoard() {
		for (let i=0; i<layout.length; i++) {
			const square = document.createElement('div');
			grid.appendChild(square);
			squares.push(square);

			if(layout[i] == 0) {
				squares[i].classList.add('pac-dot');
			} else if(layout[i] === 1) {
				squares[i].classList.add('wall');
			} else if(layout[i] === 2) {
				squares[i].classList.add('ghost-lair');
			} else if(layout[i] === 3) {
				squares[i].classList.add('power-pellet');
			}
		}
	}

	createBoard();

	let pacmanCurrentIndex = 490;

	squares[pacmanCurrentIndex].classList.add('pac-man');

	function movePacman(e) {
		squares[pacmanCurrentIndex].classList.remove('pac-man');

		switch(e.keyCode) {
			case 37:
				if(pacmanCurrentIndex % width != 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall') && !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')) {
					pacmanCurrentIndex -= 1;
					if((pacmanCurrentIndex -1) === 363) {
						squares[pacmanCurrentIndex].classList.add('pac-man');
						pacmanCurrentIndex = 391;
						squares[364].classList.remove('pac-man');
					}
				}
			break;
			case 38:
				if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall') && !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')) {
					pacmanCurrentIndex -= width;
				}
			break;
			case 39:
				if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall') && !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')) {
					pacmanCurrentIndex += 1;
					if((pacmanCurrentIndex +1) === 392) {
						squares[pacmanCurrentIndex].classList.add('pac-man');
						pacmanCurrentIndex = 364;
						squares[391].classList.remove('pac-man');
					}
				}
			break;
			case 40:
				if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains('wall') && !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')) {
					pacmanCurrentIndex += width;
				}
			break;
		}
		squares[pacmanCurrentIndex].classList.add('pac-man');

		pacDotEaten();
		powerPelletEaten();
		checkGameOver();
		checkForWin();
	}
	document.addEventListener('keyup', movePacman);

	function pacDotEaten() {
	    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
	      score++;
	      scoreDisplay.innerHTML = score;
	      squares[pacmanCurrentIndex].classList.remove('pac-dot');
	    }
	}

	function powerPelletEaten() {
		if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
	      score += 10;
	      ghosts.forEach(ghost => ghost.isScared = true);
	      setTimeout(unScareGhosts, 10000);
	      squares[pacmanCurrentIndex].classList.remove('power-pellet');
	    }
	}

	function unScareGhosts() {
		ghosts.forEach(ghost => ghost.isScared = false);
	}

	class Ghost {
		constructor(className, startIndex, speed) {
			this.className = className;
			this.startIndex = startIndex;
			this.speed = speed;
			this.currentIndex = startIndex;
			this.timerId = NaN;
			this.isScared = false;
		}
	}

	ghosts = [
		new Ghost('blinky', 348, 250),
		new Ghost('pinky', 376, 400),
		new Ghost('inky', 351, 300),
		new Ghost('clyde', 379, 500)
	];

	ghosts.forEach(ghost => {
		squares[ghost.currentIndex].classList.add(ghost.className);
		squares[ghost.currentIndex].classList.add('ghost');
	});

	ghosts.forEach(ghost => moveGhost(ghost));

	function moveGhost(ghost) {
		const directions = [-1, +1, -width, +width];
		let direction = directions[Math.floor(Math.random() * directions.length)];

		ghost.timerId = setInterval(function() {
			if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
				squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
				ghost.currentIndex += direction;
				squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
			} else {
				direction = directions[Math.floor(Math.random() * directions.length)];
			}

			if(ghost.isScared) {
				squares[ghost.currentIndex].classList.add('scared-ghost');
			}

			if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
				squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
				ghost.currentIndex = ghost.startIndex;
				scroe += 100;
				squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
			}
			checkGameOver();
		}, ghost.speed);
	}

	function checkGameOver() {
		if(squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
			ghosts.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener('keyup', movePacman);
			grid.style.display = 'none';
			start_game.style.display = 'inline';
			gameOver.innerHTML = 'Game Over';
		}
	}

	function checkForWin() {
		for ( i = 1; i <= 10; i++) {
			if(score === 274 * i) {
				j++;
				level.innerHTML = j;
				createBoard();
			}
		}
	}

})
