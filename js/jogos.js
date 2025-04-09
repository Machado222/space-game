document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card-jogo');
  const modal = document.getElementById('modal-detalhes');
  const conteudoModal = modal?.querySelector('.conteudo-modal');
  const botaoFechar = modal?.querySelector('.fechar-modal');
  const mensagemFinal = document.getElementById('mensagemFinal');
  const formularioContainer = document.getElementById('formularioContainer');
  const form = document.getElementById('formCadastro');
  const voltarBtn = document.getElementById('voltarBtn');
  const erro = document.getElementById("erroSenha");

  // Exibe detalhes do card
  cards.forEach(card => {
    card.dataset.voto = "";

    card.addEventListener('click', () => {
      const larguraTela = window.innerWidth;

      if (larguraTela < 769) {
        const detalhes = card.querySelector('.detalhes');
        detalhes.classList.toggle('oculto');
      } else {
        const titulo = card.querySelector('h3').textContent;
        const detalhes = card.querySelector('.detalhes').innerHTML;

        conteudoModal.innerHTML = `<h2>${titulo}</h2><div>${detalhes}</div>`;
        modal.classList.add('ativo');
        document.body.classList.add('modal-aberto');
      }
    });

    const gosteiBtn = card.querySelector('.gostei-btn');
    const naoGosteiBtn = card.querySelector('.nao-gostei-btn');
    const gosteiContador = gosteiBtn.querySelector('.gostei-contador');
    const naoGosteiContador = naoGosteiBtn.querySelector('.nao-gostei-contador');

    gosteiBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      const usuarioCadastrado = localStorage.getItem('usuarioCadastrado') === 'true';

      if (!usuarioCadastrado) {
        mostrarMensagemBloqueio();
        return;
      }

      if (card.dataset.voto === "gostei") return;

      if (card.dataset.voto === "nao-gostei") {
        naoGosteiContador.textContent = parseInt(naoGosteiContador.textContent) - 1;
      }

      gosteiContador.textContent = parseInt(gosteiContador.textContent) + 1;
      card.dataset.voto = "gostei";
    });

    naoGosteiBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      const usuarioCadastrado = localStorage.getItem('usuarioCadastrado') === 'true';

      if (!usuarioCadastrado) {
        mostrarMensagemBloqueio();
        return;
      }

      if (card.dataset.voto === "nao-gostei") return;

      if (card.dataset.voto === "gostei") {
        gosteiContador.textContent = parseInt(gosteiContador.textContent) - 1;
      }

      naoGosteiContador.textContent = parseInt(naoGosteiContador.textContent) + 1;
      card.dataset.voto = "nao-gostei";
    });
  });

  // Modal - fechar
  botaoFechar?.addEventListener('click', (event) => {
    event.stopPropagation();
    modal.classList.remove('ativo');
    document.body.classList.remove('modal-aberto');
  });

  modal?.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.remove('ativo');
      document.body.classList.remove('modal-aberto');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth < 769) {
      modal?.classList.remove('ativo');
      document.body.classList.remove('modal-aberto');
      if (conteudoModal) conteudoModal.innerHTML = '';
    }
  });

  // Formulário de cadastro
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const senha = document.getElementById("senha").value;
      const confirmaSenha = document.getElementById("confirmaSenha").value;

      if (senha !== confirmaSenha) {
        erro.style.display = "block";
        return;
      }

      erro.style.display = "none";
      formularioContainer.classList.add('hidden');
      mensagemFinal.style.display = 'block';
      localStorage.setItem('usuarioCadastrado', 'true');
    });
  }

  // Botão voltar
  voltarBtn?.addEventListener('click', () => {
    window.location.href = "jogos.html";
  });

  // Função de bloqueio
  function mostrarMensagemBloqueio() {
    const msg = document.getElementById('mensagem-bloqueio');
    if (msg) {
      msg.classList.remove('oculto');
      msg.classList.add('mostrar');
      setTimeout(() => {
        msg.classList.add('oculto');
        msg.classList.remove('mostrar');
      }, 3000);
    }
  }
});