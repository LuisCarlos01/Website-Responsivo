const CONFIG = {
  // Animações
  ANIMATION: {
    DURATION: 0.8,
    EASE: "power3.out",
    STAGGER: 0.2,
  },

  // Tempos
  TIMING: {
    SCROLL_DEBOUNCE: 100,
    FORM_RESPONSE: 1500,
    SLIDER_AUTOPLAY: 5000,
  },

  // Breakpoints
  BREAKPOINTS: {
    MOBILE: 767,
    TABLET: 991,
    DESKTOP: 1200,
  },

  // Classes
  CLASSES: {
    ACTIVE: "active",
    SHOW: "show",
    LOADING: "loading",
    SCROLLED: "scrolled",
  },

  // Validação
  VALIDATION: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    NAME: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
    PHONE: /^[\d\s()-]{10,15}$/,
    MESSAGE_MIN: 10,
    MESSAGE_MAX: 1000,
  },

  // API (para produção)
  API: {
    BASE_URL: "https://api.innovatech.com.br",
    ENDPOINTS: {
      CONTACT: "/contact",
      NEWSLETTER: "/newsletter",
    },
  },
};

// Exportar para uso em outros arquivos
export default CONFIG;
