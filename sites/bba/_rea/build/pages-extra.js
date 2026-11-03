// Páginas: inscricao-2027, contact, gallery, noticia
"use strict";
const { ICON, WA_VISITA, WA_SECRETARIA } = require("./shell");

// ================= INSCRIÇÃO 2027 =================
const inscricao = {
  file: "inscricao-2027.html",
  active: "inscricao-2027.html",
  meta: {
    pt: {
      title: "Inscrições Abertas 2027 | Bright Beginnings Academy — Chimoio",
      desc: "Inscrições abertas para 2027 na Bright Beginnings Academy, Chimoio: Early Years, Primary e Secondary com o Currículo Oxford. Fale connosco no WhatsApp.",
    },
    en: {
      title: "Admissions Open 2027 | Bright Beginnings Academy - Chimoio",
      desc: "Admissions open for 2027 at Bright Beginnings Academy, Chimoio: Early Years, Primary and Secondary with the Oxford Curriculum. Contact us on WhatsApp.",
    },
  },
  dict: {
    ins_title: "Admissions open for 2027.",
    ins_lead: "From Early Years to Grade 10 with the Oxford International Curriculum: small classes, English with Portuguese support and a community that knows every student by name.",
    ins_cta1: "Pre-enrolment 2027",
    ins_cta2: "Admissions office on WhatsApp",
    in1_t: "Limited places per class",
    in1_d: "Small classes and individual attention — first come, first choice of shift.",
    in2_t: "Guided campus visit",
    in2_d: "See the classrooms, the laboratories and our team before deciding. Rua 17 de Julho, Chimoio.",
    in3_t: "Reply within 24 hours",
    in3_d: "Send your request by form or WhatsApp — our office replies on the next business day.",
    cm_eyebrow: "How it works",
    cm_t: "Enrolment in 3 steps",
    cm_lead: "No queues, no lost paperwork: everything starts with a conversation and ends with a secured place.",
    nv_eyebrow: "Teaching levels",
    nv_t: "From the first school day to Secondary",
    nv_lead: "Continuous progression on the same campus, with the same Oxford standard.",
    n1_age: "Ages 2–5",
    n1_t: "Early Years",
    n1_d: "Learning through play: language, numbers and social skills, built on safe, caring routines.",
    n2_age: "Grades 1–7",
    n2_t: "Primary",
    n2_d: "English, mathematics and critical thinking with bilingual support and close follow-up.",
    n3_age: "Grades 8–10",
    n3_t: "Secondary",
    n3_d: "Academic rigour, leadership and preparation for international higher education.",
    n_cta: "Pre-enrol",
    dc_eyebrow: "Get ready",
    dc_t: "Documents for enrolment",
    dc_lead: "A guideline checklist — our office will confirm any additional documents for your case on WhatsApp.",
    dc1: "Birth certificate or student ID (copy)",
    dc2: "Report card from the previous year (from Primary onwards)",
    dc3: "2 passport-sized photos of the student",
    dc4: "Guardian ID (copy)",
    dc5: "Proof of address or updated contact",
    dc6: "Vaccination card (Early Years)",
    dc_note: "The 2027 fee schedule is provided directly by the admissions office — no obligation, no small print.",
    fq_eyebrow: "FAQ",
    fq_t: "Questions parents ask",
    fq_lead: "Short answers — for everything else, our office replies on WhatsApp.",
    fm_eyebrow: "Pre-enrolment 2027",
    fm_t: "Request your child's place",
    fm_lead: "Complete the form and press send — WhatsApp opens with the message ready for our office.",
    lbl_nome: "Parent / guardian name",
    lbl_tel: "Phone / WhatsApp",
    lbl_aluno: "Student's name",
    lbl_nivel: "Level in 2027",
    lbl_opt: "Select…",
    opt1: "Early Years (ages 2–5)",
    opt2: "Primary (Grades 1–7)",
    opt3: "Secondary (Grades 8–10)",
    lbl_msg: "Message (optional)",
    fm_btn: "Send pre-enrolment on WhatsApp",
    fm_note: "WhatsApp opens with the message ready — our office replies within 24 business hours.",
    ok_t: "Thank you! We received your pre-enrolment.",
    ok_d: "Our office will contact you within 24 business hours. If WhatsApp did not open, reach us directly:",
    ok_wa: "Open WhatsApp now",
    side_t: "Admissions office",
    side_h: "Mon–Fri, 07:30–16:00.",
    side_btn: "Book a visit",
  },
  body: `
<section class="banner">
  <div class="bbg"><img src="assets/img/alunos-comunidade-bba.jpg" alt="Alunos e professores da Bright Beginnings Academy em Chimoio" fetchpriority="high" decoding="async"></div>
  <div class="container">
    <div class="banner-in">
      <div class="bcrumb"><a href="index.html" data-i18n="nav_home">Início</a><span class="sep">→</span><span data-i18n="f_insc">Inscrições 2027</span></div>
      <h1 data-i18n="ins_title">Inscrições Abertas para 2027.</h1>
      <p class="lead" data-i18n="ins_lead">Do Early Years ao Grade 10 com Oxford International Curriculum: turmas pequenas, inglês com apoio em português e uma comunidade que conhece cada aluno pelo nome.</p>
      <div class="banner-cta">
        <a class="btn btn-red" href="#inscricao-form">${ICON.send}<span data-i18n="ins_cta1">Pré-inscrição 2027</span></a>
        <a class="btn btn-ghost" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ins_cta2">WhatsApp da secretaria</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-deco">
  <img class="deco-flake deco-flake-tr" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" decoding="async">
  <div class="container">
    <div class="grid g3">
      <div class="card reveal"><div class="ic ic-red">${ICON.users}</div><h3 data-i18n="in1_t">Vagas limitadas por turma</h3><p data-i18n="in1_d">Turmas pequenas para atenção individual — quem chega primeiro escolhe o turno.</p></div>
      <div class="card reveal"><div class="ic ic-blue">${ICON.pin}</div><h3 data-i18n="in2_t">Visita guiada ao campus</h3><p data-i18n="in2_d">Conheça salas, laboratórios e equipa antes de decidir. Rua 17 de Julho, Chimoio.</p></div>
      <div class="card reveal"><div class="ic ic-green">${ICON.clock}</div><h3 data-i18n="in3_t">Resposta em 24 horas</h3><p data-i18n="in3_d">Pedido pelo formulário ou WhatsApp com retorno da secretaria no dia útil seguinte.</p></div>
    </div>
  </div>
</section>

<section class="sec tint-b">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow" data-i18n="cm_eyebrow">Como funciona</span>
      <h2 class="h2" data-i18n="cm_t">Matrícula em 3 passos</h2>
      <p class="lead" data-i18n="cm_lead">Sem filas nem papelada perdida: tudo começa numa conversa e termina com a vaga garantida.</p>
    </div>
    <div class="steps">
      <div class="step reveal"><div class="n">1</div><h3 data-i18n="m1_t">Fale connosco</h3><p data-i18n="m1_d">Preencha a pré-inscrição ou chame no WhatsApp +258 844 277 021. Agendamos a visita guiada no melhor dia para a família.</p></div>
      <div class="step reveal"><div class="n">2</div><h3 data-i18n="m2_t">Visite e entregue documentos</h3><p data-i18n="m2_d">Conheça o campus, converse com a direção e entregue a lista de documentos. No Primary há uma conversa de nivelamento.</p></div>
      <div class="step reveal"><div class="n">3</div><h3 data-i18n="m3_t">Confirme a vaga</h3><p data-i18n="m3_d">Com a documentação validada, a secretaria confirma a matrícula para 2027 e indica turma, material e datas.</p></div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-green" data-i18n="nv_eyebrow">Níveis de ensino</span>
      <h2 class="h2" data-i18n="nv_t">Do primeiro dia de aulas ao secundário</h2>
      <p class="lead" data-i18n="nv_lead">Progressão contínua no mesmo campus, com o mesmo padrão Oxford.</p>
    </div>
    <div class="pgrid">
      <article class="pcard reveal">
        <div class="ph"><span class="tag" data-i18n="n1_age">2 – 5 anos</span><img src="assets/img/early-years-bba.jpg" alt="Criança do Early Years da Bright Beginnings Academy a pintar" loading="lazy"></div>
        <div class="bd">
          <h3 data-i18n="n1_t">Early Years</h3>
          <p data-i18n="n1_d">Aprender a brincar: linguagem, números e socialização numa base afetiva e segura.</p>
          <a class="tlink" href="#inscricao-form">${ICON.arrow}<span data-i18n="n_cta">Pré-inscrever</span></a>
        </div>
      </article>
      <article class="pcard reveal">
        <div class="ph"><span class="tag" data-i18n="n2_age">Grades 1 – 7</span><img src="assets/img/primary-leitura-bba.jpg" alt="Aluno do Primary na Bright Beginnings Academy a ler na biblioteca" loading="lazy"></div>
        <div class="bd">
          <h3 data-i18n="n2_t">Primary</h3>
          <p data-i18n="n2_d">Inglês, matemática e pensamento crítico com apoio bilingue e acompanhamento próximo.</p>
          <a class="tlink" href="#inscricao-form">${ICON.arrow}<span data-i18n="n_cta">Pré-inscrever</span></a>
        </div>
      </article>
      <article class="pcard reveal">
        <div class="ph"><span class="tag" data-i18n="n3_age">Grades 8 – 10</span><img src="assets/img/secondary-turma-bba.jpg" alt="Alunos do Secondary da Bright Beginnings Academy em uniforme escolar" loading="lazy"></div>
        <div class="bd">
          <h3 data-i18n="n3_t">Secondary</h3>
          <p data-i18n="n3_d">Rigor académico, liderança e preparação para estudos superiores internacionais.</p>
          <a class="tlink" href="#inscricao-form">${ICON.arrow}<span data-i18n="n_cta">Pré-inscrever</span></a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="sec tint">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow eb-red" data-i18n="dc_eyebrow">Prepare-se</span>
        <h2 class="h2" data-i18n="dc_t">Documentos para a matrícula</h2>
        <p class="lead" style="margin-top:16px" data-i18n="dc_lead">Lista orientativa — a secretaria confirma o que falta no seu caso pelo WhatsApp.</p>
        <ul class="ticks" style="margin-top:22px">
          <li>${ICON.file}<span data-i18n="dc1">Certidão de nascimento ou BI do aluno (cópia)</span></li>
          <li>${ICON.file}<span data-i18n="dc2">Boletim de notas do ano anterior (a partir do Primary)</span></li>
          <li>${ICON.file}<span data-i18n="dc3">2 fotografias tipo passe do aluno</span></li>
          <li>${ICON.file}<span data-i18n="dc4">BI do encarregado de educação (cópia)</span></li>
          <li>${ICON.file}<span data-i18n="dc5">Comprovativo de morada ou contacto atualizado</span></li>
          <li>${ICON.file}<span data-i18n="dc6">Cartão de vacinas (Early Years)</span></li>
        </ul>
      </div>
      <div class="reveal">
        <div class="side-card" style="background:#fff">
          <div class="ic ic-yellow">${ICON.award}</div>
          <h3 data-i18n="side_nc_t">Sem compromisso</h3>
          <p style="color:var(--ink-2);line-height:1.7;font-size:14.5px" data-i18n="dc_note">Valores de mensalidades e taxas 2027 são informados diretamente pela secretaria, sem compromisso e sem letras pequenas.</p>
          <a class="btn btn-wa btn-sm" style="margin-top:16px" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="side_btn">Agendar visita</span></a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-purple" data-i18n="fq_eyebrow">Dúvidas frequentes</span>
      <h2 class="h2" data-i18n="fq_t">Perguntas que os pais fazem</h2>
      <p class="lead" data-i18n="fq_lead">Respostas curtas — para o resto, a secretaria responde no WhatsApp.</p>
    </div>
    <div class="faq reveal">
      <details>
        <summary data-i18n="q1">Em que língua são as aulas?</summary>
        <div class="fa" data-i18n="a1">As aulas são em inglês, com apoio em português para quem está a começar. É o modelo bilingue da escola desde a fundação.</div>
      </details>
      <details>
        <summary data-i18n="q2">Como visito a escola antes de decidir?</summary>
        <div class="fa" data-i18n="a2">Preencha a pré-inscrição ou chame +258 844 277 021 e agendamos a visita guiada: Rua 17 de Julho, Bairro Emília Dausse, Chimoio, seg–sex 07:30–16:00.</div>
      </details>
      <details>
        <summary data-i18n="q3">Há teste de admissão?</summary>
        <div class="fa" data-i18n="a3">Do Primary em diante há uma conversa de nivelamento para conhecer o aluno — não é exame eliminatório, serve para o colocar na turma certa.</div>
      </details>
      <details>
        <summary data-i18n="q4">Que idades aceitam em cada nível?</summary>
        <div class="fa" data-i18n="a4">Early Years: 2–5 anos. Primary: Grades 1–7. Secondary: Grades 8–10 (até cerca de 16 anos).</div>
      </details>
      <details>
        <summary data-i18n="q5">Como sei os valores de 2027?</summary>
        <div class="fa" data-i18n="a5">A secretaria envia o preçário atualizado pelo WhatsApp ou na visita, sem compromisso e sem letras pequenas.</div>
      </details>
    </div>
  </div>
</section>

<section class="sec tint-b" id="inscricao-form">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-red" data-i18n="fm_eyebrow">Pré-inscrição 2027</span>
      <h2 class="h2" data-i18n="fm_t">Peça a vaga do seu filho</h2>
      <p class="lead" data-i18n="fm_lead">Preencha e toque em enviar — abrimos o WhatsApp com a mensagem pronta para a secretaria.</p>
    </div>
    <div class="split" style="align-items:start">
      <form class="form-card reveal" data-wa="Olá! Quero fazer a pré-inscrição 2027 na Bright Beginnings Academy.">
        <div class="field">
          <label for="nome" data-i18n="lbl_nome">Nome do encarregado <span class="req">*</span></label>
          <input class="input" type="text" id="nome" name="nome" required autocomplete="name">
        </div>
        <div class="field">
          <label for="telefone" data-i18n="lbl_tel">Telefone / WhatsApp <span class="req">*</span></label>
          <input class="input" type="tel" id="telefone" name="telefone" required autocomplete="tel">
        </div>
        <div class="field">
          <label for="aluno" data-i18n="lbl_aluno">Nome do aluno</label>
          <input class="input" type="text" id="aluno" name="aluno">
        </div>
        <div class="field">
          <label for="nivel" data-i18n="lbl_nivel">Nível em 2027 <span class="req">*</span></label>
          <select id="nivel" name="nivel" required>
            <option value="" data-i18n="lbl_opt">Selecione…</option>
            <option value="Early Years (2–5 anos)" data-i18n="opt1">Early Years (2–5 anos)</option>
            <option value="Primary (Grades 1–7)" data-i18n="opt2">Primary (Grades 1–7)</option>
            <option value="Secondary (Grades 8–10)" data-i18n="opt3">Secondary (Grades 8–10)</option>
          </select>
        </div>
        <div class="field">
          <label for="mensagem" data-i18n="lbl_msg">Mensagem (opcional)</label>
          <textarea id="mensagem" name="mensagem"></textarea>
        </div>
        <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off">
        <label class="consent"><input type="checkbox" required> <span data-i18n="ct_consent">Li e aceito a <a href="privacy.html">Política de Privacidade</a> e autorizo o contacto sobre esta pré-inscrição.</span></label>
        <button class="btn btn-red btn-block" type="submit">${ICON.wa}<span data-i18n="fm_btn">Enviar pré-inscrição no WhatsApp</span></button>
        <p class="mini-note" style="margin-top:12px" data-i18n="fm_note">O WhatsApp abre com a mensagem pronta — resposta da secretaria em até 24 horas úteis.</p>
        <div class="form-ok" tabindex="-1" role="status">
          <strong data-i18n="ok_t">Obrigado! Recebemos a sua pré-inscrição.</strong>
          <span data-i18n="ok_d">A secretaria responde em até 24 horas úteis. Se o WhatsApp não abriu, fale connosco diretamente:</span>
          <span class="ok-extra" style="display:block;margin-top:10px"><a class="btn btn-wa btn-sm" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ok_wa">Abrir WhatsApp agora</span></a></span>
        </div>
      </form>
      <div class="form-side reveal">
        <div class="side-card">
          <h3 data-i18n="side_t">Secretaria de Admissões</h3>
          <div class="sline">${ICON.clock}<span data-i18n="side_h">Atendimento seg–sex, 07:30–16:00.</span></div>
          <div class="sline">${ICON.phone}<a href="tel:+258844277021">+258 844 277 021</a></div>
          <div class="sline">${ICON.mail}<a href="mailto:admin@bba.edu.mz">admin@bba.edu.mz</a></div>
          <div class="sline">${ICON.pin}<span>Rua 17 de Julho, Bairro Emília Dausse, Chimoio</span></div>
          <a class="btn btn-outline-blue btn-sm" style="margin-top:8px" href="${WA_VISITA}" target="_blank" rel="noopener">${ICON.calendar}<span data-i18n="side_btn">Agendar visita</span></a>
        </div>
        <div class="side-card" style="background:#fff">
          <div class="ic ic-blue">${ICON.shieldCheck}</div>
          <h3 data-i18n="side_dp_t">Dados protegidos</h3>
          <p style="color:var(--ink-2);line-height:1.7;font-size:14px" data-i18n="side_priv">Só usamos os seus dados para responder a este pedido. Sem publicidade. <a href="privacy.html">Ver Política de Privacidade</a>.</p>
        </div>
      </div>
    </div>
  </div>
</section>
`,
};

