import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously
} from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  runTransaction,
  serverTimestamp
} from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

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

async function loadClaimedGifts() {
  const snapshot = await getDocs(collection(db, "gifts"));

  claimed = new Set(
    snapshot.docs.map(document => document.id)
  );

  renderGifts();
}

const PIX_KEY = "8a0ec51d-1951-428e-b201-d7ce4d66b315";
const PIX_MERCHANT_NAME = "TIAGO SILVA OLIVEIRA";
const PIX_MERCHANT_CITY = "SAO PAULO";

const gifts = [
  ["santinha-murano", "Santinha de Murano", "R$1100,00"],
  ["colher-sorvete", "Colher de sorvete", "R$30,90"],
  ["bow-electrolux", "Bow de aço inox", "R$94,00"],
  ["edredom", "Edredom", "R$700,00"],
  ["bandeja-bambu", "Bandeja bambu - lavabo", "R$37,00"],
  ["air-fryer", "Air fryer", "R$549,90"],
  ["porta-ovos", "Porta-ovos", "R$41,90"],
  ["jogo-talher", "Jogo de talheres", "R$506,35"],
  ["porta-temperos", "Porta-temperos", "R$45,00"],
  ["alexa", "Alexa", "R$413,00"],
  ["jarra-suco", "Jarra de suco", "R$47,90"],
  ["luminaria-3", "Pendente pêndulo duplo", "R$400,00"],
  ["vale-presente-50", "Vale-presente", "R$50,00"],
  ["processador", "Processador de alimentos", "R$360,00"],
  ["bandeja-cafe", "Bandeja de café da manhã", "R$54,00"],
  ["liquidificador", "Liquidificador", "R$300,00"],
  ["porta-retrato", "Porta retratos", "R$56,00"],
  ["robo-aspirador", "Cota robô aspirador", "R$300,00"],
  ["cota-viagem", "Cota para viagem", "R$250,00"],
  ["plantinhas", "Plantinhas", "R$60,00"],
  ["cota-cadeiras", "Cota para cadeiras", "R$300,00"],
  ["cabides-veludo", "Cabides de veludo preto", "R$70,00"],
  ["kit-ferramentas", "Kit de ferramentas para o noivo", "R$200,00"],
  ["luminaria-1", "Pendente bambu", "R$287,89"],
  ["varal-portatil", "Varal portátil", "R$80,00"],
  ["luminaria-2", "Pendente bambu", "R$287,89"],
  ["capacho", "Capacho de porta", "R$78,90"],
  ["cota-jantar", "Cota para jantar", "R$75,00"],
  ["jogo-prato", "Jogo de prato", "R$285,00"],
  ["kit-banheiro", "Kit banheiro", "R$80,00"],
  ["cota-lava-loucas", "Cota para lava-louças", "R$250,00"],
  ["cota-lava-loucas", "Cota para lava-louças", "R$200,00"],
  ["home-theater", "Soundbar", "R$245,00"],
  ["furadeira", "Furadeira", "R$230,00"],
  ["vale-presente-80", "Vale-presente", "R$80,00"],
  ["jogo-facas", "Jogo de facas", "R$229,00"],
  ["vale-presente-100", "Vale-presente", "R$100,00"],
  ["lencol", "Jogo de lençol", "R$330,00"],
  ["jogo-xicaras", "Jogo de xícaras", "R$195,96"],
  ["toalhas", "Jogo de toalhas", "R$249,90"],
  ["frigideira-ferro", "Frigideira de ferro fundido", "R$189,90"],
  ["pote-hermetico-2", "Pote hermético", "R$182,60"],
  ["vale-presente-150", "Vale-presente", "R$150,00"],
  ["vaso-planta", "Vaso de planta", "R$90,00"],
  ["formas-bolo", "Formas de bolo", "R$182,11"],
  ["mesa-apoio", "Mesa de apoio", "R$180,00"],
  ["garrafa-inox", "Garrafa térmica inox", "R$120,00"],
  ["cantinho-cafe", "Cota para o cantinho do café", "R$120,00"],
  ["assadeira-vidro", "Assadeira de vidro", "R$169,99"],
  ["jogo-americano", "Jogo americano", "R$124,00"],
  ["sanduicheira", "Sanduicheira", "R$163,00"],
  ["pote-hermetico-1", "Pote hermético", "R$129,90"],
  ["vale-presente-150", "Vale-presente", "R$150,00"],
  ["netflix", "Cota Netflix", "R$130,00"],
  ["kit-utensilios", "Kit utensílios de cozinha", "R$142,87"],
  ["espelho-banheiro", "Espelho para o banheiro", "R$147,00"],
  ["mala", "Mala para viagem", "R$500,00"],
  ["cota-impressora-3d", "Cota para impressora 3D", "R$300,00"],
  ["perfume-ambiente", "Kit aromatizador de ambientes", "R$113,00"],
  ["vale-presente-200", "Vale-presente", "R$200,00"],
  ["travesseiros", "Travesseiros", "R$300,00"],
  ["almofadas", "Almofadas", "R$112,00"],
  ["quadros", "Quadros decorativos", "R$180,00"],
  ["boleira", "Prato para bolo", "R$108,90"],
];

