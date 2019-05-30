var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pampaHugo = new Image(960, 640);
pampaHugo.src = 'Images/backgroundHugoGrand.png';

function background(background) {
  ctx.drawImage(background, 1, 1);
}

export function affichage(selectedMenu, menuAction) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background(pampaHugo);
  for (let i = 0; i < menuAction.length; i++) {
    if (selectedMenu === i) {
      ctx.font = "bold 20px Arial";
    } else {
      ctx.font = "20px Arial";
    }
    ctx.fillText(menuAction[i], 450, i * 30 + 200);
  }
}