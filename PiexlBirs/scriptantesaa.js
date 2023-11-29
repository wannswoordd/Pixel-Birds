const canv = document.querySelector('#jogo');
const context =canv.getContext('2d');
let frames = 0;

const sprites = new Image();
sprites.src = './sprites3.png';


//função criada para verificar se o flapp bateu o chão
function fazColizao(flapp, chao){
const flappy = globais.flapp.y + flapp.altura;
const chaoy = globais.chao.y;

if(flappy >= chaoy){
    return true;
}
return false;

}

//usado para sempre criar um flapp novo, assim quando ele 
//bate no chão ele recomeça por meio desta função, que armazena
// o flapp.
function criaFlapp(){
const flapp = {
    spritex :0,
    spritey:0,
    largura:35,
    altura:36,
    x:10,
    y:50,
    gravidade:0.25,
    pula:4.6,
    pulo(){
        flapp.velocidade = -flapp.pula;
    },
    velocidade:0,
    //atualiza caso o flapp bata no chao
    atualiza(){

        if(fazColizao(flapp, globais.chao)){

            
            mudaTela(telas.gameover);
            return;
        };
        flapp.velocidade = flapp.velocidade + flapp.gravidade;
        flapp.y = flapp.y + flapp.velocidade;
    },

    //movimentos para animar a assa do flapp.
    movimentos: [
    
        {spritex: 631, spritey: 209,},
        {spritex: 630, spritey:255,},
        {spritex: 631, spritey:305,},
    
    ],

    frameAtu: 0,
    atualizaFrameAtu(){
        const interFram = 10;
        const passoI = frames % interFram === 0;
        if(passoI){
            const baseINcre = 1;
        const incremento = baseINcre + flapp.frameAtu;
        const baseREpe = flapp.movimentos.length;
        flapp.frameAtu = incremento % baseREpe;

        }
        
    },
    desenha(){
        flapp.atualizaFrameAtu();
        const {spritex, spritey} = flapp.movimentos[flapp.frameAtu];
        context.drawImage(
            sprites,
            spritex, spritey,
            flapp.largura,flapp.altura,
            flapp.x,flapp.y,
            flapp.largura,flapp.altura,
        );
    }
}
return flapp;
}
function criaChao(){
const chao = {
    spritex :0,
    spritey:610,
    largura:224,
    altura:112,
    x:0,
    y:canv.height - 112,
    atualiza(){
        const movimentaChao = 1;
        const reper = chao.largura / 2;
        const movimentacao =  chao.x - movimentaChao;
        chao.x = movimentacao % reper;


    },
  desenha(){
        context.drawImage(
            sprites,
            chao.spritex, chao.spritey,
            chao.largura,chao.altura,
             chao.x,chao.y,
             chao.largura,chao.altura,
         );

         context.drawImage(
            sprites,
            chao.spritex, chao.spritey,
            chao.largura,chao.altura,
             (chao.x + chao.largura),chao.y,
             chao.largura,chao.altura,
         );
     }
 }
return chao;
}

 const panoFUndo = {

    spritex :391,
    spritey:2,
    largura:275,
    altura:205,
    x:0,
    y:canv.height - 284,
    desenha(){
        context.fillStyle = '#70c5ce';
        context.fillRect(0,0, canv.width, canv.height)

        context.drawImage(
            sprites,
            panoFUndo.spritex, panoFUndo.spritey,
            panoFUndo.largura,panoFUndo.altura,
             panoFUndo.x,panoFUndo.y,
             panoFUndo.largura,panoFUndo.altura,
         );
         context.drawImage(
            sprites,
            panoFUndo.spritex, panoFUndo.spritey,
            panoFUndo.largura,panoFUndo.altura,
             (panoFUndo.x + panoFUndo.largura),panoFUndo.y,
             panoFUndo.largura,panoFUndo.altura,
         );

    }

 }

 const mensagem = {
    sx:134,
    sy:0,
    w:174,
    h:152,
    x: (canv.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        context.drawImage(
            sprites,
            mensagem.sx, mensagem.sy,
            mensagem.w, mensagem.h,
            mensagem.x, mensagem.y,
            mensagem.w, mensagem.h
        );
    }
 }

 const mensagemFim = {
    sx:135,
    sy:154,
    w:224,
    h:199,
    x: (canv.width / 2) - 224 / 2,
    y: 50,
    desenha(){
        context.drawImage(
            sprites,
            mensagemFim.sx, mensagemFim.sy,
            mensagemFim.w, mensagemFim.h,
            mensagemFim.x, mensagemFim.y,
            mensagemFim.w, mensagemFim.h
        );
    }
 }

 function criaCano(){
    const canos = {
        largura:52,
        altura:400,
        chao: {
            spritex:0,
            spritey:169,
        },
        ceu: {
            spritex:52,
            spritey:169,
        },
        espaco:80,
        desenha(){
            
            canos.pares.forEach(function(par){
                const yRAmdom = par.y;
            const espacamentoentreCanos = 90;
            const canoCeux = par.x;
            const canoCeuy = yRAmdom;

                context.drawImage(
                    sprites,
                    canos.ceu.spritex, canos.ceu.spritey,
                    canos.largura, canos.altura,
                    canoCeux, canoCeuy,
                    canos.largura, canos.altura,
                )
    
                const canoCHaox = par.x;
                const canoChaoy = canos.altura + espacamentoentreCanos + yRAmdom;
                context.drawImage(
                    sprites,
                    canos.chao.spritex, canos.chao.spritey,
                    canos.largura, canos.altura,
                    canoCHaox, canoChaoy,
                    canos.largura, canos.altura,
                )
                par.canoCeu = {
                    x: canoCeux,
                    y:canos.altura + canoCeuy
                }
                par.canoChao = {
                    x: canoCHaox,
                    y: canoChaoy
                }

            })

            
        },
        temColisaoComoflapp(par){
            const cabefalpp = globais.flapp.y;
            const pedoFlapp = globais.flapp.y + globais.flapp.altura;

            if((globais.flapp.x + (globais.flapp.largura - 5))>= par.x){

            

            if(cabefalpp <= par.canoCeu.y){
                return true;

            }

            if(pedoFlapp >= par.canoChao.y)
            {
                return true;

            }
        }

            return false;
        },
        pares:[],
        
        atualiza(){
            const passoCEmframes= frames % 100 ===0;
            if(passoCEmframes){

                canos.pares.push(
                    
            {
                x:canv.width ,
               
                y:-150 * (Math.random() + 1) ,
                    },
                )


            }

            canos.pares.forEach(function(par){
                par.x = par.x -2;

                if(canos.temColisaoComoflapp(par)){
                    mudaTela(telas.gameover);

                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }
            });

        }
    }
    return canos;
 }