const giftImages = {
  "santinha-murano": "https://images.tcdn.com.br/img/img_prod/789130/escultura_em_vidro_murano_santa_nossa_senhora_transparente_com_dourado_15_5x9_47586_1_95cd44d6a202e5785711629ca0a6de21.jpg?auto=format&fit",
  "bow-electrolux": "https://electrolux.vtexassets.com/arquivos/ids/223999-640-640?v=638119081694130000&width=640&height=640&aspect=true&format=auto?auto=format&fit=crop&q=80&w=900",
  "jogo-talher": "https://assets.tramontina.com.br/upload/tramon/imagens/FAR/66917157IXM001G.jpg?auto=format&fit=crop&q=80&w=900",
  "jogo-facas": "https://assets.tramontina.com.br/upload/tramon/imagens/CUT/24099071PDM001G.jpg?auto=format&fit=crop&q=80&w=900",
  "garrafa-inox": "https://cdn.awsli.com.br/600x450/241/241680/produto/382657823/d_nq_np_2x_841374-mlb99776702302_122025-f-garrafa-termica-cafe-1-litro-inox-linh-u0w7c4dunb.webp?auto=format&fit=crop&q=80&w=900",
  "air-fryer": "https://walitastore.vtexassets.com/arquivos/ids/160654/RI9270_1.png?v=638754803027430000?auto=format&fit=crop&q=80&w=900",
  "capacho": "https://http2.mlstatic.com/D_NQ_NP_2X_839407-MLB88049031671_072025-F-2-tapete-porta-capacho-naska-lux-antiderrapante-gf-40x60.webp?auto=format&fit=crop&q=80&w=900",
  "cabides-veludo": "https://http2.mlstatic.com/D_NQ_NP_2X_877744-MLB112538591025_052026-F-30-cabides-slim-aveludado-antideslizante-adulto-resistente.webp?auto=format&fit=crop&q=80&w=900",
  "formas-bolo": "https://assets.tramontina.com.br/upload/tramon/imagens/CUT/20099090PDM001G.jpg?auto=format&fit=crop&q=80&w=900",
  "liquidificador": "https://m.magazineluiza.com.br/a-static/420x420/liquidificador-philips-walita-serie-5000-jarra-de-vidro/walita/ri224293pretoun/972fa053313f46e798e3e67f25e4d94a.jpeg?auto=format&fit=crop&q=80&w=900",
  "processador": "https://walitastore.vtexassets.com/arquivos/ids/159181/multipreto.png?v=638942556215870000?auto=format&fit=crop&q=80&w=900",
  "toalhas": "https://http2.mlstatic.com/D_NQ_NP_2X_729713-MLB110169527450_042026-F-jogo-toalha-luxo-algodao-banhao-karsten-unika-5-pecas-branco.webp?auto=format&fit=crop&q=80&w=900",
  "lencol": "https://casabergan.fbitsstatic.net/img/p/jogo-de-cama-king-size-karsten-bossa-100-algodao-egipcio-fio-penteado-cetim-300-fios-4-pecas-153269/346503-1.jpg?w=620&h=620&v=202506091459&v=2026-08-27T13:58:20.000-03:00?auto=format&fit=crop&q=80&w=900",
  "frigideira-ferro": "https://assets.tramontina.com.br/upload/tramon/imagens/CUT/28761026PDM001G.jpg?auto=format&fit=crop&q=80&w=900",
  "kit-banheiro": "https://www.eladecora.com.br/cdn/shop/files/kit-para-banheiro-em-polirresina-areia-4-pecas-879651.png?auto=format&fit=crop&q=80&w=900",
  "alexa": "https://horizonplay.fbitsstatic.net/img/p/speaker-amazon-echo-dot-com-alexa-5a-geracao-wi-fi-bluetooth-preto-151668/338263.jpg?w=670&h=670&v=202506251427?auto=format&fit=crop&q=80&w=900",
  "jogo-americano": "https://http2.mlstatic.com/D_NQ_NP_2X_880612-MLB116767137315_082026-F-kit-6-sousplat-fibra-natural-jogo-americano-redondo-38cm.webp?auto=format&fit=crop&q=80&w=900",
  "cota-viagem": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=900",
  "cota-jantar": "https://cdn.api.wine-locals.com/guide/images/Jantar_Romantico_ao_Entardecer_na_Casa_Mantiqueira_5_0138d86bd1.jfif?auto=format&fit=crop&q=80&w=900",
  "bandeja-cafe": "https://http2.mlstatic.com/D_NQ_NP_2X_781654-MLA111542632949_052026-F.webp?auto=format&fit=crop&q=80&w=900",
  "cantinho-cafe": "https://likemagazine.com.br/midias/2025/03/Cozinha-com-cantinho-do-cafe-9-Like-Magazine-e1742224000225.jpg?auto=format&fit=crop&q=80&w=900",
  "colher-sorvete": "https://madelhome.fbitsstatic.net/img/p/colher-de-sorvete-em-inox-preto-utilita-tramontina-21cm-152933/339468.jpg?w=700&h=700&v=202601191041?auto=format&fit=crop&q=80&w=900",
  "cota-lava-loucas": "https://electrolux.vtexassets.com/arquivos/ids/268683-1000-1000?v=638778245090530000&width=1000&height=1000&aspect=true&format=auto?auto=format&fit=crop&q=80&w=900",
  "robo-aspirador": "https://d1r6yjixh9u0er.cloudfront.net/Custom/Content/Products/13/57/13576_robo-aspirador-de-po-inteligente-s40c-xiaomi-prin_z1_638888032775545391.webp?auto=format&fit=crop&q=80&w=900",
  "furadeira": "https://casadosoldador.com.br/files/products_images/24677/combo-furadeira-parafusadeira-20v-dck279d2-bivolt-dewalt-casa-do-soldador-4.webp?auto=format&fit=crop&q=80&w=900",
  "cota-impressora-3d": "https://http2.mlstatic.com/D_NQ_NP_2X_776364-MLA110832407818_052026-F.webp?auto=format&fit=crop&q=80&w=900",
  "vale-presente-50": "https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_caixa-de-presente-com-laco-vermelho3.jpg?auto=format&fit=crop&q=80&w=900",
  "vale-presente-80": "https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_caixa-de-presente-com-laco-vermelho3.jpg?auto=format&fit=crop&q=80&w=900",
  "vale-presente-100": "https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_caixa-de-presente-com-laco-vermelho3.jpg?auto=format&fit=crop&q=80&w=900",
  "vale-presente-150": "https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_caixa-de-presente-com-laco-vermelho3.jpg?auto=format&fit=crop&q=80&w=900",
  "vale-presente-200": "https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_caixa-de-presente-com-laco-vermelho3.jpg?auto=format&fit=crop&q=80&w=900",
  "kit-ferramentas": "https://delupo.vtexassets.com/arquivos/ids/230496/86161_03.jpg?v=638688473298400000?auto=format&fit=crop&q=80&w=900",
  "netflix": "https://www.claro.com.br/files/104379/760x520/fe09a1c470/banner-blog-mobile-tv-melhores-filmes-para-assistir-na-netflix.png?auto=format&fit=crop&q=80&w=900",
  "home-theater": "https://http2.mlstatic.com/D_NQ_NP_2X_656047-MLA102762309536_122025-F.webp?auto=format&fit=crop&q=80&w=900",
  "jogo-xicaras": "https://images.tcdn.com.br/img/img_prod/361962/conjunto_de_xicara_de_cafezinho_com_pires_06_pecas_organico_lavanda_porto_brasil_12735_1_fc9e014893e52b9a4bb818077523af24_20260309171045.jpg?auto=format&fit=crop&q=80&w=900",
  "pote-hermetico-1": "https://electrolux.vtexassets.com/arquivos/ids/287568-1000-1000?v=639008946076600000&width=1000&height=1000&aspect=true&format=auto?auto=format&fit=crop&q=80&w=900",
  "pote-hermetico-2": "https://http2.mlstatic.com/D_NQ_NP_2X_884531-MLB110405119782_052026-F-kit-3-potes-de-vidro-hermeticos-104-l-marmita-fit-com-trava.webp?auto=format&fit=crop&q=80&w=900",
  "assadeira-vidro": "https://americanas.vtexassets.com/arquivos/ids/484645-768-auto/2568392342_1_xlarge.webp?v=638750827832200000&quality=9?auto=format&fit=crop&q=80&w=900",
  "sanduicheira": "https://http2.mlstatic.com/D_NQ_NP_2X_979390-MLA95960300775_102025-F.webp?auto=format&fit=crop&q=80&w=900",
  "porta-temperos": "https://storage.panoverse-cdn.com.br/uzutilidades.img/produto/5483/kit-porta-temperos-5483-1000x1000-contain.jpg?auto=format&fit=crop&q=80&w=900",
  "perfume-ambiente": "https://http2.mlstatic.com/D_NQ_NP_2X_727159-MLU73714901260_012024-F.webp?auto=format&fit=crop&q=80&w=900",
  "vaso-planta": "https://http2.mlstatic.com/D_NQ_NP_2X_745724-MLB114812837802_082026-F-kit-3-vasos-para-plantas-polietileno-luxo-marmorizado-jardim.webp?auto=format&fit=crop&q=80&w=900",
  "edredom": "https://www.karsten.com.br/arquivos/desktop_ambiente_Bossa_instantes_len%C3%A7ol1.jpg?auto=format&fit=crop&q=80&w=900",
  "cota-cadeiras": "https://decorise.cdn.magazord.com.br/img/2022/10/produto/1222/cadeira-gus-telinha-1.jpg?auto=format&fit=crop&q=80&w=900",
  "jogo-prato": "https://assets.tramontina.com.br/upload/tramon/imagens/DEL/96950098PDM001G.jpg?auto=format&fit=crop&q=80&w=900",
  "varal-portatil": "https://http2.mlstatic.com/D_NQ_NP_2X_738695-MLA95659364508_102025-F.webp?auto=format&fit=crop&q=80&w=900",
  "jarra-suco": "https://http2.mlstatic.com/D_NQ_NP_2X_874679-MLB115299641187_072026-F-jarra-vidro-borossilicato-19-litros-tampa-inox-transparente.webp?auto=format&fit=crop&q=80&w=900",
  "porta-ovos": "https://http2.mlstatic.com/D_NQ_NP_2X_879960-MLA112069999346_062026-F.webp?auto=format&fit=crop&q=80&w=900",
  "kit-utensilios": "https://m.magazineluiza.com.br/a-static/420x420/jogo-de-utensilios-tramontina-softta-em-silicone-7-pecas/supremeinox/258161001/f75edd44f536a0c6d40846888c166be7.jpeg?auto=format&fit=crop&q=80&w=900",
  "espelho-banheiro": "https://http2.mlstatic.com/D_NQ_NP_2X_705213-MLB113197432168_072026-F-espelho-vildrex-veneza-70x50cm-moderno-suporte-banheiro.webp?auto=format&fit=crop&q=80&w=900",
  "plantinhas": "https://cdn.awsli.com.br/2772/2772039/produto/372166868/bambino-3-7fw8rm5889.jpg?auto=format&fit=crop&q=80&w=900",
  "luminaria-1": "https://novarioficial.com/cdn/shop/files/lustre-pendente-de-bambu-quancim-lux-lustre-eletroflix-175783.jpg?v=1786063788&width=2000?auto=format&fit=crop&q=80&w=900",
  "luminaria-2": "https://novarioficial.com/cdn/shop/files/lustre-pendente-de-bambu-quancim-lux-lustre-eletroflix-175783.jpg?v=1786063788&width=2000?auto=format&fit=crop&q=80&w=900",
  "luminaria-3": "https://azlediluminacao.com.br/upload/produtos/2025/04/md_dbfa2ddb2d293763.webp?auto=format&fit=crop&q=80&w=900",
  "travesseiros": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQKQWryRUhDMkVeJdhvjglD2Au8PRmr3fR3Y6AhLX4hz_6N8s1Qbst7l6apibmDK0IgA0O1EBID2vksEqv7ReHyHO2uzhJAggxIeiOKvTWRXadSBTZkLnbKGNC-clgQHQ&usqp=CAc?auto=format&fit=crop&q=80&w=900",
  "almofadas": "https://images.tcdn.com.br/img/img_prod/1118556/capa_de_almofada_trancada_retangular_verde_musgo_30x50_873_2_36f78d8fcee17d696948dc25ce91023c.jpg?auto=format&fit=crop&q=80&w=900",
  "quadros": "https://cdn.awsli.com.br/64x50/539/539164/produto/172857523/floral-delicado-orcx7yp47s.jfif?auto=format&fit=crop&q=80&w=900",
  "porta-retrato": "https://http2.mlstatic.com/D_NQ_NP_2X_901424-MLB107903441687_032026-F-porta-retrato-decorativo-luxo-em-madeira-natural-10x15cm.webp?auto=format&fit=crop&q=80&w=900",
  "bandeja-bambu": "https://http2.mlstatic.com/D_NQ_NP_2X_745125-MLB90364028573_082025-F-bandeja-bambu-lavabo-decorativa-cafe-retangular-madeira-25cm.webp?auto=format&fit=crop&q=80&w=900",
  "mesa-apoio": "https://product-hub-prd.madeiramadeira.com.br/960076/images/870bf222-f8f1-4b89-85fe-c5f2f1a6195c72471618598117291859920344.jpg?auto=format&fit=crop&q=80&w=900",
  "decoracao": "https://http2.mlstatic.com/D_NQ_NP_2X_778566-MLB110939017746_052026-F-kit-2-vasos-decorativos-minimalista-1815cm-arranjos-secos.webp?auto=format&fit=crop&q=80&w=900",
  "mala": "https://www.rimowa.com/on/demandware.static/-/Sites-rimowa-master-catalog-final/default/dw467d3040/images/large/92553004_2.png?auto=format&fit=crop&q=80&w=900",
  "boleira": "https://www.wolycasa.com.br/cdn/shop/files/223129_A.jpg?auto=format&fit=crop&q=80&w=900",
};

