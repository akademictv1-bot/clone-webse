// Página: index.html (homepage premium reestruturada)
"use strict";
const { ICON, WA_VISITA, WA_SECRETARIA } = require("./shell");

const heroSection = `
<section class="hero">
  <div class="hero-slider" role="region" aria-label="Fotos da escola">
    <div class="hero-slide active"><img src="assets/img/alunos-comunidade-bba.jpg" alt="Alunos e professores da Bright Beginnings Academy em Chimoio" fetchpriority="high" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/alunos-celebracao-bba.jpg" alt="Celebração e entusiasmo dos alunos da Bright Beginnings Academy" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/alunos-equipa-bba.jpg" alt="Turma de alunos da Bright Beginnings Academy no portão da escola" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/sala-aula.jpeg" alt="Aluno da Bright Beginnings Academy em sala de aula" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/sala-aula-1.jpeg" alt="Aluno a estudar com livro Oxford" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/foto-real-escola.jpg" alt="Entrada da Bright Beginnings Academy na Rua 17 de Julho" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/turma-bba-escola.jpg" alt="Turma de alunos da Bright Beginnings Academy em uniforme escolar" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/professor-alunos-bba.jpg" alt="Professores e alunos da Bright Beginnings Academy em ambiente escolar" loading="lazy" decoding="async"></div>
  </div>
  <div class="container">
    <div class="hero-inner">
      <span class="kicker" data-i18n="h_kicker">Educação Internacional em Moçambique · Chimoio</span>
      <h1><span data-i18n="h_title"><span class="brand-bright">Learn</span> to <span class="brand-academy">love</span> to <span class="brand-beginnings">learn</span>.</span></h1>
      <p class="lead" data-i18n="h_lead">A nutrir mentes curiosas, a formar alunos confiantes e a preparar os estudantes para um mundo em constante evolução.</p>
      <div class="hero-cta">
        <a class="btn btn-red" href="#intro">${ICON.school}<span data-i18n="h_cta1">Conhecer a Nossa Escola</span></a>
        <a class="btn btn-ghost" href="programmes.html">${ICON.layers}<span data-i18n="h_cta2">Ver Programas</span></a>
      </div>
      <div class="hero-chips">
        <span class="chip-glass">${ICON.star}<span data-i18n="h_chip1">Em Chimoio desde 2014</span></span>
        <span class="chip-glass">${ICON.book}<span data-i18n="h_chip2">Oxford International Curriculum</span></span>
        <span class="chip-glass">${ICON.users}<span data-i18n="h_chip3">Early Years ao Grade 10 · 2–16 anos</span></span>
      </div>
    </div>
  </div>
  <div class="hero-badge">
    <img src="assets/oxford_logo.png" alt="Oxford International Curriculum">
    <span><strong>Oxford International Curriculum</strong><span data-i18n="h_badge">Certificação Oxford International · desde 2025</span></span>
    <a href="oxford.html" aria-label="Conhecer o Currículo Oxford"></a>
  </div>
  <div class="hero-dots" role="tablist" aria-label="Escolher foto">
    <button class="hdot on" type="button" aria-label="Foto 1"></button>
    <button class="hdot" type="button" aria-label="Foto 2"></button>
    <button class="hdot" type="button" aria-label="Foto 3"></button>
    <button class="hdot" type="button" aria-label="Foto 4"></button>
    <button class="hdot" type="button" aria-label="Foto 5"></button>
    <button class="hdot" type="button" aria-label="Foto 6"></button>
    <button class="hdot" type="button" aria-label="Foto 7"></button>
    <button class="hdot" type="button" aria-label="Foto 8"></button>
  </div>
</section>
`;

