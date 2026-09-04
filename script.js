// Funzione per navigare alle sezioni del sito con smooth scroll
function scrollTo(sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    console.warn(`Sezione con ID "${sectionId}" non trovata`);
  }
}

// Funzione per aprire il link associato a un bottone
// Usa l'attributo data-link del bottone. Supporta target tramite data-target.
function openLink(buttonOrUrl, options = {}) {
  const defaults = { target: "_blank" };
  const { target } = { ...defaults, ...options };

  let url = null;
  if (typeof buttonOrUrl === "string") {
    url = buttonOrUrl;
  } else if (buttonOrUrl && typeof buttonOrUrl.getAttribute === "function") {
    url =
      buttonOrUrl.getAttribute("data-link") || buttonOrUrl.getAttribute("href");
  }

  if (!url) {
    console.warn("Nessun URL trovato per il bottone/link");
    return;
  }

  try {
    const newWindow = window.open(url, target);
    // Migliora la sicurezza quando si apre in una nuova scheda
    if (newWindow && target === "_blank") {
      newWindow.opener = null;
    }
  } catch (err) {
    console.error("Errore nell'apertura del link:", err);
    // Fallback: prova ad aprire nella stessa scheda
    window.location.href = url;
  }
}

// Event listener per i bottoni di navigazione
document.addEventListener("DOMContentLoaded", () => {
  // Aggiungi automaticamente il click handler a tutti i bottoni con data-scroll-to
  const navButtons = document.querySelectorAll("[data-scroll-to]");

  navButtons.forEach((button) => {
    // Evita conflitti: se il bottone ha anche data-link, lascia priorità al link
    if (!button.hasAttribute("data-link")) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = button.getAttribute("data-scroll-to");
        scrollTo(targetId);
      });
    }
  });

  // Aggiungi automaticamente il click handler ai bottoni con data-link
  const linkButtons = document.querySelectorAll("[data-link]");
  linkButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = button.getAttribute("data-target") || "_blank";
      openLink(button, { target });
    });
  });
});

// ─────────────────────────────────────────────
//  i18n – Language switcher (EN / IT)
// ─────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    // Navbar
    "nav-home": "Home",
    "nav-projects": "Projects",
    "nav-contact": "Contact Us",

    // Hero
    "hero-text": "<span>crafting</span> code,<br>creating impact.",
    "hero-subtext":
      "Blending aesthetics and technology to craft web solutions that meet your needs.",
    "btn-view-work": "VIEW WORK",
    "btn-contact-us": "CONTACT US",

    // Projects section
    "section-projects-header": "Our projects",
    "section-projects-subtext":
      "Discover our latest work across different industries.",
    "btn-view-project": "VIEW PROJECT",

    // Project descriptions
    "proj-desc-15":
      "Qi App brings the experience of your restaurant right to your smartphone.",
    "proj-desc-1":
      "Voice Synthesis: Replicating the Human Voice with Machine Learning, explores the technical process of training custom voice models. Developed by Andrea Lo Giudice at the University of Catania, it focuses on Text-to-Speech (TTS) technology to convert written text into realistic spoken audio.",
    "proj-desc-2": "Clubify, when the movement meets the beat.",
    "proj-desc-3": "Grindset, Motivational Quotes App. (NOTE: App Store link)",
    "proj-desc-4":
      "Ticketing system for the principal cable car of Mount Etna.",
    "proj-desc-5":
      "The site is the official portal of the event of the same name (based in Catania) dedicated to promoting financial education, innovation, and economic inclusion.",
    "proj-desc-6":
      "TGE Solutions is a company focused on delivering innovative solar, electric and roofing solutions.",
    "proj-desc-7": "The official online store for TGE Solutions.",
    "proj-desc-8":
      "API Application to connect Salesforce with other platforms.",
    "proj-desc-9": "Clubify landing page.",
    "proj-desc-10": "Solenxia Studios Official Website",
    "proj-desc-11": "Landing page for Solenxia Studios website.",
    "proj-desc-12": "Aurum B&B Website",
    "proj-desc-13": "Casa Vacanze Samira Website",
    "proj-desc-14": "Creotec Official Website",

    // Contact section
    "section-contact-header": "GET IN TOUCH",
    "contact-subtext": "Get a response within 24 hours",
    "contact-name-ph": "Your Name",
    "contact-email-ph": "Your Email",
    "contact-message-ph": "Your Message",
    "btn-send": "SEND MESSAGE",
    "contact-info-header": "Contact Information",
  },

  it: {
    // Navbar
    "nav-home": "Home",
    "nav-projects": "Progetti",
    "nav-contact": "Contattaci",

    // Hero
    "hero-text": "<span>creiamo</span> codice,<br>creiamo impatto.",
    "hero-subtext":
      "Uniamo estetica e tecnologia per creare soluzioni web su misura per te.",
    "btn-view-work": "VEDI I LAVORI",
    "btn-contact-us": "CONTATTACI",

    // Projects section
    "section-projects-header": "I nostri progetti",
    "section-projects-subtext":
      "Scopri i nostri lavori più recenti in diversi settori.",
    "btn-view-project": "VEDI PROGETTO",

    // Project descriptions
    "proj-desc-15":
      "Qi App porta l'esperienza del tuo ristorante direttamente sul tuo smartphone.",
    "proj-desc-1":
      "Voice Synthesis: Replicare la voce umana con il Machine Learning. Esplora il processo tecnico di addestramento di modelli vocali personalizzati. Sviluppato da Andrea Lo Giudice all'Università di Catania, con focus sulla tecnologia Text-to-Speech (TTS).",
    "proj-desc-2": "Clubify, quando il movimento incontra il ritmo.",
    "proj-desc-3":
      "Grindset, app di citazioni motivazionali. (NOTA: link App Store)",
    "proj-desc-4":
      "Sistema di biglietteria per la principale funivia dell'Etna.",
    "proj-desc-5":
      "Il sito è il portale ufficiale dell'evento omonimo (con sede a Catania) dedicato alla promozione dell'educazione finanziaria, dell'innovazione e dell'inclusione economica.",
    "proj-desc-6":
      "TGE Solutions è un'azienda specializzata in soluzioni innovative nel settore solare, elettrico e delle coperture.",
    "proj-desc-7": "Il negozio online ufficiale di TGE Solutions.",
    "proj-desc-8":
      "Applicazione API per connettere Salesforce con altre piattaforme.",
    "proj-desc-9": "Landing page di Clubify.",
    "proj-desc-10": "Sito ufficiale di Solenxia Studios",
    "proj-desc-11": "Landing page per il sito di Solenxia Studios.",
    "proj-desc-12": "Sito web dell'Aurum B&B",
    "proj-desc-13": "Sito web Casa Vacanze Samira",
    "proj-desc-14": "Sito ufficiale Creotec",

    // Contact section
    "section-contact-header": "CONTATTACI",
    "contact-subtext": "Risposta entro 24 ore",
    "contact-name-ph": "Il tuo nome",
    "contact-email-ph": "La tua email",
    "contact-message-ph": "Il tuo messaggio",
    "btn-send": "INVIA MESSAGGIO",
    "contact-info-header": "Informazioni di Contatto",
  },
};

