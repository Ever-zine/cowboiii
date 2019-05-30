//Background
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pampaHugo = new Image(960, 640);
pampaHugo.src = 'Images/backgroundHugoGrand.png';
var cowboyAImage = new Image(200, 100);
cowboyAImage.src = 'Images/cowBoyRusseA.png';
var cowboyBImage = new Image(200, 100);
cowboyBImage.src = 'Images/cowBoyRusseB.png';
var imgBalle = new Image(20, 10);
imgBalle.src = 'Images/balle.png';
var imgAccroupiA = new Image(100, 85);
imgAccroupiA.src = 'Images/cowBoyRusseAccroupiA.png';
var imgAccroupiB = new Image(100, 85);
imgAccroupiB.src = 'Images/cowBoyRusseAccroupiB.png';
var imgDead = new Image(100, 85);
imgDead.src = 'Images/cowBoyDead.png';
var soundGun = new Audio;
soundGun.src = 'Images/panBouche.mp3'
var soundAie = new Audio;
soundAie.src = 'Images/aieBouche.mp3';


function background(background) {
  ctx.drawImage(background, 1, 1);
}


function afficheCowboy(cowboy, regardeADroite) {
  let xGauche = cowboy.centerPosition.x - (cowboy.width / 2);
  let yHaut = cowboy.centerPosition.y - (cowboy.height / 2);

  if (cowboy.accroupi && cowboy.life > 0) {
    ctx.drawImage(
      regardeADroite === true ? imgAccroupiA : imgAccroupiB,
      xGauche,
      yHaut
    );
  } else if (cowboy.life <= 0) {
    ctx.drawImage(
      imgDead,
      xGauche,
      yHaut
    );
  } else {
    ctx.drawImage(
      regardeADroite === true ? cowboyAImage : cowboyBImage,
      xGauche,
      yHaut
    );
  }

  ctx.font = "bold 20px Arial";
  ctx.fillText("Vie : " + cowboy.life, xGauche + 20, yHaut - 45);
  ctx.font = "bold 18px Arial";
  ctx.fillText("Munitions : " + cowboy.munitions, xGauche + -10, yHaut - 20);
  if (cowboy.accroupi) {
    ctx.fillText(
      "Cooldown : " + Math.round(cowboy.timeAccroupi / 1000), xGauche + -10, yHaut - 75
    );
  } else if (cowboy.accroupi === false) {
    ctx.fillText(
      "Cooldown : " + Math.round(cowboy.cooldownAccroupi / 300), xGauche + -10, yHaut - 75
    );
  }
}

function afficheBalle(bullet) {
  ctx.drawImage(imgBalle, bullet.position.x, bullet.position.y - 10);
  soundGun.play();
}

export function affichage(cowboyList, fps) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background(pampaHugo);
  ctx.font = "14px Arial";
  ctx.fillText("fps : " + Math.round(fps), 10, 20);
  
  for (let index = 0; index < cowboyList.length; index++) {
    const cowboy = cowboyList[index];
    afficheCowboy(cowboy, index === 0 ? true : false);
    // canvas.afficher(cowboy.centerPosition)
    for (let j = 0; j < cowboy.bulletFired.length; j++) {
      const bullet = cowboy.bulletFired[j];
      afficheBalle(bullet);
    }
  }
}