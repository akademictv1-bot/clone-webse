// Páginas: about, programmes, oxford, missao
"use strict";
const { ICON, WA_VISITA, WA_SECRETARIA } = require("./shell");

// ================= ABOUT =================
const about = {
  file: "about.html",
  active: "about.html",
  meta: {
    pt: {
      title: "Sobre Nós | Bright Beginnings Academy — Chimoio",
      desc: "A história da Bright Beginnings Academy em Chimoio desde 2014: uma comunidade de aprendizagem do Early Years ao Grade 10, com o Currículo Oxford.",
    },
    en: {
      title: "About Us | Bright Beginnings Academy - Chimoio",
      desc: "The story of Bright Beginnings Academy in Chimoio since 2014: a learning community from Early Years to Grade 10, with the Oxford Curriculum.",
    },
  },
  dict: {
    ab_eyebrow: "About Us",
    ab_title: "More than a school. A community built for the future.",
    ab_lead: "Since 2014 in Chimoio, Bright Beginnings Academy shapes confident, principled students prepared for a global world — from Early Years to Grade 10.",
    ab_cta1: "Apply for 2027",
    ab_cta2: "Vision & mission",
    st_eyebrow: "Our Story",
    st_title: "Every child has the potential to achieve greatness.",
    st_p1: "Bright Beginnings Academy was founded in Chimoio with a simple belief: every child can go far when they learn in an environment that sees, respects and challenges them.",
    st_p2: "Since 2014 we have grown step by step — from Early Years to Primary and then Secondary — into a leading international educational institution in Mozambique.",
    st_p3: "We teach with the Oxford International Curriculum, our certified curricular partner: a British-standard foundation that develops critical thinking, creativity and a lifelong love of learning.",
    sa1: "Founded in Chimoio", sa2: "Ages 2–16 · Early Years to Grade 10", sa3: "Integrated teaching levels", sa4: "International certification · since 2025",
    tl_eyebrow: "Milestones",
    tl_title: "Our journey",
    at1t: "Founded in Chimoio", at1d: "Bright Beginnings Academy opens its doors in Chimoio.",
    at2t: "Primary School launched", at2d: "Primary school opens and the campus expands.",
    at3t: "Oxford International certification", at3d: "The school earns official certification for the British-standard curriculum.",
    at4t: "Secondary consolidated", at4d: "Grades 8–10 and preparation for international pathways.",
    stf_eyebrow: "Teaching Faculty & Staff",
    stf_title: "Educators dedicated to every student's growth.",
    stf_lead: "Our academic faculty combines professional qualification, ongoing training in the British standards of the Oxford International Curriculum and deep commitment to student wellbeing in Chimoio.",
    stf1_badge: "Early Years",
    stf1_t: "Early Childhood Educators",
    stf1_d: "Specialists in early child development (ages 2–5), focusing on caring routines, playful discovery and initial English-medium language acquisition.",
    stf2_badge: "Primary School",
    stf2_t: "Primary School Teachers",
    stf2_d: "Subject specialists in English literacy, mathematics and science through the Oxford curriculum, delivering daily reading, critical reasoning and tailored bilingual support.",
    stf3_badge: "Secondary School",
    stf3_t: "Secondary Subject Specialists",
    stf3_d: "Teachers focused on Grades 8–10 academic disciplines, preparing students for the rigour of international examinations, scientific inquiry and principled leadership.",
    stf4_badge: "Leadership & Safeguarding",
    stf4_t: "Coordination & Safeguarding",
    stf4_d: "Educational leadership guided by strict child safeguarding protocols, transparent communication with families and continuous professional development.",
    vl_eyebrow: "What guides us",
    vl_title: "Kindness, respect, unique contribution, integrity and excellence.",
    vl_lead: "Every day, our school is guided by values lived in practice — and by our motto “Learn to love to learn”.",
    vl_btn: "Explore vision & values",
    cta_eyebrow: "Come visit",
    cta_title: "Come and see the school from the inside.",
    cta_desc: "A 30-minute guided visit with our leadership: classrooms, laboratories and all your questions answered.",
    ct_btn1: "Book a visit on WhatsApp",
  },
  body: `
<section class="banner">
  <div class="bbg"><img src="assets/img/foto-real-escola.jpg" alt="Entrada real da Bright Beginnings Academy em Chimoio" fetchpriority="high" decoding="async"></div>
  <div class="container">
    <div class="banner-in">
      <div class="bcrumb"><a href="index.html" data-i18n="nav_home">Início</a><span class="sep">→</span><span data-i18n="nav_about">Sobre Nós</span></div>
      <h1 data-i18n="ab_title">Mais do que uma escola. Uma comunidade para o futuro.</h1>
      <p class="lead" data-i18n="ab_lead">Desde 2014 em Chimoio, a Bright Beginnings Academy forma alunos confiantes, íntegros e preparados para um mundo global — do Early Years ao Grade 10.</p>
      <div class="banner-cta">
        <a class="btn btn-red" href="inscricao-2027.html">${ICON.send}<span data-i18n="ab_cta1">Inscrições 2027</span></a>
        <a class="btn btn-ghost" href="missao.html"><span data-i18n="ab_cta2">Missão e Valores</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-deco">
  <img class="deco-flake deco-flake-tr" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" decoding="async">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow" data-i18n="st_eyebrow">A Nossa História</span>
        <h2 class="h2" data-i18n="st_title">Cada criança tem o potencial de alcançar a grandeza.</h2>
        <p class="lead" style="margin-top:16px" data-i18n="st_p1">A Bright Beginnings Academy nasceu em Chimoio com uma convicção simples: cada criança pode ir longe quando aprende num ambiente que a vê, a respeita e a desafia.</p>
        <p class="lead" style="margin-top:12px" data-i18n="st_p2">Desde 2014, crescemos passo a passo — do Early Years ao Ensino Primário e, depois, ao Secundário — até nos tornarmos uma instituição de ensino internacional de referência em Moçambique.</p>
        <p class="lead" style="margin-top:12px" data-i18n="st_p3">Ensinamos com o Oxford International Curriculum, nosso parceiro curricular: uma base de padrão britânico que desenvolve pensamento crítico, criatividade e o gosto de aprender para a vida.</p>
      </div>
      <div class="media reveal">
        <img src="assets/img/alunos-comunidade-bba.jpg" alt="Alunos e professores da Bright Beginnings Academy em Chimoio" loading="lazy">
      </div>
    </div>
    <div class="stats" style="margin-top:clamp(34px,4.5vw,56px)">
      <div class="stat reveal"><b>2014</b><span data-i18n="sa1">Fundação em Chimoio</span></div>
      <div class="stat reveal s-green"><b>2–16</b><span data-i18n="sa2">Idades, do Early Years ao Grade 10</span></div>
      <div class="stat reveal s-red"><b>3</b><span data-i18n="sa3">Níveis de ensino integrados</span></div>
      <div class="stat reveal s-purple"><b>Oxford</b><span data-i18n="sa4">Certificação internacional · desde 2025</span></div>
    </div>
  </div>
</section>

<section class="sec tint">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-red" data-i18n="tl_eyebrow">Marcos</span>
      <h2 class="h2" data-i18n="tl_title">A nossa trajetória</h2>
    </div>
    <div class="tl">
      <div class="tl-item reveal"><div class="yr">2014</div><div class="tt" data-i18n="at1t">Fundação em Chimoio</div><div class="td" data-i18n="at1d">A Bright Beginnings Academy abre as portas em Chimoio.</div></div>
      <div class="tl-item reveal"><div class="yr">2018</div><div class="tt" data-i18n="at2t">Ensino Primário lançado</div><div class="td" data-i18n="at2d">Abertura do Primary e expansão do campus.</div></div>
      <div class="tl-item reveal"><div class="yr">2025</div><div class="tt" data-i18n="at3t">Certificação Oxford International</div><div class="td" data-i18n="at3d">A escola obtém a certificação oficial do currículo de padrão britânico.</div></div>
      <div class="tl-item reveal"><div class="yr">2026</div><div class="tt" data-i18n="at4t">Ensino Secundário consolidado</div><div class="td" data-i18n="at4d">Grades 8–10 e preparação para percursos internacionais.</div></div>
    </div>
  </div>
</section>

<section class="sec sec-deco" id="equipa">
  <img class="deco-flake deco-flake-tl" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" loading="lazy" decoding="async">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-green" data-i18n="stf_eyebrow">Corpo Docente & Equipa</span>
      <h2 class="h2" data-i18n="stf_title">Educadores dedicados ao desenvolvimento de cada aluno.</h2>
      <p class="lead" data-i18n="stf_lead">A nossa equipa pedagógica combina qualificação académica, formação contínua no padrão britânico do Oxford International Curriculum e compromisso com o bem-estar de cada criança em Chimoio.</p>
    </div>
    <div class="staff-grid">
      <div class="staff-card reveal">
        <div class="staff-badge b-green" data-i18n="stf1_badge">Early Years</div>
        <h3 data-i18n="stf1_t">Educadoras de Infância</h3>
        <p data-i18n="stf1_d">Especialistas no desenvolvimento da primeira infância (2–5 anos), com foco em rotinas afetivas, estimulação lúdica e primeiros passos da imersão em língua inglesa.</p>
      </div>
      <div class="staff-card reveal">
        <div class="staff-badge b-blue" data-i18n="stf2_badge">Primary School</div>
        <h3 data-i18n="stf2_t">Professores do Ensino Primário</h3>
        <p data-i18n="stf2_d">Docentes especializados em literacia, numeracia e ciências práticas pelo currículo Oxford, garantindo leitura diária, raciocínio crítico e acompanhamento bilingue individual.</p>
      </div>
      <div class="staff-card reveal">
        <div class="staff-badge b-red" data-i18n="stf3_badge">Secondary School</div>
        <h3 data-i18n="stf3_t">Especialistas do Ensino Secundário</h3>
        <p data-i18n="stf3_d">Professores dedicados às disciplinas académicas dos Grades 8–10, preparando os alunos para o rigor de exames internacionais, metodologia científica e liderança responsável.</p>
      </div>
      <div class="staff-card reveal">
        <div class="staff-badge b-purple" data-i18n="stf4_badge">Direção & Salvaguarda</div>
        <h3 data-i18n="stf4_t">Coordenação & Salvaguarda</h3>
        <p data-i18n="stf4_d">Liderança pedagógica orientada por rigorosos protocolos de proteção infantil (safeguarding), comunicação contínua com os pais e formação docente regular.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec tint">
  <div class="container">
    <div class="split rev">
      <div class="media reveal" style="order:2">
        <img src="assets/img/turma-bba-escola.jpg" alt="Alunos da Bright Beginnings Academy em uniforme escolar" loading="lazy">
      </div>
      <div class="reveal" style="order:1">
        <span class="eyebrow eb-purple" data-i18n="vl_eyebrow">O que nos guia</span>
        <h2 class="h2" data-i18n="vl_title">Bondade, respeito, contributo único, integridade e excelência.</h2>
        <p class="lead" style="margin-top:16px" data-i18n="vl_lead">Todos os dias, a nossa escola é guiada por valores vividos na prática — e pelo lema “Learn to love to learn”.</p>
        <div class="hero-cta" style="margin:24px 0 0">
          <a class="btn btn-outline-blue" href="missao.html">${ICON.arrow}<span data-i18n="vl_btn">Conhecer missão e valores</span></a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="bgimg"><img src="assets/img/early-years.jpg" alt="" loading="lazy"></div>
  <div class="container">
    <div class="cta-in reveal">
      <span class="eyebrow" data-i18n="cta_eyebrow">Venha conhecer</span>
      <h2 data-i18n="cta_title">Venha conhecer a escola por dentro.</h2>
      <p data-i18n="cta_desc">Visita guiada de 30 minutos com a direção: salas, laboratórios e todas as suas perguntas respondidas.</p>
      <div class="hero-cta">
        <a class="btn btn-wa" href="${WA_VISITA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ct_btn1">Agendar visita no WhatsApp</span></a>
        <a class="btn btn-ghost" href="inscricao-2027.html">${ICON.send}<span data-i18n="ab_cta1">Inscrições 2027</span></a>
      </div>
    </div>
  </div>
</section>
`,
};

