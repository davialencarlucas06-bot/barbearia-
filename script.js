
/*
  CONFIGURAÇÃO DA BARBEARIA

  Troque o número abaixo pelo WhatsApp comercial.
  Use código do país + DDD + número, somente números.
  Exemplo de formato brasileiro: 5531991234567
*/

const WHATSAPP_NUMBER = "5531999999999";

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const form = document.getElementById("booking-form");
const dateInput = document.getElementById("data");

// Ano automático no rodapé
document.getElementById("year").textContent =
  new Date().getFullYear();

// Impede a seleção de datas anteriores ao dia atual
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localToday;

// Abre e fecha o menu no celular
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Fecha o menu ao selecionar uma seção
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  });
});

// Preenche automaticamente o serviço escolhido
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("servico");
    serviceSelect.value = link.dataset.service;
  });
});

// Monta a mensagem de agendamento para o WhatsApp
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    alert(
      "Configure o número correto do WhatsApp no arquivo script.js."
    );
    return;
  }

  const nome = document.getElementById("nome").value.trim();
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  const [ano, mes, dia] = data.split("-");
  const dataFormatada = `${dia}/${mes}/${ano}`;

  const mensagem = [
    "Olá! Gostaria de solicitar um agendamento.",
    "",
    `Nome: ${nome}`,
    `Serviço: ${servico}`,
    `Data desejada: ${dataFormatada}`,
    `Horário preferido: ${horario}`,
    "",
    "Poderiam confirmar a disponibilidade?"
  ].join("\n");

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(mensagem);

  window.open(url, "_blank", "noopener,noreferrer");
});

// Botão flutuante do WhatsApp
const whatsappFloat = document.getElementById("whatsapp-float");

whatsappFloat.href =
  "https://wa.me/" + WHATSAPP_NUMBER;

whatsappFloat.target = "_blank";
whatsappFloat.rel = "noopener noreferrer";
