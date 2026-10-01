import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9rZWCaHiPqi8gU1iS64_zRbXDABTarJ0",
  authDomain: "casamento-analuiza-tiago.firebaseapp.com",
  projectId: "casamento-analuiza-tiago",
  storageBucket: "casamento-analuiza-tiago.firebasestorage.app",
  messagingSenderId: "386290379121",
  appId: "1:386290379121:web:39da0328b4be0081742ed0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const rsvpSection = document.getElementById("rsvpSection");
const rsvpStatus = document.getElementById("rsvpStatus");
const rsvpList = document.getElementById("rsvpList");

const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logoutButton");
const loginStatus = document.getElementById("loginStatus");

document
  .getElementById("buscaConvidado")
  .addEventListener(
    "input",
    renderizarConfirmacoes
  );

document
  .getElementById("filtroPresenca")
  .addEventListener(
    "change",
    renderizarConfirmacoes
  );

logoutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);

    rsvpSection.hidden = true;
    loginForm.hidden = false;

    loginStatus.textContent =
      "Sessão encerrada.";

  } catch (error) {
    console.error(
      "Erro ao sair:",
      error
    );
  }
});

let confirmacoes = [];
async function carregarConfirmacoes() {
  rsvpStatus.textContent = "Carregando confirmações...";

  try {
    const snapshot = await getDocs(
      collection(db, "rsvps")
    );

    confirmacoes = [];

    snapshot.forEach((doc) => {
      confirmacoes.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Mais recentes primeiro
    confirmacoes.sort((a, b) => {
      const dataA = a.criadoEm?.toMillis?.() ?? 0;
      const dataB = b.criadoEm?.toMillis?.() ?? 0;

      return dataB - dataA;
    });

    atualizarResumo();
    renderizarConfirmacoes();

    rsvpStatus.textContent =
      `${confirmacoes.length} confirmação(ões) encontrada(s).`;

  } catch (error) {
    console.error(
      "Erro ao carregar confirmações:",
      error
    );

    rsvpStatus.textContent =
      "Não foi possível carregar as confirmações.";
  }
}

function atualizarResumo() {
  const presentes = confirmacoes.filter(
    rsvp =>
      rsvp.presenca === "Sim, estarei presente!"
  );

  const ausentes = confirmacoes.filter(
    rsvp =>
      rsvp.presenca ===
      "Infelizmente não poderei comparecer"
  );

  const totalAcompanhantes = presentes.reduce(
    (total, rsvp) =>
      total + (Number(rsvp.acompanhantes) || 0),
    0
  );

  const totalPessoasPresentes =
    presentes.length + totalAcompanhantes;

  document.getElementById("totalConfirmacoes").textContent =
    confirmacoes.length;

  document.getElementById("totalPresentes").textContent =
    totalPessoasPresentes;

  document.getElementById("totalAusentes").textContent =
    ausentes.length;

  document.getElementById("totalAcompanhantes").textContent =
    totalAcompanhantes;
}

function renderizarConfirmacoes() {
  const busca = document
    .getElementById("buscaConvidado")
    .value
    .trim()
    .toLowerCase();

  const filtro = document
    .getElementById("filtroPresenca")
    .value;

  let resultados = [...confirmacoes];

  // Filtro de presença
  if (filtro === "presentes") {
    resultados = resultados.filter(
      rsvp =>
        rsvp.presenca === "Sim, estarei presente!"
    );
  }

  if (filtro === "ausentes") {
    resultados = resultados.filter(
      rsvp =>
        rsvp.presenca ===
        "Infelizmente não poderei comparecer"
    );
  }

  // Busca por nome
  if (busca) {
    resultados = resultados.filter(
      rsvp =>
        rsvp.nome
          ?.toLowerCase()
          .includes(busca)
    );
  }

  rsvpList.innerHTML = "";

  if (resultados.length === 0) {
    const empty = document.createElement("div");

    empty.className = "rsvp-empty";

    empty.textContent =
      "Nenhuma confirmação encontrada.";

    rsvpList.appendChild(empty);

    return;
  }

  resultados.forEach((rsvp) => {
    const item = document.createElement("div");

    item.className = "rsvp-item";

    const nome = document.createElement("h3");
    nome.textContent = rsvp.nome;

    const presenca = document.createElement("p");

    const confirmou =
      rsvp.presenca === "Sim, estarei presente!";

    presenca.textContent = confirmou
      ? "✓ Confirmou presença"
      : "✕ Não poderá comparecer";

    presenca.className = confirmou
      ? "rsvp-presente"
      : "rsvp-ausente";

    item.appendChild(nome);
    item.appendChild(presenca);

    if (confirmou) {
      const acompanhantes = document.createElement("p");

      const quantidade =
        Number(rsvp.acompanhantes) || 0;

      acompanhantes.textContent =
        quantidade === 0
          ? "Somente o convidado"
          : `${quantidade} acompanhante(s)`;

      item.appendChild(acompanhantes);

      if (rsvp.nomesAcompanhantes) {
        const nomes = document.createElement("p");

        nomes.textContent =
          `Acompanhantes: ${rsvp.nomesAcompanhantes}`;

        item.appendChild(nomes);
      }
    }

    if (rsvp.mensagem) {
      const mensagem = document.createElement("p");

      mensagem.className = "rsvp-message";

      mensagem.textContent =
        `"${rsvp.mensagem}"`;

      item.appendChild(mensagem);
    }

    rsvpList.appendChild(item);
  });
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const button = loginForm.querySelector("button");

  button.disabled = true;
  button.textContent = "Entrando...";
  loginStatus.textContent = "";

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Usuário autenticado:", userCredential.user.uid);

    loginStatus.textContent = "Login realizado com sucesso!";

    rsvpSection.hidden = false;

    await carregarConfirmacoes();

  } catch (error) {
    console.error("Erro ao fazer login:", error);

    loginStatus.textContent =
      "E-mail ou senha inválidos.";
  } finally {
    button.disabled = false;
    button.textContent = "Entrar";
  }
});

const exportarCsvButton =
  document.getElementById("exportarCsv");

exportarCsvButton.addEventListener(
  "click",
  exportarCsv
);

function exportarCsv() {
  if (confirmacoes.length === 0) {
    alert("Não há confirmações para exportar.");
    return;
  }

  const cabecalho = [
    "Nome",
    "Presença",
    "Acompanhantes",
    "Nomes dos acompanhantes",
    "Mensagem"
  ];

  const linhas = confirmacoes.map((rsvp) => [
    rsvp.nome ?? "",
    rsvp.presenca ?? "",
    rsvp.acompanhantes ?? 0,
    rsvp.nomesAcompanhantes ?? "",
    rsvp.mensagem ?? ""
  ]);

  const csv = [
    cabecalho,
    ...linhas
  ]
    .map((linha) =>
      linha
        .map((valor) => escaparCsv(valor))
        .join(";")
    )
    .join("\n");

  const blob = new Blob(
    ["\uFEFF" + csv],
    {
      type: "text/csv;charset=utf-8;"
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "confirmacoes-casamento.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function escaparCsv(valor) {
  const texto = String(valor);

  return `"${texto.replaceAll('"', '""')}"`;
}