// ================= CONTACTO =================
const contact = {
  file: "contact.html",
  active: "contact.html",
  meta: {
    pt: {
      title: "Contacto & Admissões | Bright Beginnings Academy — Chimoio",
      desc: "Fale com a secretaria da Bright Beginnings Academy em Chimoio: telefone/WhatsApp +258 844 277 021, admin@bba.edu.mz, Rua 17 de Julho, Bairro Emília Dausse.",
    },
    en: {
      title: "Contact & Admissions | Bright Beginnings Academy - Chimoio",
      desc: "Contact Bright Beginnings Academy in Chimoio, Mozambique: phone/WhatsApp +258 844 277 021, admin@bba.edu.mz, Rua 17 de Julho, Bairro Emília Dausse.",
    },
  },
  dict: {
    co_title: "Contacts & Admissions",
    co_lead: "Schedule a visit, speak with our admissions team or send your enquiry on WhatsApp — in Portuguese or English.",
    co_wa: "Chat with Admissions",
    co_map: "View campus location",
    w_eyebrow: "Contact channels",
    w_t: "Four ways to reach us",
    w_lead: "Our school office in Chimoio is open throughout the working day to assist families.",
    w1_t: "Telephone office",
    w1_d: "Speak directly with our front office team.",
    w2_t: "Official WhatsApp",
    w2_d: "Prompt answers on fees, visiting hours and admissions.",
    w2_l: "Open WhatsApp chat",
    w3_t: "Email enquiries",
    w3_d: "Academic enquiries, transcripts and official records.",
    w4_t: "In-person visit",
    w4_d: "Rua 17 de Julho, Bairro Emília Dausse, Chimoio, Mozambique.",
    w4_l: "View on map",
    fm_eyebrow: "Direct contact",
    fm_t: "Send us an enquiry",
    fm_lead: "Submit your details and our team will contact you on WhatsApp or phone.",
    fm_btn: "Send enquiry on WhatsApp",
    lbl_nome: "Parent / guardian name",
    lbl_tel: "Phone / WhatsApp",
    lbl_aluno: "Student's name (optional)",
    lbl_nivel: "Academic stage of interest",
    lbl_opt: "Select stage…",
    opt1: "Early Years (ages 2–5)",
    opt2: "Primary (Grades 1–7)",
    opt3: "Secondary (Grades 8–10)",
    lbl_msg: "Message or enquiry",
    ok_t: "Thank you. We have received your message.",
    ok_d: "Our team will contact you on the next business day. If WhatsApp did not open, reach us directly:",
    ok_wa: "Open WhatsApp now",
    side_t: "Admissions hours & guidelines",
    side_h1: "Office consultation — Monday to Friday, 07:30 to 16:00.",
    side_h2: "Campus tours — Tuesdays and Thursdays, 09:00 to 11:30, by appointment.",
    side_h3: "Placement conversations are scheduled at registration, from Primary onwards.",
    side_soc: "Follow our school life",
    side_socd: "Daily moments, announcements and events on our official channels.",
    map_eyebrow: "Geographic location",
    map_t: "Our campus in Chimoio",
    map_p: "Located on Rua 17 de Julho, Bairro Emília Dausse, Chimoio, Manica Province.",
    map_btn: "Open in Google Maps",
    map_dir: "Get Directions",
    map_hours: "Office hours: Monday to Friday · 07:30 to 16:00",
    map_addr_title: "Campus Address",
    map_note: "Dedicated student drop-off area on site.",
  },
  body: `
<section class="banner">
  <div class="bbg"><img src="assets/img/alunos-celebracao-bba.jpg" alt="Comunidade da Bright Beginnings Academy na Rua 17 de Julho" fetchpriority="high" decoding="async"></div>
  <div class="container">
    <div class="banner-in">
      <div class="bcrumb"><a href="index.html" data-i18n="nav_home">Início</a><span class="sep">→</span><span data-i18n="nav_contact">Contacto</span></div>
      <h1 data-i18n="co_title">Contactos e Admissões</h1>
      <p class="lead" data-i18n="co_lead">Agende uma visita, fale com a equipa de admissões ou envie o seu pedido por WhatsApp — em português ou inglês.</p>
      <div class="banner-cta">
        <a class="btn btn-wa" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="co_wa">Falar com as Admissões</span></a>
        <a class="btn btn-ghost" href="#mapa">${ICON.pin}<span data-i18n="co_map">Ver localização</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-deco">
  <img class="deco-flake deco-flake-tr" src="assets/img/bba-emblem-watermark.png" alt="" aria-hidden="true" width="256" height="256" decoding="async">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow" data-i18n="w_eyebrow">Linhas de contacto</span>
      <h2 class="h2" data-i18n="w_t">Quatro formas de falar connosco</h2>
      <p class="lead" data-i18n="w_lead">O nosso escritório em Chimoio está aberto em horário normal de trabalho para apoiar as famílias.</p>
    </div>
    <div class="ways">
      <div class="way reveal">
        <div class="ic ic-blue">${ICON.phone}</div>
        <h3 data-i18n="w1_t">Telefone da secretaria</h3>
        <p data-i18n="w1_d">Consulta direta por telefone com o atendimento da escola.</p>
        <a class="tlink" href="tel:+258844277021">${ICON.arrow}<span>+258 844 277 021</span></a>
      </div>
      <div class="way reveal">
        <div class="ic ic-green">${ICON.wa}</div>
        <h3 data-i18n="w2_t">WhatsApp oficial</h3>
        <p data-i18n="w2_d">Resposta imediata sobre valores, horários de visita e matrículas.</p>
        <a class="tlink" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.arrow}<span data-i18n="w2_l">Abrir conversa</span></a>
      </div>
      <div class="way reveal">
        <div class="ic ic-yellow">${ICON.mail}</div>
        <h3 data-i18n="w3_t">Email</h3>
        <p data-i18n="w3_d">Questões académicas, documentos e registos oficiais.</p>
        <a class="tlink" href="mailto:admin@bba.edu.mz">${ICON.arrow}<span>admin@bba.edu.mz</span></a>
      </div>
      <div class="way reveal">
        <div class="ic ic-red">${ICON.pin}</div>
        <h3 data-i18n="w4_t">Visita presencial</h3>
        <p data-i18n="w4_d">Rua 17 de Julho, Bairro Emília Dausse, Chimoio, Moçambique.</p>
        <a class="tlink" href="#mapa">${ICON.arrow}<span data-i18n="w4_l">Ver no mapa</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec tint-b">
  <div class="container">
    <div class="split" style="align-items:start">
      <form class="form-card reveal" data-wa="Olá! Envio este pedido pelo site da Bright Beginnings Academy.">
        <span class="eyebrow" data-i18n="fm_eyebrow">Contacto direto</span>
        <h2 class="h2" style="font-size:clamp(22px,2.6vw,30px);margin-bottom:6px" data-i18n="fm_t">Envie-nos uma mensagem</h2>
        <p class="lead" style="font-size:15px;margin-bottom:22px" data-i18n="fm_lead">Deixe os seus dados e a nossa equipa contacta-o por WhatsApp ou telefone.</p>
        <div class="field">
          <label for="nome" data-i18n="lbl_nome">Nome do encarregado <span class="req">*</span></label>
          <input class="input" type="text" id="nome" name="nome" required autocomplete="name">
        </div>
        <div class="field">
          <label for="telefone" data-i18n="lbl_tel">Telefone / WhatsApp <span class="req">*</span></label>
          <input class="input" type="tel" id="telefone" name="telefone" required autocomplete="tel">
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input class="input" type="email" id="email" name="email" autocomplete="email">
        </div>
        <div class="field">
          <label for="nivel" data-i18n="lbl_nivel">Nível de interesse <span class="req">*</span></label>
          <select id="nivel" name="nivel" required>
            <option value="" data-i18n="lbl_opt">Selecione…</option>
            <option value="Early Years (2–5 anos)" data-i18n="opt1">Early Years (2–5 anos)</option>
            <option value="Primary (Grades 1–7)" data-i18n="opt2">Primary (Grades 1–7)</option>
            <option value="Secondary (Grades 8–10)" data-i18n="opt3">Secondary (Grades 8–10)</option>
          </select>
        </div>
        <div class="field">
          <label for="mensagem" data-i18n="lbl_msg">Mensagem</label>
          <textarea id="mensagem" name="mensagem"></textarea>
        </div>
        <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off">
        <label class="consent"><input type="checkbox" required> <span data-i18n="ct_consent">Li e aceito a <a href="privacy.html">Política de Privacidade</a> e autorizo o contacto sobre este pedido.</span></label>
        <button class="btn btn-wa btn-block" type="submit">${ICON.wa}<span data-i18n="fm_btn">Enviar mensagem no WhatsApp</span></button>
        <div class="form-ok" tabindex="-1" role="status" style="margin-top:14px">
          <strong data-i18n="ok_t">Obrigado. Recebemos a sua mensagem.</strong>
          <span data-i18n="ok_d">A equipa contacta-o no próximo dia útil. Se o WhatsApp não abriu, fale connosco diretamente:</span>
          <span class="ok-extra" style="display:block;margin-top:10px"><a class="btn btn-wa btn-sm" href="${WA_SECRETARIA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ok_wa">Abrir WhatsApp agora</span></a></span>
        </div>
      </form>
      <div class="form-side reveal">
        <div class="side-card">
          <h3 data-i18n="side_t">Atendimento e visitas</h3>
          <div class="sline">${ICON.clock}<span data-i18n="side_h1">Escritório: segunda a sexta, 07:30 às 16:00.</span></div>
          <div class="sline">${ICON.calendar}<span data-i18n="side_h2">Visitas guiadas: terças e quintas, 09:00 às 11:30, com marcação.</span></div>
          <div class="sline">${ICON.note}<span data-i18n="side_h3">Conversas de nivelamento agendadas na inscrição (do Primary em diante).</span></div>
          <a class="btn btn-outline-blue btn-sm" style="margin-top:8px" href="${WA_VISITA}" target="_blank" rel="noopener">${ICON.calendar}<span data-i18n="side_btn">Agendar visita</span></a>
        </div>
        <div class="side-card" style="background:#fff">
          <h3 data-i18n="side_soc">Siga a vida escolar</h3>
          <p style="color:var(--ink-2);font-size:14px;line-height:1.65;margin-bottom:14px" data-i18n="side_socd">Momentos diários, anúncios e eventos nos canais oficiais.</p>
          <div class="f-social" style="margin-top:0">
            <a href="https://www.facebook.com/profile.php?id=61594581886025" target="_blank" rel="noopener" aria-label="Facebook" style="background:#EAF1FE;border-color:#D5E2FB;color:var(--blue)">${ICON.fb}</a>
            <a href="https://www.instagram.com/bright_bba_oficial" target="_blank" rel="noopener" aria-label="Instagram" style="background:#FDECEE;border-color:#F8D8DC;color:var(--red)">${ICON.ig}</a>
            <a href="https://www.tiktok.com/@nussy25" target="_blank" rel="noopener" aria-label="TikTok" style="background:#F0EAFE;border-color:#E2D6FD;color:var(--purple)">${ICON.tt}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="mapa">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow eb-green" data-i18n="map_eyebrow">Localização</span>
      <h2 class="h2" data-i18n="map_t">O nosso campus em Chimoio</h2>
      <p class="lead" data-i18n="map_p">Na Rua 17 de Julho, Bairro Emília Dausse, Chimoio, província de Manica.</p>
    </div>
    <div class="map-grid">
      <div class="map-info-card">
        <div>
          <span class="eyebrow eb-blue" style="margin-bottom:8px" data-i18n="map_addr_title">Endereço do Campus</span>
          <h3>Bright Beginnings Academy</h3>
          <div class="map-info-item">
            ${ICON.pin}
            <div>
              <strong>Rua 17 de Julho, Bairro Emília Dausse</strong><br>
              <span>Chimoio, Província de Manica, Moçambique</span>
              <div class="map-info-note" data-i18n="map_note">Zona de chegada e recolha de alunos no próprio recinto.</div>
            </div>
          </div>
          <div class="map-info-item">
            ${ICON.clock}
            <div>
              <strong data-i18n="map_hours">Atendimento: segunda a sexta · 07:30 às 16:00</strong>
            </div>
          </div>
        </div>
        <div class="map-actions">
          <a class="btn btn-blue" href="https://maps.google.com/?q=Bright+Beginnings+Academy,+Rua+17+de+Julho,+Bairro+Em%C3%ADlia+Dausse,+Chimoio,+Mozambique" target="_blank" rel="noopener">${ICON.pin}<span data-i18n="map_btn">Abrir no Google Maps</span></a>
          <a class="btn btn-outline-blue" href="https://www.google.com/maps/dir/?api=1&destination=Rua+17+de+Julho,+Bairro+Em%C3%ADlia+Dausse,+Chimoio,+Mozambique" target="_blank" rel="noopener">${ICON.compass}<span data-i18n="map_dir">Como chegar (Direções)</span></a>
        </div>
      </div>
      <div class="map-frame">
        <iframe title="Mapa do Campus — Bright Beginnings Academy, Chimoio" src="https://maps.google.com/maps?q=-19.1437458,33.4780059&z=15&hl=pt&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</section>
`,
};

