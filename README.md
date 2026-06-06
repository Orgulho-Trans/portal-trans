# 🏳️‍⚧️ Portal Trans & LGBT+ — Acolhimento e Informação 🏳️‍🌈

<p align="center">
  <img src="https://img.shields.io/badge/TEMA--PRIDE-%23FF0018?style=for-the-badge&logoColor=white&color=FF0018" alt="Red">
  <img src="https://img.shields.io/badge/-%23FFA52C?style=for-the-badge&color=FFA52C" alt="Orange">
  <img src="https://img.shields.io/badge/-%23FFFF41?style=for-the-badge&color=FFFF41" alt="Yellow">
  <img src="https://img.shields.io/badge/-%23008018?style=for-the-badge&color=008018" alt="Green">
  <img src="https://img.shields.io/badge/-%230000F9?style=for-the-badge&color=0000F9" alt="Blue">
  <img src="https://img.shields.io/badge/-%2386007D?style=for-the-badge&color=86007D" alt="Purple">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TEMA--TRANS-%235BCFFA?style=for-the-badge&logoColor=white&color=5BCFFA" alt="Trans Blue">
  <img src="https://img.shields.io/badge/-%23F5A9B8?style=for-the-badge&color=F5A9B8" alt="Trans Pink">
  <img src="https://img.shields.io/badge/-%23FFFFFF?style=for-the-badge&color=FFFFFF" alt="Trans White">
  <img src="https://img.shields.io/badge/-%23F5A9B8?style=for-the-badge&color=F5A9B8" alt="Trans Pink">
  <img src="https://img.shields.io/badge/-%235BCFFA?style=for-the-badge&color=5BCFFA" alt="Trans Blue">
</p>

---

## 💖 Sobre o Projeto
Este é um portal responsivo, acolhedor e informativo dedicado à comunidade **Trans, Travestis, Crossdressers, Não-bináries e toda a comunidade LGBT+**. O objetivo principal é disponibilizar informações sobre identidades de gênero, redes de apoio, marcos importantes e canais de ajuda, além de celebrar a visibilidade e o orgulho de existir e resistir.

---

## 🌈 Funcionalidades Principais

*   🎨 **Temas Dinâmicos e Festivos**:
    *   `Rainbow Pride` 🌈: Fundo dinâmico com gradiente animado que flui suavemente pelo arco-íris.
    *   `Trans pride` 🏳️‍⚧️: Fundo temático com as cores da bandeira transgênero (Azul Claro, Rosa e Branco).
    *   `Dark Mode` 🌙: Um tema escuro elegante com destaques em neon roxo e azul-celeste.
*   ✨ **Efeito Color Reveal (Hover Filter)**:
    *   Todos os cartões e fotos começam desaturados em tons de cinza.
    *   Ao passar o mouse, a cor original é revelada suavemente, acompanhada por um leve zoom interativo.
*   📚 **Cards Educativos Interativos**:
    *   Permite alternar entre diferentes conceitos (Transgênero, Mulher Trans, Homem Trans, Não-Binário, Cisgênero, Lésbicas, Crossdresser, Drag Queens) exibindo painéis explicativos sob demanda.
*   🛡️ **Acesso a Redes de Apoio**:
    *   Links úteis e diretos para o coletivo *Mães pela Diversidade*, *TransEmpregos*, *TODXS*, *SUS (Processo Transexualizador)*, *Casa Florescer* e muito mais.
*   💬 **Engajamento e Apoio Local (Supabase)**:
    *   Contador de curtidas e apoios conectado em tempo real à API de banco de dados do **Supabase Storage/Database**.
    *   Criação de chaves únicas no armazenamento local (`localStorage`) para garantir suporte único de cada usuário.

---

## 🛠️ Tecnologias Utilizadas

*   **HTML5** (Estruturação semântica)
*   **CSS3 Vanilla** (Variáveis nativas para temas rápidos, transições cúbicas e animações de gradiente)
*   **JavaScript ES6** (Gerenciamento de DOM, LocalStorage e conexões de rede fetch com Supabase)
*   **Supabase Database** (Persistência em tempo real dos apoios/curtidas da comunidade)

---

## 💻 Estrutura do Código

```bash
├── index.html         # Marcação e estruturação de seções
├── style.css          # Estilos de temas, responsividade mobile e filtros
├── script.js          # Lógicas de temas, explicações e conexões Supabase
└── supabase_setup.sql # Script SQL para criar o bucket e as políticas no Supabase
```

---

## 🚀 Como Executar Localmente

1. Faça o clone deste repositório:
   ```bash
   git clone https://github.com/Orgulho-Trans/portal-trans.git
   ```
2. Abra a pasta do projeto e dê um duplo clique no arquivo `index.html` para abrir diretamente no seu navegador.
3. Se desejar hospedar e receber as curtidas, configure a tabela `likes` no seu console do **Supabase** usando os comandos do arquivo `supabase_setup.sql`.

---

<p align="center">
  Criado com amor 💖 e orgulho por <strong>Alexia Melusine</strong>.
</p>