const introSection = `
<section class="sec tint" id="intro">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow eb-red" data-i18n="in_eb">A Nossa Escola</span>
        <h2 class="h2" data-i18n="in_t">Uma comunidade de aprendizagem para o futuro.</h2>
        <p class="lead" style="margin-top:16px" data-i18n="in_d">Fundada em 2014 em Chimoio, na Rua 17 de Julho, a Bright Beginnings Academy junta o rigor académico britânico do Oxford International Curriculum a uma comunidade acolhedora que acompanha cada aluno de perto, do Early Years ao Grade 10.</p>
        <p class="lead" style="margin-top:12px" data-i18n="in_d2">Oferecemos imersão em língua inglesa com apoio bilingue estruturado em português, turmas pequenas e atenção individualizada para desenvolver a curiosidade, o caráter e a confiança em cada etapa.</p>
        <div class="hero-cta" style="margin:24px 0 0">
          <a class="btn btn-outline-blue" href="about.html">${ICON.arrow}<span data-i18n="in_btn">Conhecer a nossa história</span></a>
          <a class="btn btn-ghost" href="missao.html">${ICON.compass}<span data-i18n="ab_cta2">Missão e Valores</span></a>
        </div>
      </div>
      <div class="media reveal">
        <img src="assets/img/alunos-comunidade-bba.jpg" alt="Alunos e professores da Bright Beginnings Academy na Rua 17 de Julho, Chimoio" loading="lazy">
        <div class="m-chip">${ICON.pin}<span data-i18n="s_chip">Rua 17 de Julho · Chimoio</span></div>
      </div>
    </div>
  </div>
</section>
`;

const diffSection = `
<section class="sec sec-deco" id="diferenciais">
  <img class="deco-flake deco-flake-tr" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" decoding="async">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow" data-i18n="w_eyebrow">Porquê a Bright Beginnings</span>
      <h2 class="h2" data-i18n="w_title">Quatro pilares de uma educação internacional.</h2>
      <p class="lead" data-i18n="w_lead">Fundada em 2014 em Chimoio, a Bright Beginnings Academy junta padrão académico britânico, imersão em inglês e uma comunidade que acompanha cada aluno de perto.</p>
    </div>
    <div class="diff-grid">
      <div class="card fcard reveal">
        <div class="ic ic-blue">${ICON.book}</div>
        <h3 data-i18n="w1_t">Excelência Académica</h3>
        <p data-i18n="w1_d">Padrões britânicos com o Oxford International Curriculum e avaliação contínua desde cedo.</p>
      </div>
      <div class="card fcard reveal">
        <div class="ic ic-green">${ICON.globe}</div>
        <h3 data-i18n="w2_t">Perspetiva Global</h3>
        <p data-i18n="w2_d">Imersão em inglês com apoio bilingue integrado para quem está a começar.</p>
      </div>
      <div class="card fcard reveal">
        <div class="ic ic-red">${ICON.shield}</div>
        <h3 data-i18n="w3_t">Caráter & Liderança</h3>
        <p data-i18n="w3_d">Formação de cidadãos responsáveis e resilientes, com valores vividos na prática.</p>
      </div>
      <div class="card fcard reveal">
        <div class="ic ic-purple">${ICON.users}</div>
        <h3 data-i18n="w4_t">Comunidade Acolhedora</h3>
        <p data-i18n="w4_d">Alunos, pais e professores em parceria contínua — turmas pequenas, atenção individual.</p>
      </div>
    </div>
  </div>
</section>
`;

const programmesSection = `
<section class="sec tint" id="programas">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-green" data-i18n="p_eyebrow">Percurso Académico</span>
      <h2 class="h2" data-i18n="p_title">Do Early Years ao Secondary.</h2>
      <p class="lead" data-i18n="p_lead">Três etapas, um só percurso: bases sólidas, curiosidade e preparação para um futuro global — sempre com o Oxford International Curriculum.</p>
    </div>
    <div class="pgrid">
      <article class="pcard reveal">
        <div class="ph"><span class="tag" data-i18n="p1_tag">2–5 anos · Pre-School</span><img src="assets/img/early-years-bba.jpg" alt="Criança do Early Years da Bright Beginnings Academy a pintar" loading="lazy"></div>
        <div class="bd">
          <h3 data-i18n="p1_t">Early Years: aprender a amar aprender</h3>
          <p data-i18n="p1_d">Um ambiente seguro e lúdico onde a curiosidade nasce através do jogo, da linguagem e da descoberta — o primeiro passo do lema “Learn to love to learn”.</p>
          <a class="tlink" href="programmes.html#early-years">${ICON.arrow}<span data-i18n="p_saber">Saber mais</span></a>
        </div>
      </article>
      <article class="pcard reveal">
        <div class="ph"><span class="tag" data-i18n="p2_tag">Grades 1–7 · Primary</span><img src="assets/img/primary-leitura-bba.jpg" alt="Aluno do Ensino Primário da Bright Beginnings Academy a ler na biblioteca" loading="lazy"></div>
        <div class="bd">
          <h3 data-i18n="p2_t">Primary: a curiosidade torna-se saber</h3>
          <p data-i18n="p2_d">Bases sólidas em inglês, matemática e raciocínio crítico, com leitura diária, desporto, artes e avaliação contínua de padrão britânico.</p>
          <a class="tlink" href="programmes.html#primary">${ICON.arrow}<span data-i18n="p_saber">Saber mais</span></a>
        </div>
      </article>
      <article class="pcard reveal">
        <div class="ph"><span class="tag" data-i18n="p3_tag">Grades 8–10 · Secondary</span><img src="assets/img/secondary-turma-bba.jpg" alt="Alunos do Ensino Secundário da Bright Beginnings Academy em uniforme escolar" loading="lazy"></div>
        <div class="bd">
          <h3 data-i18n="p3_t">Secondary: preparados para o que vem a seguir</h3>
          <p data-i18n="p3_d">Rigor académico, liderança na prática e preparação para exames, certificações britânicas e estudos universitários internacionais.</p>
          <a class="tlink" href="programmes.html#secondary">${ICON.arrow}<span data-i18n="p_saber">Saber mais</span></a>
        </div>
      </article>
    </div>
    <div style="text-align:center;margin-top:clamp(28px,3.5vw,40px)">
      <a class="btn btn-outline" href="programmes.html">${ICON.layers}<span data-i18n="p_btn">Ver todos os programas</span></a>
    </div>
  </div>
</section>
`;