// ================= PROGRAMMES =================
const programmes = {
  file: "programmes.html",
  active: "programmes.html",
  meta: {
    pt: {
      title: "Programas Académicos | Bright Beginnings Academy — Chimoio",
      desc: "Do Early Years (2–5 anos) ao Primary e Secondary (até ao Grade 10): conheça os três níveis de ensino da Bright Beginnings Academy em Chimoio.",
    },
    en: {
      title: "Academic Programmes | Bright Beginnings Academy — Chimoio",
      desc: "From Early Years (ages 2–5) to Primary and Secondary (up to Grade 10): discover the three teaching levels of Bright Beginnings Academy in Chimoio.",
    },
  },
  dict: {
    pr_title: "From Early Years to Secondary.",
    pr_lead: "Three stages, one pathway: solid foundations, curiosity and preparation for a global future — always with the Oxford International Curriculum.",
    e_eyebrow: "Ages 2–5 · Pre-School",
    e_t: "Early Years: where the love of learning begins",
    e_p: "A safe, playful environment where curiosity begins through play, language and discovery — the first step of “Learn to love to learn”.",
    e_k1: "Safe routines and dedicated educators",
    e_k2: "Language, numbers and motor skills through play",
    e_k3: "English from the start, with bilingual support",
    e_cta: "Apply to Early Years",
    pr1_eyebrow: "Grades 1–7 · Primary",
    pr1_t: "Primary: where curiosity becomes knowledge",
    pr1_p: "A stimulating, welcoming environment where students build solid foundations in English, mathematics and critical thinking, supported by continuous British-standard assessment.",
    pr1_k1: "English, mathematics and science with Oxford rigour",
    pr1_k2: "Daily reading and critical thinking",
    pr1_k3: "Sport, arts and projects from an early age",
    pr1_cta: "Apply to Primary",
    pr2_eyebrow: "Grades 8–10 · Secondary",
    pr2_t: "Secondary: prepared for what comes next",
    pr2_p: "A rigorous academic curriculum, hands-on leadership and preparation for exams, British certifications and international university studies.",
    pr2_k1: "Preparation for exams and British certifications",
    pr2_k2: "Leadership, character and community service",
    pr2_k3: "Guidance towards international universities",
    pr2_cta: "Apply to Secondary",
    oxc_eyebrow: "Curricular partnership",
    oxc_t: "The Oxford Curriculum at every stage",
    oxc_p: "Continuous progression from Early Years to Grade 10, with global recognition. Discover the certified curricular partnership that sets us apart in Chimoio.",
    oxc_btn: "Explore the Oxford Curriculum",
    ox_badge: "Curriculum partner · British standard",
    cq_eyebrow: "Unsure about the right level?",
    cq_t: "Which level is right for your child?",
    cq_p: "Talk to our admissions team or book a 30-minute guided visit — we will help place your child in the right class.",
    cq_b2: "Contacts & location",
    btn_wa: "Contact via WhatsApp",
    ab_cta1: "Apply for 2027",
  },
  body: `
<section class="banner">
  <div class="bbg"><img src="assets/img/campus-hero-bba.jpg" alt="Campus da Bright Beginnings Academy em Chimoio" fetchpriority="high" decoding="async"></div>
  <div class="container">
    <div class="banner-in">
      <div class="bcrumb"><a href="index.html" data-i18n="nav_home">Início</a><span class="sep">→</span><span data-i18n="nav_prog">Programas</span></div>
      <h1 data-i18n="pr_title">Do Early Years ao Secondary.</h1>
      <p class="lead" data-i18n="pr_lead">Três etapas, um só percurso: bases sólidas, curiosidade e preparação para um futuro global — sempre com o Oxford International Curriculum.</p>
      <div class="banner-cta">
        <a class="btn btn-red" href="inscricao-2027.html">${ICON.send}<span data-i18n="ab_cta1">Inscrições 2027</span></a>
        <a class="btn btn-ghost" href="oxford.html">${ICON.book}<span data-i18n="nav_oxford">Currículo Oxford</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="early-years">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow eb-green" data-i18n="e_eyebrow">2–5 anos · Pre-School</span>
        <h2 class="h2" data-i18n="e_t">Early Years: aprender a amar aprender, desde cedo</h2>
        <p class="lead" style="margin-top:16px" data-i18n="e_p">Um ambiente seguro e lúdico onde a curiosidade nasce através do jogo, da linguagem e da descoberta — o primeiro passo do lema “Learn to love to learn”.</p>
        <ul class="ticks">
          <li>${ICON.check}<span data-i18n="e_k1">Rotinas seguras e educadoras dedicadas</span></li>
          <li>${ICON.check}<span data-i18n="e_k2">Linguagem, números e motricidade através do jogo</span></li>
          <li>${ICON.check}<span data-i18n="e_k3">Inglês desde cedo, com apoio bilingue</span></li>
        </ul>
        <div class="hero-cta" style="margin:26px 0 0">
          <a class="btn btn-outline-blue" href="inscricao-2027.html#inscricao-form">${ICON.arrow}<span data-i18n="e_cta">Candidatar ao Early Years</span></a>
        </div>
      </div>
      <div class="media reveal">
        <img src="assets/img/early-years-bba.jpg" alt="Criança do Early Years da Bright Beginnings Academy a pintar" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="sec tint" id="primary">
  <div class="container">
    <div class="split">
      <div class="media reveal">
        <img src="assets/img/primary-leitura-bba.jpg" alt="Aluno do Ensino Primário da Bright Beginnings Academy a ler na biblioteca" loading="lazy">
      </div>
      <div class="reveal">
        <span class="eyebrow" data-i18n="pr1_eyebrow">Grades 1–7 · Primary</span>
        <h2 class="h2" data-i18n="pr1_t">Primary: onde a curiosidade se torna saber</h2>
        <p class="lead" style="margin-top:16px" data-i18n="pr1_p">Um ambiente estimulante e acolhedor onde os alunos constroem bases sólidas em inglês, matemática e raciocínio crítico, com avaliação contínua de padrão britânico.</p>
        <ul class="ticks">
          <li>${ICON.check}<span data-i18n="pr1_k1">Inglês, matemática e ciências com rigor Oxford</span></li>
          <li>${ICON.check}<span data-i18n="pr1_k2">Leitura diária e pensamento crítico</span></li>
          <li>${ICON.check}<span data-i18n="pr1_k3">Desporto, artes e projetos desde cedo</span></li>
        </ul>
        <div class="hero-cta" style="margin:26px 0 0">
          <a class="btn btn-outline-blue" href="inscricao-2027.html#inscricao-form">${ICON.arrow}<span data-i18n="pr1_cta">Candidatar ao Primary</span></a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="secondary">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow eb-red" data-i18n="pr2_eyebrow">Grades 8–10 · Secondary</span>
        <h2 class="h2" data-i18n="pr2_t">Secondary: preparados para o que vem a seguir</h2>
        <p class="lead" style="margin-top:16px" data-i18n="pr2_p">Currículo académico rigoroso, liderança na prática e preparação para exames, certificações britânicas e estudos universitários internacionais.</p>
        <ul class="ticks">
          <li>${ICON.check}<span data-i18n="pr2_k1">Preparação para exames e certificações britânicas</span></li>
          <li>${ICON.check}<span data-i18n="pr2_k2">Liderança, caráter e serviço à comunidade</span></li>
          <li>${ICON.check}<span data-i18n="pr2_k3">Orientação para universidades internacionais</span></li>
        </ul>
        <div class="hero-cta" style="margin:26px 0 0">
          <a class="btn btn-outline-blue" href="inscricao-2027.html#inscricao-form">${ICON.arrow}<span data-i18n="pr2_cta">Candidatar ao Secondary</span></a>
        </div>
      </div>
      <div class="media reveal">
        <img src="assets/img/secondary-turma-bba.jpg" alt="Alunos do Ensino Secundário da Bright Beginnings Academy em uniforme escolar" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="sec tint">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow" data-i18n="oxc_eyebrow">Parceria curricular</span>
        <h2 class="h2" data-i18n="oxc_t">Currículo Oxford em todas as etapas</h2>
        <p class="lead" style="margin-top:16px" data-i18n="oxc_p">Progressão contínua do Early Years ao Grade 10, com reconhecimento global. Conheça a parceria curricular que nos distingue em Chimoio.</p>
        <div class="hero-cta" style="margin:26px 0 0">
          <a class="btn btn-outline-blue" href="oxford.html">${ICON.book}<span data-i18n="oxc_btn">Currículo Oxford</span></a>
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

<section class="cta-band">
  <div class="bgimg"><img src="assets/img/alunos-celebracao-bba.jpg" alt="" loading="lazy"></div>
  <div class="container">
    <div class="cta-in reveal">
      <span class="eyebrow" data-i18n="cq_eyebrow">Dúvidas sobre o nível?</span>
      <h2 data-i18n="cq_t">Qual é o nível certo para o seu filho?</h2>
      <p data-i18n="cq_p">Fale com a equipa de admissões ou agende uma visita guiada de 30 minutos — ajudamos a colocar o seu filho na turma certa.</p>
      <div class="hero-cta">
        <a class="btn btn-wa" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="btn_wa">Falar no WhatsApp</span></a>
        <a class="btn btn-ghost" href="contact.html">${ICON.pin}<span data-i18n="cq_b2">Contactos e localização</span></a>
      </div>
    </div>
  </div>
</section>
`,
};

