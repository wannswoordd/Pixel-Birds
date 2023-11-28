const canv = document.querySelector('#jogo');
const context =canv.getContext('2d');
let frames = 0;

const sprites = new Image();
sprites.src = './sprites.png';


//função criada para verificar se o flapp bateu o chão
function fazColizao(flapp, chao){
const flappy = globais.flapp.y + flapp.altura;
const chaoy = globais.chao.y;

if(flappy >= chaoy){
    return true;
}
return false;

}