// Map of translation keys → DOM selectors / types
const I18N_MAP = [
  // Navbar links
  { key: "nav-home", selector: ".nav-links li:nth-child(1) a", type: "text" },
  {
    key: "nav-projects",
    selector: ".nav-links li:nth-child(2) a",
    type: "text",
  },
  {
    key: "nav-contact",
    selector: ".nav-links li:nth-child(3) a",
    type: "text",
  },

  // Hero
  { key: "hero-text", selector: "header .front-text", type: "html" },
  { key: "hero-subtext", selector: "header .front-subtext", type: "text" },
  {
    key: "btn-view-work",
    selector: "header .front-buttons .btn-primary",
    type: "text",
  },
  {
    key: "btn-contact-us",
    selector: "header .front-buttons .btn-secondary",
    type: "text",
  },

  // Projects section header
  {
    key: "section-projects-header",
    selector: "#projects .section-header",
    type: "text",
  },
  {
    key: "section-projects-subtext",
    selector: "#projects .section-subtext",
    type: "text",
  },

  // "View Project" buttons – all project cards at once
  {
    key: "btn-view-project",
    selector: "#projects .project-card .btn-primary",
    type: "text-all",
  },

  // Contact section
  {
    key: "section-contact-header",
    selector: "#contact .section-header",
    type: "text",
  },
  {
    key: "contact-subtext",
    selector: "#contact .section-subtext",
    type: "text",
  },
  {
    key: "contact-name-ph",
    selector: "#contact input[name='name']",
    type: "placeholder",
  },
  {
    key: "contact-email-ph",
    selector: "#contact input[name='email']",
    type: "placeholder",
  },
  {
    key: "contact-message-ph",
    selector: "#contact textarea[name='message']",
    type: "placeholder",
  },
  { key: "btn-send", selector: "#contact button[type='submit']", type: "text" },
  {
    key: "contact-info-header",
    selector: "#contact .contact-info-header",
    type: "text",
  },
];

/**
 * Apply a language to all mapped elements.
 * @param {string} lang – 'en' or 'it'
 */
function applyLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Update toggle button active state
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Update <html lang>
  document.documentElement.lang = lang;

  // Apply each mapping
  I18N_MAP.forEach(({ key, selector, type }) => {
    const value = t[key];
    if (value === undefined) return;

    if (type === "text-all") {
      document
        .querySelectorAll(selector)
        .forEach((el) => (el.textContent = value));
    } else {
      const el = document.querySelector(selector);
      if (!el) return;
      if (type === "text") el.textContent = value;
      else if (type === "html") el.innerHTML = value;
      else if (type === "placeholder") el.placeholder = value;
    }
  });

  // Project descriptions are keyed per-card, so order can change safely.
  document
    .querySelectorAll("#projects .project-description[data-i18n-key]")
    .forEach((el) => {
      const key = el.getAttribute("data-i18n-key");
      if (!key || t[key] === undefined) return;
      el.textContent = t[key];
    });

  // Persist preference
  localStorage.setItem("lang", lang);
}

/**
 * Detect the preferred language:
 * 1. localStorage (user's explicit choice)
 * 2. Geo-IP via ipapi.co (Italy → 'it', otherwise 'en')
 * 3. Fallback: 'en'
 */
async function detectLang() {
  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "it") return stored;

  // Respect browser language hint if already explicit
  const browserLang = (navigator.language || "").toLowerCase();
  if (browserLang.startsWith("it")) return "it";

  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3000),
    });
    const data = await res.json();
    return data.country_code === "IT" ? "it" : "en";
  } catch {
    return "en";
  }
}

// Boot i18n after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Attach lang toggle click handlers
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  // Auto-detect and apply language
  detectLang().then(applyLang);
});
