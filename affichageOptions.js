import { posssibleOptionsInput } from './model/utils.js'

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pampaHugo = new Image(960, 640);
pampaHugo.src = 'Images/backgroundHugoGrand.png';

function background(background) {
  ctx.drawImage(background, 1, 1);
}

export function affichage(selectedOption, optionsAction, gameConfig) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background(pampaHugo);
  for (let i = 0; i < optionsAction.length; i++) {
    if (selectedOption === i) {
      ctx.font = "bold 20px Arial";
    } else {
      ctx.font = "20px Arial";
    }
    if (gameConfig && optionsAction[i] !== posssibleOptionsInput.QUIT) {
      ctx.fillText(optionsAction[i] + " - " + gameConfig[optionsAction[i]], 450, i * 30 + 200);
    } else {
      ctx.fillText(optionsAction[i], 450, i * 30 + 200);
    }
    
  }
}
