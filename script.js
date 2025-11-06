// Lógica principal do desafio Mickey & Oswald
document.addEventListener('DOMContentLoaded', function () {
  // Elementos
  const portaisInput = document.getElementById('portais-input');
  const coresInput = document.getElementById('cores-input');
  const escolherBtn = document.getElementById('escolher-btn');
  const retornarBtn = document.getElementById('retornar-btn');
  const resultSection = document.getElementById('result-section');
  const resultContent = document.getElementById('result-content');
  const themeAudio = document.getElementById('theme-audio');
  const playAudioBtn = document.getElementById('play-audio');
  const pauseAudioBtn = document.getElementById('pause-audio');

  // Controles de áudio
  playAudioBtn.addEventListener('click', function () {
    themeAudio.play();
  });

  pauseAudioBtn.addEventListener('click', function () {
    themeAudio.pause();
  });

  // Função para calcular tempo total de viagem
  function tempoTotalViagem(portais) {
    return portais.reduce((total, tempo) => total + tempo, 0);
  }

  // Função para criar a ponte de cores
  function criarPonte(cores) {
    return cores.join(' e ');
  }

  // Função para determinar a mistura de cores
  function determinarMisturaCores(cores) {
    const coresLower = cores.map(c => c.toLowerCase().trim());
    const coresSet = new Set(coresLower);

    // Combinações específicas de cores
    const combinacoes = {
      'azul-verde': 'ciano',
      'verde-azul': 'ciano',
      'vermelho-amarelo': 'laranja',
      'amarelo-vermelho': 'laranja',
      'vermelho-azul': 'roxo',
      'azul-vermelho': 'roxo',
      'azul-verde-preto': 'verde escuro profundo',
      'azul-preto-verde': 'verde escuro profundo',
      'verde-azul-preto': 'verde escuro profundo',
      'verde-preto-azul': 'verde escuro profundo',
      'preto-azul-verde': 'verde escuro profundo',
      'preto-verde-azul': 'verde escuro profundo',
      'vermelho-verde': 'marrom',
      'verde-vermelho': 'marrom',
      'azul-amarelo': 'verde',
      'amarelo-azul': 'verde'
    };

    // Tenta encontrar uma combinação específica
    const chave = coresLower.join('-');
    if (combinacoes[chave]) {
      return combinacoes[chave];
    }

    // Lógica de cores primárias e secundárias
    const primarias = ['vermelho', 'azul', 'amarelo'];
    const temPrimarias = coresLower.filter(c => primarias.includes(c));

    if (coresSet.has('preto') && coresSet.size > 1) {
      if (coresSet.has('azul') && coresSet.has('verde')) {
        return 'verde escuro profundo';
      }
      return 'tom escuro';
    }

    if (coresSet.has('branco') && coresSet.size > 1) {
      return 'tom pastel';
    }

    if (temPrimarias.length === 3) {
      return 'marrom';
    }

    if (temPrimarias.length === 2) {
      if (coresSet.has('vermelho') && coresSet.has('azul')) return 'roxo';
      if (coresSet.has('vermelho') && coresSet.has('amarelo')) return 'laranja';
      if (coresSet.has('azul') && coresSet.has('amarelo')) return 'verde';
    }

    if (coresSet.size === 1) {
      return coresLower[0];
    }

    return 'mistura complexa de cores';
  }

  // Botão ESCOLHER
  escolherBtn.addEventListener('click', function () {
    const portaisTexto = portaisInput.value.trim();
    const coresTexto = coresInput.value.trim();

    if (!portaisTexto && !coresTexto) {
      resultContent.innerHTML =
        '<p class="result-placeholder" style="color: #ff6b6b;">⚠️ Por favor, preencha pelo menos um dos campos!</p>';
      return;
    }

    let html = '';

    // Processar Portais
    if (portaisTexto) {
      const portais = portaisTexto
        .split(',')
        .map(p => parseInt(p.trim()))
        .filter(p => !isNaN(p));

      if (portais.length !== 7) {
        html += `
                    <div class="calculation-step" style="border-left-color: #ff6b6b;">
                        <h4 style="color: #ff6b6b;">⚠️ Desafio 1 - Erro!</h4>
                        <p>Você inseriu ${portais.length} portal(is), mas Mickey precisa atravessar exatamente 7 Portais Mágicos!</p>
                    </div>
                `;
      } else {
        const total = tempoTotalViagem(portais);

        html += `
                    <div class="calculation-step">
                        <h4>🌀 Desafio 1: A Travessia dos 7 Portais</h4>
                        <p><strong>Portais inseridos:</strong> ${portais.join(', ')}</p>
                        <p><strong>Cálculo:</strong></p>
                        <p style="margin-left: 15px;">${portais.join(' + ')} = ${total}</p>
                    </div>
                    <div class="final-result">
                        <h4>⏱️ Tempo Total de Viagem</h4>
                        <span class="result-value">${total} segundos</span>
                        <p style="font-size: 12px; color: #90feb5; margin-top: 10px;">
                            Mickey atravessou todos os ${portais.length} portais com sucesso!
                        </p>
                    </div>
                `;
      }
    }

    // Processar Cores
    if (coresTexto) {
      const cores = coresTexto
        .split(',')
        .map(c => c.trim())
        .filter(c => c.length > 0);

      if (cores.length === 0) {
        html += `
                    <div class="calculation-step" style="border-left-color: #ff6b6b;">
                        <h4 style="color: #ff6b6b;">⚠️ Desafio Extra - Erro!</h4>
                        <p>Nenhuma cor válida foi inserida!</p>
                    </div>
                `;
      } else {
        const ponte = criarPonte(cores);
        const mistura = determinarMisturaCores(cores);

        html += `
                    <div class="calculation-step">
                        <h4>🎨 Desafio Extra: A Ponte das Cores Mágicas</h4>
                        <p><strong>Cores utilizadas:</strong> ${cores.join(', ')}</p>
                        <p><strong>Número de cores:</strong> ${cores.length}</p>
                    </div>
                    <div class="final-result">
                        <h4>✨ Ponte Criada</h4>
                        <span class="result-value">${ponte}</span>
                        <div class="color-mix-result">
                            <p><strong>🎨 Mistura Resultante:</strong></p>
                            <p style="font-size: 16px; color: #4dd4ff; font-weight: 600; margin-top: 8px;">
                                ${mistura.toUpperCase()}
                            </p>
                        </div>
                        <p style="font-size: 12px; color: #90feb5; margin-top: 15px;">
                            Mickey usou seu pincel mágico para criar uma ponte espetacular sobre o abismo!
                        </p>
                    </div>
                `;
      }
    }

    // Exibir resultado com animação
    resultContent.innerHTML = html;

    // Animar a seção de resultado
    gsap.from(resultSection, {
      duration: 0.6,
      opacity: 0,
      y: 30,
      ease: 'power2.out'
    });

    // Animar elementos individuais com delay para manter visibilidade
    const steps = resultContent.querySelectorAll('.calculation-step, .final-result');
    gsap.from(steps, {
      duration: 0.5,
      opacity: 0,
      x: -20,
      stagger: 0.2,
      ease: 'power2.out',
      clearProps: 'all' // Limpa as propriedades inline após animação
    });

    // Scroll suave para a seção de resultado
    setTimeout(() => {
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  });

  // Botão RETORNAR
  retornarBtn.addEventListener('click', function () {
    // Limpar inputs
    portaisInput.value = '';
    coresInput.value = '';

    // Resetar resultado com animação
    gsap.to(resultContent, {
      duration: 0.3,
      opacity: 0,
      y: -20,
      ease: 'power2.in',
      onComplete: function () {
        resultContent.innerHTML =
          '<p class="result-placeholder">Preencha os campos e clique em ESCOLHER para iniciar a aventura!</p>';
        gsap.to(resultContent, {
          duration: 0.3,
          opacity: 1,
          y: 0,
          ease: 'power2.out'
        });
      }
    });

    // Scroll suave para o topo do container
    document.querySelector('.main-container').scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Focar no primeiro input
    setTimeout(() => {
      portaisInput.focus();
    }, 400);
  });

  // Permitir Enter para acionar o botão ESCOLHER
  portaisInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      escolherBtn.click();
    }
  });

  coresInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      escolherBtn.click();
    }
  });
});