// ================= GALERIA =================
const gallery = {
  file: "gallery.html",
  active: "gallery.html",
  meta: {
    pt: {
      title: "Galeria do Campus | Bright Beginnings Academy — Chimoio",
      desc: "Explore a vida no campus da Bright Beginnings Academy em Chimoio: salas, laboratórios de ciências, desporto e momentos dos alunos.",
    },
    en: {
      title: "Campus Photo Gallery | Bright Beginnings Academy - Chimoio",
      desc: "Explore campus life at Bright Beginnings Academy in Chimoio: classrooms, science laboratories, sports and student moments.",
    },
  },
  dict: {
    gal_title: "Moments at Bright Beginnings.",
    gal_lead: "Classrooms, science laboratories, sports and student collaboration on our campus in Chimoio — real photos of the school.",
    gal_cta1: "Book a visit on WhatsApp",
    gal_cta2: "Apply for 2027",
    fl_eyebrow: "Campus gallery",
    fl_t: "Life on campus, in pictures",
    fl_lead: "Filter by activity or area. Select any image to open the high-resolution view.",
    fl_all: "All moments",
    fl_campus: "Campus & grounds",
    fl_rooms: "Classrooms & ICT",
    fl_sci: "Sciences & sports",
    fl_art: "Arts & creativity",
    g_count: "14 photographs",
    g1b: "Campus Community", g1s: "Students and teachers starting the day together on campus.",
    g2b: "Main School Entrance", g2s: "The real gate of our school on Rua 17 de Julho.",
    g13b: "School Spirit & Celebration", g13s: "Celebration, enthusiasm and unity across our school community.",
    g14b: "Pride in the BBA Uniform", g14s: "Official school uniform and community pride in Chimoio.",
    g3b: "ICT & Digital Learning", g3s: "Technology supporting everyday learning.",
    g4b: "Early Years Discovery", g4s: "Play-centred discovery for ages 2 to 5.",
    g5b: "Primary Academic Focus", g5s: "Guided literacy, mathematics and continuous assessment.",
    g6b: "Secondary Collaboration", g6s: "Analytical work and university preparation.",
    g7b: "Practical Laboratory Science", g7s: "Hands-on physics, chemistry and biology.",
    g8b: "Athletics & Team Sports", g8s: "Character, coordination and teamwork.",
    g9b: "Creativity Project — Planet Earth", g9s: "A student-made model exploring our planet.",
    g10b: "In the Classroom", g10s: "Real learning moments in Chimoio.",
    g11b: "Studying with Oxford Books", g11s: "Focused work with the Oxford Curriculum.",
    g12b: "Painting Activity", g12s: "Colour, imagination and fine motor skills.",
    rh_eyebrow: "Daily rhythm",
    rh_t: "A day at Bright Beginnings",
    rh_lead: "A school day paced for deep learning, balanced rest and intellectual curiosity.",
    r1_t: "Assembly & morning reading",
    r1_d: "A calm start, morning greetings in English and reading time in home classrooms.",
    r2_t: "Core Oxford subjects",
    r2_d: "Mathematics, English, sciences and practical ICT in dedicated learning rooms.",
    r3_t: "Co-curricular & athletics",
    r3_d: "Supervised sport, scientific experiments, public speaking and community projects.",
    gq_eyebrow: "Come and experience BBA",
    gq_t: "Come and experience the campus in person",
    gq_p: "Schedule a 30-minute walk-through of classrooms, science labs and sports fields with an admissions officer.",
    gq_b2: "Contacts & location",
  },
  body: `
<section class="banner">
  <div class="bbg"><img src="assets/img/foto-real-escola.jpg" alt="Entrada real da Bright Beginnings Academy na Rua 17 de Julho" fetchpriority="high" decoding="async"></div>
  <div class="container">
    <div class="banner-in">
      <div class="bcrumb"><a href="index.html" data-i18n="nav_home">Início</a><span class="sep">→</span><span data-i18n="nav_gal">Galeria</span></div>
      <h1 data-i18n="gal_title">Momentos na Bright Beginnings.</h1>
      <p class="lead" data-i18n="gal_lead">Salas, laboratórios, desporto e colaboração entre alunos no nosso campus em Chimoio — fotos reais da escola.</p>
      <div class="banner-cta">
        <a class="btn btn-wa" href="https://wa.me/258844277021?text=${encodeURIComponent("Olá BBA! Quero agendar uma visita guiada ao campus.")}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="gal_cta1">Agendar visita no WhatsApp</span></a>
        <a class="btn btn-ghost" href="inscricao-2027.html">${ICON.send}<span data-i18n="gal_cta2">Inscrições 2027</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow" data-i18n="fl_eyebrow">Arquivo visual</span>
      <h2 class="h2" data-i18n="fl_t">Vida no campus, em imagens</h2>
      <p class="lead" data-i18n="fl_lead">Filtre por atividade ou área. Toque em qualquer imagem para ver em tamanho maior.</p>
    </div>
    <div class="chips" role="group" aria-label="Filtrar fotografias">
      <button class="chip on" type="button" data-f="all" data-i18n="fl_all">Todas</button>
      <button class="chip" type="button" data-f="campus" data-i18n="fl_campus">Campus & Espaços</button>
      <button class="chip" type="button" data-f="rooms" data-i18n="fl_rooms">Salas & Aprendizagem</button>
      <button class="chip" type="button" data-f="sci" data-i18n="fl_sci">Ciências & Desporto</button>
      <button class="chip" type="button" data-f="art" data-i18n="fl_art">Artes & Criatividade</button>
    </div>
    <div class="gal">
      <button class="g-item reveal" type="button" data-cat="campus"><img src="assets/img/alunos-comunidade-bba.jpg" alt="Comunidade escolar da Bright Beginnings Academy" loading="lazy"><span class="g-cap"><b data-i18n="g1b">Comunidade do Campus</b><span data-i18n="g1s">Alunos e professores a começar o dia juntos.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="campus"><img src="assets/img/alunos-celebracao-bba.jpg" alt="Celebração e alegria dos alunos da Bright Beginnings Academy" loading="lazy"><span class="g-cap"><b data-i18n="g13b">Celebração & Espírito Escolar</b><span data-i18n="g13s">Alegria, união e energia positiva no campus da BBA.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="campus"><img src="assets/img/alunos-equipa-bba.jpg" alt="Alunos da Bright Beginnings Academy em uniforme escolar" loading="lazy"><span class="g-cap"><b data-i18n="g14b">Orgulho no Uniforme BBA</b><span data-i18n="g14s">Turma reunida na entrada da escola em Chimoio.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="campus"><img src="assets/img/foto-real-escola.jpg" alt="Entrada principal da escola" loading="lazy"><span class="g-cap"><b data-i18n="g2b">Entrada Principal</b><span data-i18n="g2s">O portão real da escola na Rua 17 de Julho.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="rooms"><img src="assets/img/sala-informatica.jpg" alt="Sala de informática da escola" loading="lazy"><span class="g-cap"><b data-i18n="g3b">Sala de Informática</b><span data-i18n="g3s">Tecnologia ao serviço da aprendizagem.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="rooms"><img src="assets/img/early-years.jpg" alt="Sala do Early Years" loading="lazy"><span class="g-cap"><b data-i18n="g4b">Early Years</b><span data-i18n="g4s">Descoberta e jogo dos 2 aos 5 anos.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="rooms"><img src="assets/img/sala-aula-1.jpeg" alt="Aluno do Ensino Primário em estudo com livro Oxford" loading="lazy"><span class="g-cap"><b data-i18n="g5b">Ensino Primário</b><span data-i18n="g5s">Leitura orientada, matemática e avaliação contínua.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="campus"><img src="assets/img/turma-bba-escola.jpg" alt="Alunos do Ensino Secundário em uniforme escolar" loading="lazy"><span class="g-cap"><b data-i18n="g6b">Ensino Secundário</b><span data-i18n="g6s">Colaboração e preparação para a universidade.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="sci"><img src="assets/img/laboratorio.jpg" alt="Laboratório de ciências" loading="lazy"><span class="g-cap"><b data-i18n="g7b">Laboratório de Ciências</b><span data-i18n="g7s">Física, química e biologia com as mãos na massa.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="sci"><img src="assets/img/sports.jpg" alt="Atividades desportivas" loading="lazy"><span class="g-cap"><b data-i18n="g8b">Desporto & Atletismo</b><span data-i18n="g8s">Atletismo, futebol e trabalho de equipa.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="art"><img src="assets/img/criatividade.jpeg" alt="Maquete Planeta Terra feita pelos alunos" loading="lazy"><span class="g-cap"><b data-i18n="g9b">Projeto Planeta Terra</b><span data-i18n="g9s">Maquete criada pelos alunos com criatividade.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="rooms"><img src="assets/img/sala-aula.jpeg" alt="Aluno em sala de aula" loading="lazy"><span class="g-cap"><b data-i18n="g10b">Sala de Aula</b><span data-i18n="g10s">Momentos reais de aprendizagem.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="rooms"><img src="assets/img/sala-aula-1.jpeg" alt="Aluno a estudar com livro Oxford" loading="lazy"><span class="g-cap"><b data-i18n="g11b">Estudo com Livros Oxford</b><span data-i18n="g11s">Concentração com o Currículo Oxford.</span></span></button>
      <button class="g-item reveal" type="button" data-cat="art"><img src="assets/img/atividade-pintura.jpeg" alt="Aluna em atividade de pintura" loading="lazy"><span class="g-cap"><b data-i18n="g12b">Pintura & Artes</b><span data-i18n="g12s">Cor, imaginação e motricidade fina.</span></span></button>
    </div>
    <p class="mini-note" style="margin-top:16px;text-align:center" data-i18n="g_count">14 fotografias</p>
  </div>
</section>

<section class="sec tint">
  <div class="container">
    <div class="sec-head center reveal">
      <span class="eyebrow eb-green" data-i18n="rh_eyebrow">Rotina diária</span>
      <h2 class="h2" data-i18n="rh_t">Um dia na Bright Beginnings</h2>
      <p class="lead" data-i18n="rh_lead">Horários pensados para aprendizagem profunda, descanso equilibrado e curiosidade intelectual.</p>
    </div>
    <div class="grid g3">
      <div class="card reveal"><div class="ic ic-blue">${ICON.clock}</div><h3>07:30 – 08:00</h3><p><strong data-i18n="r1_t">Assembleia & leitura matinal</strong><br><span data-i18n="r1_d">Chegada tranquila, saudação em inglês e leitura na sala principal.</span></p></div>
      <div class="card reveal"><div class="ic ic-green">${ICON.book}</div><h3>08:00 – 12:30</h3><p><strong data-i18n="r2_t">Disciplinas Oxford</strong><br><span data-i18n="r2_d">Matemática, inglês, ciências e TIC prático em salas dedicadas.</span></p></div>
      <div class="card reveal"><div class="ic ic-red">${ICON.trophy}</div><h3>13:30 – 16:00</h3><p><strong data-i18n="r3_t">Co-curricular & atletismo</strong><br><span data-i18n="r3_d">Desporto orientado, experiências, oratória e projetos comunitários.</span></p></div>
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="bgimg"><img src="assets/img/sports.jpg" alt="" loading="lazy"></div>
  <div class="container">
    <div class="cta-in reveal">
      <span class="eyebrow" data-i18n="gq_eyebrow">Venha viver a BBA</span>
      <h2 data-i18n="gq_t">Venha conhecer o campus pessoalmente</h2>
      <p data-i18n="gq_p">Marque uma visita guiada de 30 minutos: salas, laboratórios e campos desportivos, com um responsável de admissões.</p>
      <div class="hero-cta">
        <a class="btn btn-wa" href="${WA_VISITA}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ct_btn1">Agendar visita no WhatsApp</span></a>
        <a class="btn btn-ghost" href="contact.html">${ICON.pin}<span data-i18n="gq_b2">Contactos e localização</span></a>
      </div>
    </div>
  </div>
</section>

<dialog class="lb" id="lb">
  <img id="lb-img" src="" alt="">
  <div class="lb-cap"><span id="lb-cap"></span><button type="button" id="lb-x" data-i18n="lb_x">Fechar ✕</button></div>
</dialog>
`,
  extraJs: `
(function(){
  var chips=document.querySelectorAll(".chip[data-f]");
  var items=document.querySelectorAll(".g-item");
  chips.forEach(function(c){
    c.addEventListener("click", function(){
      chips.forEach(function(x){ x.classList.remove("on"); });
      c.classList.add("on");
      var f=c.getAttribute("data-f");
      items.forEach(function(it){
        var show = (f==="all") || (it.getAttribute("data-cat")===f);
        it.classList.toggle("hide", !show);
      });
    });
  });
  var lb=document.getElementById("lb"), lbimg=document.getElementById("lb-img"), lbcap=document.getElementById("lb-cap"), lbx=document.getElementById("lb-x");
  items.forEach(function(it){
    it.addEventListener("click", function(){
      var img=it.querySelector("img"); if(!img||!lb) return;
      lbimg.src=img.src; lbimg.alt=img.alt;
      var b=it.querySelector(".g-cap b"), s=it.querySelector(".g-cap span");
      lbcap.textContent=(b?b.textContent:"")+(s?" — "+s.textContent:"");
      if(lb.showModal) lb.showModal();
    });
  });
  if(lbx) lbx.addEventListener("click", function(){ lb.close(); });
  if(lb) lb.addEventListener("click", function(e){ if(e.target===lb) lb.close(); });
})();
`,
};

