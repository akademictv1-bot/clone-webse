// Página: index.html (homepage premium reestruturada)
"use strict";
const { ICON, WA_VISITA, WA_SECRETARIA } = require("./shell");

const heroSection = `
<section class="hero">
  <div class="hero-slider" role="region" aria-label="Fotos da escola">
    <div class="hero-slide active"><img src="assets/img/hero-school.jpg" alt="Alunos da Bright Beginnings Academy em Chimoio" fetchpriority="high" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/sala-aula.jpeg" alt="Aluno da Bright Beginnings Academy em sala de aula" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/sala-aula-1.jpeg" alt="Aluno a estudar com livro Oxford" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/foto-real-escola.jpg" alt="Entrada da Bright Beginnings Academy na Rua 17 de Julho" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/sala-primario.jpg" alt="Sala do Ensino Primário" loading="lazy" decoding="async"></div>
    <div class="hero-slide" aria-hidden="true"><img src="assets/img/secondary.jpg" alt="Alunos do Ensino Secundário em atividade" loading="lazy" decoding="async"></div>
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
        <img src="assets/img/foto-real-escola.jpg" alt="Entrada real da Bright Beginnings Academy na Rua 17 de Julho, Chimoio" loading="lazy">
        <div class="m-chip">${ICON.pin}<span data-i18n="s_chip">Rua 17 de Julho · Chimoio</span></div>
      </div>
    </div>
  </div>
</section>
`;

const diffSection = `
<section class="sec sec-deco" id="diferenciais">
  <img class="deco-flake deco-flake-right" src="assets/img/logotpoparacolocarnas pontasdumaformacortada.png" alt="" aria-hidden="true" loading="lazy">
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
        <div class="ph"><span class="tag" data-i18n="p1_tag">2–5 anos · Pre-School</span><img src="assets/img/early-years.jpg" alt="Crianças do Early Years em atividade na Bright Beginnings Academy" loading="lazy"></div>
        <div class="bd">
          <h3 data-i18n="p1_t">Early Years: aprender a amar aprender</h3>
          <p data-i18n="p1_d">Um ambiente seguro e lúdico onde a curiosidade nasce através do jogo, da linguagem e da descoberta — o primeiro passo do lema “Learn to love to learn”.</p>
          <a class="tlink" href="programmes.html#early-years">${ICON.arrow}<span data-i18n="p_saber">Saber mais</span></a>
        </div>
      </article>
      <article class="pcard reveal">
        <div class="ph"><span class="tag" data-i18n="p2_tag">Grades 1–7 · Primary</span><img src="assets/img/sala-primario.jpg" alt="Sala de aula do Ensino Primário na Bright Beginnings Academy" loading="lazy"></div>
        <div class="bd">
          <h3 data-i18n="p2_t">Primary: a curiosidade torna-se saber</h3>
          <p data-i18n="p2_d">Bases sólidas em inglês, matemática e raciocínio crítico, com leitura diária, desporto, artes e avaliação contínua de padrão britânico.</p>
          <a class="tlink" href="programmes.html#primary">${ICON.arrow}<span data-i18n="p_saber">Saber mais</span></a>
        </div>
      </article>
      <article class="pcard reveal">
        <div class="ph"><span class="tag" data-i18n="p3_tag">Grades 8–10 · Secondary</span><img src="assets/img/secondary.jpg" alt="Alunos do Ensino Secundário em atividade" loading="lazy"></div>
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

const galleryPreviewSection = `
<section class="sec" id="galeria">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow eb-purple" data-i18n="v_eyebrow">Vida Escolar</span>
      <h2 class="h2" data-i18n="v_title">Vida além da sala de aula.</h2>
      <p class="lead" data-i18n="v_lead">Do desporto e ciências às artes e projetos comunitários, os nossos alunos exploram talentos e criam laços duradouros.</p>
    </div>
    <div class="tiles">
      <a class="tile reveal" href="gallery.html"><img src="assets/img/sports.jpg" alt="Desporto na escola" loading="lazy"><span class="cap"><b data-i18n="v1b">Desporto</b><span data-i18n="v1s">Futebol, atletismo e fair-play</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/atividade-pintura.jpeg" alt="Aluna em atividade de pintura" loading="lazy"><span class="cap"><b data-i18n="v2b">Pintura & Artes</b><span data-i18n="v2s">Cor, imaginação e motricidade fina</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/criatividade.jpeg" alt="Trabalho de criatividade dos alunos — maquete Planeta Terra" loading="lazy"><span class="cap"><b data-i18n="v3b">Projetos de Criatividade</b><span data-i18n="v3s">Ciência com as mãos na massa</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/laboratorio.jpg" alt="Laboratório de Ciências da escola" loading="lazy"><span class="cap"><b data-i18n="v4b">Laboratório de Ciências</b><span data-i18n="v4s">Experiências e método científico</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/sala-aula.jpeg" alt="Aluno em sala de aula" loading="lazy"><span class="cap"><b data-i18n="v5b">Sala de Aula</b><span data-i18n="v5s">Turmas pequenas, atenção individual</span></span></a>
      <a class="tile reveal" href="gallery.html"><img src="assets/img/early-years.jpg" alt="Infância e descoberta no Early Years" loading="lazy"><span class="cap"><b data-i18n="v6b">Early Years</b><span data-i18n="v6s">Descoberta a brincar, dos 2 aos 5 anos</span></span></a>
    </div>
    <div style="text-align:center;margin-top:clamp(28px,3.5vw,40px)">
      <a class="btn btn-outline" href="gallery.html">${ICON.camera}<span data-i18n="v_btn">Ver galeria completa</span></a>
    </div>
  </div>