// ================= OXFORD =================
const oxford = {
  file: "oxford.html",
  active: "oxford.html",
  meta: {
    pt: {
      title: "Currículo Oxford | Bright Beginnings Academy — Chimoio",
      desc: "O Currículo Oxford na Bright Beginnings Academy: escola certificada desde 2025, currículo de padrão britânico do Early Years ao Grade 10 em Chimoio.",
    },
    en: {
      title: "Oxford Curriculum | Bright Beginnings Academy - Chimoio",
      desc: "The Oxford Curriculum at Bright Beginnings Academy in Chimoio: certified since 2025, a British-standard curriculum from Early Years to Grade 10.",
    },
  },
  dict: {
    ox_title: "The Oxford International Curriculum, taught in Chimoio.",
    ox_lead: "Bright Beginnings Academy is a Mozambican school with its own identity — teaching with the Oxford International Curriculum, our British-standard curricular partner.",
    id_eyebrow: "First, our identity",
    id_t: "A school from Chimoio, with a curriculum of the world",
    id_p1: "Bright Beginnings Academy was founded in Chimoio in 2014 and obtained its Oxford International Curriculum certification in 2025. Oxford International is our curricular framework — not the school's name — giving our students a British-standard foundation from Early Years to Grade 10.",
    id_p2: "In practice, this means continuous progression between stages, critical thinking from an early age and direct preparation for exams, British certifications and international universities.",
    id_claim: "We are the only school in Chimoio teaching with the Oxford International Curriculum.",
    id_chip: "Learning with Oxford books",
    id_src: "Official source: Oxford International Curriculum — Oxford University Press",
    ob_eyebrow: "What it brings",
    ob_t: "What the Oxford Curriculum gives your child",
    ob_k1: "Global recognition at universities",
    ob_k2: "Continuous progression from Early Years to Grade 10",
    ob_k3: "Critical reasoning and wellbeing at every age",
    ob_k4: "Direct access to British exams and certifications",
    ob_k5: "The only school in Chimoio with this curriculum",
    ob_b2: "See programmes",
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
    pg_eyebrow: "Progression",
    pg_t: "One continuous pathway",
    pgo1_t: "Early Years", pgo1_d: "Ages 2–5: play, language and discovery.",
    pgo2_t: "Primary", pgo2_d: "Grades 1–7: solid foundations and critical reasoning.",
    pgo3_t: "Secondary", pgo3_d: "Grades 8–10: rigour and leadership.",
    pgo4_t: "Global future", pgo4_d: "British exams and international universities.",
    oq_eyebrow: "Admissions",
    oq_t: "Want the Oxford Curriculum for your child?",
    oq_p: "Applications are open for 2027 at every level — from Early Years to Secondary.",
    ab_cta1: "Apply for 2027",
    btn_apply: "Apply for 2027",
    btn_wa: "Contact via WhatsApp",
    ox_badge: "Curriculum partner · British standard",
  },
  body: `
<section class="banner">
  <div class="bbg"><img src="assets/img/sala-aula-1.jpeg" alt="Aluno a estudar com livro Oxford na Bright Beginnings Academy" fetchpriority="high" decoding="async"></div>
  <div class="container">
    <div class="banner-in">
      <div class="bcrumb"><a href="index.html" data-i18n="nav_home">Início</a><span class="sep">→</span><span data-i18n="nav_oxford">Currículo Oxford</span></div>
      <h1 data-i18n="ox_title">The Oxford International Curriculum, ensinado em Chimoio.</h1>
      <p class="lead" data-i18n="ox_lead">A Bright Beginnings Academy é uma escola moçambicana com identidade própria — e ensina com o Oxford International Curriculum, o nosso parceiro curricular de padrão britânico.</p>
      <div class="banner-cta">
        <a class="btn btn-red" href="inscricao-2027.html">${ICON.send}<span data-i18n="ab_cta1">Inscrições 2027</span></a>
        <a class="btn btn-ghost" href="programmes.html">${ICON.layers}<span data-i18n="ob_b2">Ver programas</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-deco">
  <img class="deco-flake deco-flake-tr" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" loading="lazy" decoding="async">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow" data-i18n="id_eyebrow">Primeiro, a nossa identidade</span>
        <h2 class="h2" data-i18n="id_t">Uma escola de Chimoio, com um currículo do mundo</h2>
        <p class="lead" style="margin-top:16px" data-i18n="id_p1">A Bright Beginnings Academy foi fundada em Chimoio em 2014 e obteve, em 2025, a certificação do Oxford International Curriculum. Oxford International é o enquadramento curricular da escola — não o seu nome — e dá aos nossos alunos uma base de padrão britânico, do Early Years ao Grade 10.</p>
        <p class="lead" style="margin-top:12px" data-i18n="id_p2">Na prática, isto significa progressão contínua entre níveis, pensamento crítico desde cedo e preparação direta para exames, certificações britânicas e universidades internacionais.</p>
        <div class="m-claim" style="margin-top:20px;background:#EAF1FE;border:1.5px solid #C9D7F4;border-radius:var(--r-sm);padding:16px 18px;display:flex;gap:12px;align-items:flex-start;font-weight:600;color:var(--blue-deep);font-size:14.5px;line-height:1.55">${ICON.award}<span data-i18n="id_claim">Somos a única escola em Chimoio a ensinar com o Oxford International Curriculum.</span></div>
        <p class="mini-note" style="margin-top:16px"><a href="https://global.oup.com/education/primary/curricula/oxford-international-curriculum/?region=international" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline" data-i18n="id_src">Fonte oficial: Oxford International Curriculum — Oxford University Press</a></p>
      </div>
      <div class="media reveal">
        <img src="assets/img/sala-aula-1.jpeg" alt="Aluno a estudar com livro Oxford" loading="lazy">
        <div class="m-chip">${ICON.book}<span data-i18n="id_chip">Aprender com livros Oxford</span></div>
      </div>
    </div>
  </div>
</section>

<section class="sec oxford">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow" data-i18n="ob_eyebrow">O que traz</span>
        <h2 class="h2" data-i18n="ob_t">O que o Currículo Oxford dá ao seu filho</h2>
        <ul class="ticks" style="margin-top:22px">
          <li>${ICON.check}<span data-i18n="ob_k1">Reconhecimento global em universidades</span></li>
          <li>${ICON.check}<span data-i18n="ob_k2">Progressão contínua do Early Years ao Grade 10</span></li>
          <li>${ICON.check}<span data-i18n="ob_k3">Raciocínio crítico e bem-estar em todas as idades</span></li>
          <li>${ICON.check}<span data-i18n="ob_k4">Acesso direto a exames e certificações britânicas</span></li>
          <li>${ICON.check}<span data-i18n="ob_k5">A única escola em Chimoio com este currículo</span></li>
        </ul>
        <div class="hero-cta" style="margin-top:28px">
          <a class="btn btn-red" href="inscricao-2027.html">${ICON.send}<span data-i18n="btn_apply">Candidatura 2027</span></a>
          <a class="btn btn-ghost" href="programmes.html">${ICON.layers}<span data-i18n="ob_b2">Ver programas</span></a>
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

<section class="sec ox-spotlight sec-deco">
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
  </div>
</section>

<section class="sec tint">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-green" data-i18n="pg_eyebrow">Progressão</span>
      <h2 class="h2" data-i18n="pg_t">Um percurso contínuo</h2>
    </div>
    <div class="grid g4">
      <div class="card reveal"><div class="ic ic-green">${ICON.heart}</div><h3 data-i18n="pgo1_t">Early Years</h3><p data-i18n="pgo1_d">Dos 2 aos 5 anos: jogo, linguagem e descoberta.</p></div>
      <div class="card reveal"><div class="ic ic-blue">${ICON.book}</div><h3 data-i18n="pgo2_t">Primary</h3><p data-i18n="pgo2_d">Grades 1–7: bases sólidas e raciocínio crítico.</p></div>
      <div class="card reveal"><div class="ic ic-red">${ICON.target}</div><h3 data-i18n="pgo3_t">Secondary</h3><p data-i18n="pgo3_d">Grades 8–10: rigor e liderança.</p></div>
      <div class="card reveal"><div class="ic ic-purple">${ICON.globe}</div><h3 data-i18n="pgo4_t">Futuro global</h3><p data-i18n="pgo4_d">Exames britânicos e universidades internacionais.</p></div>
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="bgimg"><img src="assets/img/sala-aula.jpeg" alt="" loading="lazy"></div>
  <div class="container">
    <div class="cta-in reveal">
      <span class="eyebrow" data-i18n="oq_eyebrow">Admissões</span>
      <h2 data-i18n="oq_t">Quer o currículo Oxford para o seu filho?</h2>
      <p data-i18n="oq_p">Candidaturas abertas para 2027 em todos os níveis — do Early Years ao Secondary.</p>
      <div class="hero-cta">
        <a class="btn btn-red" href="inscricao-2027.html">${ICON.send}<span data-i18n="btn_apply">Candidatura 2027</span></a>
        <a class="btn btn-ghost" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="btn_wa">Falar no WhatsApp</span></a>
      </div>
    </div>
  </div>
</section>
`,
};

