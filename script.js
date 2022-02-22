let init = "trees"
let word = ""
let darr = []
let final = 0
let canvas = new Raphael(0,0,innerWidth,innerHeight)
let board = new Array(5)
let raphobj = new Array(5)
let pboard = new Array(5)
for(let i = 0; i < 6; i++) {
  board[i] = new Array(5)
  raphobj[i] = new Array(5)
  pboard[i] = new Array(5)
  for(let x = 0;x<board[i].length;x++){
    board[i][x] = 0
    raphobj[i][x] = 0
    pboard[i][x] = 0
  }
}
let pointer = 0
let rpointer = 0

 
onkeydown = (k)=>{
  let key = k.key
  if(key == "Backspace" && pointer >0){
    pointer-=1
    board[rpointer][pointer+1] = 0
    pboard[rpointer][pointer+1] = 0
  }else{
    board[rpointer][pointer] = 0
    pboard[rpointer][pointer] = 0
  }
  let letters = "abcdefghijklmnopqrstuvwxyz"
  for(let i = 0;i<letters.length+1;i++){
    if(letters.substring((i>=1)?i-1:0,i)==key){
      if(pointer<=4&&pointer>0&&pointer<6){
        pointer++
        // board[rpointer][pointer]= key
        board[rpointer][pointer-1] = key
      }else if(pointer<4){
        pointer++
        board[rpointer][pointer-1] = key
      }
      console.log(board)
    }
  }
  if(key == "Enter"){
    // darr = []
    word = ""
    
    for(let i = 0;i<5;i++){
      word = word + board[rpointer][i]
    }
    if(checkword(word)){
    
    for(let i = 0;i<5;i++){
      if(word.indexOf(init[i]) == init.indexOf(word[i])&& init.includes(word[i])){
        console.log("position " + i + " matches in the correct spot")
        pboard[rpointer][i] = 1
        final++
      }else if(word.indexOf(init[i]) != init.indexOf(word[i]) && init.includes(word[i])){
  //     for( let i = 0 ;i < word.length ;i++)
  // {
  //   //variable counting occurrence
  //   let count = 0;
  //   for( let j = 0 ;j < init.length ;j++)
  //   {
  //     if( word[i] == init[j] && i > j  )
  //     {
  //      break;
  //     }
  //     if( word[i] == init[j]  )
  //     {
  //       count++;
  //     }
  //   }
  //   if( count > 0)
  //   console.log(`${word[i]} occurs ${count} times`);
     
  // }
      console.log("position " + i + " matches in the wrong spot")
      pboard[rpointer][i] = 2
      }
    }
    console.log(word)
    console.log(rpointer<=4 && pointer == 5 && checkword(word))
    if(rpointer<=4 && pointer == 5 && checkword(word) == true){
      rpointer++
      pointer = 0
      console.log("valid word")
    }
  }
  }
  update()
}
const checkword = (word) =>{
  return words.includes(word)
}
let update = () =>{

  if(final == 5){
    console.log("you won")
  }
  pboard[rpointer][pointer] = 3

  canvas.clear()
  for(let row = 0;row<6;row++){
    for(let col = 0;col<5;col++){
      let sqr = canvas.rect(innerWidth/2-124+col*67,innerHeight/2-150+row*67,62,62)
      if(board[row][col] != 0){
        canvas.text(raphobj[row][col].attrs.x+31, raphobj[row][col].attrs.y+31, board[row][col]).attr({fill: 'black',"font-size": "30px"});
      }
      raphobj[row][col] = sqr
      if(pboard[row][col] == 3){
        sqr.attr({fill:"grey"})
      }else if(pboard[row][col] == 1){
      let sqr = canvas.rect(innerWidth/2-124+col*67,innerHeight/2-150+row*67,62,62)
      canvas.text(raphobj[row][col].attrs.x+31, raphobj[row][col].attrs.y+31, board[row][col]).attr({fill: 'black',"font-size": "30px"});
      sqr.attr({fill:"green"})
      }else if(pboard[row][col] == 2){
        let sqr = canvas.rect(innerWidth/2-124+col*67,innerHeight/2-150+row*67,62,62)
      sqr.attr({fill:"yellow"})
        canvas.text(raphobj[row][col].attrs.x+31, raphobj[row][col].attrs.y+31, board[row][col]).attr({fill: 'black',"font-size": "30px"});
      }
    }
  }
  console.log(pointer)
}
update()
// setInterval(update,10)
console.log(board)
