# Gabriela Dourado — Site Oficial & Revista Digital (Modern Beauty)

**Slogan:** *A beleza de ser você.*  
**Marca complementar:** *Golden Essence by Gabriela Dourado*

---

## 1. Visão Geral da Arquitetura

O projeto foi desenvolvido em **Next.js (App Router + TypeScript + Tailwind CSS)** com banco de dados local persistente (`data/database.json`) e **Painel Administrativo completo integrado** (`/admin`), permitindo atualizar textos, fotografias, procedimentos, protocolos *Golden Essence*, artigos científicos do *The Beauty Edit* e dados de contato sem precisar mexer no código.

### Identidade Visual Implementada
- **Vinho (`#481D2D`)**: Identidade principal, títulos e botões de destaque.
- **Dourado (`#B18A50`)**: Detalhes sutis, linhas finas (`editorial-divider`), ícones e assinaturas.
- **Champagne (`#E8D8C3`)**: Áreas de destaque e atmosfera exclusiva da coleção *Golden Essence*.
- **Off-white (`#FAF7F2`)**: Fundo principal leve e acolhedor.
- **Grafite Quente (`#241C20`)**: Textos corridos e contrastes suaves de leitura.
- **Tipografia Editorial**: `Cormorant Garamond` para títulos e frases de destaque + `DM Sans` para leitura confortável no celular e computador.

---

## 2. Páginas Desenvolvidas

1. **Página Inicial (`/`)**:
   - **Seção 1 (Hero)**: Apresentação de Gabriela Dourado, slogan *"A beleza de ser você"*, fotografia editorial e botões para Procedimentos e *Golden Essence*.
   - **Seção 2 (Apresentação Golden Essence)**: Destaque com identidade visual própria em tons champagne e dourado.
   - **Seção 3 (Procedimentos)**: Catálogo em cards dinâmicos direcionando para a página individual de cada procedimento.
   - **Seção 4 (The Beauty Edit)**: Cards dos artigos mais recentes com categoria, tempo estimado de leitura e resumo.
   - **Seção 5 (Sobre Gabriela)**: Apresentação em primeira pessoa (*"Oi, eu sou a Gabriela!"*) e convite para a página completa.
   - **Seção 6 (Chamada para Contato)**: Convite acolhedor com integração direta ao WhatsApp.
   - **Seção 7 (Rodapé)**: Identidade, menu, links para WhatsApp e Instagram, informações profissionais, Políticas de Privacidade/Cookies (LGPD) e atalho para o Painel Admin.

2. **Sobre Gabriela (`/sobre`)**:
   - Escrita integralmente em primeira pessoa (*"Muito prazer, Gabriela!"*), apresentando sua relação com a Biomedicina e a estética, visão sobre beleza natural, linha do tempo de formação, qualificações e apresentação da coleção *Golden Essence*.

3. **Coleção Golden Essence (`/golden-essence`)**:
   - Identidade visual dedicada (Champagne, Dourado e Off-white com detalhes em Vinho).
   - Conceito da coleção + cards navegáveis + dossiê completo de cada protocolo (*Limpeza de Pele*, *Peelings Químicos* e *Microagulhamento*): objetivo, necessidades avaliadas, como funciona, etapas numeradas, benefícios esperados, cuidados antes/depois, contraindicações/limitações, nota de avaliação individual e perguntas frequentes.

4. **Catálogo de Procedimentos (`/procedimentos` e `/procedimentos/[slug]`)**:
   - Página geral e páginas individuais completas com os 12 itens solicitados (Nome, Imagem, Apresentação, O que é, Como funciona, Indicações, Benefícios esperados, Como é realizado, Cuidados antes e depois, Contraindicações, Perguntas frequentes e Botão de contato).

5. **The Beauty Edit — Revista Digital (`/the-beauty-edit` e `/the-beauty-edit/[slug]`)**:
   - Filtro interativo pelas 5 editorias (**Skin Talks**, **Beauty Radar**, **The Science Behind**, **Skin Routine** e **Myth or Fact**) e campo de busca em tempo real.
   - Leitura editorial confortável no mobile e desktop, caixas de destaque, botões de compartilhamento e seção de **Referências Científicas** (Autor, Título, Revista, Ano e DOI/Link) ao final de cada artigo.

6. **Contato & Agendamento (`/contato`)**:
   - Botão de WhatsApp com mensagem automática inicial configurável, link para Instagram, localização, horários e formulário de contato opcional com consentimento LGPD.

7. **Privacidade, Cookies & SEO (`/privacidade`, `/cookies`, `/sitemap.xml`, `/robots.txt`)**:
   - Aviso de cookies LGPD, políticas dedicadas, dados estruturados Schema.org e metadados otimizados para mecanismos de busca.

---

## 3. Como Acessar e Usar o Painel Administrativo

- **Endereço do Painel**: `http://localhost:3000/admin` (ou clique em **"Painel Admin"** no rodapé do site).
- **Senha padrão inicial**: `gabriela2026` (pode ser alterada via variável de ambiente `ADMIN_PASSWORD`).
- Dentro do painel você pode:
  1. Criar, editar, salvar como rascunho ou publicar artigos e referências científicas no **The Beauty Edit**;
  2. Cadastrar, editar ou ocultar **Procedimentos**;
  3. Editar e reordenar os protocolos da coleção **Golden Essence**;
  4. Alterar textos e fotos da **Página Inicial** e da página **Sobre Gabriela**;
  5. Atualizar seu número de **WhatsApp**, mensagem automática, `@instagram` e registro profissional (**CRBM**);
  6. Ler as mensagens enviadas pelo formulário de contato.

---

## 4. Como Executar o Projeto no Seu Computador

```bash
# 1. Instalar dependências (necessário apenas na primeira vez)
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Depois, abra o navegador em `http://localhost:3000`.