let claimed = new Set();
let selectedGift = null;

const $ = id => document.getElementById(id);
const grid = $("giftGrid"), counter = $("giftCounter"), search = $("giftSearch"), empty = $("giftEmpty");
const modal = $("giftModal"), modalClose = $("modalClose"), modalName = $("modalGiftName");
const modalDescription = $("modalGiftDescription"), copyPix = $("copyPix"), copyStatus = $("copyStatus");
const confirmGift = $("confirmGift"), modalStatus = $("modalStatus");

function normalize(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function renderGifts() {
  const term = normalize(search.value.trim());
  const filtered = gifts.filter(g => !term || normalize(g[1] + " " + g[2]).includes(term));
  grid.innerHTML = "";

  filtered.forEach(([id, name, description]) => {
    const isClaimed = claimed.has(id);
    const card = document.createElement("article");
    card.className = "gift-card" + (isClaimed ? " claimed" : "");
    card.innerHTML = `
      <div class="gift-card-image">
        <img src="${giftImages[id] || giftImages["home"]}" alt="${name}" loading="lazy"
             onerror="this.onerror=null;this.src=giftImages["home"];">
      </div>
      <h3>${name}</h3>
      <p>${description}</p>
      ${isClaimed
        ? '<span class="claimed-badge">✓ Este presente já foi escolhido</span>'
        : '<span class="gift-open">Presentear</span>'}
    `;
    if (!isClaimed) card.addEventListener("click", () => openGift(id));
    grid.appendChild(card);
  });

  counter.textContent = `${filtered.length} ${filtered.length === 1 ? "item" : "itens"}`;
  empty.hidden = filtered.length !== 0;
}

function crc16(payload) {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function parsePixAmount(value) {
  // Accepts values such as "R$100,00", "R$ 100,00", "Um R$100,00" or "Para R$100,00".
  const match = String(value).match(/R\$\s*(\d+(?:[.,]\d{2})?)/i);
  if (!match) return null;

  const amount = Number(match[1].replace(",", "."));
  if (!Number.isFinite(amount) || amount <= 0) return null;

  return amount.toFixed(2);
}

function pixPayload() {
  if (!PIX_KEY || PIX_KEY === "SUA_CHAVE_PIX_AQUI") return "";
  if (!selectedGift) return "";

  const amount = parsePixAmount(selectedGift[2]);
  if (!amount) return "";

  const clean = (v, max) => String(v).normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 .-]/g, "")
    .toUpperCase()
    .slice(0, max);

  const field = (id, value) => id + String(value.length).padStart(2, "0") + value;

  // Merchant Account Information (26): 00 = PIX GUI, 01 = PIX key.
  const merchant = field("00", "BR.GOV.BCB.PIX") + field("01", PIX_KEY);

  const base =
    field("00", "01") +
    field("26", merchant) +
    field("52", "0000") +
    field("53", "986") +
    field("54", amount) +
    field("58", "BR") +
    field("59", clean(PIX_MERCHANT_NAME, 25)) +
    field("60", clean(PIX_MERCHANT_CITY, 15)) +
    field("62", field("05", "***")) +
    "6304";

  return base + crc16(base);
}

