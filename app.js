const STORAGE_KEY = "world-deal-save-v5";
const SLOT_KEY_PREFIX = "world-deal-slot-v5-";
const LEADERBOARD_KEY = "world-deal-leaderboard-v2";
const ACHIEVEMENTS_KEY = "world-deal-achievements-v2";
const TUTORIAL_STORAGE_KEY = "world-deal-tutorial-v1";
const TUTORIAL_GAME_TURN_LIMIT = 20;
const DEFAULT_PLAYER_NAME = "Player";
const LEGACY_AI_NAME_MAP = {
  Kai: "Investor A",
  Mia: "Investor B",
  Leo: "Investor C",
};
const START_CASH = 1600;
const PASS_START_BONUS = 200;
const LANDING_START_BONUS = 100;
const MAX_LEVEL = 5;
const MAX_HAND_CARDS = 4;
const AUCTION_INCREMENT = 20;
const AUCTION_TURN_MS = 12000;
const MOVEMENT_STEP_MS = 170;
const PAUSE_INDEX = 25;
const BOARD_GRID_SIZE = 26;
const CONTINENT_SET_SIZE = 3;
const LOAN_AMOUNT = 300;
const LOAN_REPAY_AMOUNT = 330;
const LOAN_INTEREST_RATE = 0.08;
const BANK_DEPOSIT_INTEREST_RATE = 0.012;
const BANK_LEDGER_LIMIT = 8;
const LEVERAGE_FINANCE_BLOCK = 320;
const CONVERTIBLE_DEBT_BLOCK = 360;
const SHORT_BLOCK = 1;
const SHORT_MAX_PER_CITY = 3;
const MAX_EQUITY_DILUTION = 0.45;
const ECO_UPGRADE_COST = 140;
const STOCK_BLOCK = 1;
const STOCK_MAX_PER_CITY = 5;
const IPO_STOCK_BONUS = 3;
const STOCK_TAKEOVER_SHARES = 4;
const CAPITAL_ROUND_LIMIT = 3;
const CHARACTER_MAX_LEVEL = 5;
const DEAL_LEDGER_LIMIT = 8;
const NEWS_FEED_LIMIT = 8;
const QUARTERLY_REPORT_LIMIT = 6;
const COOP_CONTRACT_LIMIT = 8;
const COOP_CONTRACT_ARCHIVE_LIMIT = 18;
const COOP_CONTRACT_DURATION = 4;
const COOP_CONTRACT_MAX_DURATION = 12;
const BUSINESS_DEAL_PHASES = ["waiting", "ending", "shop"];
const COMPANY_TYPES = ["company", "hotel", "bank", "techPark"];
const COMPANY_BUILD_COST = {
  company: 180,
  hotel: 220,
  bank: 260,
  techPark: 240,
};
const SIDE_PANEL_MODES = ["deal", "coop", "player", "world", "goals", "log"];
const DEFAULT_DRAWER_OPEN = {
  "main:turn": true,
  "main:deal": false,
  "main:tools": false,
  "panel:businessDesk": true,
  "panel:fieldTrade": false,
  "panel:dealLedger": false,
  "panel:coopContracts": true,
  "panel:coopArchive": false,
  "panel:coopProposals": true,
  "panel:coopGuide": false,
  "panel:cards": true,
  "panel:bank": false,
  "panel:hand": true,
  "panel:auction": true,
  "panel:shop": true,
  "panel:save": false,
  "panel:progress": false,
  "panel:world": true,
  "panel:share": false,
  "panel:assets": true,
  "panel:log": false,
  "property:建设": true,
  "property:公司": false,
  "property:资本": false,
  "property:投资": false,
  "property:资产": false,
};
const TUTORIAL_REWARDS = {
  roll: { cash: 60, card: "" },
  buy: { cash: 90, card: "" },
  auction: { cash: 80, card: "" },
  card: { cash: 50, card: "cashVoucher" },
  upgrade: { cash: 110, card: "" },
  bank: { cash: 90, card: "rentShield" },
  stock: { cash: 100, card: "" },
  finish: { cash: 220, card: "planeTicket" },
};
const MUSIC_BPM = 120;
const MUSIC_LOOKAHEAD_SECONDS = 1.4;
const MUSIC_LOOP_BEATS = 8;

const playerTemplates = [
  { id: "p1", name: DEFAULT_PLAYER_NAME, color: "#df624e", isAI: false },
  { id: "p2", name: "Investor A", color: "#128a9c", isAI: true, aiStyle: "builder" },
  { id: "p3", name: "Investor B", color: "#7657b8", isAI: true, aiStyle: "auctioneer" },
  { id: "p4", name: "Investor C", color: "#2d9f6f", isAI: true, aiStyle: "collector" },
];

const aiStyleDefinitions = {
  builder: { label: "建设型", detail: "更爱升级和建公司。", buyBias: 18, stockBias: 0, companyBias: 34 },
  auctioneer: { label: "拍卖型", detail: "更爱竞价抢强城。", buyBias: 8, stockBias: 4, companyBias: 8 },
  collector: { label: "囤地型", detail: "优先补套装和收集城市。", buyBias: 28, stockBias: 0, companyBias: 12 },
  speculator: { label: "投机型", detail: "更爱股票、融资和热门城市。", buyBias: 6, stockBias: 32, companyBias: 6 },
};

const languageDefinitions = {
  zh: {
    htmlLang: "zh-CN",
    documentTitle: "World Deal Tycoon",
    brandEyebrow: "World Deal",
    brandTitle: "全球交易大亨",
    panelEyebrow: "控制台",
    panelTitle: "玩家状态",
    language: "语言",
    newGame: "新游戏",
    setupTitle: "设置棋局",
    playerName: "玩家名字",
    playerColor: "玩家颜色",
    playerCount: "参赛人数",
    difficulty: "AI 难度",
    difficultyHint: (label, iq, note) => `当前：${label} / AI 智商 ${iq} / ${note}`,
    character: "角色",
    theme: "地图主题",
    rulesPreset: "规则模式",
    startCash: "起始现金",
    cancel: "取消",
    start: "开始",
    round: (round) => `第 ${round} 轮`,
    readyStatus: (name) => `轮到 ${name}，准备掷骰。`,
    gameStarted: "新棋局开始。",
    holdPosition: (name) => `${name} 使用停留卡，原地休整一轮。`,
    pauseRest: (name) => `${name} 在暂停区休息一轮。`,
    remoteRoll: (name, total) => `${name} 使用遥控骰子，固定移动 ${total} 格。`,
    rollingMove: (name, d1, d2, total) => `${name} 掷出 ${d1}+${d2}，正在移动 ${total} 格。`,
    noCashBuyStatus: (name, city) => `${name} 到达 ${city}，现金不足，无法购买。`,
    reachedStatus: (name, city) => `${name} 到达 ${city}。`,
    unownedMarketStatus: (city, price) => `${city} 无人持有，市场价 ${price}。`,
    ownVisitStatus: (name, city) => `${name} 回到自己的 ${city}。`,
    mortgagedStatus: (city) => `${city} 已抵押，本次不收租。`,
    rentWaivedStatus: (name, city, rent) => `${name} 的免租通行证挡下了 ${city} 的 ${rent} 租金。`,
    rentPaidStatus: (name, owner, rent) => `${name} 向 ${owner} 支付 ${rent} 租金。`,
    taxPaidStatus: (name, amount) => `${name} 支付 ${amount}。`,
    bonusStatus: (name, amount) => `${name} 收到 ${amount}。`,
    shopStatus: (name) => `${name} 到达道具商店，可以购买卡片。`,
    pauseBlockedStatus: (name) => `${name} 的免暂停通行抵消了暂停区。`,
    goPauseStatus: (name) => `${name} 前往暂停区，下一轮休息。`,
    startBonusStatus: (name) => `${name} 停在起点，领取额外 100 现金。`,
    boughtStatus: (name, city) => `${name} 买下 ${city}。`,
    availableToBuy: (price) => `可购买 ${price}`,
    yourAsset: "你的资产",
    heldBy: (owner) => `${owner} 持有`,
    setActive: "洲套装激活",
    rentText: (rent) => `租金 ${rent}`,
    globalAsset: "全球资产",
    citySkill: "城市技能",
    payAmount: (amount) => `需要支付 ${amount}`,
    bonusAmount: (amount) => `奖励 ${amount}`,
    shopDetail: "购买可使用的道具卡",
    chanceDetail: "抽取一张事件卡",
    gotoPauseDetail: "前往暂停区",
    pauseDetail: "休整一轮的安全区",
    startDetail: (amount) => `经过奖励 ${amount}`,
    cityTile: "城市地块",
    diceWaiting: "等待掷骰",
    diceTotal: (total) => `合计 ${total}`,
    dicePaused: "本轮暂停",
    roll: "掷骰前进",
    buyCity: "买下这座城市",
    buyCityPrice: (price) => `买下这座城市 ${price}`,
    decline: "不买，进入拍卖",
    venture: "抽冒险事件",
    upgradeFocus: "升级重点城市",
    upgradeCity: (name) => `升级 ${name}`,
    endTurn: "结束本回合",
    waitAi: "等待 AI 行动",
    gameOver: "比赛已结束",
    moving: "棋子移动中",
    auctionActive: "拍卖进行中",
    rollAfterTurn: "等本回合结束后可用",
    buyAfterLanding: "掷骰落到空城市后可用",
    cashShort: (amount) => `现金不足，还差 ${amount}`,
    buyAvailable: "有可买城市时可用",
    ventured: "本回合已抽过",
    phaseUnavailable: "当前阶段不可用",
    noCity: "还没有自己的城市",
    noUpgrade: "现金不足或已满级",
    noUpgradeDuringBuy: "买地决定中不能升级",
    finishActionFirst: "完成当前行动后可用",
    musicOff: "音乐",
    musicOn: "播放中",
    musicAriaOff: "开启背景音乐",
    musicAriaOn: "关闭背景音乐",
    currentTile: (name) => `${name} 当前地块`,
    currentLocation: (name, zoom) => `当前位置：${name} / 地图 ${zoom}%`,
    propertyCard: (number) => `地产卡 ${number}`,
    owner: "持有者",
    forSale: "待售",
    price: "价格",
    rent: "租金",
    upgradeCost: "升级费",
    maxLevel: "满级",
    leaderHeadline: (name) => `${name} 领跑城市榜`,
    cityNews: "城市快讯",
    tickerDetails: (market, detail, name, owned, level) => `${market}：${detail} / ${name} 持有 ${owned} 座全球城市，最高 ${level} 级`,
    tickerReady: "准备开始新的城市竞赛",
    roundShort: (turns) => `${turns}轮`,
    contractView: "查看合同",
    contractSignCount: (count) => `签合同 ${count} 个`,
    contractActiveCount: (count) => `合同 ${count} 份`,
    contractOfferCount: (count) => `查看合同 ${count} 个`,
    sideDeal: "交易",
    sideDealDetail: "融资 / 报价 / 拍卖",
    sideDealMarket: "市场",
    sideDealAuction: "拍卖中",
    sideDealShop: "商店",
    sideCoop: "合同",
    sideCoopDetail: "签约 / 分红 / 违约",
    sideCoopSignable: (count) => `${count} 可签`,
    sideCoopActive: (count) => `${count} 份`,
    sidePlayer: "玩家",
    sidePlayerDetail: "卡片 / 资产 / 银行",
    sidePlayerCards: (count) => `${count} 张卡`,
    sideWorld: "世界",
    sideWorldDetail: "地图 / 股票 / 规则",
    sideGoals: "任务",
    sideGoalsDetail: "目标 / 存档 / 分享",
    sideGoalsDone: (count) => `${count} 完成`,
    sideLog: "记录",
    sideLogDetail: "事件流水",
    sideLogCount: (count) => `${count} 条`,
    none: "暂无",
  },
  en: {
    htmlLang: "en",
    documentTitle: "World Deal Tycoon",
    brandEyebrow: "World Deal",
    brandTitle: "World Deal Tycoon",
    panelEyebrow: "Console",
    panelTitle: "Player Status",
    language: "Language",
    newGame: "New Game",
    setupTitle: "Game Setup",
    playerName: "Player Name",
    playerColor: "Player Color",
    playerCount: "Players",
    difficulty: "AI Difficulty",
    difficultyHint: (label, iq, note) => `Current: ${label} / AI IQ ${iq} / ${note}`,
    character: "Role",
    theme: "Map Theme",
    rulesPreset: "Rule Mode",
    startCash: "Starting Cash",
    cancel: "Cancel",
    start: "Start",
    round: (round) => `Round ${round}`,
    readyStatus: (name) => `${name}'s turn. Roll the dice.`,
    gameStarted: "New game started.",
    holdPosition: (name) => `${name} used a Stop card and rests in place.`,
    pauseRest: (name) => `${name} rests in the pause zone this round.`,
    remoteRoll: (name, total) => `${name} used a remote dice and moves ${total} spaces.`,
    rollingMove: (name, d1, d2, total) => `${name} rolled ${d1}+${d2} and is moving ${total} spaces.`,
    noCashBuyStatus: (name, city) => `${name} reached ${city}, but cannot afford it.`,
    reachedStatus: (name, city) => `${name} reached ${city}.`,
    unownedMarketStatus: (city, price) => `${city} is unowned. Market price ${price}.`,
    ownVisitStatus: (name, city) => `${name} returned to their own ${city}.`,
    mortgagedStatus: (city) => `${city} is mortgaged. No rent this time.`,
    rentWaivedStatus: (name, city, rent) => `${name}'s Rent Pass blocked ${rent} rent at ${city}.`,
    rentPaidStatus: (name, owner, rent) => `${name} paid ${owner} ${rent} rent.`,
    taxPaidStatus: (name, amount) => `${name} paid ${amount}.`,
    bonusStatus: (name, amount) => `${name} received ${amount}.`,
    shopStatus: (name) => `${name} reached the card shop.`,
    pauseBlockedStatus: (name) => `${name}'s pause pass blocked the pause zone.`,
    goPauseStatus: (name) => `${name} goes to the pause zone and rests next round.`,
    startBonusStatus: (name) => `${name} landed on Start and received 100 extra cash.`,
    boughtStatus: (name, city) => `${name} bought ${city}.`,
    availableToBuy: (price) => `Available to buy ${price}`,
    yourAsset: "Your asset",
    heldBy: (owner) => `Owned by ${owner}`,
    setActive: "continent set active",
    rentText: (rent) => `rent ${rent}`,
    globalAsset: "Global asset",
    citySkill: "City skill",
    payAmount: (amount) => `Pay ${amount}`,
    bonusAmount: (amount) => `Bonus ${amount}`,
    shopDetail: "Buy usable cards",
    chanceDetail: "Draw one event card",
    gotoPauseDetail: "Go to the pause zone",
    pauseDetail: "Safe zone for one rest round",
    startDetail: (amount) => `Pass bonus ${amount}`,
    cityTile: "City tile",
    diceWaiting: "Waiting to roll",
    diceTotal: (total) => `Total ${total}`,
    dicePaused: "Paused this round",
    roll: "Roll Dice",
    buyCity: "Buy This City",
    buyCityPrice: (price) => `Buy This City ${price}`,
    decline: "Skip, Start Auction",
    venture: "Draw Venture",
    upgradeFocus: "Upgrade Key City",
    upgradeCity: (name) => `Upgrade ${name}`,
    endTurn: "End Turn",
    waitAi: "Waiting for AI",
    gameOver: "Game is over",
    moving: "Token is moving",
    auctionActive: "Auction in progress",
    rollAfterTurn: "Available after this turn",
    buyAfterLanding: "Available on an empty city",
    cashShort: (amount) => `Need ${amount} more`,
    buyAvailable: "Available when a city can be bought",
    ventured: "Already used this turn",
    phaseUnavailable: "Not available now",
    noCity: "You do not own a city yet",
    noUpgrade: "Not enough cash or max level",
    noUpgradeDuringBuy: "Finish buying first",
    finishActionFirst: "Finish the current action first",
    musicOff: "Music",
    musicOn: "Playing",
    musicAriaOff: "Turn on background music",
    musicAriaOn: "Turn off background music",
    currentTile: (name) => `${name}'s current tile`,
    currentLocation: (name, zoom) => `Current: ${name} / Map ${zoom}%`,
    propertyCard: (number) => `Property Card ${number}`,
    owner: "Owner",
    forSale: "For Sale",
    price: "Price",
    rent: "Rent",
    upgradeCost: "Upgrade",
    maxLevel: "Max",
    leaderHeadline: (name) => `${name} leads the city board`,
    cityNews: "City News",
    tickerDetails: (market, detail, name, owned, level) => `${market}: ${detail} / ${name} owns ${owned} global cities, top level ${level}`,
    tickerReady: "Ready for a new city race",
    roundShort: (turns) => `${turns} turns`,
    contractView: "Contracts",
    contractSignCount: (count) => `Sign ${count}`,
    contractActiveCount: (count) => `${count} Active`,
    contractOfferCount: (count) => `View ${count}`,
    sideDeal: "Deals",
    sideDealDetail: "Finance / Bids / Auctions",
    sideDealMarket: "Market",
    sideDealAuction: "Auction",
    sideDealShop: "Shop",
    sideCoop: "Contracts",
    sideCoopDetail: "Sign / Dividends / Breach",
    sideCoopSignable: (count) => `${count} Ready`,
    sideCoopActive: (count) => `${count} Active`,
    sidePlayer: "Player",
    sidePlayerDetail: "Cards / Assets / Bank",
    sidePlayerCards: (count) => `${count} Cards`,
    sideWorld: "World",
    sideWorldDetail: "Map / Stocks / Rules",
    sideGoals: "Goals",
    sideGoalsDetail: "Targets / Saves / Share",
    sideGoalsDone: (count) => `${count} Done`,
    sideLog: "Log",
    sideLogDetail: "Event Feed",
    sideLogCount: (count) => `${count} Items`,
    none: "None",
  },
  es: {
    htmlLang: "es",
    documentTitle: "World Deal Tycoon",
    brandEyebrow: "Acuerdo Global",
    brandTitle: "Magnate Global",
    panelEyebrow: "Consola",
    panelTitle: "Estado",
    language: "Idioma",
    newGame: "Nueva Partida",
    setupTitle: "Configurar Partida",
    playerName: "Nombre",
    playerColor: "Color",
    playerCount: "Jugadores",
    difficulty: "Dificultad IA",
    difficultyHint: (label, iq, note) => `Actual: ${label} / IQ de IA ${iq} / ${note}`,
    character: "Rol",
    theme: "Tema del Mapa",
    rulesPreset: "Reglas",
    startCash: "Dinero Inicial",
    cancel: "Cancelar",
    start: "Empezar",
    round: (round) => `Ronda ${round}`,
    readyStatus: (name) => `Turno de ${name}. Tira los dados.`,
    gameStarted: "Nueva partida iniciada.",
    holdPosition: (name) => `${name} usó una carta de parada y descansa aquí.`,
    pauseRest: (name) => `${name} descansa en la zona de pausa.`,
    remoteRoll: (name, total) => `${name} usó dado remoto y avanza ${total} casillas.`,
    rollingMove: (name, d1, d2, total) => `${name} sacó ${d1}+${d2} y avanza ${total} casillas.`,
    noCashBuyStatus: (name, city) => `${name} llegó a ${city}, pero no puede comprar.`,
    reachedStatus: (name, city) => `${name} llegó a ${city}.`,
    unownedMarketStatus: (city, price) => `${city} está libre. Precio ${price}.`,
    ownVisitStatus: (name, city) => `${name} volvió a su ${city}.`,
    mortgagedStatus: (city) => `${city} está hipotecada. No cobra renta.`,
    rentWaivedStatus: (name, city, rent) => `El pase de ${name} bloqueó ${rent} de renta en ${city}.`,
    rentPaidStatus: (name, owner, rent) => `${name} pagó ${rent} de renta a ${owner}.`,
    taxPaidStatus: (name, amount) => `${name} pagó ${amount}.`,
    bonusStatus: (name, amount) => `${name} recibió ${amount}.`,
    shopStatus: (name) => `${name} llegó a la tienda de cartas.`,
    pauseBlockedStatus: (name) => `El pase de ${name} evitó la pausa.`,
    goPauseStatus: (name) => `${name} va a la zona de pausa y descansa la próxima ronda.`,
    startBonusStatus: (name) => `${name} cayó en Inicio y recibió 100 extra.`,
    boughtStatus: (name, city) => `${name} compró ${city}.`,
    availableToBuy: (price) => `Disponible por ${price}`,
    yourAsset: "Tu activo",
    heldBy: (owner) => `De ${owner}`,
    setActive: "conjunto continental activo",
    rentText: (rent) => `renta ${rent}`,
    globalAsset: "Activo global",
    citySkill: "Habilidad urbana",
    payAmount: (amount) => `Pagar ${amount}`,
    bonusAmount: (amount) => `Bono ${amount}`,
    shopDetail: "Compra cartas útiles",
    chanceDetail: "Roba una carta de evento",
    gotoPauseDetail: "Ir a la zona de pausa",
    pauseDetail: "Zona segura de descanso",
    startDetail: (amount) => `Bono al pasar ${amount}`,
    cityTile: "Casilla urbana",
    diceWaiting: "Esperando dados",
    diceTotal: (total) => `Total ${total}`,
    dicePaused: "Pausa esta ronda",
    roll: "Tirar Dados",
    buyCity: "Comprar Ciudad",
    buyCityPrice: (price) => `Comprar Ciudad ${price}`,
    decline: "Pasar a Subasta",
    venture: "Robar Evento",
    upgradeFocus: "Mejorar Ciudad",
    upgradeCity: (name) => `Mejorar ${name}`,
    endTurn: "Terminar Turno",
    waitAi: "Esperando IA",
    gameOver: "La partida terminó",
    moving: "Ficha en movimiento",
    auctionActive: "Subasta activa",
    rollAfterTurn: "Disponible luego del turno",
    buyAfterLanding: "Disponible en una ciudad libre",
    cashShort: (amount) => `Faltan ${amount}`,
    buyAvailable: "Disponible al comprar ciudad",
    ventured: "Ya usado en este turno",
    phaseUnavailable: "No disponible ahora",
    noCity: "Aún no tienes ciudad",
    noUpgrade: "Sin dinero o nivel máximo",
    noUpgradeDuringBuy: "Termina la compra primero",
    finishActionFirst: "Termina la acción actual",
    musicOff: "Música",
    musicOn: "Sonando",
    musicAriaOff: "Activar música",
    musicAriaOn: "Desactivar música",
    currentTile: (name) => `Casilla actual de ${name}`,
    currentLocation: (name, zoom) => `Actual: ${name} / Mapa ${zoom}%`,
    propertyCard: (number) => `Carta ${number}`,
    owner: "Dueño",
    forSale: "En Venta",
    price: "Precio",
    rent: "Renta",
    upgradeCost: "Mejora",
    maxLevel: "Máximo",
    leaderHeadline: (name) => `${name} lidera ciudades`,
    cityNews: "Noticias",
    tickerDetails: (market, detail, name, owned, level) => `${market}: ${detail} / ${name} tiene ${owned} ciudades, nivel ${level}`,
    tickerReady: "Listo para una nueva carrera",
    roundShort: (turns) => `${turns} rondas`,
    contractView: "Contratos",
    contractSignCount: (count) => `Firmar ${count}`,
    contractActiveCount: (count) => `${count} activos`,
    contractOfferCount: (count) => `Ver ${count}`,
    sideDeal: "Tratos",
    sideDealDetail: "Finanzas / Ofertas / Subastas",
    sideDealMarket: "Mercado",
    sideDealAuction: "Subasta",
    sideDealShop: "Tienda",
    sideCoop: "Contratos",
    sideCoopDetail: "Firma / Dividendos / Incumplir",
    sideCoopSignable: (count) => `${count} listos`,
    sideCoopActive: (count) => `${count} activos`,
    sidePlayer: "Jugador",
    sidePlayerDetail: "Cartas / Activos / Banco",
    sidePlayerCards: (count) => `${count} cartas`,
    sideWorld: "Mundo",
    sideWorldDetail: "Mapa / Acciones / Reglas",
    sideGoals: "Metas",
    sideGoalsDetail: "Objetivos / Guardar / Compartir",
    sideGoalsDone: (count) => `${count} listas`,
    sideLog: "Registro",
    sideLogDetail: "Eventos",
    sideLogCount: (count) => `${count} eventos`,
    none: "Nada",
  },
};

const languageOptionLabels = {
  zh: { zh: "中文", en: "English", es: "Español" },
  en: { zh: "Chinese", en: "English", es: "Spanish" },
  es: { zh: "Chino", en: "Inglés", es: "Español" },
};

const setupSelectLabels = {
  zh: {
    playerCount: { 2: "2 人", 3: "3 人", 4: "4 人" },
    difficulty: { easy: "轻松", normal: "普通", smart: "精明", expert: "专家", master: "大师" },
    character: { banker: "银行家", builder: "建筑师", broker: "经纪人", landlord: "地主" },
    theme: { city: "现代城市", island: "海岛假日", space: "星际航线", fairy: "童话小镇" },
    rulesPreset: { classic: "经典规则", fast: "快速经营", limited: "20 回合限时", daily: "每日挑战", hard: "困难税费" },
  },
  en: {
    playerCount: { 2: "2 Players", 3: "3 Players", 4: "4 Players" },
    difficulty: { easy: "Easy", normal: "Normal", smart: "Smart", expert: "Expert", master: "Master" },
    character: { banker: "Banker", builder: "Architect", broker: "Broker", landlord: "Landlord" },
    theme: { city: "Modern City", island: "Island Resort", space: "Space Routes", fairy: "Fairy Town" },
    rulesPreset: { classic: "Classic", fast: "Fast Business", limited: "20-Round Limit", daily: "Daily Challenge", hard: "Hard Taxes" },
  },
  es: {
    playerCount: { 2: "2 Jugadores", 3: "3 Jugadores", 4: "4 Jugadores" },
    difficulty: { easy: "Fácil", normal: "Normal", smart: "Inteligente", expert: "Experto", master: "Maestro" },
    character: { banker: "Banquero", builder: "Arquitecto", broker: "Corredor", landlord: "Propietario" },
    theme: { city: "Ciudad Moderna", island: "Isla", space: "Rutas Espaciales", fairy: "Pueblo de Cuento" },
    rulesPreset: { classic: "Clásico", fast: "Negocio Rápido", limited: "Límite de 20 Rondas", daily: "Reto Diario", hard: "Impuestos Difíciles" },
  },
};

const tutorialCopyDefinitions = {
  zh: {
    introEyebrow: "新手教学",
    introTitle: "先玩一局教学局",
    introLead: "第一次打开游戏时，建议先进入教学局。所有电脑玩家都会固定为普通强度，系统会一路提示你每个按钮的用途，直到这局完成结算。",
    introPoints: [
      "教学局使用 20 回合限时规则，保证能走到结算。",
      "你会学习掷骰、买城市、拍卖、抽卡、升级、银行贷款、融资、股票和做空。",
      "教程不会改掉正式玩法，学到的按钮就是正常游戏里真正会用到的按钮。",
    ],
    startTutorial: "开始教学局",
    skipTutorial: "先自己玩",
    panelEyebrow: "教学局",
    panelTitle: "新手教练",
    normalAi: "AI 普通强度",
    limitNote: "完成一局后教程结束",
    buttonDictionary: "按钮说明",
    checklistTitle: "本局要学会",
    currentStep: "当前建议",
    completedTitle: "教学完成",
    completedBody: "这一局已经完成。你现在可以开新局调高难度，或者继续查看棋盘复盘。",
    observeAiTitle: "观察对手行动",
    observeAiBody: "现在轮到电脑玩家。教学局里电脑是普通强度，你可以观察它如何买地、竞拍和升级。",
    finishGuideTitle: "完成这一局",
    finishGuideBody: "比赛结束后会出现结算页，教程会自动标记完成。",
  },
  en: {
    introEyebrow: "Tutorial",
    introTitle: "Play One Guided Game",
    introLead: "On your first visit, start a tutorial game. Every AI player stays at normal strength, and the coach explains each button until the game reaches settlement.",
    introPoints: [
      "The tutorial uses a 20-round limit so it can reach an ending.",
      "You will learn rolling, buying cities, auctions, cards, upgrades, bank loans, financing, stocks, and short selling.",
      "This is the real rule set, so the buttons work the same way in normal games.",
    ],
    startTutorial: "Start Tutorial",
    skipTutorial: "Play Myself",
    panelEyebrow: "Tutorial Game",
    panelTitle: "New Player Coach",
    normalAi: "Normal AI",
    limitNote: "Ends after one full game",
    buttonDictionary: "Button Guide",
    checklistTitle: "Learn This Game",
    currentStep: "Best Next Step",
    completedTitle: "Tutorial Complete",
    completedBody: "This game is complete. You can start a new game with harder AI or review the board.",
    observeAiTitle: "Watch the Rival",
    observeAiBody: "It is an AI turn now. In the tutorial game, AI stays normal, so you can see how it buys, bids, and upgrades.",
    finishGuideTitle: "Finish the Game",
    finishGuideBody: "When the match ends, the settlement page appears and the tutorial is marked complete.",
  },
  es: {
    introEyebrow: "Tutorial",
    introTitle: "Juega Una Partida Guiada",
    introLead: "La primera vez, empieza una partida tutorial. Todos los rivales usan dificultad normal y el entrenador explica cada botón hasta la liquidación final.",
    introPoints: [
      "El tutorial usa límite de 20 rondas para llegar al final.",
      "Aprenderás dados, compra de ciudades, subastas, cartas, mejoras, préstamos, financiación, acciones y ventas en corto.",
      "Son reglas reales, así que los botones funcionan igual en partidas normales.",
    ],
    startTutorial: "Iniciar Tutorial",
    skipTutorial: "Jugar Solo",
    panelEyebrow: "Partida Tutorial",
    panelTitle: "Entrenador",
    normalAi: "IA normal",
    limitNote: "Termina tras una partida",
    buttonDictionary: "Guía de Botones",
    checklistTitle: "Aprende Esto",
    currentStep: "Siguiente Paso",
    completedTitle: "Tutorial Completo",
    completedBody: "La partida terminó. Puedes iniciar una nueva con IA más difícil o revisar el tablero.",
    observeAiTitle: "Observa al Rival",
    observeAiBody: "Ahora juega la IA. En el tutorial usa nivel normal para que veas cómo compra, puja y mejora.",
    finishGuideTitle: "Termina la Partida",
    finishGuideBody: "Cuando termine el juego, aparece el resumen y el tutorial queda completo.",
  },
};

const tutorialButtonGuides = [
  {
    id: "roll",
    tone: "move",
    label: { zh: "掷骰", en: "Roll", es: "Dados" },
    detail: { zh: "移动棋子，开始本回合。", en: "Move your token and start the turn.", es: "Mueve tu ficha e inicia el turno." },
  },
  {
    id: "buy",
    tone: "buy",
    label: { zh: "买地", en: "Buy", es: "Comprar" },
    detail: { zh: "买下无人城市，之后别人踩到会付租金。", en: "Buy an open city so rivals pay rent later.", es: "Compra una ciudad libre para cobrar renta." },
  },
  {
    id: "auction",
    tone: "danger",
    label: { zh: "拍卖", en: "Auction", es: "Subasta" },
    detail: { zh: "你不买时进入竞价，出价最高者得城市。", en: "If you skip buying, everyone can bid for it.", es: "Si no compras, todos pueden pujar." },
  },
  {
    id: "venture",
    tone: "danger",
    label: { zh: "冒险", en: "Venture", es: "Evento" },
    detail: { zh: "抽事件或道具，可能赚钱、移动或影响对手。", en: "Draw events or tools that can help or disrupt.", es: "Roba eventos o herramientas." },
  },
  {
    id: "upgrade",
    tone: "build",
    label: { zh: "升级", en: "Upgrade", es: "Mejorar" },
    detail: { zh: "建设自己的城市，提升租金和股价潜力。", en: "Build your city to raise rent and stock value.", es: "Mejora tu ciudad para subir renta y valor." },
  },
  {
    id: "bank",
    tone: "gain",
    label: { zh: "银行卡", en: "Bank Card", es: "Tarjeta" },
    detail: { zh: "现金会产生利息；缺钱时可贷款。", en: "Cash earns interest; loans help when short.", es: "El efectivo gana interés; puedes pedir préstamo." },
  },
  {
    id: "finance",
    tone: "build",
    label: { zh: "融资", en: "Financing", es: "Financiación" },
    detail: { zh: "杠杆、债券、可转债和股权融资能放大交易。", en: "Leverage, bonds, convertibles, and equity fund bigger deals.", es: "Apalancamiento, bonos y capital financian tratos grandes." },
  },
  {
    id: "stock",
    tone: "move",
    label: { zh: "股票/做空", en: "Stocks/Shorts", es: "Acciones/Corto" },
    detail: { zh: "买城市股票赚上涨；做空则赌它下跌，但要付借空利息。", en: "Buy city stocks for upside; shorting bets on a fall and pays borrow interest.", es: "Compra acciones o vende en corto pagando interés." },
  },
  {
    id: "end",
    tone: "move",
    label: { zh: "结束", en: "End", es: "Fin" },
    detail: { zh: "本回合操作完成后，把回合交给下一位。", en: "Pass the turn after your actions are done.", es: "Pasa el turno cuando termines." },
  },
];

const displayNameTranslations = {
  en: {
    "环球起点": "World Start",
    "机会航班": "Chance Flight",
    "全球关税": "Global Tariff",
    "城市传闻": "City Rumor",
    "世界博览奖金": "World Expo Bonus",
    "海关休整": "Customs Rest",
    "跨洲机会": "Intercontinental Chance",
    "国际服务费": "International Service Fee",
    "道具商店": "Card Shop",
    "资本风向": "Capital Winds",
    "跨洲分红": "Intercontinental Dividend",
    "全球所得税": "Global Income Tax",
    "旅行奇遇": "Travel Encounter",
    "环球商店": "World Shop",
    "投资电报": "Investment Telegram",
    "航班延误": "Flight Delay",
    "城市峰会奖金": "City Summit Bonus",
    "奢侈税": "Luxury Tax",
    "世界新闻": "World News",
    "世界集市": "World Bazaar",
    "上海浦东": "Shanghai Pudong",
    "东京银座": "Tokyo Ginza",
    "首尔江南": "Seoul Gangnam",
    "新加坡滨海湾": "Singapore Marina Bay",
    "香港中环": "Hong Kong Central",
    "北京国贸": "Beijing CBD",
    "台北信义": "Taipei Xinyi",
    "曼谷暹罗": "Bangkok Siam",
    "吉隆坡双子塔": "Kuala Lumpur Petronas",
    "雅加达苏迪曼": "Jakarta Sudirman",
    "孟买班德拉": "Mumbai Bandra",
    "德里康诺特": "Delhi Connaught",
    "马尼拉马卡蒂": "Manila Makati",
    "胡志明市滨城": "Ho Chi Minh Ben Thanh",
    "河内还剑": "Hanoi Hoan Kiem",
    "巴黎左岸": "Paris Left Bank",
    "伦敦金融城": "London City",
    "罗马古城": "Ancient Rome",
    "柏林米特": "Berlin Mitte",
    "马德里格兰大道": "Madrid Gran Via",
    "巴塞罗那港湾": "Barcelona Harbor",
    "阿姆斯特丹运河": "Amsterdam Canals",
    "苏黎世班霍夫": "Zurich Bahnhofstrasse",
    "维也纳环城": "Vienna Ring",
    "布拉格老城": "Prague Old Town",
    "雅典卫城": "Athens Acropolis",
    "里斯本贝伦": "Lisbon Belem",
    "斯德哥尔摩王岛": "Stockholm King's Island",
    "纽约曼哈顿": "New York Manhattan",
    "洛杉矶星光大道": "Los Angeles Walk of Fame",
    "旧金山湾区": "San Francisco Bay Area",
    "西雅图先锋广场": "Seattle Pioneer Square",
    "芝加哥环区": "Chicago Loop",
    "多伦多港湾": "Toronto Harbourfront",
    "温哥华煤港": "Vancouver Coal Harbour",
    "墨西哥城改革大道": "Mexico City Reforma",
    "迈阿密海滩": "Miami Beach",
    "波士顿后湾": "Boston Back Bay",
    "华盛顿国会山": "Washington Capitol Hill",
    "里约海岸": "Rio Coast",
    "圣保罗保利斯塔": "Sao Paulo Paulista",
    "布宜诺斯艾利斯港区": "Buenos Aires Puerto Madero",
    "圣地亚哥金融区": "Santiago Financial District",
    "利马米拉弗洛雷斯": "Lima Miraflores",
    "波哥大北区": "Bogota North District",
    "蒙得维的亚海滨": "Montevideo Waterfront",
    "开普敦海湾": "Cape Town Bay",
    "开罗尼罗河": "Cairo Nile",
    "约翰内斯堡桑顿": "Johannesburg Sandton",
    "内罗毕上城": "Nairobi Upper Hill",
    "拉各斯维多利亚岛": "Lagos Victoria Island",
    "卡萨布兰卡滨海": "Casablanca Marina",
    "阿克拉独立大道": "Accra Independence Avenue",
    "悉尼港": "Sydney Harbour",
    "墨尔本中央": "Melbourne Central",
    "奥克兰皇后街": "Auckland Queen Street",
    "惠灵顿海湾": "Wellington Bay",
    "布里斯班南岸": "Brisbane South Bank",
    "珀斯伊丽莎白码头": "Perth Elizabeth Quay",
    "迪拜塔区": "Dubai Tower District",
    "迪拜国际机场": "Dubai International Airport",
    "阿布扎比海滨": "Abu Dhabi Corniche",
    "多哈西湾": "Doha West Bay",
    "利雅得国王区": "Riyadh King District",
    "伊斯坦布尔博斯普鲁斯": "Istanbul Bosphorus",
    "特拉维夫海岸": "Tel Aviv Coast",
    "莫斯科红场": "Moscow Red Square",
    "圣彼得堡涅瓦": "St. Petersburg Neva",
    "雷克雅未克港": "Reykjavik Harbor",
    "哥本哈根新港": "Copenhagen Nyhavn",
    "赫尔辛基设计区": "Helsinki Design District",
    "都柏林圣殿区": "Dublin Temple Bar",
    "爱丁堡王子街": "Edinburgh Princes Street",
    "布鲁塞尔大广场": "Brussels Grand Place",
    "华沙老城": "Warsaw Old Town",
    "布达佩斯多瑙河": "Budapest Danube",
    "慕尼黑玛利亚广场": "Munich Marienplatz",
    "米兰大教堂": "Milan Duomo",
    "威尼斯圣马可": "Venice San Marco",
    "佛罗伦萨文艺街": "Florence Renaissance Quarter",
  },
  es: {
    "环球起点": "Inicio Global",
    "机会航班": "Vuelo de Oportunidad",
    "全球关税": "Arancel Global",
    "城市传闻": "Rumor Urbano",
    "世界博览奖金": "Bono de Expo Mundial",
    "海关休整": "Descanso Aduanero",
    "跨洲机会": "Oportunidad Intercontinental",
    "国际服务费": "Tarifa de Servicio Internacional",
    "道具商店": "Tienda de Cartas",
    "资本风向": "Vientos de Capital",
    "跨洲分红": "Dividendo Intercontinental",
    "全球所得税": "Impuesto Global sobre Ingresos",
    "旅行奇遇": "Encuentro de Viaje",
    "环球商店": "Tienda Global",
    "投资电报": "Telegrama de Inversión",
    "航班延误": "Retraso de Vuelo",
    "城市峰会奖金": "Bono de Cumbre Urbana",
    "奢侈税": "Impuesto de Lujo",
    "世界新闻": "Noticias del Mundo",
    "世界集市": "Bazar Mundial",
    "上海浦东": "Shanghái Pudong",
    "东京银座": "Tokio Ginza",
    "首尔江南": "Seúl Gangnam",
    "新加坡滨海湾": "Singapur Marina Bay",
    "香港中环": "Hong Kong Central",
    "北京国贸": "Pekín CBD",
    "台北信义": "Taipéi Xinyi",
    "曼谷暹罗": "Bangkok Siam",
    "吉隆坡双子塔": "Kuala Lumpur Petronas",
    "雅加达苏迪曼": "Yakarta Sudirman",
    "孟买班德拉": "Bombay Bandra",
    "德里康诺特": "Delhi Connaught",
    "马尼拉马卡蒂": "Manila Makati",
    "胡志明市滨城": "Ho Chi Minh Ben Thanh",
    "河内还剑": "Hanói Hoan Kiem",
    "巴黎左岸": "París Orilla Izquierda",
    "伦敦金融城": "Londres City",
    "罗马古城": "Roma Antigua",
    "柏林米特": "Berlín Mitte",
    "马德里格兰大道": "Madrid Gran Vía",
    "巴塞罗那港湾": "Puerto de Barcelona",
    "阿姆斯特丹运河": "Canales de Ámsterdam",
    "苏黎世班霍夫": "Zúrich Bahnhofstrasse",
    "维也纳环城": "Viena Ring",
    "布拉格老城": "Praga Ciudad Vieja",
    "雅典卫城": "Acrópolis de Atenas",
    "里斯本贝伦": "Lisboa Belém",
    "斯德哥尔摩王岛": "Estocolmo Isla del Rey",
    "纽约曼哈顿": "Nueva York Manhattan",
    "洛杉矶星光大道": "Los Ángeles Paseo de la Fama",
    "旧金山湾区": "Área de la Bahía de San Francisco",
    "西雅图先锋广场": "Seattle Pioneer Square",
    "芝加哥环区": "Chicago Loop",
    "多伦多港湾": "Puerto de Toronto",
    "温哥华煤港": "Vancouver Coal Harbour",
    "墨西哥城改革大道": "Ciudad de México Reforma",
    "迈阿密海滩": "Miami Beach",
    "波士顿后湾": "Boston Back Bay",
    "华盛顿国会山": "Washington Capitol Hill",
    "里约海岸": "Costa de Río",
    "圣保罗保利斯塔": "São Paulo Paulista",
    "布宜诺斯艾利斯港区": "Buenos Aires Puerto Madero",
    "圣地亚哥金融区": "Santiago Distrito Financiero",
    "利马米拉弗洛雷斯": "Lima Miraflores",
    "波哥大北区": "Bogotá Zona Norte",
    "蒙得维的亚海滨": "Montevideo Rambla",
    "开普敦海湾": "Bahía de Ciudad del Cabo",
    "开罗尼罗河": "El Cairo Nilo",
    "约翰内斯堡桑顿": "Johannesburgo Sandton",
    "内罗毕上城": "Nairobi Upper Hill",
    "拉各斯维多利亚岛": "Lagos Isla Victoria",
    "卡萨布兰卡滨海": "Casablanca Marina",
    "阿克拉独立大道": "Accra Avenida Independencia",
    "悉尼港": "Puerto de Sídney",
    "墨尔本中央": "Melbourne Central",
    "奥克兰皇后街": "Auckland Queen Street",
    "惠灵顿海湾": "Bahía de Wellington",
    "布里斯班南岸": "Brisbane South Bank",
    "珀斯伊丽莎白码头": "Perth Elizabeth Quay",
    "迪拜塔区": "Distrito Torre de Dubái",
    "迪拜国际机场": "Aeropuerto Internacional de Dubái",
    "阿布扎比海滨": "Abu Dabi Corniche",
    "多哈西湾": "Doha West Bay",
    "利雅得国王区": "Riad King District",
    "伊斯坦布尔博斯普鲁斯": "Estambul Bósforo",
    "特拉维夫海岸": "Costa de Tel Aviv",
    "莫斯科红场": "Moscú Plaza Roja",
    "圣彼得堡涅瓦": "San Petersburgo Neva",
    "雷克雅未克港": "Reikiavik Puerto",
    "哥本哈根新港": "Copenhague Nyhavn",
    "赫尔辛基设计区": "Helsinki Distrito de Diseño",
    "都柏林圣殿区": "Dublín Temple Bar",
    "爱丁堡王子街": "Edimburgo Princes Street",
    "布鲁塞尔大广场": "Bruselas Grand Place",
    "华沙老城": "Varsovia Ciudad Vieja",
    "布达佩斯多瑙河": "Budapest Danubio",
    "慕尼黑玛利亚广场": "Múnich Marienplatz",
    "米兰大教堂": "Milán Duomo",
    "威尼斯圣马可": "Venecia San Marcos",
    "佛罗伦萨文艺街": "Florencia Barrio Renacentista",
  },
};

const regionTranslations = {
  en: { 亚洲: "Asia", 欧洲: "Europe", 北美洲: "North America", 南美洲: "South America", 非洲: "Africa", 大洋洲: "Oceania", 中东: "Middle East", 欧亚: "Eurasia" },
  es: { 亚洲: "Asia", 欧洲: "Europa", 北美洲: "Norteamérica", 南美洲: "Sudamérica", 非洲: "África", 大洋洲: "Oceanía", 中东: "Medio Oriente", 欧亚: "Eurasia" },
};

const countryTranslations = {
  en: {
    中国: "China", 日本: "Japan", 韩国: "South Korea", 新加坡: "Singapore", 泰国: "Thailand", 马来西亚: "Malaysia", 印度尼西亚: "Indonesia", 印度: "India", 菲律宾: "Philippines", 越南: "Vietnam",
    法国: "France", 英国: "United Kingdom", 意大利: "Italy", 德国: "Germany", 西班牙: "Spain", 荷兰: "Netherlands", 瑞士: "Switzerland", 奥地利: "Austria", 捷克: "Czechia", 希腊: "Greece", 葡萄牙: "Portugal", 瑞典: "Sweden",
    美国: "United States", 加拿大: "Canada", 墨西哥: "Mexico", 巴西: "Brazil", 阿根廷: "Argentina", 智利: "Chile", 秘鲁: "Peru", 哥伦比亚: "Colombia", 乌拉圭: "Uruguay",
    南非: "South Africa", 埃及: "Egypt", 肯尼亚: "Kenya", 尼日利亚: "Nigeria", 摩洛哥: "Morocco", 加纳: "Ghana", 澳大利亚: "Australia", 新西兰: "New Zealand",
    阿联酋: "United Arab Emirates", 卡塔尔: "Qatar", 沙特阿拉伯: "Saudi Arabia", 土耳其: "Turkey", 以色列: "Israel", 俄罗斯: "Russia", 冰岛: "Iceland", 丹麦: "Denmark", 芬兰: "Finland", 爱尔兰: "Ireland", 比利时: "Belgium", 波兰: "Poland", 匈牙利: "Hungary",
  },
  es: {
    中国: "China", 日本: "Japón", 韩国: "Corea del Sur", 新加坡: "Singapur", 泰国: "Tailandia", 马来西亚: "Malasia", 印度尼西亚: "Indonesia", 印度: "India", 菲律宾: "Filipinas", 越南: "Vietnam",
    法国: "Francia", 英国: "Reino Unido", 意大利: "Italia", 德国: "Alemania", 西班牙: "España", 荷兰: "Países Bajos", 瑞士: "Suiza", 奥地利: "Austria", 捷克: "Chequia", 希腊: "Grecia", 葡萄牙: "Portugal", 瑞典: "Suecia",
    美国: "Estados Unidos", 加拿大: "Canadá", 墨西哥: "México", 巴西: "Brasil", 阿根廷: "Argentina", 智利: "Chile", 秘鲁: "Perú", 哥伦比亚: "Colombia", 乌拉圭: "Uruguay",
    南非: "Sudáfrica", 埃及: "Egipto", 肯尼亚: "Kenia", 尼日利亚: "Nigeria", 摩洛哥: "Marruecos", 加纳: "Ghana", 澳大利亚: "Australia", 新西兰: "Nueva Zelanda",
    阿联酋: "Emiratos Árabes Unidos", 卡塔尔: "Catar", 沙特阿拉伯: "Arabia Saudita", 土耳其: "Turquía", 以色列: "Israel", 俄罗斯: "Rusia", 冰岛: "Islandia", 丹麦: "Dinamarca", 芬兰: "Finlandia", 爱尔兰: "Irlanda", 比利时: "Bélgica", 波兰: "Polonia", 匈牙利: "Hungría",
  },
};

const specialtyDisplayLabels = {
  en: {
    finance: "Financial hub",
    tourism: "Tourism hotspot",
    tech: "Tech district",
    transit: "Transit hub",
    culture: "Culture city",
  },
  es: {
    finance: "Centro financiero",
    tourism: "Zona turística",
    tech: "Distrito tecnológico",
    transit: "Centro de transporte",
    culture: "Ciudad cultural",
  },
};

const upgradeTierLabels = {
  zh: ["基础据点", "区域开发", "城市核心", "国际枢纽", "全球地标", "世界级总部"],
  en: ["Base Outpost", "District Buildout", "City Core", "Global Hub", "World Landmark", "World HQ"],
  es: ["Base", "Distrito", "Núcleo Urbano", "Centro Global", "Hito Mundial", "Sede Mundial"],
};

const nextUpgradeLabels = {
  zh: ["", "区域开发", "城市核心", "国际枢纽", "全球地标", "世界总部"],
  en: ["", "District Buildout", "City Core", "Global Hub", "World Landmark", "World HQ"],
  es: ["", "Distrito", "Núcleo Urbano", "Centro Global", "Hito Mundial", "Sede Mundial"],
};

const rareBadgeTranslations = {
  en: { "传说地标": "Legend Landmark", "稀有地标": "Rare Landmark", "城市印章": "City Stamp" },
  es: { "传说地标": "Hito Legendario", "稀有地标": "Hito Raro", "城市印章": "Sello Urbano" },
};

const difficultySettings = {
  easy: {
    label: "轻松",
    aiIQ: 75,
    reserveBonus: 230,
    bidFactor: 0.66,
    shopCashFloor: 660,
    upgradeReserve: 560,
    minCashAfterBuy: 440,
    buyThreshold: 105,
    valueFocus: 0.55,
    setFocus: 0.55,
    cardUseChance: 0.45,
    tradeAsk: 0.96,
    auctionReserve: 310,
    summary: {
      zh: "保守买地，容易错过拍卖机会。",
      en: "Conservative buying and weaker auction judgment.",
      es: "Compra conservadora y subastas débiles.",
    },
  },
  normal: {
    label: "普通",
    aiIQ: 100,
    reserveBonus: 40,
    bidFactor: 0.95,
    shopCashFloor: 460,
    upgradeReserve: 350,
    minCashAfterBuy: 280,
    buyThreshold: 76,
    valueFocus: 0.82,
    setFocus: 0.82,
    cardUseChance: 0.68,
    tradeAsk: 1.04,
    auctionReserve: 220,
    summary: {
      zh: "会正常买地、拍卖、升级和买卡。",
      en: "Balanced buying, auctions, upgrades, and cards.",
      es: "Compra, subasta, mejora y usa cartas de forma equilibrada.",
    },
  },
  smart: {
    label: "精明",
    aiIQ: 125,
    reserveBonus: -120,
    bidFactor: 1.18,
    shopCashFloor: 300,
    upgradeReserve: 230,
    minCashAfterBuy: 170,
    buyThreshold: 50,
    valueFocus: 1.08,
    setFocus: 1.12,
    cardUseChance: 0.84,
    tradeAsk: 1.1,
    auctionReserve: 150,
    summary: {
      zh: "会主动集套装、争拍强城、优先升级高收益城市。",
      en: "Targets sets, fights for strong cities, and upgrades better assets.",
      es: "Busca conjuntos, pelea ciudades fuertes y mejora activos valiosos.",
    },
  },
  expert: {
    label: "专家",
    aiIQ: 150,
    reserveBonus: -240,
    bidFactor: 1.36,
    shopCashFloor: 190,
    upgradeReserve: 140,
    minCashAfterBuy: 100,
    buyThreshold: 30,
    valueFocus: 1.3,
    setFocus: 1.38,
    cardUseChance: 0.94,
    tradeAsk: 1.17,
    auctionReserve: 90,
    summary: {
      zh: "会算估值、防守核心资产，并更 aggressive 地使用卡片。",
      en: "Values cities, protects key assets, and uses cards aggressively.",
      es: "Calcula valor, protege activos clave y usa cartas agresivamente.",
    },
  },
  master: {
    label: "大师",
    aiIQ: 180,
    reserveBonus: -360,
    bidFactor: 1.58,
    shopCashFloor: 90,
    upgradeReserve: 60,
    minCashAfterBuy: 40,
    buyThreshold: 12,
    valueFocus: 1.55,
    setFocus: 1.7,
    cardUseChance: 1,
    tradeAsk: 1.26,
    auctionReserve: 35,
    summary: {
      zh: "会强力抢套装、压迫拍卖、极限升级，基本不卖便宜资产。",
      en: "Pushes sets, pressures auctions, upgrades hard, and rarely sells cheap.",
      es: "Presiona conjuntos y subastas, mejora fuerte y casi no vende barato.",
    },
  },
};

const characterDefinitions = {
  banker: { title: "银行家", detail: "开局现金 +200", cashBonus: 200 },
  builder: { title: "建筑师", detail: "升级费用 -15%", buildDiscount: 0.85 },
  broker: { title: "经纪人", detail: "商店买卡 -20%", shopDiscount: 0.8 },
  landlord: { title: "地主", detail: "自有地产租金 +5%", rentBonus: 1.05 },
};

const themeDefinitions = {
  city: "现代城市",
  island: "海岛假日",
  space: "星际航线",
  fairy: "童话小镇",
};

const companyTypeDefinitions = {
  company: { label: "公司", detail: "每轮现金流 +35，城市估值提升。", icon: "home", tone: "build" },
  hotel: { label: "酒店", detail: "旅游和租金收益增强。", icon: "spark", tone: "gain" },
  bank: { label: "银行", detail: "贷款利率下降，信用额度提升。", icon: "coin", tone: "buy" },
  techPark: { label: "科技园", detail: "股票热度和研发收益上升。", icon: "chart", tone: "build" },
};

const rulesPresetDefinitions = {
  classic: { label: "经典规则", startCash: 1600, priceFactor: 1, buildFactor: 1, taxFactor: 1, turnLimit: 0 },
  fast: { label: "快速经营", startCash: 1900, priceFactor: 0.82, buildFactor: 0.68, taxFactor: 0.82, turnLimit: 18 },
  limited: { label: "20 回合限时", startCash: 1600, priceFactor: 1, buildFactor: 0.92, taxFactor: 1, turnLimit: 20 },
  daily: { label: "每日挑战", startCash: 1700, priceFactor: 0.94, buildFactor: 0.86, taxFactor: 1.08, turnLimit: 22 },
  hard: { label: "困难税费", startCash: 1450, priceFactor: 1.08, buildFactor: 1.06, taxFactor: 1.35, turnLimit: 0 },
};

const taskDefinitions = [
  { id: "buy3", title: "置业新星", detail: "拥有 3 块地产", reward: 120 },
  { id: "firstSet", title: "套装收藏家", detail: "集齐任意洲 3 座城市", reward: 180 },
  { id: "worldTour", title: "环球旅行家", detail: "到达 5 个不同地区", reward: 180 },
  { id: "upgrade2", title: "城市建设者", detail: "累计升级 2 次", reward: 130 },
  { id: "use3Cards", title: "卡片玩家", detail: "使用 3 张手牌", reward: 100 },
  { id: "auctionWin", title: "拍卖赢家", detail: "拍下一块地产", reward: 140 },
];

const achievementDefinitions = {
  firstPurchase: "第一次买地",
  firstAuction: "第一次拍卖成交",
  highRent: "单次租金超过 180",
  firstBankrupt: "第一次破产清算",
  firstAttack: "第一次使用攻击卡",
  firstWin: "第一次获胜",
  worldTraveler: "到达五大洲",
  maxLevelCity: "第一座世界总部",
  loanSurvivor: "使用银行贷款",
  insuranceSave: "保险救援成功",
  rentKing: "单次租金超过 300",
  ecoCity: "完成环保改造",
  stockInvestor: "第一次买城市股票",
  megaDeal: "完成第一笔商业大单",
  atlasOpened: "打开城市图鉴",
  disasterSafe: "灾害保险生效",
};

const marketDefinitions = {
  steady: { title: "平稳市场", detail: "城市运转正常", price: 1, rent: 1, shop: 1 },
  boom: { title: "楼市热潮", detail: "地价和租金上涨", price: 1.15, rent: 1.2, shop: 1 },
  slump: { title: "低价入市", detail: "买地便宜，租金回落", price: 0.85, rent: 0.88, shop: 1 },
  cardRush: { title: "卡片狂欢", detail: "商店卡片打折", price: 1, rent: 1, shop: 0.78 },
  rentStorm: { title: "租金风暴", detail: "租金大幅波动", price: 1, rent: 1.35, shop: 1.08 },
  storm: { title: "暴雨天气", detail: "旅游城市租金下降", price: 1, rent: 0.92, shop: 1 },
  crisis: { title: "金融危机", detail: "地价下降，租金承压", price: 0.78, rent: 0.82, shop: 0.95 },
  goldenWeek: { title: "黄金周", detail: "旅游城市租金大涨", price: 1.05, rent: 1.16, shop: 1.02 },
  stockCrash: { title: "股灾冲击", detail: "城市股票价格暴跌", price: 0.92, rent: 0.94, shop: 1.05 },
};

const citySpecialtyDefinitions = {
  finance: { label: "金融中心", effect: "租金 +10%", rent: 1.1 },
  tourism: { label: "旅游热区", effect: "黄金周更赚钱", rent: 1.05 },
  tech: { label: "科技高地", effect: "升级费 -10%", build: 0.9 },
  transit: { label: "交通枢纽", effect: "经过起点奖励 +20" },
  culture: { label: "文化名城", effect: "自有停留奖励 +35" },
};

const ventureEvents = [
  {
    title: "高风险投资",
    tone: "gain",
    description: "55% 概率赚 260，失败亏 160。",
    run(player) {
      if (Math.random() < 0.55) {
        player.cash += 260;
        showEventBurst("+¥260 投资成功", "gain");
        return `${player.name} 冒险投资成功，获得 260 现金。`;
      }
      payBank(player, 160, "冒险投资失败");
      return `${player.name} 冒险投资失败，支付 160 现金。`;
    },
  },
  {
    title: "突击施工队",
    tone: "build",
    description: "随机升级一块自有街道；没有街道则拿 90。",
    run(player) {
      const target = shuffle(ownedPropertyIndexes(player.id).filter((index) => canBuildOn(index) && !state.mortgages[index] && state.levels[index] < MAX_LEVEL))[0];
      if (target === undefined) {
        player.cash += 90;
        showEventBurst("+¥90 施工补偿", "gain");
        return `${player.name} 没有可施工地块，获得 90 现金。`;
      }
      state.levels[target] += 1;
      player.upgradeCount += 1;
      showEventBurst(`${spaces[target].name} 突击升级`, "build");
      flashTile(target, "build");
      if (state.levels[target] >= MAX_LEVEL) unlockAchievement("maxLevelCity");
      checkTasks(player);
      return `${player.name} 叫来突击施工队，${spaces[target].name} 升到 ${state.levels[target]} 级。`;
    },
  },
  {
    title: "黑市牌包",
    tone: "buy",
    description: "花 120 抽一张随机手牌。",
    run(player) {
      if (player.cards.length >= MAX_HAND_CARDS) return `${player.name} 手牌已满，黑市牌包取消。`;
      payBank(player, 120, "黑市牌包");
      if (player.bankrupt) return `${player.name} 买牌包时现金不足。`;
      const item = shuffle(shopCatalog)[0];
      grantPlayerCard(player, item.cardId);
      return `${player.name} 买下黑市牌包，获得「${handCardDefinitions[item.cardId].title}」。`;
    },
  },
  {
    title: "抢先挂牌",
    tone: "buy",
    description: "最近无人地产 7 折抢购，现金不足则错过。",
    run(player) {
      const target = nearestUnownedProperty(player.position);
      if (target === null) return `${player.name} 找不到可抢购地产。`;
      const price = Math.round(propertyPrice(target) * 0.7);
      if (player.cash < price) return `${player.name} 现金不足，错过 ${spaces[target].name}。`;
      player.cash -= price;
      state.owners[target] = player.id;
      showEventBurst(`${spaces[target].name} 抢先挂牌`, "buy");
      checkTasks(player);
      return `${player.name} 用 ${formatMoney(price)} 抢先买下 ${spaces[target].name}。`;
    },
  },
  {
    title: "街头挑战",
    tone: "pay",
    description: "所有对手各付你 50，但你进入高调状态：下次付租 +40%。",
    run(player) {
      activePlayers().filter((other) => other.id !== player.id).forEach((opponent) => payPlayer(opponent, player, 50, "街头挑战"));
      player.rentRisk = true;
      showEventBurst("街头挑战成功", "gain");
      return `${player.name} 完成街头挑战，收取对手现金，但下次付租会增加。`;
    },
  },
];

const specialWorldSpaces = {
  0: { type: "start", name: "环球起点", icon: "start", meta: "+200" },
  5: { type: "chance", name: "机会航班", icon: "spark", meta: "抽卡" },
  10: { type: "tax", name: "全球关税", icon: "tax", amount: 120 },
  15: { type: "chance", name: "城市传闻", icon: "spark", meta: "抽卡" },
  20: { type: "bonus", name: "世界博览奖金", icon: "coin", amount: 140 },
  25: { type: "jail", name: "海关休整", icon: "pause", meta: "休息" },
  30: { type: "chance", name: "跨洲机会", icon: "spark", meta: "抽卡" },
  35: { type: "tax", name: "国际服务费", icon: "tax", amount: 110 },
  40: { type: "shop", name: "道具商店", icon: "card", meta: "买卡" },
  45: { type: "chance", name: "资本风向", icon: "spark", meta: "抽卡" },
  50: { type: "bonus", name: "跨洲分红", icon: "coin", amount: 160 },
  55: { type: "tax", name: "全球所得税", icon: "tax", amount: 150 },
  60: { type: "chance", name: "旅行奇遇", icon: "spark", meta: "抽卡" },
  65: { type: "shop", name: "环球商店", icon: "card", meta: "买卡" },
  70: { type: "chance", name: "投资电报", icon: "spark", meta: "抽卡" },
  75: { type: "gotoJail", name: "航班延误", icon: "pause", meta: "停一轮" },
  80: { type: "bonus", name: "城市峰会奖金", icon: "coin", amount: 180 },
  85: { type: "tax", name: "奢侈税", icon: "tax", amount: 170 },
  90: { type: "chance", name: "世界新闻", icon: "spark", meta: "抽卡" },
  95: { type: "shop", name: "世界集市", icon: "card", meta: "买卡" },
};

const worldCityTemplates = [
  { name: "上海浦东", group: "asia", region: "亚洲", country: "中国", landmark: "陆家嘴天际线", color: "#d89921" },
  { name: "东京银座", group: "asia", region: "亚洲", country: "日本", landmark: "银座商圈", color: "#d89921" },
  { name: "首尔江南", group: "asia", region: "亚洲", country: "韩国", landmark: "江南商业区", color: "#d89921" },
  { name: "新加坡滨海湾", group: "asia", region: "亚洲", country: "新加坡", landmark: "滨海湾金融区", color: "#d89921" },
  { name: "香港中环", group: "asia", region: "亚洲", country: "中国", landmark: "维港金融核心", color: "#d89921" },
  { name: "北京国贸", group: "asia", region: "亚洲", country: "中国", landmark: "CBD 国贸商圈", color: "#d89921" },
  { name: "台北信义", group: "asia", region: "亚洲", country: "中国", landmark: "台北 101 商圈", color: "#d89921" },
  { name: "曼谷暹罗", group: "asia", region: "亚洲", country: "泰国", landmark: "暹罗商业区", color: "#d89921" },
  { name: "吉隆坡双子塔", group: "asia", region: "亚洲", country: "马来西亚", landmark: "双子塔金融带", color: "#d89921" },
  { name: "雅加达苏迪曼", group: "asia", region: "亚洲", country: "印度尼西亚", landmark: "苏迪曼商务轴", color: "#d89921" },
  { name: "孟买班德拉", group: "asia", region: "亚洲", country: "印度", landmark: "班德拉库拉综合区", color: "#d89921" },
  { name: "德里康诺特", group: "asia", region: "亚洲", country: "印度", landmark: "康诺特广场", color: "#d89921" },
  { name: "马尼拉马卡蒂", group: "asia", region: "亚洲", country: "菲律宾", landmark: "马卡蒂金融区", color: "#d89921" },
  { name: "胡志明市滨城", group: "asia", region: "亚洲", country: "越南", landmark: "滨城市场街区", color: "#d89921" },
  { name: "河内还剑", group: "asia", region: "亚洲", country: "越南", landmark: "还剑湖商业区", color: "#d89921" },
  { name: "巴黎左岸", group: "europe", region: "欧洲", country: "法国", landmark: "塞纳河文化区", color: "#7657b8" },
  { name: "伦敦金融城", group: "europe", region: "欧洲", country: "英国", landmark: "金融城核心", color: "#7657b8" },
  { name: "罗马古城", group: "europe", region: "欧洲", country: "意大利", landmark: "历史街区", color: "#7657b8" },
  { name: "柏林米特", group: "europe", region: "欧洲", country: "德国", landmark: "米特创新带", color: "#7657b8" },
  { name: "马德里格兰大道", group: "europe", region: "欧洲", country: "西班牙", landmark: "格兰大道商圈", color: "#7657b8" },
  { name: "巴塞罗那港湾", group: "europe", region: "欧洲", country: "西班牙", landmark: "地中海港湾", color: "#7657b8" },
  { name: "阿姆斯特丹运河", group: "europe", region: "欧洲", country: "荷兰", landmark: "运河商业街", color: "#7657b8" },
  { name: "苏黎世班霍夫", group: "europe", region: "欧洲", country: "瑞士", landmark: "班霍夫大街", color: "#7657b8" },
  { name: "维也纳环城", group: "europe", region: "欧洲", country: "奥地利", landmark: "环城大道", color: "#7657b8" },
  { name: "布拉格老城", group: "europe", region: "欧洲", country: "捷克", landmark: "老城广场", color: "#7657b8" },
  { name: "雅典卫城", group: "europe", region: "欧洲", country: "希腊", landmark: "卫城文化区", color: "#7657b8" },
  { name: "里斯本贝伦", group: "europe", region: "欧洲", country: "葡萄牙", landmark: "贝伦河岸", color: "#7657b8" },
  { name: "斯德哥尔摩王岛", group: "europe", region: "欧洲", country: "瑞典", landmark: "王岛办公区", color: "#7657b8" },
  { name: "纽约曼哈顿", group: "northAmerica", region: "北美洲", country: "美国", landmark: "时代广场", color: "#4d81d9" },
  { name: "洛杉矶星光大道", group: "northAmerica", region: "北美洲", country: "美国", landmark: "影视大道", color: "#4d81d9" },
  { name: "旧金山湾区", group: "northAmerica", region: "北美洲", country: "美国", landmark: "湾区科技走廊", color: "#4d81d9" },
  { name: "西雅图先锋广场", group: "northAmerica", region: "北美洲", country: "美国", landmark: "先锋广场", color: "#4d81d9" },
  { name: "芝加哥环区", group: "northAmerica", region: "北美洲", country: "美国", landmark: "Loop 商业区", color: "#4d81d9" },
  { name: "多伦多港湾", group: "northAmerica", region: "北美洲", country: "加拿大", landmark: "湖岸金融区", color: "#4d81d9" },
  { name: "温哥华煤港", group: "northAmerica", region: "北美洲", country: "加拿大", landmark: "煤港海滨", color: "#4d81d9" },
  { name: "墨西哥城改革大道", group: "northAmerica", region: "北美洲", country: "墨西哥", landmark: "改革大道金融带", color: "#4d81d9" },
  { name: "迈阿密海滩", group: "northAmerica", region: "北美洲", country: "美国", landmark: "海滩商业带", color: "#4d81d9" },
  { name: "波士顿后湾", group: "northAmerica", region: "北美洲", country: "美国", landmark: "后湾商圈", color: "#4d81d9" },
  { name: "华盛顿国会山", group: "northAmerica", region: "北美洲", country: "美国", landmark: "国会山街区", color: "#4d81d9" },
  { name: "里约海岸", group: "southAmerica", region: "南美洲", country: "巴西", landmark: "科帕卡巴纳", color: "#df624e" },
  { name: "圣保罗保利斯塔", group: "southAmerica", region: "南美洲", country: "巴西", landmark: "保利斯塔大道", color: "#df624e" },
  { name: "布宜诺斯艾利斯港区", group: "southAmerica", region: "南美洲", country: "阿根廷", landmark: "马德罗港区", color: "#df624e" },
  { name: "圣地亚哥金融区", group: "southAmerica", region: "南美洲", country: "智利", landmark: "圣哈坦金融区", color: "#df624e" },
  { name: "利马米拉弗洛雷斯", group: "southAmerica", region: "南美洲", country: "秘鲁", landmark: "米拉弗洛雷斯海岸", color: "#df624e" },
  { name: "波哥大北区", group: "southAmerica", region: "南美洲", country: "哥伦比亚", landmark: "北区商务街", color: "#df624e" },
  { name: "蒙得维的亚海滨", group: "southAmerica", region: "南美洲", country: "乌拉圭", landmark: "兰布拉海滨", color: "#df624e" },
  { name: "开普敦海湾", group: "africa", region: "非洲", country: "南非", landmark: "桌山海湾", color: "#3c8f5d" },
  { name: "开罗尼罗河", group: "africa", region: "非洲", country: "埃及", landmark: "尼罗河商业带", color: "#3c8f5d" },
  { name: "约翰内斯堡桑顿", group: "africa", region: "非洲", country: "南非", landmark: "桑顿金融区", color: "#3c8f5d" },
  { name: "内罗毕上城", group: "africa", region: "非洲", country: "肯尼亚", landmark: "上城商务区", color: "#3c8f5d" },
  { name: "拉各斯维多利亚岛", group: "africa", region: "非洲", country: "尼日利亚", landmark: "维多利亚岛", color: "#3c8f5d" },
  { name: "卡萨布兰卡滨海", group: "africa", region: "非洲", country: "摩洛哥", landmark: "滨海大道", color: "#3c8f5d" },
  { name: "阿克拉独立大道", group: "africa", region: "非洲", country: "加纳", landmark: "独立大道", color: "#3c8f5d" },
  { name: "悉尼港", group: "oceania", region: "大洋洲", country: "澳大利亚", landmark: "歌剧院海港", color: "#2d9f6f" },
  { name: "墨尔本中央", group: "oceania", region: "大洋洲", country: "澳大利亚", landmark: "中央商务区", color: "#2d9f6f" },
  { name: "奥克兰皇后街", group: "oceania", region: "大洋洲", country: "新西兰", landmark: "皇后街商圈", color: "#2d9f6f" },
  { name: "惠灵顿海湾", group: "oceania", region: "大洋洲", country: "新西兰", landmark: "海湾行政区", color: "#2d9f6f" },
  { name: "布里斯班南岸", group: "oceania", region: "大洋洲", country: "澳大利亚", landmark: "南岸文化区", color: "#2d9f6f" },
  { name: "珀斯伊丽莎白码头", group: "oceania", region: "大洋洲", country: "澳大利亚", landmark: "伊丽莎白码头", color: "#2d9f6f" },
  { name: "迪拜塔区", group: "middleEast", region: "中东", country: "阿联酋", landmark: "哈利法塔商圈", color: "#c6527a" },
  { name: "迪拜国际机场", group: "middleEast", region: "中东", country: "阿联酋", landmark: "国际航空枢纽", color: "#c6527a" },
  { name: "阿布扎比海滨", group: "middleEast", region: "中东", country: "阿联酋", landmark: "滨海商务区", color: "#c6527a" },
  { name: "多哈西湾", group: "middleEast", region: "中东", country: "卡塔尔", landmark: "西湾天际线", color: "#c6527a" },
  { name: "利雅得国王区", group: "middleEast", region: "中东", country: "沙特阿拉伯", landmark: "国王金融区", color: "#c6527a" },
  { name: "伊斯坦布尔博斯普鲁斯", group: "middleEast", region: "中东", country: "土耳其", landmark: "博斯普鲁斯海峡", color: "#c6527a" },
  { name: "特拉维夫海岸", group: "middleEast", region: "中东", country: "以色列", landmark: "地中海海岸", color: "#c6527a" },
  { name: "莫斯科红场", group: "world", region: "欧亚", country: "俄罗斯", landmark: "红场商业圈", color: "#223042" },
  { name: "圣彼得堡涅瓦", group: "world", region: "欧亚", country: "俄罗斯", landmark: "涅瓦河岸", color: "#223042" },
  { name: "雷克雅未克港", group: "world", region: "欧洲", country: "冰岛", landmark: "北大西洋港口", color: "#223042" },
  { name: "哥本哈根新港", group: "world", region: "欧洲", country: "丹麦", landmark: "新港彩屋街", color: "#223042" },
  { name: "赫尔辛基设计区", group: "world", region: "欧洲", country: "芬兰", landmark: "设计街区", color: "#223042" },
  { name: "都柏林圣殿区", group: "world", region: "欧洲", country: "爱尔兰", landmark: "圣殿酒吧区", color: "#223042" },
  { name: "爱丁堡王子街", group: "world", region: "欧洲", country: "英国", landmark: "王子街", color: "#223042" },
  { name: "布鲁塞尔大广场", group: "world", region: "欧洲", country: "比利时", landmark: "大广场", color: "#223042" },
  { name: "华沙老城", group: "world", region: "欧洲", country: "波兰", landmark: "老城广场", color: "#223042" },
  { name: "布达佩斯多瑙河", group: "world", region: "欧洲", country: "匈牙利", landmark: "多瑙河岸", color: "#223042" },
  { name: "慕尼黑玛利亚广场", group: "world", region: "欧洲", country: "德国", landmark: "玛利亚广场", color: "#223042" },
  { name: "米兰大教堂", group: "world", region: "欧洲", country: "意大利", landmark: "大教堂广场", color: "#223042" },
  { name: "威尼斯圣马可", group: "world", region: "欧洲", country: "意大利", landmark: "圣马可广场", color: "#223042" },
  { name: "佛罗伦萨文艺街", group: "world", region: "欧洲", country: "意大利", landmark: "文艺复兴街区", color: "#223042" },
];

const spaces = createWorldTourSpaces();

function createWorldTourSpaces() {
  const result = [];
  let cityIndex = 0;

  for (let index = 0; index < 100; index += 1) {
    if (specialWorldSpaces[index]) {
      result.push(specialWorldSpaces[index]);
      continue;
    }

    result.push(buildWorldProperty(worldCityTemplates[cityIndex], cityIndex));
    cityIndex += 1;
  }

  return result;
}

function buildWorldProperty(city, order) {
  const price = Math.round((120 + order * 7.5) / 10) * 10;
  const rent = Math.round(14 + order * 1.15);
  const buildCost = Math.round((70 + order * 3.2) / 5) * 5;
  const specialty = citySpecialtyFor(city, order);
  const attributes = cityAttributesFor(city, order);
  const profile = cityProfileFor(city, order, attributes);

  return {
    type: "property",
    kind: "street",
    icon: "home",
    ...city,
    specialty,
    ...attributes,
    ...profile,
    price,
    rent,
    buildCost,
  };
}

function citySpecialtyFor(city, order) {
  if (/纽约|伦敦|香港|苏黎世|多哈|迪拜|上海|新加坡|东京/.test(city.name)) return "finance";
  if (/港|海岸|海湾|贝伦|威尼斯|圣马可|里约|悉尼|开普敦|巴塞罗那|佛罗伦萨/.test(city.name)) return "tourism";
  if (/湾区|西雅图|设计区|江南|国贸|科技|米特/.test(city.name)) return "tech";
  if (/机场|港|码头|班霍夫|大道|枢纽|皇后街/.test(city.name)) return "transit";
  return ["culture", "finance", "tourism", "tech", "transit"][order % 5];
}

function cityAttributesFor(city, order) {
  const base = {
    prosperity: 54 + ((order * 7) % 38),
    security: 52 + ((order * 5 + city.name.length) % 36),
    tourism: 50 + ((order * 9 + city.landmark.length) % 40),
    tech: 48 + ((order * 11 + city.country.length) % 42),
  };

  if (citySpecialtyFor(city, order) === "finance") base.prosperity += 8;
  if (citySpecialtyFor(city, order) === "tourism") base.tourism += 10;
  if (citySpecialtyFor(city, order) === "tech") base.tech += 10;
  if (citySpecialtyFor(city, order) === "culture") base.security += 6;

  return Object.fromEntries(
    Object.entries(base).map(([key, value]) => [key, clamp(value, 35, 99)]),
  );
}

function cityProfileFor(city, order, attributes) {
  const coastal = /港|海岸|海湾|滨海|码头|威尼斯|里约|悉尼|开普敦|巴塞罗那|贝伦/.test(`${city.name}${city.landmark}`);
  const airport = /机场|航空|枢纽|国王十字|中央|班霍夫|皇后街/.test(`${city.name}${city.landmark}`);
  const energy = /迪拜|利雅得|多哈|阿布扎比|能源|国王/.test(`${city.name}${city.landmark}`);
  const basePopulation = 0.8 + ((order * 0.37 + city.name.length * 0.19) % 9.2);
  const visitors = Math.round(((attributes.tourism || 50) * 0.14 + (coastal ? 3.2 : 0.9)) * 10) / 10;
  const population = Math.round(basePopulation * 10) / 10;
  const pollution = clamp(Math.round(70 - (attributes.security || 50) * 0.35 + (energy ? 18 : 0) + (airport ? 8 : 0)), 12, 92);
  const happiness = clamp(Math.round((attributes.security + attributes.tourism) / 2 - pollution * 0.18 + (coastal ? 6 : 0)), 28, 98);
  const rating = cityRating(attributes.prosperity, happiness, pollution, attributes.tech);
  const rareBadge = (attributes.prosperity + attributes.tourism + attributes.tech + happiness) / 4 >= 78 ? "传说地标" : (coastal || airport ? "稀有地标" : "城市印章");

  return {
    population,
    pollution,
    happiness,
    visitors,
    rating,
    rareBadge,
    coastal,
    airport,
    energy,
    story: cityStoryFor(city, coastal, airport, energy),
  };
}

function cityRating(prosperity, happiness, pollution, tech) {
  const score = prosperity * 0.35 + happiness * 0.28 + tech * 0.24 - pollution * 0.17;
  if (score >= 78) return "SS";
  if (score >= 68) return "S";
  if (score >= 58) return "A";
  if (score >= 48) return "B";
  return "C";
}

function cityStoryFor(city, coastal, airport, energy) {
  const traits = [];
  if (coastal) traits.push("海运和旅游让这里总有现金流动");
  if (airport) traits.push("航线网络让投资者更容易抵达");
  if (energy) traits.push("能源资本让基建扩张更快");
  if (traits.length === 0) traits.push(`${city.landmark} 吸引了稳定的人流和商业活动`);
  return `${city.name} 以${city.landmark}闻名，${traits.join("，")}。`;
}

const chanceCards = [
  {
    title: "年度分红",
    category: "城市卡",
    icon: "coin",
    tone: "gain",
    rarity: "common",
    description: "商业区派发年终收益。",
    apply(player) {
      player.cash += 180;
      showEventBurst("+¥180 年度分红", "gain");
      return `${player.name} 获得 180 现金。`;
    },
  },
  {
    title: "城市维修",
    category: "账单卡",
    icon: "tax",
    tone: "pay",
    rarity: "common",
    description: "名下建筑越多，维修支出越高。",
    apply(player) {
      const levels = ownedPropertyIndexes(player.id).reduce((total, index) => total + state.levels[index], 0);
      const amount = Math.max(60, 40 + levels * 35);
      payBank(player, amount, "城市维修");
      return `${player.name} 支付 ${amount} 现金。`;
    },
  },
  {
    title: "快速通道",
    category: "移动卡",
    icon: "plane",
    tone: "move",
    rarity: "common",
    description: "城市专线开通，立刻向前移动。",
    apply(player) {
      movePlayer(player, 3);
      return `${player.name} 向前移动 3 格。`;
    },
  },
  {
    title: "街区团建",
    category: "互动卡",
    icon: "spark",
    tone: "gain",
    rarity: "rare",
    description: "所有对手赞助你的街区活动。",
    apply(player) {
      const opponents = activePlayers().filter((other) => other.id !== player.id);
      let collected = 0;
      opponents.forEach((opponent) => {
        const paid = Math.min(opponent.cash, 40);
        opponent.cash -= paid;
        player.cash += paid;
        collected += paid;
        if (paid < 40) {
          bankruptPlayer(opponent, "团建费用不足");
        }
      });
      showEventBurst(`${player.name} 收到 ${formatMoney(collected)}`, "gain");
      return `${player.name} 从其他玩家处共收到 ${collected} 现金。`;
    },
  },
  {
    title: "建设补贴",
    category: "建设卡",
    icon: "build",
    tone: "build",
    rarity: "rare",
    description: "为一块可升级地产免费加建。",
    apply(player) {
      const target = ownedPropertyIndexes(player.id).find((index) => canBuildOn(index) && state.levels[index] < MAX_LEVEL);
      if (target === undefined) {
        player.cash += 80;
        showEventBurst("+¥80 建设补贴", "gain");
        return `${player.name} 没有可升级地产，改领 80 现金。`;
      }
      state.levels[target] += 1;
      player.upgradeCount += 1;
      showEventBurst(`${spaces[target].name} 免费升级`, "build");
      flashTile(target, "build");
      if (state.levels[target] >= MAX_LEVEL) unlockAchievement("maxLevelCity");
      checkTasks(player);
      return `${spaces[target].name} 免费升级到 ${state.levels[target]} 级。`;
    },
  },
  {
    title: "巡游起点",
    category: "移动卡",
    icon: "start",
    tone: "gain",
    rarity: "rare",
    description: "城市巡游把你带回起点。",
    apply(player) {
      moveTo(player, 0, true);
      player.cash += LANDING_START_BONUS;
      showEventBurst("+¥100 巡游奖励", "gain");
      return `${player.name} 回到起点并领取额外 100 现金。`;
    },
  },
  {
    title: "审计通知",
    category: "账单卡",
    icon: "tax",
    tone: "pay",
    rarity: "common",
    description: "按现金比例缴纳一笔审计费用。",
    apply(player) {
      const amount = Math.min(220, Math.max(90, Math.round(player.cash * 0.12)));
      payBank(player, amount, "审计通知");
      return `${player.name} 支付 ${amount} 现金。`;
    },
  },
  {
    title: "暂停整理",
    category: "事件卡",
    icon: "pause",
    tone: "pay",
    rarity: "common",
    description: "前往暂停区，下一轮休整。",
    apply(player) {
      sendToPause(player);
      return `${player.name} 前往暂停区并停一轮。`;
    },
  },
  {
    title: "免租通行证",
    category: "道具卡",
    icon: "shield",
    tone: "build",
    rarity: "rare",
    description: "收入手牌。使用后，下次踩到别人地产可免付一次租金。",
    grantCard: "rentShield",
  },
  {
    title: "建设许可",
    category: "道具卡",
    icon: "build",
    tone: "build",
    rarity: "rare",
    description: "收入手牌。使用后，为一块自有街道免费升级一级。",
    grantCard: "buildPermit",
  },
  {
    title: "城市现金券",
    category: "道具卡",
    icon: "card",
    tone: "gain",
    rarity: "common",
    description: "收入手牌。使用后立刻兑换 120 现金。",
    grantCard: "cashVoucher",
  },
  {
    title: "遥控骰子",
    category: "道具卡",
    icon: "dice",
    tone: "move",
    rarity: "rare",
    description: "收入手牌。使用后，下一次掷骰固定走 6 格。",
    grantCard: "remoteDice",
  },
  {
    title: "洲际飞机票",
    category: "移动卡",
    icon: "plane",
    tone: "move",
    rarity: "rare",
    description: "收入手牌。使用后，飞往一个优先未到达的大洲城市。",
    grantCard: "planeTicket",
  },
  {
    title: "停留卡",
    category: "道具卡",
    icon: "pause",
    tone: "build",
    rarity: "rare",
    description: "收入手牌。使用后，下一次掷骰原地休整。",
    grantCard: "stayCard",
  },
  {
    title: "换位卡",
    category: "道具卡",
    icon: "refresh",
    tone: "move",
    rarity: "legendary",
    description: "收入手牌。使用后，与领跑对手交换位置。",
    grantCard: "swapCard",
  },
  {
    title: "抢购卡",
    category: "道具卡",
    icon: "home",
    tone: "buy",
    rarity: "legendary",
    description: "收入手牌。使用后，立即抢购最近的无人地产。",
    grantCard: "snapBuy",
  },
  {
    title: "冻结对手",
    category: "攻击卡",
    icon: "pause",
    tone: "pay",
    rarity: "rare",
    description: "收入手牌。使用后，让总身价最高的对手暂停一轮。",
    grantCard: "freezeRival",
  },
  {
    title: "强制缴税",
    category: "攻击卡",
    icon: "tax",
    tone: "pay",
    rarity: "rare",
    description: "收入手牌。使用后，所有对手缴纳 90 现金。",
    grantCard: "forceTax",
  },
  {
    title: "地产换手",
    category: "攻击卡",
    icon: "refresh",
    tone: "buy",
    rarity: "legendary",
    description: "收入手牌。使用后，用你最便宜地产换对手最贵地产。",
    grantCard: "propertySwap",
  },
  {
    title: "免税凭证",
    category: "防御卡",
    icon: "shield",
    tone: "build",
    rarity: "rare",
    description: "收入手牌。使用后，下次缴税或审计费用免除。",
    grantCard: "taxShield",
  },
  {
    title: "免暂停通行",
    category: "防御卡",
    icon: "shield",
    tone: "build",
    rarity: "rare",
    description: "收入手牌。使用后，下次被送往暂停区时抵消。",
    grantCard: "pauseShield",
  },
  {
    title: "租金反弹",
    category: "防御卡",
    icon: "shield",
    tone: "build",
    rarity: "legendary",
    description: "收入手牌。使用后，下次租金改由地主返还给你。",
    grantCard: "rentMirror",
  },
  {
    title: "破产保险",
    category: "防御卡",
    icon: "shield",
    tone: "build",
    rarity: "legendary",
    description: "收入手牌。使用后，防止一次破产清算。",
    grantCard: "insurance",
  },
  {
    title: "灾害保险",
    category: "防御卡",
    icon: "shield",
    tone: "build",
    rarity: "rare",
    description: "收入手牌。使用后，下一次城市灾害不会降低建筑等级。",
    grantCard: "disasterShield",
  },
  {
    title: "市长选举",
    category: "全球事件",
    icon: "crown",
    tone: "gain",
    rarity: "rare",
    description: "你名下城市越多，获得的城市税收奖励越高。",
    apply(player) {
      const owned = ownedPropertyIndexes(player.id).length;
      const amount = Math.max(90, owned * 38);
      player.cash += amount;
      showEventBurst(`+${formatMoney(amount)} 市长奖励`, "gain");
      return `${player.name} 赢得市长选举，获得 ${amount} 城市税收奖励。`;
    },
  },
  {
    title: "文化节开幕",
    category: "全球事件",
    icon: "spark",
    tone: "gain",
    rarity: "rare",
    description: "文化名城与旅游城市获得临时收益。",
    apply(player) {
      const targets = ownedPropertyIndexes(player.id).filter((index) => ["culture", "tourism"].includes(spaces[index].specialty));
      const amount = targets.length ? targets.length * 75 : 90;
      player.cash += amount;
      targets.forEach((index) => {
        state.cityRevenue[index] = (state.cityRevenue[index] || 0) + 45;
        flashTile(index, "rent");
      });
      showEventBurst(`+${formatMoney(amount)} 文化节`, "gain");
      return targets.length
        ? `${player.name} 的 ${targets.length} 座文化/旅游城市办节，获得 ${amount} 现金。`
        : `${player.name} 没有文化旅游城市，获得 90 现金赞助。`;
    },
  },
  {
    title: "奥运会/世界杯",
    category: "全球事件",
    icon: "trophy",
    tone: "gain",
    rarity: "legendary",
    description: "随机一座自有城市举办世界赛事，城市热度和收益上升。",
    apply(player) {
      const targets = ownedPropertyIndexes(player.id);
      const target = shuffle(targets)[0];
      if (target === undefined) {
        player.cash += 120;
        showEventBurst("+¥120 赛事赞助", "gain");
        return `${player.name} 暂无可举办城市，获得 120 现金赞助。`;
      }
      const amount = 140 + (state.levels[target] || 0) * 35 + Math.round((spaces[target].tourism || 50) * 0.8);
      player.cash += amount;
      state.cityRevenue[target] = (state.cityRevenue[target] || 0) + amount;
      state.cityPeakRevenue[target] = Math.max(state.cityPeakRevenue[target] || 0, amount);
      flashTile(target, "rent");
      showEventBurst(`${spaces[target].name} 世界赛事`, "gain");
      return `${spaces[target].name} 举办世界赛事，${player.name} 获得 ${amount} 现金。`;
    },
  },
  {
    title: "城市灾害",
    category: "全球事件",
    icon: "tax",
    tone: "pay",
    rarity: "rare",
    description: "一座自有城市遭遇灾害，若没有保险会降低 1 级并支付维修费。",
    apply(player) {
      const target = shuffle(ownedPropertyIndexes(player.id).filter((index) => (state.levels[index] || 0) > 0))[0];
      if (target === undefined) {
        player.cash += 70;
        showEventBurst("+¥70 灾害补助", "gain");
        return `${player.name} 没有高等级城市受损，获得 70 现金补助。`;
      }
      if (player.disasterShield) {
        player.disasterShield = false;
        unlockAchievement("disasterSafe");
        showEventBurst("灾害保险生效", "build");
        return `${player.name} 的灾害保险保护了 ${spaces[target].name}，城市等级不下降。`;
      }
      state.levels[target] = Math.max(0, state.levels[target] - 1);
      payBank(player, 85, "灾害维修费");
      flashTile(target, "pay");
      return `${spaces[target].name} 遭遇灾害，降到 ${state.levels[target]} 级，${player.name} 支付维修费。`;
    },
  },
  {
    title: "股灾预警",
    category: "全球事件",
    icon: "chart",
    tone: "pay",
    rarity: "rare",
    description: "全球城市股票进入暴跌市场数轮。",
    apply(player) {
      state.market = createMarketState("stockCrash");
      showEventBurst("股灾冲击", "pay");
      return `${player.name} 触发股灾预警，未来数轮城市股票价格承压。`;
    },
  },
  {
    title: "绿色改造基金",
    category: "全球事件",
    icon: "build",
    tone: "build",
    rarity: "rare",
    description: "免费为一座自有城市做环保改造。",
    apply(player) {
      const target = ownedPropertyIndexes(player.id).find((index) => (state.ecoLevels[index] || 0) < 3);
      if (target === undefined) {
        player.cash += 100;
        showEventBurst("+¥100 绿色基金", "gain");
        return `${player.name} 没有可改造城市，绿色基金兑换为 100 现金。`;
      }
      state.ecoLevels[target] = (state.ecoLevels[target] || 0) + 1;
      player.upgradeCount += 1;
      flashTile(target, "build");
      unlockAchievement("ecoCity");
      showEventBurst(`${spaces[target].name} 环保改造`, "build");
      return `${player.name} 获得绿色改造基金，${spaces[target].name} 环保等级升到 ${state.ecoLevels[target]}。`;
    },
  },
  {
    title: "城市争霸",
    category: "刺激事件",
    icon: "crown",
    tone: "buy",
    rarity: "legendary",
    description: "你的王牌城市向对手王牌城市发起商业挑战，赢家获得现金与城市热度。",
    apply(player) {
      const own = ownedPropertyIndexes(player.id).sort((a, b) => cityPowerScore(b) - cityPowerScore(a))[0];
      const opponent = richestOpponent(player);
      const target = opponent ? ownedPropertyIndexes(opponent.id).sort((a, b) => cityPowerScore(b) - cityPowerScore(a))[0] : undefined;
      if (own === undefined || target === undefined) {
        player.cash += 110;
        showEventBurst("+¥110 城市争霸赞助", "gain");
        return `${player.name} 暂无可争霸城市，获得 110 赞助。`;
      }
      const ownPower = cityPowerScore(own);
      const targetPower = cityPowerScore(target);
      if (ownPower + Math.random() * 80 >= targetPower) {
        player.cash += 160;
        state.cityRevenue[own] = (state.cityRevenue[own] || 0) + 120;
        flashTile(own, "rent");
        flashTile(target, "pay");
        showEventBurst(`${spaces[own].name} 争霸胜利`, "gain");
        return `${spaces[own].name} 击败 ${opponent.name} 的 ${spaces[target].name}，${player.name} 获得 160 现金，城市热度上升。`;
      }
      payBank(player, 100, "城市争霸失利");
      opponent.cash += 80;
      state.cityRevenue[target] = (state.cityRevenue[target] || 0) + 90;
      flashTile(target, "rent");
      showEventBurst(`${spaces[target].name} 守擂成功`, "pay");
      return `${spaces[target].name} 守擂成功，${player.name} 支付挑战成本，${opponent.name} 获得 80 现金。`;
    },
  },
  {
    title: "股票暴涨",
    category: "刺激事件",
    icon: "chart",
    tone: "gain",
    rarity: "legendary",
    description: "一座热门城市被资本追捧，城市收益和股东现金同步上涨。",
    apply(player) {
      const target = shuffle(spaces.map((space, index) => ({ space, index })).filter((item) => item.space.type === "property"))[0]?.index;
      if (target === undefined) return `${player.name} 看到市场异动，但没有城市被选中。`;
      const owner = playerById(state.owners[target]);
      state.cityRevenue[target] = (state.cityRevenue[target] || 0) + 240;
      state.cityPeakRevenue[target] = Math.max(state.cityPeakRevenue[target] || 0, 240);
      if (owner) owner.cash += 90;
      state.players.forEach((shareholder) => {
        const shares = stockShares(shareholder, target);
        if (shares > 0) shareholder.cash += shares * 35;
      });
      flashTile(target, "rent");
      showEventBurst(`${spaces[target].name} 股票暴涨`, "gain");
      return `${spaces[target].name} 被资本追捧，城市收益 +240${owner ? `，${owner.name} 获得 90 现金` : ""}，持股玩家获得分红。`;
    },
  },
];

const handCardDefinitions = {
  rentShield: {
    title: "免租通行证",
    category: "防御",
    icon: "shield",
    tone: "build",
    rarity: "rare",
    description: "下次踩到别人地产时，自动免付一次租金。",
    use(player) {
      player.rentShield = true;
      return `${player.name} 启用免租通行证，下次租金自动免除。`;
    },
  },
  buildPermit: {
    title: "建设许可",
    category: "建设",
    icon: "build",
    tone: "build",
    rarity: "rare",
    description: "为一块自有街道免费升级一级；没有可升级地产时兑换 90 现金。",
    use(player) {
      const target = ownedPropertyIndexes(player.id)
        .filter((index) => canBuildOn(index) && state.levels[index] < MAX_LEVEL)
        .sort((a, b) => spaces[b].rent - spaces[a].rent)[0];
      if (target === undefined) {
        player.cash += 90;
        showEventBurst("+¥90 建设许可兑换", "gain");
        return `${player.name} 没有可升级地产，建设许可兑换为 90 现金。`;
      }
      state.levels[target] += 1;
      player.upgradeCount += 1;
      showEventBurst(`${spaces[target].name} 免费升级`, "build");
      flashTile(target, "build");
      if (state.levels[target] >= MAX_LEVEL) unlockAchievement("maxLevelCity");
      checkTasks(player);
      return `${player.name} 使用建设许可，${spaces[target].name} 升到 ${state.levels[target]} 级。`;
    },
  },
  cashVoucher: {
    title: "城市现金券",
    category: "收益",
    icon: "coin",
    tone: "gain",
    rarity: "common",
    description: "立刻兑换 120 现金。",
    use(player) {
      player.cash += 120;
      showEventBurst("+¥120 现金券", "gain");
      return `${player.name} 使用城市现金券，获得 120 现金。`;
    },
  },
  remoteDice: {
    title: "遥控骰子",
    category: "移动",
    icon: "dice",
    tone: "move",
    rarity: "rare",
    description: "下一次掷骰固定走 6 格。",
    use(player) {
      player.forcedRoll = 6;
      showEventBurst("遥控骰子已设置", "build");
      return `${player.name} 使用遥控骰子，下一次掷骰固定走 6 格。`;
    },
    canUse(player) {
      return !player.forcedRoll;
    },
  },
  planeTicket: {
    title: "洲际飞机票",
    category: "移动",
    icon: "plane",
    tone: "move",
    rarity: "rare",
    description: "飞往一个优先未到达的大洲城市，可用于完成环球旅行。",
    use(player) {
      const target = flightDestination(player);
      if (target === null) return `${player.name} 没有合适的飞行目的地。`;
      moveTo(player, target, true);
      recordRegionVisit(player, spaces[target]);
      showEventBurst(`${spaces[target].name} 抵达`, "move");
      return `${player.name} 使用洲际飞机票，飞到 ${spaces[target].name}。`;
    },
    canUse(player) {
      return flightDestination(player) !== null;
    },
  },
  stayCard: {
    title: "停留卡",
    category: "防御",
    icon: "pause",
    tone: "build",
    rarity: "rare",
    description: "下一次掷骰原地停留，不触发新的地块。",
    use(player) {
      player.skipMove = true;
      showEventBurst("停留卡已准备", "build");
      return `${player.name} 使用停留卡，下一次掷骰将原地停留。`;
    },
    canUse(player) {
      return !player.skipMove;
    },
  },
  swapCard: {
    title: "换位卡",
    category: "移动",
    icon: "refresh",
    tone: "move",
    rarity: "legendary",
    description: "与总身价最高的对手交换位置。",
    use(player) {
      const target = activePlayers()
        .filter((other) => other.id !== player.id)
        .sort((a, b) => netWorth(b) - netWorth(a))[0];
      if (!target) return `${player.name} 没有可换位的对手。`;
      [player.position, target.position] = [target.position, player.position];
      showEventBurst(`${player.name} 与 ${target.name} 换位`, "build");
      return `${player.name} 使用换位卡，与 ${target.name} 交换位置。`;
    },
    canUse(player) {
      return activePlayers().some((other) => other.id !== player.id);
    },
  },
  snapBuy: {
    title: "抢购卡",
    category: "投资",
    icon: "home",
    tone: "buy",
    rarity: "legendary",
    description: "立即买下最近的无人地产，价格为标价。",
    use(player) {
      const target = nearestUnownedProperty(player.position);
      if (target === null) return `${player.name} 没有可抢购的无人地产。`;
      const space = spaces[target];
      const price = propertyPrice(target);
      if (player.cash < price) return `${player.name} 现金不足，无法抢购 ${space.name}。`;
      player.cash -= price;
      state.owners[target] = player.id;
      showEventBurst(`${player.name} 抢购 ${space.name}`, "buy");
      flashTile(target, "buy");
      checkTasks(player);
      return `${player.name} 使用抢购卡，买下 ${space.name}。`;
    },
    canUse(player) {
      const target = nearestUnownedProperty(player.position);
      return target !== null && player.cash >= propertyPrice(target);
    },
  },
  freezeRival: {
    title: "冻结对手",
    category: "攻击",
    icon: "pause",
    tone: "pay",
    rarity: "rare",
    description: "让总身价最高的对手暂停一轮。",
    use(player) {
      const target = richestOpponent(player);
      if (!target) return `${player.name} 没有可冻结的对手。`;
      target.skipTurns += 1;
      showEventBurst(`${target.name} 暂停一轮`, "pay");
      unlockAchievement("firstAttack");
      return `${player.name} 使用冻结对手，${target.name} 下一轮暂停。`;
    },
    canUse(player) {
      return Boolean(richestOpponent(player));
    },
  },
  forceTax: {
    title: "强制缴税",
    category: "攻击",
    icon: "tax",
    tone: "pay",
    rarity: "rare",
    description: "所有对手缴纳 90 现金。",
    use(player) {
      activePlayers()
        .filter((other) => other.id !== player.id)
        .forEach((opponent) => payBank(opponent, 90, "强制缴税"));
      showEventBurst("对手缴税", "pay");
      return `${player.name} 使用强制缴税，所有对手支付 90 现金。`;
    },
  },
  propertySwap: {
    title: "地产换手",
    category: "攻击",
    icon: "refresh",
    tone: "buy",
    rarity: "legendary",
    description: "用你最便宜地产换对手最贵地产。",
    use(player) {
      const own = ownedPropertyIndexes(player.id).sort((a, b) => spaces[a].price - spaces[b].price)[0];
      const opponent = richestOpponent(player);
      const target = opponent ? ownedPropertyIndexes(opponent.id).sort((a, b) => spaces[b].price - spaces[a].price)[0] : undefined;
      if (own === undefined || target === undefined) return `${player.name} 没有合适地产可交换。`;
      state.owners[own] = opponent.id;
      state.owners[target] = player.id;
      showEventBurst(`${spaces[target].name} 换手`, "buy");
      return `${player.name} 使用地产换手，用 ${spaces[own].name} 换来 ${opponent.name} 的 ${spaces[target].name}。`;
    },
    canUse(player) {
      const opponent = richestOpponent(player);
      return ownedPropertyIndexes(player.id).length > 0 && Boolean(opponent && ownedPropertyIndexes(opponent.id).length > 0);
    },
  },
  taxShield: {
    title: "免税凭证",
    category: "防御",
    icon: "shield",
    tone: "build",
    rarity: "rare",
    description: "下次缴税或审计费用自动免除。",
    use(player) {
      player.taxShield = true;
      showEventBurst("免税已启用", "build");
      return `${player.name} 启用免税凭证，下次税费自动免除。`;
    },
    canUse(player) {
      return !player.taxShield;
    },
  },
  pauseShield: {
    title: "免暂停通行",
    category: "防御",
    icon: "shield",
    tone: "build",
    rarity: "rare",
    description: "下次被送往暂停区时自动抵消。",
    use(player) {
      player.pauseShield = true;
      showEventBurst("免暂停已启用", "build");
      return `${player.name} 启用免暂停通行，下次暂停效果自动抵消。`;
    },
    canUse(player) {
      return !player.pauseShield;
    },
  },
  rentMirror: {
    title: "租金反弹",
    category: "防御",
    icon: "shield",
    tone: "build",
    rarity: "legendary",
    description: "下次租金改由地主返还给你。",
    use(player) {
      player.rentMirror = true;
      showEventBurst("租金反弹已启用", "build");
      return `${player.name} 启用租金反弹，下次租金将反向结算。`;
    },
    canUse(player) {
      return !player.rentMirror;
    },
  },
  insurance: {
    title: "破产保险",
    category: "防御",
    icon: "shield",
    tone: "build",
    rarity: "legendary",
    description: "启用后防止一次破产清算，并保住名下资产。",
    use(player) {
      player.insurance = true;
      showEventBurst("保险已启用", "build");
      return `${player.name} 启用破产保险，下次破产会自动救援。`;
    },
    canUse(player) {
      return !player.insurance;
    },
  },
  disasterShield: {
    title: "灾害保险",
    category: "防御",
    icon: "shield",
    tone: "build",
    rarity: "rare",
    description: "下次城市灾害不会降低建筑等级。",
    use(player) {
      player.disasterShield = true;
      showEventBurst("灾害保险已启用", "build");
      return `${player.name} 启用灾害保险，下次城市灾害会自动抵消。`;
    },
    canUse(player) {
      return !player.disasterShield;
    },
  },
};

const shopCatalog = [
  { cardId: "rentShield", price: 160 },
  { cardId: "remoteDice", price: 120 },
  { cardId: "planeTicket", price: 170 },
  { cardId: "stayCard", price: 130 },
  { cardId: "swapCard", price: 180 },
  { cardId: "buildPermit", price: 220 },
  { cardId: "snapBuy", price: 260 },
  { cardId: "cashVoucher", price: 90 },
  { cardId: "taxShield", price: 150 },
  { cardId: "pauseShield", price: 150 },
  { cardId: "rentMirror", price: 260 },
  { cardId: "freezeRival", price: 180 },
  { cardId: "forceTax", price: 200 },
  { cardId: "propertySwap", price: 320 },
  { cardId: "insurance", price: 300 },
  { cardId: "disasterShield", price: 170 },
];

const musicEvents = createMusicEvents();

const boardEl = document.getElementById("board");
const playersPanel = document.getElementById("playersPanel");
const cardsPanel = document.getElementById("cardsPanel");
const auctionPanel = document.getElementById("auctionPanel");
const shopPanel = document.getElementById("shopPanel");
const savePanel = document.getElementById("savePanel");
const tradePanel = document.getElementById("tradePanel");
const coopPanel = document.getElementById("coopPanel");
const tutorialPanel = document.getElementById("tutorialPanel");
const panelTabs = document.getElementById("panelTabs");
const progressPanel = document.getElementById("progressPanel");
const worldPanel = document.getElementById("worldPanel");
const sharePanel = document.getElementById("sharePanel");
const assetsPanel = document.getElementById("assetsPanel");
const logPanel = document.querySelector(".log-panel");
const eventLog = document.getElementById("eventLog");
const cityTicker = document.getElementById("cityTicker");
const worldMap = document.getElementById("worldMap");
const effectsLayer = document.getElementById("effectsLayer");
const statusLine = document.getElementById("statusLine");
const roundCounter = document.getElementById("roundCounter");
const currentTileCard = document.getElementById("currentTileCard");
const dieOne = document.getElementById("dieOne");
const dieTwo = document.getElementById("dieTwo");
const diceTotal = document.getElementById("diceTotal");
const rollButton = document.getElementById("rollButton");
const buyButton = document.getElementById("buyButton");
const declineButton = document.getElementById("declineButton");
const ventureButton = document.getElementById("ventureButton");
const quickUpgradeButton = document.getElementById("quickUpgradeButton");
const endButton = document.getElementById("endButton");
const contractButton = document.getElementById("contractButton");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicButtonText = document.getElementById("musicButtonText");
const newGameButton = document.getElementById("newGameButton");
const brandEyebrow = document.getElementById("brandEyebrow");
const brandTitle = document.getElementById("brandTitle");
const panelEyebrow = document.getElementById("panelEyebrow");
const panelTitle = document.getElementById("panelTitle");
const languageSelectLabel = document.getElementById("languageSelectLabel");
const languageSelect = document.getElementById("languageSelect");
const setupDialog = document.getElementById("setupDialog");
const winnerDialog = document.getElementById("winnerDialog");
const tutorialDialog = document.getElementById("tutorialDialog");
const winnerTitle = document.getElementById("winnerTitle");
const winnerSummary = document.getElementById("winnerSummary");
const tutorialIntroEyebrow = document.getElementById("tutorialIntroEyebrow");
const tutorialIntroTitle = document.getElementById("tutorialIntroTitle");
const tutorialIntroBody = document.getElementById("tutorialIntroBody");
const setupEyebrow = document.getElementById("setupEyebrow");
const setupTitle = document.getElementById("setupTitle");
const playerNameLabel = document.getElementById("playerNameLabel");
const playerNameInput = document.getElementById("playerNameInput");
const setupLanguageLabel = document.getElementById("setupLanguageLabel");
const setupLanguageInput = document.getElementById("setupLanguageInput");
const playerColorLabel = document.getElementById("playerColorLabel");
const playerColorInput = document.getElementById("playerColorInput");
const playerCountLabel = document.getElementById("playerCountLabel");
const playerCountInput = document.getElementById("playerCountInput");
const difficultyLabel = document.getElementById("difficultyLabel");
const difficultyInput = document.getElementById("difficultyInput");
const difficultyHint = document.getElementById("difficultyHint");
const characterLabel = document.getElementById("characterLabel");
const characterInput = document.getElementById("characterInput");
const themeLabel = document.getElementById("themeLabel");
const themeInput = document.getElementById("themeInput");
const rulesPresetLabel = document.getElementById("rulesPresetLabel");
const rulesPresetInput = document.getElementById("rulesPresetInput");
const startCashLabel = document.getElementById("startCashLabel");
const startCashInput = document.getElementById("startCashInput");
const cancelSetupButton = document.getElementById("cancelSetupButton");
const startGameButton = document.getElementById("startGameButton");
const closeWinnerButton = document.getElementById("closeWinnerButton");
const winnerNewGameButton = document.getElementById("winnerNewGameButton");
const startTutorialButton = document.getElementById("startTutorialButton");
const continueWithoutTutorialButton = document.getElementById("continueWithoutTutorialButton");
const propertyDialog = document.getElementById("propertyDialog");
const propertyDialogBody = document.getElementById("propertyDialogBody");
const closePropertyDialogButton = document.getElementById("closePropertyDialogButton");
const contractDialog = document.getElementById("contractDialog");
const contractDialogBody = document.getElementById("contractDialogBody");
const cancelContractButton = document.getElementById("cancelContractButton");
const confirmContractButton = document.getElementById("confirmContractButton");
const encyclopediaDialog = document.getElementById("encyclopediaDialog");
const encyclopediaBody = document.getElementById("encyclopediaBody");
const closeEncyclopediaButton = document.getElementById("closeEncyclopediaButton");

let state = loadGame() || createInitialGame();
if (shouldPreferContractsView() && !["auction", "shop"].includes(state.phase)) {
  state.sidePanelMode = "coop";
  state.sidePanelCollapsed = false;
}
let automationTimer = 0;
let pendingCoopContractIndex = null;
const musicState = {
  context: null,
  master: null,
  isPlaying: false,
  nextStart: 0,
  timer: 0,
  activeNodes: new Set(),
  fallbackAudio: null,
  fallbackUrl: "",
};

rollButton.addEventListener("click", () => rollCurrentTurn(false));
buyButton.addEventListener("click", buyPendingProperty);
declineButton.addEventListener("click", declinePendingProperty);
ventureButton.addEventListener("click", useVentureAction);
quickUpgradeButton.addEventListener("click", quickUpgradeBestProperty);
endButton.addEventListener("click", endTurn);
contractButton.addEventListener("click", openCoopPanelShortcut);
musicButton.addEventListener("click", toggleBackgroundMusic);
newGameButton.addEventListener("click", openSetupDialog);
languageSelect.addEventListener("change", handleLanguageChange);
setupLanguageInput.addEventListener("change", () => {
  state.config = { ...(state.config || {}), language: normalizeLanguage(setupLanguageInput.value) };
  renderStaticLabels();
});
difficultyInput.addEventListener("change", updateDifficultyHint);
cancelSetupButton.addEventListener("click", () => setupDialog.close());
startGameButton.addEventListener("click", startConfiguredGame);
cardsPanel.addEventListener("click", handleCardClick);
auctionPanel.addEventListener("click", handleAuctionClick);
shopPanel.addEventListener("click", handleShopClick);
savePanel.addEventListener("click", handleSaveSlotClick);
tradePanel.addEventListener("click", handleTradeClick);
coopPanel.addEventListener("click", handleTradeClick);
sharePanel.addEventListener("click", handleShareClick);
assetsPanel.addEventListener("click", handleAssetClick);
worldPanel.addEventListener("click", handleWorldPanelClick);
closeWinnerButton.addEventListener("click", closeWinnerDialog);
winnerNewGameButton.addEventListener("click", () => {
  winnerDialog.close();
  openSetupDialog();
});
startTutorialButton.addEventListener("click", startTutorialGame);
continueWithoutTutorialButton.addEventListener("click", dismissTutorialIntro);
boardEl.addEventListener("click", handleBoardClick);
worldMap.addEventListener("click", handleWorldMapClick);
propertyDialog.addEventListener("click", handlePropertyDialogClick);
document.addEventListener("toggle", handleDrawerToggle, true);
panelTabs?.addEventListener("click", handlePanelDrawerClick);
closePropertyDialogButton.addEventListener("click", () => {
  propertyDialog.close();
});
cancelContractButton.addEventListener("click", closeContractDialog);
confirmContractButton.addEventListener("click", confirmPendingCoopContract);
contractDialogBody.addEventListener("change", handleContractDialogChange);
closeEncyclopediaButton.addEventListener("click", () => {
  encyclopediaDialog.close();
});
encyclopediaBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-open-property]");
  if (!button) return;
  encyclopediaDialog.close();
  openPropertyDialog(Number(button.dataset.openProperty));
});
encyclopediaBody.addEventListener("input", (event) => {
  const input = event.target.closest("input[data-atlas-search]");
  if (!input) return;
  state.atlasSearch = input.value;
  renderEncyclopedia();
  const nextInput = encyclopediaBody.querySelector("input[data-atlas-search]");
  if (nextInput) {
    nextInput.focus();
    nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
  }
});

function currentLanguage() {
  return languageFromUrl() || normalizeLanguage(state?.config?.language || "zh");
}

function normalizeLanguage(language) {
  const value = String(language || "").trim().toLowerCase();
  if (languageDefinitions[value]) return value;
  if (value.startsWith("en")) return "en";
  if (value.startsWith("es")) return "es";
  if (value.startsWith("zh") || value.startsWith("cn")) return "zh";
  return "zh";
}

function languageFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("lang") || params.get("language") || params.get("locale");
    if (!value) return "";
    const language = normalizeLanguage(value);
    return languageDefinitions[language] ? language : "";
  } catch {
    return "";
  }
}

function uiText(key, ...args) {
  return uiTextForLanguage(currentLanguage(), key, ...args);
}

function uiTextForLanguage(language, key, ...args) {
  const pack = languageDefinitions[normalizeLanguage(language)] || languageDefinitions.zh;
  const value = pack[key] ?? languageDefinitions.zh[key];
  if (typeof value === "function") return value(...args);
  return value || key;
}

function tutorialText(key, ...args) {
  const language = currentLanguage();
  const pack = tutorialCopyDefinitions[language] || tutorialCopyDefinitions.zh;
  const value = pack[key] ?? tutorialCopyDefinitions.zh[key];
  if (typeof value === "function") return value(...args);
  return value || key;
}

function localizedTutorialValue(value) {
  const language = currentLanguage();
  if (!value || typeof value !== "object") return String(value || "");
  return value[language] || value.zh || "";
}

function readTutorialProgress() {
  try {
    const raw = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      introSeen: Boolean(parsed.introSeen),
      skipped: Boolean(parsed.skipped),
      started: Boolean(parsed.started),
      completed: Boolean(parsed.completed),
      completedAt: parsed.completedAt || "",
    };
  } catch {
    return { introSeen: false, skipped: false, started: false, completed: false, completedAt: "" };
  }
}

function writeTutorialProgress(patch = {}) {
  const next = { ...readTutorialProgress(), ...patch };
  try {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Tutorial guidance still works even if local storage is blocked.
  }
  return next;
}

function createTutorialState(active = false) {
  return {
    active: Boolean(active),
    introSeen: Boolean(active),
    completed: false,
    startedRound: 1,
    rewards: {},
  };
}

function normalizeTutorialState(tutorial, active = false) {
  const progress = readTutorialProgress();
  return {
    active: Boolean(active && !progress.completed && tutorial?.active !== false),
    introSeen: Boolean(tutorial?.introSeen || progress.introSeen || active),
    completed: Boolean(tutorial?.completed || progress.completed),
    startedRound: Math.max(1, Number(tutorial?.startedRound) || 1),
    rewards: tutorial?.rewards && typeof tutorial.rewards === "object" ? { ...tutorial.rewards } : {},
  };
}

function isTutorialGame() {
  return Boolean(state?.config?.tutorialMode && state?.tutorial?.active && !state?.tutorial?.completed);
}

function aiDifficulty(key = state?.config?.difficulty) {
  return difficultySettings[key] || difficultySettings.normal;
}

function renderStaticLabels() {
  const language = currentLanguage();
  document.documentElement.lang = uiTextForLanguage(language, "htmlLang");
  document.title = uiTextForLanguage(language, "documentTitle");

  brandEyebrow.textContent = uiTextForLanguage(language, "brandEyebrow");
  brandTitle.textContent = uiTextForLanguage(language, "brandTitle");
  panelEyebrow.textContent = uiTextForLanguage(language, "panelEyebrow");
  panelTitle.textContent = uiTextForLanguage(language, "panelTitle");
  languageSelectLabel.textContent = uiTextForLanguage(language, "language");
  languageSelect.value = language;
  updateSelectLabels(languageSelect, languageOptionLabels[language] || languageOptionLabels.zh);

  setupEyebrow.textContent = uiTextForLanguage(language, "newGame");
  setupTitle.textContent = uiTextForLanguage(language, "setupTitle");
  playerNameLabel.textContent = uiTextForLanguage(language, "playerName");
  setupLanguageLabel.textContent = uiTextForLanguage(language, "language");
  setupLanguageInput.value = language;
  updateSelectLabels(setupLanguageInput, languageOptionLabels[language] || languageOptionLabels.zh);
  playerColorLabel.textContent = uiTextForLanguage(language, "playerColor");
  playerCountLabel.textContent = uiTextForLanguage(language, "playerCount");
  difficultyLabel.textContent = uiTextForLanguage(language, "difficulty");
  characterLabel.textContent = uiTextForLanguage(language, "character");
  themeLabel.textContent = uiTextForLanguage(language, "theme");
  rulesPresetLabel.textContent = uiTextForLanguage(language, "rulesPreset");
  startCashLabel.textContent = uiTextForLanguage(language, "startCash");
  updateSelectLabels(playerCountInput, setupSelectLabels[language].playerCount);
  updateSelectLabels(difficultyInput, setupSelectLabels[language].difficulty);
  updateSelectLabels(characterInput, setupSelectLabels[language].character);
  updateSelectLabels(themeInput, setupSelectLabels[language].theme);
  updateSelectLabels(rulesPresetInput, setupSelectLabels[language].rulesPreset);
  updateDifficultyHint();
  cancelSetupButton.textContent = uiTextForLanguage(language, "cancel");
  startGameButton.textContent = uiTextForLanguage(language, "start");
  newGameButton.setAttribute("aria-label", uiTextForLanguage(language, "newGame"));
  newGameButton.title = uiTextForLanguage(language, "newGame");
  if (tutorialDialog?.open) renderTutorialIntro();
}

function updateSelectLabels(select, labels) {
  Array.from(select.options).forEach((option) => {
    option.textContent = labels[option.value] || option.textContent;
  });
}

const dynamicPhraseTranslations = {
  en: {
    "回合行动": "Turn Actions",
    "掷骰 / 合同 / 结束": "Roll / Contracts / End",
    "签合同": "Contracts",
    "结束": "End",
    "买地决策": "Buy Decision",
    "购买 / 拍卖": "Buy / Auction",
    "购买": "Buy",
    "跳过": "Skip",
    "工具建设": "Tools & Build",
    "冒险 / 升级": "Venture / Upgrade",
    "冒险": "Venture",
    "升级": "Upgrade",
    "交易": "Deals",
    "融资 / 报价 / 拍卖": "Finance / Bids / Auctions",
    "市场": "Market",
    "合同": "Contracts",
    "签约 / 分红 / 违约": "Sign / Dividends / Breach",
    "玩家": "Player",
    "卡片 / 资产 / 银行": "Cards / Assets / Bank",
    "世界": "World",
    "地图 / 股票 / 规则": "Map / Stocks / Rules",
    "任务": "Goals",
    "目标 / 存档 / 分享": "Targets / Saves / Share",
    "记录": "Log",
    "事件流水": "Event Feed",
    "商业交易台": "Business Desk",
    "对手拥有城市或手牌后，这里会出现报价。合作分红请去“合同”抽屉。": "Offers appear here after rivals own cities or cards. Use the Contracts drawer for dividend partnerships.",
    "全球指数": "Global Index",
    "地产指数": "Real Estate Index",
    "股票指数": "Stock Index",
    "融资利率": "Funding Rate",
    "信用额度": "Credit Limit",
    "组合市值": "Portfolio Value",
    "融资 / 并购 / 债券": "Financing / M&A / Bonds",
    "场外报价": "Private Offers",
    "成交簿": "Deal Ledger",
    "大额交易": "Major Deals",
    "合同中心": "Contract Center",
    "这里专门放合同：签约、分红、提前解约和违约条款都在这里处理。": "Contracts live here: signing, dividends, early exits, and breach terms are handled in one place.",
    "现在是对手行动，但你可以先查看合同；轮到你行动时才能签新合同。": "It is a rival turn, but you can review contracts now. You can sign new contracts on your turn.",
    "查看合同条件": "View Contract Terms",
    "对手还没有城市，暂时不能签合同": "Rivals have no cities yet, so contracts are unavailable.",
    "对手城市已抵押，不能签合同": "Rival cities are mortgaged, so contracts are unavailable.",
    "合同签署台": "Contract Desk",
    "合同列表": "Contract List",
    "对手提案": "Rival Proposals",
    "合同档案": "Contract Archive",
    "怎么出现可签合同": "How to unlock contracts",
    "公司合作合同": "Company Partnership Contract",
    "可以起草正式合作合同": "Ready to draft a formal partnership contract",
    "先查看合同格式和条件": "Review the contract form and terms first",
    "打开后可选对方玩家名下的城市，查看合同价值、双方给付、违约金，并填写违约条款。你的商业信誉": "Open it to choose a rival-owned city, review contract value, payments, breach fee, and fill in breach terms. Your business reputation",
    "对手买下城市后，这里会出现可选择的合同项目。你的商业信誉": "When rivals buy cities, contract projects will appear here. Your business reputation",
    "打开合同签署台": "Open Contract Desk",
    "现在还没有可签合同。看下面的条件提示，满足后这里会出现“签合同”。": "No signable contracts yet. Check the requirements below; once they are met, Sign Contract will appear here.",
    "还没有完成、违约或解约的合同。": "No completed, breached, or terminated contracts yet.",
    "暂时没有对手发来的合同提案。": "No rival contract proposals yet.",
    "对手已经买下城市": "A rival owns a city",
    "城市没有被抵押": "The city is not mortgaged",
    "轮到你行动阶段": "It is your action phase",
    "现金够付入场费": "Enough cash for the entry fee",
    "签约后你先付入场费，之后每轮拿分红；如果城市被抵押、转手或所有方破产，会触发违约金。": "After signing, you pay an entry fee and receive dividends each round. Mortgaging, transferring, or owner bankruptcy triggers the breach fee.",
    "名下区域": "owned zone",
    "合作": "Partner With",
    "合同价值": "Contract Value",
    "你付": "You Pay",
    "预计收": "Expected Income",
    "违约金": "Breach Fee",
    "预览合同": "Preview Contract",
    "个合同待你同意": "contracts need your approval",
    "个合同等对方同意": "contracts waiting for rival approval",
    "个合同可签": "contracts ready",
    "份合同分红中": "contracts paying dividends",
    "个合同项目": "contract projects",
    "对方发来的合同必须你同意后才会生效。": "Contracts sent by rivals only become active after you approve.",
    "你提交的合同还没生效，必须等对方同意。": "Your submitted contract is waiting for rival approval.",
    "先提交给对方确认；对方同意后才会扣款生效。": "Submit it for rival approval; payment happens only after approval.",
    "查看分红、剩余轮数、提前解约和违约条款。": "Review dividends, remaining rounds, early exit, and breach terms.",
    "进行中": "Active",
    "已到期": "Completed",
    "已违约": "Breached",
    "已解约": "Terminated",
    "归档": "Archived",
    "你是合作方": "You are the partner",
    "你是所有方": "You are the owner",
    "合同已归档": "Contract archived",
    "原所有者": "Original owner",
    "合作方": "Partner",
    "所有方": "Owner",
    "剩": "Remaining",
    "需要你同意": "Needs Your Approval",
    "等待对方同意": "Waiting for Rival Approval",
    "提案记录": "Proposal Record",
    "对方收": "Rival Receives",
    "给你": "Pays You",
    "对方留": "Rival Keeps",
    "违约": "Breach",
    "已打开合作合同": "Contracts opened",
    "已打开合同提案": "Contract proposals opened",
    "个合同需要同意或等待对方同意": "contracts need approval or are waiting",
    "个可签项目": "signable projects",
    "份合同正在分红": "active dividend contracts",
    "点“签合同”即可合作分红": "tap Contracts to start dividend cooperation",
    "合同签署台": "Contract Desk",
    "合作合同书": "Partnership Contract",
    "公司合作合同起草": "Company Partnership Draft",
    "等待合同项目": "Waiting for Contract Project",
    "对手还没有可合作的城市。等对手买下城市后，这里会出现可签合同。": "Rivals do not have partnerable cities yet. Signable contracts will appear after they buy cities.",
    "当前没有可签约玩家。": "No signable player right now.",
    "暂无可签合同": "No signable contracts",
    "合同编号": "Contract ID",
    "签署回合": "Signing Round",
    "合作分红": "Dividend Share",
    "城市评级": "City Rating",
    "合同模板": "Template",
    "本合同由玩家填写条款": "Players fill in this contract",
    "提交给": "submits to",
    "审批": "for approval",
    "只有": "Only after",
    "同意后才会扣款并生成正式合同": "approves will payment happen and a formal contract be created",
    "甲方 / 城市持有人": "Party A / City Holder",
    "乙方 / 合作投资人": "Party B / Investing Partner",
    "对方玩家，提供名下区域和经营分红": "Rival player provides the owned zone and operating dividends",
    "你的玩家，支付入场费并获得分红权": "Your player pays the entry fee and receives dividend rights",
    "你给对方": "You Give Rival",
    "对方当下收到": "Rival Receives Now",
    "对方给你 / 每轮": "Rival Pays You / Round",
    "对方保留 / 每轮": "Rival Keeps / Round",
    "合同期限 / 轮": "Term / Rounds",
    "正式生效时从你现金扣除": "Deducted from your cash when active",
    "同意后立即入账": "credited immediately after approval",
    "按你填写的期限结算": "Settled for the term you enter",
    "每轮保留收益": "keeps this income each round",
    "触发违约条款时由违约方支付": "paid by the breaching party",
    "违约条款 / 什么算违约": "Breach Terms / What Counts",
    "填写违约条款，例如：抵押、转手、破产、提前解约如何赔付。": "Write breach terms, such as how mortgage, transfer, bankruptcy, or early exit pays out.",
    "金额、期限和签名都可以自己填；提交后先给对方确认，只有对方同意后才会扣款并生成正式合同。": "You can fill in amounts, term, and signatures. Submit for rival approval first; payment and the formal contract happen only after approval.",
    "现在不能签": "Cannot sign now",
    "你仍可先查看合同内容和条款。": "You can still review the contract and terms.",
    "谈判方案": "Negotiation Plan",
    "标准合同：价格、分红、违约金平衡": "Standard: balanced price, dividends, and breach fee",
    "提高入场费，换更高分红": "Raise entry fee for higher dividends",
    "提高入场费，降低违约金": "Raise entry fee and lower breach fee",
    "强势高分红，高入场费高风险": "Aggressive: high dividends, high entry, high risk",
    "低入场费，低分红高违约约束": "Low entry, lower dividends, stricter breach terms",
    "改变谈判方案会刷新合同价值、分红比例、违约金和顾问评分。": "Changing the plan refreshes contract value, dividend share, breach fee, and advisor score.",
    "合同顾问": "Contract Advisor",
    "风险等级": "Risk Level",
    "城市模板": "City Template",
    "预计回本": "Estimated Payback",
    "综合现金压力、违约金、城市热度和信誉": "Based on cash pressure, breach fee, city heat, and reputation",
    "预计总分红": "Estimated total dividends",
    "小字条款": "Fine Print",
    "甲方签名": "Party A Signature",
    "乙方签名": "Party B Signature",
    "玩家可填写签名": "Player can edit signature",
    "签名线": "Signature line",
    "待对方同意": "Awaiting Rival Approval",
    "条件未满足": "Requirements Not Met",
    "提交给对方确认": "Submit to Rival",
    "提交给对方": "Submit to Rival",
    "暂不能签": "Cannot Sign Yet",
    "卡片 / 银行": "Cards / Bank",
    "银行卡 / 融资": "Bank Card / Funding",
    "角色技能": "Role Skill",
    "手牌道具": "Hand Tools",
    "地产拍卖": "Property Auction",
    "卡片商店": "Card Shop",
    "存档槽位": "Save Slots",
    "任务 / 成就": "Goals / Badges",
    "世界系统": "World Systems",
    "联机分享码": "Share Code",
    "资产 / 升级": "Assets / Upgrades",
    "同意": "Accept",
    "拒绝": "Decline",
    "等待": "Waiting",
    "未同意": "Rejected",
    "提前解约": "End Early",
    "续约": "Renew",
    "打开签署台": "Open Contract Desk",
    "查看签署台": "View Contract Desk",
    "查看提案": "View Proposals",
    "暂无": "None",
    "空": "Empty",
    "起草": "Draft",
    "条件": "Rules",
    "暂无可显示卡片。": "No cards to show.",
    "暂无可显示资产。": "No assets to show.",
    "还没有地产。": "No property yet.",
    "暂无对手提案。": "No rival proposals.",
    "暂无归档合同。": "No archived contracts.",
    "等待掷骰": "Waiting to roll",
    "待售": "For Sale",
    "自有": "Owned",
    "收租": "Rent",
    "支出": "Pay",
    "收益": "Income",
    "商店": "Shop",
    "事件": "Event",
    "暂停": "Pause",
    "地块": "Tile",
  },
  es: {
    "回合行动": "Turno",
    "掷骰 / 合同 / 结束": "Dados / Contratos / Fin",
    "签合同": "Contratos",
    "结束": "Fin",
    "买地决策": "Comprar",
    "购买 / 拍卖": "Comprar / Subasta",
    "购买": "Comprar",
    "跳过": "Pasar",
    "工具建设": "Herramientas",
    "冒险 / 升级": "Evento / Mejorar",
    "冒险": "Evento",
    "升级": "Mejorar",
    "交易": "Tratos",
    "融资 / 报价 / 拍卖": "Finanzas / Ofertas / Subastas",
    "市场": "Mercado",
    "合同": "Contratos",
    "签约 / 分红 / 违约": "Firma / Dividendos / Incumplir",
    "玩家": "Jugador",
    "卡片 / 资产 / 银行": "Cartas / Activos / Banco",
    "世界": "Mundo",
    "地图 / 股票 / 规则": "Mapa / Acciones / Reglas",
    "任务": "Metas",
    "目标 / 存档 / 分享": "Objetivos / Guardar / Compartir",
    "记录": "Registro",
    "事件流水": "Eventos",
    "商业交易台": "Mesa Comercial",
    "对手拥有城市或手牌后，这里会出现报价。合作分红请去“合同”抽屉。": "Las ofertas aparecerán cuando los rivales tengan ciudades o cartas. Usa Contratos para dividendos.",
    "全球指数": "Índice Global",
    "地产指数": "Índice Inmobiliario",
    "股票指数": "Índice Bursátil",
    "融资利率": "Tasa",
    "信用额度": "Crédito",
    "组合市值": "Portafolio",
    "融资 / 并购 / 债券": "Financiación / M&A / Bonos",
    "场外报价": "Ofertas Privadas",
    "成交簿": "Libro de Tratos",
    "大额交易": "Grandes Tratos",
    "合同中心": "Centro de Contratos",
    "这里专门放合同：签约、分红、提前解约和违约条款都在这里处理。": "Los contratos viven aquí: firma, dividendos, salida anticipada e incumplimiento.",
    "现在是对手行动，但你可以先查看合同；轮到你行动时才能签新合同。": "Ahora juega un rival, pero puedes revisar contratos. Podrás firmar en tu turno.",
    "查看合同条件": "Ver Condiciones",
    "对手还没有城市，暂时不能签合同": "Los rivales aún no tienen ciudades; no hay contratos.",
    "对手城市已抵押，不能签合同": "Las ciudades rivales están hipotecadas; no hay contratos.",
    "合同签署台": "Mesa de Contratos",
    "合同列表": "Lista de Contratos",
    "对手提案": "Propuestas Rivales",
    "合同档案": "Archivo de Contratos",
    "怎么出现可签合同": "Cómo desbloquear contratos",
    "公司合作合同": "Contrato de Cooperación",
    "可以起草正式合作合同": "Listo para redactar un contrato formal",
    "先查看合同格式和条件": "Revisa el formato y las condiciones",
    "打开后可选对方玩家名下的城市，查看合同价值、双方给付、违约金，并填写违约条款。你的商业信誉": "Ábrelo para elegir una ciudad rival, ver valor, pagos, penalización y escribir términos. Tu reputación",
    "对手买下城市后，这里会出现可选择的合同项目。你的商业信誉": "Cuando los rivales compren ciudades, aparecerán proyectos. Tu reputación",
    "打开合同签署台": "Abrir Mesa de Contratos",
    "现在还没有可签合同。看下面的条件提示，满足后这里会出现“签合同”。": "Aún no hay contratos. Revisa los requisitos; al cumplirlos aparecerá Firmar.",
    "还没有完成、违约或解约的合同。": "No hay contratos completados, incumplidos o terminados.",
    "暂时没有对手发来的合同提案。": "No hay propuestas rivales.",
    "对手已经买下城市": "Un rival tiene una ciudad",
    "城市没有被抵押": "La ciudad no está hipotecada",
    "轮到你行动阶段": "Es tu fase de acción",
    "现金够付入场费": "Hay efectivo para la entrada",
    "签约后你先付入场费，之后每轮拿分红；如果城市被抵押、转手或所有方破产，会触发违约金。": "Al firmar pagas entrada y cobras dividendos cada ronda. Hipoteca, venta o quiebra activa penalización.",
    "名下区域": "zona propia",
    "合作": "Cooperar Con",
    "合同价值": "Valor",
    "你付": "Pagas",
    "预计收": "Ingreso Est.",
    "违约金": "Penalización",
    "预览合同": "Vista Previa",
    "个合同待你同意": "contratos requieren tu aprobación",
    "个合同等对方同意": "contratos esperan aprobación rival",
    "个合同可签": "contratos listos",
    "份合同分红中": "contratos con dividendos",
    "个合同项目": "proyectos",
    "对方发来的合同必须你同意后才会生效。": "Los contratos rivales solo se activan con tu aprobación.",
    "你提交的合同还没生效，必须等对方同意。": "Tu contrato espera aprobación rival.",
    "先提交给对方确认；对方同意后才会扣款生效。": "Envíalo al rival; el pago ocurre solo tras aprobación.",
    "查看分红、剩余轮数、提前解约和违约条款。": "Revisa dividendos, rondas, salida e incumplimiento.",
    "进行中": "Activo",
    "已到期": "Completado",
    "已违约": "Incumplido",
    "已解约": "Terminado",
    "归档": "Archivado",
    "你是合作方": "Eres socio",
    "你是所有方": "Eres dueño",
    "合同已归档": "Contrato archivado",
    "原所有者": "Dueño original",
    "合作方": "Socio",
    "所有方": "Dueño",
    "剩": "Quedan",
    "需要你同意": "Necesita Tu Aprobación",
    "等待对方同意": "Esperando Rival",
    "提案记录": "Registro de Propuesta",
    "对方收": "Rival Recibe",
    "给你": "Te Paga",
    "对方留": "Rival Conserva",
    "违约": "Incumplir",
    "已打开合作合同": "Contratos abiertos",
    "已打开合同提案": "Propuestas abiertas",
    "个合同需要同意或等待对方同意": "contratos requieren o esperan aprobación",
    "个可签项目": "proyectos firmables",
    "份合同正在分红": "contratos activos",
    "点“签合同”即可合作分红": "toca Contratos para cooperar con dividendos",
    "合作合同书": "Contrato de Cooperación",
    "公司合作合同起草": "Borrador de Cooperación",
    "等待合同项目": "Esperando Proyecto",
    "对手还没有可合作的城市。等对手买下城市后，这里会出现可签合同。": "Los rivales no tienen ciudades cooperables. Aparecerán al comprar ciudades.",
    "当前没有可签约玩家。": "No hay jugador disponible.",
    "暂无可签合同": "No hay contratos",
    "合同编号": "ID",
    "签署回合": "Ronda",
    "合作分红": "Dividendos",
    "城市评级": "Rating",
    "合同模板": "Plantilla",
    "本合同由玩家填写条款": "Los jugadores llenan este contrato",
    "提交给": "envía a",
    "审批": "para aprobar",
    "只有": "Solo si",
    "同意后才会扣款并生成正式合同": "aprueba, se cobra y se crea el contrato",
    "甲方 / 城市持有人": "Parte A / Dueño",
    "乙方 / 合作投资人": "Parte B / Inversor",
    "对方玩家，提供名下区域和经营分红": "Rival ofrece zona y dividendos",
    "你的玩家，支付入场费并获得分红权": "Tu jugador paga entrada y cobra dividendos",
    "你给对方": "Das al Rival",
    "对方当下收到": "Rival Recibe Ahora",
    "对方给你 / 每轮": "Rival Te Paga / Ronda",
    "对方保留 / 每轮": "Rival Guarda / Ronda",
    "合同期限 / 轮": "Duración / Rondas",
    "正式生效时从你现金扣除": "Se descuenta al activarse",
    "同意后立即入账": "se acredita al aprobar",
    "按你填写的期限结算": "según la duración escrita",
    "每轮保留收益": "conserva cada ronda",
    "触发违约条款时由违约方支付": "paga quien incumple",
    "违约条款 / 什么算违约": "Términos / Incumplimiento",
    "填写违约条款，例如：抵押、转手、破产、提前解约如何赔付。": "Escribe términos: hipoteca, venta, quiebra o salida anticipada.",
    "金额、期限和签名都可以自己填；提交后先给对方确认，只有对方同意后才会扣款并生成正式合同。": "Puedes llenar montos, duración y firmas. Se envía al rival; solo con aprobación se cobra.",
    "现在不能签": "No se puede firmar",
    "你仍可先查看合同内容和条款。": "Puedes revisar el contrato.",
    "谈判方案": "Negociación",
    "标准合同：价格、分红、违约金平衡": "Estándar: precio, dividendos y penalización equilibrados",
    "提高入场费，换更高分红": "Más entrada por más dividendos",
    "提高入场费，降低违约金": "Más entrada y menor penalización",
    "强势高分红，高入场费高风险": "Agresivo: alto dividendo y alto riesgo",
    "低入场费，低分红高违约约束": "Baja entrada, bajo dividendo, más restricciones",
    "改变谈判方案会刷新合同价值、分红比例、违约金和顾问评分。": "Cambiar plan recalcula valor, dividendos, penalización y asesor.",
    "合同顾问": "Asesor",
    "风险等级": "Riesgo",
    "城市模板": "Plantilla",
    "预计回本": "Retorno Est.",
    "综合现金压力、违约金、城市热度和信誉": "Según efectivo, penalización, ciudad y reputación",
    "预计总分红": "Dividendos estimados",
    "小字条款": "Letra Pequeña",
    "甲方签名": "Firma Parte A",
    "乙方签名": "Firma Parte B",
    "玩家可填写签名": "Firma editable",
    "签名线": "Línea de firma",
    "待对方同意": "Esperando Aprobación",
    "条件未满足": "Faltan Requisitos",
    "提交给对方确认": "Enviar al Rival",
    "提交给对方": "Enviar al Rival",
    "暂不能签": "No Firmable",
    "卡片 / 银行": "Cartas / Banco",
    "银行卡 / 融资": "Tarjeta / Fondos",
    "角色技能": "Habilidad",
    "手牌道具": "Herramientas",
    "地产拍卖": "Subasta",
    "卡片商店": "Tienda de Cartas",
    "存档槽位": "Guardados",
    "任务 / 成就": "Metas / Logros",
    "世界系统": "Sistemas",
    "联机分享码": "Código",
    "资产 / 升级": "Activos / Mejoras",
    "同意": "Aceptar",
    "拒绝": "Rechazar",
    "等待": "Esperando",
    "未同意": "Rechazado",
    "提前解约": "Terminar",
    "续约": "Renovar",
    "打开签署台": "Abrir Contratos",
    "查看签署台": "Ver Contratos",
    "查看提案": "Ver Propuestas",
    "暂无": "Nada",
    "空": "Vacío",
    "起草": "Borrador",
    "条件": "Reglas",
    "暂无可显示卡片。": "No hay cartas.",
    "暂无可显示资产。": "No hay activos.",
    "还没有地产。": "Sin propiedades.",
    "暂无对手提案。": "Sin propuestas rivales.",
    "暂无归档合同。": "Sin contratos archivados.",
    "等待掷骰": "Esperando dados",
    "待售": "En Venta",
    "自有": "Propio",
    "收租": "Renta",
    "支出": "Pago",
    "收益": "Ingreso",
    "商店": "Tienda",
    "事件": "Evento",
    "暂停": "Pausa",
    "地块": "Casilla",
  },
};

function translateDynamicText(text, language = currentLanguage()) {
  if (language === "zh" || !text || !/[\u4e00-\u9fff]/.test(text)) return text;
  const pack = dynamicPhraseTranslations[language] || {};
  const trimmed = text.trim();
  let translated = pack[trimmed] || "";
  if (!translated) {
    translated = trimmed
      .replace(/^(.+) 的卡片$/, language === "es" ? "Cartas de $1" : "$1's Cards")
      .replace(/^(.+) 的资产$/, language === "es" ? "Activos de $1" : "$1's Assets")
      .replace(/^(.+) 当前地块$/, language === "es" ? "Casilla actual de $1" : "$1's Current Tile")
      .replace(/^轮到 (.+)[，,]\s*准备掷骰[。.]?$/, language === "es" ? "Turno de $1. Tira los dados." : "$1's turn. Roll the dice.")
      .replace(/^(.+) 名下区域$/, language === "es" ? "Zona de $1" : "$1's Zone")
      .replace(/^合作 (.+)$/, language === "es" ? "Cooperar con $1" : "Partner With $1")
      .replace(/^(.+) 合作合同书$/, language === "es" ? "Contrato de cooperación de $1" : "$1 Partnership Contract")
      .replace(/^(.+) 合同价值 (¥?[\d,]+)$/, language === "es" ? "$1 valor $2" : "$1 value $2")
      .replace(/^(\d+) 张卡$/, language === "es" ? "$1 cartas" : "$1 Cards")
      .replace(/^(\d+) 完成$/, language === "es" ? "$1 listas" : "$1 Done")
      .replace(/^(\d+) 条$/, language === "es" ? "$1 eventos" : "$1 Items")
      .replace(/^(\d+) 可签$/, language === "es" ? "$1 listos" : "$1 Ready")
      .replace(/^(\d+) 份$/, language === "es" ? "$1 activos" : "$1 Active")
      .replace(/^(\d+) 座$/, language === "es" ? "$1 ciudades" : "$1 Cities")
      .replace(/^(\d+) 份进行中$/, language === "es" ? "$1 activos" : "$1 Active")
      .replace(/^(\d+) 个可签$/, language === "es" ? "$1 firmables" : "$1 Signable")
      .replace(/^(\d+) 轮$/, language === "es" ? "$1 rondas" : "$1 Rounds")
      .replace(/^(\d+) 个项目$/, language === "es" ? "$1 proyectos" : "$1 Projects")
      .replace(/^(\d+) 个报价$/, language === "es" ? "$1 ofertas" : "$1 Offers")
      .replace(/^第 (\d+) 轮$/, language === "es" ? "Ronda $1" : "Round $1");
  }
  if (!translated || translated === trimmed) {
    translated = replaceKnownChineseFragments(trimmed, language);
  }
  if (!translated || translated === trimmed) return text;
  return text.replace(trimmed, translated);
}

function replaceKnownChineseFragments(text, language = currentLanguage()) {
  const phrasePack = dynamicPhraseTranslations[language] || {};
  const namePack = displayNameTranslations[language] || {};
  let next = String(text || "");
  const replacements = [
    ...Object.entries(phrasePack),
    ...Object.entries(namePack),
    ...Object.entries(regionTranslations[language] || {}),
    ...Object.entries(countryTranslations[language] || {}),
  ]
    .filter(([from, to]) => from && to && from.length > 1)
    .sort((a, b) => b[0].length - a[0].length);
  replacements.forEach(([from, to]) => {
    if (next.includes(from)) next = next.split(from).join(to);
  });
  return normalizeLocalizedPunctuation(next);
}

function normalizeLocalizedPunctuation(text) {
  return String(text || "")
    .replace(/：/g, ": ")
    .replace(/，/g, ", ")
    .replace(/。/g, ".")
    .replace(/；/g, "; ")
    .replace(/、/g, " / ")
    .replace(/[“”]/g, "\"")
    .replace(/\.\.+/g, ".")
    .replace(/\s+([.,;:])/g, "$1")
    .replace(/\s{2,}/g, " ");
}

function applyDynamicLanguagePatches() {
  const language = currentLanguage();
  if (language === "zh") return;
  const scopes = [
    boardEl,
    panelTabs,
    document.querySelector(".side-panel"),
    document.querySelector(".action-bar"),
    statusLine,
    currentTileCard,
    cityTicker,
    contractDialog,
    propertyDialog,
    winnerDialog,
    tutorialDialog,
  ].filter(Boolean);
  scopes.forEach((scope) => {
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const next = translateDynamicText(node.nodeValue, language);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
  });
}

render();
window.setTimeout(maybeShowTutorialIntro, 260);

function updateDifficultyHint() {
  if (!difficultyHint || !difficultyInput) return;
  const language = currentLanguage();
  const key = difficultySettings[difficultyInput.value] ? difficultyInput.value : "normal";
  const setting = difficultySettings[key];
  const label = setupSelectLabels[language]?.difficulty?.[key] || setting.label;
  const note = setting.summary?.[language] || setting.summary?.zh || "";
  difficultyHint.textContent = uiTextForLanguage(language, "difficultyHint", label, setting.aiIQ, note);
}

function renderTutorialIntro() {
  if (!tutorialIntroBody) return;
  tutorialIntroEyebrow.textContent = tutorialText("introEyebrow");
  tutorialIntroTitle.textContent = tutorialText("introTitle");
  startTutorialButton.textContent = tutorialText("startTutorial");
  continueWithoutTutorialButton.textContent = tutorialText("skipTutorial");

  tutorialIntroBody.innerHTML = "";
  const lead = document.createElement("p");
  lead.className = "tutorial-intro-lead";
  lead.textContent = tutorialText("introLead");

  const list = document.createElement("ul");
  list.className = "tutorial-intro-list";
  tutorialText("introPoints").forEach((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    list.appendChild(item);
  });

  const guideGrid = document.createElement("div");
  guideGrid.className = "tutorial-intro-grid";
  tutorialButtonGuides.slice(0, 6).forEach((item) => {
    const card = document.createElement("article");
    card.dataset.tone = item.tone;
    const label = document.createElement("strong");
    label.textContent = localizedTutorialValue(item.label);
    const detail = document.createElement("span");
    detail.textContent = localizedTutorialValue(item.detail);
    card.append(label, detail);
    guideGrid.appendChild(card);
  });

  tutorialIntroBody.append(lead, list, guideGrid);
}

function maybeShowTutorialIntro() {
  if (!tutorialDialog || state.config?.tutorialMode || state.gameOver) return;
  const progress = readTutorialProgress();
  if (progress.introSeen || progress.skipped || progress.completed) return;
  renderTutorialIntro();
  if (typeof tutorialDialog.showModal === "function") {
    tutorialDialog.showModal();
  } else {
    tutorialDialog.setAttribute("open", "");
  }
}

function startTutorialGame() {
  const language = currentLanguage();
  const currentHuman = state.players?.[0] || {};
  writeTutorialProgress({
    introSeen: true,
    skipped: false,
    started: true,
    completed: false,
    completedAt: "",
  });
  state = createInitialGame({
    playerName: currentHuman.name || state.config?.playerName || DEFAULT_PLAYER_NAME,
    language,
    playerColor: currentHuman.color || state.config?.playerColor || playerTemplates[0].color,
    playerCount: 4,
    difficulty: "normal",
    character: currentHuman.character || state.config?.character || "banker",
    theme: state.config?.theme || "city",
    rulesPreset: "limited",
    startCash: START_CASH,
    tutorialMode: true,
  });
  state.status = language === "zh"
    ? "教学局开始：AI 固定普通强度。先按“掷骰前进”。"
    : language === "es"
      ? "Tutorial iniciado: IA normal. Primero pulsa Dados."
      : "Tutorial started: AI is locked to normal. Press Roll Dice first.";
  state.tutorial = createTutorialState(true);
  logEvent(language === "zh"
    ? `新手教学局开始，${TUTORIAL_GAME_TURN_LIMIT} 回合限时，AI 普通强度。`
    : language === "es"
      ? `Tutorial iniciado con límite de ${TUTORIAL_GAME_TURN_LIMIT} rondas e IA normal.`
      : `Tutorial game started with a ${TUTORIAL_GAME_TURN_LIMIT}-round limit and normal AI.`);
  if (tutorialDialog.open) tutorialDialog.close();
  render();
}

function dismissTutorialIntro() {
  writeTutorialProgress({ introSeen: true, skipped: true });
  if (tutorialDialog.open) tutorialDialog.close();
}

function completeTutorialIfNeeded(winner) {
  if (!state.config?.tutorialMode || state.tutorial?.completed) return;
  state.tutorial = {
    ...(state.tutorial || createTutorialState(true)),
    active: false,
    introSeen: true,
    completed: true,
  };
  writeTutorialProgress({
    introSeen: true,
    skipped: false,
    started: true,
    completed: true,
    completedAt: new Date().toISOString(),
  });
  const language = currentLanguage();
  logEvent(language === "zh"
    ? `新手教学完成：${winner?.name || "玩家"} 完成了一整局。`
    : language === "es"
      ? `Tutorial completo: ${winner?.name || "Jugador"} terminó una partida.`
      : `Tutorial complete: ${winner?.name || "Player"} finished one game.`);
}

function displayName(name) {
  const language = currentLanguage();
  if (language === "zh") return name;
  return displayNameTranslations[language]?.[name] || name;
}

function spaceDisplayName(indexOrSpace) {
  const space = typeof indexOrSpace === "number" ? spaces[indexOrSpace] : indexOrSpace;
  return displayName(space?.name || "");
}

function regionDisplayName(region) {
  const language = currentLanguage();
  if (language === "zh") return region;
  return regionTranslations[language]?.[region] || region;
}

function countryDisplayName(country) {
  const language = currentLanguage();
  if (language === "zh") return country;
  return countryTranslations[language]?.[country] || country;
}

function citySpecialtyLabel(specialty) {
  const language = currentLanguage();
  if (language !== "zh" && specialtyDisplayLabels[language]?.[specialty]) {
    return specialtyDisplayLabels[language][specialty];
  }
  return citySpecialtyDefinitions[specialty]?.label || uiText("citySkill");
}

function rareBadgeLabel(label) {
  const language = currentLanguage();
  if (language === "zh") return label;
  return rareBadgeTranslations[language]?.[label] || label;
}

function propertyPlaceLabel(space) {
  if (!space.region) return uiText("globalAsset");
  if (currentLanguage() === "zh") return `${space.region} / ${space.country} / ${space.landmark}`;
  return `${regionDisplayName(space.region)} / ${countryDisplayName(space.country)} / ${citySpecialtyLabel(space.specialty)}`;
}

function handleLanguageChange() {
  const language = normalizeLanguage(languageSelect.value);
  state.config = { ...(state.config || {}), language };
  const player = currentPlayer();
  if (player && state.phase === "waiting") {
    state.status = uiTextForLanguage(language, "readyStatus", player.name);
  }
  render();
}

function normalizeLoadedPlayerName(player, index = 0) {
  const name = cleanName(player?.name || playerTemplates[index]?.name || DEFAULT_PLAYER_NAME);
  if (player?.isAI && LEGACY_AI_NAME_MAP[name]) return LEGACY_AI_NAME_MAP[name];
  return name;
}

function createInitialGame(config = {}) {
  const playerCount = Number(config.playerCount || 4);
  const language = normalizeLanguage(config.language || "zh");
  const humanName = cleanName(config.playerName || DEFAULT_PLAYER_NAME);
  const tutorialMode = Boolean(config.tutorialMode);
  const difficulty = tutorialMode ? "normal" : (difficultySettings[config.difficulty] ? config.difficulty : "normal");
  const theme = themeDefinitions[config.theme] ? config.theme : "city";
  const humanCharacter = characterDefinitions[config.character] ? config.character : "banker";
  const rules = normalizeRulesConfig(tutorialMode ? { ...config, rulesPreset: "limited" } : config);
  const humanColor = /^#[0-9a-f]{6}$/i.test(config.playerColor || "") ? config.playerColor : playerTemplates[0].color;
  const aiCharacters = ["builder", "broker", "landlord"];
  const players = playerTemplates.slice(0, playerCount).map((template, index) => ({
    ...template,
    name: index === 0 ? humanName : template.name,
    color: index === 0 ? humanColor : template.color,
    character: index === 0 ? humanCharacter : aiCharacters[(index - 1) % aiCharacters.length],
    cash: rules.startCash + (index === 0 && humanCharacter === "banker" ? characterDefinitions.banker.cashBonus : 0),
    position: 0,
    cards: [],
    stocks: {},
    grudgeTarget: "",
    rentShield: false,
    taxShield: false,
    pauseShield: false,
    rentMirror: false,
    rentSurge: false,
    rentRisk: false,
    forcedRoll: 0,
    skipMove: false,
    skipTurns: 0,
    cardsUsed: 0,
    upgradeCount: 0,
    auctionWins: 0,
    debt: 0,
    finance: createFinanceAccount(),
    insurance: false,
    disasterShield: false,
    activeSkillUsed: false,
    skillXp: 0,
    skillLevel: 1,
    visitedRegions: [],
    ventureUsed: false,
    completedTasks: [],
    contractReputation: 80,
    bankrupt: false,
  }));

  return {
    version: 3,
    round: 1,
    players,
    currentPlayer: 0,
    phase: "waiting",
    pendingPurchase: null,
    auction: null,
    market: createMarketState(rules.rulesPreset === "daily" ? dailyChallengeMarketId() : "steady"),
    lastRoll: null,
    status: uiTextForLanguage(language, "readyStatus", players[0].name),
    gameOver: false,
    winnerDialogDismissed: false,
    owners: Array(spaces.length).fill(null),
    levels: Array(spaces.length).fill(0),
    mortgages: Array(spaces.length).fill(false),
    deck: shuffle(chanceCards.map((_, index) => index)),
    deckIndex: 0,
    log: [{ text: rules.rulesPreset === "daily" ? `每日挑战开始：${marketDefinitions[dailyChallengeMarketId()].title}。` : uiTextForLanguage(language, "gameStarted"), round: 1 }],
    liquidations: [],
    cityRevenue: Array(spaces.length).fill(0),
    cityPeakRevenue: Array(spaces.length).fill(0),
    cityFunding: Array(spaces.length).fill(0),
	    dealLedger: [],
	    coopContracts: [],
	    coopProposals: [],
	    lastCoopProposalRound: 0,
	    bankLedger: [],
    ecoLevels: Array(spaces.length).fill(0),
    cityCompanies: Array.from({ length: spaces.length }, createCityCompanyState),
    cityPublic: Array(spaces.length).fill(false),
    cityCollection: [],
    goals: createGameGoals(),
    mission: createRouteMission(1, players[0]),
    missionHistory: [],
    quarterlyReports: [],
    newsFeed: createInitialNewsFeed(),
    headquarters: {},
    stockSnapshots: Array(spaces.length).fill(0),
    stockTrends: Array(spaces.length).fill(0),
    negotiation: null,
    tutorial: createTutorialState(tutorialMode),
    highestRent: null,
    pathHighlight: null,
    tileFlash: null,
    drawerOpen: createDefaultDrawerOpen(),
    sidePanelMode: "deal",
    sidePanelCollapsed: false,
    mapZoom: 1,
    worldPanelMode: "atlas",
    selectedPropertyIndex: null,
    config: { playerCount, playerName: humanName, playerColor: humanColor, difficulty, character: humanCharacter, theme, language, tutorialMode, ...rules },
  };
}

function loadGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (
      saved.version !== 3 ||
      !Array.isArray(saved.players) ||
      saved.players.length < 2 ||
      !Array.isArray(saved.owners) ||
      saved.owners.length !== spaces.length ||
      !Array.isArray(saved.levels) ||
      saved.levels.length !== spaces.length ||
      !Array.isArray(saved.deck)
    ) {
      return null;
    }
    if (saved.phase === "moving") saved.phase = "ending";
    saved.diceRolling = false;
    saved.deckIndex = Math.max(0, Number(saved.deckIndex) || 0);
    saved.deck = saved.deck.filter((index) => Number.isInteger(index) && chanceCards[index]);
    if (saved.deck.length < chanceCards.length || saved.deckIndex > saved.deck.length) {
      saved.deck = shuffle(chanceCards.map((_, index) => index));
      saved.deckIndex = 0;
    }
    saved.players.forEach((player, index) => {
      player.name = normalizeLoadedPlayerName(player, index);
      player.aiStyle = player.isAI && aiStyleDefinitions[player.aiStyle] ? player.aiStyle : playerTemplates[index]?.aiStyle || "";
      player.character = characterDefinitions[player.character] ? player.character : (player.isAI ? "builder" : "banker");
      player.cash = Number(player.cash) || 0;
      player.position = clamp(Number(player.position) || 0, 0, spaces.length - 1);
      player.cards = Array.isArray(player.cards) ? player.cards.filter((cardId) => handCardDefinitions[cardId]) : [];
      player.stocks = normalizeStocks(player.stocks);
      player.grudgeTarget = typeof player.grudgeTarget === "string" ? player.grudgeTarget : "";
      player.rentShield = Boolean(player.rentShield);
      player.taxShield = Boolean(player.taxShield);
      player.pauseShield = Boolean(player.pauseShield);
      player.rentMirror = Boolean(player.rentMirror);
      player.rentSurge = Boolean(player.rentSurge);
      player.rentRisk = Boolean(player.rentRisk);
      player.forcedRoll = Number(player.forcedRoll) || 0;
      player.skipMove = Boolean(player.skipMove);
      player.skipTurns = Number(player.skipTurns) || 0;
      player.cardsUsed = Number(player.cardsUsed) || 0;
      player.upgradeCount = Number(player.upgradeCount) || 0;
      player.auctionWins = Math.max(0, Number(player.auctionWins) || 0);
      player.debt = Math.max(0, Number(player.debt) || 0);
      player.finance = normalizeFinanceAccount(player.finance);
      player.insurance = Boolean(player.insurance);
      player.disasterShield = Boolean(player.disasterShield);
      player.activeSkillUsed = Boolean(player.activeSkillUsed);
      player.skillXp = Math.max(0, Number(player.skillXp) || 0);
      player.skillLevel = clamp(Number(player.skillLevel) || 1, 1, CHARACTER_MAX_LEVEL);
      player.visitedRegions = Array.isArray(player.visitedRegions) ? player.visitedRegions.filter(Boolean) : [];
      player.ventureUsed = Boolean(player.ventureUsed);
      player.completedTasks = Array.isArray(player.completedTasks) ? player.completedTasks : [];
      player.contractReputation = clamp(Number(player.contractReputation) || 80, 0, 100);
      player.bankrupt = Boolean(player.bankrupt);
    });
    const savedTutorialMode = Boolean(saved.config?.tutorialMode);
    const rules = normalizeRulesConfig(savedTutorialMode ? { ...(saved.config || {}), rulesPreset: "limited" } : (saved.config || {}));
    saved.config = {
      playerCount: saved.players.length,
      playerName: saved.players[0]?.name || DEFAULT_PLAYER_NAME,
      playerColor: /^#[0-9a-f]{6}$/i.test(saved.config?.playerColor || "") ? saved.config.playerColor : saved.players[0]?.color || playerTemplates[0].color,
      difficulty: savedTutorialMode ? "normal" : (difficultySettings[saved.config?.difficulty] ? saved.config.difficulty : "normal"),
      character: characterDefinitions[saved.config?.character] ? saved.config.character : saved.players[0]?.character || "banker",
      theme: themeDefinitions[saved.config?.theme] ? saved.config.theme : "city",
      language: normalizeLanguage(saved.config?.language || "zh"),
      tutorialMode: savedTutorialMode,
      ...rules,
    };
    saved.mortgages = Array.isArray(saved.mortgages) && saved.mortgages.length === spaces.length
      ? saved.mortgages.map(Boolean)
      : Array(spaces.length).fill(false);
    saved.cityRevenue = Array.isArray(saved.cityRevenue) && saved.cityRevenue.length === spaces.length
      ? saved.cityRevenue.map((value) => Math.max(0, Number(value) || 0))
      : Array(spaces.length).fill(0);
    saved.cityPeakRevenue = Array.isArray(saved.cityPeakRevenue) && saved.cityPeakRevenue.length === spaces.length
      ? saved.cityPeakRevenue.map((value) => Math.max(0, Number(value) || 0))
      : [...saved.cityRevenue];
    saved.cityFunding = Array.isArray(saved.cityFunding) && saved.cityFunding.length === spaces.length
      ? saved.cityFunding.map((value) => clamp(Number(value) || 0, 0, CAPITAL_ROUND_LIMIT))
      : Array(spaces.length).fill(0);
	    saved.dealLedger = Array.isArray(saved.dealLedger)
	      ? saved.dealLedger
	          .map(normalizeDealLedgerItem)
	          .filter(Boolean)
	          .slice(0, DEAL_LEDGER_LIMIT)
	      : [];
	    saved.coopContracts = normalizeCoopContracts(saved.coopContracts);
	    saved.coopProposals = normalizeCoopProposals(saved.coopProposals);
	    saved.lastCoopProposalRound = Math.max(0, Number(saved.lastCoopProposalRound) || 0);
	    saved.bankLedger = Array.isArray(saved.bankLedger)
      ? saved.bankLedger
          .map(normalizeBankLedgerItem)
          .filter(Boolean)
          .slice(0, BANK_LEDGER_LIMIT)
      : [];
    saved.ecoLevels = Array.isArray(saved.ecoLevels) && saved.ecoLevels.length === spaces.length
      ? saved.ecoLevels.map((value) => clamp(Number(value) || 0, 0, 3))
      : Array(spaces.length).fill(0);
    saved.cityCompanies = normalizeCityCompanies(saved.cityCompanies);
    saved.cityPublic = normalizeBooleanArray(saved.cityPublic, spaces.length);
    saved.cityCollection = normalizeCityCollection(saved.cityCollection, saved.owners);
    saved.goals = normalizeGoals(saved.goals);
    saved.mission = normalizeMission(saved.mission) || createRouteMission(saved.round || 1, saved.players[0], missionSnapshotForPlayer(saved.players[0], saved));
    saved.missionHistory = Array.isArray(saved.missionHistory)
      ? saved.missionHistory.map(normalizeMissionHistoryItem).filter(Boolean).slice(0, 6)
      : [];
    saved.quarterlyReports = Array.isArray(saved.quarterlyReports)
      ? saved.quarterlyReports.map(normalizeQuarterlyReport).filter(Boolean).slice(0, QUARTERLY_REPORT_LIMIT)
      : [];
    saved.newsFeed = Array.isArray(saved.newsFeed)
      ? saved.newsFeed.map(normalizeNewsItem).filter(Boolean).slice(0, NEWS_FEED_LIMIT)
      : createInitialNewsFeed();
    saved.headquarters = normalizeHeadquarters(saved.headquarters);
    saved.stockSnapshots = normalizeNumberArray(saved.stockSnapshots, spaces.length, 0);
    saved.stockTrends = normalizeNumberArray(saved.stockTrends, spaces.length, 0);
    saved.negotiation = normalizeNegotiation(saved.negotiation);
    saved.tutorial = normalizeTutorialState(saved.tutorial, savedTutorialMode);
    saved.highestRent = normalizeHighestRent(saved.highestRent);
    saved.pathHighlight = Number.isInteger(saved.pathHighlight) ? saved.pathHighlight : null;
    saved.tileFlash = normalizeTileFlash(saved.tileFlash);
    saved.drawerOpen = normalizeDrawerOpen(saved.drawerOpen);
    saved.sidePanelMode = SIDE_PANEL_MODES.includes(saved.sidePanelMode) ? saved.sidePanelMode : "deal";
    saved.sidePanelCollapsed = Boolean(saved.sidePanelCollapsed);
    saved.mapZoom = clamp(Number(saved.mapZoom) || 1, 0.75, 1.8);
    saved.worldPanelMode = ["atlas", "stocks", "business", "rules", "records"].includes(saved.worldPanelMode) ? saved.worldPanelMode : "atlas";
    saved.selectedPropertyIndex = Number.isInteger(saved.selectedPropertyIndex) ? saved.selectedPropertyIndex : null;
    saved.market = normalizeMarket(saved.market);
    saved.liquidations = Array.isArray(saved.liquidations) ? saved.liquidations.slice(0, 8) : [];
    saved.auction = normalizeAuction(saved.auction);
    if (!["waiting", "moving", "decision", "auction", "shop", "ending", "gameOver"].includes(saved.phase)) {
      saved.phase = "waiting";
    }
    if (saved.phase === "auction" && !saved.auction) saved.phase = "ending";
    if (saved.phase === "shop" && saved.players[saved.currentPlayer]?.isAI) saved.phase = "ending";
    saved.winnerDialogDismissed = Boolean(saved.winnerDialogDismissed);
    saved.shareCodePreview = "";
    return saved;
  } catch {
    return null;
  }
}

function saveGame() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The game keeps running even if browser storage is unavailable.
  }
}

function render() {
  document.body.dataset.theme = state.config?.theme || "city";
  renderStaticLabels();
  renderPanelTabs();
  renderBoard();
  renderPlayers();
  renderCards();
  renderAuction();
  renderShop();
  renderSaveSlots();
  renderTrade();
  renderCoop();
  renderProgress();
  renderWorldPanel();
  renderShare();
  renderAssets();
  renderCurrentTile();
  renderCityTicker();
  renderWorldMap();
  renderDice();
  renderControls();
  renderSidePanelVisibility();
  applyTutorialRewards();
  renderTutorialPanel();
  updateMusicButton();
  renderLog();
  roundCounter.textContent = uiText("round", state.round);
  statusLine.textContent = state.status;
  applyDynamicLanguagePatches();
  saveGame();
  scheduleAutomation();
  renderWinnerDialog();
}

function renderBoard() {
  boardEl.querySelectorAll(".tile").forEach((tile) => tile.remove());

  spaces.forEach((space, index) => {
    const tile = document.createElement("article");
    const position = boardGridPosition(index);
    const owner = playerById(state.owners[index]);
    const tokens = state.players.filter((player) => !player.bankrupt && player.position === index);
    const classes = ["tile"];
    if (owner) classes.push("is-owned");
    if (owner && space.kind === "street" && ownsFullStreetGroup(owner.id, space.group)) classes.push("set-complete");
    if (canBuildOn(index)) classes.push("is-buildable");
    if (state.levels[index] >= MAX_LEVEL) classes.push("is-landmark");
    if (state.mortgages[index]) classes.push("is-mortgaged");
    if (tokens.length > 0) classes.push("has-tokens");
    if (state.pathHighlight === index) classes.push("is-path-highlight");
    if (state.tileFlash?.index === index && state.tileFlash.until > Date.now()) classes.push(`tile-flash-${state.tileFlash.type}`);
    if (state.pendingPurchase === index) classes.push("is-buyable");
    if (currentPlayer()?.position === index) classes.push("is-current");

    tile.className = classes.join(" ");
    tile.dataset.type = space.type;
    tile.dataset.index = String(index);
    tile.dataset.level = String(state.levels[index] || 0);
    tile.style.gridColumn = String(position.col);
    tile.style.gridRow = String(position.row);
    tile.style.setProperty("--tile-color", space.color || tileAccentColor(space.type));

    const main = document.createElement("div");
    main.className = "tile-main";
    main.appendChild(createIcon(space.icon || "home", "tile-icon"));

    const name = document.createElement("div");
    name.className = "tile-name";
    name.textContent = spaceDisplayName(space);
    main.appendChild(name);

    const meta = document.createElement("div");
    meta.className = "tile-meta";
    meta.textContent = tileMeta(space, index);
    main.appendChild(meta);

    const footer = document.createElement("div");
    footer.className = "tile-footer";
    const ownerMark = document.createElement("span");
    ownerMark.className = "owner-mark";
    if (owner) {
      ownerMark.style.setProperty("--owner-color", owner.color);
      ownerMark.textContent = initials(owner.name);
      ownerMark.title = `${owner.name} 持有`;
    }
    footer.appendChild(ownerMark);
    footer.appendChild(renderLevelPips(index));

    const tokenStack = document.createElement("div");
    tokenStack.className = "token-stack";
    tokens.forEach((player) => {
      const token = document.createElement("span");
      token.className = state.phase === "moving" && currentPlayer()?.id === player.id ? "player-token is-moving-token" : "player-token";
      token.style.setProperty("--player-color", player.color);
      token.textContent = initials(player.name);
      token.title = player.name;
      tokenStack.appendChild(token);
    });

    tile.append(main, footer, tokenStack);
    boardEl.appendChild(tile);
  });
}

function renderPlayers() {
  playersPanel.innerHTML = "";
  const current = currentPlayer();
  const richestWorth = Math.max(...state.players.map((player) => netWorth(player)), 1);

  state.players.forEach((player) => {
    const row = document.createElement("article");
    const rowClasses = ["player-row"];
    if (current && current.id === player.id) rowClasses.push("active");
    if (player.bankrupt) rowClasses.push("bankrupt");
    row.className = rowClasses.join(" ");
    row.style.setProperty("--player-color", player.color);
    row.style.setProperty("--worth", `${Math.round((netWorth(player) / richestWorth) * 100)}%`);

    const avatar = document.createElement("span");
    avatar.className = "player-avatar";
    avatar.textContent = initials(player.name);

    const copy = document.createElement("div");
    const name = document.createElement("div");
    name.className = "player-name";
    const dot = document.createElement("span");
    dot.className = "turn-dot";
	    const label = document.createElement("span");
	    label.textContent = player.bankrupt ? `${player.name} 已破产` : player.name;
	    name.append(dot, label);
	    if (player.isAI && !player.bankrupt) {
	      const mood = document.createElement("em");
	      mood.className = "ai-mood";
	      mood.textContent = aiMoodFor(player);
	      name.appendChild(mood);
	    }

    const stats = document.createElement("div");
    stats.className = "player-stats";
    stats.append(
      createStat("现金", formatMoney(player.cash), "cash"),
      createStat("资产", formatMoney(netWorth(player) - player.cash)),
      createStat("角色", characterDefinitions[player.character]?.title || "玩家"),
      createStat("技能", `Lv.${characterLevel(player)} ${player.skillXp || 0}/${skillXpTarget(player)}`),
      ...(player.isAI ? [createStat("AI智商", aiDifficulty().aiIQ)] : []),
      ...(player.isAI ? [createStat("性格", aiStyleDefinitions[player.aiStyle]?.label || "均衡型")] : []),
      createStat("银行卡", bankCardTier(player).label),
      createStat("风险", riskLabel(riskIndex(player).score)),
      createStat("卡片", `${player.cards.length}张`),
      createStat("称号", playerTitle(player)),
      ...(hasBlackCard(player) ? [createStat("黑卡", "已解锁")] : []),
      ...(player.debt ? [createStat("贷款", formatMoney(player.debt))] : []),
      ...(player.insurance ? [createStat("保险", "已启用")] : []),
      ...(player.disasterShield ? [createStat("灾保", "已启用")] : []),
      ...(player.rentShield ? [createStat("免租", "已启用")] : []),
      ...(player.taxShield ? [createStat("免税", "已启用")] : []),
      ...(player.pauseShield ? [createStat("免停", "已启用")] : []),
      ...(player.rentMirror ? [createStat("反弹", "已启用")] : []),
      ...(player.rentSurge ? [createStat("租金强化", "待触发")] : []),
      createStat("位置", spaceDisplayName(player.position)),
    );

    const meter = document.createElement("span");
    meter.className = "player-meter";

    copy.append(name, stats, meter);

    const worth = document.createElement("strong");
    worth.className = "cash";
    worth.textContent = formatMoney(netWorth(player));
    worth.title = "总身价";
    row.append(avatar, copy, worth);
    playersPanel.appendChild(row);
  });
}

function activeSidePanelMode() {
  if (state.phase === "auction" || state.phase === "shop") return "deal";
  return SIDE_PANEL_MODES.includes(state.sidePanelMode) ? state.sidePanelMode : "deal";
}

function shouldPreferContractsView() {
  try {
    return new URLSearchParams(window.location.search).get("view-contracts") === "always";
  } catch {
    return false;
  }
}

function renderPanelTabs() {
  if (!panelTabs) return;
  const mode = activeSidePanelMode();
  const forcedOpen = state.phase === "auction" || state.phase === "shop";
  const drawers = sidePanelDrawerDefinitions();
  panelTabs.dataset.syncing = "true";
  panelTabs.innerHTML = "";

  drawers.forEach((drawerConfig) => {
    const drawer = document.createElement("details");
    drawer.className = "side-category-drawer";
    drawer.dataset.panelMode = drawerConfig.id;
    drawer.open = forcedOpen ? drawerConfig.id === mode : (!state.sidePanelCollapsed && drawerConfig.id === mode);

    const summary = document.createElement("summary");
    const label = document.createElement("span");
    label.className = "side-category-label";
    label.appendChild(createIcon(drawerConfig.icon, "side-category-icon"));
    const copy = document.createElement("span");
    const strong = document.createElement("strong");
    strong.textContent = drawerConfig.label;
    const small = document.createElement("small");
    small.textContent = drawerConfig.detail;
    copy.append(strong, small);
    label.appendChild(copy);

    const meta = document.createElement("em");
    meta.textContent = drawerConfig.meta();
    summary.append(label, meta);

    const body = document.createElement("div");
    body.className = "side-category-body";
    drawerConfig.panels().forEach((panel) => {
      if (panel) body.appendChild(panel);
    });

    drawer.append(summary, body);
    panelTabs.appendChild(drawer);
  });

  panelTabs.dataset.syncing = "false";
}

function sidePanelDrawerDefinitions() {
  const current = currentPlayer();
  const ownedCount = current ? ownedPropertyIndexes(current.id).length : 0;
  return [
    {
      id: "deal",
      label: uiText("sideDeal"),
      detail: uiText("sideDealDetail"),
      icon: "chart",
      meta: () => state.phase === "auction" ? uiText("sideDealAuction") : state.phase === "shop" ? uiText("sideDealShop") : uiText("sideDealMarket"),
      panels: () => [tradePanel, auctionPanel, shopPanel],
    },
    {
      id: "coop",
      label: uiText("sideCoop"),
      detail: uiText("sideCoopDetail"),
      icon: "shield",
      meta: () => {
        const player = humanPlayer() || current;
        if (!player) return uiText("sideCoop");
        const summary = contractHubSummary(player);
        if (summary.signable) return uiText("sideCoopSignable", summary.signable);
        if (summary.active) return uiText("sideCoopActive", summary.active);
        return uiText("sideCoop");
      },
      panels: () => [coopPanel],
    },
    {
      id: "player",
      label: uiText("sidePlayer"),
      detail: uiText("sidePlayerDetail"),
      icon: "card",
      meta: () => current ? uiText("sidePlayerCards", current.cards.length) : uiText("none"),
      panels: () => [playersPanel, cardsPanel, assetsPanel],
    },
    {
      id: "world",
      label: uiText("sideWorld"),
      detail: uiText("sideWorldDetail"),
      icon: "map",
      meta: () => `${state.cityCollection?.length || 0}/100`,
      panels: () => [worldPanel],
    },
    {
      id: "goals",
      label: uiText("sideGoals"),
      detail: uiText("sideGoalsDetail"),
      icon: "trophy",
      meta: () => uiText("sideGoalsDone", current?.completedTasks?.length || 0),
      panels: () => [progressPanel, savePanel, sharePanel],
    },
    {
      id: "log",
      label: uiText("sideLog"),
      detail: uiText("sideLogDetail"),
      icon: "news",
      meta: () => uiText("sideLogCount", state.log?.length || 0),
      panels: () => [logPanel],
    },
  ];
}

function renderSidePanelVisibility() {
  const mode = activeSidePanelMode();
  const collapsed = Boolean(state.sidePanelCollapsed && state.phase !== "auction" && state.phase !== "shop");
  const groups = {
    deal: [tradePanel, auctionPanel, shopPanel],
    coop: [coopPanel],
    player: [playersPanel, cardsPanel, assetsPanel],
    world: [worldPanel],
    goals: [progressPanel, savePanel, sharePanel],
    log: [logPanel],
  };

  Object.entries(groups).forEach(([group, panels]) => {
    panels.forEach((panel) => {
      if (panel) panel.hidden = collapsed || group !== mode;
    });
  });
}

function handlePanelDrawerClick(event) {
  const summary = event.target.closest(".side-category-drawer > summary");
  if (!summary) return;
  event.preventDefault();
  const drawer = summary.parentElement;
  const mode = SIDE_PANEL_MODES.includes(drawer.dataset.panelMode) ? drawer.dataset.panelMode : "deal";

  if (drawer.open && state.sidePanelMode === mode && !state.sidePanelCollapsed) {
    state.sidePanelMode = mode;
    state.sidePanelCollapsed = true;
  } else {
    state.sidePanelMode = mode;
    state.sidePanelCollapsed = false;
  }
  render();
}

function renderCards() {
  cardsPanel.innerHTML = "";
  const current = currentPlayer();

  if (!current || current.bankrupt) {
    appendPanelDrawer(cardsPanel, "panel:cards", "卡片 / 银行", [emptyNote("暂无可显示卡片。")], {
      icon: "card",
      meta: "不可用",
    });
    return;
  }

  const drawerChildren = [];
  const statusRow = document.createElement("div");
  statusRow.className = "card-status-row";

  const deckPill = document.createElement("span");
  deckPill.className = "card-pill";
  deckPill.append(createIcon("card", "card-pill-icon"), document.createTextNode(`牌堆 ${chanceCards.length - state.deckIndex}/${chanceCards.length}`));
  statusRow.appendChild(deckPill);

  const handPill = document.createElement("span");
  handPill.className = "card-pill";
  handPill.append(createIcon("spark", "card-pill-icon"), document.createTextNode(`手牌 ${current.cards.length}/${MAX_HAND_CARDS}`));
  statusRow.appendChild(handPill);

  if (current.rentShield) {
    const shieldPill = document.createElement("span");
    shieldPill.className = "card-pill card-pill-active";
    shieldPill.append(createIcon("shield", "card-pill-icon"), document.createTextNode("免租已启用"));
    statusRow.appendChild(shieldPill);
  }

  drawerChildren.push(statusRow);
  drawerChildren.push(createUiDrawer("panel:bank", "银行卡 / 融资", [renderBankCard(current)], {
    variant: "nested",
    icon: "coin",
    meta: `${bankCardTier(current).label} / ${riskLabel(riskIndex(current).score)}`,
  }));

  if (!current.isAI) {
    const actionRow = document.createElement("div");
    actionRow.className = "player-action-row";
    const skillButton = document.createElement("button");
    skillButton.type = "button";
    skillButton.dataset.playerAction = "skill";
    skillButton.textContent = characterSkillLabel(current);
    skillButton.disabled = !canUseCharacterSkill(current);
    actionRow.append(skillButton);
    drawerChildren.push(createUiDrawer("panel:skill", "角色技能", [actionRow], {
      variant: "nested",
      icon: "spark",
      meta: `Lv.${characterLevel(current)}`,
    }));
  }

  if (current.cards.length === 0) {
    drawerChildren.push(createUiDrawer("panel:hand", "手牌道具", [emptyNote("踩到机会格可能抽到可使用的道具卡。")], {
      variant: "nested",
      icon: "card",
      meta: `0/${MAX_HAND_CARDS}`,
    }));
    appendPanelDrawer(cardsPanel, "panel:cards", `${current.name} 的卡片`, drawerChildren, {
      icon: "card",
      meta: `${current.cards.length}/${MAX_HAND_CARDS} 张`,
    });
    return;
  }

  const list = document.createElement("div");
  list.className = "hand-card-list";
  current.cards.forEach((cardId, index) => {
    const card = handCardDefinitions[cardId];
    if (!card) return;

    const item = document.createElement("article");
    item.className = `hand-card hand-card-${card.tone || "gain"} rarity-${card.rarity || "common"}`;

    const iconWrap = document.createElement("span");
    iconWrap.className = "hand-card-icon";
    iconWrap.appendChild(createIcon(card.icon || "card", "hand-card-svg"));

    const copy = document.createElement("div");
    copy.className = "hand-card-copy";
    const category = document.createElement("span");
    category.textContent = `${card.category} / ${rarityLabel(card.rarity)}`;
    const name = document.createElement("strong");
    name.textContent = card.title;
    const description = document.createElement("p");
    description.textContent = card.description;
    copy.append(category, name, description);

    const action = document.createElement("button");
    action.type = "button";
    action.dataset.cardIndex = String(index);
    action.textContent = cardUseLabel(current, cardId);
    action.disabled = !canUseCard(current, cardId);

    item.append(iconWrap, copy, action);
    list.appendChild(item);
  });
  drawerChildren.push(createUiDrawer("panel:hand", "手牌道具", [list], {
    variant: "nested",
    icon: "card",
    meta: `${current.cards.length}/${MAX_HAND_CARDS}`,
  }));
  appendPanelDrawer(cardsPanel, "panel:cards", `${current.name} 的卡片`, drawerChildren, {
    icon: "card",
    meta: `${current.cards.length}/${MAX_HAND_CARDS} 张`,
  });
}

function renderBankCard(player) {
  const tier = bankCardTier(player);
  const card = document.createElement("article");
  card.className = `bank-card bank-${tier.id}`;
  card.style.setProperty("--bank-color", tier.color);

  const top = document.createElement("div");
  top.className = "bank-card-top";
  const label = document.createElement("span");
  label.textContent = "银行卡";
  const name = document.createElement("strong");
  name.textContent = `${tier.label} / ${riskLabel(riskIndex(player).score)}`;
  top.append(label, name);

  const stats = document.createElement("div");
  stats.className = "bank-card-stats";
  stats.append(
    createGameStat("信用额度", formatMoney(availableCredit(player))),
    createGameStat("贷款利率", `${Math.round(bankLoanInterestRate(player) * 1000) / 10}%`),
    createGameStat("杠杆倍数", `${currentLeverageMultiple(player).toFixed(1)}x/${maxLeverageMultiple(player).toFixed(1)}x`),
    createGameStat("借空额度", formatMoney(shortBorrowCapacity(player))),
    createGameStat("本轮存息", formatMoney(bankDepositInterestFor(player))),
    createGameStat("当前债务", player.debt ? formatMoney(player.debt) : "无"),
  );

  const exposure = document.createElement("div");
  exposure.className = "finance-exposure";
  [
    ["杠杆融资", formatMoney(financeFor(player).marginDebt)],
    ["可转债", formatMoney(financeFor(player).convertibleDebt)],
    ["债券", formatMoney(financeFor(player).bondDebt)],
    ["股权稀释", `${Math.round(financeFor(player).equityDilution * 100)}%`],
    ["做空负债", formatMoney(totalShortLiability(player))],
    ["融资利息", `${Math.round(weightedFinancingRate(player) * 1000) / 10}%`],
  ].forEach(([labelText, valueText]) => {
    const item = document.createElement("span");
    item.innerHTML = `<small>${labelText}</small><strong>${valueText}</strong>`;
    exposure.appendChild(item);
  });

  const risk = riskIndex(player);
  const riskAlert = document.createElement("p");
  riskAlert.className = `risk-alert risk-alert-${risk.tone}`;
  riskAlert.textContent = risk.score >= 70
    ? "高风险：建议还款、卖股、抵押低收益城市，或用股权融资降低债务。"
    : risk.score >= 42
      ? "中等风险：保留现金垫，避免继续加杠杆。"
      : "信用健康：可考虑建设公司、升级城市或布局股票。";

  const actions = document.createElement("div");
  actions.className = "bank-card-actions";
  if (!player.isAI) {
    const loanButton = document.createElement("button");
    loanButton.type = "button";
    loanButton.dataset.playerAction = "loan";
    loanButton.textContent = `贷款 ${formatMoney(LOAN_AMOUNT)}`;
    loanButton.disabled = !canTakeLoan(player);
    loanButton.title = loanButton.disabled ? bankActionReason("loan", player) : "使用银行卡信用额度";

    const repayButton = document.createElement("button");
    repayButton.type = "button";
    repayButton.dataset.playerAction = "repay";
    repayButton.textContent = player.debt ? `还款 ${formatMoney(Math.min(player.debt, LOAN_REPAY_AMOUNT))}` : "无贷款";
    repayButton.disabled = !canRepayLoan(player);
    repayButton.title = repayButton.disabled ? bankActionReason("repay", player) : "降低债务和风险";
    actions.append(loanButton, repayButton);
  }

  const ledger = document.createElement("div");
  ledger.className = "bank-ledger";
  (state.bankLedger || []).slice(0, 3).forEach((entry) => {
    const item = document.createElement("span");
    item.className = `bank-ledger-item bank-ledger-${entry.tone}`;
    item.textContent = `${entry.title} ${formatMoney(entry.amount)}`;
    ledger.appendChild(item);
  });

  card.append(top, stats, exposure, riskAlert);
  if (actions.children.length) card.appendChild(actions);
  if (ledger.children.length) card.appendChild(ledger);
  return card;
}

function renderGameGoals(player) {
  const wrap = document.createElement("div");
  wrap.className = "goal-panel";
  const title = document.createElement("div");
  title.className = "trade-subtitle";
  title.textContent = "本局目标";
  wrap.appendChild(title);

  normalizeGoals(state.goals).forEach((goal) => {
    const progress = goalProgress(goal, player);
    const item = document.createElement("article");
    item.className = goal.completedBy?.includes(player?.id) ? "goal-item goal-complete" : "goal-item";
    const head = document.createElement("div");
    head.className = "goal-head";
    const name = document.createElement("strong");
    name.textContent = goal.title;
    const detail = document.createElement("span");
    detail.textContent = `${progress.label} / 奖励 ${formatMoney(goal.reward)}`;
    head.append(name, detail);
    item.append(head, createProgressMeter(progress.percent));
    wrap.appendChild(item);
  });
  return wrap;
}

function renderRouteMission(player) {
  const mission = normalizeMission(state.mission) || createRouteMission(state.round, player, missionSnapshotForPlayer(player));
  state.mission = mission;
  const progress = missionProgress(mission, player);
  const card = document.createElement("article");
  card.className = mission.completed ? "route-mission mission-complete" : "route-mission";
  const top = document.createElement("div");
  top.className = "route-mission-top";
  const title = document.createElement("strong");
  title.textContent = "任务路线";
  const round = document.createElement("span");
  round.textContent = `第 ${mission.startRound}-${mission.expiresRound} 轮`;
  top.append(title, round);
  const name = document.createElement("p");
  name.textContent = mission.title;
  const detail = document.createElement("small");
  detail.textContent = `${progress.label} / 奖励 ${missionRewardText(mission)}`;
  card.append(top, name, createProgressMeter(progress.percent), detail);
  return card;
}

function renderLatestQuarterlyReport() {
  const report = state.quarterlyReports?.[0];
  if (!report) return emptyNote("第 5 轮会出现第一份季度商业报表。");
  const card = document.createElement("article");
  card.className = "quarterly-report";
  const title = document.createElement("strong");
  title.textContent = `季度结算 / 第 ${report.round} 轮`;
  const detail = document.createElement("span");
  detail.textContent = `最富：${report.richest} / 最强城市：${report.topCity} / 指数 ${report.marketIndex}`;
  card.append(title, detail);
  return card;
}

function renderNegotiationPanel(player) {
  const deal = normalizeNegotiation(state.negotiation);
  if (!deal || deal.buyerId !== player.id) return null;
  const seller = playerById(deal.sellerId);
  if (!seller || state.owners[deal.propertyIndex] !== seller.id) {
    state.negotiation = null;
    return null;
  }
  const card = document.createElement("article");
  card.className = "trade-negotiation";
  const copy = document.createElement("div");
  copy.className = "trade-copy";
  const name = document.createElement("strong");
  name.textContent = `谈判：${spaceDisplayName(deal.propertyIndex)}`;
  const detail = document.createElement("span");
  detail.textContent = `${seller.name} 反报价 ${formatMoney(deal.askPrice)}，你的报价 ${formatMoney(deal.offerPrice)}，剩 ${deal.roundsLeft} 次还价。`;
  copy.append(name, detail);
  const actions = document.createElement("div");
  actions.className = "negotiation-actions";
  [
    ["counter", "加价还价"],
    ["accept", `接受 ${formatMoney(deal.askPrice)}`],
    ["cancel", "取消"],
  ].forEach(([action, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.negotiationAction = action;
    button.textContent = label;
    if (action === "accept") button.disabled = player.cash < deal.askPrice;
    if (action === "counter") button.disabled = deal.roundsLeft <= 0 || player.cash < nextNegotiationOffer(deal);
    actions.appendChild(button);
  });
  card.append(copy, actions);
  return card;
}

function renderBusinessIntelPanel() {
  const panel = document.createElement("div");
  panel.className = "business-intel-panel";

  const news = document.createElement("div");
  news.className = "news-board";
  const newsTitle = document.createElement("div");
  newsTitle.className = "trade-subtitle";
  newsTitle.textContent = "商业新闻头条";
  news.appendChild(newsTitle);
  (state.newsFeed || []).slice(0, 5).forEach((item) => {
    const row = document.createElement("article");
    row.className = `news-item news-${item.tone || "market"}`;
    row.innerHTML = `<strong>${item.title}</strong><span>${item.detail}</span>`;
    news.appendChild(row);
  });
  if (news.children.length === 1) news.appendChild(emptyNote("市场新闻会随回合和交易出现。"));

  const risk = document.createElement("div");
  risk.className = "risk-board";
  const riskTitle = document.createElement("div");
  riskTitle.className = "trade-subtitle";
  riskTitle.textContent = "风险指数 / 资产排行榜";
  risk.appendChild(riskTitle);
  [...activePlayers()].sort((a, b) => netWorth(b) - netWorth(a)).forEach((player) => {
    const index = riskIndex(player);
    const item = document.createElement("article");
    item.className = `risk-item risk-${index.tone}`;
    item.append(
      createGameStat(player.name, `${formatMoney(netWorth(player))} / ${playerTitle(player)}`),
      createGameStat("风险", `${index.score} ${riskLabel(index.score)}`),
    );
    risk.appendChild(item);
  });

  const strategy = document.createElement("div");
  strategy.className = "strategy-board";
  const player = currentPlayer() || state.players[0];
  strategy.append(
    createGameStat("胜利条件", victoryConditionLabel()),
    createGameStat("金融危机倒计时", crisisCountdownLabel()),
    createGameStat("航线收益", formatMoney(routeDividendFor(player))),
    createGameStat("城市组合", cityCombinationLabel(player)),
    createGameStat("杠杆倍数", `${currentLeverageMultiple(player).toFixed(1)}x/${maxLeverageMultiple(player).toFixed(1)}x`),
    createGameStat("做空负债", formatMoney(totalShortLiability(player))),
    createGameStat("融资利率", `${Math.round(weightedFinancingRate(player) * 1000) / 10}%`),
    createGameStat("股权稀释", `${Math.round(financeFor(player).equityDilution * 100)}%`),
  );

  panel.append(news, risk, strategy);
  return panel;
}

function renderRecommendationCard(player) {
  const plan = nextActionPlan(player);
  const card = document.createElement("article");
  card.className = `recommendation-card recommendation-${plan.tone}`;

  const head = document.createElement("div");
  head.className = "recommendation-head";
  const title = document.createElement("strong");
  title.textContent = "下一步推荐";
  const tag = document.createElement("span");
  tag.textContent = plan.tag;
  head.append(title, tag);

  const detail = document.createElement("span");
  detail.textContent = plan.detail;
  card.append(head, detail);

  if (plan.action) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.advisorAction = plan.action;
    button.textContent = plan.actionLabel;
    button.disabled = !plan.enabled;
    if (!plan.enabled && plan.reason) button.title = plan.reason;
    card.appendChild(button);
  }
  return card;
}

function renderTurnGoalCard(player) {
  const plan = nextActionPlan(player);
  const mission = normalizeMission(state.mission) || createRouteMission(state.round, player, missionSnapshotForPlayer(player));
  state.mission = mission;
  const progress = missionProgress(mission, player);
  const card = document.createElement("article");
  card.className = "turn-goal-card";
  const top = document.createElement("div");
  top.className = "turn-goal-top";
  const title = document.createElement("strong");
  title.textContent = "本回合目标";
  const tag = document.createElement("span");
  tag.textContent = plan.shortGoal;
  top.append(title, tag);
  const detail = document.createElement("p");
  detail.textContent = `${mission.title} / ${progress.label}`;
  card.append(top, detail, createProgressMeter(progress.percent));
  return card;
}

function renderTradeAdvisor(player) {
  const card = document.createElement("article");
  card.className = "trade-advisor";
  const title = document.createElement("div");
  title.className = "trade-subtitle";
  title.textContent = "交易顾问";
  card.appendChild(title);

  let verdict = "先保留现金，等待城市、拍卖或融资窗口。";
  let targetLabel = "暂无标的";
  let payback = "观察";
  let expected = "稳定";
  let risk = riskIndex(player).score;

  if (state.pendingPurchase !== null && spaces[state.pendingPurchase]?.type === "property") {
    const index = state.pendingPurchase;
    const price = propertyPrice(index);
    const rent = Math.max(1, calculateRent(index, state.lastRoll?.total || 7));
    const value = cityValuation(index);
    targetLabel = spaceDisplayName(index);
    payback = `${Math.ceil(price / rent)} 次收租`;
    expected = value >= price * 1.22 ? "低估" : value >= price ? "合理" : "偏贵";
    risk = clamp(risk + (player.cash - price < 220 ? 16 : 0), 0, 100);
    verdict = value >= price && player.cash >= price
      ? `可以买：估值 ${formatMoney(value)}，留意现金垫。`
      : `谨慎：价格 ${formatMoney(price)}，现金或估值不够舒服。`;
  } else {
    const best = bestUpgradeIndex(player, 120);
    if (best !== null) {
      const cost = buildCostFor(player, best);
      const rentGain = Math.max(1, Math.round(calculateRent(best, state.lastRoll?.total || 7) * 0.35));
      targetLabel = spaceDisplayName(best);
      payback = `${Math.ceil(cost / rentGain)} 次增租`;
      expected = `${cityRating(best)} 级`;
      verdict = `优先升级：${spaceDisplayName(best)} 能同时推高租金、股价和评级。`;
    } else {
      const deal = businessDealOptions(player).find((item) => !item.disabled);
      if (deal) {
        targetLabel = deal.title;
        payback = deal.tag;
        expected = deal.tone === "debt" ? "高火力" : "成长";
        risk = clamp(risk + (deal.tone === "debt" ? 10 : 0), 0, 100);
        verdict = `${deal.title} 可执行：${deal.detail}`;
      }
    }
  }

  const stats = document.createElement("div");
  stats.className = "advisor-stat-grid";
  stats.append(
    createGameStat("标的", targetLabel),
    createGameStat("回本", payback),
    createGameStat("预期", expected),
    createGameStat("风险", `${risk} ${riskLabel(risk)}`),
  );
  const conclusion = document.createElement("p");
  conclusion.textContent = verdict;
  card.append(stats, conclusion);
  return card;
}

function renderAssetOverview(player) {
  const propertyValue = ownedPropertyIndexes(player.id).reduce((total, index) => total + cityValuation(index), 0);
  const stockValue = portfolioMarketValue(player) - propertyValue;
  const debtValue = Math.max(0, player.debt || 0);
  const cashValue = Math.max(0, player.cash || 0);
  const positiveTotal = Math.max(1, cashValue + propertyValue + stockValue);
  const card = document.createElement("article");
  card.className = "asset-overview";

  const top = document.createElement("div");
  top.className = "asset-overview-top";
  const title = document.createElement("strong");
  title.textContent = "资产总览图";
  const net = document.createElement("span");
  net.textContent = `净资产 ${formatMoney(netWorth(player))}`;
  top.append(title, net);

  const bars = document.createElement("div");
  bars.className = "asset-overview-bars";
  [
    ["cash", "现金", cashValue],
    ["property", "地产", propertyValue],
    ["stock", "股票", stockValue],
    ["debt", "债务", debtValue],
  ].forEach(([kind, label, value]) => {
    const item = document.createElement("span");
    item.className = `asset-bar asset-bar-${kind}`;
    item.style.setProperty("--bar-width", `${kind === "debt" ? clamp((value / Math.max(1, positiveTotal + value)) * 100, 4, 100) : clamp((value / positiveTotal) * 100, 4, 100)}%`);
    item.innerHTML = `<small>${label}</small><strong>${formatMoney(value)}</strong>`;
    bars.appendChild(item);
  });

  const stats = document.createElement("div");
  stats.className = "advisor-stat-grid";
  stats.append(
    createGameStat("城市", `${ownedPropertyIndexes(player.id).length} 座`),
    createGameStat("公司", `${ownedCompanyCount(player)} 座`),
    createGameStat("股票", `${totalStockShares(player)} 股`),
    createGameStat("信用", formatMoney(availableCredit(player))),
  );
  card.append(top, bars, stats);
  return card;
}

function renderRiskAlertCard(player) {
  const risk = riskIndex(player);
  const card = document.createElement("article");
  card.className = `risk-alert-card risk-alert-card-${risk.tone}`;
  const top = document.createElement("div");
  top.className = "risk-alert-top";
  const title = document.createElement("strong");
  title.textContent = "风险警报条";
  const tag = document.createElement("span");
  tag.textContent = `${risk.score} / ${riskLabel(risk.score)}`;
  top.append(title, tag);
  const meter = createProgressMeter(risk.score);
  meter.classList.add("risk-meter");
  const detail = document.createElement("p");
  detail.textContent = risk.score >= 70
    ? "快到危险区：优先还债、卖股、抵押低收益城市，避免突然破产。"
    : risk.score >= 42
      ? "中等压力：下一笔融资要看回报，不要无脑加杠杆。"
      : "风险健康：可以考虑建设、买股或用小额融资扩张。";
  card.append(top, meter, detail);
  return card;
}

function renderVictoryProgressCard(player) {
  const rules = currentRules();
  const card = document.createElement("article");
  card.className = "victory-progress-card";
  const title = document.createElement("div");
  title.className = "trade-subtitle";
  title.textContent = "胜利进度条";
  card.appendChild(title);

  const goalPercents = normalizeGoals(state.goals).map((goal) => goalProgress(goal, player).percent);
  const goalPercent = goalPercents.length ? Math.max(...goalPercents) : 0;
  const survivalPercent = rules.turnLimit
    ? clamp((state.round / rules.turnLimit) * 100, 0, 100)
    : clamp((state.players.filter((item) => item.bankrupt).length / Math.max(1, state.players.length - 1)) * 100, 0, 100);
  const overall = Math.max(goalPercent, survivalPercent);
  const detail = document.createElement("p");
  detail.textContent = rules.turnLimit
    ? `第 ${state.round}/${rules.turnLimit} 轮，资产越高越接近胜利。`
    : `已有 ${state.players.filter((item) => item.bankrupt).length} 名玩家出局，最后存活者获胜。`;
  card.append(detail, createProgressMeter(overall));
  return card;
}

function renderSettlementPoster(winner, bestProperty) {
  const poster = document.createElement("article");
  poster.className = "settlement-poster";
  const hqIndex = state.headquarters?.[winner.id];
  const stockGain = Object.entries(winner.stocks || {}).reduce((total, [index, shares]) => total + stockPrice(Number(index)) * Number(shares || 0), 0);
  [
    ["冠军称号", playerTitle(winner)],
    ["总部城市", Number.isInteger(hqIndex) ? spaceDisplayName(hqIndex) : "未设总部"],
    ["王牌资产", bestProperty ? spaceDisplayName(bestProperty.index) : "暂无"],
    ["股票市值", formatMoney(stockGain)],
    ["城市公司", `${ownedCompanyCount(winner)} 座`],
    ["IPO 城市", `${ownedPropertyIndexes(winner.id).filter((index) => state.cityPublic?.[index]).length} 座`],
    ["收藏城市", `${state.cityCollection?.length || 0}/100`],
    ["风险指数", `${riskIndex(winner).score} ${riskLabel(riskIndex(winner).score)}`],
  ].forEach(([label, value]) => poster.appendChild(createGameStat(label, value)));
  return poster;
}

function createProgressMeter(percent) {
  const meter = document.createElement("span");
  meter.className = "progress-meter";
  meter.style.setProperty("--progress", `${clamp(percent, 0, 100)}%`);
  return meter;
}

function renderAuction() {
  auctionPanel.innerHTML = "";
  auctionPanel.classList.toggle("is-hidden", state.phase !== "auction" || !state.auction);
  if (state.phase !== "auction" || !state.auction) return;

  const auction = state.auction;
  const space = spaces[auction.propertyIndex];
  const bidder = currentAuctionBidder();
  const leader = playerById(auction.leaderId);
  const bid = nextAuctionBid();
  const bidderCash = bidder ? bidder.cash : 0;
  const secondsLeft = Math.max(0, Math.ceil(((auction.deadline || Date.now()) - Date.now()) / 1000));

  const card = document.createElement("article");
  card.className = "auction-card";
  card.style.setProperty("--auction-color", space.color || "#d89921");

  const header = document.createElement("div");
  header.className = "auction-header";
  const icon = document.createElement("span");
  icon.className = "auction-icon";
  icon.appendChild(createIcon("gavel", "auction-svg"));
  const copy = document.createElement("div");
  copy.className = "auction-copy";
  const name = document.createElement("strong");
  name.textContent = spaceDisplayName(auction.propertyIndex);
  const detail = document.createElement("span");
  detail.textContent = `市价 ${formatMoney(propertyPrice(auction.propertyIndex))}，当前 ${leader ? `${leader.name} ${formatMoney(auction.currentBid)}` : "无人出价"}`;
  copy.append(name, detail);
  header.append(icon, copy);

	  const turn = document.createElement("p");
	  turn.className = "auction-turn";
	  turn.textContent = bidder ? `${bidder.name} 出价机会：${formatMoney(bid)} / ${secondsLeft}s` : "拍卖正在结算";

	  const timer = document.createElement("span");
	  timer.className = "auction-timer";
	  timer.style.setProperty("--auction-time", `${clamp((secondsLeft / AUCTION_TURN_SECONDS) * 100, 0, 100)}%`);
	  timer.textContent = secondsLeft <= 1 ? "即将落槌" : "倒计时";
	
	  const bidders = document.createElement("div");
  bidders.className = "auction-bidders";
  auction.activeIds.forEach((playerId) => {
    const player = playerById(playerId);
    if (!player) return;
    const pill = document.createElement("span");
    pill.className = player.id === auction.leaderId ? "auction-bidder auction-leader" : "auction-bidder";
    pill.textContent = player.id === auction.leaderId ? `${player.name} 领先` : `${player.name} ${auctionMood(player, bid)}`;
    bidders.appendChild(pill);
  });

  const actions = document.createElement("div");
  actions.className = "auction-actions";
  const bidButton = document.createElement("button");
  bidButton.type = "button";
  bidButton.dataset.auctionAction = "bid";
  bidButton.textContent = `出价 ${formatMoney(bid)}`;
  bidButton.disabled = !canHumanActInAuction() || bidderCash < bid;
  const passButton = document.createElement("button");
  passButton.type = "button";
  passButton.dataset.auctionAction = "pass";
  passButton.textContent = "退出拍卖";
  passButton.disabled = !canHumanActInAuction();
  actions.append(bidButton, passButton);

	  card.append(header, turn, timer, bidders, actions);
  appendPanelDrawer(auctionPanel, "panel:auction", "地产拍卖", [card], {
    icon: "gavel",
    meta: bidder ? `${secondsLeft}s` : "结算中",
  });
}

function renderShop() {
  shopPanel.innerHTML = "";
  shopPanel.classList.toggle("is-hidden", state.phase !== "shop");
  if (state.phase !== "shop") return;

  const current = currentPlayer();
  if (!current || current.bankrupt) {
    appendPanelDrawer(shopPanel, "panel:shop", "卡片商店", [emptyNote("商店暂时关闭。")], {
      icon: "card",
      meta: "关闭",
    });
    return;
  }

  const grid = document.createElement("div");
  grid.className = "shop-grid";
  shopCatalog.forEach((item) => {
    const card = handCardDefinitions[item.cardId];
    if (!card) return;

    const product = document.createElement("article");
    product.className = `shop-item shop-item-${card.tone || "gain"}`;

    const icon = document.createElement("span");
    icon.className = "shop-item-icon";
    icon.appendChild(createIcon(card.icon || "card", "shop-item-svg"));

    const copy = document.createElement("div");
    copy.className = "shop-item-copy";
    const name = document.createElement("strong");
    name.textContent = card.title;
    const detail = document.createElement("p");
    detail.textContent = card.description;
    copy.append(name, detail);

    const buy = document.createElement("button");
    buy.type = "button";
    buy.dataset.shopCard = item.cardId;
    buy.textContent = formatMoney(shopCardPrice(current, item));
    buy.disabled = !canBuyShopCard(current, item.cardId);

    product.append(icon, copy, buy);
    grid.appendChild(product);
  });

  appendPanelDrawer(shopPanel, "panel:shop", "卡片商店", [grid], {
    icon: "card",
    meta: `${shopCatalog.length} 件道具`,
  });
}

function renderSaveSlots() {
  savePanel.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "save-grid";

  for (let slot = 1; slot <= 3; slot += 1) {
    const saved = loadSlot(slot);
    const item = document.createElement("article");
    item.className = "save-slot";

    const copy = document.createElement("div");
    copy.className = "save-slot-copy";
    const name = document.createElement("strong");
    name.textContent = saved ? `槽位 ${slot} / 第 ${saved.round || 1} 轮` : `槽位 ${slot}`;
    const detail = document.createElement("span");
    detail.textContent = saved ? `${saved.players?.[0]?.name || "玩家"} / ${saved.savedAt || "已保存"}` : "空槽";
    copy.append(name, detail);

    const actions = document.createElement("div");
    actions.className = "save-slot-actions";
    actions.append(
      createSmallAction("保存", "save", slot, false),
      createSmallAction("读取", "load", slot, !saved),
      createSmallAction("清除", "clear", slot, !saved),
    );

    item.append(copy, actions);
    grid.appendChild(item);
  }

  appendPanelDrawer(savePanel, "panel:save", "存档槽位", [grid], {
    icon: "card",
    meta: "3 个槽位",
  });
}

function renderTrade() {
  tradePanel.innerHTML = "";
  const current = currentPlayer();
  tradePanel.classList.toggle("is-hidden", !current || current.isAI || state.gameOver);
  if (!current || current.isAI || state.gameOver) return;

  const title = document.createElement("div");
  title.className = "section-title";
  title.textContent = "商业交易台";
  const hint = document.createElement("p");
  hint.className = "panel-hint";
  hint.textContent = "这里保留融资、并购、债券和场外报价；合同入口固定在下方，也可以去右侧“合同”抽屉查看。";
  tradePanel.append(title, hint, renderContractHubCard(current), renderDealDashboard(current));

  const negotiationPanel = renderNegotiationPanel(current);
  if (negotiationPanel) tradePanel.appendChild(negotiationPanel);

  const dealOptions = businessDealOptions(current);
  tradePanel.appendChild(createUiDrawer("panel:businessDesk", "融资 / 并购 / 债券", [
    renderBusinessDealDesk(current, dealOptions),
  ], {
    icon: "chart",
    meta: `${dealOptions.filter((deal) => !deal.disabled).length} 可用`,
    open: true,
  }));

  const tradeGroups = tradeOfferGroupsForPlayer(current);
  tradePanel.appendChild(createUiDrawer("panel:fieldTrade", "场外报价", [
    renderFieldTradeOffers(current, tradeGroups),
  ], {
    icon: "coin",
    meta: `${tradeGroups.offers.length + tradeGroups.cardSellers.length} 个`,
  }));

  tradePanel.appendChild(createUiDrawer("panel:dealLedger", "成交簿", [
    renderDealLedger(false),
  ], {
    icon: "news",
    meta: `${state.dealLedger?.length || 0} 条`,
  }));
}

function tradeOfferGroupsForPlayer(current) {
  const offers = activePlayers()
    .filter((player) => player.id !== current.id)
    .flatMap((player) => ownedPropertyIndexes(player.id).map((index) => ({ player, index })))
    .sort((a, b) => cityValuation(b.index) - cityValuation(a.index))
    .slice(0, 3);

  const cardSellers = activePlayers().filter((player) => player.id !== current.id && player.cards.length > 0).slice(0, 2);
  return { offers, cardSellers };
}

function renderFieldTradeOffers(current, groups = tradeOfferGroupsForPlayer(current)) {
  const { offers, cardSellers } = groups;
  if (offers.length === 0 && cardSellers.length === 0) {
    return emptyNote("对手拥有城市或手牌后，这里会出现报价。合作分红请去“合同”抽屉。");
  }

  const list = document.createElement("div");
  list.className = "trade-list";
  offers.forEach((offer) => {
    const space = spaces[offer.index];
    const price = tradeOfferPrice(offer.index);
    const item = document.createElement("article");
    item.className = "trade-item";
    const copy = document.createElement("div");
    copy.className = "trade-copy";
    const name = document.createElement("strong");
    name.textContent = spaceDisplayName(offer.index);
    const detail = document.createElement("span");
    detail.textContent = `${offer.player.name} 持有 / 估值 ${formatMoney(cityValuation(offer.index))} / 报价 ${formatMoney(price)}`;
    copy.append(name, detail);
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.tradeIndex = String(offer.index);
    button.textContent = "报价";
    button.disabled = current.cash < price || !["waiting", "ending", "shop", "decision"].includes(state.phase);
    item.append(copy, button);
    list.appendChild(item);
  });

  cardSellers.forEach((player) => {
      const item = document.createElement("article");
      item.className = "trade-item";
      const copy = document.createElement("div");
      copy.className = "trade-copy";
      const name = document.createElement("strong");
      name.textContent = `${player.name} 的手牌`;
      const detail = document.createElement("span");
      detail.textContent = `随机购买 1 张 / ${formatMoney(100)}`;
      copy.append(name, detail);
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.tradeCardPlayer = player.id;
      button.textContent = "买卡";
      button.disabled = current.cash < 100 || current.cards.length >= MAX_HAND_CARDS || !["waiting", "ending", "shop", "decision"].includes(state.phase);
      item.append(copy, button);
      list.appendChild(item);
    });

  return list;
}

function renderDealDashboard(player) {
  const dashboard = document.createElement("div");
  dashboard.className = "deal-dashboard";
  dashboard.append(
    createGameStat("全球指数", marketIndexLabel()),
    createGameStat("地产指数", realEstateIndexLabel()),
    createGameStat("股票指数", stockIndexLabel()),
    createGameStat("融资利率", `${Math.round(globalFinancingRate() * 1000) / 10}%`),
    createGameStat("信用额度", formatMoney(availableCredit(player))),
    createGameStat("组合市值", formatMoney(portfolioMarketValue(player))),
  );
  return dashboard;
}

function contractHubSummary(player) {
  if (!player) return { active: 0, offers: 0, signable: 0, pendingApprovals: 0, waitingApprovals: 0 };
  const offers = coopContractCandidates(player);
  const proposals = coopProposalsForPlayer(player).filter((proposal) => proposal.status === "pending");
  return {
    active: coopContractsForPlayer(player).filter((contract) => contract.status === "active").length,
    offers: offers.length,
    signable: offers.filter((offer) => canSignCoopContract(player, offer.index)).length,
    pendingApprovals: proposals.filter((proposal) => proposal.approverId === player.id).length,
    waitingApprovals: proposals.filter((proposal) => proposal.proposerId === player.id).length,
  };
}

function renderContractHubCard(player) {
  const summary = contractHubSummary(player);
  const card = document.createElement("article");
  card.className = "deal-card deal-coop contract-hub-card";
  const copy = document.createElement("div");
  copy.className = "deal-copy";
  const tag = document.createElement("span");
  tag.className = "deal-tag";
  tag.textContent = "合同中心";
  const title = document.createElement("strong");
  title.textContent = summary.pendingApprovals
    ? `${summary.pendingApprovals} 个合同待你同意`
    : summary.waitingApprovals
      ? `${summary.waitingApprovals} 个合同等对方同意`
      : summary.signable
    ? `${summary.signable} 个合同可签`
    : summary.active
      ? `${summary.active} 份合同分红中`
      : summary.offers
        ? `${summary.offers} 个合同项目`
        : "查看合同条件";
  const detail = document.createElement("small");
  detail.textContent = summary.pendingApprovals
    ? "对方发来的合同必须你同意后才会生效。"
    : summary.waitingApprovals
      ? "你提交的合同还没生效，必须等对方同意。"
      : summary.signable
        ? "先提交给对方确认；对方同意后才会扣款生效。"
        : summary.active
          ? "查看分红、剩余轮数、提前解约和违约条款。"
          : `${coopShortcutReason(player)}。`;
  copy.append(tag, title, detail);

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.coopAction = summary.pendingApprovals ? "viewProposals" : "draft";
  button.textContent = summary.pendingApprovals ? "查看提案" : summary.signable ? "打开签署台" : "查看签署台";
  button.disabled = !player || state.gameOver;
  card.append(copy, button);
  return card;
}

function renderBusinessDealDesk(player, deals = businessDealOptions(player)) {
  const desk = document.createElement("div");
  desk.className = "deal-desk";
  deals.forEach((deal) => {
    desk.appendChild(createBusinessDealCard(deal));
  });
  return desk.children.length ? desk : emptyNote("拥有城市后会出现融资、并购和债券大单。");
}

function renderCoop() {
  coopPanel.innerHTML = "";
  const current = currentPlayer();
  const player = humanPlayer() || current;
  coopPanel.classList.toggle("is-hidden", !player || state.gameOver);
  if (!player || state.gameOver) return;
  maybeCreateAiCoopProposal(player);

  const title = document.createElement("div");
  title.className = "section-title coop-section-title";
  title.textContent = "合同中心";
  const hint = document.createElement("p");
  hint.className = "panel-hint";
  hint.textContent = current?.isAI
    ? "现在是对手行动，但你可以先查看合同；轮到你行动时才能签新合同。"
    : "这里专门放合同：签约、分红、提前解约和违约条款都在这里处理。";
  coopPanel.append(title, hint, renderContractHubCard(player));

  const activeCount = coopContractsForPlayer(player).filter((contract) => contract.status === "active").length;
  const offerCount = coopContractCandidates(player).length;
  const archiveCount = archivedCoopContractsForPlayer(player).length;
  const proposalCount = coopProposalsForPlayer(player).length;
  coopPanel.appendChild(createUiDrawer("panel:coopDraft", "合同签署台", [
    renderContractDraftDesk(player),
  ], {
    icon: "shield",
    meta: offerCount ? `${offerCount} 个项目` : "起草",
    open: true,
  }));
  coopPanel.appendChild(createUiDrawer("panel:coopContracts", "合同列表", [
    renderCoopContractsPanel(player, { showTitle: false }),
  ], {
    icon: "shield",
    meta: activeCount ? `${activeCount} 份进行中` : offerCount ? `${offerCount} 个可签` : "暂无",
    open: true,
  }));
  coopPanel.appendChild(createUiDrawer("panel:coopProposals", "对手提案", [
    renderCoopProposalPanel(player),
  ], {
    icon: "chart",
    meta: proposalCount ? `${proposalCount} 个` : "暂无",
    open: Boolean(proposalCount),
  }));
  coopPanel.appendChild(createUiDrawer("panel:coopArchive", "合同档案", [
    renderCoopArchivePanel(player),
  ], {
    icon: "news",
    meta: archiveCount ? `${archiveCount} 条` : "空",
    open: Boolean(archiveCount),
  }));
  coopPanel.appendChild(createUiDrawer("panel:coopGuide", "怎么出现可签合同", [
    renderCoopGuide(player),
  ], {
    icon: "card",
    meta: "条件",
    open: !offerCount && !activeCount,
  }));
}

function renderCoopContractsPanel(player, options = {}) {
  const panel = document.createElement("section");
  panel.className = "coop-contract-panel";
  if (options.showTitle !== false) {
    const title = document.createElement("div");
    title.className = "trade-subtitle";
    title.textContent = "公司合作合同";
    panel.appendChild(title);
  }

  const activeContracts = coopContractsForPlayer(player)
    .filter((contract) => contract.status === "active")
    .slice(0, 3);
  if (activeContracts.length) {
    const activeList = document.createElement("div");
    activeList.className = "coop-contract-list";
    activeContracts.forEach((contract) => activeList.appendChild(createCoopContractStatusCard(contract, player)));
    panel.appendChild(activeList);
  }

  const offers = coopContractCandidates(player).slice(0, activeContracts.length ? 2 : 3);
  if (offers.length) {
    const offerList = document.createElement("div");
    offerList.className = "coop-contract-list";
    offers.forEach((offer) => offerList.appendChild(createCoopOfferCard(offer, player)));
    panel.appendChild(offerList);
  }

  if (!activeContracts.length && !offers.length) {
    panel.appendChild(emptyNote("现在还没有可签合同。看下面的条件提示，满足后这里会出现“签合同”。"));
  }
  return panel;
}

function renderCoopArchivePanel(player) {
  const panel = document.createElement("section");
  panel.className = "coop-contract-panel";
  const archive = archivedCoopContractsForPlayer(player).slice(0, 6);
  if (!archive.length) {
    panel.appendChild(emptyNote("还没有完成、违约或解约的合同。"));
    return panel;
  }
  const list = document.createElement("div");
  list.className = "coop-contract-list";
  archive.forEach((contract) => list.appendChild(createCoopContractStatusCard(contract, player)));
  panel.appendChild(list);
  return panel;
}

function renderCoopProposalPanel(player) {
  const panel = document.createElement("section");
  panel.className = "coop-contract-panel";
  const proposals = coopProposalsForPlayer(player).slice(0, 5);
  if (!proposals.length) {
    panel.appendChild(emptyNote("暂时没有对手发来的合同提案。"));
    return panel;
  }
  const list = document.createElement("div");
  list.className = "coop-contract-list";
  proposals.forEach((proposal) => list.appendChild(createCoopProposalCard(proposal, player)));
  panel.appendChild(list);
  return panel;
}

function renderContractDraftDesk(player) {
  const desk = document.createElement("section");
  desk.className = "contract-draft-desk";
  const options = coopContractDraftOptions(player);
  const signableCount = options.filter(({ index }) => canSignCoopContract(player, index)).length;
  const title = document.createElement("strong");
  title.textContent = signableCount ? "可以起草正式合作合同" : "先查看合同格式和条件";
  const detail = document.createElement("p");
  detail.textContent = options.length
    ? `打开后可选对方玩家名下的城市，查看合同价值、双方给付、违约金，并填写违约条款。你的商业信誉 ${contractReputationFor(player)}。`
    : `对手买下城市后，这里会出现可选择的合同项目。你的商业信誉 ${contractReputationFor(player)}。`;
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.coopAction = "draft";
  button.textContent = "打开合同签署台";
  button.disabled = !player || state.gameOver;
  desk.append(title, detail, button);
  return desk;
}

function renderCoopGuide(player) {
  const guide = document.createElement("div");
  guide.className = "coop-guide";
  const opponentOwned = activePlayers()
    .filter((owner) => owner.id !== player?.id)
    .flatMap((owner) => ownedPropertyIndexes(owner.id));
  const availableIndexes = opponentOwned.filter((index) => spaces[index]?.type === "property" && !state.mortgages[index]);
  const affordable = availableIndexes.some((index) => player && player.cash >= coopUpfront(index) && !hasActiveCoopContract(player.id, index));
  const activePhase = Boolean(player && !player.isAI && businessDealsOpen(player));
  [
    ["对手已经买下城市", opponentOwned.length > 0],
    ["城市没有被抵押", availableIndexes.length > 0],
    ["轮到你行动阶段", activePhase],
    ["现金够付入场费", affordable],
  ].forEach(([label, done]) => {
    const item = document.createElement("span");
    item.className = done ? "is-done" : "";
    item.textContent = `${done ? "✓" : "•"} ${label}`;
    guide.appendChild(item);
  });
  const note = document.createElement("p");
  note.textContent = "签约后你先付入场费，之后每轮拿分红；如果城市被抵押、转手或所有方破产，会触发违约金。";
  guide.appendChild(note);
  return guide;
}

function createCoopOfferCard(offer, player) {
  const { index, owner } = offer;
  const financials = coopContractFinancials(index);
  const card = document.createElement("article");
  card.className = "deal-card deal-coop";
  const copy = document.createElement("div");
  copy.className = "deal-copy";
  const tag = document.createElement("span");
  tag.className = "deal-tag";
  tag.textContent = `${owner.name} 名下区域`;
  const title = document.createElement("strong");
  title.textContent = `合作 ${spaceDisplayName(index)}`;
  const detail = document.createElement("small");
  detail.textContent = `合同价值 ${formatMoney(financials.contractValue)} / 你付 ${formatMoney(financials.upfront)} / 预计收 ${formatMoney(financials.partnerExpected)} / 违约金 ${formatMoney(financials.penalty)}。`;
  copy.append(tag, title, detail);

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.coopAction = "sign";
  button.dataset.coopIndex = String(index);
  button.textContent = "预览合同";
  button.disabled = !canSignCoopContract(player, index);
  if (button.disabled) button.title = coopDisabledReason(player, index);
  card.append(copy, button);
  return card;
}

function coopContractFinancials(index, negotiation = "standard") {
  const mode = typeof negotiation === "object" ? negotiation.mode || "standard" : negotiation;
  const baseUpfront = coopUpfront(index);
  const basePenalty = coopPenalty(index);
  const baseShare = coopPartnerShare(index);
  const modifiers = {
    standard: { upfront: 1, penalty: 1, share: 0, label: "标准合同" },
    premiumShare: { upfront: 1.22, penalty: 1.08, share: 0.06, label: "加价换高分红" },
    safePenalty: { upfront: 1.1, penalty: 0.72, share: -0.02, label: "低违约金稳健版" },
    aggressiveShare: { upfront: 1.34, penalty: 1.22, share: 0.09, label: "强势分红版" },
    lowEntry: { upfront: 0.84, penalty: 1.14, share: -0.04, label: "低入场费试水版" },
  }[mode] || { upfront: 1, penalty: 1, share: 0, label: "标准合同" };
  const upfront = Math.round((baseUpfront * modifiers.upfront) / 10) * 10;
  const penalty = Math.round((basePenalty * modifiers.penalty) / 10) * 10;
  const share = clamp(baseShare + modifiers.share, 0.24, 0.55);
  const dividend = coopDividend(index);
  const partnerPerRound = Math.round(dividend * share);
  const ownerPerRound = Math.max(0, dividend - partnerPerRound);
  const duration = COOP_CONTRACT_DURATION;
  const partnerExpected = partnerPerRound * duration;
  const ownerExpected = ownerPerRound * duration;
  const totalDividend = dividend * duration;
  return {
    upfront,
    ownerReceipt: upfront,
    penalty,
    share,
    dividend,
    duration,
    partnerPerRound,
    ownerPerRound,
    partnerExpected,
    ownerExpected,
    totalDividend,
    contractValue: upfront + totalDividend,
    mode,
    modeLabel: modifiers.label,
  };
}

function sanitizeContractAmount(value, fallback = 0, min = 0, max = 99999) {
  const number = Number(value);
  const safeFallback = Number.isFinite(Number(fallback)) ? Number(fallback) : 0;
  return clamp(Math.round(Number.isFinite(number) ? number : safeFallback), min, max);
}

function sanitizeContractDuration(value, fallback = COOP_CONTRACT_DURATION) {
  return sanitizeContractAmount(value, fallback, 1, COOP_CONTRACT_MAX_DURATION);
}

function sanitizeContractSignature(value, fallback = "玩家") {
  return String(value || fallback)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 24) || fallback;
}

function coopContractFinancialsWithTerms(index, negotiation = "standard", terms = {}) {
  const base = coopContractFinancials(index, negotiation);
  const duration = sanitizeContractDuration(terms.duration, base.duration);
  const upfront = sanitizeContractAmount(terms.upfront, base.upfront, 0, Math.max(99999, base.upfront * 5));
  const ownerReceipt = sanitizeContractAmount(terms.ownerReceipt, upfront, 0, upfront);
  const penalty = sanitizeContractAmount(terms.penalty, base.penalty, 0, Math.max(99999, base.penalty * 5));
  const partnerPerRound = sanitizeContractAmount(terms.partnerPerRound, base.partnerPerRound, 0, Math.max(99999, base.partnerPerRound * 5));
  const ownerPerRound = sanitizeContractAmount(terms.ownerPerRound, base.ownerPerRound, 0, Math.max(99999, base.ownerPerRound * 5));
  const dividend = partnerPerRound + ownerPerRound;
  const share = dividend > 0 ? clamp(partnerPerRound / dividend, 0, 1) : 0;
  const partnerExpected = partnerPerRound * duration;
  const ownerExpected = ownerPerRound * duration;
  const totalDividend = dividend * duration;
  return {
    ...base,
    upfront,
    ownerReceipt,
    penalty,
    share,
    dividend,
    duration,
    partnerPerRound,
    ownerPerRound,
    partnerExpected,
    ownerExpected,
    totalDividend,
    contractValue: upfront + totalDividend,
    customized: Boolean(terms && Object.keys(terms).length),
  };
}

function normalizeContractNegotiationMode(mode) {
  return ["standard", "premiumShare", "safePenalty", "aggressiveShare", "lowEntry"].includes(mode) ? mode : "standard";
}

function contractTemplateForCity(index) {
  const space = spaces[index] || {};
  if (space.specialty === "finance") {
    return { label: "金融分红合同", clause: "金融城市股价暴跌或抵押视为违约", bonus: "股息稳定，违约金偏重要" };
  }
  if (space.specialty === "tourism" || space.coastal) {
    return { label: "旅游收益合同", clause: "旅游热度下滑且提前解约需赔付", bonus: "旺季收益高，市场波动明显" };
  }
  if (space.specialty === "tech") {
    return { label: "科技孵化合同", clause: "科技园停建或转手控制权视为违约", bonus: "升级后回本更快" };
  }
  if (space.airport || space.specialty === "transit") {
    return { label: "航线联营合同", clause: "航线城市转手或抵押触发违约", bonus: "适合配合环球路线" };
  }
  return { label: "城市共营合同", clause: "抵押 / 转手 / 破产触发违约", bonus: "标准城市分红协议" };
}

function contractRiskAssessment(index, financials, partner, owner) {
  const afterCash = Math.max(0, (partner?.cash || 0) - financials.upfront);
  const cashPressure = partner ? clamp(100 - Math.round((afterCash / Math.max(1, partner.cash)) * 100), 0, 70) : 40;
  const penaltyPressure = clamp(Math.round((financials.penalty / Math.max(1, financials.partnerExpected + 1)) * 36), 0, 42);
  const cityHeat = clamp(Math.round((cityRatingScore(index) - 55) * 0.45), -10, 22);
  const ownerDebt = owner ? clamp(Math.round(riskIndex(owner).score * 0.22), 0, 22) : 10;
  const reputationBuffer = partner ? Math.round((80 - contractReputationFor(partner)) * 0.28) : 0;
  const score = clamp(28 + cashPressure + penaltyPressure + ownerDebt + reputationBuffer - cityHeat, 5, 98);
  const level = score >= 68 ? "高风险" : score >= 42 ? "中风险" : "低风险";
  const tone = score >= 68 ? "danger" : score >= 42 ? "warn" : "safe";
  const advisor = score >= 68 ? "不建议" : score >= 42 ? "谨慎" : "推荐";
  const reason = score >= 68
    ? "入场费或违约压力偏高，容易拖累现金流"
    : score >= 42
      ? "收益不错，但需要留现金防止违约"
      : "回本路径清楚，分红和违约风险较平衡";
  return { score, level, tone, advisor, reason };
}

function contractReputationFor(player) {
  return clamp(Number(player?.contractReputation) || 80, 0, 100);
}

function adjustContractReputation(player, delta) {
  if (!player) return;
  player.contractReputation = clamp(contractReputationFor(player) + delta, 0, 100);
}

function sanitizeContractClause(value) {
  const fallback = "抵押 / 转手 / 破产触发违约";
  return String(value || fallback)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 48) || fallback;
}

function createCoopContractStatusCard(contract, player) {
  const owner = playerById(contract.ownerId);
  const partner = playerById(contract.partnerId);
  const isPartner = player?.id === contract.partnerId;
  const card = document.createElement("article");
  card.className = `deal-card deal-coop active-coop-contract contract-status-${contract.status}`;
  const copy = document.createElement("div");
  copy.className = "deal-copy";
  const tag = document.createElement("span");
  tag.className = "deal-tag";
  tag.textContent = contract.status === "active" ? (isPartner ? "你是合作方" : "你是所有方") : `合同档案 / ${contractStatusLabel(contract.status)}`;
  const title = document.createElement("strong");
  title.textContent = spaceDisplayName(contract.propertyIndex);
  const detail = document.createElement("small");
  detail.textContent = contract.status === "active"
    ? `${owner?.name || "原所有者"} + ${partner?.name || "合作方"} / 剩 ${contract.remainingRounds} 轮 / ${contract.riskLevel} / ${contract.advisor} / 违约金 ${formatMoney(contract.penalty)}`
    : `${owner?.name || "原所有者"} + ${partner?.name || "合作方"} / ${contract.settlement || contract.breachReason || "合同已归档"}`;
  copy.append(tag, title, detail);

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.coopId = contract.id;
  if (contract.status === "active") {
    button.dataset.coopAction = "terminate";
    button.textContent = "提前解约";
    button.disabled = !canTerminateCoopContract(player, contract);
    if (button.disabled) button.title = "只有合同双方可操作";
  } else {
    button.dataset.coopAction = "renew";
    button.textContent = "续约";
    button.disabled = !canRenewCoopContract(player, contract);
    if (button.disabled) button.title = "需要双方仍存活且城市仍属原所有方";
  }
  card.append(copy, button);
  return card;
}

function contractStatusLabel(status) {
  return {
    active: "进行中",
    completed: "已到期",
    breached: "已违约",
    terminated: "已解约",
  }[status] || "归档";
}

function createCoopProposalCard(proposal, player) {
  const owner = playerById(proposal.ownerId);
  const partner = playerById(proposal.partnerId);
  const financials = coopContractFinancialsWithTerms(proposal.propertyIndex, proposal.negotiationMode, proposal);
  const needsYourApproval = proposal.status === "pending" && proposal.approverId === player?.id;
  const waitingForOther = proposal.status === "pending" && proposal.proposerId === player?.id;
  const card = document.createElement("article");
  card.className = `deal-card deal-coop coop-proposal-card proposal-${proposal.status}`;
  const copy = document.createElement("div");
  copy.className = "deal-copy";
  const tag = document.createElement("span");
  tag.className = "deal-tag";
  tag.textContent = needsYourApproval ? "需要你同意" : waitingForOther ? "等待对方同意" : "提案记录";
  const title = document.createElement("strong");
  title.textContent = `${spaceDisplayName(proposal.propertyIndex)} / ${proposal.modeLabel || financials.modeLabel}`;
  const detail = document.createElement("small");
  detail.textContent = `${partner?.name || "合作方"} 向 ${owner?.name || "所有方"} 提案 / 你付 ${formatMoney(financials.upfront)} / 对方收 ${formatMoney(financials.ownerReceipt)} / 给你 ${formatMoney(financials.partnerPerRound)}/轮 / 对方留 ${formatMoney(financials.ownerPerRound)}/轮 / ${financials.duration}轮 / 违约 ${formatMoney(financials.penalty)} / ${proposal.response || proposal.riskLevel}`;
  copy.append(tag, title, detail);

  const actions = document.createElement("div");
  actions.className = "proposal-actions";
  if (needsYourApproval) {
    const accept = document.createElement("button");
    accept.type = "button";
    accept.dataset.coopAction = "acceptProposal";
    accept.dataset.proposalId = proposal.id;
    accept.textContent = "同意";
    const decline = document.createElement("button");
    decline.type = "button";
    decline.dataset.coopAction = "declineProposal";
    decline.dataset.proposalId = proposal.id;
    decline.textContent = "拒绝";
    actions.append(accept, decline);
  } else {
    const status = document.createElement("button");
    status.type = "button";
    status.disabled = true;
    status.textContent = proposal.status === "rejected" ? "未同意" : "等待";
    actions.appendChild(status);
  }
  card.append(copy, actions);
  return card;
}

function contractSigningPlayer() {
  const current = currentPlayer();
  if (current && !current.isAI && !current.bankrupt) return current;
  return humanPlayer() || current || null;
}

function coopContractDraftOptions(player) {
  if (!player || player.isAI || player.bankrupt) return [];
  return activePlayers()
    .filter((owner) => owner.id !== player.id)
    .flatMap((owner) => ownedPropertyIndexes(owner.id).map((index) => ({ owner, index })))
    .filter(({ index }) => spaces[index]?.type === "property")
    .filter(({ index }) => !hasActiveCoopContract(player.id, index))
    .sort((a, b) => {
      const signableDelta = Number(canSignCoopContract(player, b.index)) - Number(canSignCoopContract(player, a.index));
      if (signableDelta) return signableDelta;
      return coopScore(b.index) - coopScore(a.index);
    });
}

function preferredCoopDraftIndex(player, preferredIndex = null) {
  const options = coopContractDraftOptions(player);
  if (Number.isInteger(preferredIndex) && options.some((option) => option.index === preferredIndex)) return preferredIndex;
  const signable = options.find((option) => canSignCoopContract(player, option.index));
  return (signable || options[0])?.index ?? null;
}

function createBusinessDealCard(deal) {
  const card = document.createElement("article");
  card.className = `deal-card deal-${deal.tone}`;
  const copy = document.createElement("div");
  copy.className = "deal-copy";
  const tag = document.createElement("span");
  tag.className = "deal-tag";
  tag.textContent = deal.tag;
  const title = document.createElement("strong");
  title.textContent = deal.title;
  const detail = document.createElement("small");
  detail.textContent = deal.detail;
  copy.append(tag, title, detail);
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.dealAction = deal.action;
  if (deal.index !== undefined) button.dataset.dealIndex = String(deal.index);
  button.textContent = deal.button;
  button.disabled = deal.disabled;
  if (deal.reason) button.title = deal.reason;
  card.append(copy, button);
  return card;
}

function renderDealLedger(showTitle = true) {
  const ledger = document.createElement("div");
  ledger.className = "deal-ledger";
  if (showTitle) {
    const title = document.createElement("div");
    title.className = "trade-subtitle";
    title.textContent = "成交簿";
    ledger.appendChild(title);
  }
  if (!state.dealLedger?.length) {
    ledger.appendChild(emptyNote("暂无大额交易记录。"));
    return ledger;
  }
  state.dealLedger.slice(0, 4).forEach((deal) => {
    const item = document.createElement("article");
    item.className = `deal-ledger-item deal-${deal.tone || "neutral"}`;
    item.innerHTML = `<strong>${deal.title}</strong><span>${deal.detail}</span><em>${formatMoney(deal.amount || 0)} / 第 ${deal.round} 轮</em>`;
    ledger.appendChild(item);
  });
  return ledger;
}

function renderProgress() {
	  progressPanel.innerHTML = "";
	  const current = currentPlayer();
	  const drawerChildren = [renderVictoryProgressCard(current), renderGameGoals(current), renderRouteMission(current), renderTurnGoalCard(current)];

  const tasks = document.createElement("div");
  tasks.className = "task-list";
  taskDefinitions.forEach((task) => {
    const done = Boolean(current?.completedTasks?.includes(task.id));
    const item = document.createElement("article");
    item.className = done ? "task-item task-done" : "task-item";
    const name = document.createElement("strong");
    name.textContent = task.title;
    const detail = document.createElement("span");
    detail.textContent = done ? `已完成 / 奖励 ${formatMoney(task.reward)}` : task.detail;
    item.append(name, detail);
    tasks.appendChild(item);
  });

  const achievements = loadAchievements();
  const achievementRow = document.createElement("div");
  achievementRow.className = "achievement-row";
  Object.entries(achievementDefinitions).forEach(([id, label]) => {
    const badge = document.createElement("span");
    badge.className = achievements[id] ? "achievement-badge unlocked" : "achievement-badge";
    badge.textContent = label;
    achievementRow.appendChild(badge);
  });

  const leaderboard = document.createElement("ol");
  leaderboard.className = "leaderboard-list";
  loadLeaderboard().slice(0, 3).forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `${entry.name} ${formatMoney(entry.worth)} / ${entry.round}轮`;
    leaderboard.appendChild(item);
  });

  const stats = document.createElement("div");
  stats.className = "game-stat-grid";
  const topCity = mostProfitableCity();
  stats.append(
    createGameStat("最高租金", state.highestRent ? `${spaces[state.highestRent.index].name} ${formatMoney(state.highestRent.amount)}` : "暂无"),
    createGameStat("最赚钱城市", topCity ? `${spaces[topCity.index].name} ${formatMoney(topCity.revenue)}` : "暂无"),
    createGameStat("旅行地区", current ? `${new Set(current.visitedRegions || []).size}/5` : "0/5"),
    createGameStat("当前贷款", current?.debt ? formatMoney(current.debt) : "无"),
    createGameStat("城市收藏", `${state.cityCollection?.length || 0}/100`),
    createGameStat("城市公司", current ? `${ownedCompanyCount(current)} 座` : "0 座"),
  );

  drawerChildren.push(tasks, renderLatestQuarterlyReport(), achievementRow, stats, leaderboard.children.length ? leaderboard : emptyNote("暂无历史排行。"));
  appendPanelDrawer(progressPanel, "panel:progress", "任务 / 成就", drawerChildren, {
    icon: "trophy",
    meta: `${current?.completedTasks?.length || 0}/${taskDefinitions.length}`,
  });
}

function renderWorldPanel() {
  worldPanel.innerHTML = "";
  const drawerChildren = [];

  const tabs = document.createElement("div");
  tabs.className = "world-tabs";
  [
    ["atlas", "图鉴"],
    ["stocks", "股票"],
    ["business", "商业"],
    ["rules", "规则"],
    ["records", "记录"],
  ].forEach(([mode, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.worldMode = mode;
    button.className = state.worldPanelMode === mode ? "is-active" : "";
    button.textContent = label;
    tabs.appendChild(button);
  });
  drawerChildren.push(tabs);

  if (state.worldPanelMode === "stocks") {
    drawerChildren.push(renderStockPanel());
    appendPanelDrawer(worldPanel, "panel:world", "世界系统", drawerChildren, {
      icon: "map",
      meta: "股票",
    });
    return;
  }
  if (state.worldPanelMode === "business") {
    drawerChildren.push(renderBusinessIntelPanel());
    appendPanelDrawer(worldPanel, "panel:world", "世界系统", drawerChildren, {
      icon: "map",
      meta: "商业",
    });
    return;
  }
  if (state.worldPanelMode === "rules") {
    drawerChildren.push(renderRulesPanel());
    appendPanelDrawer(worldPanel, "panel:world", "世界系统", drawerChildren, {
      icon: "map",
      meta: "规则",
    });
    return;
  }
  if (state.worldPanelMode === "records") {
    drawerChildren.push(renderRecordsPanel());
    appendPanelDrawer(worldPanel, "panel:world", "世界系统", drawerChildren, {
      icon: "map",
      meta: "记录",
    });
    return;
  }
  drawerChildren.push(renderAtlasPanel());
  appendPanelDrawer(worldPanel, "panel:world", "世界系统", drawerChildren, {
    icon: "map",
    meta: "图鉴",
  });
}

function renderAtlasPanel() {
  const wrap = document.createElement("div");
  wrap.className = "atlas-panel";
  const top = strongestCities().slice(0, 5);
  top.forEach(({ index, score }) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "atlas-city";
    item.dataset.openProperty = String(index);
    item.innerHTML = `<strong>${spaceDisplayName(index)}</strong><span>${cityRating(index)} 级 / ${rareBadgeLabel(spaces[index].rareBadge)} / ${Math.round(score)}分 / ${state.cityCollection?.includes(index) ? "已收藏" : "未解锁"}</span>`;
    wrap.appendChild(item);
  });
  const all = document.createElement("button");
  all.type = "button";
  all.className = "primary-action atlas-open";
  all.dataset.worldAction = "open-atlas";
  all.textContent = "打开 100 地点图鉴";
  wrap.appendChild(all);
  return wrap;
}

function renderStockPanel() {
  const list = document.createElement("div");
  list.className = "stock-panel-list market-board";
  const summary = document.createElement("div");
  summary.className = "market-summary";
  summary.append(
    createGameStat("全球城市指数", marketIndexLabel()),
    createGameStat("地产指数", realEstateIndexLabel()),
    createGameStat("股票指数", stockIndexLabel()),
    createGameStat("融资利率", `${Math.round(globalFinancingRate() * 1000) / 10}%`),
    createGameStat("市场状态", currentMarket().title),
    createGameStat("流动性", marketIndexValue() > 140 ? "活跃" : "观望"),
  );
  list.appendChild(summary);
  strongestCities()
    .sort((a, b) => cityValuation(b.index) - cityValuation(a.index))
    .slice(0, 6)
    .forEach(({ index }) => {
      const item = document.createElement("button");
      item.type = "button";
      const trend = Number(state.stockTrends?.[index] || 0);
      item.className = `stock-row ${trend > 0 ? "trend-up" : trend < 0 ? "trend-down" : ""}`;
      item.dataset.openProperty = String(index);
      item.innerHTML = `<strong>${spaceDisplayName(index)}</strong><span>${trendLabel(trend)} / 股价 ${formatMoney(stockPrice(index))} / 估值 ${formatMoney(cityValuation(index))} / 公司 ${cityCompanyCount(index)} / ${state.cityPublic?.[index] ? "IPO" : "未上市"}</span>`;
      list.appendChild(item);
    });
  return list;
}

function renderRulesPanel() {
  const panel = document.createElement("div");
  panel.className = "rules-panel";
  [
    `当前：${rulesPresetDefinitions[currentRules().rulesPreset].label} / 起始 ${formatMoney(currentRules().startCash)}`,
    `洲套装：同一玩家拥有同洲 ${CONTINENT_SET_SIZE} 座城市后，租金奖励激活。`,
    "股票：城市升级、收租和评级会影响股价，股灾会压低股价。",
    "银行：银行卡显示信用额度、现金利息和贷款利息；信用越好，可用额度越高。",
    "杠杆融资：提高短期现金和交易火力，但会增加保证金债务、融资利息和风险指数。",
    "可转债：利率低于普通债券，可在压力大时债转股，代价是股权稀释。",
    "做空：借空城市股票会立刻获得现金，但需要支付借空利息，股价上涨时平空会亏损。",
    "总部：把一座自有城市设为总部后，本城租金和估值增强，同洲城市也会得到小幅加成。",
	    "城市公司：公司、酒店、银行和科技园会改变现金流、租金、信用和股价。",
	    "合作合同：可与对手名下城市签公司合作，先付入场费，之后按轮分红；抵押、转手或破产会触发违约金。",
	    "城市 IPO：满级城市可以上市，获得现金、扩大股本容量，并开启董事会升级。",
    "股权收购：上市城市可通过持股和现金完成控制权收购。",
    "角色技能树：完成交易、建设、融资和教学章节会获得经验，等级越高主动技能越强。",
    "每日挑战：每天一个市场开局，规则更紧凑；快速经营会在约 18 回合结算。",
    "商业交易：融资路演提升城市热度和估值，并购可高价拿下对手核心城市，城市债券可快速补充现金流。",
    "环保：环保改造降低污染、提升幸福度，并减少高等级维护费。",
    "路线：港口、机场、能源城市和相邻连线会在新轮次产生贸易分红。",
  ].forEach((text) => {
    const item = document.createElement("p");
    item.textContent = text;
    panel.appendChild(item);
  });
  return panel;
}

function renderRecordsPanel() {
  const panel = document.createElement("div");
  panel.className = "records-panel";
  const topCity = mostProfitableCity();
  const worst = state.liquidations[0];
  [
    ["最强城市", strongestCities()[0] ? spaces[strongestCities()[0].index].name : "暂无"],
    ["最赚钱城市", topCity ? `${spaces[topCity.index].name} ${formatMoney(topCity.revenue)}` : "暂无"],
    ["最高单次租金", state.highestRent ? `${spaces[state.highestRent.index].name} ${formatMoney(state.highestRent.amount)}` : "暂无"],
    ["最高评级", strongestCities()[0] ? cityRating(strongestCities()[0].index) : "暂无"],
    ["最近破产", worst ? `${worst.player} / ${worst.reason}` : "暂无"],
  ].forEach(([label, value]) => panel.appendChild(createGameStat(label, value)));
  return panel;
}

function renderShare() {
  sharePanel.innerHTML = "";
  const actions = document.createElement("div");
  actions.className = "share-actions";
  actions.append(createShareButton("导出", "export"), createShareButton("导入", "import"));
  const drawerChildren = [actions];

  if (state.shareCodePreview) {
    const code = document.createElement("textarea");
    code.className = "share-code";
    code.readOnly = true;
    code.value = state.shareCodePreview;
    drawerChildren.push(code);
  }
  appendPanelDrawer(sharePanel, "panel:share", "联机分享码", drawerChildren, {
    icon: "refresh",
    meta: state.shareCodePreview ? "已生成" : "导出 / 导入",
  });
}

function renderCurrentTile() {
  currentTileCard.innerHTML = "";
  const player = currentPlayer();
  if (!player) return;

  const index = player.position;
  const space = spaces[index];
  currentTileCard.className = "current-tile";
  if (space.type === "property") currentTileCard.classList.add("property-card");
  currentTileCard.dataset.type = space.type;
  currentTileCard.style.setProperty("--current-color", space.color || tileAccentColor(space.type));

  const iconWrap = document.createElement("span");
  iconWrap.className = "current-tile-icon";
  iconWrap.appendChild(createIcon(space.icon || "map", "current-icon"));

  const copy = document.createElement("div");
  copy.className = "current-tile-copy";
  const eyebrow = document.createElement("span");
  eyebrow.textContent = uiText("currentTile", player.name);
  const name = document.createElement("strong");
  name.textContent = spaceDisplayName(index);
  const detail = document.createElement("small");
  detail.textContent = tileDetail(index);
  copy.append(eyebrow, name, detail);

  const badge = document.createElement("span");
  badge.className = "current-tile-badge";
  badge.textContent = space.type === "property" ? uiText("propertyCard", propertyCardNumber(index)) : currentTileBadge(index);

  currentTileCard.append(iconWrap, copy, badge);

  if (space.type === "property") {
    const owner = playerById(state.owners[index]);
    const rent = calculateRent(index, state.lastRoll?.total || 7);
    const stats = document.createElement("div");
    stats.className = "current-property-stats";
	    stats.append(
	      createPropertyStat(uiText("owner"), owner ? owner.name : uiText("forSale")),
	      createPropertyStat(uiText("price"), formatMoney(propertyPrice(index))),
	      createPropertyStat(uiText("rent"), formatMoney(rent)),
	      createPropertyStat(uiText("upgradeCost"), state.levels[index] >= MAX_LEVEL ? uiText("maxLevel") : formatMoney(buildCostFor(player, index))),
	      createPropertyStat("股价", formatMoney(stockPrice(index))),
	      createPropertyStat("评级", cityRating(index)),
	    );

    const upgradeTrack = renderPropertyUpgradeTrack(index, "current-upgrade-track");
    currentTileCard.append(stats, upgradeTrack);
  }
}

function renderCityTicker() {
  cityTicker.innerHTML = "";
  const leader = [...activePlayers()].sort((a, b) => netWorth(b) - netWorth(a))[0] || currentPlayer();
  const current = currentPlayer();
  const ownedCount = current ? ownedPropertyIndexes(current.id).length : 0;
  const topLevel = current ? Math.max(0, ...ownedPropertyIndexes(current.id).map((index) => state.levels[index] || 0)) : 0;
  const market = currentMarket();
  cityTicker.className = `city-ticker market-${market.id}`;

  const icon = document.createElement("span");
  icon.className = "ticker-icon";
  icon.appendChild(createIcon("crown", "ticker-svg"));

  const copy = document.createElement("div");
  copy.className = "ticker-copy";
  const headline = document.createElement("strong");
  headline.textContent = leader ? uiText("leaderHeadline", leader.name) : uiText("cityNews");
  const details = document.createElement("span");
  details.textContent = current
    ? `${uiText("tickerDetails", market.title, market.detail, current.name, ownedCount, topLevel)} / 地产${realEstateIndexLabel()} / 股票${stockIndexLabel()}`
    : uiText("tickerReady");
  copy.append(headline, details);

  const badge = document.createElement("span");
  badge.className = "ticker-badge";
  badge.textContent = state.market ? uiText("roundShort", state.market.turnsLeft) : (leader ? formatMoney(netWorth(leader)) : uiText("tickerReady"));

  cityTicker.append(icon, copy, badge);
}

function renderWorldMap() {
  worldMap.innerHTML = "";
  worldMap.style.setProperty("--map-zoom", String(state.mapZoom || 1));

  const controls = document.createElement("div");
  controls.className = "map-controls";
  const zoomOut = document.createElement("button");
  zoomOut.type = "button";
  zoomOut.dataset.mapAction = "zoom-out";
  zoomOut.textContent = "-";
  const zoomIn = document.createElement("button");
  zoomIn.type = "button";
  zoomIn.dataset.mapAction = "zoom-in";
  zoomIn.textContent = "+";
  const atlas = document.createElement("button");
  atlas.type = "button";
  atlas.dataset.mapAction = "atlas";
  atlas.textContent = "图鉴";
  controls.append(zoomOut, zoomIn, atlas);

	  const globe = document.createElement("div");
	  globe.className = "map-globe";
	  const current = currentPlayer();
	  globe.appendChild(renderOwnedRouteLines(current));
	  spaces.forEach((space, index) => {
    if (space.type !== "property") return;
    const point = document.createElement("button");
    point.type = "button";
    point.className = "map-point";
    if (state.owners[index]) point.classList.add("is-owned");
    if (current?.position === index) point.classList.add("is-current");
    point.dataset.mapIndex = String(index);
    point.title = `${spaceDisplayName(space)} / ${regionDisplayName(space.region)}`;
    point.style.setProperty("--x", `${cityMapPosition(index).x}%`);
    point.style.setProperty("--y", `${cityMapPosition(index).y}%`);
    point.style.setProperty("--point-color", space.color || "#d89921");
    globe.appendChild(point);
  });

  const caption = document.createElement("div");
  caption.className = "map-caption";
  caption.textContent = uiText("currentLocation", spaceDisplayName(current?.position || 0), Math.round((state.mapZoom || 1) * 100));
	  worldMap.append(controls, globe, caption);
	}

function renderOwnedRouteLines(player) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "map-routes");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  const nodes = (player ? ownedPropertyIndexes(player.id) : [])
    .filter((index) => {
      const space = spaces[index];
      return space?.type === "property" && (space.airport || space.coastal || space.specialty === "transit");
    })
    .slice(0, 8);
  for (let position = 0; position < nodes.length - 1; position += 1) {
    const start = cityMapPosition(nodes[position]);
    const end = cityMapPosition(nodes[position + 1]);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(start.x));
    line.setAttribute("y1", String(start.y));
    line.setAttribute("x2", String(end.x));
    line.setAttribute("y2", String(end.y));
    line.setAttribute("class", position % 2 ? "map-route-line route-trade" : "map-route-line route-flight");
    svg.appendChild(line);
  }
  return svg;
}

function cityMapPosition(index) {
  const space = spaces[index];
  const regionAnchors = {
    亚洲: [70, 43],
    欧洲: [51, 34],
    北美洲: [25, 38],
    南美洲: [35, 70],
    非洲: [52, 62],
    大洋洲: [78, 74],
    中东: [60, 50],
    欧亚: [58, 32],
  };
  const [baseX, baseY] = regionAnchors[space.region] || [50, 50];
  const wobbleX = ((index * 17) % 15) - 7;
  const wobbleY = ((index * 11) % 13) - 6;
  return {
    x: clamp(baseX + wobbleX, 8, 92),
    y: clamp(baseY + wobbleY, 14, 86),
  };
}

function handleWorldMapClick(event) {
  const action = event.target.closest("button[data-map-action]");
  if (action) {
    if (action.dataset.mapAction === "zoom-in") state.mapZoom = clamp((state.mapZoom || 1) + 0.15, 0.75, 1.8);
    if (action.dataset.mapAction === "zoom-out") state.mapZoom = clamp((state.mapZoom || 1) - 0.15, 0.75, 1.8);
    if (action.dataset.mapAction === "atlas") openEncyclopedia();
    render();
    return;
  }

  const point = event.target.closest("button[data-map-index]");
  if (point) openPropertyDialog(Number(point.dataset.mapIndex));
}

function renderAssets() {
  assetsPanel.innerHTML = "";
  const current = currentPlayer();

  if (!current || current.bankrupt) {
    appendPanelDrawer(assetsPanel, "panel:assets", "资产 / 升级", [emptyNote("暂无可显示资产。")], {
      icon: "home",
      meta: "暂无",
    });
    return;
  }

	  const owned = ownedPropertyIndexes(current.id);
	  if (owned.length === 0) {
	    appendPanelDrawer(assetsPanel, "panel:assets", `${current.name} 的资产`, [renderRecommendationCard(current), renderAssetOverview(current), renderRiskAlertCard(current), emptyNote("还没有地产。")], {
	      icon: "home",
	      meta: "0 座",
	    });
	    return;
	  }
	
	  const drawerChildren = [renderRecommendationCard(current), renderAssetOverview(current), renderRiskAlertCard(current)];

  const quickUpgrade = document.createElement("button");
  quickUpgrade.type = "button";
  quickUpgrade.className = "quick-upgrade";
  quickUpgrade.dataset.quickUpgrade = "best";
  const best = bestUpgradeIndex(current);
  quickUpgrade.textContent = best === null ? "暂无可升级城市" : `升级重点城市：${spaceDisplayName(best)}`;
  quickUpgrade.disabled = best === null;
  drawerChildren.push(quickUpgrade);

  const list = document.createElement("div");
  list.className = "asset-list";
  owned.forEach((index) => {
    const space = spaces[index];
    const item = document.createElement("article");
    item.className = "asset-item";
    item.style.setProperty("--asset-color", space.color || "#aebdca");

    const swatch = document.createElement("span");
    swatch.className = "asset-swatch";
    swatch.style.setProperty("--asset-color", space.color || "#aebdca");
    swatch.appendChild(createIcon(space.icon || "home", "asset-icon"));

    const copy = document.createElement("div");
    copy.className = "asset-copy";
    const serial = document.createElement("span");
    serial.className = "asset-card-number";
    serial.textContent = uiText("propertyCard", propertyCardNumber(index));
    const name = document.createElement("strong");
    name.textContent = spaceDisplayName(index);
    const details = document.createElement("p");
    details.textContent = assetDetails(index);
    copy.append(serial, name, details, renderPropertyUpgradeTrack(index, "asset-upgrade-track"));

    const actions = document.createElement("div");
    actions.className = "asset-actions";

    const upgradeAction = document.createElement("button");
    upgradeAction.type = "button";
    upgradeAction.dataset.upgradeIndex = String(index);
    upgradeAction.textContent = upgradeLabel(index);
    upgradeAction.disabled = !canCurrentPlayerUpgrade(index);

    const mortgageAction = document.createElement("button");
    mortgageAction.type = "button";
    mortgageAction.dataset.mortgageIndex = String(index);
    mortgageAction.textContent = state.mortgages[index] ? `赎回 ${redeemCost(index)}` : `抵押 ${mortgageValue(index)}`;
    mortgageAction.disabled = state.mortgages[index] ? !canRedeemCurrent(index) : !canMortgageCurrent(index);

    const ecoAction = document.createElement("button");
    ecoAction.type = "button";
    ecoAction.dataset.ecoIndex = String(index);
    ecoAction.textContent = ecoUpgradeLabel(index);
    ecoAction.disabled = !canEcoUpgrade(index);

    const hqAction = document.createElement("button");
    hqAction.type = "button";
    hqAction.dataset.hqIndex = String(index);
    hqAction.textContent = isHeadquarter(current.id, index) ? "总部" : "设总部";
    hqAction.disabled = !canSetHeadquarter(current, index) || isHeadquarter(current.id, index);

    actions.append(upgradeAction, mortgageAction, ecoAction, hqAction);
    item.append(swatch, copy, actions);
    list.appendChild(item);
  });
  drawerChildren.push(list);
  appendPanelDrawer(assetsPanel, "panel:assets", `${current.name} 的资产`, drawerChildren, {
    icon: "home",
    meta: `${owned.length} 座`,
  });
}

function renderDice() {
  dieOne.classList.toggle("rolling", Boolean(state.diceRolling));
  dieTwo.classList.toggle("rolling", Boolean(state.diceRolling));
  if (!state.lastRoll) {
    dieOne.textContent = "1";
    dieTwo.textContent = "1";
    diceTotal.textContent = uiText("diceWaiting");
    return;
  }
  dieOne.textContent = String(state.lastRoll.d1);
  dieTwo.textContent = String(state.lastRoll.d2);
  diceTotal.textContent = state.lastRoll.total > 0 ? uiText("diceTotal", state.lastRoll.total) : uiText("dicePaused");
}

function renderControls() {
  const current = currentPlayer();
  const isHumanTurn = Boolean(current && !current.isAI && !state.gameOver);
  const contractViewer = humanPlayer();
  const canBuy = isHumanTurn && state.phase === "decision" && state.pendingPurchase !== null;
  const canVenture = isHumanTurn && !current.ventureUsed && ["waiting", "decision", "shop", "ending"].includes(state.phase);
  const pendingPrice = canBuy ? propertyPrice(state.pendingPurchase) : 0;
  const bestUpgrade = isHumanTurn ? bestUpgradeIndex(current) : null;
  const canQuickUpgrade = bestUpgrade !== null && ["waiting", "shop", "ending"].includes(state.phase);
  const canRoll = isHumanTurn && state.phase === "waiting";
  const canEnd = isHumanTurn && ["ending", "shop"].includes(state.phase);
  const canBuyNow = canBuy && current.cash >= pendingPrice;
  const canViewContracts = Boolean(contractViewer && !state.gameOver);
  const coopOffers = contractViewer ? coopContractCandidates(contractViewer) : [];
  const signableCoopCount = contractViewer
    ? coopOffers.filter((offer) => canSignCoopContract(contractViewer, offer.index)).length
    : 0;
  const activeCoopCount = contractViewer
    ? coopContractsForPlayer(contractViewer).filter((contract) => contract.status === "active").length
    : 0;

  const nextAction = state.phase === "waiting"
    ? "roll"
    : state.phase === "decision"
      ? (canBuyNow ? "buy" : "decline")
      : canEnd
        ? "end"
        : "";

  setMainActionButton(contractButton, {
    label: signableCoopCount
      ? uiText("contractSignCount", signableCoopCount)
      : activeCoopCount
        ? uiText("contractActiveCount", activeCoopCount)
        : coopOffers.length
          ? uiText("contractOfferCount", coopOffers.length)
          : uiText("contractView"),
    disabled: !canViewContracts,
    reason: coopShortcutReason(contractViewer),
    tone: signableCoopCount ? "gain" : "move",
    next: false,
  });
  setMainActionButton(rollButton, {
    label: uiText("roll"),
    disabled: !canRoll,
    reason: mainActionReason("roll", current),
    tone: "move",
    next: nextAction === "roll",
  });
  setMainActionButton(buyButton, {
    label: canBuy ? uiText("buyCityPrice", formatMoney(pendingPrice)) : uiText("buyCity"),
    disabled: !canBuyNow,
    reason: mainActionReason("buy", current),
    tone: "buy",
    next: nextAction === "buy",
  });
  setMainActionButton(declineButton, {
    label: uiText("decline"),
    disabled: !canBuy,
    reason: mainActionReason("decline", current),
    tone: "danger",
    next: nextAction === "decline",
  });
  setMainActionButton(ventureButton, {
    label: uiText("venture"),
    disabled: !canVenture,
    reason: mainActionReason("venture", current),
    tone: "danger",
    next: false,
  });
  setMainActionButton(quickUpgradeButton, {
    label: bestUpgrade === null ? uiText("upgradeFocus") : uiText("upgradeCity", spaceDisplayName(bestUpgrade)),
    disabled: !canQuickUpgrade,
    reason: mainActionReason("upgrade", current, bestUpgrade),
    tone: "build",
    next: nextAction !== "roll" && nextAction !== "buy" && canQuickUpgrade,
  });
  setMainActionButton(endButton, {
    label: uiText("endTurn"),
    disabled: !canEnd,
    reason: mainActionReason("end", current),
    tone: "move",
    next: nextAction === "end",
  });
  syncMainActionDrawers(nextAction);
}

function openCoopPanelShortcut(target = "auto") {
  if (typeof target !== "string") target = "auto";
  const player = humanPlayer();
  if (!player || state.gameOver) return;
  const offers = coopContractCandidates(player);
  const activeContracts = coopContractsForPlayer(player).filter((contract) => contract.status === "active");
  const proposals = coopProposalsForPlayer(player).filter((proposal) => proposal.status === "pending");
  state.sidePanelMode = "coop";
  state.sidePanelCollapsed = false;
  state.drawerOpen = normalizeDrawerOpen({
    ...(state.drawerOpen || {}),
    "panel:coopDraft": target === "draft" || (target === "auto" && Boolean(offers.length)),
    "panel:coopContracts": true,
    "panel:coopProposals": target === "proposals" || Boolean(proposals.length),
    "panel:coopGuide": !offers.length && !activeContracts.length,
  });
  if (target === "proposals" || proposals.length) {
    state.status = `已打开合同提案：有 ${proposals.length} 个合同需要同意或等待对方同意。`;
  } else if (offers.length) {
    state.status = `已打开合作合同：有 ${offers.length} 个可签项目，点“签合同”即可合作分红。`;
  } else if (activeContracts.length) {
    state.status = `已打开合作合同：你有 ${activeContracts.length} 份合同正在分红。`;
  } else {
    state.status = `已打开合作合同：${coopShortcutReason(player)}`;
  }
  render();
}

function coopShortcutReason(player) {
  if (!player) return "没有可查看的玩家合同";
  if (state.gameOver) return uiText("gameOver");
  const opponentOwned = activePlayers()
    .filter((owner) => owner.id !== player.id)
    .flatMap((owner) => ownedPropertyIndexes(owner.id));
  if (!opponentOwned.length) return "对手还没有城市，暂时不能签合同";
  const available = opponentOwned.filter((index) => spaces[index]?.type === "property" && !state.mortgages[index]);
  if (!available.length) return "对手城市已抵押，不能签合同";
  const affordable = available.some((index) => player.cash >= coopUpfront(index));
  if (!affordable) return "现金不够付合作入场费";
  if (!businessDealsOpen(player)) return "点开可查看，行动阶段才能签约";
  return "打开合作面板";
}

function setMainActionButton(button, { label, disabled, reason, tone, next }) {
  button.disabled = disabled;
  button.dataset.tone = tone;
  button.classList.remove("primary-action");
  button.classList.toggle("is-next-action", Boolean(next && !disabled));
  button.classList.toggle("is-secondary-action", Boolean(!next && !disabled));
  button.title = disabled && reason ? reason : label;
  button.setAttribute("aria-label", disabled && reason ? `${label}：${reason}` : label);
  button.dataset.disabledReason = disabled && reason ? reason : "";

  const icon = button.querySelector("svg");
  button.replaceChildren();
  if (icon) button.appendChild(icon);
  const copy = document.createElement("span");
  copy.className = "button-copy";
  const text = document.createElement("strong");
  text.textContent = label;
  copy.appendChild(text);
  if (disabled && reason) {
    const small = document.createElement("small");
    small.textContent = reason;
    copy.appendChild(small);
  }
  button.appendChild(copy);
}

function mainActionReason(action, player, bestUpgrade = null) {
  if (!player || player.isAI) return uiText("waitAi");
  if (state.gameOver) return uiText("gameOver");
  if (state.phase === "moving") return uiText("moving");
  if (state.phase === "auction") return uiText("auctionActive");
  if (action === "roll") return state.phase === "waiting" ? "" : uiText("rollAfterTurn");
  if (action === "buy") {
    if (state.phase !== "decision" || state.pendingPurchase === null) return uiText("buyAfterLanding");
    const price = propertyPrice(state.pendingPurchase);
    return player.cash >= price ? "" : uiText("cashShort", formatMoney(price - player.cash));
  }
  if (action === "decline") return state.phase === "decision" ? "" : uiText("buyAvailable");
  if (action === "venture") {
    if (player.ventureUsed) return uiText("ventured");
    return ["waiting", "decision", "shop", "ending"].includes(state.phase) ? "" : uiText("phaseUnavailable");
  }
  if (action === "upgrade") {
    if (bestUpgrade === null) return ownedPropertyIndexes(player.id).length ? uiText("noUpgrade") : uiText("noCity");
    return ["waiting", "shop", "ending"].includes(state.phase) ? "" : uiText("noUpgradeDuringBuy");
  }
  if (action === "end") return ["ending", "shop"].includes(state.phase) ? "" : uiText("finishActionFirst");
  return "";
}

function renderTutorialPanel() {
  if (!tutorialPanel) return;
  const shouldShow = Boolean(state.config?.tutorialMode && state.tutorial && !state.winnerDialogDismissed);
  if (!shouldShow) {
    tutorialPanel.hidden = true;
    tutorialPanel.innerHTML = "";
    return;
  }

  tutorialPanel.hidden = false;
  tutorialPanel.innerHTML = "";

  const guide = tutorialGuideFor(currentPlayer());
  const header = document.createElement("div");
  header.className = "tutorial-panel-header";
  const titleWrap = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = tutorialText("panelEyebrow");
  const title = document.createElement("h3");
  title.textContent = tutorialText("panelTitle");
  titleWrap.append(eyebrow, title);
  const meta = document.createElement("div");
  meta.className = "tutorial-meta";
  const aiBadge = document.createElement("span");
  aiBadge.textContent = tutorialText("normalAi");
  const limitBadge = document.createElement("span");
  limitBadge.textContent = tutorialText("limitNote");
  meta.append(aiBadge, limitBadge);
  header.append(titleWrap, meta);

  const currentStep = document.createElement("article");
  currentStep.className = "tutorial-current";
  currentStep.dataset.focus = guide.focus || "";
  const stepLabel = document.createElement("span");
  stepLabel.textContent = tutorialText("currentStep");
  const stepTitle = document.createElement("strong");
  stepTitle.textContent = guide.title;
  const stepBody = document.createElement("p");
  stepBody.textContent = guide.body;
  currentStep.append(stepLabel, stepTitle, stepBody);

  const guideTitle = document.createElement("div");
  guideTitle.className = "section-title";
  guideTitle.textContent = tutorialText("buttonDictionary");

  const dictionary = document.createElement("div");
  dictionary.className = "tutorial-button-grid";
  tutorialButtonGuides.forEach((item) => {
    const card = document.createElement("article");
    card.className = "tutorial-button-card";
    card.dataset.tone = item.tone;
    card.classList.toggle("is-focus", guide.focus === item.id);
    const label = document.createElement("strong");
    label.textContent = localizedTutorialValue(item.label);
    const detail = document.createElement("span");
    detail.textContent = localizedTutorialValue(item.detail);
    card.append(label, detail);
    dictionary.appendChild(card);
  });

  const checklistTitle = document.createElement("div");
  checklistTitle.className = "section-title";
  checklistTitle.textContent = tutorialText("checklistTitle");

  const checklist = document.createElement("div");
  checklist.className = "tutorial-checklist";
  tutorialChecklistFor(state.players[0]).forEach((item) => {
    const row = document.createElement("span");
    row.className = item.done ? "is-done" : "";
    row.textContent = `${item.done ? "✓" : "○"} ${item.label}`;
    checklist.appendChild(row);
  });

  tutorialPanel.append(header, currentStep, guideTitle, dictionary, checklistTitle, checklist);
}

function tutorialGuideFor(player) {
  if (state.tutorial?.completed || state.gameOver) {
    return {
      focus: "end",
      title: tutorialText("completedTitle"),
      body: tutorialText("completedBody"),
    };
  }

  if (!player) {
    return {
      focus: "roll",
      title: tutorialText("finishGuideTitle"),
      body: tutorialText("finishGuideBody"),
    };
  }

  if (player.isAI) {
    return {
      focus: "auction",
      title: tutorialText("observeAiTitle"),
      body: tutorialText("observeAiBody"),
    };
  }

  if (state.phase === "waiting") {
    return localizedGuide("roll", {
      zh: "先掷骰前进",
      en: "Roll First",
      es: "Primero tira dados",
    }, {
      zh: "掷骰会让棋子移动。落到无人城市可以选择购买，落到别人城市可能要付租金。",
      en: "Rolling moves your token. Open cities can be bought; rival cities may charge rent.",
      es: "Los dados mueven tu ficha. Puedes comprar ciudades libres o pagar renta en ciudades rivales.",
    });
  }

  if (state.phase === "moving") {
    return localizedGuide("roll", {
      zh: "棋子正在移动",
      en: "Token Moving",
      es: "Ficha moviendo",
    }, {
      zh: "等动画停下后，系统会告诉你能买地、抽卡、付租金还是结束回合。",
      en: "Wait for the move to finish; then the game shows buying, cards, rent, or end-turn options.",
      es: "Espera a que termine; luego verás compra, cartas, renta o final de turno.",
    });
  }

  if (state.phase === "decision" && state.pendingPurchase !== null) {
    const city = spaceDisplayName(state.pendingPurchase);
    const price = formatMoney(propertyPrice(state.pendingPurchase));
    return localizedGuide("buy", {
      zh: `决定是否买下 ${city}`,
      en: `Decide on ${city}`,
      es: `Decide sobre ${city}`,
    }, {
      zh: `“买下这座城市”会花 ${price} 获得租金资产；“不买，进入拍卖”会让所有玩家竞价。`,
      en: `"Buy This City" spends ${price} to own a rent asset. "Skip, Start Auction" lets everyone bid.`,
      es: `"Comprar" cuesta ${price} y da renta. "Subasta" permite que todos pujen.`,
    });
  }

  if (state.phase === "auction") {
    return localizedGuide("auction", {
      zh: "拍卖正在进行",
      en: "Auction in Progress",
      es: "Subasta en curso",
    }, {
      zh: "出价能抢下城市，但要留现金付租金和升级。资金不够时可以退出竞价。",
      en: "Bid to win the city, but keep enough cash for rent and upgrades. Pass when the price is too high.",
      es: "Puja por la ciudad, pero guarda efectivo para renta y mejoras. Pasa si sube demasiado.",
    });
  }

  if (state.phase === "shop") {
    return localizedGuide("venture", {
      zh: "看看卡片商店",
      en: "Check the Card Shop",
      es: "Mira la tienda",
    }, {
      zh: "卡片能免租、控骰、飞行、抢地或防守。买完后按“结束本回合”。",
      en: "Cards can block rent, control dice, fly, buy fast, or defend. End the turn after shopping.",
      es: "Las cartas bloquean renta, controlan dados, vuelan o defienden. Termina turno al comprar.",
    });
  }

  if (state.phase === "ending") {
    const best = bestUpgradeIndex(player);
    if (best !== null) {
      return localizedGuide("upgrade", {
        zh: `可以升级 ${spaceDisplayName(best)}`,
        en: `Upgrade ${spaceDisplayName(best)}`,
        es: `Mejora ${spaceDisplayName(best)}`,
      }, {
        zh: "升级会提高租金、城市评级和股票热度。现金紧张时，也可以直接结束本回合。",
        en: "Upgrades raise rent, city rating, and stock heat. If cash is tight, you can end the turn.",
        es: "Mejorar sube renta, rating y acciones. Si falta efectivo, termina el turno.",
      });
    }
    return localizedGuide("end", {
      zh: "结束本回合",
      en: "End This Turn",
      es: "Termina turno",
    }, {
      zh: "当前行动已经处理完。按“结束本回合”把机会交给下一位玩家。",
      en: "Your actions are done. Press End Turn to pass play to the next player.",
      es: "Ya terminaste. Pulsa Fin para pasar al siguiente jugador.",
    });
  }

  return {
    focus: "end",
    title: tutorialText("finishGuideTitle"),
    body: tutorialText("finishGuideBody"),
  };
}

function localizedGuide(focus, title, body) {
  return {
    focus,
    title: localizedTutorialValue(title),
    body: localizedTutorialValue(body),
  };
}

function applyTutorialRewards() {
  if (!state.config?.tutorialMode || !state.tutorial) return;
  const player = state.players[0];
  if (!player || player.bankrupt) return;
  if (!state.tutorial.rewards || typeof state.tutorial.rewards !== "object") state.tutorial.rewards = {};
  tutorialChecklistFor(player).forEach((item) => {
    if (!item.done || state.tutorial.rewards[item.id]) return;
    const reward = TUTORIAL_REWARDS[item.id];
    if (!reward) return;
    state.tutorial.rewards[item.id] = true;
    player.cash += reward.cash;
    if (reward.card && player.cards.length < MAX_HAND_CARDS) player.cards.push(reward.card);
    awardSkillXp(player, 18, `教学章节 ${item.label}`);
    logEvent(`${player.name} 完成教学章节「${item.label}」，奖励 ${formatMoney(reward.cash)}${reward.card ? ` 和「${handCardDefinitions[reward.card].title}」` : ""}。`);
  });
}

function tutorialChecklistFor(player) {
  const owned = player ? ownedPropertyIndexes(player.id) : [];
  const finance = player ? financeFor(player) : createFinanceAccount();
  const checklistLabels = {
    roll: { zh: "掷一次骰", en: "Roll once", es: "Tirar dados" },
    buy: { zh: "拥有一座城市", en: "Own a city", es: "Tener ciudad" },
    auction: { zh: "见过一次拍卖", en: "See an auction", es: "Ver subasta" },
    card: { zh: "获得或使用卡片", en: "Get or use a card", es: "Usar carta" },
    upgrade: { zh: "升级一座城市", en: "Upgrade a city", es: "Mejorar ciudad" },
    bank: { zh: "理解银行/融资", en: "Use bank/finance", es: "Usar banco" },
    stock: { zh: "买股或做空", en: "Use stocks/shorts", es: "Acciones/corto" },
    finish: { zh: "完成一局", en: "Finish one game", es: "Terminar partida" },
  };
  const logText = state.log.map((entry) => entry.text).join(" ");
  return [
    { id: "roll", done: Boolean(state.lastRoll || state.round > 1) },
    { id: "buy", done: owned.length > 0 },
    { id: "auction", done: Boolean(player?.auctionWins > 0 || /拍卖|Auction|auction|Subasta|subasta/.test(logText)) },
    { id: "card", done: Boolean((player?.cardsUsed || 0) > 0 || player?.cards?.length > 0) },
    { id: "upgrade", done: Boolean((player?.upgradeCount || 0) > 0 || owned.some((index) => (state.levels[index] || 0) > 0)) },
    { id: "bank", done: Boolean((player?.debt || 0) > 0 || financingDebtTotal(player || {}) > 0 || finance.equityRaised > 0) },
    { id: "stock", done: Boolean(totalStockShares(player || {}) > 0 || totalShortLiability(player || {}) > 0) },
    { id: "finish", done: Boolean(state.gameOver || state.tutorial?.completed) },
  ].map((item) => ({
    ...item,
    label: localizedTutorialValue(checklistLabels[item.id]),
  }));
}

function updateMusicButton() {
  musicButton.classList.toggle("is-playing", musicState.isPlaying);
  musicButton.setAttribute("aria-pressed", String(musicState.isPlaying));
  musicButton.setAttribute("aria-label", musicState.isPlaying ? uiText("musicAriaOn") : uiText("musicAriaOff"));
  musicButtonText.textContent = musicState.isPlaying ? uiText("musicOn") : uiText("musicOff");
  musicIcon.setAttribute("href", musicState.isPlaying ? "#icon-volume" : "#icon-muted");
}

async function toggleBackgroundMusic() {
  if (musicState.isPlaying) {
    stopBackgroundMusic();
    updateMusicButton();
    return;
  }

  try {
    await startBackgroundMusic();
  } catch {
    stopBackgroundMusic();
    state.status = "浏览器暂时没有允许音乐播放，请再点一次音乐按钮。";
    render();
  }
}

async function startBackgroundMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    await startFallbackMusic();
    return;
  }

  const audio = ensureMusicAudio();
  musicState.isPlaying = true;
  updateMusicButton();
  if (audio.state === "suspended") {
    await audio.resume();
  }

  musicState.nextStart = audio.currentTime + 0.06;
  musicState.master.gain.cancelScheduledValues(audio.currentTime);
  musicState.master.gain.setValueAtTime(0, audio.currentTime);
  musicState.master.gain.linearRampToValueAtTime(0.16, audio.currentTime + 0.18);
  scheduleBackgroundMusic();
  window.clearInterval(musicState.timer);
  musicState.timer = window.setInterval(scheduleBackgroundMusic, 240);
  updateMusicButton();
}

function stopBackgroundMusic() {
  const audio = musicState.context;
  musicState.isPlaying = false;
  window.clearInterval(musicState.timer);

  if (musicState.fallbackAudio) {
    musicState.fallbackAudio.pause();
    musicState.fallbackAudio.currentTime = 0;
  }

  if (audio && musicState.master) {
    musicState.master.gain.cancelScheduledValues(audio.currentTime);
    musicState.master.gain.setTargetAtTime(0.0001, audio.currentTime, 0.025);
  }

  musicState.activeNodes.forEach((node) => {
    try {
      node.stop(0);
    } catch {
      // The node may already have stopped naturally.
    }
  });
  musicState.activeNodes.clear();
}

function playFx(type) {
  try {
    const audio = ensureMusicAudio();
    const now = audio.currentTime;
    const master = audio.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.linearRampToValueAtTime(0.08, now + 0.01);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    master.connect(audio.destination);

    const notes = {
      dice: [67, 72, 76],
      gain: [76, 83],
      pay: [55, 50],
      buy: [64, 71, 76],
      build: [60, 67, 72],
      victory: [60, 64, 67, 72],
      move: [62, 69],
    }[type] || [72];

    notes.forEach((note, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = now + index * 0.055;
      oscillator.type = type === "pay" ? "sawtooth" : "sine";
      oscillator.frequency.setValueAtTime(midiToFrequency(note), start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(start);
      oscillator.stop(start + 0.22);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    });

    window.setTimeout(() => master.disconnect(), 360);
  } catch {
    // Sound effects are optional and should never interrupt play.
  }
}

function ensureMusicAudio() {
  if (musicState.context) return musicState.context;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audio = new AudioContextClass();
  const master = audio.createGain();
  const compressor = audio.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-20, audio.currentTime);
  compressor.knee.setValueAtTime(18, audio.currentTime);
  compressor.ratio.setValueAtTime(5, audio.currentTime);
  compressor.attack.setValueAtTime(0.004, audio.currentTime);
  compressor.release.setValueAtTime(0.18, audio.currentTime);
  master.gain.setValueAtTime(0.0001, audio.currentTime);
  master.connect(compressor);
  compressor.connect(audio.destination);

  musicState.context = audio;
  musicState.master = master;
  return audio;
}

async function startFallbackMusic() {
  const audio = ensureFallbackMusicAudio();
  audio.currentTime = 0;
  musicState.isPlaying = true;
  updateMusicButton();

  try {
    await audio.play();
  } catch (error) {
    musicState.isPlaying = false;
    updateMusicButton();
    throw error;
  }
}

function ensureFallbackMusicAudio() {
  if (musicState.fallbackAudio) return musicState.fallbackAudio;

  const audio = new Audio();
  audio.src = createMusicWavUrl();
  audio.loop = true;
  audio.volume = 0.42;
  musicState.fallbackAudio = audio;
  return audio;
}

function scheduleBackgroundMusic() {
  const audio = musicState.context;
  if (!audio || !musicState.isPlaying) return;

  const beatSeconds = 60 / MUSIC_BPM;
  const loopSeconds = MUSIC_LOOP_BEATS * beatSeconds;
  if (musicState.nextStart < audio.currentTime) {
    musicState.nextStart = audio.currentTime + 0.04;
  }

  while (musicState.nextStart < audio.currentTime + MUSIC_LOOKAHEAD_SECONDS) {
    scheduleMusicLoop(musicState.nextStart, beatSeconds);
    musicState.nextStart += loopSeconds;
  }
}

function scheduleMusicLoop(loopStart, beatSeconds) {
  musicEvents.forEach((event) => {
    const start = loopStart + event.beat * beatSeconds;
    const duration = event.duration * beatSeconds;
    const notes = Array.isArray(event.note) ? event.note : [event.note];
    notes.forEach((note, index) => {
      playMusicTone({
        note,
        start,
        duration,
        instrument: event.instrument,
        velocity: event.velocity,
        detune: event.detune || index * 4,
      });
    });
  });
}

function playMusicTone({ note, start, duration, instrument, velocity = 0.8, detune = 0 }) {
  const frequency = midiToFrequency(note);
  if (instrument === "piano") {
    playOscillator(frequency, start, duration * 0.88, "triangle", 0.13 * velocity, detune - 5, 0.008, 0.08);
    playOscillator(frequency, start, duration * 0.78, "square", 0.018 * velocity, detune + 8, 0.004, 0.055);
    playOscillator(frequency * 2, start, duration * 0.55, "sine", 0.022 * velocity, detune, 0.004, 0.04);
    return;
  }

  if (instrument === "xylophone") {
    playOscillator(frequency, start, duration, "sine", 0.14 * velocity, detune, 0.002, 0.045);
    playOscillator(frequency * 2.01, start, duration * 0.65, "triangle", 0.038 * velocity, detune, 0.001, 0.035);
    return;
  }

  if (instrument === "coin") {
    playOscillator(frequency, start, duration, "sine", 0.12 * velocity, detune, 0.001, 0.025);
    playOscillator(frequency * 1.51, start + 0.018, duration * 0.72, "sine", 0.07 * velocity, detune, 0.001, 0.02);
    return;
  }

  playOscillator(frequency, start, duration, "triangle", 0.07 * velocity, detune, 0.01, 0.12);
}

function playOscillator(frequency, start, duration, type, gainValue, detune, attack, release) {
  const audio = musicState.context;
  if (!audio || !musicState.master) return;

  const oscillator = audio.createOscillator();
  const envelope = audio.createGain();
  const end = start + duration + release;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.detune.setValueAtTime(detune, start);
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.linearRampToValueAtTime(gainValue, start + attack);
  envelope.gain.exponentialRampToValueAtTime(0.0001, Math.max(start + attack + 0.01, start + duration));

  oscillator.connect(envelope);
  envelope.connect(musicState.master);
  oscillator.start(start);
  oscillator.stop(end);
  musicState.activeNodes.add(oscillator);
  oscillator.onended = () => {
    musicState.activeNodes.delete(oscillator);
    oscillator.disconnect();
    envelope.disconnect();
  };
}

function midiToFrequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function createMusicWavUrl() {
  if (musicState.fallbackUrl) return musicState.fallbackUrl;

  const sampleRate = 22050;
  const beatSeconds = 60 / MUSIC_BPM;
  const totalSamples = Math.floor(MUSIC_LOOP_BEATS * beatSeconds * sampleRate);
  const samples = new Float32Array(totalSamples);

  musicEvents.forEach((event) => {
    const notes = Array.isArray(event.note) ? event.note : [event.note];
    notes.forEach((note, index) => {
      renderFallbackTone(samples, {
        note,
        startSample: Math.floor(event.beat * beatSeconds * sampleRate),
        sampleCount: Math.max(1, Math.floor(event.duration * beatSeconds * sampleRate)),
        sampleRate,
        instrument: event.instrument,
        velocity: event.velocity,
        detune: event.detune || index * 4,
      });
    });
  });

  let peak = 0;
  samples.forEach((sample) => {
    peak = Math.max(peak, Math.abs(sample));
  });
  const scale = peak > 0.95 ? 0.95 / peak : 1;
  const wav = encodeWav(samples, sampleRate, scale);
  musicState.fallbackUrl = URL.createObjectURL(new Blob([wav], { type: "audio/wav" }));
  return musicState.fallbackUrl;
}

function renderFallbackTone(samples, options) {
  const { note, startSample, sampleCount, sampleRate, instrument, velocity = 0.8, detune = 0 } = options;
  const frequency = midiToFrequency(note) * 2 ** (detune / 1200);
  const gainMap = {
    piano: 0.22,
    xylophone: 0.24,
    coin: 0.2,
    bass: 0.13,
  };
  const gain = (gainMap[instrument] || 0.16) * velocity;
  const attackSamples = Math.max(1, Math.floor(sampleRate * (instrument === "bass" ? 0.012 : 0.004)));
  const endSample = Math.min(samples.length, startSample + sampleCount);

  for (let i = startSample; i < endSample; i += 1) {
    const age = i - startSample;
    const t = age / sampleRate;
    const progress = age / sampleCount;
    const attack = Math.min(1, age / attackSamples);
    const decayPower = instrument === "xylophone" || instrument === "coin" ? 2.8 : 1.35;
    const envelope = attack * (1 - progress) ** decayPower;
    const phase = Math.PI * 2 * frequency * t;
    let value = Math.sin(phase);

    if (instrument === "piano") {
      value = triangleWave(phase) * 0.74 + squareWave(phase * 1.003) * 0.12 + Math.sin(phase * 2) * 0.14;
    } else if (instrument === "xylophone") {
      value = Math.sin(phase) * 0.78 + triangleWave(phase * 2.01) * 0.22;
    } else if (instrument === "coin") {
      value = Math.sin(phase) * 0.66 + Math.sin(phase * 1.51) * 0.34;
    } else if (instrument === "bass") {
      value = Math.sin(phase) * 0.8 + triangleWave(phase) * 0.2;
    }

    samples[i] += value * envelope * gain;
  }
}

function triangleWave(phase) {
  return (2 * Math.asin(Math.sin(phase))) / Math.PI;
}

function squareWave(phase) {
  return Math.sin(phase) >= 0 ? 1 : -1;
}

function encodeWav(samples, sampleRate, scale) {
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample;
  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  const view = new DataView(buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, samples.length * bytesPerSample, true);

  let offset = 44;
  samples.forEach((sample) => {
    const clamped = Math.max(-1, Math.min(1, sample * scale));
    view.setInt16(offset, Math.round(clamped * 32767), true);
    offset += bytesPerSample;
  });

  return buffer;
}

function writeAscii(view, offset, text) {
  for (let i = 0; i < text.length; i += 1) {
    view.setUint8(offset + i, text.charCodeAt(i));
  }
}

function showEventBurst(label, tone = "gain") {
  if (!effectsLayer) return;
  playFx(tone);

  const burst = document.createElement("div");
  burst.className = `event-burst event-burst-${tone}`;

  const tag = document.createElement("span");
  tag.className = "burst-label";
  tag.textContent = label;
  burst.appendChild(tag);

  const coinCount = tone === "pay" ? 4 : 8;
  for (let index = 0; index < coinCount; index += 1) {
    const coin = document.createElement("span");
    coin.className = "burst-coin";
    coin.style.setProperty("--coin-x", `${Math.round((Math.random() - 0.5) * 220)}px`);
    coin.style.setProperty("--coin-y", `${Math.round(-60 - Math.random() * 120)}px`);
    coin.style.setProperty("--coin-r", `${Math.round((Math.random() - 0.5) * 180)}deg`);
    coin.style.animationDelay = `${index * 35}ms`;
    burst.appendChild(coin);
  }

  effectsLayer.appendChild(burst);
  window.setTimeout(() => burst.remove(), 1600);
}

function showContractAnimation(title, detail, tone = "deal") {
  if (!effectsLayer) return;
  const contract = document.createElement("div");
  contract.className = `contract-animation contract-${tone}`;
  const heading = document.createElement("strong");
  heading.textContent = title;
  const body = document.createElement("span");
  body.textContent = detail;
  const stamp = document.createElement("em");
  stamp.textContent = "已成交";
  contract.append(heading, body, stamp);
  effectsLayer.appendChild(contract);
  window.setTimeout(() => contract.remove(), 2200);
}

function showCardReveal(card, result, player) {
  if (!effectsLayer) return;

  effectsLayer.querySelectorAll(".card-reveal").forEach((item) => item.remove());
  const reveal = document.createElement("div");
  reveal.className = `card-reveal card-reveal-${card.tone || "gain"} rarity-${card.rarity || "common"}`;

  const cardFace = document.createElement("article");
  cardFace.className = "card-reveal-card";

  const top = document.createElement("div");
  top.className = "card-reveal-top";
  const icon = document.createElement("span");
  icon.className = "card-reveal-icon";
  icon.appendChild(createIcon(card.icon || "card", "card-reveal-svg"));
  const label = document.createElement("span");
  label.textContent = `${card.category || "机会卡"} / ${rarityLabel(card.rarity)}`;
  top.append(icon, label);

  const title = document.createElement("strong");
  title.textContent = card.title;

  const description = document.createElement("p");
  description.textContent = card.description || result;

  const footer = document.createElement("small");
  footer.textContent = `${player.name}：${result}`;

  cardFace.append(top, title, description, footer);
  reveal.appendChild(cardFace);
  effectsLayer.appendChild(reveal);
  window.setTimeout(() => reveal.remove(), 2600);
}

function showLiquidationReport(report) {
  if (!effectsLayer) return;
  const panel = document.createElement("article");
  panel.className = "liquidation-report";
  const title = document.createElement("strong");
  title.textContent = `${report.player} 破产清算`;
  const reason = document.createElement("span");
  reason.textContent = report.reason;
  const detail = document.createElement("p");
  detail.textContent = report.released.length > 0 ? `释放资产：${report.released.join("、")}` : "没有可释放资产";
  panel.append(title, reason, detail);
  effectsLayer.appendChild(panel);
  window.setTimeout(() => panel.remove(), 3600);
}

function createMusicEvents() {
  const events = [];
  const pianoNotes = [60, 64, 67, 72, 67, 64, 60, 67];
  pianoNotes.forEach((note, index) => {
    events.push({
      instrument: "piano",
      note,
      beat: index * 0.5,
      duration: 0.25,
      velocity: 0.9,
    });
  });

  const xylophoneNotes = [60, 62, 64, 65, 67, 69, 71, 72];
  xylophoneNotes.forEach((note, index) => {
    const beat = 4 + index * 0.42;
    events.push({
      instrument: "xylophone",
      note,
      beat,
      duration: 0.22,
      velocity: 0.9,
    });

    if (index % 2 === 0) {
      events.push({
        instrument: "coin",
        note: 83,
        beat: beat + 0.23,
        duration: 0.18,
        velocity: 0.82,
      });
    }
  });

  [
    { note: [48, 55], beat: 0 },
    { note: [43, 55], beat: 2 },
    { note: [41, 53], beat: 4 },
    { note: [43, 55], beat: 6 },
  ].forEach((event) => {
    events.push({
      instrument: "bass",
      note: event.note,
      beat: event.beat,
      duration: 0.7,
      velocity: 0.5,
    });
  });

  return events.sort((a, b) => a.beat - b.beat);
}

function renderLog() {
  eventLog.innerHTML = "";
  state.log.slice(0, 40).forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `第 ${entry.round} 轮：${entry.text}`;
    eventLog.appendChild(item);
  });
}

function renderWinnerDialog() {
  if (!winnerDialog || !winnerSummary || !winnerTitle) return;
  if (!state.gameOver) {
    if (winnerDialog.open) winnerDialog.close();
    return;
  }

  const ranking = [...state.players].sort((a, b) => netWorth(b) - netWorth(a));
  const winner = ranking[0];
  const winnerOwned = ownedPropertyIndexes(winner.id);
  const bestProperty = winnerOwned
    .map((index) => ({ index, rent: calculateRent(index, 7) }))
    .sort((a, b) => b.rent - a.rent)[0];

  winnerTitle.textContent = `${winner.name} 获胜`;
  winnerSummary.innerHTML = "";

  const stats = document.createElement("div");
  stats.className = "winner-stats";
  stats.append(
    createWinnerStat("总身价", formatMoney(netWorth(winner))),
    createWinnerStat("现金", formatMoney(winner.cash)),
    createWinnerStat("地产", `${winnerOwned.length} 块`),
    createWinnerStat("王牌地块", bestProperty ? spaces[bestProperty.index].name : "暂无"),
  );

  const list = document.createElement("ol");
  list.className = "winner-ranking";
  ranking.forEach((player, index) => {
    const item = document.createElement("li");
    const name = document.createElement("strong");
    name.textContent = `${index + 1}. ${player.name}`;
    const details = document.createElement("span");
    details.textContent = `${formatMoney(netWorth(player))} / 地产 ${ownedPropertyIndexes(player.id).length} 块${player.bankrupt ? " / 已破产" : ""}`;
    item.append(name, details);
    list.appendChild(item);
  });

  winnerSummary.append(stats, renderSettlementPoster(winner, bestProperty));
  if (state.config?.tutorialMode && state.tutorial?.completed) {
    const tutorialDone = document.createElement("article");
    tutorialDone.className = "tutorial-complete-card";
    const doneTitle = document.createElement("strong");
    doneTitle.textContent = tutorialText("completedTitle");
    const doneBody = document.createElement("span");
    doneBody.textContent = tutorialText("completedBody");
    tutorialDone.append(doneTitle, doneBody);
    winnerSummary.appendChild(tutorialDone);
  }
  winnerSummary.appendChild(list);
  if (!state.winnerDialogDismissed && !winnerDialog.open && typeof winnerDialog.showModal === "function") {
    winnerDialog.showModal();
  }
}

function rollCurrentTurn(isAuto) {
  const player = currentPlayer();
  if (!player || state.gameOver || state.phase !== "waiting") return;

  if (player.skipMove) {
    player.skipMove = false;
    state.lastRoll = { d1: "-", d2: "-", total: 0 };
    state.phase = "ending";
    state.status = uiText("holdPosition", player.name);
    logEvent(`${player.name} 使用停留卡，原地停留。`);
    showEventBurst("停留卡生效", "build");
    render();
    return;
  }

  if (player.skipTurns > 0) {
    player.skipTurns -= 1;
    state.lastRoll = { d1: "-", d2: "-", total: 0 };
    state.phase = "ending";
    state.status = uiText("pauseRest", player.name);
    logEvent(`${player.name} 暂停一轮。`);
    render();
    return;
  }

  const forcedRoll = Number(player.forcedRoll) || 0;
  const d1 = forcedRoll ? Math.floor(forcedRoll / 2) : rollDie();
  const d2 = forcedRoll ? forcedRoll - d1 : rollDie();
  player.forcedRoll = 0;
  const total = d1 + d2;
  state.lastRoll = { d1: "?", d2: "?", total: 0 };
  state.phase = "moving";
  state.diceRolling = true;
  state.status = forcedRoll
    ? uiText("remoteRoll", player.name, total)
    : uiText("rollingMove", player.name, d1, d2, total);
  playFx("dice");
  render();
  animateDiceRoll(d1, d2, total, () => {
    animateMovePlayer(player, total, () => {
      logEvent(`${player.name} 掷出 ${d1}+${d2}，移动 ${total} 格到 ${spaceDisplayName(player.position)}。`);
      resolveLanding(player, total, isAuto);

      if (isAuto && !state.gameOver && state.phase === "ending") {
        autoUseCards(player);
        autoInvest(player);
        autoUpgrade(player);
      }

      render();
    });
  });
}

function resolveLanding(player, rollTotal, isAuto) {
  const index = player.position;
  const space = spaces[index];
  recordRegionVisit(player, space);

  if (space.type === "property") {
    triggerCityStoryEvent(player, index);
    const ownerId = state.owners[index];
    if (!ownerId) {
      const price = propertyPrice(index);
      if (player.cash < price) {
        state.phase = "ending";
        state.status = uiText("noCashBuyStatus", player.name, spaceDisplayName(index));
        logEvent(`${player.name} 无法购买 ${space.name}。`);
        return;
      }

      if (isAuto) {
        if (shouldAIBuy(player, index)) {
          purchaseProperty(player, index);
          state.phase = "ending";
          state.status = uiText("reachedStatus", player.name, spaceDisplayName(index));
        } else {
          logEvent(`${player.name} 放弃购买 ${spaceDisplayName(index)}。`);
          startAuction(index, player);
        }
        return;
      }

      state.pendingPurchase = index;
      state.phase = "decision";
      state.status = uiText("unownedMarketStatus", spaceDisplayName(index), formatMoney(price));
      return;
    }

    if (ownerId === player.id) {
      const visitMessage = applyOwnedCityVisit(player, index);
      state.phase = "ending";
      state.status = visitMessage || uiText("ownVisitStatus", player.name, spaceDisplayName(index));
      return;
    }

    const owner = playerById(ownerId);
    if (state.mortgages[index]) {
      state.phase = "ending";
      state.status = uiText("mortgagedStatus", spaceDisplayName(index));
      logEvent(`${player.name} 踩到已抵押的 ${spaceDisplayName(index)}，无需支付租金。`);
      return;
    }
    const rent = calculateRent(index, rollTotal);
    const payment = payPlayer(player, owner, rent, `${space.name} 租金`);
    if (!payment.waived) recordRent(index, payment.paid, player, owner);
    if (state.gameOver) return;
    state.phase = "ending";
    state.status = payment.waived
      ? uiText("rentWaivedStatus", player.name, spaceDisplayName(index), formatMoney(rent))
      : uiText("rentPaidStatus", player.name, owner.name, formatMoney(rent));
    return;
  }

  if (space.type === "tax") {
    payBank(player, space.amount, space.name);
    if (state.gameOver) return;
    state.phase = "ending";
    state.status = uiText("taxPaidStatus", player.name, formatMoney(space.amount));
    return;
  }

  if (space.type === "bonus") {
    player.cash += space.amount;
    state.phase = "ending";
    state.status = uiText("bonusStatus", player.name, formatMoney(space.amount));
    logEvent(`${player.name} 在 ${space.name} 收到 ${space.amount} 现金。`);
    showEventBurst(`+${formatMoney(space.amount)} 奖励`, "gain");
    return;
  }

  if (space.type === "shop") {
    if (isAuto) {
      autoShop(player);
      state.phase = "ending";
    } else {
      state.phase = "shop";
      state.status = uiText("shopStatus", player.name);
      logEvent(`${player.name} 到达道具商店。`);
    }
    return;
  }

  if (space.type === "chance") {
    drawChance(player);
    if (state.gameOver) return;
    state.phase = "ending";
    return;
  }

  if (space.type === "gotoJail") {
    const oldPosition = player.position;
    sendToPause(player);
    state.phase = "ending";
    state.status = player.position === oldPosition
      ? uiText("pauseBlockedStatus", player.name)
      : uiText("goPauseStatus", player.name);
    if (player.position !== oldPosition) logEvent(`${player.name} 被送往暂停区。`);
    return;
  }

  if (space.type === "start") {
    player.cash += LANDING_START_BONUS;
    state.phase = "ending";
    state.status = uiText("startBonusStatus", player.name);
    logEvent(`${player.name} 停在起点领取 100 现金。`);
    showEventBurst("+¥100 起点奖励", "gain");
    return;
  }

  state.phase = "ending";
    state.status = uiText("reachedStatus", player.name, spaceDisplayName(index));
}

function buyPendingProperty() {
  const player = currentPlayer();
  if (!player || player.isAI || state.phase !== "decision" || state.pendingPurchase === null) return;
  purchaseProperty(player, state.pendingPurchase);
  state.pendingPurchase = null;
  state.phase = "ending";
  render();
}

function declinePendingProperty() {
  const player = currentPlayer();
  if (!player || player.isAI || state.phase !== "decision" || state.pendingPurchase === null) return;
  const space = spaces[state.pendingPurchase];
  logEvent(`${player.name} 放弃购买 ${spaceDisplayName(state.pendingPurchase)}。`);
  startAuction(state.pendingPurchase, player);
  render();
}

function purchaseProperty(player, index) {
  const space = spaces[index];
  const price = propertyPrice(index);
  if (state.owners[index] || player.cash < price) return false;
  player.cash -= price;
  state.owners[index] = player.id;
  recordCityCollection(player, index);
  awardSkillXp(player, 22, `${spaceDisplayName(index)} 买入`);
  logEvent(`${player.name} 购买 ${spaceDisplayName(index)}，花费 ${price} 现金。`);
  state.status = uiText("boughtStatus", player.name, spaceDisplayName(index));
	  addNews("城市成交", `${player.name} 买下 ${spaceDisplayName(index)}，${groupLabel(space.group)}竞争升温。`, "deal");
	  showEventBurst(`${player.name} 买下 ${spaceDisplayName(index)}`, "buy");
	  showContractAnimation("签约成交", `${spaceDisplayName(index)} / ${formatMoney(price)}`, "buy");
	  flashTile(index, "buy");
  unlockAchievement("firstPurchase");
  checkTasks(player);
  return true;
}

function endTurn() {
  if (state.gameOver || state.phase === "decision") return;
  advanceToNextPlayer();
  const player = currentPlayer();
  state.pendingPurchase = null;
  state.phase = "waiting";
  state.status = uiText("readyStatus", player.name);
  render();
}

function handleAssetClick(event) {
  const advisorButton = event.target.closest("button[data-advisor-action]");
  if (advisorButton) {
    executeAdvisorAction(advisorButton.dataset.advisorAction);
    return;
  }

  const quickButton = event.target.closest("button[data-quick-upgrade]");
  if (quickButton) {
    const index = bestUpgradeIndex(currentPlayer());
    if (index !== null) upgradeProperty(index);
    return;
  }

  const upgradeButton = event.target.closest("button[data-upgrade-index]");
  if (upgradeButton) {
    upgradeProperty(Number(upgradeButton.dataset.upgradeIndex));
    return;
  }
  const mortgageButton = event.target.closest("button[data-mortgage-index]");
  if (mortgageButton) {
    toggleMortgage(Number(mortgageButton.dataset.mortgageIndex));
    return;
  }

  const ecoButton = event.target.closest("button[data-eco-index]");
  if (ecoButton) {
    ecoUpgrade(Number(ecoButton.dataset.ecoIndex));
    return;
  }

  const hqButton = event.target.closest("button[data-hq-index]");
  if (hqButton) {
    setHeadquarter(Number(hqButton.dataset.hqIndex));
  }
}

function handleBoardClick(event) {
  const tile = event.target.closest(".tile");
  if (!tile || !boardEl.contains(tile)) return;
  const index = Number(tile.dataset.index);
  if (!Number.isInteger(index) || spaces[index]?.type !== "property") return;
  openPropertyDialog(index);
}

function openPropertyDialog(index) {
  if (!propertyDialog || !propertyDialogBody || spaces[index]?.type !== "property") return;
  state.selectedPropertyIndex = index;
  renderPropertyDialog(index);
  if (typeof propertyDialog.showModal === "function") {
    propertyDialog.showModal();
  } else {
    propertyDialog.setAttribute("open", "");
  }
}

function renderPropertyDialog(index) {
  propertyDialogBody.innerHTML = "";
  propertyDialogBody.appendChild(createPropertyShowcase(index));
}

function openEncyclopedia() {
  renderEncyclopedia();
  unlockAchievement("atlasOpened");
  if (typeof encyclopediaDialog.showModal === "function") {
    encyclopediaDialog.showModal();
  } else {
    encyclopediaDialog.setAttribute("open", "");
  }
}

function renderEncyclopedia() {
  encyclopediaBody.innerHTML = "";
  const query = String(state.atlasSearch || "").trim().toLowerCase();
  const tools = document.createElement("div");
  tools.className = "encyclopedia-tools";
  const search = document.createElement("input");
  search.type = "search";
  search.dataset.atlasSearch = "true";
  search.placeholder = "搜索城市、洲、地标或产业";
  search.value = state.atlasSearch || "";
  tools.appendChild(search);
  const count = document.createElement("span");
  const list = document.createElement("div");
  list.className = "encyclopedia-list";
  let visibleCount = 0;
  spaces.forEach((space, index) => {
    const haystack = [
      space.name,
      space.region,
      space.group,
      space.rareBadge,
      space.specialty,
      space.story,
      citySpecialtyDefinitions[space.specialty]?.label,
    ].filter(Boolean).join(" ").toLowerCase();
    if (query && !haystack.includes(query)) return;
    visibleCount += 1;
    const item = document.createElement("button");
    item.type = "button";
    item.className = space.type === "property" ? "encyclopedia-city" : "encyclopedia-city is-special";
    item.style.setProperty("--city-color", space.color || tileAccentColor(space.type));
    if (space.type === "property") {
      item.dataset.openProperty = String(index);
      item.innerHTML = `
        <span class="encyclopedia-swatch"></span>
        <strong>${String(index + 1).padStart(2, "0")} ${space.name}</strong>
        <small>${regionDisplayName(space.region)} / ${cityRating(index)}级 / ${rareBadgeLabel(space.rareBadge)} / ${state.cityCollection?.includes(index) ? "已收藏" : "未收藏"}</small>
        <em>股价 ${formatMoney(stockPrice(index))} / 公司 ${companySummary(index)} / ${state.cityPublic?.[index] ? "已IPO" : "未IPO"}</em>
      `;
    } else {
      item.setAttribute("aria-disabled", "true");
      item.innerHTML = `
        <span class="encyclopedia-swatch"></span>
        <strong>${String(index + 1).padStart(2, "0")} ${space.name}</strong>
        <small>${currentTileBadge(index)} / ${tileDetail(index)}</small>
        <em>特殊地点会改变移动、市场、现金或手牌节奏。</em>
      `;
    }
    list.appendChild(item);
  });
  count.textContent = `${visibleCount}/100`;
  tools.appendChild(count);
  encyclopediaBody.append(tools, list.children.length ? list : emptyNote("没有找到匹配城市。"));
}

function handlePropertyDialogClick(event) {
  const actionButton = event.target.closest("button[data-property-action]");
  if (actionButton) {
    const index = Number(actionButton.dataset.propertyIndex);
    if (actionButton.dataset.propertyAction === "upgrade") upgradeProperty(index);
    if (actionButton.dataset.propertyAction === "eco") ecoUpgrade(index);
    if (actionButton.dataset.propertyAction === "mortgage") toggleMortgage(index);
    if (actionButton.dataset.propertyAction === "funding") raiseCapital(index);
    if (actionButton.dataset.propertyAction === "hq") setHeadquarter(index);
    if (actionButton.dataset.propertyAction === "company") buildCityCompany(index, actionButton.dataset.companyType);
    if (actionButton.dataset.propertyAction === "ipo") launchCityIpo(index);
    if (actionButton.dataset.propertyAction === "stockTakeover") executeStockTakeover(index);
    if (actionButton.dataset.propertyAction === "boardVote") boardVoteUpgrade(index);
    if (spaces[index]?.type === "property" && propertyDialog.open) renderPropertyDialog(index);
    return;
  }

  const button = event.target.closest("button[data-stock-action]");
  if (!button) return;
  const index = Number(button.dataset.stockIndex);
  if (button.dataset.stockAction === "buy") buyStock(index);
  if (button.dataset.stockAction === "sell") sellStock(index);
  if (button.dataset.stockAction === "short") shortSellStock(index);
  if (button.dataset.stockAction === "cover") coverShortStock(index);
}

function stockShares(player, index) {
  return Number(player?.stocks?.[index] || 0);
}

function stockLimitForCity(index) {
  return STOCK_MAX_PER_CITY + (state.cityPublic?.[index] ? IPO_STOCK_BONUS : 0);
}

function canBuyStock(player, index) {
  if (!player || player.isAI || player.bankrupt || state.gameOver) return false;
  if (spaces[index]?.type !== "property") return false;
  if (stockShares(player, index) >= stockLimitForCity(index)) return false;
  return player.cash >= stockPrice(index) * STOCK_BLOCK;
}

function canSellStock(player, index) {
  return Boolean(player && !player.isAI && stockShares(player, index) > 0);
}

function shortShares(player, index) {
  return Number(financeFor(player).shortPositions?.[index]?.shares || 0);
}

function canShortSell(player, index) {
  if (!player || player.isAI || player.bankrupt || state.gameOver) return false;
  if (spaces[index]?.type !== "property") return false;
  if (shortShares(player, index) >= SHORT_MAX_PER_CITY) return false;
  return shortBorrowCapacity(player) >= stockPrice(index) * SHORT_BLOCK;
}

function canCoverShort(player, index) {
  return Boolean(player && !player.isAI && shortShares(player, index) > 0 && player.cash >= stockPrice(index) * SHORT_BLOCK);
}

function buyStock(index) {
  const player = currentPlayer();
  if (!canBuyStock(player, index)) return;
  const price = stockPrice(index) * STOCK_BLOCK;
  player.cash -= price;
  player.stocks[index] = stockShares(player, index) + STOCK_BLOCK;
  awardSkillXp(player, 16, `${spaceDisplayName(index)} 股票`);
  state.status = `${player.name} 买入 ${spaces[index].name} 股票 ${STOCK_BLOCK} 股。`;
  logEvent(`${player.name} 买入 ${spaces[index].name} 股票，花费 ${price}。`);
  addNews("股票交易", `${player.name} 买入 ${spaceDisplayName(index)} 股票，市场热度上升。`, "market");
  showEventBurst(`${spaces[index].name} 股票`, "buy");
  unlockAchievement("stockInvestor");
  checkTasks(player);
  renderPropertyDialog(index);
  render();
}

function sellStock(index) {
  const player = currentPlayer();
  if (!canSellStock(player, index)) return;
  if (!confirmAction(`确定卖出 ${spaces[index].name} 股票吗？`)) return;
  const price = stockPrice(index) * STOCK_BLOCK;
  player.cash += price;
  player.stocks[index] = stockShares(player, index) - STOCK_BLOCK;
  if (player.stocks[index] <= 0) delete player.stocks[index];
  state.status = `${player.name} 卖出 ${spaces[index].name} 股票，获得 ${formatMoney(price)}。`;
  logEvent(`${player.name} 卖出 ${spaces[index].name} 股票。`);
  addNews("股票落袋", `${player.name} 卖出 ${spaceDisplayName(index)} 股票，兑现 ${formatMoney(price)}。`, "market");
  showEventBurst(`+${formatMoney(price)} 股票`, "gain");
  checkTasks(player);
  renderPropertyDialog(index);
  render();
}

function shortSellStock(index) {
  const player = currentPlayer();
  if (!canShortSell(player, index)) return;
  if (!confirmAction(`确定借空 ${spaces[index].name} 股票吗？如果股价上涨，平空成本会变高。`)) return;
  const proceeds = stockPrice(index) * SHORT_BLOCK;
  const finance = financeFor(player);
  const position = finance.shortPositions[index] || { shares: 0, entryPrice: 0 };
  position.entryPrice = Math.round(((position.entryPrice * position.shares) + proceeds) / (position.shares + SHORT_BLOCK));
  position.shares += SHORT_BLOCK;
  finance.shortPositions[index] = position;
  player.cash += proceeds;
  state.status = `${player.name} 借空 ${spaces[index].name} ${SHORT_BLOCK} 股，获得 ${formatMoney(proceeds)}。`;
  logEvent(`${player.name} 借空 ${spaces[index].name} 股票，入账 ${proceeds}。`);
  addNews("借空交易", `${player.name} 做空 ${spaceDisplayName(index)}，借空利率 ${Math.round(shortBorrowRate(player, index) * 1000) / 10}%。`, "debt");
  logDeal("借空交易", `${player.name} 做空 ${spaceDisplayName(index)}`, proceeds, "short");
  logBank("借空入账", `${spaceDisplayName(index)} ${SHORT_BLOCK} 股`, proceeds, "short");
  showEventBurst(`+${formatMoney(proceeds)} 借空`, "gain");
  checkTasks(player);
  renderPropertyDialog(index);
  render();
}

function coverShortStock(index) {
  const player = currentPlayer();
  if (!canCoverShort(player, index)) return;
  const cost = stockPrice(index) * SHORT_BLOCK;
  const finance = financeFor(player);
  const position = finance.shortPositions[index];
  const entry = position.entryPrice || cost;
  const profit = entry - cost;
  player.cash -= cost;
  position.shares -= SHORT_BLOCK;
  if (position.shares <= 0) delete finance.shortPositions[index];
  state.status = `${player.name} 平空 ${spaces[index].name}，${profit >= 0 ? `盈利 ${formatMoney(profit)}` : `亏损 ${formatMoney(Math.abs(profit))}`}。`;
  logEvent(`${player.name} 平空 ${spaces[index].name}，成本 ${cost}。`);
  addNews("平空成交", `${player.name} 平掉 ${spaceDisplayName(index)} 空头，${profit >= 0 ? "获利" : "亏损"} ${formatMoney(Math.abs(profit))}。`, profit >= 0 ? "gain" : "debt");
  logDeal("平空成交", `${spaceDisplayName(index)} 空头了结`, Math.abs(profit), profit >= 0 ? "gain" : "debt");
  showEventBurst(`${profit >= 0 ? "+" : "-"}${formatMoney(Math.abs(profit))} 平空`, profit >= 0 ? "gain" : "pay");
  checkTasks(player);
  renderPropertyDialog(index);
  render();
}

function handleCardClick(event) {
  const actionButton = event.target.closest("button[data-player-action]");
  if (actionButton) {
    handlePlayerAction(actionButton.dataset.playerAction);
    return;
  }

  const button = event.target.closest("button[data-card-index]");
  if (!button) return;
  useCurrentCard(Number(button.dataset.cardIndex));
}

function handleAuctionClick(event) {
  const button = event.target.closest("button[data-auction-action]");
  if (!button || !canHumanActInAuction()) return;
  const bidder = currentAuctionBidder();

  if (button.dataset.auctionAction === "bid") {
    placeAuctionBid(bidder);
  } else {
    passAuction(bidder);
  }
}

function handleShopClick(event) {
  const button = event.target.closest("button[data-shop-card]");
  if (!button) return;
  buyShopCard(button.dataset.shopCard);
}

function handleSaveSlotClick(event) {
  const button = event.target.closest("button[data-slot-action]");
  if (!button) return;
  const slot = Number(button.dataset.slot);
  const action = button.dataset.slotAction;
  if (action === "save") saveSlot(slot);
  if (action === "load") loadSlotIntoGame(slot);
  if (action === "clear") clearSlot(slot);
}

function handleTradeClick(event) {
  const contractHubButton = event.target.closest("button[data-open-contracts]");
  if (contractHubButton) {
    openCoopPanelShortcut();
    return;
  }

  const advisorButton = event.target.closest("button[data-advisor-action]");
  if (advisorButton) {
    executeAdvisorAction(advisorButton.dataset.advisorAction);
    return;
  }

  const coopButton = event.target.closest("button[data-coop-action]");
  if (coopButton) {
    if (coopButton.dataset.coopAction === "draft") openCoopContractDraft();
    if (coopButton.dataset.coopAction === "viewProposals") openCoopPanelShortcut("proposals");
    if (coopButton.dataset.coopAction === "sign") signCoopContract(Number(coopButton.dataset.coopIndex));
    if (coopButton.dataset.coopAction === "terminate") terminateCoopContract(coopButton.dataset.coopId);
    if (coopButton.dataset.coopAction === "renew") renewCoopContract(coopButton.dataset.coopId);
    if (coopButton.dataset.coopAction === "acceptProposal") acceptCoopProposal(coopButton.dataset.proposalId);
    if (coopButton.dataset.coopAction === "declineProposal") declineCoopProposal(coopButton.dataset.proposalId);
    return;
  }

  const negotiationButton = event.target.closest("button[data-negotiation-action]");
  if (negotiationButton) {
    handleNegotiationAction(negotiationButton.dataset.negotiationAction);
    return;
  }

  const dealButton = event.target.closest("button[data-deal-action]");
  if (dealButton) {
    executeBusinessDeal(dealButton.dataset.dealAction, Number(dealButton.dataset.dealIndex));
    return;
  }

  const cardButton = event.target.closest("button[data-trade-card-player]");
  if (cardButton) {
    offerCardTrade(cardButton.dataset.tradeCardPlayer);
    return;
  }
  const button = event.target.closest("button[data-trade-index]");
  if (!button) return;
  offerTrade(Number(button.dataset.tradeIndex));
}

function handleShareClick(event) {
  const button = event.target.closest("button[data-share-action]");
  if (!button) return;
  if (button.dataset.shareAction === "export") {
    state.shareCodePreview = encodeShareCode(state);
    render();
    return;
  }
  const code = window.prompt("粘贴分享码");
  if (!code) return;
  const imported = decodeShareCode(code);
  if (!imported) {
    state.status = "分享码无法识别。";
    render();
    return;
  }
  state = imported;
  state.status = "已导入分享码棋局。";
  render();
}

function handleWorldPanelClick(event) {
  const modeButton = event.target.closest("button[data-world-mode]");
  if (modeButton) {
    state.worldPanelMode = modeButton.dataset.worldMode;
    render();
    return;
  }

  const actionButton = event.target.closest("button[data-world-action]");
  if (actionButton?.dataset.worldAction === "open-atlas") {
    openEncyclopedia();
    return;
  }

  const propertyButton = event.target.closest("button[data-open-property]");
  if (propertyButton) {
    openPropertyDialog(Number(propertyButton.dataset.openProperty));
  }
}

function useVentureAction() {
  const player = currentPlayer();
  if (!player || player.isAI || player.ventureUsed || !["waiting", "decision", "shop", "ending"].includes(state.phase)) return;
  const event = shuffle(ventureEvents)[0];
  player.ventureUsed = true;
  const result = event.run(player);
  state.status = `${event.title}：${result}`;
  logEvent(result);
  showCardReveal({
    title: event.title,
    category: "冒险行动",
    icon: "spark",
    tone: event.tone,
    rarity: "rare",
    description: event.description,
  }, result, player);
  checkTasks(player);
  checkWinner();
  render();
}

function handlePlayerAction(action) {
  const player = currentPlayer();
  if (!player || player.isAI) return;
  if (action === "skill") useCharacterSkill(player);
  if (action === "loan") takeLoan(player);
  if (action === "repay") repayLoan(player);
}

function canUseCharacterSkill(player) {
  return Boolean(
    player &&
    !player.bankrupt &&
    !player.isAI &&
    !player.activeSkillUsed &&
    !state.gameOver &&
    ["waiting", "decision", "shop", "ending"].includes(state.phase),
  );
}

function characterSkillLabel(player) {
  const labels = {
    banker: `Lv.${characterLevel(player)} 银行授信`,
    builder: `Lv.${characterLevel(player)} 免费施工`,
    broker: `Lv.${characterLevel(player)} 抽取手牌`,
    landlord: `Lv.${characterLevel(player)} 强化收租`,
  };
  return player.activeSkillUsed ? "技能已用" : labels[player.character] || "角色技能";
}

function useCharacterSkill(player) {
  if (!canUseCharacterSkill(player)) return;
  player.activeSkillUsed = true;
  const skillBoost = skillLevelMultiplier(player);
  let result = "";

  if (player.character === "banker") {
    const cashGrant = Math.round(160 * skillBoost / 10) * 10;
    const debtPay = Math.min(player.debt || 0, Math.round(120 * skillBoost / 10) * 10);
    if (debtPay > 0) {
      player.debt -= debtPay;
      player.cash += Math.round(cashGrant * 0.55);
      result = `${player.name} 使用 Lv.${characterLevel(player)} 银行授信，获得现金并减免 ${debtPay} 贷款。`;
    } else {
      player.cash += cashGrant;
      result = `${player.name} 使用 Lv.${characterLevel(player)} 银行授信，获得 ${cashGrant} 现金。`;
    }
    showEventBurst(`+${formatMoney(cashGrant)} 银行授信`, "gain");
  } else if (player.character === "builder") {
    const target = bestUpgradeIndex(player);
    if (target === null) {
      const subsidy = Math.round(90 * skillBoost / 10) * 10;
      player.cash += subsidy;
      result = `${player.name} 暂无可施工城市，领取 ${subsidy} 施工补贴。`;
      showEventBurst(`+${formatMoney(subsidy)} 施工补贴`, "gain");
    } else {
      state.levels[target] += 1;
      player.upgradeCount += 1;
      addCityRevenue(target, Math.round(60 * skillBoost));
      result = `${player.name} 使用 Lv.${characterLevel(player)} 免费施工，${spaces[target].name} 升到 ${state.levels[target]} 级。`;
      showEventBurst(`${spaces[target].name} 免费施工`, "build");
      flashTile(target, "build");
      if (state.levels[target] >= MAX_LEVEL) unlockAchievement("maxLevelCity");
    }
  } else if (player.character === "broker") {
    const product = shuffle(shopCatalog)[0];
    result = grantPlayerCard(player, product.cardId);
    if (characterLevel(player) >= 3 && player.cards.length < MAX_HAND_CARDS) {
      const bonus = shuffle(shopCatalog)[0];
      grantPlayerCard(player, bonus.cardId);
      result += " 经纪人高阶技能额外补一张手牌。";
    }
  } else {
    player.rentSurge = true;
    if (characterLevel(player) >= 4) player.rentMirror = true;
    result = `${player.name} 启用 Lv.${characterLevel(player)} 地主号令，下一次收到租金强化${characterLevel(player) >= 4 ? "并附带反弹防守" : ""}。`;
    showEventBurst("租金强化已启用", "build");
  }

  awardSkillXp(player, 35, "主动技能");
  state.status = result;
  logEvent(result);
  checkTasks(player);
  render();
}

function quickUpgradeBestProperty() {
  const player = currentPlayer();
  const index = bestUpgradeIndex(player);
  if (index !== null && ["waiting", "shop", "ending"].includes(state.phase)) upgradeProperty(index);
}

function canTakeLoan(player) {
  return Boolean(
    player &&
    !player.bankrupt &&
    !player.isAI &&
    !state.gameOver &&
    ["waiting", "decision", "shop", "ending"].includes(state.phase) &&
    availableCredit(player) >= LOAN_REPAY_AMOUNT,
  );
}

function takeLoan(player) {
  if (!canTakeLoan(player)) return;
  player.cash += LOAN_AMOUNT;
  player.debt = (player.debt || 0) + LOAN_REPAY_AMOUNT;
  state.status = `${player.name} 从银行贷款 ${formatMoney(LOAN_AMOUNT)}，待还 ${formatMoney(player.debt)}。`;
  logEvent(`${player.name} 贷款 ${LOAN_AMOUNT}，债务增加到 ${player.debt}。`);
	  logBank("贷款到账", `${bankCardTier(player).label} 卡使用额度 ${formatMoney(LOAN_REPAY_AMOUNT)}`, LOAN_AMOUNT, "loan");
	  showEventBurst(`+${formatMoney(LOAN_AMOUNT)} 贷款`, "gain");
	  showContractAnimation("银行贷款", `${player.name} 获得 ${formatMoney(LOAN_AMOUNT)}，待还 ${formatMoney(player.debt)}`, "debt");
	  unlockAchievement("loanSurvivor");
  checkTasks(player);
  render();
}

function canRepayLoan(player) {
  return Boolean(player && !player.bankrupt && !player.isAI && player.debt > 0 && player.cash >= Math.min(player.debt, LOAN_REPAY_AMOUNT));
}

function repayLoan(player) {
  if (!canRepayLoan(player)) return;
  const amount = Math.min(player.debt, LOAN_REPAY_AMOUNT);
  const oldDebt = player.debt || 0;
  player.cash -= amount;
  player.debt -= amount;
  reduceFinanceDebtAfterRepayment(player, amount, oldDebt);
  state.status = `${player.name} 偿还贷款 ${formatMoney(amount)}。`;
  logEvent(`${player.name} 偿还贷款 ${amount}。`);
	  logBank("主动还款", `${player.name} 降低风险指数`, amount, "repay");
	  showEventBurst(`-${formatMoney(amount)} 还款`, "pay");
	  showContractAnimation("还款凭证", `${player.name} 偿还 ${formatMoney(amount)}，风险下降`, "equity");
	  checkTasks(player);
  render();
}

function reduceFinanceDebtAfterRepayment(player, amount, oldDebt) {
  const finance = financeFor(player);
  const genericDebt = Math.max(0, oldDebt - financingDebtTotal(player));
  let remaining = Math.max(0, amount - genericDebt);
  if (remaining <= 0) return;
  [["marginDebt"], ["bondDebt"], ["convertibleDebt"]].forEach(([key]) => {
    if (remaining <= 0) return;
    const paid = Math.min(finance[key], remaining);
    finance[key] -= paid;
    remaining -= paid;
  });
}

function useCurrentCard(index) {
  const player = currentPlayer();
  if (!player || !Number.isInteger(index)) return false;

  const cardId = player.cards[index];
  const card = handCardDefinitions[cardId];
  if (!card || !canUseCard(player, cardId)) return false;
  if (card.category === "攻击" && !confirmAction(`确定使用攻击卡「${card.title}」吗？`)) return false;

  player.cards.splice(index, 1);
  const result = card.use(player);
  player.cardsUsed += 1;
  state.status = result;
  logEvent(result);
  showCardReveal(card, result, player);
  checkTasks(player);
  checkWinner();
  render();
  return true;
}

function upgradeProperty(index) {
  const player = currentPlayer();
  const space = spaces[index];
  if (!player || player.isAI || !canCurrentPlayerUpgrade(index)) return;
  const cost = buildCostFor(player, index);
  player.cash -= cost;
  const oldRating = cityRating(index);
  state.levels[index] += 1;
  player.upgradeCount += 1;
  awardSkillXp(player, 24, `${spaceDisplayName(index)} 升级`);
  state.status = `${player.name} 升级 ${space.name} 到 ${state.levels[index]} 级。`;
  logEvent(`${player.name} 升级 ${space.name}，花费 ${cost} 现金。`);
	  if (cityRating(index) !== oldRating) addNews("城市评级升级", `${spaceDisplayName(index)} 升至 ${cityRating(index)} 级，租金和股价增强。`, "gain");
	  showEventBurst(`${space.name} 升级`, "build");
	  showContractAnimation("施工合同", `${spaceDisplayName(index)} 升到 ${state.levels[index]} 级`, "build");
	  flashTile(index, "build");
  if (state.levels[index] >= MAX_LEVEL) unlockAchievement("maxLevelCity");
  checkTasks(player);
  render();
}

function toggleMortgage(index) {
  const player = currentPlayer();
  if (!player || player.isAI || state.owners[index] !== player.id) return;
	  if (state.mortgages[index]) {
	    if (!canRedeemCurrent(index)) return;
	    player.cash -= redeemCost(index);
	    state.mortgages[index] = false;
    state.status = `${player.name} 赎回 ${spaces[index].name}。`;
    logEvent(`${player.name} 赎回 ${spaces[index].name}。`);
    showEventBurst(`${spaces[index].name} 赎回`, "build");
  } else {
    if (!canMortgageCurrent(index)) return;
    if (!confirmAction(`确定抵押 ${spaces[index].name} 吗？抵押后暂时不能收租或升级。`)) return;
    player.cash += mortgageValue(index);
	    state.mortgages[index] = true;
	    state.status = `${player.name} 抵押 ${spaces[index].name}，获得 ${formatMoney(mortgageValue(index))}。`;
	    logEvent(`${player.name} 抵押 ${spaces[index].name}。`);
	    breachCoopContractsForProperty(index, player.id, "抵押违约");
	    showEventBurst(`+${formatMoney(mortgageValue(index))} 抵押`, "gain");
	  }
  render();
}

function confirmAction(message) {
  return typeof window === "undefined" || typeof window.confirm !== "function" || window.confirm(message);
}

function ecoUpgradeLabel(index) {
  const level = state.ecoLevels[index] || 0;
  if (level >= 3) return "环保满级";
  return `环保 ${formatMoney(ecoUpgradeCost(index))}`;
}

function ecoUpgradeCost(index) {
  return Math.round((ECO_UPGRADE_COST + (state.ecoLevels[index] || 0) * 55) / 5) * 5;
}

function canEcoUpgrade(index) {
  const player = currentPlayer();
  if (!player || player.isAI || state.gameOver) return false;
  if (state.owners[index] !== player.id || state.mortgages[index]) return false;
  if ((state.ecoLevels[index] || 0) >= 3) return false;
  return player.cash >= ecoUpgradeCost(index);
}

function ecoUpgrade(index) {
  const player = currentPlayer();
  if (!canEcoUpgrade(index)) return;
  const cost = ecoUpgradeCost(index);
  player.cash -= cost;
  state.ecoLevels[index] = (state.ecoLevels[index] || 0) + 1;
  state.status = `${player.name} 为 ${spaces[index].name} 做环保改造，污染下降。`;
  logEvent(`${player.name} 环保改造 ${spaces[index].name}，花费 ${cost}。`);
  addNews("绿色改造", `${spaceDisplayName(index)} 污染下降，城市评级更稳。`, "gain");
  showEventBurst(`${spaces[index].name} 环保升级`, "build");
  flashTile(index, "build");
  unlockAchievement("ecoCity");
  render();
}

function cityCompanies(index) {
  if (!state.cityCompanies || state.cityCompanies.length !== spaces.length) {
    state.cityCompanies = normalizeCityCompanies(state.cityCompanies);
  }
  return state.cityCompanies[index] || createCityCompanyState();
}

function cityCompanyCount(index) {
  return COMPANY_TYPES.filter((type) => cityCompanies(index)[type]).length;
}

function companyBuildCost(index, type) {
  const base = COMPANY_BUILD_COST[type] || 180;
  const levelDiscount = 1 - Math.min(0.18, (state.levels[index] || 0) * 0.025);
  const techDiscount = type === "techPark" && spaces[index]?.specialty === "tech" ? 0.86 : 1;
  return Math.round((base * currentRules().buildFactor * levelDiscount * techDiscount) / 10) * 10;
}

function canBuildCompany(player, index, type) {
  return Boolean(
    player &&
    !player.isAI &&
    !player.bankrupt &&
    !state.gameOver &&
    businessDealsOpen(player) &&
    state.owners[index] === player.id &&
    spaces[index]?.type === "property" &&
    !state.mortgages[index] &&
    COMPANY_TYPES.includes(type) &&
    !cityCompanies(index)[type] &&
    player.cash >= companyBuildCost(index, type),
  );
}

function buildCityCompany(index, type) {
  const player = currentPlayer();
  if (!canBuildCompany(player, index, type)) return;
  const cost = companyBuildCost(index, type);
  const label = companyTypeDefinitions[type]?.label || "公司";
  player.cash -= cost;
  cityCompanies(index)[type] = true;
  addCityRevenue(index, Math.round(cost * 0.35));
  awardSkillXp(player, type === "techPark" ? 30 : 24, `${spaceDisplayName(index)} ${label}`);
  state.status = `${player.name} 在 ${spaceDisplayName(index)} 建成${label}，城市商业价值上升。`;
  logEvent(`${player.name} 建设 ${spaceDisplayName(index)} ${label}，花费 ${cost}。`);
  addNews("城市公司成立", `${spaceDisplayName(index)} 新增${label}，租金、股价和现金流获得加成。`, "deal");
  logDeal("城市公司", `${spaceDisplayName(index)} 建成${label}`, cost, "build");
  showEventBurst(`${spaceDisplayName(index)} ${label}`, "build");
  flashTile(index, "build");
  checkTasks(player);
  renderPropertyDialog(index);
  render();
}

function canLaunchIpo(player, index) {
  return Boolean(
    player &&
    !player.isAI &&
    !player.bankrupt &&
    !state.gameOver &&
    businessDealsOpen(player) &&
    state.owners[index] === player.id &&
    spaces[index]?.type === "property" &&
    !state.mortgages[index] &&
    !state.cityPublic?.[index] &&
    state.levels[index] >= MAX_LEVEL,
  );
}

function launchCityIpo(index) {
  const player = currentPlayer();
  if (!canLaunchIpo(player, index)) return;
  const proceeds = Math.round((cityValuation(index) * 0.32) / 10) * 10;
  state.cityPublic[index] = true;
  player.cash += proceeds;
  player.stocks[index] = Math.min(stockLimitForCity(index), stockShares(player, index) + 2);
  addCityRevenue(index, Math.round(proceeds * 0.42));
  awardSkillXp(player, 42, `${spaceDisplayName(index)} IPO`);
  state.status = `${spaceDisplayName(index)} 完成城市 IPO，${player.name} 获得 ${formatMoney(proceeds)}。`;
  logEvent(`${player.name} 推动 ${spaceDisplayName(index)} 城市 IPO。`);
  addNews("城市 IPO", `${spaceDisplayName(index)} 上市，股票容量扩大，董事会机制开启。`, "deal");
  logDeal("城市 IPO", `${spaceDisplayName(index)} 发行城市股份`, proceeds, "equity");
  showEventBurst(`${spaceDisplayName(index)} IPO`, "gain");
  renderPropertyDialog(index);
  render();
}

function canStockTakeover(player, index) {
  const owner = playerById(state.owners[index]);
  return Boolean(
    player &&
    !player.isAI &&
    !player.bankrupt &&
    !state.gameOver &&
    businessDealsOpen(player) &&
    owner &&
    owner.id !== player.id &&
    state.cityPublic?.[index] &&
    stockShares(player, index) >= STOCK_TAKEOVER_SHARES &&
    player.cash >= stockTakeoverCost(index),
  );
}

function stockTakeoverCost(index) {
  return Math.round((cityValuation(index) * 0.48) / 10) * 10;
}

function executeStockTakeover(index) {
  const buyer = currentPlayer();
  if (!canStockTakeover(buyer, index)) return;
  const seller = playerById(state.owners[index]);
  const cost = stockTakeoverCost(index);
  buyer.cash -= cost;
  seller.cash += Math.round(cost * 0.72);
  buyer.stocks[index] = Math.max(0, stockShares(buyer, index) - STOCK_TAKEOVER_SHARES);
	  if (buyer.stocks[index] <= 0) delete buyer.stocks[index];
	  breachCoopContractsForProperty(index, seller.id, "股权收购转手");
	  state.owners[index] = buyer.id;
  recordCityCollection(buyer, index);
  awardSkillXp(buyer, 46, `${spaceDisplayName(index)} 股权收购`);
  state.status = `${buyer.name} 通过股权收购控制 ${spaceDisplayName(index)}。`;
  logEvent(`${buyer.name} 用 ${STOCK_TAKEOVER_SHARES} 股加 ${formatMoney(cost)} 完成 ${spaceDisplayName(index)} 收购。`);
  addNews("股权收购", `${buyer.name} 通过股票控制权拿下 ${spaceDisplayName(index)}。`, "deal");
  logDeal("股权收购", `${spaceDisplayName(index)} 控制权变更`, cost, "equity");
  showEventBurst(`${spaceDisplayName(index)} 股权收购`, "buy");
  flashTile(index, "buy");
  renderPropertyDialog(index);
  render();
}

function canBoardVoteUpgrade(player, index) {
  return Boolean(
    player &&
    !player.isAI &&
    !player.bankrupt &&
    !state.gameOver &&
    businessDealsOpen(player) &&
    state.cityPublic?.[index] &&
    spaces[index]?.type === "property" &&
    !state.mortgages[index] &&
    state.levels[index] < MAX_LEVEL &&
    (state.owners[index] === player.id || stockShares(player, index) >= 2) &&
    player.cash >= boardVoteCost(index),
  );
}

function boardVoteCost(index) {
  return Math.round((buildCostFor(currentPlayer(), index) * 0.62) / 10) * 10;
}

function boardVoteUpgrade(index) {
  const player = currentPlayer();
  if (!canBoardVoteUpgrade(player, index)) return;
  const cost = boardVoteCost(index);
  player.cash -= cost;
  state.levels[index] += 1;
  addCityRevenue(index, Math.round(cost * 0.55));
  awardSkillXp(player, 32, `${spaceDisplayName(index)} 董事会升级`);
  state.status = `${player.name} 通过董事会投票，推动 ${spaceDisplayName(index)} 升级。`;
  logEvent(`${player.name} 发起董事会投票，${spaceDisplayName(index)} 升到 ${state.levels[index]} 级。`);
  addNews("董事会投票", `${spaceDisplayName(index)} 通过升级议案，股东收益预期上升。`, "deal");
  showEventBurst(`${spaceDisplayName(index)} 董事会升级`, "build");
  flashTile(index, "build");
  renderPropertyDialog(index);
  render();
}

function autoUpgrade(player) {
  if (!player || player.bankrupt) return;
  const index = bestUpgradeIndex(player, aiDifficulty().upgradeReserve);
  if (index === null) return;
  player.cash -= buildCostFor(player, index);
  state.levels[index] += 1;
  player.upgradeCount += 1;
  logEvent(`${player.name} 升级 ${spaces[index].name}。`);
  showEventBurst(`${spaces[index].name} 升级`, "build");
  flashTile(index, "build");
  if (state.levels[index] >= MAX_LEVEL) unlockAchievement("maxLevelCity");
  checkTasks(player);
}

function bestUpgradeIndex(player, reserve = 0) {
  if (!player || player.bankrupt) return null;
  const candidates = ownedPropertyIndexes(player.id)
    .filter((index) => canBuildOn(index) && !state.mortgages[index] && state.levels[index] < MAX_LEVEL)
    .filter((index) => player.cash - buildCostFor(player, index) >= reserve)
    .sort((a, b) => upgradeScoreForPlayer(player, b) - upgradeScoreForPlayer(player, a));
  return candidates[0] ?? null;
}

function upgradeScoreForPlayer(player, index) {
  const difficulty = player?.isAI ? aiDifficulty() : difficultySettings.normal;
  const groupOwned = groupOwnedCount(player?.id, spaces[index].group);
  const setBonus = ownsContinentSet(player?.id, spaces[index].group)
    ? 74 * difficulty.setFocus
    : groupOwned * 24 * difficulty.setFocus;
  const valueBonus = Math.max(0, cityValuation(index) - propertyPrice(index)) * 0.05 * difficulty.valueFocus;
  const rentEfficiency = calculateRent(index, 7) / Math.max(1, buildCostFor(player, index));
  return upgradeScore(index) + setBonus + valueBonus + rentEfficiency * 120;
}

function upgradeScore(index) {
  const space = spaces[index];
  const rent = calculateRent(index, 7);
  const kindBonus = space.kind === "street" ? 30 : space.kind === "station" ? 20 : 14;
  const landmarkBonus = MAX_LEVEL - state.levels[index];
  return rent + kindBonus + landmarkBonus;
}

function autoUseCards(player) {
  if (!player || !player.isAI || player.bankrupt || !Array.isArray(player.cards)) return;
  const difficulty = aiDifficulty();
  if (Math.random() > difficulty.cardUseChance) return;
  const owned = ownedPropertyIndexes(player.id);
  const canUseAttack = difficulty.aiIQ >= 115;
  const canUseAdvanced = difficulty.aiIQ >= 140;

  const preferred = [
    (cardId) => cardId === "cashVoucher" && player.cash < 520,
    (cardId) => cardId === "snapBuy" && handCardDefinitions.snapBuy.canUse(player) && player.cash > (difficulty.aiIQ >= 125 ? 360 : 520),
    (cardId) => cardId === "planeTicket" && new Set(player.visitedRegions || []).size < 5,
    (cardId) => canUseAttack && cardId === "forceTax" && activePlayers().length > 2,
    (cardId) => {
      const target = richestOpponent(player);
      return canUseAttack && cardId === "freezeRival" && target && handCardDefinitions.freezeRival.canUse(player) && netWorth(player) < netWorth(target) * (difficulty.aiIQ >= 150 ? 1.15 : 1);
    },
    (cardId) => cardId === "buildPermit" && owned.some((index) => canBuildOn(index) && state.levels[index] < MAX_LEVEL),
    (cardId) => cardId === "remoteDice" && !player.forcedRoll && player.cash > (difficulty.aiIQ >= 125 ? 260 : 450),
    (cardId) => canUseAdvanced && cardId === "swapCard" && handCardDefinitions.swapCard?.canUse(player),
    (cardId) => cardId === "taxShield" && !player.taxShield,
    (cardId) => cardId === "pauseShield" && !player.pauseShield,
    (cardId) => cardId === "rentMirror" && !player.rentMirror,
    (cardId) => cardId === "disasterShield" && !player.disasterShield && owned.some((index) => state.levels[index] > 0),
    (cardId) => cardId === "insurance" && !player.insurance && player.cash < 420,
    (cardId) => cardId === "rentShield" && !player.rentShield,
  ];

  preferred.some((shouldUse) => {
    const index = player.cards.findIndex((cardId) => shouldUse(cardId));
    if (index < 0) return false;

    const cardId = player.cards.splice(index, 1)[0];
    const card = handCardDefinitions[cardId];
    const result = card.use(player);
    player.cardsUsed += 1;
    state.status = result;
    logEvent(result);
    showCardReveal(card, result, player);
    checkTasks(player);
    return true;
  });
}

function autoInvest(player) {
  if (!player || !player.isAI || player.bankrupt || state.gameOver) return;
  const difficulty = aiDifficulty();
  const style = aiStyleDefinitions[player.aiStyle] || aiStyleDefinitions.builder;
  const owned = ownedPropertyIndexes(player.id).filter((index) => !state.mortgages[index]);
  if (!owned.length) return;

  const companyTarget = owned
    .flatMap((index) => COMPANY_TYPES
      .filter((type) => !cityCompanies(index)[type] && player.cash - companyBuildCost(index, type) >= difficulty.upgradeReserve)
      .map((type) => ({ index, type, score: cityValuation(index) + style.companyBias * 12 + (type === "hotel" && spaces[index].specialty === "tourism" ? 160 : 0) + (type === "techPark" && spaces[index].specialty === "tech" ? 160 : 0) })))
    .sort((a, b) => b.score - a.score)[0];
  if (companyTarget && Math.random() < Math.min(0.72, 0.18 + difficulty.valueFocus * 0.18 + style.companyBias / 120)) {
    const cost = companyBuildCost(companyTarget.index, companyTarget.type);
    player.cash -= cost;
    cityCompanies(companyTarget.index)[companyTarget.type] = true;
    addCityRevenue(companyTarget.index, Math.round(cost * 0.25));
    logEvent(`${player.name} 建设 ${spaceDisplayName(companyTarget.index)} ${companyTypeDefinitions[companyTarget.type].label}。`);
    return;
  }

  const stockCandidates = spaces
    .map((space, index) => ({ space, index }))
    .filter(({ space, index }) => space.type === "property" && stockShares(player, index) < stockLimitForCity(index) && player.cash - stockPrice(index) >= difficulty.shopCashFloor)
    .sort((a, b) => stockPrice(b.index) + cityPowerScore(b.index) + style.stockBias * 8 - (stockPrice(a.index) + cityPowerScore(a.index)));
  const pick = stockCandidates[0];
  if (pick && Math.random() < Math.min(0.68, 0.12 + style.stockBias / 90 + difficulty.valueFocus * 0.12)) {
    const price = stockPrice(pick.index);
    player.cash -= price;
    player.stocks[pick.index] = stockShares(player, pick.index) + 1;
    logEvent(`${player.name} 买入 ${spaceDisplayName(pick.index)} 股票。`);
  }
}

function startAuction(propertyIndex, declinedBy) {
  const space = spaces[propertyIndex];
  const startBid = Math.max(20, Math.floor(propertyPrice(propertyIndex) * 0.55 / AUCTION_INCREMENT) * AUCTION_INCREMENT);
  const activeIds = activePlayers()
    .filter((player) => player.cash >= startBid)
    .map((player) => player.id);

  state.pendingPurchase = null;
  if (activeIds.length === 0) {
    state.auction = null;
    state.phase = "ending";
    state.status = `${space.name} 流拍，没有玩家现金足够参与。`;
    logEvent(`${space.name} 流拍。`);
    return;
  }

  const startPlayerIndex = Math.max(0, activeIds.indexOf(declinedBy.id));
  state.auction = {
    propertyIndex,
    currentBid: 0,
    leaderId: null,
    activeIds,
    currentIndex: startPlayerIndex,
    deadline: Date.now() + AUCTION_TURN_MS,
  };
  state.phase = "auction";
  state.status = `${space.name} 开始拍卖，起拍 ${formatMoney(startBid)}。`;
  logEvent(`${space.name} 进入拍卖，起拍 ${startBid} 现金。`);
}

function normalizeAuction(auction) {
  if (!auction || typeof auction !== "object") return null;
  const propertyIndex = Number(auction.propertyIndex);
  if (!Number.isInteger(propertyIndex) || !spaces[propertyIndex] || spaces[propertyIndex].type !== "property") return null;
  const activeIds = Array.isArray(auction.activeIds)
    ? auction.activeIds.filter((playerId) => playerTemplates.some((template) => template.id === playerId))
    : [];
  if (activeIds.length === 0) return null;
  return {
    propertyIndex,
    currentBid: Math.max(0, Number(auction.currentBid) || 0),
    leaderId: auction.leaderId || null,
    activeIds,
    currentIndex: clamp(Number(auction.currentIndex) || 0, 0, activeIds.length - 1),
    deadline: Math.max(Date.now() + 1000, Number(auction.deadline) || Date.now() + AUCTION_TURN_MS),
  };
}

function currentAuctionBidder() {
  const auction = state.auction;
  if (!auction || auction.activeIds.length === 0) return null;
  return playerById(auction.activeIds[auction.currentIndex % auction.activeIds.length]);
}

function nextAuctionBid() {
  const auction = state.auction;
  if (!auction) return 0;
  const startBid = Math.max(20, Math.floor(propertyPrice(auction.propertyIndex) * 0.55 / AUCTION_INCREMENT) * AUCTION_INCREMENT);
  return auction.currentBid > 0 ? auction.currentBid + AUCTION_INCREMENT : startBid;
}

function canHumanActInAuction() {
  const bidder = currentAuctionBidder();
  return Boolean(bidder && !bidder.isAI && state.phase === "auction");
}

function placeAuctionBid(player) {
  const auction = state.auction;
  if (!auction || !player || player.bankrupt) return;
  const bid = nextAuctionBid();
  if (player.cash < bid) {
    passAuction(player);
    return;
  }

  auction.currentBid = bid;
  auction.leaderId = player.id;
  state.status = `${player.name} 对 ${spaces[auction.propertyIndex].name} 出价 ${formatMoney(bid)}。`;
  logEvent(`${player.name} 拍卖出价 ${bid}。`);
  advanceAuctionTurn();
  render();
}

function passAuction(player) {
  const auction = state.auction;
  if (!auction || !player) return;
  const position = auction.activeIds.indexOf(player.id);
  if (position >= 0) {
    auction.activeIds.splice(position, 1);
    auction.currentIndex = position - 1;
  }
  state.status = `${player.name} 退出 ${spaces[auction.propertyIndex].name} 拍卖。`;
  logEvent(`${player.name} 退出拍卖。`);
  advanceAuctionTurn();
  render();
}

function advanceAuctionTurn() {
  const auction = state.auction;
  if (!auction) return;

  auction.activeIds = auction.activeIds.filter((playerId) => {
    const player = playerById(playerId);
    return player && !player.bankrupt && (player.id === auction.leaderId || player.cash >= nextAuctionBid());
  });

  const challengers = auction.activeIds.filter((playerId) => playerId !== auction.leaderId);
  if (auction.leaderId && challengers.length === 0) {
    finishAuction();
    return;
  }

  if (!auction.leaderId && auction.activeIds.length === 0) {
    finishAuction();
    return;
  }

  if (auction.activeIds.length === 0) {
    finishAuction();
    return;
  }

  auction.currentIndex = (auction.currentIndex + 1) % auction.activeIds.length;
  if (auction.leaderId && auction.activeIds[auction.currentIndex] === auction.leaderId) {
    auction.currentIndex = (auction.currentIndex + 1) % auction.activeIds.length;
  }
  auction.deadline = Date.now() + AUCTION_TURN_MS;
}

function finishAuction() {
  const auction = state.auction;
  if (!auction) return;
  const space = spaces[auction.propertyIndex];
  const winner = playerById(auction.leaderId);

  if (!winner || auction.currentBid <= 0) {
    state.status = `${space.name} 流拍，暂时无人持有。`;
    logEvent(`${space.name} 拍卖流拍。`);
  } else {
    winner.cash -= auction.currentBid;
    winner.auctionWins = (winner.auctionWins || 0) + 1;
    state.owners[auction.propertyIndex] = winner.id;
    recordCityCollection(winner, auction.propertyIndex);
    awardSkillXp(winner, 28, `${spaceDisplayName(auction.propertyIndex)} 拍卖`);
    state.status = `${winner.name} 以 ${formatMoney(auction.currentBid)} 拍下 ${space.name}。`;
    logEvent(`${winner.name} 拍下 ${space.name}，支付 ${auction.currentBid} 现金。`);
    addNews("拍卖落槌", `${winner.name} 用 ${formatMoney(auction.currentBid)} 拿下 ${spaceDisplayName(auction.propertyIndex)}。`, "deal");
    showEventBurst(`${winner.name} 拍下 ${space.name}`, "buy");
    flashTile(auction.propertyIndex, "buy");
    unlockAchievement("firstAuction");
    checkTasks(winner);
  }

  state.auction = null;
  state.phase = "ending";
  checkWinner();
}

function runAuctionAITurn() {
  const bidder = currentAuctionBidder();
  if (!bidder || !bidder.isAI || state.phase !== "auction") return;
  const bid = nextAuctionBid();
  if (bid <= auctionMaxBid(bidder, state.auction.propertyIndex)) {
    placeAuctionBid(bidder);
  } else {
    passAuction(bidder);
  }
}

function auctionMaxBid(player, propertyIndex) {
  const space = spaces[propertyIndex];
  const difficulty = aiDifficulty();
  const style = aiStyleDefinitions[player.aiStyle] || aiStyleDefinitions.builder;
  const groupOwned = groupOwnedCount(player.id, space.group);
  const ownsGroup = groupOwned > 0;
  const styleNeed = player.aiStyle === "auctioneer" ? 0.16 : player.aiStyle === "collector" && ownsGroup ? 0.18 : 0;
  const setNeed = groupOwned >= CONTINENT_SET_SIZE - 1 ? 0.26 * difficulty.setFocus : groupOwned * 0.08 * difficulty.setFocus;
  const groupNeed = (ownsGroup ? 1.12 : 0.78) + styleNeed + setNeed;
  const valueCeiling = Math.max(propertyPrice(propertyIndex), cityValuation(propertyIndex)) * (0.74 + difficulty.valueFocus * 0.18);
  const cashCeiling = Math.max(0, player.cash - difficulty.auctionReserve);
  const rawBid = Math.max(propertyPrice(propertyIndex) * groupNeed * difficulty.bidFactor, valueCeiling) + style.buyBias * 2.4;
  return Math.min(cashCeiling, Math.round(rawBid / AUCTION_INCREMENT) * AUCTION_INCREMENT);
}

function auctionMood(player, bid) {
  if (player.cash < bid) return "资金紧张";
  const max = auctionMaxBid(player, state.auction.propertyIndex);
  if (max >= bid + AUCTION_INCREMENT * 3) return "强势竞价";
  if (max >= bid) return "谨慎跟进";
  return "准备退出";
}

function buyShopCard(cardId) {
  const player = currentPlayer();
  const item = shopCatalog.find((product) => product.cardId === cardId);
  const card = handCardDefinitions[cardId];
  if (!player || !item || !card || !canBuyShopCard(player, cardId)) return;

  const price = shopCardPrice(player, item);
  player.cash -= price;
  player.cards.push(cardId);
  state.status = `${player.name} 购买「${card.title}」，花费 ${formatMoney(price)}。`;
  logEvent(`${player.name} 在道具商店购买「${card.title}」。`);
  showCardReveal(card, `${player.name} 购买「${card.title}」。`, player);
  render();
}

function canBuyShopCard(player, cardId) {
  const item = shopCatalog.find((product) => product.cardId === cardId);
  if (!player || player.bankrupt || player.isAI || state.phase !== "shop") return false;
  if (!item || !handCardDefinitions[cardId]) return false;
  if (player.cards.length >= MAX_HAND_CARDS) return false;
  return player.cash >= shopCardPrice(player, item);
}

function autoShop(player) {
  if (!player || player.bankrupt || player.cards.length >= MAX_HAND_CARDS) {
    state.status = `${player?.name || "AI"} 经过道具商店，没有购买卡片。`;
    return;
  }

  const difficulty = aiDifficulty();
  const choices = shopCatalog
    .filter((item) => player.cash - shopCardPrice(player, item) >= difficulty.shopCashFloor)
    .filter((item) => item.cardId !== "rentShield" || !player.rentShield)
    .filter((item) => item.cardId !== "disasterShield" || !player.disasterShield)
    .sort((a, b) => autoShopScore(player, b.cardId) - autoShopScore(player, a.cardId));
  const pickRange = difficulty.aiIQ >= 125 ? 1 : Math.min(choices.length, difficulty.aiIQ >= 100 ? 2 : 3);
  const item = choices[Math.floor(Math.random() * Math.max(1, pickRange))];
  if (!item) {
    state.status = `${player.name} 经过道具商店，保留现金。`;
    logEvent(`${player.name} 经过道具商店，没有购买。`);
    return;
  }

  const card = handCardDefinitions[item.cardId];
  player.cash -= shopCardPrice(player, item);
  player.cards.push(item.cardId);
  state.status = `${player.name} 在道具商店购买「${card.title}」。`;
  logEvent(`${player.name} 购买「${card.title}」。`);
  showCardReveal(card, `${player.name} 购买「${card.title}」。`, player);
}

function autoShopScore(player, cardId) {
  const difficulty = aiDifficulty();
  const owned = ownedPropertyIndexes(player.id);
  if (cardId === "buildPermit" && owned.some((index) => canBuildOn(index) && state.levels[index] < MAX_LEVEL)) return 90 + 12 * difficulty.valueFocus;
  if (cardId === "snapBuy" && nearestUnownedProperty(player.position) !== null) return 80 + 16 * difficulty.setFocus;
  if (cardId === "planeTicket" && new Set(player.visitedRegions || []).size < 5) return 76 + 10 * difficulty.valueFocus;
  if (cardId === "insurance" && !player.insurance && player.cash < 620) return 74 + (difficulty.aiIQ >= 125 ? 12 : 0);
  if (cardId === "disasterShield" && !player.disasterShield && owned.some((index) => state.levels[index] > 0)) return 72 + 10 * difficulty.valueFocus;
  if (cardId === "rentShield" && !player.rentShield) return 70 + 7 * difficulty.valueFocus;
  if (cardId === "remoteDice" && !player.forcedRoll) return 60 + 18 * difficulty.setFocus;
  if (cardId === "freezeRival" || cardId === "forceTax" || cardId === "swapCard") return difficulty.aiIQ >= 125 ? 66 + difficulty.valueFocus * 14 : 34;
  if (cardId === "stayCard" && !player.skipMove) return 45;
  return 30;
}

function saveSlot(slot) {
  const payload = { ...JSON.parse(JSON.stringify(state)), savedAt: new Date().toLocaleString("zh-CN") };
  localStorage.setItem(slotStorageKey(slot), JSON.stringify(payload));
  state.status = `已保存到槽位 ${slot}。`;
  render();
}

function loadSlot(slot) {
  try {
    const raw = localStorage.getItem(slotStorageKey(slot));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadSlotIntoGame(slot) {
  const saved = loadSlot(slot);
  if (!saved) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  state = loadGame() || createInitialGame();
  state.status = `已读取槽位 ${slot}。`;
  render();
}

function clearSlot(slot) {
  localStorage.removeItem(slotStorageKey(slot));
  state.status = `已清除槽位 ${slot}。`;
  render();
}

function slotStorageKey(slot) {
  return `${SLOT_KEY_PREFIX}${slot}`;
}

function offerTrade(propertyIndex) {
  const buyer = currentPlayer();
  const seller = playerById(state.owners[propertyIndex]);
  if (!buyer || buyer.isAI || !seller || seller.id === buyer.id) return;
  const price = tradeOfferPrice(propertyIndex);
  if (buyer.cash < price) return;

  const accepts = price >= cityValuation(propertyIndex) * (seller.isAI ? aiTradeAskMultiplier(seller, propertyIndex) : 1.12);
  if (!accepts) {
    openNegotiation(propertyIndex, seller, price);
    state.status = `${seller.name} 拒绝首轮报价，要求重新谈 ${spaces[propertyIndex].name}。`;
    logEvent(`${seller.name} 对 ${spaces[propertyIndex].name} 提出反报价。`);
    render();
    return;
  }

  completePropertyTrade(buyer, seller, propertyIndex, price, "场外报价");
  render();
}

function aiTradeAskMultiplier(seller, propertyIndex) {
  const difficulty = aiDifficulty();
  const groupOwned = groupOwnedCount(seller?.id, spaces[propertyIndex].group);
  const setDefense = groupOwned >= CONTINENT_SET_SIZE - 1 ? 0.1 * difficulty.setFocus : groupOwned * 0.025 * difficulty.setFocus;
  const flagshipDefense = cityPowerScore(propertyIndex) > 88 ? 0.06 * difficulty.valueFocus : 0;
  return difficulty.tradeAsk + setDefense + flagshipDefense;
}

function offerCardTrade(sellerId) {
  const buyer = currentPlayer();
  const seller = playerById(sellerId);
  if (!buyer || buyer.isAI || !seller || seller.cards.length === 0 || buyer.cards.length >= MAX_HAND_CARDS || buyer.cash < 100) return;
  const cardId = seller.cards.splice(Math.floor(Math.random() * seller.cards.length), 1)[0];
  buyer.cards.push(cardId);
  buyer.cash -= 100;
  seller.cash += 100;
  state.status = `${buyer.name} 用 ${formatMoney(100)} 买到 ${seller.name} 的一张手牌。`;
  logEvent(`${buyer.name} 与 ${seller.name} 完成手牌交易。`);
  showCardReveal(handCardDefinitions[cardId], `${buyer.name} 交易得到「${handCardDefinitions[cardId].title}」。`, buyer);
  render();
}

function coopContractCandidates(player) {
  if (!player || player.isAI || player.bankrupt) return [];
  return activePlayers()
    .filter((owner) => owner.id !== player.id)
    .flatMap((owner) => ownedPropertyIndexes(owner.id).map((index) => ({ owner, index })))
    .filter(({ index }) => spaces[index]?.type === "property" && !state.mortgages[index])
    .filter(({ index }) => !hasActiveCoopContract(player.id, index))
    .sort((a, b) => coopScore(b.index) - coopScore(a.index));
}

function coopContractsForPlayer(player) {
  if (!player) return [];
  return normalizeCoopContracts(state.coopContracts).filter((contract) => (
    contract.ownerId === player.id || contract.partnerId === player.id
  ));
}

function archivedCoopContractsForPlayer(player) {
  return coopContractsForPlayer(player)
    .filter((contract) => contract.status !== "active")
    .sort((a, b) => (b.endedRound || b.signedRound) - (a.endedRound || a.signedRound));
}

function coopProposalsForPlayer(player) {
  if (!player) return [];
  return normalizeCoopProposals(state.coopProposals)
    .filter((proposal) => proposal.ownerId === player.id || proposal.partnerId === player.id || proposal.proposerId === player.id || proposal.approverId === player.id)
    .slice(0, 8);
}

function hasActiveCoopContract(playerId, propertyIndex) {
  return normalizeCoopContracts(state.coopContracts).some((contract) => (
    contract.status === "active" &&
    contract.propertyIndex === propertyIndex &&
    (contract.ownerId === playerId || contract.partnerId === playerId)
  ));
}

function hasPendingCoopProposal(playerId, propertyIndex) {
  return normalizeCoopProposals(state.coopProposals).some((proposal) => (
    proposal.status === "pending" &&
    proposal.propertyIndex === propertyIndex &&
    (proposal.ownerId === playerId || proposal.partnerId === playerId)
  ));
}

function coopScore(index) {
  return cityValuation(index)
    + cityCompanyCount(index) * 90
    + (state.cityPublic?.[index] ? 120 : 0)
    + (spaces[index]?.specialty === "finance" ? 80 : 0)
    + (spaces[index]?.specialty === "tech" ? 72 : 0)
    + (spaces[index]?.airport ? 55 : 0);
}

function coopUpfront(index) {
  return Math.round(clamp(cityValuation(index) * 0.12 + cityCompanyCount(index) * 35 + (state.cityPublic?.[index] ? 60 : 0), 90, 520) / 10) * 10;
}

function coopPenalty(index) {
  return Math.round(clamp(coopUpfront(index) * 1.45 + cityCompanyCount(index) * 45, 140, 780) / 10) * 10;
}

function coopPartnerShare(index) {
  const companyBoost = Math.min(0.08, cityCompanyCount(index) * 0.02);
  return clamp(0.32 + companyBoost + (state.cityPublic?.[index] ? 0.03 : 0), 0.3, 0.46);
}

function coopDividend(index) {
  const rentBase = Math.max(18, Math.round(calculateRent(index, state.lastRoll?.total || 7) * 0.28));
  const companyBase = cityCompanyCount(index) * 24;
  const ratingBase = cityRatingScore(index) >= 80 ? 30 : cityRatingScore(index) >= 66 ? 18 : 8;
  return Math.round((rentBase + companyBase + ratingBase) * currentMarket().rent / 5) * 5;
}

function canSignCoopContract(player, index, financials = coopContractFinancials(index)) {
  const owner = playerById(state.owners[index]);
  return Boolean(
    businessDealsOpen(player) &&
    owner &&
    owner.id !== player.id &&
    spaces[index]?.type === "property" &&
    !state.mortgages[index] &&
    !hasActiveCoopContract(player.id, index) &&
    !hasPendingCoopProposal(player.id, index) &&
    player.cash >= financials.upfront &&
    normalizeCoopContracts(state.coopContracts).filter((contract) => contract.status === "active").length < COOP_CONTRACT_LIMIT,
  );
}

function canFinalizeCoopContract(partner, index, financials = coopContractFinancials(index)) {
  const owner = playerById(state.owners[index]);
  return Boolean(
    partner &&
    !partner.bankrupt &&
    !state.gameOver &&
    owner &&
    owner.id !== partner.id &&
    !owner.bankrupt &&
    spaces[index]?.type === "property" &&
    !state.mortgages[index] &&
    !hasActiveCoopContract(partner.id, index) &&
    partner.cash >= financials.upfront &&
    normalizeCoopContracts(state.coopContracts).filter((contract) => contract.status === "active").length < COOP_CONTRACT_LIMIT,
  );
}

function coopDisabledReason(player, index, financials = coopContractFinancials(index)) {
  const owner = playerById(state.owners[index]);
  if (!businessDealsOpen(player)) return "行动阶段可签约";
  if (!owner || owner.id === player?.id) return "需要对手名下城市";
  if (state.mortgages[index]) return "城市已抵押";
  if (hasActiveCoopContract(player.id, index)) return "已有合作合同";
  if (hasPendingCoopProposal(player.id, index)) return "等待对方同意";
  if (player.cash < financials.upfront) return "现金不足";
  return "合同席位已满";
}

function signCoopContract(index) {
  openCoopContractDraft(index);
}

function openCoopContractDraft(preferredIndex = null) {
  const partner = contractSigningPlayer();
  const index = preferredCoopDraftIndex(partner, preferredIndex);
  if (!contractDialog || !contractDialogBody) return;
  pendingCoopContractIndex = Number.isInteger(index) ? index : null;
  renderCoopContractDialog(index, partner);
  if (typeof contractDialog.showModal === "function") {
    contractDialog.showModal();
  } else {
    contractDialog.setAttribute("open", "");
  }
}

function closeContractDialog() {
  pendingCoopContractIndex = null;
  if (confirmContractButton) {
    confirmContractButton.disabled = false;
    confirmContractButton.title = "";
    confirmContractButton.textContent = "提交给对方";
  }
  if (contractDialog?.open) {
    contractDialog.close();
  } else {
    contractDialog?.removeAttribute("open");
  }
}

function confirmPendingCoopContract() {
  if (!Number.isInteger(pendingCoopContractIndex)) return;
  const partner = contractSigningPlayer();
  const negotiationMode = normalizeContractNegotiationMode(document.getElementById("contractNegotiationMode")?.value || "standard");
  const owner = playerById(state.owners[pendingCoopContractIndex]);
  const customTerms = collectContractCustomTerms(pendingCoopContractIndex, negotiationMode, partner, owner);
  const financials = coopContractFinancialsWithTerms(pendingCoopContractIndex, negotiationMode, customTerms);
  if (!canSignCoopContract(partner, pendingCoopContractIndex, financials)) {
    updateContractConfirmButton(false, coopDisabledReason(partner, pendingCoopContractIndex, financials));
    return;
  }
  const clause = sanitizeContractClause(document.getElementById("contractClauseInput")?.value);
  const index = pendingCoopContractIndex;
  pendingCoopContractIndex = null;
  if (contractDialog?.open) contractDialog.close();
  submitCoopProposal(index, clause, partner?.id, negotiationMode, customTerms);
}

function collectContractCustomTerms(index, negotiationMode, partner, owner) {
  const base = coopContractFinancials(index, negotiationMode);
  return {
    upfront: sanitizeContractAmount(document.getElementById("contractUpfrontInput")?.value, base.upfront),
    ownerReceipt: sanitizeContractAmount(document.getElementById("contractOwnerReceiptInput")?.value, document.getElementById("contractUpfrontInput")?.value || base.upfront),
    partnerPerRound: sanitizeContractAmount(document.getElementById("contractPartnerRoundInput")?.value, base.partnerPerRound),
    ownerPerRound: sanitizeContractAmount(document.getElementById("contractOwnerRoundInput")?.value, base.ownerPerRound),
    penalty: sanitizeContractAmount(document.getElementById("contractPenaltyInput")?.value, base.penalty),
    duration: sanitizeContractDuration(document.getElementById("contractDurationInput")?.value, base.duration),
    ownerSignature: sanitizeContractSignature(document.getElementById("contractOwnerSignatureInput")?.value, owner?.name || "甲方"),
    partnerSignature: sanitizeContractSignature(document.getElementById("contractPartnerSignatureInput")?.value, partner?.name || "乙方"),
  };
}

function handleContractDialogChange(event) {
  if (event.target?.id === "contractClausePreset") {
    const clauseInput = document.getElementById("contractClauseInput");
    if (clauseInput) clauseInput.value = event.target.value;
    return;
  }
  if (event.target?.id === "contractDraftIndex") {
    const clause = document.getElementById("contractClauseInput")?.value || "";
    const negotiationMode = normalizeContractNegotiationMode(document.getElementById("contractNegotiationMode")?.value || "standard");
    const partner = contractSigningPlayer();
    const index = event.target.value === "" ? null : Number(event.target.value);
    pendingCoopContractIndex = Number.isInteger(index) ? index : null;
    renderCoopContractDialog(index, partner, { clause, negotiationMode });
    return;
  }
  if (event.target?.id === "contractNegotiationMode") {
    const clause = document.getElementById("contractClauseInput")?.value || "";
    const partner = contractSigningPlayer();
    renderCoopContractDialog(pendingCoopContractIndex, partner, { clause, negotiationMode: event.target.value });
  }
}

function renderCoopContractDialog(index, partner, options = {}) {
  const owner = Number.isInteger(index) ? playerById(state.owners[index]) : null;
  const negotiationMode = normalizeContractNegotiationMode(options.negotiationMode || "standard");
  contractDialogBody.innerHTML = "";

  const header = document.createElement("div");
  header.className = "contract-paper-header";
  const eyebrow = document.createElement("span");
  eyebrow.textContent = "合同签署台";
  const title = document.createElement("h2");
  title.textContent = owner ? `${spaceDisplayName(index)} 合作合同书` : "公司合作合同起草";
  const badge = document.createElement("strong");
  badge.textContent = owner ? `合同价值 ${formatMoney(coopContractFinancials(index, negotiationMode).contractValue)}` : "等待合同项目";
  header.append(eyebrow, title, badge);

  const draftSelect = createContractDraftSelector(partner, index);

  if (!owner || !partner) {
    const empty = document.createElement("div");
    empty.className = "contract-blocker-card";
    empty.textContent = partner ? "对手还没有可合作的城市。等对手买下城市后，这里会出现可签合同。" : "当前没有可签约玩家。";
    contractDialogBody.append(header, draftSelect, empty, createBlankContractPreview(partner));
    updateContractConfirmButton(false, "暂无可签合同");
    return;
  }

  const financials = coopContractFinancialsWithTerms(index, negotiationMode, options.terms || {});
  const propertyName = spaceDisplayName(index);
  const canSign = canSignCoopContract(partner, index, financials);
  const disabledReason = canSign ? "" : coopDisabledReason(partner, index, financials);
  updateContractConfirmButton(canSign, disabledReason);
  const template = contractTemplateForCity(index);
  const risk = contractRiskAssessment(index, financials, partner, owner);

  const meta = document.createElement("div");
  meta.className = "contract-paper-meta";
  meta.append(
    createContractMetaPill("合同编号", `WD-${String(index).padStart(3, "0")}-${state.round}`),
    createContractMetaPill("签署回合", `第 ${state.round} 轮`),
    createContractMetaPill("合作分红", `${Math.round(financials.share * 100)}%`),
    createContractMetaPill("城市评级", cityRating(index)),
    createContractMetaPill("合同模板", template.label),
  );

  const negotiationPanel = createContractNegotiationPanel(negotiationMode);
  const insight = createContractInsightPanel(risk, template, financials);

  const summary = document.createElement("p");
  summary.className = "contract-summary-strip";
  summary.textContent = `本合同由玩家填写条款：${partner.name} 提交给 ${owner.name} 审批；只有 ${owner.name} 同意后才会扣款并生成正式合同。`;

  const parties = document.createElement("div");
  parties.className = "contract-party-grid";
  parties.append(
    createContractInfoBlock("甲方 / 城市持有人", owner.name, "对方玩家，提供名下区域和经营分红"),
    createContractInfoBlock("乙方 / 合作投资人", partner.name, "你的玩家，支付入场费并获得分红权"),
  );

  const moneyGrid = document.createElement("div");
  moneyGrid.className = "contract-money-grid";
  moneyGrid.append(
    createContractMoneyInput("你给对方", "contractUpfrontInput", financials.upfront, "正式生效时从你现金扣除"),
    createContractMoneyInput("对方当下收到", "contractOwnerReceiptInput", financials.ownerReceipt, `${owner.name} 同意后立即入账`),
    createContractMoneyInput("对方给你 / 每轮", "contractPartnerRoundInput", financials.partnerPerRound, `按你填写的期限结算`),
    createContractMoneyInput("对方保留 / 每轮", "contractOwnerRoundInput", financials.ownerPerRound, `${owner.name} 每轮保留收益`),
    createContractMoneyInput("违约金", "contractPenaltyInput", financials.penalty, "触发违约条款时由违约方支付"),
    createContractMoneyInput("合同期限 / 轮", "contractDurationInput", financials.duration, `1-${COOP_CONTRACT_MAX_DURATION} 轮`),
  );

  const terms = document.createElement("div");
  terms.className = "contract-terms-box";
  const termsTitle = document.createElement("strong");
  termsTitle.textContent = "违约条款 / 什么算违约";
  const select = document.createElement("select");
  select.id = "contractClausePreset";
  [
    template.clause,
    "抵押 / 转手 / 破产触发违约",
    "抵押城市或出售控制权视为违约",
    "所有方破产或城市被收购视为违约",
    "提前解约需支付 50% 违约金",
  ].forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  const textarea = document.createElement("textarea");
  textarea.id = "contractClauseInput";
  textarea.maxLength = 48;
  textarea.rows = 3;
  textarea.value = sanitizeContractClause(options.clause || select.value);
  textarea.placeholder = "填写违约条款，例如：抵押、转手、破产、提前解约如何赔付。";
  const note = document.createElement("p");
  note.textContent = canSign
    ? "金额、期限和签名都可以自己填；提交后先给对方确认，只有对方同意后才会扣款并生成正式合同。"
    : `现在不能签：${disabledReason}。你仍可先查看合同内容和条款。`;
  terms.append(termsTitle, select, textarea, note);

  const finePrint = createContractFinePrint(propertyName, financials);
  const signatureBlock = createContractSignatureBlock(owner, partner, canSign);

  contractDialogBody.append(header, draftSelect, negotiationPanel, meta, insight, summary, parties, moneyGrid, terms, finePrint, signatureBlock);
}

function createContractMetaPill(label, value) {
  const pill = document.createElement("span");
  pill.className = "contract-meta-pill";
  const small = document.createElement("small");
  small.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  pill.append(small, strong);
  return pill;
}

function createContractNegotiationPanel(selectedMode) {
  const panel = document.createElement("div");
  panel.className = "contract-negotiation-panel";
  const label = document.createElement("label");
  label.setAttribute("for", "contractNegotiationMode");
  label.textContent = "谈判方案";
  const select = document.createElement("select");
  select.id = "contractNegotiationMode";
  [
    ["standard", "标准合同：价格、分红、违约金平衡"],
    ["premiumShare", "提高入场费，换更高分红"],
    ["safePenalty", "提高入场费，降低违约金"],
    ["aggressiveShare", "强势高分红，高入场费高风险"],
    ["lowEntry", "低入场费，低分红高违约约束"],
  ].forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
  });
  select.value = normalizeContractNegotiationMode(selectedMode);
  const hint = document.createElement("small");
  hint.textContent = "改变谈判方案会刷新合同价值、分红比例、违约金和顾问评分。";
  panel.append(label, select, hint);
  return panel;
}

function createContractInsightPanel(risk, template, financials) {
  const panel = document.createElement("div");
  panel.className = `contract-insight-panel risk-${risk.tone}`;
  panel.append(
    createContractInsightItem("合同顾问", risk.advisor, risk.reason),
    createContractInsightItem("风险等级", `${risk.level} / ${risk.score}`, "综合现金压力、违约金、城市热度和信誉"),
    createContractInsightItem("城市模板", template.label, template.bonus),
    createContractInsightItem("预计回本", `${Math.max(1, Math.ceil(financials.upfront / Math.max(1, financials.partnerPerRound)))} 轮`, `预计总分红 ${formatMoney(financials.partnerExpected)}`),
  );
  return panel;
}

function createContractInsightItem(label, value, detail) {
  const item = document.createElement("article");
  item.className = "contract-insight-item";
  const small = document.createElement("small");
  small.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  const span = document.createElement("span");
  span.textContent = detail;
  item.append(small, strong, span);
  return item;
}

function createBlankContractPreview(partner) {
  const preview = document.createElement("section");
  preview.className = "contract-blank-preview";

  const meta = document.createElement("div");
  meta.className = "contract-paper-meta";
  meta.append(
    createContractMetaPill("合同编号", "WD-待定"),
    createContractMetaPill("签署回合", `第 ${state.round} 轮`),
    createContractMetaPill("合作分红", "待计算"),
    createContractMetaPill("城市评级", "待选择"),
  );

  const summary = document.createElement("p");
  summary.className = "contract-summary-strip";
  summary.textContent = "这是一张空白合同样本：选择对手名下城市后，会自动填入双方玩家、合同价值、给付金额、分红、违约金和签名栏；正式合同必须提交给对方同意后才会生效。";

  const parties = document.createElement("div");
  parties.className = "contract-party-grid";
  parties.append(
    createContractInfoBlock("甲方 / 城市持有人", "对方玩家", "等待选择对手名下区域"),
    createContractInfoBlock("乙方 / 合作投资人", partner?.name || "你的玩家", "等待支付入场费并获得分红权"),
  );

  const moneyGrid = document.createElement("div");
  moneyGrid.className = "contract-money-grid";
  moneyGrid.append(
    createContractMoneyItem("你给对方", "待计算", "选择城市后显示签约入场费"),
    createContractMoneyItem("对方当下收到", "待计算", "选择城市后显示对方入账"),
    createContractMoneyItem("对方给你", "待计算", "选择城市后显示每轮分红"),
    createContractMoneyItem("对方保留", "待计算", "选择城市后显示保留收益"),
    createContractMoneyItem("违约金", "待计算", "选择城市后显示违约成本"),
    createContractMoneyItem("合同期限", `${COOP_CONTRACT_DURATION} 轮`, "正式签约后开始倒计时"),
  );

  preview.append(
    meta,
    summary,
    parties,
    moneyGrid,
    createContractFinePrint("所选城市", null),
    createContractSignatureBlock({ name: "对方玩家" }, { name: partner?.name || "你的玩家" }, false),
  );
  return preview;
}

function createContractDraftSelector(player, selectedIndex) {
  const selector = document.createElement("div");
  selector.className = "contract-draft-selector";
  const label = document.createElement("label");
  label.setAttribute("for", "contractDraftIndex");
  label.textContent = "选择合同项目";
  const select = document.createElement("select");
  select.id = "contractDraftIndex";
  const options = coopContractDraftOptions(player);
  if (!options.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "暂无对手城市可合作";
    select.appendChild(option);
    select.disabled = true;
  } else {
    options.forEach(({ owner, index }) => {
      const option = document.createElement("option");
      option.value = String(index);
      const reason = canSignCoopContract(player, index) ? "可签" : coopDisabledReason(player, index);
      option.textContent = `${owner.name} / ${spaceDisplayName(index)} / ${reason}`;
      select.appendChild(option);
    });
    select.value = Number.isInteger(selectedIndex) ? String(selectedIndex) : String(options[0].index);
  }
  const hint = document.createElement("small");
  hint.textContent = options.length
    ? "换一个项目会立刻刷新双方姓名、付款、分红和违约金。"
    : "需要先让对手拥有城市，合同签署台才会出现项目。";
  selector.append(label, select, hint);
  return selector;
}

function updateContractConfirmButton(canSign, reason = "") {
  if (!confirmContractButton) return;
  confirmContractButton.disabled = !canSign;
  confirmContractButton.title = canSign ? "提交给对方确认" : reason;
  confirmContractButton.textContent = canSign ? "提交给对方" : "暂不能签";
}

function createContractFinePrint(propertyName, financials) {
  const finePrint = document.createElement("section");
  finePrint.className = "contract-fine-print";
  const title = document.createElement("strong");
  title.textContent = "小字条款";
  const list = document.createElement("ol");
  const shareText = financials ? `${Math.round(financials.share * 100)}%` : "合同约定比例";
  const penaltyText = financials ? formatMoney(financials.penalty) : "合同约定违约金";
  const durationText = financials ? `${financials.duration} 轮` : "合同约定期限";
  [
    `${propertyName} 每轮按玩家填写的分红条款结算，参考比例为 ${shareText}，期限为 ${durationText}。`,
    `若城市被抵押、转手、收购，或任一方破产，系统会按违约条款结算，违约金为 ${penaltyText}。`,
    "合同必须由对方同意后才会扣款生效；单方面点击只能提交提案。",
    "签约后不能用优惠券、口头承诺或临时反悔抵扣入场费。",
    "本合同只影响游戏内现金流，不会改变城市所有权，除非之后触发并购或交易系统。",
  ].forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  });
  finePrint.append(title, list);
  return finePrint;
}

function createContractSignatureBlock(owner, partner, canSign) {
  const block = document.createElement("section");
  block.className = "contract-signature-block";
  block.append(
    createContractSignatureLine("甲方签名", owner.name, canSign ? "contractOwnerSignatureInput" : ""),
    createContractSignatureLine("乙方签名", partner.name, canSign ? "contractPartnerSignatureInput" : ""),
  );
  const stamp = document.createElement("div");
  stamp.className = canSign ? "contract-stamp is-ready" : "contract-stamp";
  stamp.textContent = canSign ? "待对方同意" : "条件未满足";
  block.appendChild(stamp);
  return block;
}

function createContractSignatureLine(label, name, inputId = "") {
  const line = document.createElement("article");
  line.className = "contract-signature-line";
  const small = document.createElement("small");
  small.textContent = label;
  const signer = inputId ? document.createElement("input") : document.createElement("strong");
  if (inputId) {
    signer.id = inputId;
    signer.type = "text";
    signer.maxLength = 24;
    signer.value = sanitizeContractSignature(name, label);
    signer.setAttribute("aria-label", label);
  } else {
    signer.textContent = name;
  }
  const rule = document.createElement("span");
  rule.textContent = inputId ? "玩家可填写签名" : "签名线";
  line.append(small, signer, rule);
  return line;
}

function buildCoopProposal(index, partnerId, negotiationMode, clause, proposerId = partnerId, customTerms = {}) {
  const partner = playerById(partnerId);
  const owner = playerById(state.owners[index]);
  if (!partner || !owner) return null;
  const financials = coopContractFinancialsWithTerms(index, negotiationMode, customTerms);
  const risk = contractRiskAssessment(index, financials, partner, owner);
  const template = contractTemplateForCity(index);
  return {
    id: `proposal-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    propertyIndex: index,
    ownerId: owner.id,
    partnerId: partner.id,
    proposerId,
    approverId: owner.id,
    negotiationMode: financials.mode,
    modeLabel: financials.modeLabel,
    upfront: financials.upfront,
    ownerReceipt: financials.ownerReceipt,
    penalty: financials.penalty,
    share: financials.share,
    partnerPerRound: financials.partnerPerRound,
    ownerPerRound: financials.ownerPerRound,
    duration: financials.duration,
    contractValue: financials.contractValue,
    clause: sanitizeContractClause(clause || template.clause),
    template: template.label,
    riskLevel: risk.level,
    riskScore: risk.score,
    advisor: risk.advisor,
    round: state.round,
    status: "pending",
    response: "等待对方同意",
    ownerSignature: sanitizeContractSignature(customTerms.ownerSignature, owner.name),
    partnerSignature: sanitizeContractSignature(customTerms.partnerSignature, partner.name),
  };
}

function submitCoopProposal(index, clause, partnerId, negotiationMode = "standard", customTerms = {}) {
  const partner = playerById(partnerId);
  const owner = playerById(state.owners[index]);
  const financials = coopContractFinancialsWithTerms(index, negotiationMode, customTerms);
  if (!partner || !owner || !canSignCoopContract(partner, index, financials)) return;
  const proposal = buildCoopProposal(index, partner.id, negotiationMode, clause, partner.id, customTerms);
  if (!proposal) return;

  if (owner.isAI) {
    resolveAiCoopProposal(proposal);
    render();
    return;
  }

  state.coopProposals = [proposal, ...normalizeCoopProposals(state.coopProposals)].slice(0, COOP_CONTRACT_ARCHIVE_LIMIT);
  state.status = `${partner.name} 已把 ${spaceDisplayName(index)} 合同提交给 ${owner.name}，等待对方同意。`;
  logEvent(`${partner.name} 提交 ${spaceDisplayName(index)} 合同提案，等待 ${owner.name} 同意。`);
  addNews("合同待确认", `${spaceDisplayName(index)} 合同需要 ${owner.name} 同意后才生效。`, "deal");
  render();
}

function acceptCoopProposal(proposalId) {
  const proposal = normalizeCoopProposals(state.coopProposals).find((item) => item.id === proposalId);
  const approver = playerById(proposal?.approverId);
  if (!proposal || proposal.status !== "pending" || !approver || approver.isAI) return;
  const partner = playerById(proposal.partnerId);
  const financials = coopContractFinancialsWithTerms(proposal.propertyIndex, proposal.negotiationMode, proposal);
  if (!canFinalizeCoopContract(partner, proposal.propertyIndex, financials)) {
    proposal.status = "rejected";
    proposal.response = "条件已变化，不能生效";
    state.coopProposals = normalizeCoopProposals(state.coopProposals).map((item) => item.id === proposal.id ? proposal : item);
    render();
    return;
  }
  state.coopProposals = normalizeCoopProposals(state.coopProposals).filter((item) => item.id !== proposal.id);
  proposal.ownerSignature = sanitizeContractSignature(approver.name, approver.name);
  executeSignCoopContract(proposal.propertyIndex, proposal.clause, proposal.partnerId, proposal.negotiationMode, proposal.id, proposal);
  render();
}

function declineCoopProposal(proposalId) {
  const proposal = normalizeCoopProposals(state.coopProposals).find((item) => item.id === proposalId);
  const approver = playerById(proposal?.approverId);
  if (!proposal || proposal.status !== "pending" || !approver || approver.isAI) return;
  proposal.status = "rejected";
  proposal.response = `${approver.name} 不同意`;
  state.coopProposals = normalizeCoopProposals(state.coopProposals).map((item) => item.id === proposal.id ? proposal : item);
  state.status = `${approver.name} 拒绝了 ${spaceDisplayName(proposal.propertyIndex)} 合同提案。`;
  logEvent(`${approver.name} 拒绝合同提案：${spaceDisplayName(proposal.propertyIndex)}。`);
  render();
}

function maybeCreateAiCoopProposal(human) {
  if (!human || human.isAI || state.gameOver || state.lastCoopProposalRound === state.round) return;
  if (coopProposalsForPlayer(human).some((proposal) => proposal.status === "pending")) return;
  const humanOwned = ownedPropertyIndexes(human.id)
    .filter((index) => spaces[index]?.type === "property" && !state.mortgages[index])
    .filter((index) => !hasActiveCoopContract(human.id, index) && !hasPendingCoopProposal(human.id, index))
    .sort((a, b) => coopScore(b) - coopScore(a));
  if (!humanOwned.length) return;

  const aiPartner = activePlayers()
    .filter((player) => player.isAI && player.cash >= 220)
    .sort((a, b) => b.cash - a.cash)[0];
  if (!aiPartner) return;

  const index = humanOwned[0];
  const negotiationMode = aiPartner.cash > coopUpfront(index) * 1.35 ? "premiumShare" : "standard";
  const financials = coopContractFinancials(index, negotiationMode);
  if (!canFinalizeCoopContract(aiPartner, index, financials)) return;

  const proposal = buildCoopProposal(index, aiPartner.id, negotiationMode, contractTemplateForCity(index).clause, aiPartner.id, {
    ownerSignature: human.name,
    partnerSignature: aiPartner.name,
  });
  if (!proposal) return;
  proposal.approverId = human.id;
  proposal.response = "对手主动提出合作，等待你同意";
  state.coopProposals = [proposal, ...normalizeCoopProposals(state.coopProposals)].slice(0, COOP_CONTRACT_ARCHIVE_LIMIT);
  state.lastCoopProposalRound = state.round;
  addNews("对手合同提案", `${aiPartner.name} 想与你合作 ${spaceDisplayName(index)}，需要你同意。`, "deal");
}

function resolveAiCoopProposal(proposal) {
  const owner = playerById(proposal.ownerId);
  const partner = playerById(proposal.partnerId);
  const financials = coopContractFinancialsWithTerms(proposal.propertyIndex, proposal.negotiationMode, proposal);
  const baseUpfront = coopUpfront(proposal.propertyIndex);
  const ownerRisk = owner ? riskIndex(owner).score : 50;
  const partnerRep = contractReputationFor(partner);
  const minimumOwnerShare = Math.round(coopDividend(proposal.propertyIndex) * 0.28);
  const accepts = proposal.ownerReceipt >= Math.round(baseUpfront * 0.92) &&
    proposal.riskScore < 76 &&
    proposal.ownerPerRound >= minimumOwnerShare &&
    proposal.duration <= 8 &&
    partnerRep >= 42 &&
    ownerRisk < 86;

  if (accepts) {
    state.status = `${owner.name} 同意了 ${partner.name} 的 ${spaceDisplayName(proposal.propertyIndex)} 合同提案。`;
    logEvent(`${owner.name} 同意合同提案，${spaceDisplayName(proposal.propertyIndex)} 合同正式生效。`);
    proposal.ownerSignature = sanitizeContractSignature(owner.name, owner.name);
    executeSignCoopContract(proposal.propertyIndex, proposal.clause, proposal.partnerId, proposal.negotiationMode, proposal.id, proposal);
    return;
  }

  proposal.status = "rejected";
  proposal.response = proposal.ownerReceipt < baseUpfront
    ? "对方要求更高入场费"
    : proposal.ownerPerRound < minimumOwnerShare
      ? "对方保留收益太低"
      : proposal.duration > 8
        ? "对方不接受太长期限"
        : "对方认为风险太高";
  state.coopProposals = [proposal, ...normalizeCoopProposals(state.coopProposals)].slice(0, COOP_CONTRACT_ARCHIVE_LIMIT);
  state.status = `${owner.name} 没有同意 ${spaceDisplayName(proposal.propertyIndex)} 合同：${proposal.response}。`;
  logEvent(`${owner.name} 拒绝 ${partner?.name || "合作方"} 的合同提案：${proposal.response}。`);
  addNews("合同未通过", `${spaceDisplayName(proposal.propertyIndex)} 合同被对方拒绝：${proposal.response}。`, "debt");
  showContractAnimation("合同未通过", `${owner.name}：${proposal.response}`, "debt");
}

function createContractInfoBlock(label, name, detail) {
  const block = document.createElement("article");
  block.className = "contract-info-block";
  const small = document.createElement("small");
  small.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = name;
  const span = document.createElement("span");
  span.textContent = detail;
  block.append(small, strong, span);
  return block;
}

function createContractMoneyItem(label, value, detail) {
  const item = document.createElement("article");
  item.className = "contract-money-item";
  const small = document.createElement("small");
  small.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  const span = document.createElement("span");
  span.textContent = detail;
  item.append(small, strong, span);
  return item;
}

function createContractMoneyInput(label, inputId, value, detail) {
  const item = document.createElement("label");
  item.className = "contract-money-item contract-field-item";
  const small = document.createElement("small");
  small.textContent = label;
  const input = document.createElement("input");
  input.id = inputId;
  input.type = "number";
  input.inputMode = "numeric";
  input.min = inputId === "contractDurationInput" ? "1" : "0";
  input.max = inputId === "contractDurationInput" ? String(COOP_CONTRACT_MAX_DURATION) : "99999";
  input.step = "1";
  input.value = String(Math.max(0, Math.round(Number(value) || 0)));
  const span = document.createElement("span");
  span.textContent = detail;
  item.append(small, input, span);
  return item;
}

function executeSignCoopContract(index, clause = "抵押 / 转手 / 破产触发违约", partnerId = currentPlayer()?.id, negotiationMode = "standard", proposalId = "", agreedTerms = {}) {
  const partner = playerById(partnerId) || currentPlayer();
  const owner = playerById(state.owners[index]);
  const financials = coopContractFinancialsWithTerms(index, negotiationMode, agreedTerms || {});
  if (!canFinalizeCoopContract(partner, index, financials) || !owner) return;

  const upfront = financials.upfront;
  const ownerReceipt = financials.ownerReceipt;
  const penalty = financials.penalty;
  const risk = contractRiskAssessment(index, financials, partner, owner);
  const template = contractTemplateForCity(index);
  partner.cash -= upfront;
  owner.cash += ownerReceipt;
  const contract = {
    id: `coop-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    propertyIndex: index,
    ownerId: owner.id,
    partnerId: partner.id,
    share: financials.share,
    partnerPerRound: financials.partnerPerRound,
    ownerPerRound: financials.ownerPerRound,
    upfront,
    ownerReceipt,
    penalty,
    duration: financials.duration,
    remainingRounds: financials.duration,
    signedRound: state.round,
    status: "active",
    clause: sanitizeContractClause(clause),
    negotiationMode: financials.mode,
    template: template.label,
    riskLevel: risk.level,
    riskScore: risk.score,
    advisor: risk.advisor,
    approvedBy: owner.id,
    proposalId: String(proposalId || ""),
    ownerSignature: sanitizeContractSignature(agreedTerms?.ownerSignature, owner.name),
    partnerSignature: sanitizeContractSignature(agreedTerms?.partnerSignature, partner.name),
    totalPartnerPaid: 0,
    totalOwnerPaid: 0,
    totalDividend: 0,
    settlement: "",
  };
  state.coopContracts = [contract, ...normalizeCoopContracts(state.coopContracts)].slice(0, COOP_CONTRACT_ARCHIVE_LIMIT);
  adjustContractReputation(partner, 1);
  adjustContractReputation(owner, 1);
  addCityRevenue(index, Math.round(upfront * 0.22));
  awardSkillXp(partner, 30, `${spaceDisplayName(index)} 合作合同`);
  state.status = `${owner.name} 已同意，${partner.name} 与 ${owner.name} 签下 ${spaceDisplayName(index)} ${financials.modeLabel}，你付 ${formatMoney(upfront)}，对方收 ${formatMoney(ownerReceipt)}。`;
  logEvent(`${owner.name} 同意后，${partner.name} 与 ${owner.name} 签订 ${spaceDisplayName(index)} 合作合同。期限 ${financials.duration} 轮，违约金 ${formatMoney(penalty)}。`);
  addNews("合作合同", `${partner.name} 入股合作 ${spaceDisplayName(index)}，之后按合同分红。`, "deal");
  logDeal("合作合同", `${partner.name} + ${owner.name} 共营 ${spaceDisplayName(index)}`, upfront, "coop");
  showEventBurst(`${spaceDisplayName(index)} 合作`, "gain");
  checkTasks(partner);
  render();
}

function canTerminateCoopContract(player, contract) {
  return Boolean(player && contract?.status === "active" && (contract.ownerId === player.id || contract.partnerId === player.id));
}

function canRenewCoopContract(player, contract) {
  if (!player || !contract || contract.status === "active") return false;
  const owner = playerById(contract.ownerId);
  const partner = playerById(contract.partnerId);
  return Boolean(
    owner &&
    partner &&
    !owner.bankrupt &&
    !partner.bankrupt &&
    state.owners[contract.propertyIndex] === owner.id &&
    !state.mortgages[contract.propertyIndex] &&
    player.id === partner.id &&
    !hasActiveCoopContract(partner.id, contract.propertyIndex) &&
    !hasPendingCoopProposal(partner.id, contract.propertyIndex),
  );
}

function renewCoopContract(contractId) {
  const player = humanPlayer() || currentPlayer();
  const contract = normalizeCoopContracts(state.coopContracts).find((item) => item.id === contractId);
  if (!canRenewCoopContract(player, contract)) return;
  state.status = `准备续约 ${spaceDisplayName(contract.propertyIndex)}，仍需对方同意后才会生效。`;
  openCoopContractDraft(contract.propertyIndex);
}

function terminateCoopContract(contractId) {
  const player = currentPlayer();
  const contract = normalizeCoopContracts(state.coopContracts).find((item) => item.id === contractId);
  if (!canTerminateCoopContract(player, contract)) return;
  if (!confirmAction(`提前解约需要支付 ${formatMoney(Math.round(contract.penalty * 0.5))} 解约金，确定吗？`)) return;
  const other = playerById(contract.ownerId === player.id ? contract.partnerId : contract.ownerId);
  const fee = Math.round(contract.penalty * 0.5);
  ensureFunds(player, fee, "合作提前解约金");
  const paid = Math.min(player.cash, fee);
  player.cash -= paid;
  if (other && !other.bankrupt) other.cash += paid;
  contract.status = "terminated";
  contract.remainingRounds = 0;
  contract.endedRound = state.round;
  contract.breachReason = "提前解约";
  contract.settlement = `${player.name} 提前解约，支付 ${formatMoney(paid)}；信誉下降。`;
  adjustContractReputation(player, -3);
  if (other && !other.bankrupt) adjustContractReputation(other, 1);
  state.coopContracts = normalizeCoopContracts(state.coopContracts).map((item) => item.id === contract.id ? contract : item);
  state.status = `${player.name} 提前解除 ${spaceDisplayName(contract.propertyIndex)} 合作合同，支付 ${formatMoney(paid)}。`;
  logEvent(`${player.name} 提前解除 ${spaceDisplayName(contract.propertyIndex)} 合同。`);
  logDeal("合作解约", `${spaceDisplayName(contract.propertyIndex)} 提前解除`, paid, "coop");
  showContractAnimation("合同解约", `${player.name} 支付 ${formatMoney(paid)} / 信誉 ${contractReputationFor(player)}`, "debt");
  if (paid < fee) bankruptPlayer(player, "合作提前解约金不足");
  render();
}

function businessDealOptions(player) {
  if (!player || player.isAI || player.bankrupt || state.gameOver) return [];
  const deals = [];
  const owned = ownedPropertyIndexes(player.id).filter((index) => spaces[index]?.type === "property" && !state.mortgages[index]);
  const fundingTarget = owned
    .filter((index) => cityFundingRounds(index) < CAPITAL_ROUND_LIMIT)
    .sort((a, b) => cityValuation(b) - cityValuation(a))[0];
  if (fundingTarget !== undefined) {
    const amount = capitalRaiseAmount(fundingTarget);
    const round = cityFundingRounds(fundingTarget) + 1;
    deals.push({
      action: "funding",
      index: fundingTarget,
      tone: "equity",
      tag: `${fundingRoundLabel(round)} 股权融资`,
      title: `${spaces[fundingTarget].name} 股权路演`,
      detail: `机构注资 ${formatMoney(amount)}，城市估值上升，但集团股权稀释约 ${Math.round(equityDilutionFor(player, amount) * 100)}%。`,
      button: `融 ${formatMoney(amount)}`,
      disabled: !canRaiseCapital(player, fundingTarget),
      reason: businessDealReason("funding", player, fundingTarget),
    });
  }

  const leverageAmount = leverageFinanceAmount(player);
  deals.push({
    action: "leverage",
    tone: "debt",
    tag: "杠杆融资",
    title: `开 ${maxLeverageMultiple(player).toFixed(1)}x 资金杠杆`,
    detail: `可追加 ${formatMoney(leverageAmount)} 交易资金，年化利率 ${Math.round(marginInterestRate(player) * 1000) / 10}%，会推高风险指数。`,
    button: `杠杆 ${formatMoney(leverageAmount)}`,
    disabled: !canUseLeverageFinance(player),
    reason: businessDealReason("leverage", player),
  });

  const convertibleAmount = convertibleDebtAmount(player);
  deals.push({
    action: "convertible",
    tone: "convertible",
    tag: "可转债融资",
    title: "发行可转债",
    detail: `获得 ${formatMoney(convertibleAmount)}，利率 ${Math.round(convertibleInterestRate(player) * 1000) / 10}%，之后可债转股降低债务。`,
    button: `发债 ${formatMoney(convertibleAmount)}`,
    disabled: !canIssueConvertibleDebt(player),
    reason: businessDealReason("convertible", player),
  });

  const convertibleDebt = financeFor(player).convertibleDebt;
  if (convertibleDebt > 0) {
    const convertAmount = convertibleConversionAmount(player);
    deals.push({
      action: "convertDebt",
      tone: "equity",
      tag: "债转股",
      title: "可转债转股",
      detail: `把 ${formatMoney(convertAmount)} 可转债转成股权，债务下降，股权稀释约 ${Math.round(convertibleDilutionFor(player, convertAmount) * 100)}%。`,
      button: `转股 ${formatMoney(convertAmount)}`,
      disabled: !canConvertDebtToEquity(player),
      reason: businessDealReason("convertDebt", player),
    });
  }

  const takeoverTarget = activePlayers()
    .filter((seller) => seller.id !== player.id)
    .flatMap((seller) => ownedPropertyIndexes(seller.id).map((index) => ({ seller, index })))
    .filter(({ index }) => spaces[index]?.type === "property" && !state.mortgages[index])
    .sort((a, b) => takeoverScore(b.index) - takeoverScore(a.index))[0];
  if (takeoverTarget) {
    const price = takeoverOfferPrice(takeoverTarget.index);
    deals.push({
      action: "takeover",
      index: takeoverTarget.index,
      tone: "build",
      tag: "战略并购",
      title: `收购 ${spaces[takeoverTarget.index].name}`,
      detail: `${takeoverTarget.seller.name} 持有，估值 ${formatMoney(cityValuation(takeoverTarget.index))}，溢价报价可直接拿下核心资产。`,
      button: `并购 ${formatMoney(price)}`,
      disabled: !canTakeover(player, takeoverTarget.index),
      reason: businessDealReason("takeover", player, takeoverTarget.index),
    });
  }

  const bondAmount = corporateBondAmount(player);
  deals.push({
    action: "bond",
    tone: "debt",
    tag: "城市债券",
    title: "发行城市建设债",
    detail: `以资产组合信用融资 ${formatMoney(bondAmount)}，债务 ${formatMoney(corporateBondDebt(player))}，利率 ${Math.round(bondInterestRate(player) * 1000) / 10}%。`,
    button: `发行 ${formatMoney(bondAmount)}`,
    disabled: !canIssueBond(player),
    reason: businessDealReason("bond", player),
  });

  return deals;
}

function executeBusinessDeal(action, index) {
  const player = currentPlayer();
  if (!businessDealsOpen(player)) return;
  if (action === "funding") {
    raiseCapital(index);
    return;
  }
  if (action === "takeover") {
    executeTakeover(index);
    return;
  }
  if (action === "leverage") {
    useLeverageFinance();
    return;
  }
  if (action === "convertible") {
    issueConvertibleDebt();
    return;
  }
  if (action === "convertDebt") {
    convertDebtToEquity();
    return;
  }
  if (action === "bond") {
    issueCorporateBond();
  }
}

function raiseCapital(index) {
  const player = currentPlayer();
  if (!canRaiseCapital(player, index)) return;
  const amount = capitalRaiseAmount(index);
  const round = cityFundingRounds(index) + 1;
  const finance = financeFor(player);
  const dilution = equityDilutionFor(player, amount);
  player.cash += amount;
  finance.equityRaised += amount;
  finance.equityDilution = clamp(finance.equityDilution + dilution, 0, MAX_EQUITY_DILUTION);
  state.cityFunding[index] = round;
  addCityRevenue(index, Math.round(amount * 0.48));
  awardSkillXp(player, 30, `${spaceDisplayName(index)} 股权融资`);
  state.status = `${player.name} 完成 ${spaces[index].name} ${fundingRoundLabel(round)} 股权融资，现金增加 ${formatMoney(amount)}。`;
  logEvent(`${spaces[index].name} 完成融资路演，估值升至 ${formatMoney(cityValuation(index))}。`);
  addNews("股权融资", `${spaceDisplayName(index)} 完成 ${fundingRoundLabel(round)} 融资，股权稀释到 ${Math.round(finance.equityDilution * 100)}%。`, "deal");
  logDeal("股权融资", `${player.name} 为 ${spaces[index].name} 引入机构资金`, amount, "equity");
  logBank("股权融资", `${spaceDisplayName(index)} 稀释 ${Math.round(dilution * 100)}%`, amount, "equity");
  showEventBurst(`${spaces[index].name} 融资`, "gain");
  checkTasks(player);
  renderPropertyDialog(index);
  render();
}

function executeTakeover(index) {
  const buyer = currentPlayer();
  if (!canTakeover(buyer, index)) return;
	  const seller = playerById(state.owners[index]);
	  const price = takeoverOfferPrice(index);
	  buyer.cash -= price;
	  seller.cash += price;
	  breachCoopContractsForProperty(index, seller.id, "并购转手");
	  state.owners[index] = buyer.id;
  addCityRevenue(index, Math.round(price * 0.1));
  state.status = `${buyer.name} 发起战略并购，用 ${formatMoney(price)} 拿下 ${spaces[index].name}。`;
  logEvent(`${buyer.name} 从 ${seller.name} 手中并购 ${spaces[index].name}。`);
  addNews("并购大战", `${buyer.name} 溢价收购 ${spaceDisplayName(index)}，控制权转移。`, "deal");
  logDeal("战略并购", `${spaces[index].name} 控制权转移给 ${buyer.name}`, price, "build");
  showEventBurst(`${spaces[index].name} 并购完成`, "buy");
  checkTasks(buyer);
  renderPropertyDialog(index);
  render();
}

function useLeverageFinance() {
  const player = currentPlayer();
  if (!canUseLeverageFinance(player)) return;
  const amount = leverageFinanceAmount(player);
  const finance = financeFor(player);
  player.cash += amount;
  player.debt = (player.debt || 0) + amount;
  finance.marginDebt += amount;
  awardSkillXp(player, 22, "杠杆融资");
  state.status = `${player.name} 启用 ${maxLeverageMultiple(player).toFixed(1)}x 杠杆融资，获得 ${formatMoney(amount)}。`;
  logEvent(`${player.name} 使用杠杆融资，保证金债务增加 ${amount}。`);
  addNews("杠杆融资", `${player.name} 获得 ${formatMoney(amount)} 杠杆资金，融资利率 ${Math.round(marginInterestRate(player) * 1000) / 10}%。`, "debt");
  logDeal("杠杆融资", `${player.name} 提高交易火力`, amount, "debt");
  logBank("杠杆融资", `${currentLeverageMultiple(player).toFixed(1)}x / 上限 ${maxLeverageMultiple(player).toFixed(1)}x`, amount, "loan");
  showEventBurst(`+${formatMoney(amount)} 杠杆`, "gain");
  checkTasks(player);
  render();
}

function issueConvertibleDebt() {
  const player = currentPlayer();
  if (!canIssueConvertibleDebt(player)) return;
  const amount = convertibleDebtAmount(player);
  const debt = convertibleDebtObligation(player);
  const finance = financeFor(player);
  player.cash += amount;
  player.debt = (player.debt || 0) + debt;
  finance.convertibleDebt += debt;
  awardSkillXp(player, 22, "可转债融资");
  state.status = `${player.name} 发行可转债，获得 ${formatMoney(amount)}，可之后债转股。`;
  logEvent(`${player.name} 发行可转债，债务增加 ${debt}。`);
  addNews("可转债融资", `${player.name} 用低息可转债拿到 ${formatMoney(amount)}，未来可债转股。`, "debt");
  logDeal("可转债融资", `${player.name} 获得低息资本`, amount, "convertible");
  logBank("可转债", `利率 ${Math.round(convertibleInterestRate(player) * 1000) / 10}%`, debt, "loan");
  showEventBurst(`+${formatMoney(amount)} 可转债`, "gain");
  checkTasks(player);
  render();
}

function convertDebtToEquity() {
  const player = currentPlayer();
  if (!canConvertDebtToEquity(player)) return;
  const finance = financeFor(player);
  const amount = convertibleConversionAmount(player);
  const dilution = convertibleDilutionFor(player, amount);
  finance.convertibleDebt = Math.max(0, finance.convertibleDebt - amount);
  finance.equityDilution = clamp(finance.equityDilution + dilution, 0, MAX_EQUITY_DILUTION);
  player.debt = Math.max(0, (player.debt || 0) - amount);
  awardSkillXp(player, 24, "债转股");
  state.status = `${player.name} 将 ${formatMoney(amount)} 可转债转股，债务下降但股权稀释。`;
  logEvent(`${player.name} 可转债转股，减少 ${amount} 债务。`);
  addNews("债转股", `${player.name} 降低债务，股权稀释到 ${Math.round(finance.equityDilution * 100)}%。`, "deal");
  logDeal("债转股", `${player.name} 用股权换取低负债`, amount, "equity");
  logBank("债转股", `稀释 ${Math.round(dilution * 100)}%`, amount, "repay");
  showEventBurst(`-${formatMoney(amount)} 债务`, "build");
  checkTasks(player);
  render();
}

function issueCorporateBond() {
  const player = currentPlayer();
  if (!canIssueBond(player)) return;
  const amount = corporateBondAmount(player);
  const debt = corporateBondDebt(player);
  const finance = financeFor(player);
  player.cash += amount;
  player.debt = (player.debt || 0) + debt;
  finance.bondDebt += debt;
  awardSkillXp(player, 24, "城市债券");
  state.status = `${player.name} 发行城市建设债，获得 ${formatMoney(amount)} 流动资金。`;
  logEvent(`${player.name} 发行城市债券，账面债务增加 ${formatMoney(debt)}。`);
  addNews("债券发行", `${player.name} 以资产组合融资 ${formatMoney(amount)}，风险指数上升。`, "debt");
  logDeal("城市债券", `${player.name} 用资产组合完成融资`, amount, "debt");
  logBank("城市债券", `${player.name} 扩大信用负债`, debt, "loan");
  showEventBurst(`+${formatMoney(amount)} 债券`, "gain");
  checkTasks(player);
  render();
}

function businessDealsOpen(player) {
  const actor = currentPlayer();
  return Boolean(
    player &&
    actor?.id === player.id &&
    !player.isAI &&
    !player.bankrupt &&
    !state.gameOver &&
    BUSINESS_DEAL_PHASES.includes(state.phase),
  );
}

function canRaiseCapital(player, index) {
  return Boolean(
    businessDealsOpen(player) &&
    spaces[index]?.type === "property" &&
    state.owners[index] === player.id &&
    !state.mortgages[index] &&
    cityFundingRounds(index) < CAPITAL_ROUND_LIMIT,
  );
}

function canTakeover(player, index) {
  const seller = playerById(state.owners[index]);
  return Boolean(
    businessDealsOpen(player) &&
    seller &&
    seller.id !== player.id &&
    spaces[index]?.type === "property" &&
    !state.mortgages[index] &&
    player.cash >= takeoverOfferPrice(index),
  );
}

function canIssueBond(player) {
  return Boolean(
    businessDealsOpen(player) &&
    ownedPropertyIndexes(player.id).length >= 2 &&
    availableCredit(player) >= corporateBondDebt(player),
  );
}

function canUseLeverageFinance(player) {
  return Boolean(
    businessDealsOpen(player) &&
    ownedPropertyIndexes(player.id).length >= 1 &&
    leverageFinanceAmount(player) >= LEVERAGE_FINANCE_BLOCK &&
    currentLeverageMultiple(player) < maxLeverageMultiple(player),
  );
}

function canIssueConvertibleDebt(player) {
  return Boolean(
    businessDealsOpen(player) &&
    ownedPropertyIndexes(player.id).length >= 1 &&
    availableCredit(player) >= convertibleDebtObligation(player) &&
    financeFor(player).convertibleDebt < 900,
  );
}

function canConvertDebtToEquity(player) {
  return Boolean(
    businessDealsOpen(player) &&
    financeFor(player).convertibleDebt > 0 &&
    financeFor(player).equityDilution < MAX_EQUITY_DILUTION,
  );
}

function businessDealReason(action, player, index) {
  if (!businessDealsOpen(player)) return "等你的行动阶段可用";
  if (action === "funding") {
    if (state.owners[index] !== player.id) return "不是你的城市";
    if (state.mortgages[index]) return "已抵押";
    if (cityFundingRounds(index) >= CAPITAL_ROUND_LIMIT) return "融资已满";
    return "";
  }
  if (action === "takeover") {
    if (!state.owners[index] || state.owners[index] === player.id) return "没有可并购卖方";
    return player.cash >= takeoverOfferPrice(index) ? "" : "现金不足";
  }
  if (action === "bond") {
    if (ownedPropertyIndexes(player.id).length < 2) return "至少需要 2 座城市";
    return availableCredit(player) >= corporateBondDebt(player) ? "" : "信用额度不足";
  }
  if (action === "leverage") {
    if (ownedPropertyIndexes(player.id).length < 1) return "至少需要 1 座城市";
    if (currentLeverageMultiple(player) >= maxLeverageMultiple(player)) return "杠杆已满";
    return leverageFinanceAmount(player) >= LEVERAGE_FINANCE_BLOCK ? "" : "保证金额度不足";
  }
  if (action === "convertible") {
    if (ownedPropertyIndexes(player.id).length < 1) return "至少需要 1 座城市";
    if (financeFor(player).convertibleDebt >= 900) return "可转债过高";
    return availableCredit(player) >= convertibleDebtObligation(player) ? "" : "信用额度不足";
  }
  if (action === "convertDebt") {
    if (financeFor(player).convertibleDebt <= 0) return "没有可转债";
    return financeFor(player).equityDilution < MAX_EQUITY_DILUTION ? "" : "股权稀释已高";
  }
  return "";
}

function tradeOfferPrice(propertyIndex) {
  return Math.ceil((cityValuation(propertyIndex) * 1.12) / 10) * 10;
}

function cityFundingRounds(index) {
  return clamp(Number(state.cityFunding?.[index] || 0), 0, CAPITAL_ROUND_LIMIT);
}

function fundingRoundLabel(round) {
  return ["种子", "A轮", "B轮", "C轮"][round] || "后续";
}

function cityValuation(index) {
  const space = spaces[index];
  if (!space || space.type !== "property") return 0;
  const buildValue = (state.levels[index] || 0) * (space.buildCost || 0) * 1.2;
  const revenueValue = (state.cityRevenue[index] || 0) * 0.95;
  const stockValue = stockPrice(index) * 8;
  const powerValue = cityPowerScore(index) * 4;
  const fundingValue = cityFundingRounds(index) * 90;
  const ratingValue = cityRatingScore(index) * 2;
  const companyValue = cityCompanyCount(index) * 115;
  const publicValue = state.cityPublic?.[index] ? 260 : 0;
  const headquartersValue = isHeadquarter(state.owners[index], index) ? 180 : 0;
  const ownerPremium = state.owners[index] ? 1.08 : 1;
  const mortgagePenalty = state.mortgages[index] ? 0.62 : 1;
  return Math.max(40, Math.round(((propertyPrice(index) + buildValue + revenueValue + stockValue + powerValue + fundingValue + ratingValue + companyValue + publicValue + headquartersValue) * ownerPremium * mortgagePenalty) / 10) * 10);
}

function capitalRaiseAmount(index) {
  const round = cityFundingRounds(index);
  const base = cityValuation(index) * (0.18 + round * 0.04);
  return Math.round(clamp(base, 160, 760) / 10) * 10;
}

function capitalObligation(amount) {
  return Math.round((amount * 0.38) / 10) * 10;
}

function takeoverOfferPrice(index) {
  return Math.ceil((cityValuation(index) * 1.28) / 10) * 10;
}

function takeoverScore(index) {
  const owner = playerById(state.owners[index]);
  const grudgeBonus = currentPlayer()?.grudgeTarget && owner?.id === currentPlayer().grudgeTarget ? 80 : 0;
  return cityValuation(index) + (state.levels[index] || 0) * 70 + (state.cityRevenue[index] || 0) * 0.6 + grudgeBonus;
}

function portfolioMarketValue(player) {
  return ownedPropertyIndexes(player.id).reduce((total, index) => total + cityValuation(index), 0)
    + Object.entries(player.stocks || {}).reduce((total, [index, shares]) => total + stockPrice(Number(index)) * Number(shares || 0), 0);
}

function creditLimit(player) {
  const owned = ownedPropertyIndexes(player.id).length;
  const portfolio = portfolioMarketValue(player);
  const bankNetwork = ownedCompanyCount(player, "bank");
  return Math.round((520 + owned * 120 + bankNetwork * 170 + portfolio * 0.16) / 10) * 10;
}

function availableCredit(player) {
  return Math.max(0, creditLimit(player) - (player.debt || 0));
}

function corporateBondAmount(player) {
  const base = 260 + ownedPropertyIndexes(player.id).length * 48 + Math.round(marketIndexValue() * 0.55);
  return Math.round(clamp(base, 280, 820) / 10) * 10;
}

function corporateBondDebt(player) {
  return Math.round((corporateBondAmount(player) * 1.18) / 10) * 10;
}

function marketIndexValue() {
  const cities = spaces
    .map((space, index) => (space.type === "property" ? stockPrice(index) + cityPowerScore(index) * 0.7 : 0))
    .filter(Boolean);
  if (!cities.length) return 100;
  const average = cities.reduce((total, value) => total + value, 0) / cities.length;
  return Math.round(clamp(average * currentMarket().price, 65, 260));
}

function marketIndexLabel() {
  const value = marketIndexValue();
  const direction = value >= 145 ? "强势" : value >= 105 ? "活跃" : "观望";
  return `${value} ${direction}`;
}

function realEstateIndexValue() {
  const values = spaces
    .map((space, index) => (space.type === "property" ? propertyPrice(index) + (state.levels[index] || 0) * 45 + cityCompanyCount(index) * 35 : 0))
    .filter(Boolean);
  if (!values.length) return 100;
  return Math.round(clamp(values.reduce((sum, value) => sum + value, 0) / values.length, 70, 260));
}

function stockIndexValue() {
  const values = spaces
    .map((space, index) => (space.type === "property" ? stockPrice(index) : 0))
    .filter(Boolean);
  if (!values.length) return 100;
  return Math.round(clamp(values.reduce((sum, value) => sum + value, 0) / values.length * 1.45, 55, 240));
}

function realEstateIndexLabel() {
  const value = realEstateIndexValue();
  return `${value} ${value >= 160 ? "高温" : value >= 105 ? "活跃" : "低位"}`;
}

function stockIndexLabel() {
  const value = stockIndexValue();
  return `${value} ${value >= 145 ? "追涨" : value >= 95 ? "震荡" : "低迷"}`;
}

function globalFinancingRate() {
  const players = activePlayers();
  if (!players.length) return LOAN_INTEREST_RATE;
  return players.reduce((sum, player) => sum + bankLoanInterestRate(player), 0) / players.length;
}

function addCityRevenue(index, amount) {
  state.cityRevenue[index] = (state.cityRevenue[index] || 0) + Math.max(0, Math.round(amount));
  state.cityPeakRevenue[index] = Math.max(state.cityPeakRevenue[index] || 0, state.cityRevenue[index] || 0);
}

function recordCityCollection(player, index) {
  if (!player || spaces[index]?.type !== "property") return;
  state.cityCollection = normalizeCityCollection([...(state.cityCollection || []), index], state.owners);
}

function logDeal(title, detail, amount, tone = "neutral") {
  state.dealLedger = [
    { title, detail, amount: Math.max(0, Math.round(amount) || 0), tone, round: state.round },
    ...(state.dealLedger || []),
  ].slice(0, DEAL_LEDGER_LIMIT);
  showContractAnimation(title, `${detail} / ${formatMoney(amount || 0)}`, tone);
  unlockAchievement("megaDeal");
}

function shopCardPrice(player, item) {
  const discount = player?.character === "broker" ? characterDefinitions.broker.shopDiscount : 1;
  const blackCardDiscount = hasBlackCard(player) ? 0.9 : 1;
  return Math.max(20, Math.round((item.price * discount * blackCardDiscount * currentMarket().shop) / 10) * 10);
}

function rentBonusFor(player) {
  const characterBonus = player?.character === "landlord" ? characterDefinitions.landlord.rentBonus : 1;
  const surgeBonus = player?.rentSurge ? 1.25 : 1;
  return characterBonus * surgeBonus;
}

function propertyPrice(index) {
  const base = spaces[index]?.price || 0;
  return Math.max(20, Math.round((base * currentMarket().price * currentRules().priceFactor) / 10) * 10);
}

function stockPrice(index) {
  const space = spaces[index];
  if (!space || space.type !== "property") return 0;
  const revenueHeat = Math.min(90, (state.cityRevenue[index] || 0) * 0.18);
  const levelHeat = (state.levels[index] || 0) * 18;
  const fundingHeat = cityFundingRounds(index) * 16;
  const companies = cityCompanies(index);
  const companyHeat = cityCompanyCount(index) * 12 + (companies.techPark ? 16 : 0) + (companies.bank ? 10 : 0);
  const publicHeat = state.cityPublic?.[index] ? 24 : 0;
  const ratingHeat = { C: -10, B: 0, A: 10, S: 22, SS: 36 }[cityRating(index)] || 0;
  const headquartersHeat = isHeadquarter(state.owners[index], index) ? 14 : 0;
  const crashFactor = currentMarket().id === "stockCrash" ? 0.72 : 1;
  return Math.max(20, Math.round(((space.price * 0.22 + revenueHeat + levelHeat + fundingHeat + companyHeat + publicHeat + ratingHeat + headquartersHeat) * crashFactor) / 5) * 5);
}

function currentRules() {
  return normalizeRulesConfig(state.config || {});
}

function currentMarket() {
  return marketDefinitions[state.market?.id] || marketDefinitions.steady;
}

function createMarketState(id = "steady") {
  const marketId = marketDefinitions[id] ? id : "steady";
  return { id: marketId, turnsLeft: 2 };
}

function normalizeMarket(market) {
  const id = marketDefinitions[market?.id] ? market.id : "steady";
  return { id, turnsLeft: Math.max(1, Number(market?.turnsLeft) || 2) };
}

function normalizeRulesConfig(config = {}) {
  const presetId = rulesPresetDefinitions[config.rulesPreset] ? config.rulesPreset : "classic";
  const preset = rulesPresetDefinitions[presetId];
  const startCash = clamp(Math.round((Number(config.startCash) || preset.startCash) / 100) * 100, 800, 3000);
  return {
    rulesPreset: presetId,
    startCash,
    priceFactor: preset.priceFactor,
    buildFactor: preset.buildFactor,
    taxFactor: preset.taxFactor,
    turnLimit: preset.turnLimit,
  };
}

function normalizeStocks(stocks) {
  const result = {};
  if (!stocks || typeof stocks !== "object") return result;
  Object.entries(stocks).forEach(([key, value]) => {
    const index = Number(key);
    const shares = clamp(Number(value) || 0, 0, STOCK_MAX_PER_CITY + IPO_STOCK_BONUS);
    if (Number.isInteger(index) && spaces[index]?.type === "property" && shares > 0) {
      result[index] = shares;
    }
  });
  return result;
}

function createFinanceAccount() {
  return {
    marginDebt: 0,
    convertibleDebt: 0,
    bondDebt: 0,
    equityRaised: 0,
    equityDilution: 0,
    shortPositions: {},
  };
}

function normalizeFinanceAccount(finance) {
  const next = createFinanceAccount();
  if (!finance || typeof finance !== "object") return next;
  next.marginDebt = Math.max(0, Math.round(Number(finance.marginDebt) || 0));
  next.convertibleDebt = Math.max(0, Math.round(Number(finance.convertibleDebt) || 0));
  next.bondDebt = Math.max(0, Math.round(Number(finance.bondDebt) || 0));
  next.equityRaised = Math.max(0, Math.round(Number(finance.equityRaised) || 0));
  next.equityDilution = clamp(Number(finance.equityDilution) || 0, 0, MAX_EQUITY_DILUTION);
  next.shortPositions = normalizeShortPositions(finance.shortPositions);
  return next;
}

function normalizeShortPositions(positions) {
  const result = {};
  if (!positions || typeof positions !== "object") return result;
  Object.entries(positions).forEach(([key, value]) => {
    const index = Number(key);
    if (!Number.isInteger(index) || spaces[index]?.type !== "property") return;
    const shares = clamp(Number(value?.shares) || 0, 0, SHORT_MAX_PER_CITY);
    if (shares <= 0) return;
    result[index] = {
      shares,
      entryPrice: Math.max(0, Math.round(Number(value.entryPrice) || stockPrice(index))),
    };
  });
  return result;
}

function financeFor(player) {
  if (!player) return createFinanceAccount();
  if (!player.finance || typeof player.finance !== "object" || !player.finance.shortPositions) {
    player.finance = normalizeFinanceAccount(player.finance);
  }
  return player.finance;
}

function characterLevel(player) {
  return clamp(Number(player?.skillLevel) || 1, 1, CHARACTER_MAX_LEVEL);
}

function skillXpTarget(player) {
  return characterLevel(player) * 120;
}

function awardSkillXp(player, amount, source = "商业行动") {
  if (!player || player.bankrupt) return;
  player.skillXp = Math.max(0, Number(player.skillXp) || 0) + Math.max(0, Math.round(amount));
  let leveled = false;
  while (characterLevel(player) < CHARACTER_MAX_LEVEL && player.skillXp >= skillXpTarget(player)) {
    player.skillXp -= skillXpTarget(player);
    player.skillLevel = characterLevel(player) + 1;
    leveled = true;
  }
  if (leveled) {
    logEvent(`${player.name} 的${characterDefinitions[player.character]?.title || "角色"}技能升到 ${characterLevel(player)} 级。`);
    addNews("角色技能树", `${player.name} 因${source}升级角色技能，主动技能更强。`, "gain");
    showEventBurst(`技能 Lv.${characterLevel(player)}`, "gain");
  }
}

function skillLevelMultiplier(player) {
  return 1 + (characterLevel(player) - 1) * 0.12;
}

function financingDebtTotal(player) {
  const finance = financeFor(player);
  return finance.marginDebt + finance.convertibleDebt + finance.bondDebt;
}

function totalShortLiability(player) {
  const finance = financeFor(player);
  return Object.entries(finance.shortPositions || {}).reduce((total, [index, position]) => {
    return total + stockPrice(Number(index)) * Number(position.shares || 0);
  }, 0);
}

function totalShortEntryValue(player) {
  const finance = financeFor(player);
  return Object.values(finance.shortPositions || {}).reduce((total, position) => {
    return total + Number(position.entryPrice || 0) * Number(position.shares || 0);
  }, 0);
}

function grossExposure(player) {
  return portfolioMarketValue(player) + totalShortLiability(player);
}

function currentLeverageMultiple(player) {
  if (!player) return 1;
  const equity = Math.max(1, netWorth(player));
  return clamp((grossExposure(player) + Math.max(0, player.debt || 0)) / equity, 1, 9.9);
}

function maxLeverageMultiple(player) {
  const tier = bankCardTier(player);
  const base = { basic: 1.6, gold: 2.1, platinum: 2.7, black: 3.3 }[tier.id] || 1.6;
  const riskPenalty = riskIndex(player).score >= 70 ? 0.45 : riskIndex(player).score >= 42 ? 0.2 : 0;
  const marketPenalty = ["crisis", "stockCrash"].includes(currentMarket().id) ? 0.25 : 0;
  return clamp(base - riskPenalty - marketPenalty, 1.2, 3.5);
}

function leverageFinanceAmount(player) {
  if (!player) return 0;
  const equity = Math.max(0, netWorth(player));
  const maxGross = equity * maxLeverageMultiple(player);
  const room = Math.max(0, maxGross - grossExposure(player) - (player.debt || 0));
  return Math.round(clamp(Math.min(room, availableCredit(player) * 0.82), 0, 980) / 10) * 10;
}

function convertibleDebtAmount(player) {
  const base = 220 + ownedPropertyIndexes(player?.id).length * 38 + Math.round(portfolioMarketValue(player) * 0.05);
  return Math.round(clamp(base, 260, 760) / 10) * 10;
}

function convertibleDebtObligation(player) {
  return Math.round((convertibleDebtAmount(player) * 1.06) / 10) * 10;
}

function convertibleConversionAmount(player) {
  return Math.min(financeFor(player).convertibleDebt, 360);
}

function equityDilutionFor(player, amount) {
  const valuation = Math.max(1200, netWorth(player) + portfolioMarketValue(player) * 0.42);
  return clamp(amount / valuation * 0.42, 0.015, 0.09);
}

function convertibleDilutionFor(player, amount) {
  const valuation = Math.max(1400, netWorth(player) + portfolioMarketValue(player) * 0.55);
  return clamp(amount / valuation * 0.36, 0.012, 0.08);
}

function marginInterestRate(player) {
  return clamp(bankLoanInterestRate(player) + 0.035 + riskIndex(player).score / 2600, 0.065, 0.22);
}

function convertibleInterestRate(player) {
  return clamp(0.042 + riskIndex(player).score / 3200, 0.038, 0.12);
}

function bondInterestRate(player) {
  return clamp(0.055 + riskIndex(player).score / 2600, 0.048, 0.16);
}

function shortBorrowRate(player, index) {
  const ratingPressure = spaces[index]?.type === "property" ? Math.max(0, cityRatingScore(index) - 62) / 2600 : 0;
  const marketPressure = currentMarket().id === "stockCrash" ? -0.012 : currentMarket().id === "boom" ? 0.018 : 0;
  return clamp(0.05 + riskIndex(player).score / 2400 + ratingPressure + marketPressure, 0.035, 0.2);
}

function weightedFinancingRate(player) {
  if (!player) return 0;
  const finance = financeFor(player);
  const bankDebt = Math.max(0, (player.debt || 0) - financingDebtTotal(player));
  const total = bankDebt + finance.marginDebt + finance.convertibleDebt + finance.bondDebt + totalShortLiability(player);
  if (total <= 0) return 0;
  const shortRateWeighted = Object.entries(finance.shortPositions || {}).reduce((sum, [index, position]) => {
    return sum + stockPrice(Number(index)) * Number(position.shares || 0) * shortBorrowRate(player, Number(index));
  }, 0);
  const weighted = bankDebt * bankLoanInterestRate(player)
    + finance.marginDebt * marginInterestRate(player)
    + finance.convertibleDebt * convertibleInterestRate(player)
    + finance.bondDebt * bondInterestRate(player)
    + shortRateWeighted;
  return weighted / total;
}

function shortBorrowCapacity(player) {
  if (!player) return 0;
  const base = availableCredit(player) * 0.5 + portfolioMarketValue(player) * 0.08 + Math.max(0, player.cash - 250) * 0.25;
  const used = totalShortLiability(player);
  const riskPenalty = riskIndex(player).score >= 70 ? 0.55 : riskIndex(player).score >= 42 ? 0.78 : 1;
  return Math.round(Math.max(0, base * riskPenalty - used) / 10) * 10;
}

function normalizeNumberArray(values, length, fallback = 0) {
  return Array.isArray(values) && values.length === length
    ? values.map((value) => Number(value) || fallback)
    : Array(length).fill(fallback);
}

function normalizeBooleanArray(values, length) {
  return Array.isArray(values) && values.length === length
    ? values.map(Boolean)
    : Array(length).fill(false);
}

function createCityCompanyState() {
  return { company: false, hotel: false, bank: false, techPark: false };
}

function normalizeCityCompanies(companies) {
  return Array.from({ length: spaces.length }, (_, index) => {
    const saved = Array.isArray(companies) ? companies[index] : null;
    const next = createCityCompanyState();
    COMPANY_TYPES.forEach((type) => {
      next[type] = Boolean(saved?.[type]);
    });
    return next;
  });
}

function normalizeCityCollection(collection, owners = state?.owners || []) {
  const ids = new Set(Array.isArray(collection) ? collection.filter((index) => Number.isInteger(index) && spaces[index]?.type === "property") : []);
  owners.forEach((ownerId, index) => {
    if (ownerId && spaces[index]?.type === "property") ids.add(index);
  });
  return [...ids].sort((a, b) => a - b);
}

function dailyChallengeSeed() {
  const date = new Date();
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return [...key].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function dailyChallengeMarketId() {
  const ids = ["boom", "slump", "rentStorm", "goldenWeek", "crisis", "stockCrash", "cardRush"];
  return ids[dailyChallengeSeed() % ids.length];
}

function createGameGoals() {
  return [
    { id: "worth8000", type: "netWorth", title: "30 轮内资产达到 ¥8000", target: 8000, dueRound: 30, reward: 500, completedBy: [] },
    { id: "control3continents", type: "continents", title: "控制 3 个洲套装", target: 3, reward: 420, completedBy: [] },
    { id: "win5auctions", type: "auctions", title: "赢下 5 次拍卖", target: 5, reward: 360, completedBy: [] },
  ];
}

function normalizeGoals(goals) {
  const defaults = createGameGoals();
  if (!Array.isArray(goals)) return defaults;
  return defaults.map((goal) => {
    const saved = goals.find((item) => item?.id === goal.id);
    return {
      ...goal,
      completedBy: Array.isArray(saved?.completedBy) ? saved.completedBy.filter(Boolean) : [],
    };
  });
}

function goalProgress(goal, player) {
  if (!player) return { percent: 0, label: "等待开始" };
  if (goal.type === "netWorth") {
    const worth = netWorth(player);
    const label = `${formatMoney(worth)}/${formatMoney(goal.target)}${state.round > goal.dueRound ? " / 已过期限" : ""}`;
    return { percent: (worth / goal.target) * 100, label };
  }
  if (goal.type === "continents") {
    const count = continentSetCount(player.id);
    return { percent: (count / goal.target) * 100, label: `${count}/${goal.target} 个洲` };
  }
  if (goal.type === "auctions") {
    const wins = player.auctionWins || 0;
    return { percent: (wins / goal.target) * 100, label: `${wins}/${goal.target} 次拍卖` };
  }
  return { percent: 0, label: "未开始" };
}

function isGoalComplete(goal, player) {
  if (!player) return false;
  if (goal.type === "netWorth") return state.round <= goal.dueRound && netWorth(player) >= goal.target;
  if (goal.type === "continents") return continentSetCount(player.id) >= goal.target;
  if (goal.type === "auctions") return (player.auctionWins || 0) >= goal.target;
  return false;
}

function completeGoalsIfReady(player) {
  state.goals = normalizeGoals(state.goals);
  state.goals.forEach((goal) => {
    if (goal.completedBy.includes(player.id) || !isGoalComplete(goal, player)) return;
    goal.completedBy.push(player.id);
    player.cash += goal.reward;
    addNews("本局目标完成", `${player.name} 完成「${goal.title}」，获得 ${formatMoney(goal.reward)}。`, "gain");
    logEvent(`${player.name} 完成本局目标「${goal.title}」。`);
    showEventBurst(`目标完成 +${formatMoney(goal.reward)}`, "gain");
  });
}

function createRouteMission(round, player, snapshot = {}) {
  const ownerCount = Number(snapshot.ownerCount ?? 0);
  const upgrades = player?.upgradeCount || 0;
  const shares = totalStockShares(player);
  const regions = new Set(player?.visitedRegions || []).size;
  const debt = player?.debt || 0;
  const baselineRisk = Number(snapshot.riskScore ?? 52);
  const choices = [
    { kind: "buy", title: "拿下一座新城市", startValue: ownerCount, target: ownerCount + 1, rewardCash: 180, rewardCard: "" },
    { kind: "upgrade", title: "把任意城市升级 1 次", startValue: upgrades, target: upgrades + 1, rewardCash: 160, rewardCard: "" },
    { kind: "stock", title: "买入 2 股城市股票", startValue: shares, target: shares + 2, rewardCash: 120, rewardCard: "remoteDice" },
    { kind: "cash", title: "建立现金安全垫", startValue: player?.cash || 0, target: Math.max(1000, (player?.cash || 0) + 260), rewardCash: 150, rewardCard: "" },
    { kind: "travel", title: "到达一个新洲", startValue: regions, target: Math.min(5, regions + 1), rewardCash: 170, rewardCard: "planeTicket" },
    { kind: "bank", title: debt > 0 ? "偿还一部分银行贷款" : "保持低风险经营", startValue: debt > 0 ? debt : baselineRisk, target: debt > 0 ? Math.max(0, debt - 150) : 45, rewardCash: 160, rewardCard: "" },
  ].filter((mission) => mission.kind !== "travel" || mission.target > mission.startValue);
  const picked = choices[(round + (player?.id?.length || 0)) % choices.length] || choices[0];
  return {
    id: `${picked.kind}-${round}-${Date.now()}`,
    playerId: player?.id || "p1",
    startRound: round,
    expiresRound: round + 4,
    completed: false,
    ...picked,
  };
}

function missionSnapshotForPlayer(player, gameState = state) {
  if (!player || !gameState) return { ownerCount: 0, riskScore: 52 };
  const owners = Array.isArray(gameState.owners) ? gameState.owners : [];
  const ownerCount = owners.filter((ownerId) => ownerId === player.id).length;
  const debt = player.debt || 0;
  const roughWorth = Math.max(1, (player.cash || 0) + ownerCount * 180);
  const riskScore = clamp(Math.round((debt / (roughWorth + debt)) * 62 + (player.cash < 220 ? 18 : 0)), 0, 100);
  return { ownerCount, riskScore };
}

function normalizeMission(mission) {
  if (!mission || typeof mission !== "object") return null;
  const kind = String(mission.kind || "");
  if (!["buy", "upgrade", "stock", "cash", "travel", "bank"].includes(kind)) return null;
  const fallbackRound = Math.max(1, Number(mission.startRound) || 1);
  return {
    id: String(mission.id || `${kind}-${fallbackRound}`),
    playerId: String(mission.playerId || "p1"),
    kind,
    title: String(mission.title || "完成短路线目标").slice(0, 32),
    startValue: Number(mission.startValue) || 0,
    target: Number(mission.target) || 1,
    rewardCash: Math.max(0, Number(mission.rewardCash) || 120),
    rewardCard: handCardDefinitions[mission.rewardCard] ? mission.rewardCard : "",
    startRound: fallbackRound,
    expiresRound: Math.max(1, Number(mission.expiresRound) || fallbackRound + 4),
    completed: Boolean(mission.completed),
  };
}

function missionProgress(mission, player) {
  if (!mission || !player) return { percent: 0, label: "等待任务" };
  let current = 0;
  let percent = 0;
  if (mission.kind === "buy") current = ownedPropertyIndexes(player.id).length;
  if (mission.kind === "upgrade") current = player.upgradeCount || 0;
  if (mission.kind === "stock") current = totalStockShares(player);
  if (mission.kind === "cash") current = player.cash;
  if (mission.kind === "travel") current = new Set(player.visitedRegions || []).size;
  if (mission.kind === "bank") current = player.debt > 0 ? player.debt : riskIndex(player).score;

  if (mission.kind === "bank") {
    const start = Math.max(mission.startValue, mission.target + 1);
    percent = player.debt > 0
      ? ((start - current) / Math.max(1, start - mission.target)) * 100
      : current <= mission.target ? 100 : 0;
    return { percent, label: player.debt > 0 ? `债务 ${formatMoney(current)} / 目标 ${formatMoney(mission.target)}` : `风险 ${current}/${mission.target}` };
  }

  percent = ((current - mission.startValue) / Math.max(1, mission.target - mission.startValue)) * 100;
  const label = mission.kind === "cash"
    ? `${formatMoney(current)}/${formatMoney(mission.target)}`
    : `${Math.max(0, current - mission.startValue)}/${Math.max(1, mission.target - mission.startValue)}`;
  return { percent, label };
}

function missionRewardText(mission) {
  return `${formatMoney(mission.rewardCash)}${mission.rewardCard ? ` + ${handCardDefinitions[mission.rewardCard].title}` : ""}`;
}

function completeMissionIfReady(player) {
  const mission = normalizeMission(state.mission);
  if (!mission || mission.completed || mission.playerId !== player.id) return;
  if (missionProgress(mission, player).percent < 100) return;
  mission.completed = true;
  player.cash += mission.rewardCash;
  if (mission.rewardCard && player.cards.length < MAX_HAND_CARDS) player.cards.push(mission.rewardCard);
  state.mission = mission;
  state.missionHistory = [
    { title: mission.title, reward: missionRewardText(mission), round: state.round },
    ...(state.missionHistory || []),
  ].slice(0, 6);
  addNews("任务路线完成", `${player.name} 完成「${mission.title}」，获得 ${missionRewardText(mission)}。`, "gain");
  logEvent(`${player.name} 完成路线任务「${mission.title}」。`);
  showEventBurst(`路线任务 +${formatMoney(mission.rewardCash)}`, "gain");
}

function advanceRouteMission() {
  const human = activePlayers().find((player) => !player.isAI) || state.players[0];
  const mission = normalizeMission(state.mission);
  if (!human) return;
  if (!mission || mission.completed || state.round > mission.expiresRound) {
    state.mission = createRouteMission(state.round, human, missionSnapshotForPlayer(human));
    addNews("新任务路线", state.mission.title, "market");
  }
}

function normalizeMissionHistoryItem(item) {
  if (!item || typeof item !== "object") return null;
  return {
    title: String(item.title || "").slice(0, 32),
    reward: String(item.reward || "").slice(0, 48),
    round: Math.max(1, Number(item.round) || 1),
  };
}

function createInitialNewsFeed() {
  return [
    { title: "商业新闻头条", detail: "全球城市交易开盘，银行、股票、总部和航线都将影响胜负。", tone: "market", round: 1 },
  ];
}

function addNews(title, detail, tone = "market") {
  state.newsFeed = [
    { title, detail, tone, round: state.round },
    ...(state.newsFeed || []),
  ].slice(0, NEWS_FEED_LIMIT);
}

function normalizeNewsItem(item) {
  if (!item || typeof item !== "object") return null;
  const title = String(item.title || "").slice(0, 24);
  const detail = String(item.detail || "").slice(0, 82);
  if (!title || !detail) return null;
  return {
    title,
    detail,
    tone: ["market", "deal", "gain", "debt"].includes(item.tone) ? item.tone : "market",
    round: Math.max(1, Number(item.round) || 1),
  };
}

function createQuarterlyReportIfNeeded() {
  if (state.round % 5 !== 0 || state.quarterlyReports?.some((report) => report.round === state.round)) return;
  const ranking = [...activePlayers()].sort((a, b) => netWorth(b) - netWorth(a));
  const topCity = mostProfitableCity();
  const report = {
    round: state.round,
    richest: ranking[0]?.name || "暂无",
    topCity: topCity ? spaceDisplayName(topCity.index) : "暂无",
    marketIndex: marketIndexValue(),
	  };
	  state.quarterlyReports = [report, ...(state.quarterlyReports || [])].slice(0, QUARTERLY_REPORT_LIMIT);
	  addNews("季度商业报表", `${report.richest} 领跑，总部和股票策略进入关键期。`, "market");
	  showContractAnimation("季度财报", `${report.richest} 领跑 / 最强 ${report.topCity} / 指数 ${report.marketIndex}`, "market");
	}

function normalizeQuarterlyReport(report) {
  if (!report || typeof report !== "object") return null;
  return {
    round: Math.max(1, Number(report.round) || 1),
    richest: cleanName(report.richest || "暂无"),
    topCity: String(report.topCity || "暂无").slice(0, 28),
    marketIndex: Math.max(0, Number(report.marketIndex) || 0),
  };
}

function captureStockTrends() {
  const previous = normalizeNumberArray(state.stockSnapshots, spaces.length, 0);
  const next = spaces.map((space, index) => (space.type === "property" ? stockPrice(index) : 0));
  state.stockTrends = next.map((price, index) => (previous[index] ? price - previous[index] : 0));
  state.stockSnapshots = next;
}

function trendLabel(trend) {
  if (trend > 0) return `上涨 ${formatMoney(trend)}`;
  if (trend < 0) return `下跌 ${formatMoney(Math.abs(trend))}`;
  return "持平";
}

function normalizeBankLedgerItem(item) {
  if (!item || typeof item !== "object") return null;
  return {
    title: String(item.title || "").slice(0, 18),
    detail: String(item.detail || "").slice(0, 54),
    amount: Math.max(0, Math.round(Number(item.amount) || 0)),
    tone: ["loan", "repay", "interest", "deposit", "equity", "short"].includes(item.tone) ? item.tone : "loan",
    round: Math.max(1, Number(item.round) || 1),
  };
}

function logBank(title, detail, amount, tone = "loan") {
  state.bankLedger = [
    { title, detail, amount: Math.max(0, Math.round(amount) || 0), tone, round: state.round },
    ...(state.bankLedger || []),
  ].slice(0, BANK_LEDGER_LIMIT);
}

function normalizeDealLedgerItem(item) {
  if (!item || typeof item !== "object") return null;
  const title = String(item.title || "").slice(0, 18);
  const detail = String(item.detail || "").slice(0, 48);
  if (!title || !detail) return null;
  return {
    title,
    detail,
    amount: Math.max(0, Math.round(Number(item.amount) || 0)),
    tone: ["gain", "build", "debt", "neutral", "equity", "convertible", "short", "coop"].includes(item.tone) ? item.tone : "neutral",
    round: Math.max(1, Number(item.round) || 1),
  };
}

function normalizeCoopContracts(contracts) {
  if (!Array.isArray(contracts)) return [];
  return contracts
    .map(normalizeCoopContract)
    .filter(Boolean)
    .slice(0, COOP_CONTRACT_ARCHIVE_LIMIT);
}

function normalizeCoopProposals(proposals) {
  if (!Array.isArray(proposals)) return [];
  return proposals
    .map(normalizeCoopProposal)
    .filter(Boolean)
    .slice(0, COOP_CONTRACT_ARCHIVE_LIMIT);
}

function normalizeCoopProposal(proposal) {
  if (!proposal || typeof proposal !== "object") return null;
  const propertyIndex = Number(proposal.propertyIndex);
  if (!Number.isInteger(propertyIndex) || spaces[propertyIndex]?.type !== "property") return null;
  const ownerId = String(proposal.ownerId || "");
  const partnerId = String(proposal.partnerId || "");
  if (!ownerId || !partnerId || ownerId === partnerId) return null;
  const negotiationMode = normalizeContractNegotiationMode(proposal.negotiationMode || "standard");
  const financials = coopContractFinancialsWithTerms(propertyIndex, negotiationMode, proposal);
  const status = ["pending", "rejected"].includes(proposal.status) ? proposal.status : "pending";
  return {
    id: String(proposal.id || `proposal-${propertyIndex}-${ownerId}-${partnerId}-${Number(proposal.round) || 1}`),
    propertyIndex,
    ownerId,
    partnerId,
    proposerId: String(proposal.proposerId || partnerId),
    approverId: String(proposal.approverId || ownerId),
    negotiationMode,
    modeLabel: String(proposal.modeLabel || financials.modeLabel).slice(0, 28),
    upfront: financials.upfront,
    ownerReceipt: financials.ownerReceipt,
    penalty: financials.penalty,
    share: clamp(Number(proposal.share) || financials.share, 0, 1),
    partnerPerRound: financials.partnerPerRound,
    ownerPerRound: financials.ownerPerRound,
    duration: financials.duration,
    contractValue: financials.contractValue,
    clause: sanitizeContractClause(proposal.clause),
    template: String(proposal.template || contractTemplateForCity(propertyIndex).label).slice(0, 24),
    riskLevel: ["低风险", "中风险", "高风险"].includes(proposal.riskLevel) ? proposal.riskLevel : "中风险",
    riskScore: clamp(Number(proposal.riskScore) || 45, 0, 100),
    advisor: ["推荐", "谨慎", "不建议"].includes(proposal.advisor) ? proposal.advisor : "谨慎",
    round: Math.max(1, Number(proposal.round) || 1),
    status,
    response: String(proposal.response || (status === "pending" ? "等待对方同意" : "对方未同意")).slice(0, 40),
    ownerSignature: sanitizeContractSignature(proposal.ownerSignature, playerById(ownerId)?.name || "甲方"),
    partnerSignature: sanitizeContractSignature(proposal.partnerSignature, playerById(partnerId)?.name || "乙方"),
  };
}

function normalizeCoopContract(contract) {
  if (!contract || typeof contract !== "object") return null;
  const propertyIndex = Number(contract.propertyIndex);
  if (!Number.isInteger(propertyIndex) || spaces[propertyIndex]?.type !== "property") return null;
  const ownerId = String(contract.ownerId || "");
  const partnerId = String(contract.partnerId || "");
  if (!ownerId || !partnerId || ownerId === partnerId) return null;
  const negotiationMode = normalizeContractNegotiationMode(contract.negotiationMode || "standard");
  const financials = coopContractFinancialsWithTerms(propertyIndex, negotiationMode, contract);
  return {
    id: String(contract.id || `coop-${propertyIndex}-${ownerId}-${partnerId}-${Number(contract.signedRound) || 1}`),
    propertyIndex,
    ownerId,
    partnerId,
    share: clamp(Number(contract.share) || financials.share, 0, 1),
    partnerPerRound: financials.partnerPerRound,
    ownerPerRound: financials.ownerPerRound,
    upfront: financials.upfront,
    ownerReceipt: financials.ownerReceipt,
    penalty: financials.penalty,
    duration: financials.duration,
    remainingRounds: clamp(Number(contract.remainingRounds) || 0, 0, COOP_CONTRACT_MAX_DURATION),
    signedRound: Math.max(1, Number(contract.signedRound) || 1),
    endedRound: contract.endedRound ? Math.max(1, Number(contract.endedRound) || 1) : 0,
    status: ["active", "completed", "breached", "terminated"].includes(contract.status) ? contract.status : "active",
    clause: sanitizeContractClause(contract.clause),
    breachReason: String(contract.breachReason || "").slice(0, 28),
    negotiationMode,
    template: String(contract.template || contractTemplateForCity(propertyIndex).label).slice(0, 24),
    riskLevel: ["低风险", "中风险", "高风险"].includes(contract.riskLevel) ? contract.riskLevel : "中风险",
    riskScore: clamp(Number(contract.riskScore) || 45, 0, 100),
    advisor: ["推荐", "谨慎", "不建议"].includes(contract.advisor) ? contract.advisor : "谨慎",
    approvedBy: String(contract.approvedBy || ""),
    proposalId: String(contract.proposalId || ""),
    ownerSignature: sanitizeContractSignature(contract.ownerSignature, playerById(ownerId)?.name || "甲方"),
    partnerSignature: sanitizeContractSignature(contract.partnerSignature, playerById(partnerId)?.name || "乙方"),
    totalPartnerPaid: Math.max(0, Math.round(Number(contract.totalPartnerPaid) || 0)),
    totalOwnerPaid: Math.max(0, Math.round(Number(contract.totalOwnerPaid) || 0)),
    totalDividend: Math.max(0, Math.round(Number(contract.totalDividend) || 0)),
    settlement: String(contract.settlement || "").slice(0, 120),
  };
}

function normalizeHighestRent(record) {
  if (!record || typeof record !== "object") return null;
  const amount = Number(record.amount) || 0;
  const index = Number(record.index);
  if (!amount || !Number.isInteger(index) || !spaces[index]) return null;
  return {
    amount,
    index,
    payer: cleanName(record.payer || "玩家"),
    owner: cleanName(record.owner || "玩家"),
    round: Math.max(1, Number(record.round) || 1),
  };
}

function normalizeTileFlash(tileFlash) {
  if (!tileFlash || typeof tileFlash !== "object") return null;
  const index = Number(tileFlash.index);
  if (!Number.isInteger(index) || !spaces[index]) return null;
  return {
    index,
    type: ["buy", "build", "rent", "move", "pay"].includes(tileFlash.type) ? tileFlash.type : "move",
    until: Math.max(0, Number(tileFlash.until) || 0),
  };
}

function bankCardTier(player) {
  const worth = player ? netWorth(player) : 0;
  const score = player ? riskIndex(player).score : 50;
  if (worth >= 6500 && score < 55) return { id: "black", label: "黑金卡", color: "#223042", depositBonus: 0.01, rateDiscount: 0.028 };
  if (worth >= 4200 && score < 65) return { id: "platinum", label: "白金卡", color: "#3976d3", depositBonus: 0.007, rateDiscount: 0.02 };
  if (worth >= 2400) return { id: "gold", label: "金卡", color: "#d89921", depositBonus: 0.004, rateDiscount: 0.012 };
  return { id: "basic", label: "标准卡", color: "#128a9c", depositBonus: 0, rateDiscount: 0 };
}

function bankLoanInterestRate(player) {
  const tier = bankCardTier(player);
  const risk = riskIndex(player).score;
  const bankNetworkDiscount = ownedCompanyCount(player, "bank") * 0.006;
  const reputationPenalty = Math.max(0, 75 - contractReputationFor(player)) / 2600;
  return clamp(LOAN_INTEREST_RATE + risk / 1800 + reputationPenalty - tier.rateDiscount - bankNetworkDiscount, 0.025, 0.16);
}

function bankDepositInterestFor(player) {
  if (!player || player.bankrupt || player.cash < 350) return 0;
  const tier = bankCardTier(player);
  const debtPenalty = player.debt > 0 ? 0.55 : 1;
  return Math.min(70, Math.round(player.cash * (BANK_DEPOSIT_INTEREST_RATE + tier.depositBonus) * debtPenalty));
}

function bankActionReason(action, player) {
  if (!player || player.bankrupt) return "玩家不可用";
  if (state.gameOver) return "比赛已结束";
  if (!["waiting", "decision", "shop", "ending"].includes(state.phase)) return "行动阶段可用";
  if (action === "loan") return availableCredit(player) >= LOAN_REPAY_AMOUNT ? "" : "信用额度不足";
  if (action === "repay") return player.debt ? "现金不足" : "没有贷款";
  return "";
}

function riskIndex(player) {
  if (!player) return { score: 0, tone: "low" };
  const worth = Math.max(1, netWorth(player) + (player.debt || 0));
  const debtRatio = (player.debt || 0) / worth;
  const finance = financeFor(player);
  const stockValues = Object.entries(player.stocks || {}).map(([index, shares]) => stockPrice(Number(index)) * Number(shares || 0));
  const stockTotal = stockValues.reduce((total, value) => total + value, 0);
  const stockConcentration = stockTotal > 0 ? Math.max(...stockValues) / stockTotal : 0;
  const shortRatio = totalShortLiability(player) / worth;
  const structuredDebtRatio = financingDebtTotal(player) / worth;
  const cashPressure = player.cash < 180 ? 24 : player.cash < 420 ? 12 : 0;
  const mortgageCount = ownedPropertyIndexes(player.id).filter((index) => state.mortgages[index]).length;
  const marketPressure = ["crisis", "stockCrash"].includes(currentMarket().id) ? 10 : 0;
  const dilutionPressure = finance.equityDilution * 35;
  const score = clamp(Math.round(debtRatio * 48 + structuredDebtRatio * 24 + shortRatio * 36 + stockConcentration * 18 + dilutionPressure + cashPressure + mortgageCount * 6 + marketPressure), 0, 100);
  return { score, tone: score >= 70 ? "high" : score >= 42 ? "mid" : "low" };
}

function riskLabel(score) {
  if (score >= 70) return "高风险";
  if (score >= 42) return "中风险";
  return "稳健";
}

function aiMoodFor(player) {
  if (!player?.isAI) return "";
  if (player.grudgeTarget) return "记仇中";
  const risk = riskIndex(player).score;
  if (risk >= 70) return "防守";
  const style = player.aiStyle || "balanced";
  if (style === "aggressive") return "抢地";
  if (style === "auctioneer") return "等拍卖";
  if (style === "investor") return "看股票";
  if (style === "builder") return "想升级";
  if (style === "hoarder") return "囤资产";
  return "观察";
}

function normalizeHeadquarters(headquarters) {
  const result = {};
  if (!headquarters || typeof headquarters !== "object") return result;
  Object.entries(headquarters).forEach(([playerId, value]) => {
    const index = Number(value);
    if (Number.isInteger(index) && spaces[index]?.type === "property") result[playerId] = index;
  });
  return result;
}

function canSetHeadquarter(player, index) {
  return Boolean(
    player &&
    !player.isAI &&
    !player.bankrupt &&
    !state.gameOver &&
    state.owners[index] === player.id &&
    spaces[index]?.type === "property" &&
    !state.mortgages[index],
  );
}

function isHeadquarter(playerId, index) {
  return Boolean(playerId && Number(state.headquarters?.[playerId]) === index);
}

function setHeadquarter(index) {
  const player = currentPlayer();
  if (!canSetHeadquarter(player, index)) return;
  state.headquarters[player.id] = index;
  state.status = `${player.name} 将 ${spaceDisplayName(index)} 设为全球总部。`;
  logEvent(`${player.name} 设立总部：${spaceDisplayName(index)}。`);
  addNews("总部成立", `${player.name} 把 ${spaceDisplayName(index)} 升级为商业帝国总部。`, "deal");
  showEventBurst(`${spaceDisplayName(index)} 总部`, "build");
  flashTile(index, "build");
  checkTasks(player);
  render();
}

function headquarterRentMultiplier(ownerId, index) {
  if (!ownerId || !state.headquarters?.[ownerId]) return 1;
  const hqIndex = Number(state.headquarters[ownerId]);
  if (hqIndex === index) return 1.25;
  return spaces[hqIndex]?.group === spaces[index]?.group ? 1.08 : 1;
}

function cityCombinationRentMultiplier(player, index) {
  if (!player) return 1;
  const owned = ownedPropertyIndexes(player.id);
  const hasFinance = owned.some((ownedIndex) => spaces[ownedIndex].specialty === "finance");
  const hasAirport = owned.some((ownedIndex) => spaces[ownedIndex].airport || spaces[ownedIndex].specialty === "transit");
  const hasTech = owned.some((ownedIndex) => spaces[ownedIndex].specialty === "tech");
  const hasPort = owned.some((ownedIndex) => spaces[ownedIndex].coastal);
  const space = spaces[index];
  const empireCore = hasFinance && hasAirport && hasTech && ["finance", "tech", "transit"].includes(space.specialty);
  const tradeCore = hasPort && hasAirport && (space.coastal || space.airport);
  return (empireCore ? 1.08 : 1) * (tradeCore ? 1.05 : 1);
}

function cityCombinationDividend(player) {
  if (!player) return 0;
  const owned = ownedPropertyIndexes(player.id);
  const finance = owned.filter((index) => spaces[index].specialty === "finance").length;
  const airports = owned.filter((index) => spaces[index].airport || spaces[index].specialty === "transit").length;
  const tech = owned.filter((index) => spaces[index].specialty === "tech").length;
  const ports = owned.filter((index) => spaces[index].coastal).length;
  const energy = owned.filter((index) => spaces[index].energy).length;
  let bonus = 0;
  if (finance && airports && tech) bonus += 45;
  if (ports >= 2 && airports) bonus += 38;
  if (energy && tech) bonus += 24;
  return bonus;
}

function cityCombinationLabel(player) {
  const dividend = cityCombinationDividend(player);
  if (dividend >= 80) return "全球综合集团";
  if (dividend >= 45) return "金融航空科技";
  if (dividend > 0) return `组合分红 ${formatMoney(dividend)}`;
  return "待组合";
}

function cityRatingScore(index) {
  const space = spaces[index];
  if (!space || space.type !== "property") return 0;
  const base = { C: 42, B: 55, A: 68, S: 82, SS: 92 }[space.rating] || 55;
  const level = (state.levels?.[index] || 0) * 5.5;
  const eco = (state.ecoLevels?.[index] || 0) * 3.5;
  const funding = cityFundingRounds(index) * 4;
  const companies = cityCompanyCount(index) * 3.2;
  const ipo = state.cityPublic?.[index] ? 4.5 : 0;
  const revenue = Math.min(12, (state.cityRevenue?.[index] || 0) * 0.025);
  const hq = isHeadquarter(state.owners?.[index], index) ? 6 : 0;
  const mortgage = state.mortgages?.[index] ? -14 : 0;
  const pollution = Math.max(0, effectivePollution(index) - 65) * -0.16;
  return clamp(Math.round(base + level + eco + funding + companies + ipo + revenue + hq + mortgage + pollution), 25, 99);
}

function cityRating(index, happiness, pollution, tech) {
  if (arguments.length > 1) {
    const score = (Number(index) || 0) * 0.34
      + (Number(happiness) || 0) * 0.24
      + (Number(tech) || 0) * 0.25
      - (Number(pollution) || 0) * 0.17;
    if (score >= 67) return "SS";
    if (score >= 56) return "S";
    if (score >= 45) return "A";
    if (score >= 34) return "B";
    return "C";
  }
  const score = cityRatingScore(index);
  if (score >= 92) return "SS";
  if (score >= 80) return "S";
  if (score >= 66) return "A";
  if (score >= 50) return "B";
  return "C";
}

function continentSetCount(playerId) {
  return new Set(
    spaces
      .filter((space) => space.type === "property" && ownsContinentSet(playerId, space.group))
      .map((space) => space.group),
  ).size;
}

function totalStockShares(player) {
  return Object.values(player?.stocks || {}).reduce((total, shares) => total + Number(shares || 0), 0);
}

function normalizeNegotiation(negotiation) {
  if (!negotiation || typeof negotiation !== "object") return null;
  const propertyIndex = Number(negotiation.propertyIndex);
  if (!Number.isInteger(propertyIndex) || spaces[propertyIndex]?.type !== "property") return null;
  return {
    propertyIndex,
    buyerId: String(negotiation.buyerId || ""),
    sellerId: String(negotiation.sellerId || ""),
    offerPrice: Math.max(0, Math.round(Number(negotiation.offerPrice) || 0)),
    askPrice: Math.max(0, Math.round(Number(negotiation.askPrice) || 0)),
    roundsLeft: clamp(Number(negotiation.roundsLeft) || 0, 0, 3),
  };
}

function openNegotiation(propertyIndex, seller, offerPrice) {
  const buyer = currentPlayer();
  const askPrice = Math.ceil((cityValuation(propertyIndex) * aiTradeAskMultiplier(seller, propertyIndex)) / 10) * 10;
  state.negotiation = {
    propertyIndex,
    buyerId: buyer.id,
    sellerId: seller.id,
    offerPrice,
    askPrice: Math.max(offerPrice + 40, askPrice),
    roundsLeft: 2,
  };
}

function nextNegotiationOffer(deal) {
  const gap = Math.max(20, deal.askPrice - deal.offerPrice);
  return Math.min(deal.askPrice, Math.ceil((deal.offerPrice + Math.max(40, gap * 0.45)) / 10) * 10);
}

function handleNegotiationAction(action) {
  const buyer = currentPlayer();
  const deal = normalizeNegotiation(state.negotiation);
  if (!buyer || buyer.isAI || !deal || deal.buyerId !== buyer.id) return;
  const seller = playerById(deal.sellerId);
  if (!seller || state.owners[deal.propertyIndex] !== seller.id) {
    state.negotiation = null;
    render();
    return;
  }
  if (action === "cancel") {
    state.negotiation = null;
    state.status = `${buyer.name} 取消 ${spaceDisplayName(deal.propertyIndex)} 谈判。`;
    render();
    return;
  }
  if (action === "accept") {
    if (buyer.cash < deal.askPrice) return;
    completePropertyTrade(buyer, seller, deal.propertyIndex, deal.askPrice, "谈判成交");
    state.negotiation = null;
    render();
    return;
  }
  if (action === "counter") {
    const offer = nextNegotiationOffer(deal);
    if (buyer.cash < offer || deal.roundsLeft <= 0) return;
    deal.offerPrice = offer;
    deal.roundsLeft -= 1;
    const accepts = offer >= deal.askPrice * (deal.roundsLeft <= 0 ? 0.9 : 0.96);
    if (accepts) {
      completePropertyTrade(buyer, seller, deal.propertyIndex, offer, "还价成交");
      state.negotiation = null;
    } else {
      deal.askPrice = Math.max(offer + 20, Math.round((deal.askPrice * 0.97) / 10) * 10);
      state.negotiation = deal;
      state.status = `${seller.name} 没接受，但把反报价降到 ${formatMoney(deal.askPrice)}。`;
    }
    render();
  }
}

function completePropertyTrade(buyer, seller, propertyIndex, price, source) {
  buyer.cash -= price;
  seller.cash += price;
  if (isHeadquarter(seller.id, propertyIndex)) delete state.headquarters[seller.id];
  breachCoopContractsForProperty(propertyIndex, seller.id, "场外交易转手");
  state.owners[propertyIndex] = buyer.id;
  addCityRevenue(propertyIndex, Math.round(price * 0.06));
  state.status = `${buyer.name} 用 ${formatMoney(price)} 交易得到 ${spaceDisplayName(propertyIndex)}。`;
  logEvent(`${buyer.name} 从 ${seller.name} 交易得到 ${spaceDisplayName(propertyIndex)}。`);
  logDeal(source, `${buyer.name} 买入 ${spaceDisplayName(propertyIndex)}`, price, "build");
  addNews(source, `${spaceDisplayName(propertyIndex)} 以 ${formatMoney(price)} 完成控制权转移。`, "deal");
  showEventBurst(`${spaceDisplayName(propertyIndex)} 交易完成`, "buy");
  checkTasks(buyer);
}

function recommendationFor(player) {
  if (!player) return "先掷骰，观察第一座可买城市。";
  if (state.phase === "waiting" && !player.isAI) return "现在最该按：掷骰前进。";
  if (state.pendingPurchase !== null && player.cash >= propertyPrice(state.pendingPurchase)) return `买下 ${spaceDisplayName(state.pendingPurchase)}，扩大现金流。`;
  const best = bestUpgradeIndex(player, 120);
  if (best !== null) return `升级 ${spaceDisplayName(best)}，提升租金和股价。`;
  if ((player.debt || 0) > 500 && canRepayLoan(player)) return "先还一笔贷款，降低利息和风险。";
  if (availableCredit(player) >= LOAN_REPAY_AMOUNT && player.cash < 350) return "用银行卡小额贷款，避免错过交易机会。";
  if (totalStockShares(player) < 2 && player.cash > 500) return "买入核心城市股票，让资产跟着市场涨。";
  return "保留现金，等待拍卖、并购或总部机会。";
}

function nextActionPlan(player) {
  if (!player) {
    return {
      tag: "开局",
      detail: "先掷骰，看到第一座可买城市再做决策。",
      action: "roll",
      actionLabel: "掷骰前进",
      enabled: false,
      reason: "还没有当前玩家",
      tone: "move",
      shortGoal: "找到城市",
    };
  }

  if (player.isAI || player.bankrupt || state.gameOver) {
    return {
      tag: player.bankrupt ? "已出局" : "观察",
      detail: player.isAI ? "现在是 AI 行动，观察它的买地、拍卖和融资选择。" : "本局已经结束或玩家不可操作。",
      action: "",
      actionLabel: "",
      enabled: false,
      reason: "",
      tone: "neutral",
      shortGoal: "观察局势",
    };
  }

  if (state.phase === "auction") {
    return {
      tag: "拍卖中",
      detail: "看当前最高价和倒计时，现金足够时可以抢下低估城市。",
      action: "",
      actionLabel: "",
      enabled: false,
      reason: "",
      tone: "buy",
      shortGoal: "判断出价",
    };
  }

  if (state.phase === "waiting") {
    return {
      tag: "移动",
      detail: "现在最该做的是掷骰前进，然后根据落点决定买地、抽卡或交易。",
      action: "roll",
      actionLabel: "掷骰前进",
      enabled: true,
      reason: "",
      tone: "move",
      shortGoal: "完成移动",
    };
  }

  if (state.phase === "decision" && state.pendingPurchase !== null) {
    const price = propertyPrice(state.pendingPurchase);
    const canBuy = player.cash >= price;
    return {
      tag: canBuy ? "买地" : "拍卖",
      detail: canBuy
        ? `买下 ${spaceDisplayName(state.pendingPurchase)}，价格 ${formatMoney(price)}，可扩大现金流和股票标的。`
        : `现金不足以买下 ${spaceDisplayName(state.pendingPurchase)}，可以放弃并进入拍卖。`,
      action: canBuy ? "buy" : "decline",
      actionLabel: canBuy ? "买下这座城市" : "不买，进入拍卖",
      enabled: true,
      reason: "",
      tone: canBuy ? "buy" : "danger",
      shortGoal: canBuy ? "完成买地" : "争取拍卖",
    };
  }

  const risk = riskIndex(player);
  if (risk.score >= 70 && canRepayLoan(player)) {
    return {
      tag: "降风险",
      detail: "杠杆、贷款或做空压力已经偏高，先还一笔贷款能降低破产风险。",
      action: "repay",
      actionLabel: "还一笔贷款",
      enabled: true,
      reason: "",
      tone: "danger",
      shortGoal: "降低风险",
    };
  }

  const best = bestUpgradeIndex(player, 120);
  if (best !== null && ["waiting", "shop", "ending"].includes(state.phase)) {
    return {
      tag: "建设",
      detail: `升级 ${spaceDisplayName(best)}，能推高租金、股价和城市评级。`,
      action: "upgrade",
      actionLabel: "升级重点城市",
      enabled: true,
      reason: "",
      tone: "build",
      shortGoal: "升级城市",
    };
  }

  if (player.cash < 300 && canTakeLoan(player)) {
    return {
      tag: "融资",
      detail: "现金垫太薄，使用银行卡贷款可以避免错过买地或被租金打穿。",
      action: "loan",
      actionLabel: "小额贷款",
      enabled: true,
      reason: "",
      tone: "gain",
      shortGoal: "补现金垫",
    };
  }

  if ((player.debt || 0) > 450 && canRepayLoan(player)) {
    return {
      tag: "还债",
      detail: "债务会产生利息，先还一笔能让之后融资空间更舒服。",
      action: "repay",
      actionLabel: "偿还贷款",
      enabled: true,
      reason: "",
      tone: "danger",
      shortGoal: "控制利息",
    };
  }

  if (totalStockShares(player) < 2 && player.cash > 520) {
    return {
      tag: "股票",
      detail: "可以买入核心城市股票，让现金参与全球市场涨跌。",
      action: "stocks",
      actionLabel: "查看股票",
      enabled: true,
      reason: "",
      tone: "gain",
      shortGoal: "配置股票",
    };
  }

  if (["ending", "shop"].includes(state.phase)) {
    return {
      tag: "收束",
      detail: "本回合主要动作已经完成，可以结束回合，等待下一次移动和交易窗口。",
      action: "end",
      actionLabel: "结束本回合",
      enabled: true,
      reason: "",
      tone: "move",
      shortGoal: "结束回合",
    };
  }

  if (!player.ventureUsed && ["decision", "shop"].includes(state.phase)) {
    return {
      tag: "机会",
      detail: "如果想赌一把，可以抽冒险事件，可能得到现金、卡片或建设机会。",
      action: "venture",
      actionLabel: "抽冒险事件",
      enabled: true,
      reason: "",
      tone: "danger",
      shortGoal: "触发机会",
    };
  }

  return {
    tag: "经营",
    detail: recommendationFor(player),
    action: "",
    actionLabel: "",
    enabled: false,
    reason: "",
    tone: "neutral",
    shortGoal: "等待窗口",
  };
}

function executeAdvisorAction(action) {
  if (action === "roll") {
    rollCurrentTurn(false);
    return;
  }
  if (action === "buy") {
    buyPendingProperty();
    return;
  }
  if (action === "decline") {
    declinePendingProperty();
    return;
  }
  if (action === "upgrade") {
    quickUpgradeBestProperty();
    return;
  }
  if (action === "loan") {
    takeLoan(currentPlayer());
    return;
  }
  if (action === "repay") {
    repayLoan(currentPlayer());
    return;
  }
  if (action === "venture") {
    useVentureAction();
    return;
  }
  if (action === "end") {
    endTurn();
    return;
  }
  if (action === "stocks") {
    state.sidePanelMode = "world";
    state.worldPanelMode = "stocks";
    state.sidePanelCollapsed = false;
    render();
  }
}

function victoryConditionLabel() {
  const rules = currentRules();
  if (rules.turnLimit) return `${rules.turnLimit} 回合后按资产结算`;
  return "破产制 / 最后一名存活获胜";
}

function crisisCountdownLabel() {
  const market = currentMarket();
  if (market.id === "crisis" || market.id === "stockCrash") return "危机进行中";
  return `${state.market?.turnsLeft || 1} 轮后换市`;
}

function rotateMarket() {
  state.market = normalizeMarket(state.market);
  state.market.turnsLeft -= 1;
  if (state.market.turnsLeft > 0) return;
  const ids = Object.keys(marketDefinitions).filter((id) => id !== state.market.id);
  const nextId = shuffle(ids)[0] || "steady";
  state.market = createMarketState(nextId);
  const market = currentMarket();
  state.status = `${market.title}：${market.detail}`;
  logEvent(`市场风向变为「${market.title}」。`);
  addNews("商业新闻头条", `${market.title}：${market.detail}`, market.id === "crisis" || market.id === "stockCrash" ? "debt" : "market");
  showEventBurst(market.title, "build");
}

function encodeShareCode(gameState) {
  try {
    const payload = JSON.parse(JSON.stringify(gameState));
    delete payload.shareCodePreview;
    return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  } catch {
    return "";
  }
}

function decodeShareCode(code) {
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return loadGame();
  } catch {
    return null;
  }
}

function ensureFunds(player, amount, reason) {
  if (!player || player.cash >= amount) return;
  const candidates = ownedPropertyIndexes(player.id)
    .filter((index) => !state.mortgages[index])
    .sort((a, b) => spaces[a].price - spaces[b].price);

  candidates.some((index) => {
    if (player.cash >= amount) return true;
	    state.mortgages[index] = true;
	    player.cash += mortgageValue(index);
	    logEvent(`${player.name} 为支付${reason}自动抵押 ${spaces[index].name}。`);
	    showContractAnimation("破产前救援", `${player.name} 自动抵押 ${spaceDisplayName(index)}，获得 ${formatMoney(mortgageValue(index))}`, "debt");
	    return false;
	  });

  if (player.cash < amount) {
    Object.entries(player.stocks || {})
      .sort((a, b) => stockPrice(Number(a[0])) - stockPrice(Number(b[0])))
      .some(([key]) => {
        if (player.cash >= amount) return true;
        const index = Number(key);
        if (stockShares(player, index) <= 0) return false;
        const price = stockPrice(index);
        player.stocks[index] -= 1;
	        if (player.stocks[index] <= 0) delete player.stocks[index];
	        player.cash += price;
	        logEvent(`${player.name} 为避免破产自动卖出 ${spaceDisplayName(index)} 股票，获得 ${formatMoney(price)}。`);
	        showContractAnimation("破产前救援", `${player.name} 自动卖股 ${spaceDisplayName(index)}，获得 ${formatMoney(price)}`, "debt");
	        return false;
	      });
	  }

  if (player.cash < amount && availableCredit(player) >= LOAN_REPAY_AMOUNT) {
    player.cash += LOAN_AMOUNT;
	    player.debt = (player.debt || 0) + LOAN_REPAY_AMOUNT;
	    logBank("紧急贷款", `${player.name} 为支付${reason}触发破产保护`, LOAN_AMOUNT, "loan");
	    logEvent(`${player.name} 启动破产保护，获得紧急贷款 ${formatMoney(LOAN_AMOUNT)}。`);
	    showContractAnimation("紧急贷款", `${player.name} 获得 ${formatMoney(LOAN_AMOUNT)}，避免立即破产`, "debt");
	  }
	}

function checkTasks(player) {
  if (!player || player.bankrupt) return;
  taskDefinitions.forEach((task) => {
    if (player.completedTasks.includes(task.id)) return;
    if (!isTaskComplete(player, task.id)) return;
    player.completedTasks.push(task.id);
    player.cash += task.reward;
    logEvent(`${player.name} 完成任务「${task.title}」，获得 ${task.reward} 现金。`);
    showEventBurst(`任务完成 +${formatMoney(task.reward)}`, "gain");
  });
  completeGoalsIfReady(player);
  completeMissionIfReady(player);
}

function isTaskComplete(player, taskId) {
  if (taskId === "buy3") return ownedPropertyIndexes(player.id).length >= 3;
  if (taskId === "firstSet") {
    return spaces.some((space) => space.type === "property" && ownsContinentSet(player.id, space.group));
  }
  if (taskId === "worldTour") return new Set(player.visitedRegions || []).size >= 5;
  if (taskId === "upgrade2") return (player.upgradeCount || 0) >= 2;
  if (taskId === "use3Cards") return player.cardsUsed >= 3;
  if (taskId === "auctionWin") return ownedPropertyIndexes(player.id).some((index) => state.log.some((entry) => entry.text.includes("拍下") && entry.text.includes(spaces[index].name)));
  return false;
}

function unlockAchievement(id) {
  const achievements = loadAchievements();
  if (!achievementDefinitions[id] || achievements[id]) return;
  achievements[id] = new Date().toLocaleString("zh-CN");
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
}

function loadAchievements() {
  try {
    return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || "{}");
  } catch {
    return {};
  }
}

function recordLeaderboard(winner) {
  const entries = loadLeaderboard();
  entries.push({
    name: winner.name,
    worth: netWorth(winner),
    round: state.round,
    date: new Date().toLocaleDateString("zh-CN"),
  });
  entries.sort((a, b) => b.worth - a.worth || a.round - b.round);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries.slice(0, 10)));
}

function loadLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
  } catch {
    return [];
  }
}

function calculateRent(index, rollTotal) {
  const space = spaces[index];
  const ownerId = state.owners[index];
  const owner = playerById(ownerId);
  if (state.mortgages[index]) return 0;

  if (space.kind === "station") {
    const count = ownedPropertyIndexes(ownerId).filter((ownedIndex) => spaces[ownedIndex].kind === "station").length;
    const levelMultiplier = 1 + state.levels[index] * 0.65;
    return Math.round(space.rent * Math.max(1, count) * levelMultiplier * cityRentMultiplier(index) * headquarterRentMultiplier(ownerId, index) * cityCombinationRentMultiplier(owner, index) * rentBonusFor(owner) * currentMarket().rent);
  }

  if (space.kind === "utility") {
    const count = ownedPropertyIndexes(ownerId).filter((ownedIndex) => spaces[ownedIndex].kind === "utility").length;
    const levelMultiplier = 1 + state.levels[index] * 0.55;
    return Math.round(rollTotal * (count >= 2 ? 10 : 5) * levelMultiplier * cityRentMultiplier(index) * headquarterRentMultiplier(ownerId, index) * cityCombinationRentMultiplier(owner, index) * rentBonusFor(owner) * currentMarket().rent);
  }

  const ownsFullGroup = ownsFullStreetGroup(ownerId, space.group);
  const ownsSet = ownsContinentSet(ownerId, space.group);
  const levelMultiplier = 1 + state.levels[index] * (ownsSet ? 1.48 : 1.25);
  const groupMultiplier = ownsFullGroup ? 2 : ownsSet ? 1.35 : 1;
  return Math.round(space.rent * levelMultiplier * groupMultiplier * cityRentMultiplier(index) * headquarterRentMultiplier(ownerId, index) * cityCombinationRentMultiplier(owner, index) * rentBonusFor(owner) * currentMarket().rent);
}

function cityRentMultiplier(index) {
  const space = spaces[index];
  if (!space || space.type !== "property") return 1;
  const specialty = citySpecialtyDefinitions[space.specialty];
  const specialtyRent = specialty?.rent || 1;
  const companies = cityCompanies(index);
  const companyRent = 1
    + (companies.company ? 0.08 : 0)
    + (companies.hotel ? 0.18 : 0)
    + (companies.bank ? 0.06 : 0)
    + (companies.techPark ? 0.07 : 0);
  const ipoRent = state.cityPublic?.[index] ? 1.08 : 1;
  const prosperityBonus = 1 + ((space.prosperity || 50) - 50) / 500;
  const eco = state.ecoLevels?.[index] || 0;
  const pollution = effectivePollution(index);
  const happiness = effectiveHappiness(index);
  const populationBonus = 1 + Math.min(0.22, (space.population || 1) / 60);
  const happinessBonus = 1 + (happiness - 50) / 650;
  const pollutionPenalty = Math.max(0.78, 1 - pollution / 520);
  const tourismMarket = currentMarket().id === "goldenWeek"
    ? 1 + ((space.tourism || 50) - 45) / 350
    : currentMarket().id === "storm"
      ? Math.max(0.72, 1 - ((space.tourism || 50) - 45) / 420)
      : 1;
  return Math.max(0.62, specialtyRent * companyRent * ipoRent * prosperityBonus * populationBonus * happinessBonus * pollutionPenalty * (1 + eco * 0.035) * tourismMarket);
}

function effectivePollution(index) {
  const eco = state.ecoLevels?.[index] || 0;
  return clamp((spaces[index]?.pollution || 50) - eco * 16, 0, 100);
}

function effectiveHappiness(index) {
  const eco = state.ecoLevels?.[index] || 0;
  return clamp((spaces[index]?.happiness || 50) + eco * 6, 0, 100);
}

function payBank(player, amount, reason) {
  if (player.taxShield && /税|费|审计|缴税/.test(reason)) {
    player.taxShield = false;
    logEvent(`${player.name} 使用免税凭证，免除 ${reason}。`);
    showEventBurst("免税生效", "build");
    return;
  }

  if (/税|费|审计|缴税|压力/.test(reason)) {
    amount = Math.round(amount * currentRules().taxFactor);
  }
  ensureFunds(player, amount, reason);
  const paid = Math.min(player.cash, amount);
  player.cash -= paid;
  logEvent(`${player.name} 支付 ${paid} 现金：${reason}。`);
  showEventBurst(`-${formatMoney(paid)} ${reason}`, "pay");
  if (paid < amount) {
    bankruptPlayer(player, `${reason} 资金不足`);
  }
}

function payPlayer(payer, receiver, amount, reason) {
  if (reason.includes("租金") && payer.rentRisk) {
    payer.rentRisk = false;
    amount = Math.round(amount * 1.4);
    logEvent(`${payer.name} 的街头挑战风险触发，本次租金上升。`);
  }

  if (reason.includes("租金") && payer.rentShield) {
    payer.rentShield = false;
    logEvent(`${payer.name} 使用免租通行证，免除 ${reason} ${amount} 现金。`);
    showEventBurst("免租卡生效", "build");
    return { paid: 0, waived: true };
  }

  if (reason.includes("租金") && payer.rentMirror) {
    payer.rentMirror = false;
    ensureFunds(receiver, amount, "租金反弹");
    const reflected = Math.min(receiver.cash, amount);
    receiver.cash -= reflected;
    payer.cash += reflected;
    logEvent(`${payer.name} 的租金反弹生效，${receiver.name} 支付 ${reflected} 现金。`);
    showEventBurst("租金反弹", "build");
    if (reflected < amount) bankruptPlayer(receiver, "租金反弹资金不足");
    return { paid: 0, waived: true };
  }

  ensureFunds(payer, amount, reason);
  const paid = Math.min(payer.cash, amount);
  payer.cash -= paid;
  receiver.cash += paid;
  if (reason.includes("租金")) payer.grudgeTarget = receiver.id;
  if (reason.includes("租金") && paid > 0) {
    awardSkillXp(receiver, Math.min(26, Math.max(8, Math.round(paid / 18))), "收租");
  }
	  logEvent(`${payer.name} 向 ${receiver.name} 支付 ${paid} 现金：${reason}。`);
	  showEventBurst(`${receiver.name} 收到 ${formatMoney(paid)}`, "gain");
	  if (reason.includes("租金") && paid > 0) {
	    showContractAnimation("收租成交", `${payer.name} -> ${receiver.name} ${formatMoney(paid)}`, "gain");
	  }
	  if (reason.includes("租金") && receiver.rentSurge) {
    receiver.rentSurge = false;
    logEvent(`${receiver.name} 的租金强化已触发。`);
  }
  if (paid < amount) {
    bankruptPlayer(payer, `${reason} 资金不足`);
  }
  return { paid, waived: false };
}

function bankruptPlayer(player, reason) {
  if (player.bankrupt) return;
  if (player.insurance) {
    player.insurance = false;
    player.cash = Math.max(player.cash, 300);
    player.debt = Math.max(0, (player.debt || 0) - 180);
    state.status = `${player.name} 的破产保险生效，保住资产并获得救援现金。`;
    logEvent(`${player.name} 使用破产保险，避免破产：${reason}。`);
    showEventBurst("保险救援", "build");
    unlockAchievement("insuranceSave");
    return;
  }
  player.bankrupt = true;
  const released = [];
  player.cash = 0;
  player.finance = createFinanceAccount();
  if (state.headquarters?.[player.id] !== undefined) delete state.headquarters[player.id];
  state.owners.forEach((ownerId, index) => {
    if (ownerId === player.id) {
      released.push(spaces[index].name);
      state.owners[index] = null;
      state.levels[index] = 0;
      state.mortgages[index] = false;
    }
  });
  const report = { player: player.name, reason, released, round: state.round };
  state.liquidations.unshift(report);
  state.liquidations.length = Math.min(state.liquidations.length, 8);
  logEvent(`${player.name} 破产：${reason}。`);
  unlockAchievement("firstBankrupt");
  showLiquidationReport(report);
  checkWinner();
}

function checkWinner() {
  const remaining = activePlayers();
  if (remaining.length !== 1 || state.gameOver) return;
  const winner = remaining[0];
  state.gameOver = true;
  state.phase = "gameOver";
  state.winnerDialogDismissed = false;
  state.status = `${winner.name} 获胜，总身价 ${formatMoney(netWorth(winner))}。`;
  logEvent(`${winner.name} 获得胜利。`);
  unlockAchievement("firstWin");
  recordLeaderboard(winner);
  completeTutorialIfNeeded(winner);
  playFx("victory");
}

function drawChance(player) {
  if (state.deckIndex >= state.deck.length) {
    state.deck = shuffle(chanceCards.map((_, index) => index));
    state.deckIndex = 0;
  }
  const card = chanceCards[state.deck[state.deckIndex]];
  state.deckIndex += 1;
  const result = card.grantCard ? grantPlayerCard(player, card.grantCard) : card.apply(player);
  logEvent(`${player.name} 抽到「${card.title}」：${result}`);
  showCardReveal(card, result, player);
  if (state.gameOver) return;
  state.status = `${card.title}：${result}`;
  checkWinner();
}

function grantPlayerCard(player, cardId) {
  const card = handCardDefinitions[cardId];
  if (!card) return `${player.name} 抽到一张未知卡，牌堆已自动跳过。`;

  if (!Array.isArray(player.cards)) player.cards = [];
  if (player.cards.length >= MAX_HAND_CARDS) {
    player.cash += 80;
    showEventBurst("+¥80 手牌已满", "gain");
    return `${player.name} 手牌已满，将「${card.title}」兑换为 80 现金。`;
  }

  player.cards.push(cardId);
  showEventBurst(`${player.name} 获得「${card.title}」`, card.tone || "gain");
  return `${player.name} 获得手牌「${card.title}」。`;
}

function animateDiceRoll(d1, d2, total, done) {
  let ticks = 0;
  const timer = window.setInterval(() => {
    ticks += 1;
    dieOne.textContent = String(rollDie());
    dieTwo.textContent = String(rollDie());
    diceTotal.textContent = "骰子滚动中";
    if (ticks >= 10) {
      window.clearInterval(timer);
      state.lastRoll = { d1, d2, total };
      state.diceRolling = false;
      render();
      done();
    }
  }, 60);
}

function animateMovePlayer(player, steps, done) {
  let remaining = steps;

  const step = () => {
    if (remaining <= 0 || state.gameOver) {
      done();
      return;
    }

    const next = (player.position + 1) % spaces.length;
    if (next === 0) {
      const bonus = passStartBonusFor(player);
      player.cash += bonus;
      logEvent(`${player.name} 经过起点，领取 ${bonus} 现金。`);
      showEventBurst(`+${formatMoney(bonus)} 起点`, "gain");
    }
    player.position = next;
    state.pathHighlight = next;
    remaining -= 1;
    state.status = `${player.name} 前进中，还剩 ${remaining} 格。`;
    render();
    window.setTimeout(step, MOVEMENT_STEP_MS);
  };

  window.setTimeout(step, MOVEMENT_STEP_MS);
}

function movePlayer(player, steps) {
  const oldPosition = player.position;
  const next = (oldPosition + steps) % spaces.length;
  if (oldPosition + steps >= spaces.length) {
    const bonus = passStartBonusFor(player);
    player.cash += bonus;
    logEvent(`${player.name} 经过起点，领取 ${bonus} 现金。`);
  }
  player.position = next;
  state.pathHighlight = next;
}

function moveTo(player, targetIndex, collectPassing) {
  const oldPosition = player.position;
  if (collectPassing && targetIndex <= oldPosition && targetIndex !== oldPosition) {
    const bonus = passStartBonusFor(player);
    player.cash += bonus;
    logEvent(`${player.name} 经过起点，领取 ${bonus} 现金。`);
  }
  player.position = targetIndex;
  state.pathHighlight = targetIndex;
}

function passStartBonusFor(player) {
  const transitCount = ownedPropertyIndexes(player.id).filter((index) => spaces[index].specialty === "transit").length;
  return PASS_START_BONUS + (transitCount > 0 ? 20 : 0);
}

function recordRegionVisit(player, space) {
  if (!player || !space?.region) return;
  if (!Array.isArray(player.visitedRegions)) player.visitedRegions = [];
  if (!player.visitedRegions.includes(space.region)) {
    player.visitedRegions.push(space.region);
    if (player.visitedRegions.length >= 5) unlockAchievement("worldTraveler");
    checkTasks(player);
  }
}

function applyOwnedCityVisit(player, index) {
  const space = spaces[index];
  if (!space || space.type !== "property") return "";

  if (space.specialty === "culture") {
    player.cash += 35;
    logEvent(`${player.name} 回访文化名城 ${space.name}，获得 35 现金。`);
    showEventBurst("+¥35 文化回访", "gain");
    return `${player.name} 回到自己的 ${space.name}，文化名城奖励 ${formatMoney(35)}。`;
  }

  if (space.specialty === "tourism" && currentMarket().id === "goldenWeek") {
    player.cash += 45;
    logEvent(`${player.name} 在黄金周回访 ${space.name}，获得旅游分红。`);
    showEventBurst("+¥45 旅游分红", "gain");
    return `${player.name} 回到自己的 ${space.name}，黄金周旅游分红 ${formatMoney(45)}。`;
  }

  return "";
}

function triggerCityStoryEvent(player, index) {
  const space = spaces[index];
  if (!player || player.bankrupt || !space || space.type !== "property") return "";
  const chance = state.config?.rulesPreset === "daily" ? 0.28 : 0.16;
  if (Math.random() > chance) return "";

  const event = cityStoryEventFor(space, index);
  if (!event) return "";
  event.apply(player, index);
  logEvent(`${spaceDisplayName(index)} 城市事件：${event.title}。`);
  addNews("城市故事事件", `${spaceDisplayName(index)}：${event.detail}`, event.tone);
  flashTile(index, event.tone === "debt" ? "pay" : "rent");
  return event.detail;
}

function cityStoryEventFor(space, index) {
  if (space.specialty === "finance") {
    return {
      title: "金融波动",
      detail: "金融机构加速交易，股价热度上升但风险也抬头。",
      tone: "deal",
      apply(player, cityIndex) {
        addCityRevenue(cityIndex, 90);
        if (stockShares(player, cityIndex) > 0) player.cash += 45;
      },
    };
  }
  if (space.specialty === "tech") {
    return {
      title: "科技热潮",
      detail: "研发团队获得关注，科技城市股票和升级潜力上升。",
      tone: "gain",
      apply(player, cityIndex) {
        addCityRevenue(cityIndex, 75);
        if (state.owners[cityIndex] === player.id && !cityCompanies(cityIndex).techPark && player.cash >= companyBuildCost(cityIndex, "techPark")) {
          player.cash += 35;
        }
      },
    };
  }
  if (space.specialty === "tourism") {
    return {
      title: "旅游节",
      detail: "游客涌入，旅游城市短期收益提高。",
      tone: "gain",
      apply(player, cityIndex) {
        const owner = playerById(state.owners[cityIndex]);
        if (owner) owner.cash += 55;
        addCityRevenue(cityIndex, 85);
      },
    };
  }
  if (space.specialty === "transit") {
    return {
      title: "航线扩容",
      detail: "机场和交通网络扩容，航线分红更活跃。",
      tone: "deal",
      apply(player, cityIndex) {
        addCityRevenue(cityIndex, 70);
        if (state.owners[cityIndex] === player.id) player.cash += 35;
      },
    };
  }
  return {
    title: "文化节",
    detail: "城市文化活动带来客流和商业赞助。",
    tone: "gain",
    apply(player, cityIndex) {
      player.cash += 40;
      addCityRevenue(cityIndex, 55);
    },
  };
}

function recordRent(index, amount, payer, owner) {
  if (!Number.isFinite(amount) || amount <= 0) return;
  state.cityRevenue[index] = (state.cityRevenue[index] || 0) + amount;
  state.cityPeakRevenue[index] = Math.max(state.cityPeakRevenue[index] || 0, amount);
  if (!state.highestRent || amount > state.highestRent.amount) {
    state.highestRent = {
      amount,
      index,
      payer: payer.name,
      owner: owner.name,
      round: state.round,
    };
  }
  if (amount >= 180) unlockAchievement("highRent");
  if (amount >= 300) unlockAchievement("rentKing");
  flashTile(index, "rent");
}

function flashTile(index, type) {
  state.tileFlash = { index, type, until: Date.now() + 1300 };
  window.setTimeout(() => {
    if (state.tileFlash?.index === index && state.tileFlash.until <= Date.now()) {
      state.tileFlash = null;
      render();
    }
  }, 1350);
}

function sendToPause(player) {
  if (player.pauseShield) {
    player.pauseShield = false;
    logEvent(`${player.name} 的免暂停通行生效，抵消暂停。`);
    showEventBurst("免暂停生效", "build");
    return;
  }
  player.position = PAUSE_INDEX;
  player.skipTurns = Math.max(player.skipTurns, 1);
}

function advanceToNextPlayer() {
  if (state.gameOver) return;
  const original = state.currentPlayer;
  do {
    state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    if (state.currentPlayer === 0) {
      state.round += 1;
      rotateMarket();
      applyBankInterest();
	      applyDebtInterest();
	      applyShortBorrowInterest();
	      applyCitySystems();
	      applyCoopContracts();
	      captureStockTrends();
      advanceRouteMission();
      createQuarterlyReportIfNeeded();
      checkTurnLimit();
    }
  } while (state.players[state.currentPlayer].bankrupt && state.currentPlayer !== original);
  const player = currentPlayer();
  if (player) {
    player.ventureUsed = false;
    player.activeSkillUsed = false;
  }
}

function applyDebtInterest() {
  state.players.forEach((player) => {
    if (player.bankrupt || !player.debt) return;
    const finance = financeFor(player);
    const bankDebt = Math.max(0, (player.debt || 0) - financingDebtTotal(player));
    let totalInterest = 0;

    if (bankDebt > 0) {
      totalInterest += Math.max(10, Math.round(bankDebt * bankLoanInterestRate(player)));
    }
    if (finance.marginDebt > 0) {
      const interest = Math.max(8, Math.round(finance.marginDebt * marginInterestRate(player)));
      finance.marginDebt += interest;
      totalInterest += interest;
    }
    if (finance.convertibleDebt > 0) {
      const interest = Math.max(5, Math.round(finance.convertibleDebt * convertibleInterestRate(player)));
      finance.convertibleDebt += interest;
      totalInterest += interest;
    }
    if (finance.bondDebt > 0) {
      const interest = Math.max(7, Math.round(finance.bondDebt * bondInterestRate(player)));
      finance.bondDebt += interest;
      totalInterest += interest;
    }

    if (totalInterest <= 0) return;
    player.debt += totalInterest;
    logEvent(`${player.name} 融资债务产生 ${totalInterest} 利息。`);
    logBank("融资利息", `${player.name} 综合利率 ${Math.round(weightedFinancingRate(player) * 1000) / 10}%`, totalInterest, "interest");
    if (player.debt >= 900) {
      payBank(player, 80, "贷款压力");
    }
  });
}

function applyShortBorrowInterest() {
  state.players.forEach((player) => {
    if (player.bankrupt) return;
    const finance = financeFor(player);
    const entries = Object.entries(finance.shortPositions || {});
    if (!entries.length) return;
    const interest = entries.reduce((total, [index, position]) => {
      return total + Math.round(stockPrice(Number(index)) * Number(position.shares || 0) * shortBorrowRate(player, Number(index)));
    }, 0);
    if (interest <= 0) return;
    player.debt = (player.debt || 0) + interest;
    logEvent(`${player.name} 借空仓位产生 ${interest} 借空利息。`);
    logBank("借空利息", `${player.name} 空头市值 ${formatMoney(totalShortLiability(player))}`, interest, "interest");
    if (riskIndex(player).score >= 82) payBank(player, 60, "做空保证金压力");
  });
}

function applyBankInterest() {
  activePlayers().forEach((player) => {
    const interest = bankDepositInterestFor(player);
    if (interest <= 0) return;
    player.cash += interest;
    logEvent(`${player.name} 银行卡存款利息入账 ${interest}。`);
    logBank("存款利息", `${player.name} 的 ${bankCardTier(player).label} 卡现金回流`, interest, "deposit");
  });
}

function applyCitySystems() {
  activePlayers().forEach((player) => {
    const maintenance = cityMaintenanceCost(player);
    if (maintenance > 0) payBank(player, maintenance, "城市维修费");

    const dividend = routeDividendFor(player);
    if (dividend > 0 && !player.bankrupt) {
      player.cash += dividend;
      logEvent(`${player.name} 获得航线/港口/地铁贸易分红 ${dividend}。`);
      showEventBurst(`+${formatMoney(dividend)} 贸易`, "gain");
    }

    const stockDividend = stockDividendFor(player);
    if (stockDividend > 0 && !player.bankrupt) {
      player.cash += stockDividend;
      logEvent(`${player.name} 获得城市股票股息 ${stockDividend}。`);
    }

    const companyDividend = companyDividendFor(player);
    if (companyDividend > 0 && !player.bankrupt) {
      player.cash += companyDividend;
      logEvent(`${player.name} 获得城市公司现金流 ${companyDividend}。`);
    }
  });
}

function applyCoopContracts() {
  const contracts = normalizeCoopContracts(state.coopContracts);
  let changed = false;
  contracts.forEach((contract) => {
    if (contract.status !== "active") return;
    const owner = playerById(contract.ownerId);
    const partner = playerById(contract.partnerId);
    const index = contract.propertyIndex;
    if (!owner || owner.bankrupt) {
      breachCoopContract(contract, "所有方破产");
      changed = true;
      return;
    }
    if (!partner || partner.bankrupt) {
      contract.status = "terminated";
      contract.remainingRounds = 0;
      contract.endedRound = state.round;
      contract.breachReason = "合作方破产";
      changed = true;
      return;
    }
    if (state.owners[index] !== owner.id) {
      breachCoopContract(contract, "控制权转移");
      changed = true;
      return;
    }
    if (state.mortgages[index]) {
      breachCoopContract(contract, "抵押违约");
      changed = true;
      return;
    }

    const defaultDividend = coopDividend(index);
    const partnerShare = Number.isFinite(Number(contract.partnerPerRound))
      ? Math.max(0, Math.round(Number(contract.partnerPerRound)))
      : Math.round(defaultDividend * contract.share);
    const ownerShare = Number.isFinite(Number(contract.ownerPerRound))
      ? Math.max(0, Math.round(Number(contract.ownerPerRound)))
      : Math.max(0, defaultDividend - partnerShare);
    const dividend = partnerShare + ownerShare;
    owner.cash += ownerShare;
    partner.cash += partnerShare;
    addCityRevenue(index, dividend);
    contract.totalPartnerPaid = (contract.totalPartnerPaid || 0) + partnerShare;
    contract.totalOwnerPaid = (contract.totalOwnerPaid || 0) + ownerShare;
    contract.totalDividend = (contract.totalDividend || 0) + dividend;
    contract.remainingRounds -= 1;
    logEvent(`${spaceDisplayName(index)} 合作合同分红：${owner.name} ${formatMoney(ownerShare)}，${partner.name} ${formatMoney(partnerShare)}。`);
    if (contract.remainingRounds <= 0) {
      contract.status = "completed";
      contract.endedRound = state.round;
      contract.breachReason = "正常到期";
      contract.settlement = contractSettlementSummary(contract, owner, partner);
      adjustContractReputation(owner, 4);
      adjustContractReputation(partner, 4);
      logDeal("合同到期", `${spaceDisplayName(index)} 合作合同完成`, dividend, "coop");
      showContractSettlementReport(contract, owner, partner);
    }
    changed = true;
  });
  if (changed) state.coopContracts = normalizeCoopContracts(contracts);
}

function contractSettlementSummary(contract, owner, partner) {
  const partnerNet = Math.round((contract.totalPartnerPaid || 0) - (contract.upfront || 0));
  const ownerNet = Math.round((contract.ownerReceipt ?? contract.upfront ?? 0) + (contract.totalOwnerPaid || 0));
  const advice = partnerNet >= 0 ? "值得续约" : "谨慎续约";
  return `${partner?.name || "合作方"}净收益 ${formatMoney(partnerNet)}，${owner?.name || "所有方"}收入 ${formatMoney(ownerNet)}，${advice}`;
}

function showContractSettlementReport(contract, owner, partner) {
  if (!effectsLayer) return;
  const report = document.createElement("div");
  report.className = "contract-settlement-report";
  const title = document.createElement("strong");
  title.textContent = "合同到期结算";
  const city = document.createElement("span");
  city.textContent = spaceDisplayName(contract.propertyIndex);
  const stats = document.createElement("p");
  stats.textContent = contractSettlementSummary(contract, owner, partner);
  const stamp = document.createElement("em");
  stamp.textContent = (contract.totalPartnerPaid || 0) >= (contract.upfront || 0) ? "建议续约" : "重新谈判";
  report.append(title, city, stats, stamp);
  effectsLayer.appendChild(report);
  window.setTimeout(() => report.remove(), 3200);
}

function breachCoopContractsForProperty(propertyIndex, ownerId, reason) {
  const contracts = normalizeCoopContracts(state.coopContracts);
  let changed = false;
  contracts.forEach((contract) => {
    if (contract.status !== "active") return;
    if (contract.propertyIndex !== propertyIndex || contract.ownerId !== ownerId) return;
    breachCoopContract(contract, reason);
    changed = true;
  });
  if (changed) state.coopContracts = normalizeCoopContracts(contracts);
}

function breachCoopContract(contract, reason) {
  if (!contract || contract.status !== "active") return;
  const owner = playerById(contract.ownerId);
  const partner = playerById(contract.partnerId);
  const penalty = Math.max(0, Math.round(contract.penalty || 0));
  let paid = 0;
  if (owner && !owner.bankrupt && partner && !partner.bankrupt && penalty > 0) {
    ensureFunds(owner, penalty, "合作违约金");
    paid = Math.min(owner.cash, penalty);
    owner.cash -= paid;
    partner.cash += paid;
    if (paid < penalty) bankruptPlayer(owner, "合作违约金不足");
  }
  contract.status = "breached";
  contract.remainingRounds = 0;
  contract.endedRound = state.round;
  contract.breachReason = reason;
  contract.settlement = `${reason}，赔付 ${formatMoney(paid)}；所有方信誉下降。`;
  adjustContractReputation(owner, -8);
  if (partner && !partner.bankrupt) adjustContractReputation(partner, 1);
  state.status = `${spaceDisplayName(contract.propertyIndex)} 合作合同违约：${reason}，赔付 ${formatMoney(paid)}。`;
  logEvent(`${spaceDisplayName(contract.propertyIndex)} 合作合同触发违约条款：${reason}。`);
  addNews("合作违约", `${spaceDisplayName(contract.propertyIndex)} 因${reason}触发违约金 ${formatMoney(paid)}。`, "debt");
  logDeal("合作违约", `${spaceDisplayName(contract.propertyIndex)} / ${reason}`, paid, "coop");
  showContractAnimation("违约盖章", `${spaceDisplayName(contract.propertyIndex)} / ${reason} / ${formatMoney(paid)}`, "debt");
  showEventBurst("合作违约", "pay");
}

function cityMaintenanceCost(player) {
  return ownedPropertyIndexes(player.id).reduce((total, index) => {
    const level = state.levels[index] || 0;
    if (level <= 2 || state.mortgages[index]) return total;
    const ecoDiscount = 1 - (state.ecoLevels[index] || 0) * 0.12;
    return total + Math.round(level * 12 * ecoDiscount);
  }, 0);
}

function routeDividendFor(player) {
  const owned = ownedPropertyIndexes(player.id);
  const ports = owned.filter((index) => spaces[index].coastal).length;
  const airports = owned.filter((index) => spaces[index].airport || spaces[index].specialty === "transit").length;
  const energy = owned.filter((index) => spaces[index].energy).length;
  const adjacent = owned.filter((index) => state.owners[(index + 1) % spaces.length] === player.id).length;
  const metroGroups = new Set(owned.map((index) => spaces[index].group).filter((group) => groupOwnedCount(player.id, group) >= CONTINENT_SET_SIZE)).size;
  return ports * 18 + airports * 16 + energy * 12 + adjacent * 10 + metroGroups * 28 + cityCombinationDividend(player);
}

function ownedCompanyCount(player, type = "") {
  if (!player) return 0;
  return ownedPropertyIndexes(player.id).reduce((total, index) => {
    const companies = cityCompanies(index);
    if (type) return total + (companies[type] ? 1 : 0);
    return total + cityCompanyCount(index);
  }, 0);
}

function companyDividendFor(player) {
  return ownedPropertyIndexes(player.id).reduce((total, index) => {
    const companies = cityCompanies(index);
    return total
      + (companies.company ? 35 : 0)
      + (companies.hotel ? Math.round((spaces[index].tourism || 50) * 0.45) : 0)
      + (companies.bank ? 28 + Math.round(creditLimit(player) * 0.006) : 0)
      + (companies.techPark ? 24 + Math.round(stockPrice(index) * 0.18) : 0);
  }, 0);
}

function stockDividendFor(player) {
  return Object.entries(player.stocks || {}).reduce((total, [index, shares]) => {
    const cityIndex = Number(index);
    if (!spaces[cityIndex]) return total;
    const revenue = state.cityRevenue[cityIndex] || 0;
    const ipoBonus = state.cityPublic?.[cityIndex] ? 1.18 : 1;
    return total + Math.round(Number(shares) * Math.min(42, (revenue * 0.03 + stockPrice(cityIndex) * 0.02) * ipoBonus));
  }, 0);
}

function checkTurnLimit() {
  const limit = currentRules().turnLimit;
  if (!limit || state.round <= limit || state.gameOver) return;
  const ranking = [...activePlayers()].sort((a, b) => netWorth(b) - netWorth(a));
  const winner = ranking[0];
  if (!winner) return;
  state.gameOver = true;
  state.phase = "gameOver";
  state.winnerDialogDismissed = false;
  state.status = `限时结算：${winner.name} 以 ${formatMoney(netWorth(winner))} 获胜。`;
  logEvent(`${winner.name} 在限时结算中获胜。`);
  unlockAchievement("firstWin");
  recordLeaderboard(winner);
  completeTutorialIfNeeded(winner);
  playFx("victory");
}

function scheduleAutomation() {
  window.clearTimeout(automationTimer);
  if (state.phase === "auction") {
    const bidder = currentAuctionBidder();
    if (bidder?.isAI) {
      automationTimer = window.setTimeout(runAuctionAITurn, 320);
    } else if (bidder) {
      const remaining = (state.auction?.deadline || Date.now()) - Date.now();
      if (remaining <= 0) {
        automationTimer = window.setTimeout(() => passAuction(bidder), 80);
      } else {
        automationTimer = window.setTimeout(render, Math.min(1000, remaining));
      }
    }
    return;
  }

  const player = currentPlayer();
  if (!player || !player.isAI || state.gameOver) return;
  if (state.phase === "waiting") {
    automationTimer = window.setTimeout(() => rollCurrentTurn(true), 360);
  }
  if (state.phase === "ending") {
    automationTimer = window.setTimeout(endTurn, 420);
  }
}

function shouldAIBuy(player, index) {
  const price = propertyPrice(index);
  const difficulty = aiDifficulty();
  const style = aiStyleDefinitions[player.aiStyle] || aiStyleDefinitions.builder;
  const styleReserve = player.aiStyle === "auctioneer" ? -70 : player.aiStyle === "builder" ? 40 : 0;
  const reserve = (spaces[index].kind === "street" ? 260 : 320) + difficulty.reserveBonus + styleReserve;
  const groupOwned = groupOwnedCount(player.id, spaces[index].group);
  const alreadyOwnsGroup = groupOwned > 0;
  const setChase = groupOwned >= CONTINENT_SET_SIZE - 1 ? 150 * difficulty.setFocus : groupOwned * 52 * difficulty.setFocus;
  const valuationEdge = Math.max(0, cityValuation(index) - price) * 0.1 * difficulty.valueFocus;
  const powerEdge = Math.max(0, cityPowerScore(index) - 58) * 1.6 * difficulty.valueFocus;
  const stylePush = (player.aiStyle === "collector" && alreadyOwnsGroup ? 90 : player.aiStyle === "builder" && canBuildOn(index) ? 24 : 0) + style.buyBias;
  const score = setChase + valuationEdge + powerEdge + stylePush;
  const hasCashPlan = player.cash - price >= difficulty.minCashAfterBuy;
  return player.cash - price >= reserve || (hasCashPlan && score >= difficulty.buyThreshold);
}

function cardUseLabel(player, cardId) {
  if (player.isAI) return "托管";
  if (state.gameOver) return "结束";
  if (state.phase === "moving") return "等待";
  if (state.phase === "auction") return "拍卖中";
  if (cardId === "rentShield" && player.rentShield) return "已启用";
  if (cardId === "disasterShield" && player.disasterShield) return "已启用";
  return "使用";
}

function canUseCard(player, cardId) {
  if (!player || player.bankrupt || player.isAI || state.gameOver) return false;
  if (player.id !== currentPlayer()?.id) return false;
  if (["moving", "auction"].includes(state.phase)) return false;
  const card = handCardDefinitions[cardId];
  if (!card) return false;
  if (cardId === "rentShield" && player.rentShield) return false;
  if (typeof card.canUse === "function" && !card.canUse(player)) return false;
  return true;
}

function canCurrentPlayerUpgrade(index) {
  const player = currentPlayer();
  if (!player || player.isAI || state.gameOver) return false;
  if (state.phase === "decision") return false;
  if (state.owners[index] !== player.id) return false;
  if (!canBuildOn(index) || state.levels[index] >= MAX_LEVEL) return false;
  if (state.mortgages[index]) return false;
  return player.cash >= buildCostFor(player, index);
}

function canMortgageCurrent(index) {
  const player = currentPlayer();
  if (!player || player.isAI || state.gameOver) return false;
  return state.owners[index] === player.id && !state.mortgages[index] && spaces[index].type === "property";
}

function canRedeemCurrent(index) {
  const player = currentPlayer();
  if (!player || player.isAI || state.gameOver) return false;
  return state.owners[index] === player.id && state.mortgages[index] && player.cash >= redeemCost(index);
}

function mortgageValue(index) {
  return Math.floor((spaces[index].price || 0) * 0.5);
}

function redeemCost(index) {
  return Math.floor((spaces[index].price || 0) * 0.6);
}

function canBuildOn(index) {
  return spaces[index].type === "property" && Boolean(spaces[index].buildCost);
}

function ownsFullStreetGroup(playerId, group) {
  if (!playerId || !group) return false;
  const groupIndexes = spaces
    .map((space, index) => ({ space, index }))
    .filter((item) => item.space.type === "property" && item.space.kind === "street" && item.space.group === group)
    .map((item) => item.index);
  return groupIndexes.length > 1 && groupIndexes.every((index) => state.owners[index] === playerId);
}

function ownsContinentSet(playerId, group) {
  return groupOwnedCount(playerId, group) >= CONTINENT_SET_SIZE;
}

function groupOwnedCount(playerId, group) {
  if (!playerId || !group) return 0;
  return spaces.filter((space, index) => space.type === "property" && space.group === group && state.owners[index] === playerId).length;
}

function groupSize(group) {
  return spaces.filter((space) => space.type === "property" && space.group === group).length;
}

function groupLabel(group) {
  const labels = {
    asia: "亚洲套装",
    europe: "欧洲套装",
    northAmerica: "北美套装",
    southAmerica: "南美套装",
    africa: "非洲套装",
    oceania: "大洋洲套装",
    middleEast: "中东套装",
    world: "世界名城套装",
  };
  return labels[group] || "城市套装";
}

function nearestUnownedProperty(fromIndex) {
  for (let step = 1; step <= spaces.length; step += 1) {
    const index = (fromIndex + step) % spaces.length;
    if (spaces[index].type === "property" && !state.owners[index]) return index;
  }
  return null;
}

function flightDestination(player) {
  if (!player) return null;
  const visited = new Set(player.visitedRegions || []);
  const candidates = spaces
    .map((space, index) => ({ space, index, distance: (index - player.position + spaces.length) % spaces.length }))
    .filter((item) => item.space.type === "property" && item.index !== player.position)
    .sort((a, b) => {
      const aNewRegion = visited.has(a.space.region) ? 1 : 0;
      const bNewRegion = visited.has(b.space.region) ? 1 : 0;
      const aOwned = state.owners[a.index] ? 1 : 0;
      const bOwned = state.owners[b.index] ? 1 : 0;
      return aNewRegion - bNewRegion || aOwned - bOwned || a.distance - b.distance;
    });
  return candidates[0]?.index ?? null;
}

function ownedPropertyIndexes(playerId) {
  return state.owners
    .map((ownerId, index) => (ownerId === playerId ? index : -1))
    .filter((index) => index >= 0);
}

function activePlayers() {
  return state.players.filter((player) => !player.bankrupt);
}

function currentPlayer() {
  return state.players[state.currentPlayer];
}

function humanPlayer() {
  return state.players.find((player) => !player.isAI && !player.bankrupt) || state.players.find((player) => !player.isAI) || null;
}

function playerById(id) {
  return state.players.find((player) => player.id === id);
}

function netWorth(player) {
  const assets = ownedPropertyIndexes(player.id).reduce((total, index) => {
    const space = spaces[index];
    const baseValue = state.mortgages[index] ? mortgageValue(index) : space.price;
    return total + baseValue + state.levels[index] * (space.buildCost || 0) + (state.ecoLevels[index] || 0) * Math.round(ECO_UPGRADE_COST * 0.55);
  }, 0);
  const stockAssets = Object.entries(player.stocks || {}).reduce((total, [index, shares]) => {
    return total + stockPrice(Number(index)) * Number(shares || 0);
  }, 0);
  const dilutionPenalty = Math.round((assets + stockAssets) * financeFor(player).equityDilution * 0.42);
  return player.cash + assets + stockAssets - dilutionPenalty - totalShortLiability(player) - (player.debt || 0);
}

function boardGridPosition(index) {
  const side = BOARD_GRID_SIZE;
  const rightStart = side;
  const bottomStart = side + (side - 1);
  const leftStart = bottomStart + (side - 1);

  if (index < side) return { row: 1, col: index + 1 };
  if (index < bottomStart) return { row: index - side + 2, col: side };
  if (index < leftStart) return { row: side, col: side - (index - bottomStart) - 1 };
  return { row: side - (index - leftStart) - 1, col: 1 };
}

function tileMeta(space, index) {
  if (space.type === "property") {
    const price = propertyPrice(index);
    if (space.kind === "utility") return `¥${price}`;
    if (space.kind === "station") return `¥${price}`;
    return `¥${price} / 租 ${space.rent}`;
  }
  if (space.type === "tax") return `-${space.amount}`;
  if (space.type === "bonus") return `+${space.amount}`;
  return space.meta || "";
}

function tileDetail(index) {
  const space = spaces[index];
  if (space.type === "property") {
    const owner = playerById(state.owners[index]);
    const prefix = propertyPlaceLabel(space);
    const specialty = citySpecialtyLabel(space.specialty);
    if (!owner) return currentLanguage() === "zh"
      ? `${prefix}，${specialty}，${uiText("availableToBuy", formatMoney(propertyPrice(index)))}`
      : `${prefix}, ${uiText("availableToBuy", formatMoney(propertyPrice(index)))}`;
    const rollTotal = state.lastRoll?.total || 7;
    const rent = calculateRent(index, rollTotal);
    const setText = ownsContinentSet(owner.id, space.group) ? `, ${uiText("setActive")}` : "";
    if (owner.id === currentPlayer()?.id) return currentLanguage() === "zh"
      ? `${prefix}，${uiText("yourAsset")}，${upgradeTierName(index)}${setText.replace(/^, /, "，")}，${uiText("rentText", formatMoney(rent))}`
      : `${prefix}, ${uiText("yourAsset")}${setText}, ${uiText("rentText", formatMoney(rent))}`;
    return currentLanguage() === "zh"
      ? `${prefix}，${uiText("heldBy", owner.name)}${setText.replace(/^, /, "，")}，${uiText("rentText", formatMoney(rent))}`
      : `${prefix}, ${uiText("heldBy", owner.name)}${setText}, ${uiText("rentText", formatMoney(rent))}`;
  }
  if (space.type === "tax") return uiText("payAmount", formatMoney(space.amount));
  if (space.type === "bonus") return uiText("bonusAmount", formatMoney(space.amount));
  if (space.type === "shop") return uiText("shopDetail");
  if (space.type === "chance") return uiText("chanceDetail");
  if (space.type === "gotoJail") return uiText("gotoPauseDetail");
  if (space.type === "jail") return uiText("pauseDetail");
  if (space.type === "start") return uiText("startDetail", formatMoney(PASS_START_BONUS));
  return space.meta || uiText("cityTile");
}

function currentTileBadge(index) {
  const space = spaces[index];
  if (space.type === "property") {
    const owner = playerById(state.owners[index]);
    if (!owner) return "待售";
    if (owner.id === currentPlayer()?.id) return "自有";
    return "收租";
  }
  if (space.type === "tax") return "支出";
  if (space.type === "bonus" || space.type === "start") return "收益";
  if (space.type === "shop") return "商店";
  if (space.type === "chance") return "事件";
  if (space.type === "gotoJail" || space.type === "jail") return "暂停";
  return "地块";
}

function tileAccentColor(type) {
  const colors = {
    start: "#2d9f6f",
    bonus: "#2d9f6f",
    chance: "#d89921",
    shop: "#7657b8",
    tax: "#df624e",
    gotoJail: "#df624e",
    jail: "#3976d3",
    parking: "#3976d3",
  };
  return colors[type] || "#223042";
}

function assetDetails(index) {
  const space = spaces[index];
  if (state.mortgages[index]) return `已抵押，赎回需 ${formatMoney(redeemCost(index))}`;
  const place = space.region ? `${space.region} / ${space.country}` : "全球资产";
  const tier = upgradeTierName(index);
  const hqText = isHeadquarter(state.owners[index], index) ? "，总部" : "";
  if (space.kind === "station") return `${place}，${tier}，当前租金 ${calculateRent(index, 7)}`;
  if (space.kind === "utility") return `${place}，${tier}，租金按骰点计算`;
  const ownerId = state.owners[index];
  const setText = ownsContinentSet(ownerId, space.group)
    ? `，${groupLabel(space.group)}已激活`
    : `，${groupLabel(space.group)} ${groupOwnedCount(ownerId, space.group)}/${CONTINENT_SET_SIZE}`;
  return `${place}，${tier}${hqText}，${cityRating(index)}级${setText}，当前租金 ${calculateRent(index, 7)}`;
}

function upgradeLabel(index) {
  const space = spaces[index];
  if (state.mortgages[index]) return "已抵押";
  if (!canBuildOn(index)) return "固定";
  if (state.levels[index] >= MAX_LEVEL) return "满级";
  return `${nextUpgradeName(index)} ${formatMoney(buildCostFor(currentPlayer(), index))}`;
}

function buildCostFor(player, index) {
  const base = spaces[index].buildCost || 0;
  const characterDiscount = player?.character === "builder" ? characterDefinitions.builder.buildDiscount : 1;
  const cityDiscount = spaces[index]?.specialty === "tech" ? citySpecialtyDefinitions.tech.build : 1;
  const energyDiscount = ownedPropertyIndexes(player?.id).some((ownedIndex) => spaces[ownedIndex].energy) ? 0.96 : 1;
  return Math.round((base * currentRules().buildFactor * characterDiscount * cityDiscount * energyDiscount) / 5) * 5;
}

function upgradeTierName(index) {
  const level = state.levels[index] || 0;
  const labels = upgradeTierLabels[currentLanguage()] || upgradeTierLabels.zh;
  return `${labels[level] || labels[MAX_LEVEL]} ${level}/${MAX_LEVEL}`;
}

function nextUpgradeName(index) {
  const nextLevel = Math.min(MAX_LEVEL, (state.levels[index] || 0) + 1);
  const labels = nextUpgradeLabels[currentLanguage()] || nextUpgradeLabels.zh;
  return labels[nextLevel] || uiText("upgradeFocus");
}

function renderLevelPips(index) {
  const pips = document.createElement("div");
  pips.className = "level-pips";
  if (!canBuildOn(index)) return pips;
  const level = state.levels[index] || 0;
  for (let i = 0; i < MAX_LEVEL; i += 1) {
    const pip = document.createElement("span");
    if (i < level) pip.className = "is-filled";
    pips.appendChild(pip);
  }
  return pips;
}

function renderPropertyUpgradeTrack(index, className) {
  const track = document.createElement("div");
  track.className = className;
  const level = state.levels[index] || 0;
  for (let i = 0; i < MAX_LEVEL; i += 1) {
    const step = document.createElement("span");
    if (i < level) step.className = "is-filled";
    step.title = `升级 ${i + 1}`;
    track.appendChild(step);
  }
  return track;
}

function createPropertyShowcase(index) {
  const space = spaces[index];
  const owner = playerById(state.owners[index]);
  const rent = owner ? calculateRent(index, state.lastRoll?.total || 7) : estimatedRent(index);
  const card = document.createElement("article");
  card.className = "property-showcase";
  card.style.setProperty("--property-color", space.color || "#d89921");
  card.dataset.level = String(state.levels[index] || 0);

  const art = createCityArt(space, index);

  const header = document.createElement("div");
  header.className = "property-showcase-header";
  const copy = document.createElement("div");
  const number = document.createElement("span");
  number.className = "property-card-number";
  number.textContent = uiText("propertyCard", propertyCardNumber(index));
  const title = document.createElement("strong");
  title.textContent = spaceDisplayName(index);
  const subtitle = document.createElement("small");
  subtitle.textContent = propertyPlaceLabel(space);
  copy.append(number, title, subtitle);
  const badge = document.createElement("span");
  badge.className = "property-set-badge";
  badge.textContent = groupLabel(space.group);
  header.append(copy, badge);

  const stats = document.createElement("div");
  stats.className = "property-showcase-stats";
  stats.append(
    createPropertyStat("持有者", owner ? owner.name : "待售"),
    createPropertyStat("价格", formatMoney(propertyPrice(index))),
    createPropertyStat("当前租金", formatMoney(rent)),
    createPropertyStat("商业估值", formatMoney(cityValuation(index))),
    createPropertyStat("升级费", state.levels[index] >= MAX_LEVEL ? "满级" : formatMoney(buildCostFor(currentPlayer(), index))),
    createPropertyStat("历史收益", formatMoney(state.cityRevenue[index] || 0)),
    createPropertyStat("股票", `${formatMoney(stockPrice(index))} / 持 ${stockShares(currentPlayer(), index)}`),
    createPropertyStat("股本容量", `${stockLimitForCity(index)} 股${state.cityPublic?.[index] ? " / 已IPO" : ""}`),
    createPropertyStat("空头", `${shortShares(currentPlayer(), index)} / 利率 ${Math.round(shortBorrowRate(currentPlayer(), index) * 1000) / 10}%`),
    createPropertyStat("融资", `${cityFundingRounds(index)}/${CAPITAL_ROUND_LIMIT}`),
    createPropertyStat("公司", companySummary(index)),
    createPropertyStat("评级", `${cityRating(index)} / ${cityRatingScore(index)}分`),
    createPropertyStat("人口", `${space.population}M`),
    createPropertyStat("游客", `${space.visitors}M`),
  );

  const insights = createPropertyInsights(index);

  const attributes = document.createElement("div");
  attributes.className = "property-attributes";
  attributes.append(
    createAttributeMeter("繁荣", space.prosperity),
    createAttributeMeter("治安", space.security),
    createAttributeMeter("旅游", space.tourism),
    createAttributeMeter("科技", space.tech),
  );

  const specialty = citySpecialtyDefinitions[space.specialty] || citySpecialtyDefinitions.culture;
  const perk = document.createElement("p");
  perk.className = "property-perk";
  perk.textContent = `城市技能：${specialty.label}，${specialty.effect}。${continentSetDescription(index)}`;

  const story = document.createElement("p");
  story.className = "property-story";
  story.textContent = `${rareBadgeLabel(space.rareBadge)}：${space.story}`;

  const actions = createPropertyShowcaseActions(index);

  card.append(art, header, stats, insights, renderPropertyUpgradeTrack(index, "current-upgrade-track"), attributes, story, perk, actions);
  return card;
}

function createPropertyShowcaseActions(index) {
  const actions = document.createElement("div");
  actions.className = "property-showcase-actions";
  actions.append(
    createPropertyActionGroup("建设", [
      createPropertyActionButton({
        label: upgradeLabel(index),
        icon: "build",
        tone: "build",
        disabled: !canCurrentPlayerUpgrade(index),
        reason: propertyActionReason("upgrade", index),
        dataset: { propertyAction: "upgrade", propertyIndex: String(index) },
      }),
      createPropertyActionButton({
        label: ecoUpgradeLabel(index),
        icon: "shield",
        tone: "build",
        disabled: !canEcoUpgrade(index),
        reason: propertyActionReason("eco", index),
        dataset: { propertyAction: "eco", propertyIndex: String(index) },
      }),
      createPropertyActionButton({
        label: `董事会 ${formatMoney(boardVoteCost(index))}`,
        icon: "gavel",
        tone: "build",
        disabled: !canBoardVoteUpgrade(currentPlayer(), index),
        reason: propertyActionReason("boardVote", index),
        dataset: { propertyAction: "boardVote", propertyIndex: String(index) },
      }),
    ]),
    createPropertyActionGroup("公司", COMPANY_TYPES.map((type) => createPropertyActionButton({
      label: `${companyTypeDefinitions[type].label} ${formatMoney(companyBuildCost(index, type))}`,
      icon: companyTypeDefinitions[type].icon,
      tone: companyTypeDefinitions[type].tone,
      disabled: !canBuildCompany(currentPlayer(), index, type),
      reason: propertyActionReason(`company:${type}`, index),
      dataset: { propertyAction: "company", propertyIndex: String(index), companyType: type },
    }))),
    createPropertyActionGroup("资本", [
      createPropertyActionButton({
        label: state.cityPublic?.[index] ? "已IPO" : "城市 IPO",
        icon: "chart",
        tone: "buy",
        disabled: !canLaunchIpo(currentPlayer(), index),
        reason: propertyActionReason("ipo", index),
        dataset: { propertyAction: "ipo", propertyIndex: String(index) },
      }),
      createPropertyActionButton({
        label: `股权收购 ${formatMoney(stockTakeoverCost(index))}`,
        icon: "crown",
        tone: "danger",
        disabled: !canStockTakeover(currentPlayer(), index),
        reason: propertyActionReason("stockTakeover", index),
        dataset: { propertyAction: "stockTakeover", propertyIndex: String(index) },
      }),
    ]),
    createPropertyActionGroup("投资", [
      createPropertyActionButton({
        label: `买股 ${formatMoney(stockPrice(index))}`,
        icon: "chart",
        tone: "buy",
        disabled: !canBuyStock(currentPlayer(), index),
        reason: propertyActionReason("buyStock", index),
        dataset: { stockAction: "buy", stockIndex: String(index) },
      }),
      createPropertyActionButton({
        label: `卖股 ${formatMoney(stockPrice(index))}`,
        icon: "coin",
        tone: "danger",
        disabled: !canSellStock(currentPlayer(), index),
        reason: propertyActionReason("sellStock", index),
        dataset: { stockAction: "sell", stockIndex: String(index) },
      }),
      createPropertyActionButton({
        label: `做空 ${formatMoney(stockPrice(index))}`,
        icon: "chart",
        tone: "danger",
        disabled: !canShortSell(currentPlayer(), index),
        reason: propertyActionReason("shortStock", index),
        dataset: { stockAction: "short", stockIndex: String(index) },
      }),
      createPropertyActionButton({
        label: `平空 ${formatMoney(stockPrice(index))}`,
        icon: "coin",
        tone: "buy",
        disabled: !canCoverShort(currentPlayer(), index),
        reason: propertyActionReason("coverShort", index),
        dataset: { stockAction: "cover", stockIndex: String(index) },
      }),
    ]),
    createPropertyActionGroup("资产", [
      createPropertyActionButton({
        label: `融资 ${formatMoney(capitalRaiseAmount(index))}`,
        icon: "gavel",
        tone: "buy",
        disabled: !canRaiseCapital(currentPlayer(), index),
        reason: propertyActionReason("funding", index),
        dataset: { propertyAction: "funding", propertyIndex: String(index) },
      }),
      createPropertyActionButton({
        label: state.mortgages[index] ? `赎回 ${formatMoney(redeemCost(index))}` : `抵押 ${formatMoney(mortgageValue(index))}`,
        icon: "home",
        tone: state.mortgages[index] ? "buy" : "danger",
        disabled: state.mortgages[index] ? !canRedeemCurrent(index) : !canMortgageCurrent(index),
        reason: propertyActionReason("mortgage", index),
        dataset: { propertyAction: "mortgage", propertyIndex: String(index) },
      }),
      createPropertyActionButton({
        label: isHeadquarter(currentPlayer()?.id, index) ? "已是总部" : "设为总部",
        icon: "crown",
        tone: "build",
        disabled: !canSetHeadquarter(currentPlayer(), index) || isHeadquarter(currentPlayer()?.id, index),
        reason: propertyActionReason("hq", index),
        dataset: { propertyAction: "hq", propertyIndex: String(index) },
      }),
    ]),
  );
  return actions;
}

function createPropertyActionGroup(label, buttons) {
  const group = document.createElement("details");
  group.className = "property-action-group";
  group.dataset.drawerId = `property:${label}`;
  if (drawerIsOpen(group.dataset.drawerId, Boolean(DEFAULT_DRAWER_OPEN[group.dataset.drawerId]))) group.open = true;
  const title = document.createElement("summary");
  title.className = "property-action-title";
  const labelText = document.createElement("strong");
  labelText.textContent = label;
  const meta = document.createElement("small");
  const enabledCount = buttons.filter((button) => !button.disabled).length;
  meta.textContent = enabledCount ? `${enabledCount} 可用` : "暂无";
  title.append(labelText, meta);
  const row = document.createElement("div");
  row.className = "property-action-row";
  row.append(...buttons);
  group.append(title, row);
  return group;
}

function createPropertyActionButton({ label, icon, tone, disabled, reason, dataset }) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.tone = tone;
  Object.entries(dataset).forEach(([key, value]) => {
    button.dataset[key] = value;
  });
  button.disabled = disabled;
  button.title = disabled && reason ? reason : label;
  button.append(createIcon(icon, "property-action-icon"));
  const copy = document.createElement("span");
  copy.className = "property-action-copy";
  const strong = document.createElement("strong");
  strong.textContent = label;
  copy.appendChild(strong);
  if (disabled && reason) {
    const small = document.createElement("small");
    small.textContent = reason;
    copy.appendChild(small);
  }
  button.appendChild(copy);
  return button;
}

function propertyActionReason(action, index) {
  const player = currentPlayer();
  if (!player || player.isAI) return "等待你的回合";
  if (state.gameOver) return "比赛已结束";
  if (action === "upgrade") {
    if (state.owners[index] !== player.id) return "不是你的城市";
    if (state.mortgages[index]) return "已抵押";
    if (!canBuildOn(index)) return "不能升级";
    if (state.levels[index] >= MAX_LEVEL) return "已满级";
    if (state.phase === "decision") return "买地决定中不能升级";
    return player.cash >= buildCostFor(player, index) ? "" : "现金不足";
  }
  if (action === "eco") {
    if (state.owners[index] !== player.id) return "不是你的城市";
    if (state.mortgages[index]) return "已抵押";
    if ((state.ecoLevels[index] || 0) >= 3) return "环保满级";
    return player.cash >= ecoUpgradeCost(index) ? "" : "现金不足";
  }
  if (action === "buyStock") {
    if (stockShares(player, index) >= stockLimitForCity(index)) return "持股已满";
    return player.cash >= stockPrice(index) ? "" : "现金不足";
  }
  if (action === "sellStock") return stockShares(player, index) > 0 ? "" : "没有持股";
  if (action === "shortStock") {
    if (shortShares(player, index) >= SHORT_MAX_PER_CITY) return "该城做空已满";
    return shortBorrowCapacity(player) >= stockPrice(index) ? "" : "借空额度不足";
  }
  if (action === "coverShort") {
    if (shortShares(player, index) <= 0) return "没有空头";
    return player.cash >= stockPrice(index) ? "" : "现金不足";
  }
  if (action === "funding") {
    if (state.owners[index] !== player.id) return "不是你的城市";
    if (state.mortgages[index]) return "已抵押";
    if (cityFundingRounds(index) >= CAPITAL_ROUND_LIMIT) return "融资已满";
    if (!businessDealsOpen(player)) return "等行动阶段";
    return "";
  }
  if (action === "mortgage") {
    if (state.owners[index] !== player.id) return "不是你的城市";
    if (state.mortgages[index]) return player.cash >= redeemCost(index) ? "" : "现金不足";
    return "";
  }
  if (action === "hq") {
    if (state.owners[index] !== player.id) return "不是你的城市";
    if (state.mortgages[index]) return "已抵押";
    if (isHeadquarter(player.id, index)) return "已经是总部";
    return "";
  }
  if (action.startsWith("company:")) {
    const type = action.split(":")[1];
    if (state.owners[index] !== player.id) return "不是你的城市";
    if (state.mortgages[index]) return "已抵押";
    if (cityCompanies(index)[type]) return "已建成";
    if (!businessDealsOpen(player)) return "等行动阶段";
    return player.cash >= companyBuildCost(index, type) ? "" : "现金不足";
  }
  if (action === "ipo") {
    if (state.owners[index] !== player.id) return "不是你的城市";
    if (state.cityPublic?.[index]) return "已上市";
    if (state.levels[index] < MAX_LEVEL) return "满级城市才能IPO";
    if (!businessDealsOpen(player)) return "等行动阶段";
    return "";
  }
  if (action === "stockTakeover") {
    if (!state.cityPublic?.[index]) return "未IPO";
    if (state.owners[index] === player.id) return "已是你的城市";
    if (stockShares(player, index) < STOCK_TAKEOVER_SHARES) return `至少持 ${STOCK_TAKEOVER_SHARES} 股`;
    return player.cash >= stockTakeoverCost(index) ? "" : "现金不足";
  }
  if (action === "boardVote") {
    if (!state.cityPublic?.[index]) return "未IPO";
    if (state.levels[index] >= MAX_LEVEL) return "已满级";
    if (state.mortgages[index]) return "已抵押";
    if (state.owners[index] !== player.id && stockShares(player, index) < 2) return "需持股 2 股";
    return player.cash >= boardVoteCost(index) ? "" : "现金不足";
  }
  return "";
}

function companySummary(index) {
  const built = COMPANY_TYPES
    .filter((type) => cityCompanies(index)[type])
    .map((type) => companyTypeDefinitions[type].label);
  return built.length ? built.join(" / ") : "未建设";
}

function createPropertyInsights(index) {
  const wrap = document.createElement("div");
  wrap.className = "property-insights";
  wrap.append(createStockSparkline(index), createCityPulse(index), createDealValuationCard(index));
  return wrap;
}

function createStockSparkline(index) {
  const space = spaces[index];
  const card = document.createElement("div");
  card.className = "property-mini-card stock-sparkline-card";
  const top = document.createElement("div");
  top.className = "mini-card-top";
  const label = document.createElement("span");
  label.textContent = "股票走势";
  const price = document.createElement("strong");
  price.textContent = formatMoney(stockPrice(index));
  top.append(label, price);

  const chart = document.createElement("div");
  chart.className = "stock-sparkline";
  stockTrendBars(index).forEach((height, barIndex) => {
    const bar = document.createElement("span");
    bar.style.setProperty("--bar-height", `${height}%`);
    bar.style.setProperty("--bar-delay", `${barIndex * 28}ms`);
    chart.appendChild(bar);
  });

  const detail = document.createElement("small");
  detail.textContent = `${cityRating(index)} 级城市 / 热度 ${Math.round((state.cityRevenue[index] || 0) + (state.levels[index] || 0) * 45)}`;
  card.append(top, chart, detail);
  return card;
}

function createCityPulse(index) {
  const card = document.createElement("div");
  card.className = "property-mini-card city-pulse-card";
  const top = document.createElement("div");
  top.className = "mini-card-top";
  const label = document.createElement("span");
  label.textContent = "城市状态";
  const value = document.createElement("strong");
  value.textContent = `${effectiveHappiness(index)} / ${effectivePollution(index)}`;
  top.append(label, value);

  const meters = document.createElement("div");
  meters.className = "city-pulse-bars";
  [
    ["幸福", effectiveHappiness(index), "happy"],
    ["污染", 100 - effectivePollution(index), "clean"],
  ].forEach(([name, amount, type]) => {
    const row = document.createElement("span");
    row.className = `city-pulse-row city-pulse-${type}`;
    row.style.setProperty("--pulse", `${clamp(amount, 0, 100)}%`);
    row.textContent = name;
    meters.appendChild(row);
  });

  const detail = document.createElement("small");
  detail.textContent = `环保 ${state.ecoLevels[index] || 0}/3 / ${nextUpgradeName(index)}`;
  card.append(top, meters, detail);
  return card;
}

function createDealValuationCard(index) {
  const card = document.createElement("div");
  card.className = "property-mini-card deal-valuation-card";
  const top = document.createElement("div");
  top.className = "mini-card-top";
  const label = document.createElement("span");
  label.textContent = "投行估值";
  const value = document.createElement("strong");
  value.textContent = formatMoney(cityValuation(index));
  top.append(label, value);
  const rows = document.createElement("div");
  rows.className = "deal-metric-grid";
  rows.append(
    createDealMetric("融资轮次", `${cityFundingRounds(index)}/${CAPITAL_ROUND_LIMIT}`),
    createDealMetric("并购报价", formatMoney(takeoverOfferPrice(index))),
    createDealMetric("股息预期", formatMoney(Math.round(Math.min(32, (state.cityRevenue[index] || 0) * 0.03 + stockPrice(index) * 0.02)))),
  );
  const detail = document.createElement("small");
  detail.textContent = `${currentMarket().title} / ${spaces[index].specialty ? citySpecialtyDefinitions[spaces[index].specialty].label : "城市资产"}`;
  card.append(top, rows, detail);
  return card;
}

function createDealMetric(label, value) {
  const metric = document.createElement("span");
  metric.className = "deal-metric";
  metric.innerHTML = `<small>${label}</small><strong>${value}</strong>`;
  return metric;
}

function stockTrendBars(index) {
  const price = stockPrice(index);
  const revenue = state.cityRevenue[index] || 0;
  const level = state.levels[index] || 0;
  return Array.from({ length: 8 }, (_, i) => {
    const wave = ((index + 3) * (i + 5) + Math.round(price / 5) + level * 11 + Math.round(revenue / 12)) % 52;
    return clamp(28 + wave + i * 2, 22, 92);
  });
}

function createCityArt(space, index) {
  const art = document.createElement("div");
  art.className = `property-art art-${space.specialty || "culture"}`;
  art.style.setProperty("--property-color", space.color || "#d89921");
  art.dataset.level = String(state.levels[index] || 0);

  const skyline = document.createElement("div");
  skyline.className = "property-skyline";
  for (let i = 0; i < 5; i += 1) {
    const tower = document.createElement("span");
    tower.style.setProperty("--tower-height", `${28 + ((index + i * 9) % 46) + (state.levels[index] || 0) * 5}px`);
    skyline.appendChild(tower);
  }

  const label = document.createElement("strong");
  label.textContent = currentLanguage() === "zh" ? space.landmark : spaceDisplayName(space);
  const city = document.createElement("span");
  city.textContent = countryDisplayName(space.country);
  const badges = document.createElement("div");
  badges.className = "property-art-badges";
  [cityRating(index), nextUpgradeName(index), rareBadgeLabel(space.rareBadge)].forEach((text) => {
    const badge = document.createElement("small");
    badge.textContent = text;
    badges.appendChild(badge);
  });
  art.append(skyline, label, city, badges);
  return art;
}

function createAttributeMeter(label, value) {
  const meter = document.createElement("span");
  meter.className = "attribute-meter";
  meter.style.setProperty("--attribute", `${clamp(value, 0, 100)}%`);
  const name = document.createElement("small");
  name.textContent = label;
  const score = document.createElement("strong");
  score.textContent = String(value);
  meter.append(name, score);
  return meter;
}

function estimatedRent(index) {
  const space = spaces[index];
  return Math.round((space.rent || 0) * cityRentMultiplier(index) * currentMarket().rent);
}

function continentSetDescription(index) {
  const space = spaces[index];
  const owner = playerById(state.owners[index]) || currentPlayer();
  const owned = owner ? groupOwnedCount(owner.id, space.group) : 0;
  const completed = owned >= CONTINENT_SET_SIZE;
  return `${groupLabel(space.group)}：${owned}/${CONTINENT_SET_SIZE}，${completed ? "租金奖励已激活" : "集齐 3 座激活租金奖励"}`;
}

function createPropertyStat(label, value) {
  const stat = document.createElement("span");
  stat.className = "property-stat";
  const small = document.createElement("small");
  small.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  stat.append(small, strong);
  return stat;
}

function propertyCardNumber(index) {
  return String(index + 1).padStart(3, "0");
}

function createStat(label, value, className = "") {
  const stat = document.createElement("span");
  stat.className = className;
  stat.textContent = `${label} ${value}`;
  return stat;
}

function createGameStat(label, value) {
  const stat = document.createElement("span");
  stat.className = "game-stat";
  const name = document.createElement("small");
  name.textContent = label;
  const number = document.createElement("strong");
  number.textContent = value;
  stat.append(name, number);
  return stat;
}

function playerTitle(player) {
  const worth = netWorth(player);
  const rentRecord = state.highestRent?.owner === player.name;
  const owned = ownedPropertyIndexes(player.id);
  const airports = owned.filter((index) => spaces[index].airport || spaces[index].specialty === "transit").length;
  const ports = owned.filter((index) => spaces[index].coastal).length;
  const stockValue = Object.entries(player.stocks || {}).reduce((total, [index, shares]) => total + stockPrice(Number(index)) * Number(shares || 0), 0);
  if (rentRecord && state.highestRent.amount >= 300) return "收租之王";
  if (cityCombinationDividend(player) >= 80) return "全球控股王";
  if (airports >= 3) return "航空大王";
  if (ports >= 3) return "港口贸易王";
  if (stockValue >= 900) return "股市巨头";
  if (continentSetCount(player.id) >= 2) return "洲际霸主";
  if (worth >= 5200) return "世界财团";
  if (owned.length >= 10) return "囤地大师";
  if ((player.upgradeCount || 0) >= 4) return "城市工程师";
  return "地产新星";
}

function hasBlackCard(player) {
  return Boolean(player && netWorth(player) >= 4200);
}

function mostProfitableCity() {
  const entries = (state.cityRevenue || [])
    .map((revenue, index) => ({ revenue, index }))
    .filter((entry) => entry.revenue > 0 && spaces[entry.index]?.type === "property")
    .sort((a, b) => b.revenue - a.revenue);
  return entries[0] || null;
}

function cityPowerScore(index) {
  const space = spaces[index];
  if (!space || space.type !== "property") return 0;
  return (space.prosperity || 0) * 0.22
    + effectiveHappiness(index) * 0.2
    + (space.tech || 0) * 0.18
    + (space.tourism || 0) * 0.16
    + (state.levels[index] || 0) * 11
    + cityCompanyCount(index) * 8
    + (state.cityPublic?.[index] ? 12 : 0)
    + (state.cityRevenue[index] || 0) * 0.08
    + stockPrice(index) * 0.09
    - effectivePollution(index) * 0.12;
}

function strongestCities() {
  return spaces
    .map((space, index) => {
      if (space.type !== "property") return null;
      return { index, score: cityPowerScore(index) };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
}

function createSmallAction(label, action, slot, disabled) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.slotAction = action;
  button.dataset.slot = String(slot);
  button.textContent = label;
  button.disabled = disabled;
  return button;
}

function createDefaultDrawerOpen() {
  return { ...DEFAULT_DRAWER_OPEN };
}

function normalizeDrawerOpen(drawers) {
  const normalized = createDefaultDrawerOpen();
  if (!drawers || typeof drawers !== "object") return normalized;
  Object.entries(drawers).forEach(([id, value]) => {
    if (typeof id === "string") normalized[id] = Boolean(value);
  });
  return normalized;
}

function drawerIsOpen(id, fallback = false) {
  const drawers = state?.drawerOpen && typeof state.drawerOpen === "object" ? state.drawerOpen : DEFAULT_DRAWER_OPEN;
  return Object.prototype.hasOwnProperty.call(drawers, id) ? Boolean(drawers[id]) : fallback;
}

function createUiDrawer(id, title, children = [], options = {}) {
  const details = document.createElement("details");
  details.className = options.className || "ui-drawer";
  if (options.variant) details.classList.add(`ui-drawer-${options.variant}`);
  details.dataset.drawerId = id;
  if (drawerIsOpen(id, Boolean(options.open))) details.open = true;

  const summary = document.createElement("summary");
  summary.className = options.summaryClass || "ui-drawer-summary";
  const label = document.createElement("span");
  label.className = "ui-drawer-label";
  if (options.icon) label.appendChild(createIcon(options.icon, "ui-drawer-icon"));
  const strong = document.createElement("strong");
  strong.textContent = title;
  label.appendChild(strong);
  summary.appendChild(label);
  if (options.meta) {
    const meta = document.createElement("small");
    meta.textContent = options.meta;
    summary.appendChild(meta);
  }

  const body = document.createElement("div");
  body.className = options.bodyClass || "ui-drawer-body";
  children.flat().filter(Boolean).forEach((child) => body.appendChild(child));
  details.append(summary, body);
  return details;
}

function appendPanelDrawer(panel, id, title, children, options = {}) {
  panel.appendChild(createUiDrawer(id, title, children, {
    className: "panel-drawer",
    open: true,
    ...options,
  }));
}

function handleDrawerToggle(event) {
  const drawer = event.target;
  if (!drawer || drawer.tagName !== "DETAILS" || !drawer.dataset.drawerId) return;
  const nextDrawerState = {
    ...(state.drawerOpen || {}),
    [drawer.dataset.drawerId]: drawer.open,
  };
  if (drawer.classList.contains("main-action-drawer") && drawer.open) {
    document.querySelectorAll(".main-action-drawer[data-drawer-id]").forEach((sibling) => {
      if (sibling !== drawer) {
        sibling.open = false;
        nextDrawerState[sibling.dataset.drawerId] = false;
      }
    });
  }
  state.drawerOpen = normalizeDrawerOpen({
    ...nextDrawerState,
  });
  saveGame();
}

function syncMainActionDrawers(nextAction) {
  const nextDrawer = {
    roll: "main:turn",
    end: "main:turn",
    buy: "main:deal",
    decline: "main:deal",
    upgrade: "main:tools",
  }[nextAction] || "";

  document.querySelectorAll(".main-action-drawer[data-drawer-id]").forEach((drawer) => {
    const fallback = drawer.dataset.drawerDefault === "open";
    drawer.open = nextDrawer
      ? drawer.dataset.drawerId === nextDrawer
      : drawerIsOpen(drawer.dataset.drawerId, fallback);
    drawer.classList.toggle("has-next-action", drawer.dataset.drawerId === nextDrawer);
  });
}

function createShareButton(label, action) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.shareAction = action;
  button.textContent = label;
  return button;
}

function createWinnerStat(label, value) {
  const stat = document.createElement("article");
  const small = document.createElement("span");
  small.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  stat.append(small, strong);
  return stat;
}

function rarityLabel(rarity = "common") {
  return {
    common: "普通",
    rare: "稀有",
    legendary: "传说",
  }[rarity] || "普通";
}

function richestOpponent(player) {
  const grudge = playerById(player.grudgeTarget);
  if (grudge && !grudge.bankrupt && grudge.id !== player.id) return grudge;
  return activePlayers()
    .filter((other) => other.id !== player.id)
    .sort((a, b) => netWorth(b) - netWorth(a))[0] || null;
}

function createIcon(name, className) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  className.split(/\s+/).filter(Boolean).forEach((item) => svg.classList.add(item));
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#icon-${name}`);
  svg.appendChild(use);
  return svg;
}

function emptyNote(text) {
  const note = document.createElement("p");
  note.className = "empty-note";
  note.textContent = text;
  return note;
}

function formatMoney(value) {
  return `¥${Math.max(0, Math.round(value))}`;
}

function initials(name) {
  const trimmed = cleanName(name);
  if (/^[\u4e00-\u9fa5]/.test(trimmed)) return trimmed.slice(0, 1);
  return trimmed
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function cleanName(name) {
  const trimmed = String(name || DEFAULT_PLAYER_NAME).trim();
  return trimmed || DEFAULT_PLAYER_NAME;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function logEvent(text) {
  state.log.unshift({ text, round: state.round });
  if (state.log.length > 80) state.log.length = 80;
}

function openSetupDialog() {
  renderStaticLabels();
  playerNameInput.value = state.config?.playerName || state.players[0]?.name || DEFAULT_PLAYER_NAME;
  setupLanguageInput.value = currentLanguage();
  playerColorInput.value = state.config?.playerColor || state.players[0]?.color || playerTemplates[0].color;
  playerCountInput.value = String(state.config?.playerCount || state.players.length || 4);
  difficultyInput.value = state.config?.difficulty || "normal";
  updateDifficultyHint();
  characterInput.value = state.config?.character || state.players[0]?.character || "banker";
  themeInput.value = state.config?.theme || "city";
  rulesPresetInput.value = state.config?.rulesPreset || "classic";
  startCashInput.value = String(state.config?.startCash || START_CASH);
  if (typeof setupDialog.showModal === "function") {
    setupDialog.showModal();
  }
}

function closeWinnerDialog() {
  state.winnerDialogDismissed = true;
  winnerDialog.close();
  saveGame();
}

function startConfiguredGame() {
  state = createInitialGame({
    playerName: playerNameInput.value,
    language: setupLanguageInput.value,
    playerColor: playerColorInput.value,
    playerCount: playerCountInput.value,
    difficulty: difficultyInput.value,
    character: characterInput.value,
    theme: themeInput.value,
    rulesPreset: rulesPresetInput.value,
    startCash: startCashInput.value,
  });
  setupDialog.close();
  render();
}
