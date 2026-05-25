// Variáveis de controle de tela
let telaAtiva = "EXPLICACAO"; // Pode ser "EXPLICACAO" ou "JOGO"

let campo = [];
let colunas = 5;
let linhas = 4;
let tamanhoCanteiro = 80;

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < colunas * linhas; i++) {
    campo[i] = 0; 
  }
}

function draw() {
  if (telaAtiva === "EXPLICACAO") {
    desenharTelaExplicativa();
  } else {
    desenharSimulador();
  }
}

function desenharTelaExplicativa() {
  background("#2E8B57"); // Verde floresta profundo
  
  fill(255);
  textAlign(CENTER);
  
  // Título
  textSize(28);
  textStyle(BOLD);
  text("Agrinho 2026", width/2, 100);
  
  // Subtítulo
  textSize(18);
  textStyle(NORMAL);
  text("Sustentabilidade e Tecnologia", width/2, 135);
  
  // Texto educativo
  textSize(15);
  let info = "A tecnologia no campo permite produzir mais\ncom menos recursos, preservando a natureza.\n\nNeste simulador, você aprenderá o ciclo do plantio\ne a importância do tempo de colheita.";
  text(info, width/2, 210);
  
  // Botão Iniciar
  fill("#FFD700"); // Cor ouro
  rect(150, 350, 200, 50, 25);
  
  fill(0);
  textSize(18);
  textStyle(BOLD);
  text("INICIAR CULTIVO", width/2, 382);
  
  // Rodapé
  fill(255, 180);
  textSize(12);
  text("Toque no botão para começar", width/2, 430);
}

function desenharSimulador() {
  background("#7cfc00"); 

  fill(0);
  textSize(22);
  textAlign(CENTER);
  text("Tecnologia no Campo", width/2, 40);
  textSize(14);
  text("Clique nos canteiros para plantar e colher", width/2, 65);

  for (let i = 0; i < colunas; i++) {
    for (let j = 0; j < linhas; j++) {
      let x = i * (tamanhoCanteiro + 10) + 30;
      let y = j * (tamanhoCanteiro + 10) + 100;
      let index = i + j * colunas;

      stroke(255);
      fill(campo[index] === 0 ? "#8B4513" : "#A0522D");
      rect(x, y, tamanhoCanteiro, tamanhoCanteiro, 10);

      if (campo[index] > 0 && campo[index] < 100) {
        campo[index] += 0.3; // Aumentei levemente a velocidade
      }
      desenharPlanta(x + tamanhoCanteiro/2, y + tamanhoCanteiro/2, campo[index]);
    }
  }
  
  // Botão de Voltar (Símbolo de interrogação)
  fill(255);
  ellipse(460, 40, 30, 30);
  fill(0);
  text("?", 460, 45);
}

function mousePressed() {
  // Lógica do Botão da Tela Explicativa
  if (telaAtiva === "EXPLICACAO") {
    if (mouseX > 150 && mouseX < 350 && mouseY > 350 && mouseY < 400) {
      telaAtiva = "JOGO";
    }
    return; // Para não clicar no campo atrás da tela
  }
  
  // Lógica para voltar à explicação
  if (dist(mouseX, mouseY, 460, 40) < 15) {
    telaAtiva = "EXPLICACAO";
    return;
  }

  // Lógica do Plantio (Sua lógica original)
  for (let i = 0; i < colunas; i++) {
    for (let j = 0; j < linhas; j++) {
      let x = i * (tamanhoCanteiro + 10) + 30;
      let y = j * (tamanhoCanteiro + 10) + 100;
      let index = i + j * colunas;

      if (mouseX > x && mouseX < x + tamanhoCanteiro && mouseY > y && mouseY < y + tamanhoCanteiro) {
        if (campo[index] === 0) {
          campo[index] = 1;
        } else if (campo[index] >= 100) {
          campo[index] = 0;
        }
      }
    }
  }
}

function desenharPlanta(x, y, crescimento) {
  if (crescimento > 0) {
    noStroke();
    fill("#32CD32");
    let tam = map(crescimento, 0, 100, 5, 45);
    ellipse(x, y, tam, tam);
    
    if (crescimento >= 100) {
      fill("#FF4500");
      ellipse(x, y, 20, 20);
      fill(255);
      textSize(10);
      text("COLHER", x, y - 30);
    }
  }
}