function drawQr(payload) {
  const box = $("pixQr");
  box.innerHTML = "";

  if (!payload) {
    box.textContent = "QR";
    return;
  }

  if (typeof QRCode === "undefined") {
    box.textContent = "Não foi possível carregar o QR Code.";
    return;
  }

  new QRCode(box, {
    text: payload,
    width: 230,
    height: 230,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });
}

function openGift(id) {
  selectedGift = gifts.find(g => g[0] === id);
  if (!selectedGift) return;
  modalName.textContent = selectedGift[1];
  modalDescription.textContent = selectedGift[2];
  copyStatus.textContent = "";
  modalStatus.textContent = "";
  const already = claimed.has(id);
  confirmGift.disabled = already;
  confirmGift.textContent = already ? "Este presente já foi escolhido" : "Já presenteei este item";
  drawQr(pixPayload());
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeGift() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  selectedGift = null;
}

async function claimGift() {
  if (!selectedGift) return;

  const id = selectedGift[0];

  if (!auth.currentUser) {
    modalStatus.textContent =
      "Não foi possível identificar seu acesso. Atualize a página e tente novamente.";
    return;
  }

  confirmGift.disabled = true;
  confirmGift.textContent = "Registrando...";
  modalStatus.textContent = "";

  try {
    const giftRef = doc(db, "gifts", id);

    await runTransaction(db, async (transaction) => {
      const giftSnapshot = await transaction.get(giftRef);

      if (giftSnapshot.exists()) {
        throw new Error("GIFT_ALREADY_CLAIMED");
      }

      transaction.set(giftRef, {
        claimed: true,
        uid: auth.currentUser.uid,
        claimedAt: serverTimestamp()
      });
    });

    claimed.add(id);

    modalStatus.textContent =
      "Presente registrado com sucesso! Obrigado pelo carinho. ♡";

    confirmGift.textContent = "Presente registrado ✓";

    renderGifts();

  } catch (error) {
    console.error("Erro ao registrar presente:", error);

    if (error.message === "GIFT_ALREADY_CLAIMED") {
      claimed.add(id);
      renderGifts();

      modalStatus.textContent =
        "Esse presente acabou de ser escolhido por outra pessoa. ♡";

      confirmGift.textContent =
        "Este presente já foi escolhido";
    } else {
      modalStatus.textContent =
        "Não foi possível registrar o presente. Tente novamente.";

      confirmGift.disabled = false;
      confirmGift.textContent =
        "Já presenteei este item";
    }
  }
}

