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

function initWebsiteGalleryLightbox() {
  const images = document.querySelectorAll(
    ".website-gallery-item img, .gallery-item img",
  );
  if (!images.length) return;

  let lightbox = document.querySelector(".image-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
      <button class="image-lightbox-close" aria-label="Close image preview">&times;</button>
      <img src="" alt="Website preview">
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".image-lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const openLightbox = (src, alt) => {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "Website preview";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  images.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
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

  initWebsiteGalleryLightbox();
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

    // Showcase pages
    "sc-key-features": "Key Features",
    "sc-visit-website": "VISIT WEBSITE",

    "sc-aurum-title": "Aurum Etna Chalet Gallery",
    "sc-aurum-p1":
      "A premium hospitality website designed to present Aurum Etna Chalet with an elegant visual identity and clear booking flow.",
    "sc-aurum-p2":
      "The project highlights rooms, services, and unique experiences on Mount Etna while keeping navigation simple and conversion-focused.",
    "sc-aurum-f1":
      "<strong>Online Booking:</strong> Streamlined booking process to improve direct reservations.",
    "sc-aurum-f2":
      "<strong>Multilingual Experience:</strong> Built-in translation for international guests.",
    "sc-aurum-f3":
      "<strong>Admin Personalization:</strong> Flexible content and section management from the admin side.",

    "sc-clubify-title": "Clubify Gallery",
    "sc-clubify-p1":
      "Clubify is a dynamic digital experience where movement meets music, designed for audiences who want fast access to events, updates, and community content.",
    "sc-clubify-p2":
      "The showcase focuses on bold visuals, smooth interactions, and a mobile-first structure for everyday use.",
    "sc-clubify-f1":
      "<strong>Event Discovery:</strong> Quick access to upcoming nights and featured experiences.",
    "sc-clubify-f2":
      "<strong>Visual Identity:</strong> Strong brand presentation with immersive media sections.",
    "sc-clubify-f3":
      "<strong>Responsive Layout:</strong> Optimized navigation and content readability on all devices.",

    "sc-qi-title": "Qi App Gallery",
    "sc-qi-p1":
      "Discover your restaurant in a whole new way with 3D menus, exclusive offers, loyalty points, special rewards, and up-to-date events.",
    "sc-qi-p2":
      "Qi - Food & Focus brings your restaurant experience right to your smartphone, combining menu browsing, immersive 3D previews, and loyalty engagement in one streamlined mobile app.",
    "sc-qi-f1":
      "<strong>Interactive Menu:</strong> Browse dishes with ingredients, descriptions, and useful details.",
    "sc-qi-f2":
      "<strong>3D Dish View:</strong> Rotate and inspect dishes before ordering.",
    "sc-qi-f3":
      "<strong>Exclusive Offers:</strong> Access app-only promotions and redeem discounts quickly.",
    "sc-qi-f4":
      "<strong>Loyalty Points:</strong> Earn points on purchases and convert them into rewards.",
    "sc-qi-f5":
      "<strong>Events and News:</strong> Stay updated on themed nights and announcements.",
    "sc-qi-f6":
      "<strong>Live Information:</strong> Check opening hours, kitchen status, and location in real time.",

    "sc-voice-title": "Voice Synthesis",
    "sc-voice-p1":
      "Research project focused on replicating the human voice using machine learning techniques and modern Text-to-Speech workflows.",
    "sc-voice-p2":
      "This showcase presents the full study material, methodology, and practical outcomes in a structured document format.",
    "sc-voice-f1":
      "<strong>Technical Framework:</strong> Overview of model training and synthesis pipeline.",
    "sc-voice-f2":
      "<strong>Academic Context:</strong> Built within a university research environment.",
    "sc-voice-f3":
      "<strong>Complete Documentation:</strong> Embedded PDF with direct access to all project sections.",

    "sc-dnh-title": "The Dnh Group Website Gallery",
    "sc-dnh-p1":
      "Discover The Dnh Group's services in a whole new way, including painting, cleaning and maintenance, electrical services, and roofing solutions for residential and commercial clients.",
    "sc-dnh-p2":
      "The Dnh Group website showcases the company's offerings and allows clients to quickly access service details, special promotions, and the latest updates.",
    "sc-dnh-f1":
      "<strong>Service Overview:</strong> Explore each service with clear descriptions and examples of past work.",
    "sc-dnh-f2":
      "<strong>Client Testimonials:</strong> Read feedback from satisfied clients to evaluate reliability and quality.",
    "sc-dnh-f3":
      "<strong>Special Promotions:</strong> Stay updated on current offers and exclusive promotions.",
    "sc-dnh-f4":
      "<strong>Project Gallery:</strong> Browse completed projects to see the company's work in action.",
    "sc-dnh-f5":
      "<strong>News and Updates:</strong> Keep up with announcements and the latest company news.",
    "sc-dnh-f6":
      "<strong>Contact Information:</strong> Reach out easily for inquiries, quotes, and service requests.",

    // Project descriptions
    "proj-desc-16":
      "Corporate website for The Dnh Grooup, showcasing painting, cleaning and maintenance, electrical services, and roofing solutions for residential and commercial clients.",
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

    // Showcase pages
    "sc-key-features": "Funzionalita principali",
    "sc-visit-website": "VISITA IL SITO",

    "sc-aurum-title": "Galleria Aurum Etna Chalet",
    "sc-aurum-p1":
      "Un sito web premium per l'ospitalita, progettato per presentare Aurum Etna Chalet con un'identita visiva elegante e un flusso di prenotazione chiaro.",
    "sc-aurum-p2":
      "Il progetto valorizza camere, servizi ed esperienze uniche sull'Etna mantenendo la navigazione semplice e orientata alla conversione.",
    "sc-aurum-f1":
      "<strong>Prenotazione Online:</strong> Flusso di booking semplificato per aumentare le prenotazioni dirette.",
    "sc-aurum-f2":
      "<strong>Esperienza Multilingua:</strong> Traduzione integrata per ospiti internazionali.",
    "sc-aurum-f3":
      "<strong>Personalizzazione Admin:</strong> Gestione flessibile di contenuti e sezioni lato amministrazione.",

    "sc-clubify-title": "Galleria Clubify",
    "sc-clubify-p1":
      "Clubify e un'esperienza digitale dinamica dove movimento e musica si incontrano, pensata per chi vuole accesso rapido a eventi, aggiornamenti e contenuti della community.",
    "sc-clubify-p2":
      "La showcase punta su visual d'impatto, interazioni fluide e una struttura mobile-first per l'uso quotidiano.",
    "sc-clubify-f1":
      "<strong>Scoperta Eventi:</strong> Accesso rapido alle prossime serate e alle esperienze in evidenza.",
    "sc-clubify-f2":
      "<strong>Identita Visiva:</strong> Presentazione forte del brand con sezioni media immersive.",
    "sc-clubify-f3":
      "<strong>Layout Responsive:</strong> Navigazione e leggibilita ottimizzate su tutti i dispositivi.",

    "sc-qi-title": "Galleria Qi App",
    "sc-qi-p1":
      "Scopri il tuo ristorante in un modo tutto nuovo con menu 3D, offerte esclusive, punti fedelta, premi speciali ed eventi sempre aggiornati.",
    "sc-qi-p2":
      "Qi - Food & Focus porta l'esperienza del ristorante sul tuo smartphone, unendo consultazione menu, anteprime 3D immersive e coinvolgimento loyalty in un'unica app.",
    "sc-qi-f1":
      "<strong>Menu Interattivo:</strong> Esplora i piatti con ingredienti, descrizioni e dettagli utili.",
    "sc-qi-f2":
      "<strong>Vista Piatti in 3D:</strong> Ruota e ispeziona i piatti prima di ordinare.",
    "sc-qi-f3":
      "<strong>Offerte Esclusive:</strong> Accedi a promozioni dedicate e riscatta sconti rapidamente.",
    "sc-qi-f4":
      "<strong>Punti Fedelta:</strong> Accumula punti sugli acquisti e convertili in premi.",
    "sc-qi-f5":
      "<strong>Eventi e News:</strong> Rimani aggiornato su serate tematiche e novita.",
    "sc-qi-f6":
      "<strong>Informazioni Live:</strong> Consulta orari, stato cucina e posizione in tempo reale.",

    "sc-voice-title": "Sintesi Vocale",
    "sc-voice-p1":
      "Progetto di ricerca focalizzato sulla replica della voce umana tramite tecniche di machine learning e workflow moderni di Text-to-Speech.",
    "sc-voice-p2":
      "Questa showcase presenta materiale di studio completo, metodologia e risultati pratici in un formato documentale strutturato.",
    "sc-voice-f1":
      "<strong>Framework Tecnico:</strong> Panoramica della pipeline di training e sintesi.",
    "sc-voice-f2":
      "<strong>Contesto Accademico:</strong> Sviluppato in ambiente di ricerca universitaria.",
    "sc-voice-f3":
      "<strong>Documentazione Completa:</strong> PDF integrato con accesso diretto a tutte le sezioni del progetto.",

    "sc-dnh-title": "Galleria Sito The Dnh Group",
    "sc-dnh-p1":
      "Scopri i servizi di The Dnh Group in un modo completamente nuovo: pittura, pulizia e manutenzione, servizi elettrici e roofing per clienti residenziali e commerciali.",
    "sc-dnh-p2":
      "Il sito di The Dnh Group presenta l'offerta aziendale e permette ai clienti di accedere rapidamente ai dettagli dei servizi, promozioni speciali e aggiornamenti recenti.",
    "sc-dnh-f1":
      "<strong>Panoramica Servizi:</strong> Esplora ogni servizio con descrizioni chiare ed esempi di lavori svolti.",
    "sc-dnh-f2":
      "<strong>Testimonianze Clienti:</strong> Leggi i feedback per valutare qualita e affidabilita.",
    "sc-dnh-f3":
      "<strong>Promozioni Speciali:</strong> Rimani aggiornato su offerte attive e promo esclusive.",
    "sc-dnh-f4":
      "<strong>Galleria Progetti:</strong> Sfoglia i lavori completati per vedere l'azienda in azione.",
    "sc-dnh-f5":
      "<strong>News e Aggiornamenti:</strong> Segui annunci e ultime novita aziendali.",
    "sc-dnh-f6":
      "<strong>Contatti:</strong> Richiedi facilmente informazioni, preventivi e interventi.",

    // Project descriptions
    "proj-desc-16":
      "Sito corporate per The Dnh Grooup, che presenta servizi di pittura, pulizia e manutenzione, impianti elettrici e roofing per clienti residenziali e commerciali.",
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

  // Apply key-based translations directly from markup across all pages.
  document.querySelectorAll("[data-i18n-key]").forEach((el) => {
    const key = el.getAttribute("data-i18n-key");
    const value = key ? t[key] : undefined;
    if (value === undefined) return;

    const type = el.getAttribute("data-i18n-type") || "text";
    if (type === "html") el.innerHTML = value;
    else if (type === "placeholder") el.placeholder = value;
    else el.textContent = value;
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