// ================= NOTÍCIA =================
const noticia = {
  file: "noticia.html",
  active: "",
  meta: {
    pt: {
      title: "Notícias & Atividades | Bright Beginnings Academy — Chimoio",
      desc: "Acompanhe as notícias, projetos e conquistas da Bright Beginnings Academy em Chimoio, Moçambique — do Early Years ao Grade 10.",
    },
    en: {
      title: "News & Activities | Bright Beginnings Academy — Chimoio",
      desc: "Follow the news, projects and achievements of Bright Beginnings Academy in Chimoio, Mozambique — from Early Years to Grade 10.",
    },
  },
  dict: {
    ar_kicker: "School news",
    ar_back: "Back to all news",
    ar_share: "Share on WhatsApp",
    ar_visit: "Book a school visit",
    ar_next: "Continue reading",
    ar_nf_t: "Article not found",
    ar_nf_d: "The link may be incomplete. Go back to news and choose an article.",
    ar_nf_b: "See all news",
  },
  body: `
<section class="banner">
  <div class="bbg"><img src="assets/img/laboratorio.jpg" alt="Notícias e Vida Escolar na Bright Beginnings Academy" fetchpriority="high" decoding="async"></div>
  <div class="container">
    <div class="banner-in">
      <div class="bcrumb"><a href="index.html" data-i18n="nav_home">Início</a><span class="sep">→</span><span data-i18n="n_eyebrow">Notícias</span></div>
      <h1 id="art-title" data-i18n="ar_kicker">Notícias da Escola</h1>
      <div class="art-meta" id="art-meta-header">
        <span class="ncat" id="art-cat" style="margin:0">—</span>
        <time id="art-date" class="mini-note" style="color:rgba(255,255,255,.85)"></time>
      </div>
    </div>
  </div>
</section>

<div class="container" id="art-herowrap">
  <div class="art-hero"><img id="art-img" src="assets/img/laboratorio.jpg" alt=""></div>
</div>

<section class="sec" id="art-main">
  <div class="container">
    <div class="art">
      <div class="art-meta" id="art-meta-nav" style="justify-content:space-between">
        <a class="tlink" href="noticia.html">${ICON.arrow}<span data-i18n="ar_back">Voltar a todas as notícias</span></a>
        <a class="btn btn-outline-blue btn-sm" id="art-share" href="#" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="ar_share">Partilhar no WhatsApp</span></a>
      </div>
      <div class="prose" id="art-body"></div>
      <div id="art-cta" style="margin-top:36px">
        <a class="btn btn-wa" href="${WA_VISITA}" target="_blank" rel="noopener">${ICON.calendar}<span data-i18n="ar_visit">Agendar visita à escola</span></a>
      </div>
    </div>
    <div id="art-next-wrap" style="max-width:960px;margin:clamp(44px,6vw,72px) auto 0">
      <h2 class="h2" id="art-next-title" style="font-size:clamp(20px,2.4vw,26px);margin-bottom:20px" data-i18n="ar_next">Continuar a ler</h2>
      <div class="grid g2" id="art-next"></div>
    </div>
  </div>
</section>

<section class="sec" id="art-notfound" style="display:none">
  <div class="container" style="text-align:center;max-width:640px">
    <div class="ic ic-blue" style="margin-inline:auto">${ICON.note}</div>
    <h2 class="h2" data-i18n="ar_nf_t">Artigo não encontrado</h2>
    <p class="lead" style="margin:14px 0 24px" data-i18n="ar_nf_d">O link pode estar incompleto. Volte às notícias e escolha um artigo.</p>
    <a class="btn btn-red" href="noticia.html">${ICON.arrow}<span data-i18n="ar_nf_b">Ver notícias</span></a>
  </div>
</section>
`,
  extraJs: `
(function(){
  var NEWS=[
    { slug:"semana-ciencias-praticas", cat_pt:"Acadêmico", cat_en:"Academic",
      t_pt:"Alunos em Destaque na Semana de Ciências Práticas", t_en:"Students Excel at Practical Science Week",
      data:"Setembro 2026", img:"img/laboratorio.jpg", alt:"Laboratório de Ciências da Bright Beginnings Academy",
      pt:["Durante uma semana, as salas da Bright Beginnings Academy transformaram-se em pequenos laboratórios. Os alunos do Primary e do Secondary planearam hipóteses, testaram materiais simples e registaram resultados com o apoio dos professores.","Cada turma apresentou um projeto final à escola: filtros de água com materiais locais, circuitos elétricos básicos e observação de plantas do nosso próprio pátio em Chimoio. O júri de professores avaliou criatividade, método e trabalho em equipa — não apenas o resultado.","Para os pais, o recado é simples: ciência aqui aprende-se com a mão na massa, em inglês e com vocabulário que os alunos usam depois nas outras disciplinas.","As fotos desta edição já estão na Galeria. A próxima Semana de Ciências acontece no próximo trimestre — encarregados interessados em assistir podem falar com a secretaria."],
      en:["For one week, Bright Beginnings Academy classrooms became small laboratories. With teacher guidance, Primary and Secondary students planned hypotheses, tested simple materials and recorded their results.","Each class presented a final project to the school: water filters with local materials, basic electric circuits and observation of plants from our own yard in Chimoio. Teachers assessed creativity, method and teamwork — not just the final result.","For parents, the message is simple: science here is hands-on, taught in English, and builds vocabulary that students reuse across subjects.","Photos from this edition are already in the Gallery. The next Science Week takes place next term — parents who wish to attend can speak to the school office."] },
    { slug:"torneio-inter-turmas", cat_pt:"Desporto", cat_en:"Sports",
      t_pt:"Torneio Inter-Turmas Celebra Espírito Desportivo", t_en:"Annual Sports Tournament Celebrates Teamwork",
      data:"Outubro 2026", img:"img/sports.jpg", alt:"Alunos em torneio desportivo no campo da escola",
      pt:["O Torneio Inter-Turmas deste ano juntou alunos do Primary e do Secondary em provas de futebol, corrida e jogos cooperativos. As equipas misturaram idades de propósito: os mais velhos lideram, os mais novos ganham confiança.","Os professores de Educação Física marcaram pontos por fair-play e pontualidade, além dos golos. Houve medalhas para as três primeiras equipas e menção honrosa para a turma com melhor espírito desportivo.","O desporto faz parte do nosso currículo porque ensina o que a sala não ensina sozinha: disciplina, respeito pelo adversário e lidar com vitória e derrota.","Obrigado aos pais que vieram apoiar. O calendário do próximo torneio será anunciado na secretaria e aqui nas Notícias."],
      en:["This year's Inter-Class Tournament brought Primary and Secondary students together for football, running and cooperative games. Teams mixed ages on purpose: older students lead, younger ones gain confidence.","PE teachers awarded points for fair play and punctuality, in addition to goals. Medals went to the top three teams, with an honourable mention for the class with the best sporting spirit.","Sport is part of our curriculum because it teaches what the classroom alone cannot: discipline, respect for opponents and handling victory and defeat.","Thank you to the parents who came to support. The next tournament date will be announced at the school office and here in News."] },
    { slug:"novos-recursos-digitais", cat_pt:"Campus", cat_en:"Campus",
      t_pt:"Novos Recursos Digitais e Espaços de Estudo", t_en:"New Science Lab & Digital Learning Facilities",
      data:"Novembro 2026", img:"img/sala-informatica.jpg", alt:"Sala de informática da Bright Beginnings Academy",
      pt:["Este trimestre reforçámos o campus com pequenas melhorias que mudam o dia a dia: cantos de leitura no Primary, projetores para aulas visuais e uma sala de estudo orientado no Secondary.","Os alunos do Secondary passam a ter horários fixos de estudo acompanhado por professores, com foco em inglês, matemática e métodos de revisão para avaliações do currículo Oxford.","Nada disto substitui o professor — apenas dá mais tempo de prática. Encarregados que queiram conhecer os espaços podem marcar uma visita guiada de 30 minutos na secretaria.","Fotos dos novos espaços estão na Galeria. Sugestões de melhoria são bem-vindas no atendimento presencial, de segunda a sexta."],
      en:["This term we upgraded the campus with small improvements that change daily life: reading corners in Primary, projectors for visual lessons and a supervised study room in Secondary.","Secondary students now have fixed supervised study slots with teachers, focused on English, mathematics and revision methods for Oxford curriculum assessments.","None of this replaces the teacher — it simply adds practice time. Parents who wish to see the spaces can book a 30-minute guided visit at the school office.","Photos of the new spaces are in the Gallery. Improvement suggestions are welcome in person, Monday to Friday."] }
  ];
  var slug=new URLSearchParams(location.search).get("slug");
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function render(){
    var lang=(window.__lang==="en")?"en":"pt";
    var main=document.getElementById("art-main"), nf=document.getElementById("art-notfound"), hw=document.getElementById("art-herowrap");
    var metaHeader=document.getElementById("art-meta-header"), metaNav=document.getElementById("art-meta-nav");
    var artCta=document.getElementById("art-cta"), nextWrap=document.getElementById("art-next-wrap"), nextTitle=document.getElementById("art-next-title");
    var et=document.getElementById("art-title"), eb=document.getElementById("art-body"), next=document.getElementById("art-next");

    if(!slug){
      if(main) main.style.display="";
      if(hw) hw.style.display="none";
      if(nf) nf.style.display="none";
      if(metaHeader) metaHeader.style.display="none";
      if(metaNav) metaNav.style.display="none";
      if(artCta) artCta.style.display="none";
      var hubTitle = (lang==="en") ? "News & School Updates" : "Notícias & Vida Escolar";
      document.title = hubTitle + " | Bright Beginnings Academy";
      if(et){ et.removeAttribute("data-i18n"); et.textContent = hubTitle; }
      if(eb){
        eb.innerHTML = "<p style='font-size:17.5px;color:var(--ink);margin-bottom:30px'>" + 
          (lang==="en" ? "Follow recent events, achievements, sports tournaments and educational developments at Bright Beginnings Academy in Chimoio." : "Acompanhe os acontecimentos, celebrações, torneios desportivos e novidades académicas da Bright Beginnings Academy em Chimoio.") + "</p>";
      }
      if(nextTitle) nextTitle.style.display="none";
      if(nextWrap) nextWrap.style.marginTop="0";
      if(next){
        next.className = "grid g3";
        var html="";
        for(var i=0;i<NEWS.length;i++){
          var t=(lang==="en")?NEWS[i].t_en:NEWS[i].t_pt;
          var c=(lang==="en")?NEWS[i].cat_en:NEWS[i].cat_pt;
          var d=(lang==="en")?NEWS[i].en[0]:NEWS[i].pt[0];
          html+='<article class="ncard reveal in"><a class="ph" href="noticia.html?slug='+NEWS[i].slug+'"><img src="assets/'+NEWS[i].img+'" alt="'+esc(NEWS[i].alt)+'" loading="lazy"></a><div class="bd"><span class="ncat">'+esc(c)+'</span><h3><a href="noticia.html?slug='+NEWS[i].slug+'">'+esc(t)+'</a></h3><p>'+esc(d)+'</p><time>'+NEWS[i].data+'</time></div></article>';
        }
        next.innerHTML=html;
      }
      return;
    }

    var item=null;
    for(var i=0;i<NEWS.length;i++){ if(NEWS[i].slug===slug){ item=NEWS[i]; break; } }
    if(!item){
      if(main) main.style.display="none";
      if(hw) hw.style.display="none";
      if(nf) nf.style.display="block";
      return;
    }

    if(main) main.style.display="";
    if(hw) hw.style.display="";
    if(nf) nf.style.display="none";
    if(metaHeader) metaHeader.style.display="";
    if(metaNav) metaNav.style.display="flex";
    if(artCta) artCta.style.display="";
    if(nextTitle) nextTitle.style.display="";
    if(nextWrap) nextWrap.style.marginTop="";
    if(next) next.className = "grid g2";

    var T=(lang==="en")?item.t_en:item.t_pt, C=(lang==="en")?item.cat_en:item.cat_pt, B=(lang==="en")?item.en:item.pt;
    if(et){ et.removeAttribute("data-i18n"); et.textContent=T; }
    document.title=T+" | Bright Beginnings Academy";
    var ec=document.getElementById("art-cat"); if(ec) ec.textContent=C;
    var ed=document.getElementById("art-date"); if(ed) ed.textContent=item.data;
    var ei=document.getElementById("art-img"); if(ei){ ei.src="assets/"+item.img; ei.alt=item.alt; }
    if(eb){ var bhtml=""; for(var j=0;j<B.length;j++){ bhtml+="<p>"+esc(B[j])+"</p>"; } eb.innerHTML=bhtml; }
    var sh=document.getElementById("art-share");
    if(sh) sh.href="https://wa.me/?text="+encodeURIComponent(T+" - https://www.bba.edu.mz/noticia.html?slug="+item.slug);
    if(next){
      var nh="";
      for(var k=0;k<NEWS.length;k++){
        if(NEWS[k].slug===slug) continue;
        var t2=(lang==="en")?NEWS[k].t_en:NEWS[k].t_pt;
        var c2=(lang==="en")?NEWS[k].cat_en:NEWS[k].cat_pt;
        var d2=(lang==="en")?NEWS[k].en[0]:NEWS[k].pt[0];
        nh+='<article class="ncard reveal in"><a class="ph" href="noticia.html?slug='+NEWS[k].slug+'"><img src="assets/'+NEWS[k].img+'" alt="'+esc(NEWS[k].alt)+'" loading="lazy"></a><div class="bd"><span class="ncat">'+esc(c2)+'</span><h3><a href="noticia.html?slug='+NEWS[k].slug+'">'+esc(t2)+'</a></h3><p>'+esc(d2)+'</p><time>'+NEWS[k].data+'</time></div></article>';
      }
      next.innerHTML=nh;
    }
  }
  document.addEventListener("bba:lang", render);
  render();
})();
`,
};

module.exports = { inscricao, contact, gallery, noticia };
