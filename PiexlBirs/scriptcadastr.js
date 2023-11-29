

function salva(){
    let nomeell = document.getElementById('usuario').value;
    let senhaell = document.getElementById('senha').value;

    let dados = {
        
            nome : nomeell,
            senha1 : senhaell
            
        
    };

    if(nomeell === "Nickname" || senhaell === "senha" || nomeell === "" || senhaell=== ""){
        alert("por favor preencha os campos");
    }
    else{

        location = "./teste.html";

        alert("oobrigado por se cadastrar");

        
       
   
    localStorage.setItem("name", JSON.stringify(dados));
   

  
        
}
    
}

function entrar(){
    // let nomeell = document.getElementById('usuario').value;
    // let senhaell = document.getElementById('senha').value;

    // let salvo = localStorage.getItem("name");

   
   
    

    

}

