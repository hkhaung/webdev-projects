function Game(boardSize, player0Marker, player1Marker) {
    function Board(size) {
        let board = [];
        for (let i = 0; i < size; i++) {
            board.push(Array(size).fill(' '));
        }
    
        this.display = function() {
            for (let i = 0; i < size; i++) {
                console.log(board[i])
                console.log('\n');
            }
        };
    
        this.reset = function() {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    board[i][j] = ' ';
                }
            }
        }

        this.askForCellToSet = function() {
            let row = Number(prompt("Enter row: "));
            let col = Number(prompt("Enter column: "));
            while (!(row >= 0 && row < size && col >= 0 && col < size && board[row][col] === ' ')) {
                row = Number(prompt("Enter row: "));
                col = Number(prompt("Enter column: "));
            }
            return [row, col];
        }
    
        this.setCell = function(row, col, value) {
            if (this.hasEmptyCells()) {
                board[row][col] = value;
                return checkWin(row, col, value);
            }
            return false;
        };
    
        // helper function for setCell function
        this.hasEmptyCells = function() {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (board[i][j] === ' ') {
                        return true;
                    }
                }
            }
            return false;
        };
    
        // helper function for setCell function
        // this function should only be called after setCell function
        // checks if after placing a marker at row, col will make a player win the game
        let checkWin = function(row, col, value) {
            // check row
            let isRow = true;
            for (let j = 0; j < size; j++) {
                if (board[row][j] !== value) {
                    isRow = false;
                    break;
                }
            }
        
            // check column
            let isCol = true;
            for (let i = 0; i < size; i++) {
                if (board[i][col] !== value) {
                    isCol = false;
                    break;
                }
            }
        
            // check main diagonal (top-left to bottom-right)
            let isDiag0 = true;
            for (let i = 0; i < size; i++) {
                if (board[i][i] !== value) {
                    isDiag0 = false;
                    break;
                }
            }
        
            // check anti-diagonal (top-right to bottom-left)
            let isDiag1 = true;
            for (let i = 0; i < size; i++) {
                if (board[i][size - 1 - i] !== value) {
                    isDiag1 = false;
                    break;
                }
            }

            return (isRow || isCol || isDiag0 || isDiag1);
        };
    }
    
    function Player(marker) {
        this.marker = marker;
        this.getMarker = () => this.marker;
    }


    let player0WinCount = 0;
    let player0 = new Player(player0Marker);
    let player1WinCount = 0;
    let player1 = new Player(player1Marker);
    let totalGames = 0;
    let turn = Math.floor(Math.random() * 2); // randomly choose a player to start the game
    
    let board = new Board(boardSize);
    let displayPlayerTurn = () => console.log(turn === 0 ? "Player 0's turn!" : "Player 1's turn");

    this.help = function() {
        console.log('The following functions are available:\n');
        console.log('help\n');
        console.log('getPlayer0WinCount\n');
        console.log('getPlayer1WinCount\n');
        console.log('getTotalGames\n');
        console.log('playGame\n');
    };

    this.getPlayer0WinCount = () => player0WinCount;
    this.getPlayer1WinCount = () => player1WinCount;
    this.getTotalGames = () => totalGames;

    this.playGame = function() {
        if (totalGames === 0) {
            this.help();
        }

        totalGames++;
        board.reset();
        while (true) {
            if (!board.hasEmptyCells()) {
                board.display();
                console.log('The game is a draw!');
                break;
            }
            
            displayPlayerTurn();
            board.display();
            const [row, col] = board.askForCellToSet();

            if (turn === 0) {
                let willWin = board.setCell(row, col, player0.getMarker());
                if (willWin) {
                    board.display();
                    console.log('Player 0 wins!');
                    player0WinCount++;
                    break;
                }
            } else {
                let willWin = board.setCell(row, col, player1.getMarker());
                if (willWin) {
                    board.display();
                    console.log('Player 1 wins!');
                    player1WinCount++;
                    break;
                }
            }

            turn = (turn === 0) ? 1 : 0;
        }
    };

    this.reset = function(boardSize=this.boardSize, player0Marker=this.player0Marker, player1Marker=this.player1Marker) {
        this.player0WinCount = 0;
        this.player0 = new Player(player0Marker);
        this.player1WinCount = 0;
        this.player1 = new Player(player1Marker);
        this.totalGames = 0;
        this.turn = Math.floor(Math.random() * 2); // randomly choose a player to start the game
        this.board = new Board(boardSize);
    }
};


// simple test
function test() {
    let game = new Game(3, 'X', 'O');
    game.playGame();
}