const oxfordSection = `
<section class="sec oxford" id="oxford">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow" data-i18n="ox_eyebrow">Excelência Académica Internacional</span>
        <h2 class="h2" data-i18n="ox_title">The Oxford International Curriculum, ensinado em Chimoio.</h2>
        <p class="lead" data-i18n="ox_lead">Uma educação de padrão britânico que desenvolve pensamento crítico, criatividade e uma paixão duradoura pelo conhecimento. Somos a única escola em Chimoio a ensinar com este currículo.</p>
        <ul class="ticks">
          <li>${ICON.check}<span data-i18n="oxk1">Reconhecimento global em universidades</span></li>
          <li>${ICON.check}<span data-i18n="oxk2">Progressão contínua do Early Years ao Grade 10</span></li>
          <li>${ICON.check}<span data-i18n="oxk3">Raciocínio crítico e bem-estar em todas as idades</span></li>
          <li>${ICON.check}<span data-i18n="oxk4">Acesso direto a exames e certificações britânicas</span></li>
        </ul>
        <div class="hero-cta" style="margin-top:28px">
          <a class="btn btn-red" href="oxford.html">${ICON.book}<span data-i18n="ox_btn">Conhecer o Currículo Oxford</span></a>
          <a class="btn btn-ghost" href="inscricao-2027.html"><span data-i18n="btn_apply">Candidatura 2027</span></a>
        </div>
      </div>
      <div class="reveal" style="display:flex;justify-content:center">
        <div class="ox-badge">
          <img src="assets/oxford_logo.png" alt="Logotipo Oxford International Curriculum">
          <span><strong>Oxford International Curriculum</strong><span data-i18n="ox_badge">Parceiro curricular · padrão britânico</span></span>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const oxfordSpotlightSection = `

<section class="sec ox-spotlight sec-deco" id="oxford-spotlight">
  <img class="deco-flake deco-flake-tr" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" loading="lazy" decoding="async">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="spotlight-badge" data-i18n="ort_eyebrow">Destaques Curriculares Oxford</span>
      <h2 class="h2" style="color:#FFFFFF" data-i18n="ort_head">Leitura estruturada e bem-estar no coração da aprendizagem.</h2>
      <p class="lead" style="color:rgba(255,255,255,0.85);max-width:780px;margin-left:auto;margin-right:auto" data-i18n="ort_lead_main">Na Bright Beginnings Academy partilhamos a mesma visão pedagógica de excelência das principais escolas Oxford internacionais: paixão pela leitura e formação emocional completa.</p>
    </div>
    <div class="spotlight-grid">
      <div class="spotlight-card reveal">
        <span class="spotlight-badge" data-i18n="ort_tag">The Oxford Reading Tree</span>
        <h3 data-i18n="ort_t">Inspirar o amor pela leitura em cada criança</h3>
        <p data-i18n="ort_d">Apoiada pelos prestigiados Oxford Reading Levels, a nossa abordagem desenvolve leitores confiantes e independentes. Histórias ricas, progressão passo a passo e vocabulário internacional criam o alicerce essencial para o sucesso em todas as disciplinas.</p>
        <div class="spotlight-quote" data-i18n="ort_quote">“Ler com prazer e fluência abre portas para todo o conhecimento futuro.”</div>
      </div>
      <div class="spotlight-card reveal">
        <span class="spotlight-badge" data-i18n="wb_tag">Well-Being in Education</span>
        <h3 data-i18n="wb_t">Bem-estar e desenvolvimento emocional contínuo</h3>
        <p data-i18n="wb_d">O currículo Oxford integra o bem-estar como pilar fundamental da educação. Ensinamos resiliência, inteligência emocional e mindfulness ativo, assegurando que os alunos crescem confiantes, saudáveis e preparados para os desafios do mundo contemporâneo.</p>
        <div class="spotlight-quote" data-i18n="wb_quote">“Mentes tranquilas e seguras aprendem com mais entusiasmo e profundidade.”</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:clamp(28px,3.5vw,40px)">
      <a class="btn btn-red" href="oxford.html">${ICON.book}<span data-i18n="ox_btn">Explorar o Programa Oxford Completo</span></a>
    </div>
  </div>
