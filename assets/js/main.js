/*
 * Innovatech - Script Principal
 * Versão: 1.0
 * Autor: Claude
 * Descrição: Scripts para funcionalidade e animações do site
 */

// Esperar que o documento esteja carregado
document.addEventListener("DOMContentLoaded", () => {
  // Inicialização
  initThemeToggle();
  initNavigation();
  initCounters();
  initDepoimentosSlider();
  initContactForm();
  initScrollToTop();
  initGSAPAnimations();
});

// ======== TEMA ESCURO ========
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Verificar preferência salva ou do sistema
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  // Toggle do tema
  themeToggle.addEventListener("click", () => {
    let theme = "light";

    if (document.documentElement.getAttribute("data-theme") !== "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      theme = "dark";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    localStorage.setItem("theme", theme);

    // Atualizar cores do GSAP
    updateGSAPColors();
  });

  // Atualizar quando a preferência do sistema mudar
  prefersDarkScheme.addEventListener("change", (e) => {
    const theme = e.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateGSAPColors();
  });
}

// Atualizar cores das animações GSAP quando o tema mudar
function updateGSAPColors() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  // Atualizar timeline do hero se existir
  if (window.heroTl) {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      gsap.to(heroContent, {
        color: isDark ? "#ffffff" : "#212529",
        duration: 0.3,
      });
    }
  }

  // Atualizar outras animações se necessário
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
}

// ======== NAVEGAÇÃO ========
function initNavigation() {
  const header = document.getElementById("header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Menu mobile toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }

  // Fechar menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Mudar estilo do header ao scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Ativar link de navegação com base na seção visível
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// ======== CONTADORES ========
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // Velocidade da animação (menor = mais rápido)

  // Função para animar contador
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = Math.ceil(target / speed);

    const updateCount = () => {
      count += increment;

      if (count < target) {
        counter.innerText = count;
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  }

  // Iniciar animação quando o elemento estiver visível
  if (counters.length > 0) {
    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }
}

// ======== SLIDER DE DEPOIMENTOS ========
function initDepoimentosSlider() {
  const slider = document.querySelector(".depoimentos-slider");
  const items = document.querySelectorAll(".depoimento-item");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".nav-prev");
  const nextBtn = document.querySelector(".nav-next");

  if (!slider || items.length === 0) return;

  let currentIndex = 0;
  const totalItems = items.length;

  // Configuração inicial
  items.forEach((item, index) => {
    if (index !== 0) {
      item.style.display = "none";
    }
  });

  // Função para mostrar o slide atual
  function showSlide(index) {
    // Esconder todos os slides
    items.forEach((item) => {
      item.style.display = "none";
    });

    // Remover classe ativa de todos os dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Mostrar o slide atual e ativar o dot correspondente
    items[index].style.display = "block";
    dots[index].classList.add("active");

    // Animar o slide com GSAP
    gsap.fromTo(
      items[index],
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  }

  // Botão próximo
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalItems;
      showSlide(currentIndex);
    });
  }

  // Botão anterior
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      showSlide(currentIndex);
    });
  }

  // Navegação por dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Auto play (opcional - remova se não quiser)
  const autoPlayInterval = 5000; // 5 segundos
  let sliderInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  }, autoPlayInterval);

  // Pausar autoplay ao passar o mouse
  slider.addEventListener("mouseenter", () => {
    clearInterval(sliderInterval);
  });

  // Retomar autoplay ao tirar o mouse
  slider.addEventListener("mouseleave", () => {
    sliderInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      showSlide(currentIndex);
    }, autoPlayInterval);
  });
}

// ======== FORMULÁRIO DE CONTATO ========
function initContactForm() {
  const form = document.getElementById("formulario-contato");
  const formMessage = document.getElementById("form-mensagem");

  if (!form) return;

  // Sanitização de inputs
  function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  // Validação de segurança para o formulário
  function validateForm(formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    const phoneRegex = /^[\d\s()-]{10,15}$/;

    const errors = [];

    if (!nameRegex.test(formData.nome)) {
      errors.push("Nome inválido");
    }

    if (!emailRegex.test(formData.email)) {
      errors.push("Email inválido");
    }

    if (formData.telefone && !phoneRegex.test(formData.telefone)) {
      errors.push("Telefone inválido");
    }

    if (formData.mensagem.length < 10 || formData.mensagem.length > 1000) {
      errors.push("Mensagem deve ter entre 10 e 1000 caracteres");
    }

    return errors;
  }

  // Proteção contra XSS nos campos do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      nome: sanitizeInput(this.querySelector("#nome").value.trim()),
      email: sanitizeInput(this.querySelector("#email").value.trim()),
      telefone: sanitizeInput(this.querySelector("#telefone").value.trim()),
      assunto: sanitizeInput(this.querySelector("#assunto").value.trim()),
      mensagem: sanitizeInput(this.querySelector("#mensagem").value.trim()),
    };

    const errors = validateForm(formData);

    if (errors.length > 0) {
      showFormMessage(errors.join(". "), "error");
      return;
    }

    // Adicionar CSRF token (em produção)
    // formData.csrf_token = document.querySelector('meta[name="csrf-token"]').content;

    // Simulação de envio seguro
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    setTimeout(() => {
      showFormMessage("Mensagem enviada com sucesso!", "success");
      this.reset();
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }, 1500);
  });

  // Validação de email
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  // Exibir mensagem de formulário
  function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = "form-mensagem";
    formMessage.classList.add(type);

    // Animar com GSAP
    gsap.fromTo(
      formMessage,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3 }
    );

    // Ocultar após 5 segundos
    setTimeout(() => {
      gsap.to(formMessage, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          formMessage.textContent = "";
          formMessage.className = "form-mensagem";
        },
      });
    }, 5000);
  }
}