// ================= MISSÃO =================
const missao = {
  file: "missao.html",
  active: "missao.html",
  meta: {
    pt: {
      title: "Missão, Visão e Valores | Bright Beginnings Academy — Chimoio",
      desc: "Missão, visão e os 4 valores da Bright Beginnings Academy em Chimoio: bondade, respeito, contributo único, integridade e excelência.",
    },
    en: {
      title: "Vision, Mission & Values | Bright Beginnings Academy - Chimoio",
      desc: "Vision, mission and the 4 values of Bright Beginnings Academy in Chimoio: kindness, respect, unique contribution, integrity and excellence.",
    },
  },
  dict: {
    ms_title: "Shaping today's students, tomorrow's leaders.",
    ms_lead: "Our motto: “Learn to love to learn.”",
    vs_eyebrow: "What guides us",
    vs_t: "Official vision and mission",
    vi_t: "Our Vision",
    vi_p: "A world enriched by our graduates: kindness, respect and unique contributions that leave a positive and lasting impact on society.",
    mi_t: "Our Mission",
    mi_p: "A welcoming, inclusive environment where every student is empowered to:",
    mi_k1: "Embrace values: kindness and mutual respect in every interaction.",
    mi_k2: "Discover potential: recognise and develop unique talents and contributions.",
    mi_k3: "Lead change: academic and social skills to make the world better.",
    va_eyebrow: "The 4 values",
    va_t: "How we live, every day",
    v1_t: "01 · Kindness",
    v1_d: "The heart of our school: empathy so everyone feels seen and valued.",
    v1_p: "In practice: peer support and emotional intelligence.",
    v2_t: "02 · Respect",
    v2_d: "The foundation of our community: we honour every person, the environment and excellence.",
    v2_p: "In practice: safeguarding, conduct and sustainability.",
    v3_t: "03 · Unique Contribution",
    v3_d: "The spark of innovation: every child has a gift — we empower leaders, not followers.",
    v3_p: "In practice: personalised teaching and celebrated achievements.",
    v4_t: "04 · Integrity & Excellence",
    v4_d: "The path to a better world: honesty and the highest academic and personal standards.",
    v4_p: "In practice: transparency and a rigorous curriculum.",
    vq_eyebrow: "Come visit",
    vq_t: "Come and see the school from the inside.",
    vq_p: "A 30-minute guided visit: classrooms, laboratories and a conversation with the leadership.",
    ab_cta1: "Apply for 2027",
    btn_wa: "Contact via WhatsApp",
    ct_btn1: "Book a visit on WhatsApp",
  },
  body: `
<section class="banner">
  <div class="bbg"><img src="assets/img/foto-real-escola.jpg" alt="Entrada real da Bright Beginnings Academy em Chimoio" fetchpriority="high" decoding="async"></div>
  <div class="container">
    <div class="banner-in">
      <div class="bcrumb"><a href="index.html" data-i18n="nav_home">Início</a><span class="sep">→</span><span data-i18n="nav_missao">Missão & Valores</span></div>
      <h1 data-i18n="ms_title">A formar os alunos de hoje, líderes de amanhã.</h1>
      <p class="lead" data-i18n="ms_lead">O nosso lema: “Learn to love to learn” — aprender a amar aprender.</p>
      <div class="banner-cta">
        <a class="btn btn-red" href="inscricao-2027.html">${ICON.send}<span data-i18n="ab_cta1">Inscrições 2027</span></a>
        <a class="btn btn-ghost" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="btn_wa">Falar no WhatsApp</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-deco">
  <img class="deco-flake deco-flake-tr" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" decoding="async">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow" data-i18n="vs_eyebrow">O que nos guia</span>
      <h2 class="h2" data-i18n="vs_t">Visão e missão oficiais</h2>
    </div>
    <div class="grid g2">
      <div class="card reveal">
        <div class="ic ic-blue">${ICON.star}</div>
        <h3 data-i18n="vi_t">A Nossa Visão</h3>
        <p data-i18n="vi_p">Um mundo enriquecido pelos nossos graduados: bondade, respeito e contributos únicos que deixam um impacto positivo e duradouro na sociedade.</p>
      </div>
      <div class="card reveal">
        <div class="ic ic-green">${ICON.compass}</div>
        <h3 data-i18n="mi_t">A Nossa Missão</h3>
        <p data-i18n="mi_p">Um ambiente acolhedor e inclusivo onde cada aluno é capacitado para:</p>
        <ul class="ticks" style="margin-top:16px">
          <li>${ICON.check}<span data-i18n="mi_k1">Abraçar valores: bondade e respeito mútuo em todas as interações.</span></li>
          <li>${ICON.check}<span data-i18n="mi_k2">Descobrir potencial: reconhecer e desenvolver talentos e contributos únicos.</span></li>
          <li>${ICON.check}<span data-i18n="mi_k3">Liderar a mudança: competências académicas e sociais para tornar o mundo melhor.</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="sec tint">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-red" data-i18n="va_eyebrow">Os 4 valores</span>
      <h2 class="h2" data-i18n="va_t">Como vivemos, todos os dias</h2>
    </div>
    <div class="grid g2">
      <div class="card reveal">
        <div class="ic ic-red">${ICON.heart}</div>
        <h3 data-i18n="v1_t">01 · Bondade</h3>
        <p data-i18n="v1_d">O coração da nossa escola: empatia para que cada um se sinta visto e valorizado.</p>
        <p style="margin-top:8px"><strong data-i18n="v1_p">Na prática: apoio entre pares e inteligência emocional.</strong></p>
      </div>
      <div class="card reveal">
        <div class="ic ic-blue">${ICON.users}</div>
        <h3 data-i18n="v2_t">02 · Respeito</h3>
        <p data-i18n="v2_d">A base da comunidade: honramos cada pessoa, o ambiente e a excelência.</p>
        <p style="margin-top:8px"><strong data-i18n="v2_p">Na prática: salvaguarda, conduta e sustentabilidade.</strong></p>
      </div>
      <div class="card reveal">
        <div class="ic ic-yellow">${ICON.zap}</div>
        <h3 data-i18n="v3_t">03 · Contributo Único</h3>
        <p data-i18n="v3_d">A faísca da inovação: cada criança tem um dom — capacitamos líderes, não seguidores.</p>
        <p style="margin-top:8px"><strong data-i18n="v3_p">Na prática: ensino personalizado e conquistas celebradas.</strong></p>
      </div>
      <div class="card reveal">
        <div class="ic ic-purple">${ICON.target}</div>
        <h3 data-i18n="v4_t">04 · Integridade & Excelência</h3>
        <p data-i18n="v4_d">O caminho para um mundo melhor: honestidade e máximo rigor académico e pessoal.</p>
        <p style="margin-top:8px"><strong data-i18n="v4_p">Na prática: transparência e currículo rigoroso.</strong></p>
      </div>
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="bgimg"><img src="assets/img/alunos-comunidade-bba.jpg" alt="" loading="lazy"></div>
  <div class="container">
    <div class="cta-in reveal">
      <span class="eyebrow" data-i18n="vq_eyebrow">Venha conhecer</span>
      <h2 data-i18n="vq_t">Venha conhecer a escola por dentro.</h2>
      <p data-i18n="vq_p">Visita guiada de 30 minutos: salas, laboratórios e conversa com a direção.</p>
      <div class="hero-cta">
        <a class="btn btn-wa" href="${WA_VISITA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ct_btn1">Agendar visita no WhatsApp</span></a>
        <a class="btn btn-ghost" href="index.html"><span data-i18n="nav_home">Início</span></a>
      </div>
    </div>
  </div>
</section>
`,
};

module.exports = { about, programmes, oxford, missao };
