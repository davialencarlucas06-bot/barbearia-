
const WHATSAPP_NUMBER = "5531999999999";

const modals = document.querySelectorAll(".modal");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const bookingForm = document.getElementById("booking-form");
const dateInput = document.getElementById("data");

let previousFocus = null;

// Ano do rodapé
document.getElementById("year").textContent =
  new Date().getFullYear();

// Impede escolher uma data anterior à data local de hoje
function getLocalDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

dateInput.min = getLocalDate();

// Abrir uma janela
function openModal(id) {
  const modal = document.getElementById(id);

  if (!modal) return;

  closeAllModals();

  previousFocus = document.activeElement;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  // Volta o conteúdo da janela para o início
  const panel = modal.querySelector(".modal-panel");
  panel.scrollTop = 0;

  const closeButton = modal.querySelector(".modal-close");
  closeButton.focus();

  closeMenu();
}

// Fechar todas as janelas
function closeAllModals() {
  modals.forEach((modal) => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  });

  document.body.classList.remove("modal-open");
}

// Fechar uma janela e devolver o foco
function closeModal() {
  const hasOpenModal = document.querySelector(".modal.is-open");

  if (!hasOpenModal) return;

  closeAllModals();

  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

// Botões que abrem janelas
document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.open);
  });
});

// Botões ×
document.querySelectorAll(".modal-close").forEach((button) => {
  button.addEventListener("click", closeModal);
});

// Fechar clicando no fundo escuro
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});

// Fechar usando a tecla Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Menu do celular
function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Fechar menu após navegar para o início
nav.querySelectorAll('a[href="#inicio"]').forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Selecionar serviço e abrir agendamento
document.querySelectorAll("[data-book-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.bookService;

    openModal("booking");

    document.getElementById("servico").value = service;
  });
});

// Solicitar agendamento pelo WhatsApp
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  // Configure o número real no início deste arquivo.
  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    alert("Configure o número do WhatsApp no arquivo script.js.");
    return;
  }

  const nome = document.getElementById("nome").value.trim();
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  if (data < getLocalDate()) {
    alert("Escolha uma data de hoje em diante.");
    return;
  }

  const [ano, mes, dia] = data.split("-");
  const dataFormatada = `${dia}/${mes}/${ano}`;

  const mensagem = [
    "Olá! Gostaria de solicitar um agendamento na Barber Club.",
    "",
    `Nome: ${nome}`,
    `Serviço: ${servico}`,
    `Data desejada: ${dataFormatada}`,
    `Horário preferido: ${horario}`,
    "",
    "Poderiam confirmar a disponibilidade?"
  ].join("\n");

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// Botão flutuante do WhatsApp
const whatsappFloat = document.getElementById("whatsapp-float");

whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}`;
