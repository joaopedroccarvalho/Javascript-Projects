let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let numeros = document.querySelector('.d-1-3');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let audioDigito = document.querySelector('.audio-digito');
let audioFim = document.querySelector('.audio-fim');
// Aqui, são selecionados elementos HTML usando document.querySelector para manipulação posterior no código. Esses elementos representam partes da interface gráfica do sistema de votação.


let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];
// Essas variáveis são usadas para controlar o estado do sistema. etapaAtual indica a etapa atual da votação, numero armazena os números digitados pelo usuário, votoBranco indica se o voto é em branco, e votos armazena os votos confirmados.

function comecarEtapa() { //  // Esta função é chamada para iniciar uma nova etapa da votação. Ela atualiza a interface gráfica para exibir o cargo da etapa atual e prepara a área para inserção dos números do voto.
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none'
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface() { // Esta função é chamada para atualizar a interface gráfica com as informações do candidato escolhido ou indicar voto nulo.
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true
        } else {
            return false
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome ${candidato.nome}<br/>Partido ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                
            fotosHtml += `<div class="d-1-image small"><img src="assets/images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
            else {
                fotosHtml += `<div class="d-1-image"><img src="assets/images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
             }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML= '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) { // Esta função é chamada quando o usuário clica em um número. Ela atualiza a interface, adicionando o número clicado à representação visual do voto.
    audioDigito.play();
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero != null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface();
        }
    
    }
}
function branco() { // Esta função é chamada quando o usuário clica no botão de voto em branco. Ela atualiza a interface para indicar voto em branco.
    audioDigito.play();
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML= '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}   
function corrige() { // Esta função é chamada quando o usuário clica no botão "Corrige". Ela reinicia a etapa atual, permitindo que o usuário refaça suas escolhas.
    audioDigito.play();
    comecarEtapa();
}
function confirma() { //Esta função é chamada quando o usuário clica no botão "Confirma". Ela confirma o voto atual e avança para a próxima etapa ou encerra a votação.
    let etapa = etapas[etapaAtual];
    
    let votoConfirmado = false;
    
     if(votoBranco === true) {
        audioFim.play();
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
     } else if(numero.length === etapa.numeros) {
        audioFim.play();
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
     }

     if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
            console.log(votos);
        }
     }
}

comecarEtapa(); //Esta linha inicia a primeira etapa da votação quando a página é carregada.