//telas

const globais = {};
let telaAtiva = {};
function mudaTela(novatela){
    telaAtiva = novatela;

    if(telaAtiva. inicializa){
        telaAtiva.inicializa();
    }
}

function criaPlacar(){
    const placar = {
        pt :0,

        desenha(){
            context.font = '35px "VT323"';
            context.textAlign = 'right';
            context.fillStyle = 'white';
            context.fillText(`ola ${placar.pt}`, canv.width , 35);

        },
        atualiza(){
            const frameinter = 90;
            const passoframe = frames % frameinter === 0 ;

            if(passoframe){

            placar.pt = placar.pt + 1;
        
        }


        },
    }
    return placar;
}

const telas = {
    inicio: {
        inicializa(){
            globais.flapp = criaFlapp();
            globais.chao = criaChao();
            globais.canos = criaCano();
        },
        desenha(){
            
        panoFUndo.desenha();
        globais.flapp.desenha();
    
        globais.canos.desenha();
        globais.chao.desenha();
        mensagem.desenha();

        },
        click(){
            mudaTela(telas.jogo);
        },
        atualiza(){
            globais.chao.atualiza();
        

        }
    }
};
telas.jogo = {
    inicializa(){
        globais.placar = criaPlacar();

    },
    desenha(){
        panoFUndo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flapp.desenha();
        globais.placar.desenha();
    },
    click(){
globais.flapp.pulo();
    },
    atualiza(){
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flapp.atualiza();
        globais.placar.atualiza();
       
    }
}

telas.gameover ={
    desenha(){
        mensagemFim.desenha();

    },

    atualiza(){

    },
    click(){
        mudaTela(telas.inicio);
    }
}


function loop(){
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames+1;

requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});
mudaTela(telas.inicio);
loop();


function sair(){
    location = "./login.html"
    alert("muito obrigado por jogar");
}

function modal(){
    location = "./modal.html"
    alert("muito obrigado por jogar");
}


// const canv = document.querySelector('#jogo');
// const context =canv.getContext('2d');
// let frames = 0;

// const sprites = new Image();
// sprites.src = './sprites.png';


// //função criada para verificar se o flapp bateu o chão
// function fazColizao(flapp, chao){
// const flappy = globais.flapp.y + flapp.altura;
// const chaoy = globais.chao.y;

// if(flappy >= chaoy){
//     return true;
// }
// return false;

// }