</section>
`;

const admissionsCtaSection = `
<section class="sec tint sec-deco" id="admissoes">
  <img class="deco-flake deco-flake-tr" src="assets/img/logotpoparacolocarnas pontasdumaformacortada.png" alt="" aria-hidden="true" loading="lazy">
  <div class="container">
    <div class="adm-split">
      <div class="adm-content reveal">
        <span class="eyebrow eb-red" data-i18n="ct_eyebrow">Admissões Abertas</span>
        <h2 class="h2" data-i18n="ct_title">Venha conhecer a escola por dentro.</h2>
        <p class="lead" data-i18n="ct_desc">Visita guiada de 30 minutos: salas de aula, laboratórios e uma conversa com a direção pedagógica no nosso campus da Rua 17 de Julho, em Chimoio.</p>
        <div class="adm-actions">
          <a class="btn btn-red" href="inscricao-2027.html">${ICON.send}<span data-i18n="h_cta1_adm">Candidatura 2027</span></a>
          <a class="btn btn-outline-blue" href="programmes.html">${ICON.layers}<span data-i18n="h_cta2_adm">Ver Programas</span></a>
          <a class="btn btn-wa" href="${WA_VISITA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ct_btn1">Agendar visita no WhatsApp</span></a>
          <a class="btn btn-ghost" href="contact.html">${ICON.pin}<span data-i18n="ct_btn2">Contactos e localização</span></a>
        </div>
      </div>
      <div class="adm-photo-card reveal">
        <img src="assets/img/sala-primario.jpg" alt="Sala de aula da Bright Beginnings Academy em Chimoio" loading="lazy">
        <div class="m-chip">${ICON.pin}<span data-i18n="s_chip">Campus BBA · Rua 17 de Julho, Chimoio</span></div>
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
  "url": "https://bba.edu.mz/",
  "logo": "https://bba.edu.mz/assets/img/logo-header.jpg",
  "image": "https://bba.edu.mz/assets/img/hero-school.jpg",
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
  "email": "admin@bbamoz.com",
  "sameAs": [
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
  v1b: "Sports", v1s: "Football, athletics and fair play",
  v2b: "Painting & Arts", v2s: "Colour, imagination and fine motor skills",
  v3b: "Creativity Projects", v3s: "Hands-on science",
  v4b: "Science Lab", v4s: "Experiments and the scientific method",
  v5b: "Classroom", v5s: "Small classes, individual attention",
  v6b: "Early Years", v6s: "Discovery through play, ages 2 to 5",
  v_btn: "See full gallery",
  ct_eyebrow: "Admissions Open",
  ct_title: "Come and see the school from the inside.",
  ct_desc: "A 30-minute guided tour: classrooms, science labs and a meeting with our educational leadership at our Rua 17 de Julho campus in Chimoio.",
  ct_btn1: "Book a visit on WhatsApp",
  ct_btn2: "Contacts & location",
};

module.exports = {
  page: {
    file: "index.html",
    active: "",
    preload: "assets/img/hero-school.jpg",
    meta: {
      pt: {
        title: "Bright Beginnings Academy | Escola Internacional com Currículo Oxford em Chimoio",
        desc: "Escola internacional em Chimoio fundada em 2014, certificada no Oxford International Curriculum desde 2025, do Early Years ao Grade 10 (2–16 anos). Turmas pequenas, inglês com apoio em português e visitas guiadas — inscrições abertas para 2027.",
      },
      en: {
        title: "Bright Beginnings Academy | International School with the Oxford Curriculum in Chimoio",
        desc: "International school in Chimoio, Mozambique, founded in 2014 and certified in the Oxford International Curriculum since 2025, from Early Years to Grade 10 (ages 2–16). Small classes, English with Portuguese support — admissions open for 2027.",
      },
    },
    schema: JSON.stringify(schema),
    dict,
    body: heroSection + introSection + diffSection + programmesSection + oxfordSection + galleryPreviewSection + admissionsCtaSection,
    extraJs: "",
  },
  dict,
  schema,
};
