```
FUNCTION computerBestMove (board)
	SET bestMove = findWinningSquare (board,'computer');
	IF bestMove is found (!== null) return bestMove;
	SET potentialBoard = copy of board;
	SET trialSquares = emptySquares(board).slice();
	SET squareValues = []
	SET recursionLevel = 1;
	LOOP i = 0 to idx < trialSquares.length; i++
		potentialBoard[trialSquares[i]] = MARKER ['computer'];
		squareValues.push(miniMaxValue (potentialBoard, 'human', 		  recursionLevel))
	END LOOP
	SET maxSquareValue = minOrMaxOfAnArray(squareValues,+1)
	bestMoveIndex = index of maxSquareValue
	return bestMoveIndex
				
```

```
FUNCTION miniMax (board, player, recursionLevel)
	SET playerValue = {'human': -1, tie: 0, computer: +1}
	SET miniMaxValue
  IF findWinningSquare (board, player) === true
  	return miniMaxValue = playerValue[player] / recursionLevel  
  ELSE IF boardFull(board)
    	return miniMaxValue = 0
  ELSE
  	recursionLevel++
  	LOOP i = 0 to idx < trialSquares.length; i++
  		potentialBoard[trialSquares[i]] = MARKER [player]
  		squareValues.push(miniMax (potentialBoard, alternatePlayer(), recursionLevel))
  		potentialBoard[trialSquares[i]] = MARKER ['initial']
  	END LOOP
  	miniMaxValue = minOrMaxArray (squareValues,playerValue[player])
  	return miniMaxValue
```

```
FUNCTION minOrMaxArray (arrayOfNumbers,factor)
	//factor === +1 -> max
	// factor === -1 -> min
	sortedArray = arrayOfNumbers.slice().sort((a,b)=> factor*(a-b))
	return sortedArray[0]
```



