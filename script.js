// Funzione per navigare alle sezioni del sito con smooth scroll
function scrollTo(sectionId) {
  const targetSection = document.getElementById(sectionId);
  
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    console.warn(`Sezione con ID "${sectionId}" non trovata`);
  }
}

// Event listener per i bottoni di navigazione
document.addEventListener('DOMContentLoaded', () => {
  // Aggiungi automaticamente il click handler a tutti i bottoni con data-scroll-to
  const navButtons = document.querySelectorAll('[data-scroll-to]');
  
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-scroll-to');
      scrollTo(targetId);
    });
  });
});
