# 🥗 Portfólio — Pedro Henrique

🔗 **Site ao vivo:** https://psilvacosta283-tech.github.io/Aula-Ezequiel/

Site de portfólio profissional de **Pedro Henrique**, auxiliar de hortifruti do **Pão de Açúcar**.

## ✨ Sobre o projeto

Portfólio de página única com estética inspirada na Apple, apresentando a trajetória
profissional de Pedro no varejo:

- **Pão de Açúcar** — Auxiliar de Hortifruti (atual, 1 ano)
- **Rede de Mercados Cercadão** — Jovem Aprendiz (1 ano e meio)
- **Macedo's** — Loja de roupas (experiência anterior)

## 🎨 Recursos

- **Fonte Apple** — SF Pro (via stack de fontes de sistema da Apple)
- **Glassmorphism** — cards em vidro fosco com `backdrop-filter: blur()`
- **Efeito de desfoque** — orbes de gradiente desfocados no fundo + reveal que sai do blur para a nitidez ao rolar
- **Efeitos cinematográficos de scroll** — reveals escalonados, título letra a letra, contadores animados, barras de habilidade
- **Parallax** — orbes de fundo que se movem em velocidades diferentes
- **Tilt 3D** — cards que inclinam seguindo o mouse, com brilho radial
- **Barra de progresso de leitura** e navbar com vidro fosco ao rolar
- **Totalmente responsivo** (menu mobile) e acessível (`prefers-reduced-motion`)

## 📁 Estrutura

```
index.html       # Página principal
css/styles.css   # Estilos (Apple-style, glassmorphism, animações)
js/main.js       # Efeitos de scroll, parallax, tilt, contadores
```

## 🚀 Como visualizar

Basta abrir o `index.html` no navegador ou servir a pasta com um servidor local:

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

## ✏️ Personalização

Os dados de contato (e-mail, WhatsApp, LinkedIn) em `index.html` são
exemplos — basta substituir pelos dados reais na seção `#contato`.