// //usado para sempre criar um flapp novo, assim quando ele 
// //bate no chão ele recomeça por meio desta função, que armazena
// // o flapp.
// function criaFlapp(){
// const flapp = {
//     spritex :0,
//     spritey:0,
//     largura:33,
//     altura:24,
//     x:10,
//     y:50,
//     gravidade:0.25,
//     pula:4.6,
//     pulo(){
//         flapp.velocidade = -flapp.pula;
//     },
//     velocidade:0,
//     //atualiza caso o flapp bata no chao
//     atualiza(){

//         if(fazColizao(flapp, globais.chao)){

            
//             mudaTela(telas.gameover);
//             return;
//         };
//         flapp.velocidade = flapp.velocidade + flapp.gravidade;
//         flapp.y = flapp.y + flapp.velocidade;
//     },

//     //movimentos para animar a assa do flapp.
//     movimentos: [
    
//         {spritex: 0, spritey: 0,},
//         {spritex: 0, spritey:26,},
//         {spritex: 0, spritey:52,},
    
//     ],

//     frameAtu: 0,
//     atualizaFrameAtu(){
//         const interFram = 10;
//         const passoI = frames % interFram === 0;
//         if(passoI){
//             const baseINcre = 1;
//         const incremento = baseINcre + flapp.frameAtu;
//         const baseREpe = flapp.movimentos.length;
//         flapp.frameAtu = incremento % baseREpe;

//         }
        
//     },
//     desenha(){
//         flapp.atualizaFrameAtu();
//         const {spritex, spritey} = flapp.movimentos[flapp.frameAtu];
//         context.drawImage(
//             sprites,
//             spritex, spritey,
//             flapp.largura,flapp.altura,
//             flapp.x,flapp.y,
//             flapp.largura,flapp.altura,
//         );
//     }
// }
// return flapp;
// }
// function criaChao(){
// const chao = {
//     spritex :0,
//     spritey:610,
//     largura:224,
//     altura:112,
//     x:0,
//     y:canv.height - 112,
//     atualiza(){
//         const movimentaChao = 1;
//         const reper = chao.largura / 2;
//         const movimentacao =  chao.x - movimentaChao;
//         chao.x = movimentacao % reper;


//     },
//   desenha(){
//         context.drawImage(
//             sprites,
//             chao.spritex, chao.spritey,
//             chao.largura,chao.altura,
//              chao.x,chao.y,
//              chao.largura,chao.altura,
//          );

//          context.drawImage(
//             sprites,
//             chao.spritex, chao.spritey,
//             chao.largura,chao.altura,
//              (chao.x + chao.largura),chao.y,
//              chao.largura,chao.altura,
//          );
//      }
//  }
// return chao;
// }

//  const panoFUndo = {

//     spritex :390,
//     spritey:0,
//     largura:275,
//     altura:284,
//     x:0,
//     y:canv.height - 284,
//     desenha(){
//         context.fillStyle = '#70c5ce';
//         context.fillRect(0,0, canv.width, canv.height)

//         context.drawImage(
//             sprites,
//             panoFUndo.spritex, panoFUndo.spritey,
//             panoFUndo.largura,panoFUndo.altura,
//              panoFUndo.x,panoFUndo.y,
//              panoFUndo.largura,panoFUndo.altura,
//          );
//          context.drawImage(
//             sprites,
//             panoFUndo.spritex, panoFUndo.spritey,
//             panoFUndo.largura,panoFUndo.altura,
//              (panoFUndo.x + panoFUndo.largura),panoFUndo.y,
//              panoFUndo.largura,panoFUndo.altura,
//          );

//     }

//  }

//  const mensagem = {
//     sx:134,
//     sy:0,
//     w:174,
//     h:152,
//     x: (canv.width / 2) - 174 / 2,
//     y: 50,
//     desenha(){
//         context.drawImage(
//             sprites,
//             mensagem.sx, mensagem.sy,
//             mensagem.w, mensagem.h,
//             mensagem.x, mensagem.y,
//             mensagem.w, mensagem.h
//         );
//     }
//  }

//  const mensagemFim = {
//     sx:135,
//     sy:154,
//     w:224,
//     h:199,
//     x: (canv.width / 2) - 224 / 2,
//     y: 50,
//     desenha(){
//         context.drawImage(
//             sprites,
//             mensagemFim.sx, mensagemFim.sy,
//             mensagemFim.w, mensagemFim.h,
//             mensagemFim.x, mensagemFim.y,
//             mensagemFim.w, mensagemFim.h
//         );
//     }
//  }

//  function criaCano(){
//     const canos = {
//         largura:52,
//         altura:400,
//         chao: {
//             spritex:0,
//             spritey:169,
//         },
//         ceu: {
//             spritex:52,
//             spritey:169,
//         },
//         espaco:80,
//         desenha(){
            