</section>
`;

const galleryPreviewSection = `
<section class="sec" id="galeria">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow eb-purple" data-i18n="v_eyebrow">Vida Escolar</span>
      <h2 class="h2" data-i18n="v_title">Vida além da sala de aula.</h2>
      <p class="lead" data-i18n="v_lead">Do desporto e ciências às artes e projetos comunitários, os nossos alunos exploram talentos e criam laços duradouros.</p>
    </div>
    <div class="tiles">
      <a class="tile reveal" href="gallery.html"><img src="assets/img/alunos-comunidade-bba.jpg" alt="Comunidade escolar da Bright Beginnings Academy" loading="lazy"><span class="cap"><b data-i18n="v1b">Comunidade BBA</b><span data-i18n="v1s">Alunos e professores unidos em Chimoio</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/alunos-celebracao-bba.jpg" alt="Celebração e entusiasmo dos alunos da Bright Beginnings Academy" loading="lazy"><span class="cap"><b data-i18n="v2b">Espírito Escolar</b><span data-i18n="v2s">Celebração, alegria e união no campus</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/sports.jpg" alt="Desporto na escola" loading="lazy"><span class="cap"><b data-i18n="v3b">Desporto & Atletismo</b><span data-i18n="v3s">Futebol, atletismo e fair-play</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/atividade-pintura.jpeg" alt="Aluna em atividade de pintura" loading="lazy"><span class="cap"><b data-i18n="v4b">Pintura & Artes</b><span data-i18n="v4s">Cor, imaginação e motricidade fina</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/laboratorio.jpg" alt="Laboratório de Ciências da escola" loading="lazy"><span class="cap"><b data-i18n="v5b">Laboratório de Ciências</b><span data-i18n="v5s">Experiências e método científico</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/criatividade.jpeg" alt="Trabalho de criatividade dos alunos — maquete Planeta Terra" loading="lazy"><span class="cap"><b data-i18n="v6b">Projetos de Criatividade</b><span data-i18n="v6s">Ciência com as mãos na massa</span></span></a>
    </div>
    <div style="text-align:center;margin-top:clamp(28px,3.5vw,40px)">
      <a class="btn btn-outline" href="gallery.html">${ICON.camera}<span data-i18n="v_btn">Ver galeria completa</span></a>
    </div>
  </div>
