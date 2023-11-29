function entrar(){
    let nomeell = document.getElementById('usuario').value;
    let senhaell = document.getElementById('senha').value;

    dados = localStorage.getItem('name');
    dadoscerto = JSON.parse(dados)

    if(nomeell === "Nickname" || senhaell === "senha" || nomeell === "" || senhaell=== "" || nomeell != dadoscerto.nome || senhaell != dadoscerto.senha1){
        alert("por favor preencha os campos");
    }
    else{
    
    location = "./teste.html"
    alert("Entrando no Jogo")
    }

}