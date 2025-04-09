# Website Responsivo - Innovatech v2.0

Um website moderno e responsivo para uma empresa de soluções tecnológicas, construído com HTML, CSS e JavaScript puros (vanilla).

## 🚀 Novas Funcionalidades e Melhorias

### Performance

- Lazy loading para imagens
- Debounce em event listeners
- Otimização de animações GSAP
- Cache de seletores DOM
- Event delegation para melhor performance
- Batch animations para reduzir reflows

### Acessibilidade

- WAI-ARIA roles e labels
- Navegação por teclado melhorada
- Melhor contraste no tema escuro
- Estados de foco visíveis
- Mensagens de erro mais descritivas
- Alt text em todas as imagens

### SEO

- Schema.org markup
- Meta tags otimizadas
- Breadcrumbs estruturados
- Canonical URLs
- Open Graph tags
- Twitter Cards

### UX/UI

- Feedback visual aprimorado
- Estados de loading
- Tooltips informativos
- Melhor contraste no tema escuro
- Animações otimizadas
- Validação de formulário em tempo real

### Segurança

- Sanitização de inputs
- Validação robusta de formulários
- Proteção contra XSS
- Preparado para CSRF tokens
- Headers de segurança

### Organização

- Arquivo de configuração centralizado
- Constantes e variáveis organizadas
- Código modularizado
- Melhor estrutura de arquivos
- Documentação inline

## 🏗 Estrutura do Projeto

```
website-responsivo/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── config.js
│   │   └── main.js
│   ├── images/
│   └── fonts/
├── index.html
├── README.md
└── LICENSE
```

## 💻 Tecnologias

- HTML5 semântico
- CSS3 com variáveis
- JavaScript ES6+
- GSAP para animações
- Intersection Observer API
- LocalStorage para persistência

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/website-responsivo.git
```

2. Navegue até o diretório:

```bash
cd website-responsivo
```

3. Abra o arquivo index.html em seu navegador ou use um servidor local:

```bash
npx serve
```

## 🔧 Desenvolvimento

### Pré-requisitos

- Editor de código (VS Code recomendado)
- Navegador moderno
- Conhecimento básico de HTML, CSS e JavaScript

### Comandos Úteis

- `npx serve`: Inicia um servidor local
- `npx prettier --write .`: Formata o código
- `npx eslint .`: Verifica problemas no código

## 📱 Compatibilidade

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## 🎨 Personalização

### Cores

Todas as cores são definidas como variáveis CSS em `:root`. Para alterar o esquema de cores, modifique as variáveis em `assets/css/styles.css`.

### Fontes

O projeto usa Poppins como fonte principal. Para alterar:

1. Atualize as fontes em `assets/fonts/`
2. Modifique as variáveis em `assets/css/styles.css`

### Temas

O projeto suporta tema claro/escuro. Para personalizar:

1. Modifique as variáveis do tema em `assets/css/styles.css`
2. Ajuste as cores no seletor `[data-theme="dark"]`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- Email: suporte@innovatech.com.br
- Website: https://www.innovatech.com.br
- Twitter: @innovatech

---

Desenvolvido com 💙 por [Seu Nome]