</section>
`;

const newsSection = `
<section class="sec tint-b" id="news">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow eb-red" data-i18n="n_eyebrow">Notícias & Atualizações</span>
      <h2 class="h2" data-i18n="n_title">A vida na Bright Beginnings Academy</h2>
      <p class="lead" data-i18n="n_lead">Acompanhe os acontecimentos, projetos e celebrações mais recentes dos nossos alunos em Chimoio.</p>
    </div>
    <div class="grid g3">
      <article class="ncard reveal">
        <a class="ph" href="noticia.html?slug=semana-ciencias-praticas">
          <img src="assets/img/laboratorio.jpg" alt="Laboratório de Ciências" loading="lazy">
        </a>
        <div class="bd">
          <span class="ncat" data-i18n="n_cat1">Acadêmico</span>
          <h3><a href="noticia.html?slug=semana-ciencias-praticas" data-i18n="n_t1">Alunos em Destaque na Semana de Ciências Práticas</a></h3>
          <p data-i18n="n_d1">Salas transformadas em laboratórios para experiências práticas com método científico.</p>
          <time>Setembro 2026</time>
        </div>
      </article>
      <article class="ncard reveal">
        <a class="ph" href="noticia.html?slug=torneio-inter-turmas">
          <img src="assets/img/sports.jpg" alt="Desporto Escolar" loading="lazy">
        </a>
        <div class="bd">
          <span class="ncat" style="color:var(--green-deep);background:#ECF8F0;border-color:#D2EBDC" data-i18n="n_cat2">Desporto</span>
          <h3><a href="noticia.html?slug=torneio-inter-turmas" data-i18n="n_t2">Torneio Inter-Turmas Celebra Espírito Desportivo</a></h3>
          <p data-i18n="n_d2">Alunos do Primary e Secondary em jogos cooperativos, futebol e atletismo.</p>
          <time>Outubro 2026</time>
        </div>
      </article>
      <article class="ncard reveal">
        <a class="ph" href="noticia.html?slug=novos-recursos-digitais">
          <img src="assets/img/sala-informatica.jpg" alt="Sala de Informática" loading="lazy">
        </a>
        <div class="bd">
          <span class="ncat" style="color:var(--purple);background:#F3EEFE;border-color:#E3D7FC" data-i18n="n_cat3">Campus</span>
          <h3><a href="noticia.html?slug=novos-recursos-digitais" data-i18n="n_t3">Novos Recursos Digitais e Espaços de Estudo</a></h3>
          <p data-i18n="n_d3">Cantos de leitura, projetores e salas de estudo orientado para o secundário.</p>
          <time>Novembro 2026</time>
        </div>
      </article>
    </div>
    <div style="text-align:center;margin-top:clamp(28px,3.5vw,40px)">
      <a class="btn btn-outline" href="noticia.html">${ICON.note}<span data-i18n="n_all">Ver todas as notícias</span></a>
    </div>
  </div>
</section>
`;

const admissionsCtaSection = `
<section class="sec adm-hero-bg sec-deco" id="admissoes">
  <img class="deco-flake deco-flake-tr" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" loading="lazy" decoding="async">
  <div class="container">
    <div class="adm-split">
      <div class="adm-content reveal">
        <span class="eyebrow eb-red" data-i18n="ct_eyebrow">Admissões Abertas</span>
        <h2 class="h2" style="color:#FFFFFF" data-i18n="ct_title">Venha conhecer a escola por dentro.</h2>
        <p class="lead" style="color:rgba(255,255,255,0.88)" data-i18n="ct_desc">Visita guiada de 30 minutos: salas de aula, laboratórios e uma conversa com a direção pedagógica no nosso campus da Rua 17 de Julho, em Chimoio.</p>
        <div class="adm-actions">
          <a class="btn btn-red" href="inscricao-2027.html">${ICON.send}<span data-i18n="h_cta1_adm">Candidatura 2027</span></a>
          <a class="btn btn-outline-blue" href="programmes.html" style="color:#FFFFFF;border-color:rgba(255,255,255,0.4)">${ICON.layers}<span data-i18n="h_cta2_adm">Ver Programas</span></a>
          <a class="btn btn-wa" href="${WA_VISITA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ct_btn1">Agendar visita no WhatsApp</span></a>
          <a class="btn btn-ghost" href="contact.html" style="color:#FFFFFF;border-color:rgba(255,255,255,0.4)">${ICON.pin}<span data-i18n="ct_btn2">Contactos e localização</span></a>
        </div>
      </div>
      <div class="map-frame reveal">
        <iframe title="Mapa do Campus — Bright Beginnings Academy, Chimoio" src="https://maps.google.com/maps?q=-19.1437458,33.4780059&z=15&hl=pt&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        <div class="map-card">
          <strong data-i18n="map_addr_title">Endereço do Campus</strong>
          <p>Rua 17 de Julho, Bairro Emília Dausse, Chimoio, Moçambique</p>
          <a class="btn btn-blue btn-sm" href="https://maps.google.com/?q=Bright+Beginnings+Academy,+Rua+17+de+Julho,+Bairro+Em%C3%ADlia+Dausse,+Chimoio,+Mozambique" target="_blank" rel="noopener">${ICON.pin}<span data-i18n="map_dir">Como chegar</span></a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const schema = {
  "@context": "https://schema.org",
  "@type": "School",
  "name": "Bright Beginnings Academy",
  "alternateName": "BBA Chimoio",
  "url": "https://www.bba.edu.mz/",
  "logo": "https://www.bba.edu.mz/assets/img/logo-header.jpg",
  "image": "https://www.bba.edu.mz/assets/img/og-bba.jpg",
  "description": "Escola internacional em Chimoio com o Oxford International Curriculum, do Early Years ao Grade 10 (2–16 anos).",
  "slogan": "Learn to love to learn.",
  "foundingDate": "2014",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua 17 de Julho, Bairro Emília Dausse",
    "addressLocality": "Chimoio",
    "addressRegion": "Manica",
    "addressCountry": "MZ"
  },
  "telephone": "+258844277021",
  "email": "admin@bba.edu.mz",
  "hasMap": "https://www.google.com/maps?q=Rua+17+de+Julho,+Bairro+Em%C3%ADlia+Dausse,+Chimoio,+Mozambique",  "sameAs": [
    "https://www.facebook.com/profile.php?id=61594581886025",
    "https://www.instagram.com/bright_bba_oficial",
    "https://www.tiktok.com/@nussy25"
  ]
};