// ======== BOTÃO VOLTAR AO TOPO ========
function initScrollToTop() {
  const btnScrollToTop = document.querySelector(".back-to-top");

  if (!btnScrollToTop) return;

  // Mostrar/ocultar botão baseado na posição de scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btnScrollToTop.classList.add("show");
    } else {
      btnScrollToTop.classList.remove("show");
    }
  });

  // Ação de scroll suave
  btnScrollToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ======== ANIMAÇÕES COM GSAP ========
function initGSAPAnimations() {
  // Verificar se GSAP está disponível
  if (typeof gsap === "undefined") {
    console.warn("GSAP não está disponível. Animações não serão carregadas.");
    return;
  }

  // Registrar o plugin ScrollTrigger (se estiver disponível)
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ---- ANIMAÇÕES NA SEÇÃO HERO ----
  // Hero animation
  const heroTl = gsap.timeline();

  heroTl
    .from(".hero-content h1", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".hero-content p",
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      ".hero-cta .btn",
      {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.2"
    )
    .from(
      ".hero-image img",
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );

  // Logo dos clientes com delay
  gsap.from(".clients-logos .client-logo", {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.5,
    delay: 1,
    ease: "power2.out",
  });

  // ---- ANIMAÇÕES BASEADAS EM SCROLL ----
  if (typeof ScrollTrigger !== "undefined") {
    // Animação de seções ao entrar na viewport
    gsap.utils.toArray(".section-header").forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // Animação da seção Sobre
    const sobreElements = document.querySelector(".sobre-content");
    if (sobreElements) {
      const sobreTl = gsap.timeline({
        scrollTrigger: {
          trigger: sobreElements,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      sobreTl
        .from(".sobre-image", {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".sobre-text h3, .sobre-text p",
          {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }

    // Animação dos cards de serviço
    gsap.from(".servico-card", {
      scrollTrigger: {
        trigger: ".servicos-grid",
        start: "top 70%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.6,
      ease: "power3.out",
    });

    // Animação dos passos de processo
    gsap.from(".processo-step", {
      scrollTrigger: {
        trigger: ".processo-steps",
        start: "top 70%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 0.6,
      ease: "power3.out",
    });

    // Animação da seção CTA
    gsap.from(".cta-content", {
      scrollTrigger: {
        trigger: ".cta",
        start: "top 70%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animação da seção de contato
    const contatoElements = document.querySelector(".contato-container");
    if (contatoElements) {
      const contatoTl = gsap.timeline({
        scrollTrigger: {
          trigger: contatoElements,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      contatoTl
        .from(".contato-info", {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".contato-form",
          {
            opacity: 0,
            x: 50,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }
  } else {
    console.warn(
      "ScrollTrigger não está disponível. Animações de scroll não serão carregadas."
    );
  }

  // Animação das imagens com efeito de flutuação contínua
  gsap.to(".hero-image img", {
    y: 20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
}

// Debounce function para otimizar event listeners
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Intersection Observer factory
function createObserver(callback, options = {}) {
  return new IntersectionObserver(callback, {
    threshold: options.threshold || 0,
    rootMargin: options.rootMargin || "0px",
    root: options.root || null,
  });
}

// Event delegation para clicks
document.addEventListener("click", (e) => {
  // Delegação para links do menu
  if (e.target.matches(".nav-link")) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Delegação para botões de slider
  if (e.target.matches(".nav-prev, .nav-next")) {
    const isNext = e.target.matches(".nav-next");
    handleSliderNavigation(isNext);
  }
});

// Cache de elementos DOM frequentemente acessados
const DOM = {
  header: document.getElementById("header"),
  navMenu: document.querySelector(".nav-menu"),
  navToggle: document.querySelector(".nav-toggle"),
  themeToggle: document.querySelector(".theme-toggle"),
  sections: document.querySelectorAll("section[id]"),
  form: document.getElementById("formulario-contato"),
};

// Otimizar scroll listener
const handleScroll = debounce(() => {
  const scrollPos = window.scrollY;

  // Header scroll class
  DOM.header.classList.toggle("scrolled", scrollPos > 100);

  // Back to top button
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.classList.toggle("show", scrollPos > 500);
  }

  // Active nav link
  DOM.sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      document
        .querySelector(`.nav-link[href="#${sectionId}"]`)
        ?.classList.add("active");
    } else {
      document
        .querySelector(`.nav-link[href="#${sectionId}"]`)
        ?.classList.remove("active");
    }
  });
}, 100);

window.addEventListener("scroll", handleScroll);

// Otimizar animações GSAP
function initAnimations() {
  if (typeof gsap === "undefined") return;

  // Batch animations for better performance
  gsap.set("[data-animate]", { opacity: 0, y: 30 });

  const animateElements = document.querySelectorAll("[data-animate]");
  const observer = createObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animateElements.forEach((el) => observer.observe(el));
}
