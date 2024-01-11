let visor = document.querySelector('#display');
let primeiroOperando = '';
let segundoOperando = '';
let operadorSelecionado = '';
let resultado = 0;
let estadoCalculadora = 'primeiroOperando';

function limparDisplay() {
    visor.innerHTML = '0';
    primeiroOperando = '';
    segundoOperando = '';
    operadorSelecionado = '';
    resultado = 0;
    estadoCalculadora = 'primeiroOperando';
}

function calculaResultado() {
    switch (operadorSelecionado) {
        case '+':
            resultado = parseFloat(primeiroOperando) + parseFloat(segundoOperando);
            break;
        case '-':
            resultado = parseFloat(primeiroOperando) - parseFloat(segundoOperando);
            break;
        case '*':
            resultado = parseFloat(primeiroOperando) * parseFloat(segundoOperando);
            break;
        case '/':
            resultado = parseFloat(primeiroOperando) / parseFloat(segundoOperando);
            break;
    }

    visor.innerHTML = resultado;
    estadoCalculadora = 'resultado';
}

function clique(valor) {
    if (estadoCalculadora === 'resultado') {
        // Se o resultado foi exibido, limpe o visor antes de começar uma nova operação
        limparDisplay();
    }

    if (!isNaN(parseFloat(valor)) || valor === '.') {
        // Se o valor clicado é um número ou ponto decimal
        if (estadoCalculadora === 'primeiroOperando') {
            primeiroOperando += valor;
            visor.innerHTML = primeiroOperando;
        } else if (estadoCalculadora === 'segundoOperando') {
            segundoOperando += valor;
            visor.innerHTML = segundoOperando;
        }
    } else if (['+', '-', '*', '/'].includes(valor)) {
        // Se o valor clicado é um operador
        if (estadoCalculadora === 'primeiroOperando') {
            operadorSelecionado = valor;
            estadoCalculadora = 'segundoOperando';
        } else if (estadoCalculadora === 'segundoOperando') {
            // Se já houver um operador e um segundo operando, calcule o resultado
            calculaResultado();
            operadorSelecionado = valor;
            estadoCalculadora = 'segundoOperando';
        }
    } else if (valor === '=') {
        // Se o valor clicado é igual, calcule o resultado
        calculaResultado();
    }

    // Destaque o operador clicado
    let operadores = document.querySelectorAll('.operador');
    for (let operador of operadores) {
       if (valor.toLowerCase() === operador.textContent.toLowerCase() || (valor === 'x' && operador.textContent === '×')){
            operador.style.backgroundColor = '#ddd';
        } else {
            operador.style.backgroundColor = '';
        }
    }
}
document.addEventListener('keydown', function (event) {
    // Obtém o valor da tecla pressionada
    const valorTecla = event.key;

    // Verifica se é um número, operador ou Enter
    if (!isNaN(parseFloat(valorTecla)) || valorTecla === '.') {
        clique(valorTecla);
    } else if (['+', '-', '*', '/'].includes(valorTecla)) {
        clique(valorTecla);
    } else if (valorTecla === 'Enter') {
        clique('=');
    }
});