async function init() {
  try {
    const userCredential = await signInAnonymously(auth);

    await loadClaimedGifts();

  } catch (error) {
    console.error("Erro ao conectar ao Firebase:", error);

    modalStatus.textContent =
      "Não foi possível conectar ao sistema de presentes.";
  }

  // Timer starts independently of everything else.
  const weddingDate = new Date("2026-11-20T19:00:00-03:00").getTime();
  function updateCountdown() {
    const distance = weddingDate - Date.now();
    if (distance <= 0) {
      $("days").textContent = $("hours").textContent = $("minutes").textContent = $("seconds").textContent = "00";
      return;
    }
    $("days").textContent = String(Math.floor(distance / 86400000)).padStart(2, "0");
    $("hours").textContent = String(Math.floor(distance / 3600000) % 24).padStart(2, "0");
    $("minutes").textContent = String(Math.floor(distance / 60000) % 60).padStart(2, "0");
    $("seconds").textContent = String(Math.floor(distance / 1000) % 60).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  search.addEventListener("input", renderGifts);
  modalClose.addEventListener("click", closeGift);
  modal.addEventListener("click", e => { if (e.target === modal) closeGift(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeGift(); });
  confirmGift.addEventListener("click", claimGift);

  copyPix.addEventListener("click", async () => {
    const payload = pixPayload();
    if (!payload) {
      copyStatus.textContent = "Não foi possível gerar o PIX para este presente.";
      return;
    }
    try {
      await navigator.clipboard.writeText(payload);
      copyStatus.textContent = "Código PIX copiado!";
    } catch {
      copyStatus.textContent = "Não foi possível copiar automaticamente.";
    }
  });

  const rsvpForm = $("rsvpForm");
  const formStatus = $("formStatus");

  const presencaSelect = rsvpForm.querySelector(
    '[name="presenca"]'
  );

  const acompanhantesContainer = rsvpForm.querySelector(
    "#acompanhantesContainer"
  );

  const acompanhantesSelect = rsvpForm.querySelector(
    '[name="acompanhantes"]'
  );

  const nomesAcompanhantesContainer = rsvpForm.querySelector(
    "#nomesAcompanhantesContainer"
  );

  const nomesAcompanhantesInput = rsvpForm.querySelector(
    '[name="nomes_acompanhantes"]'
  );

  function atualizarCamposPresenca() {
    const confirmouPresenca =
      presencaSelect.value === "Sim, estarei presente!";

    // Mostra/esconde a quantidade de acompanhantes
    acompanhantesContainer.hidden = !confirmouPresenca;

    if (!confirmouPresenca) {
      // Pessoa não irá: limpa os campos relacionados
      acompanhantesSelect.value = "0";
      nomesAcompanhantesInput.value = "";

      nomesAcompanhantesContainer.hidden = true;
      nomesAcompanhantesInput.required = false;

      return;
    }

    // Pessoa irá: verifica se possui acompanhantes
    const quantidade = Number(acompanhantesSelect.value);

    const possuiAcompanhantes = quantidade > 0;

    nomesAcompanhantesContainer.hidden = !possuiAcompanhantes;
    nomesAcompanhantesInput.required = possuiAcompanhantes;

    if (!possuiAcompanhantes) {
      nomesAcompanhantesInput.value = "";
    }
  }

  presencaSelect.addEventListener(
    "change",
    atualizarCamposPresenca
  );

  acompanhantesSelect.addEventListener(
    "change",
    atualizarCamposPresenca
  );

  atualizarCamposPresenca();

  rsvpForm.addEventListener("submit", async e => {
    e.preventDefault();

    const button = rsvpForm.querySelector("button");

    button.disabled = true;
    button.textContent = "Enviando...";
    formStatus.textContent = "";

    const formData = new FormData(rsvpForm);

    const nome = formData.get("nome");
    const presenca = formData.get("presenca");
    const acompanhantes = Number(formData.get("acompanhantes"));
    const nomesAcompanhantes = formData.get("nomes_acompanhantes");
    const mensagem = formData.get("mensagem");

    try {
      await addDoc(collection(db, "rsvps"), {
        nome,
        presenca,
        acompanhantes,
        nomesAcompanhantes,
        mensagem,
        criadoEm: serverTimestamp()
      });

      formStatus.textContent =
        "Confirmação enviada com sucesso. ♡";

      const fields = rsvpForm.querySelectorAll(
        "input, select, textarea, button"
      );

      fields.forEach(field => {
        field.disabled = true;
      });

      button.textContent = "Presença confirmada ✓";

    } catch (error) {
      console.error("Erro ao salvar confirmação:", error);

      formStatus.textContent =
        "Não foi possível enviar sua confirmação. Tente novamente.";

      button.disabled = false;
      button.textContent = "Enviar confirmação";
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
