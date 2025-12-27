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