//             canos.pares.forEach(function(par){
//                 const yRAmdom = par.y;
//             const espacamentoentreCanos = 90;
//             const canoCeux = par.x;
//             const canoCeuy = yRAmdom;

//                 context.drawImage(
//                     sprites,
//                     canos.ceu.spritex, canos.ceu.spritey,
//                     canos.largura, canos.altura,
//                     canoCeux, canoCeuy,
//                     canos.largura, canos.altura,
//                 )
    
//                 const canoCHaox = par.x;
//                 const canoChaoy = canos.altura + espacamentoentreCanos + yRAmdom;
//                 context.drawImage(
//                     sprites,
//                     canos.chao.spritex, canos.chao.spritey,
//                     canos.largura, canos.altura,
//                     canoCHaox, canoChaoy,
//                     canos.largura, canos.altura,
//                 )
//                 par.canoCeu = {
//                     x: canoCeux,
//                     y:canos.altura + canoCeuy
//                 }
//                 par.canoChao = {
//                     x: canoCHaox,
//                     y: canoChaoy
//                 }

//             })

            
//         },
//         temColisaoComoflapp(par){
//             const cabefalpp = globais.flapp.y;
//             const pedoFlapp = globais.flapp.y + globais.flapp.altura;

//             if((globais.flapp.x + (globais.flapp.largura - 5))>= par.x){

            

//             if(cabefalpp <= par.canoCeu.y){
//                 return true;

//             }

//             if(pedoFlapp >= par.canoChao.y)
//             {
//                 return true;

//             }
//         }

//             return false;
//         },
//         pares:[],
        
//         atualiza(){
//             const passoCEmframes= frames % 100 ===0;
//             if(passoCEmframes){

//                 canos.pares.push(
                    
//             {
//                 x:canv.width ,
               
//                 y:-150 * (Math.random() + 1) ,
//                     },
//                 )


//             }

//             canos.pares.forEach(function(par){
//                 par.x = par.x -2;

//                 if(canos.temColisaoComoflapp(par)){
//                     mudaTela(telas.gameover);

//                 }

//                 if(par.x + canos.largura <= 0){
//                     canos.pares.shift();
//                 }
//             });

//         }
//     }
//     return canos;
//  }

// //telas

// const globais = {};
// let telaAtiva = {};
// function mudaTela(novatela){
//     telaAtiva = novatela;

//     if(telaAtiva. inicializa){
//         telaAtiva.inicializa();
//     }
// }

// function criaPlacar(){
//     const placar = {
//         pt :0,

//         desenha(){
//             context.font = '35px "VT323"';
//             context.textAlign = 'right';
//             context.fillStyle = 'white';
//             context.fillText(`ola ${placar.pt}`, canv.width , 35);

//         },
//         atualiza(){
//             const frameinter = 90;
//             const passoframe = frames % frameinter === 0 ;

//             if(passoframe){

//             placar.pt = placar.pt + 1;
        
//         }


//         },
//     }
//     return placar;
// }

// const telas = {
//     inicio: {
//         inicializa(){
//             globais.flapp = criaFlapp();
//             globais.chao = criaChao();
//             globais.canos = criaCano();
//         },
//         desenha(){
            
//         panoFUndo.desenha();
//         globais.flapp.desenha();
    
//         globais.canos.desenha();
//         globais.chao.desenha();
//         mensagem.desenha();

//         },
//         click(){
//             mudaTela(telas.jogo);
//         },
//         atualiza(){
//             globais.chao.atualiza();
        

//         }
//     }
// };
// telas.jogo = {
//     inicializa(){
//         globais.placar = criaPlacar();

//     },
//     desenha(){
//         panoFUndo.desenha();
//         globais.canos.desenha();
//         globais.chao.desenha();
//         globais.flapp.desenha();
//         globais.placar.desenha();
//     },
//     click(){
// globais.flapp.pulo();
//     },
//     atualiza(){
//         globais.canos.atualiza();
//         globais.chao.atualiza();
//         globais.flapp.atualiza();
//         globais.placar.atualiza();
       
//     }
// }

// telas.gameover ={
//     desenha(){
//         mensagemFim.desenha();

//     },

//     atualiza(){

//     },
//     click(){
//         mudaTela(telas.inicio);
//     }
// }


// function loop(){
//     telaAtiva.desenha();
//     telaAtiva.atualiza();

//     frames = frames+1;

// requestAnimationFrame(loop);
// }

// window.addEventListener('click', function(){
//     if(telaAtiva.click){
//         telaAtiva.click();
//     }
// });
// mudaTela(telas.inicio);
// loop();