const dict = {
  h_kicker: "International Education in Mozambique · Chimoio",
  h_title: '<span class="brand-bright">Learn</span> to <span class="brand-academy">love</span> to <span class="brand-beginnings">learn</span>.',
  h_lead: "Nurturing curious minds, developing confident learners and preparing students for a changing world.",
  h_cta1: "Explore Our School",
  h_cta2: "Discover Our Programmes",
  h_cta1_adm: "Apply for 2027",
  h_cta2_adm: "Explore Programmes",
  h_chip1: "Serving Chimoio since 2014",
  h_chip2: "Oxford International Curriculum",
  h_chip3: "Early Years to Grade 10 · Ages 2–16",
  h_badge: "Oxford International certified · since 2025",
  in_eb: "About Our School",
  in_t: "A learning community built for the future.",
  in_d: "Founded in Chimoio in 2014 on Rua 17 de Julho, Bright Beginnings Academy combines the British academic rigour of the Oxford International Curriculum with a caring community that knows every student by name, from Early Years to Grade 10.",
  in_d2: "We offer English-medium immersion with structured Portuguese bilingual support, small class sizes and individual attention to foster curiosity, character and confidence at every stage.",
  in_btn: "Discover our story",
  ab_cta2: "Vision & mission",
  s_chip: "Rua 17 de Julho · Chimoio",
  w_eyebrow: "Why Bright Beginnings",
  w_title: "Four pillars of an international education.",
  w_lead: "Founded in Chimoio in 2014, Bright Beginnings Academy combines British academic standards, English immersion and the close care of a true community school.",
  w1_t: "Academic Excellence",
  w1_d: "British standards with the Oxford International Curriculum and continuous assessment from an early age.",
  w2_t: "Global Perspective",
  w2_d: "English immersion with integrated bilingual support for beginners.",
  w3_t: "Character & Leadership",
  w3_d: "Building responsible, resilient citizens — with values lived in practice.",
  w4_t: "A Supportive Community",
  w4_d: "Students, parents and teachers in continuous partnership — small classes, individual attention.",
  p_eyebrow: "Academic Pathway",
  p_title: "From Early Years to Secondary.",
  p_lead: "Three stages, one pathway: solid foundations, curiosity and preparation for a global future — always with the Oxford International Curriculum.",
  p1_tag: "Ages 2–5 · Pre-School",
  p1_t: "Early Years: learning to love learning",
  p1_d: "A safe, playful environment where curiosity begins through play, language and discovery — the first step of “Learn to love to learn”.",
  p2_tag: "Grades 1–7 · Primary",
  p2_t: "Primary: curiosity becomes knowledge",
  p2_d: "Solid foundations in English, mathematics and critical thinking, with daily reading, sport, arts and continuous British-standard assessment.",
  p3_tag: "Grades 8–10 · Secondary",
  p3_t: "Secondary: ready for what comes next",
  p3_d: "Academic rigour, hands-on leadership and preparation for exams, British certifications and international university studies.",
  p_saber: "Learn more",
  p_btn: "See all programmes",
  ox_eyebrow: "International Academic Excellence",
  ox_title: "The Oxford International Curriculum, taught in Chimoio.",
  ox_lead: "A British-standard education that develops critical thinking, creativity and a lasting passion for knowledge. We are the only school in Chimoio teaching this curriculum.",
  oxk1: "Global recognition at universities",
  oxk2: "Continuous progression from Early Years to Grade 10",
  oxk3: "Critical reasoning and wellbeing at every age",
  oxk4: "Direct access to British exams and certifications",
  ox_btn: "Explore the Oxford Curriculum",
  btn_apply: "Apply for 2027",
  ox_badge: "Curriculum partner · British standard",
  v_eyebrow: "School Life",
  v_title: "Life beyond the classroom.",
  v_lead: "From sport and science to arts and community projects, our students explore their talents and build lasting bonds.",
  v1b: "BBA Community", v1s: "Students and teachers united in Chimoio",
  v2b: "School Spirit", v2s: "Celebration, joy and unity across campus",
  v3b: "Sports & Athletics", v3s: "Football, athletics and fair play",
  v4b: "Painting & Arts", v4s: "Colour, imagination and fine motor skills",
  v5b: "Science Lab", v5s: "Experiments and the scientific method",
  v6b: "Creativity Projects", v6s: "Hands-on science",
  v_btn: "See full gallery",
  ct_eyebrow: "Admissions Open",
  ct_title: "Come and see the school from the inside.",
  ct_desc: "A 30-minute guided tour: classrooms, science labs and a meeting with our educational leadership at our Rua 17 de Julho campus in Chimoio.",
  ct_btn1: "Book a visit on WhatsApp",
  ct_btn2: "Contacts & location",
  n_eyebrow: "School News & Updates",
  n_title: "Life at Bright Beginnings Academy",
  n_lead: "Follow the latest events, projects and celebrations of our students in Chimoio.",
  n_cat1: "Academic",
  n_t1: "Students Excel at Practical Science Week",
  n_d1: "Classrooms turned into laboratories for hands-on scientific experiments.",
  n_cat2: "Sports",
  n_t2: "Annual Sports Tournament Celebrates Teamwork",
  n_d2: "Primary and Secondary students in cooperative games, football and athletics.",
  n_cat3: "Campus",
  n_t3: "New Science Lab & Digital Learning Facilities",
  n_d3: "Reading corners, projectors and supervised study rooms for secondary.",
  n_all: "See all school news",
  map_addr_title: "Campus Address",
  map_dir: "Get Directions",
  ort_eyebrow: "Oxford Curriculum Highlights",
  ort_head: "Structured reading and wellbeing at the heart of learning.",
  ort_lead_main: "At Bright Beginnings Academy, we share the same pedagogical excellence as top international Oxford schools: a true passion for reading and whole-child emotional development.",
  ort_tag: "The Oxford Reading Tree",
  ort_t: "Inspiring a love of reading in every child",
  ort_d: "Underpinned by Oxford Reading Levels, our approach nurtures confident, independent readers. Engaging stories, step-by-step progression and rich global vocabulary form the foundation for success across all subjects.",
  ort_quote: "“Reading with pleasure and fluency unlocks lifelong learning.”",
  wb_tag: "Well-Being in Education",
  wb_t: "Continuous wellbeing and emotional development",
  wb_d: "The Oxford International Curriculum places wellbeing as a core pillar of academic achievement. We build resilience, emotional intelligence and active mindfulness, ensuring students grow confident and equipped for modern life.",
  wb_quote: "“Confident, emotionally secure minds learn with greater depth and enthusiasm.”",
};

module.exports = {
  page: {
    file: "index.html",
    active: "",
    preload: "assets/img/alunos-comunidade-bba.jpg",
    meta: {
      pt: {
        title: "Bright Beginnings Academy | Currículo Oxford em Chimoio",
        desc: "Escola internacional em Chimoio com Currículo Oxford, do Early Years ao Grade 10. Educação de padrão britânico, valores e excelência desde 2014.",
      },
      en: {
        title: "Bright Beginnings Academy | Oxford Curriculum in Chimoio",
        desc: "International school in Chimoio, Mozambique, with the Oxford Curriculum from Early Years to Grade 10. British-standard education and excellence since 2014.",
      },
    },
    schema: JSON.stringify(schema),
    dict,
    body: heroSection + introSection + diffSection + programmesSection + oxfordSection + oxfordSpotlightSection + galleryPreviewSection + newsSection + admissionsCtaSection,
    extraJs: "",
  },
  dict,
  schema,
};
