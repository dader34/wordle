
let init = "talon"
let word = ""
let final = 0
let canvas = new Raphael(0, 20, innerWidth, innerHeight-20)
let board = new Array(5)
let raphobj = new Array(5)
let pboard = new Array(5)
String.prototype.count=function(c) { 
  var result = 0, i = 0;
  for(i;i<this.length;i++)if(this[i]==c)result++;
  return result;
};
for (let i = 0; i < 6; i++) {
	board[i] = new Array(5)
	raphobj[i] = new Array(5)
	pboard[i] = new Array(5)
	for (let x = 0; x < board[i].length; x++) {
		board[i][x] = 0
		raphobj[i][x] = 0
		pboard[i][x] = 0
	}
}
let pointer = 0
let rpointer = 0


onkeydown = (k) => {
	let key = k.key
	if (key == "Backspace" && pointer > 0) {
		if (board[rpointer][pointer] == 0) {
			board[rpointer][pointer - 1] = 0
			pboard[rpointer][pointer - 1] = 0
			pointer -= 1
			console.log("1")
		} else if (board[rpointer][pointer] == undefined) {
			board[rpointer][pointer - 1] = 0
			pboard[rpointer][pointer - 1] = 0
			pointer -= 1
			console.log("1.5")
		}

	} else if (key == "Backspace" && pointer > 0) {
		pointer -= 1
		if (pointer < 4) {
			board[rpointer][pointer + 1] = 0
			pboard[rpointer][pointer + 1] = 0
		}

		console.log("2")
	} else {
		board[rpointer][pointer] = 0
		pboard[rpointer][pointer] = 0
		console.log("3")
	}
	let letters = "abcdefghijklmnopqrstuvwxyz"
	for (let i = 0; i < letters.length + 1; i++) {
		if (letters.substring((i >= 1) ? i - 1 : 0, i) == key) {
			if (pointer <= 4 && pointer > 0 && pointer < 6) {
				pointer++
				// board[rpointer][pointer]= key
				board[rpointer][pointer - 1] = key
			} else if (pointer < 4) {
				pointer++
				board[rpointer][pointer - 1] = key
			}
			console.log(board)
		}
	}
	if (key == "Enter") {
		// darr = []
		word = ""

		for (let i = 0; i < 5; i++) {
			word = word + board[rpointer][i]
		}
		if (checkword(word)) {

			for (let i = 0; i < 5; i++) {
				if (word.indexOf(init[i]) == init.indexOf(word[i]) && init.includes(word[i])) {
          if(word.count(word[i])>init.count(word[i]) && word.count(word[i])>=1){
            if(word.substring(0,i).count(word[i]) == init.count(word[i])){
              console.log("Single")
              pboard[rpointer][i] = 3;
            }else{
              console.log("dupe letters")
              console.log(word[i])
              pboard[rpointer][i] = 1
              final++
            }
          }else{
            pboard[rpointer][i] = 1
            console.log("position " + i + " matches in the correct spot")
          }
          
					
					// final++
				} else if (word.indexOf(init[i]) != init.indexOf(word[i]) && init.includes(word[i])) {
          if(word.count(word[i])>init.count(word[i]) && word.count(word[i])>=1){
            if(word.substring(0,i).count(word[i]) == init.count(word[i])){
              console.log("Single")
              pboard[rpointer][i] = 3;
            }else{
              console.log("dupe letters")
              pboard[rpointer][i] = 2
              console.log("position " + i + " matches in the wrong spot")
            }
          }else{
            if(word[i] == init[i]){
              pboard[rpointer][i] = 1
            }else{
              pboard[rpointer][i] = 2
              console.log("The letter " + word[i] + " is yellow, i=" +i)
            }
          }
					// console.log("position " + i + " matches in the wrong spot")
				} else {
					pboard[rpointer][i] = 3;
				}
			}
			console.log(word)
			console.log(rpointer <= 4 && pointer == 5 && checkword(word))
			if (rpointer <= 4 && pointer == 5 && checkword(word) == true) {
				rpointer++
				pointer = 0
				console.log("valid word")
			}
		}
	}
	update()
}
const checkword = (word) => {
	return words.includes(word)
}
let update = () => {
	if (final == 5) {
		console.log("you won")
	} else {
		canvas.rect(innerWidth / 2, innerHeight / 2, 50, 50)
		pboard[rpointer][pointer] = 9
		for (let i = 0; i < pboard[rpointer].length; i++) {
			if (i != pointer) {
				pboard[rpointer][i] = 0
			}
		}

		canvas.clear()
		for (let row = 0; row < 6; row++) {
			for (let col = 0; col < 5; col++) {
				let sqr = canvas.rect(innerWidth / 2 - 165 + col * 67, innerHeight / 2 - 150 + row * 67, 62, 62)
				if (board[row][col] != 0) {
					canvas.text(raphobj[row][col].attrs.x + 31, raphobj[row][col].attrs.y + 31, board[row][col]).attr({
						fill: 'black',
						"font-size": "30px"
					});
				}
				raphobj[row][col] = sqr
				if (pboard[row][col] == 3) {
					sqr.attr({
						fill: "grey"
					})
				} else if (pboard[row][col] == 1) {
					let sqr = canvas.rect(innerWidth / 2 - 165 + col * 67, innerHeight / 2 - 150 + row * 67, 62, 62)
					canvas.text(raphobj[row][col].attrs.x + 31, raphobj[row][col].attrs.y + 31, board[row][col]).attr({
						fill: 'black',
						"font-size": "30px"
					});
					sqr.attr({
						fill: "green"
					})
				} else if (pboard[row][col] == 2) {
					let sqr = canvas.rect(innerWidth / 2 - 165 + col * 67, innerHeight / 2 - 150 + row * 67, 62, 62)
					sqr.attr({
						fill: "yellow"
					})
					canvas.text(raphobj[row][col].attrs.x + 31, raphobj[row][col].attrs.y + 31, board[row][col]).attr({
						fill: 'black',
						"font-size": "30px"
					});
				}
			}
		}
	}
	// console.log(pointer)
}
update()
setInterval(update, 10)
console.log(board)