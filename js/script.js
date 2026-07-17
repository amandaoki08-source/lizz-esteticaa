const WHATSAPP_NUMBER = "5511974411070";

  const massages = [
    { id:"serenity", icon:"🌸", name:"Lizz Serenity", type:"Massagem Relaxante",
      desc:"Técnicas suaves e envolventes que promovem relaxamento profundo, reduzem o estresse e proporcionam leveza para o corpo e a mente." },
    { id:"therapy", icon:"🤲", name:"Lizz Therapy", type:"Massagem Terapêutica",
      desc:"Técnicas direcionadas que aliviam dores musculares, tensões e contraturas, melhorando a postura e a qualidade de vida." },
    { id:"slimdrena", icon:"💧", name:"Lizz Slim Drena", type:"Drenagem Linfática",
      desc:"Estimula o sistema linfático, reduzindo inchaços, eliminando toxinas e melhorando a circulação. Sensação de leveza e bem-estar." },
    { id:"sculpt", icon:"⏳", name:"Lizz Sculpt", type:"Massagem Modeladora",
      desc:"Técnicas intensas que auxiliam na redução de medidas, estimulam a circulação e ajudam a modelar o corpo, deixando a silhueta mais definida." },
    { id:"sculptrelax", icon:"🌷", name:"Lizz Sculpt Relax", type:"Combo — Modeladora e Relaxante",
      desc:"O melhor dos dois mundos: técnicas modeladoras que cuidam do corpo associadas ao relaxamento profundo para renovar suas energias.", combo:true },
    { id:"equilibrium", icon:"⚖️", name:"Lizz Equilibrium", type:"Combo — Drenagem e Modeladora",
      desc:"A combinação perfeita para desinchar, eliminar líquidos retidos, modelar e deixar seu corpo mais leve, definido e equilibrado.", combo:true },
  ];

  const categories = [
    { id:"facial-harm", icon:"💉", name:"Harmonização Facial", items:[
      { name:"Botox – 1 área", price:490.00 },
      { name:"Botox – 2 áreas", price:890.00 },
      { name:"Botox – 3 áreas", note:"Testa, Glabela e Pés de Galinha", price:1190.00 },
      { name:"Preenchimento Labial (1 ml)", price:990.00 },
      { name:"Skinbooster", price:790.00 },
      { name:"Bioestimulador de Colágeno (Radiesse) – Facial", price:1490.00 },
      { name:"Fios de PDO", note:"a partir de", price:1090.00 },
    ]},
    { id:"corporais", icon:"🔥", name:"Tratamentos Corporais", items:[
      { name:"Lipo Slim Papada", price:249.99 },
      { name:"Enzimas para Gordura Localizada", price:269.99 },
      { name:"Lipolíticos", price:319.99 },
      { name:"Mesoterapia Corporal", price:239.99 },
      { name:"Tratamento para Celulite", price:239.99 },
      { name:"Tratamento para Estrias", note:"Brancas e Vermelhas", price:259.99 },
      { name:"PEIM", price:419.99 },
      { name:"Bioestimulador Corporal (Radiesse)", price:1790.00 },
    ]},
    { id:"faciais", icon:"✨", name:"Tratamentos Faciais", items:[
      { name:"Limpeza de Pele", note:"até 2x", price:119.99 },
      { name:"Dermaplaning", note:"até 2x", price:99.99 },
      { name:"Peeling de Diamante", price:139.99 },
      { name:"Peeling Químico", price:199.99 },
      { name:"Microagulhamento", note:"por sessão", price:359.99 },
      { name:"Jato de Plasma", price:319.99 },
      { name:"Mesoterapia Facial", price:249.99 },
    ]},
    { id:"protocolos", icon:"📦", name:"Protocolos – Pacotes (5 sessões)", items:[
      { name:"Glow C Prime", note:"5 sessões", price:399.00 },
      { name:"Protocolo Revitaliza", note:"5 sessões", price:599.00 },
      { name:"Protocolo Lizz Shape", note:"Gordura Localizada · 5 sessões", price:899.00 },
      { name:"Protocolo Lizz Firm Shape", note:"Gordura Localizada e Flacidez · 5 sessões", price:1090.00 },
      { name:"Protocolo Lizz Stria Care", note:"Estrias · 5 sessões", price:499.00 },
    ]},
    { id:"capilares", icon:"💆", name:"Tratamentos Capilares", items:[
      { name:"MMP Capilar", price:269.99 },
      { name:"Tratamento de Queda Capilar", price:219.99 },
    ]},
    { id:"outros", icon:"🪶", name:"Outros", items:[
      { name:"Epilação Egípcia", note:"até 2x", price:73.99 },
    ]},
  ];

  // flatten all bookable services: massages (no fixed price) + catalog items
  const allServices = [];
  massages.forEach(m => allServices.push({ id:"m-"+m.id, group:"Massagens & Combos", name:`${m.name} — ${m.type}`, price:null }));
  categories.forEach(cat => cat.items.forEach((it,idx) => allServices.push({ id:`c-${cat.id}-${idx}`, group:cat.name, name:it.name + (it.note?` (${it.note})`:''), price:it.price })));

  const state = { serviceId:null, date:"", time:null };

  // ---- render massagens list ----
  const massageList = document.getElementById('massageList');
  massages.forEach(m => {
    const row = document.createElement('div');
    row.className = 'massage-row';
    row.dataset.id = 'm-'+m.id;
    row.innerHTML = `
      <div class="m-icon">${m.icon}</div>
      <div>
        <h3>${m.name} <span>— ${m.type}</span></h3>
        <p>${m.desc}</p>
        ${m.combo ? '<span class="tag">Combo</span>' : ''}
      </div>`;
    row.addEventListener('click', () => selectService('m-'+m.id, row));
    massageList.appendChild(row);
  });

  // ---- render estética tabs/panels ----
  const catTabs = document.getElementById('catTabs');
  const catPanels = document.getElementById('catPanels');
  categories.forEach((cat, i) => {
    const tab = document.createElement('button');
    tab.className = 'cat-tab' + (i===0 ? ' active':'');
    tab.textContent = `${cat.icon} ${cat.name}`;
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.cat-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-'+cat.id).classList.add('active');
    });
    catTabs.appendChild(tab);

    const panel = document.createElement('div');
    panel.className = 'cat-panel' + (i===0 ? ' active':'');
    panel.id = 'panel-'+cat.id;
    const itemsHtml = cat.items.map((it,idx) => `
      <div class="cat-item" data-id="c-${cat.id}-${idx}">
        <div class="item-name">${it.name}${it.note?`<small>${it.note}</small>`:''}</div>
        <div class="item-price">R$ ${it.price.toFixed(2).replace('.',',')}</div>
      </div>`).join('');
    panel.innerHTML = `<div class="cat-panel-head">${cat.icon} ${cat.name}</div><div class="cat-items">${itemsHtml}</div>`;
    catPanels.appendChild(panel);
  });
  catPanels.addEventListener('click', (e) => {
    const item = e.target.closest('.cat-item');
    if(!item) return;
    selectService(item.dataset.id, item);
  });

  // ---- select dropdown ----
  const servicoSelect = document.getElementById('servicoSelect');
  servicoSelect.innerHTML = '<option value="">Selecione um serviço</option>';
  let currentGroup = null; let optgroup = null;
  allServices.forEach(s => {
    if(s.group !== currentGroup){
      currentGroup = s.group;
      optgroup = document.createElement('optgroup');
      optgroup.label = currentGroup;
      servicoSelect.appendChild(optgroup);
    }
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.price ? `${s.name} — R$ ${s.price.toFixed(2).replace('.',',')}` : s.name;
    optgroup.appendChild(opt);
  });
  servicoSelect.addEventListener('change', () => selectService(servicoSelect.value, null));

  function selectService(id, sourceEl){
    state.serviceId = id;
    document.querySelectorAll('.massage-row, .cat-item').forEach(el => el.classList.remove('selected'));
    if(sourceEl) sourceEl.classList.add('selected');
    else {
      const match = document.querySelector(`[data-id="${id}"]`);
      if(match) match.classList.add('selected');
    }
    servicoSelect.value = id;
    updateSummary();
  }

  // ---- time slots ----
  const slotsGrid = document.getElementById('slotsGrid');
  const HOURS = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00"];
  HOURS.forEach(h => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'slot'; b.textContent = h;
    b.addEventListener('click', () => {
      state.time = h;
      document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
      b.classList.add('selected');
      updateSummary();
    });
    slotsGrid.appendChild(b);
  });

  const dataInput = document.getElementById('data');
  dataInput.min = new Date().toISOString().split('T')[0];
  dataInput.addEventListener('change', () => { state.date = dataInput.value; updateSummary(); });
  document.getElementById('nome').addEventListener('input', updateSummary);
  document.getElementById('telefone').addEventListener('input', updateSummary);

  function formatDate(iso){ if(!iso) return ""; const [y,m,d]=iso.split('-'); return `${d}/${m}/${y}`; }

  function getSelectedService(){ return allServices.find(s => s.id === state.serviceId); }

  function updateSummary(){
    const summary = document.getElementById('summary');
    const nome = document.getElementById('nome').value.trim();
    const service = getSelectedService();
    const confirmBtn = document.getElementById('confirmBtn');

    if(!service && !state.date && !state.time && !nome){
      summary.innerHTML = '<span class="empty">Escolha um serviço e preencha os dados ao lado.</span>';
      confirmBtn.disabled = true; return;
    }
    summary.innerHTML = `
      ${service ? `<div><strong>${service.name}</strong>${service.price?` <span class="price-line">· R$ ${service.price.toFixed(2).replace('.',',')}</span>`:''}</div>` : '<div class="empty">Serviço não selecionado</div>'}
      ${state.date ? `<div style="margin-top:8px;">📅 ${formatDate(state.date)}${state.time?' às '+state.time:''}</div>` : ''}
      ${nome ? `<div style="margin-top:8px;">👤 ${nome}</div>` : ''}
    `;
    confirmBtn.disabled = !(service && state.date && state.time && nome);
  }

  function confirmarWhatsApp(){
    const service = getSelectedService();
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    if(!service || !state.date || !state.time || !nome) return;

    const msg = `Olá! Gostaria de agendar um horário na Lizz Estética e Massoterapia 😊%0A%0A` +
      `*Serviço:* ${service.name}%0A` +
      `*Data:* ${formatDate(state.date)}%0A` +
      `*Horário:* ${state.time}%0A` +
      `*Nome:* ${nome}` +
      (telefone ? `%0A*Telefone:* ${telefone}` : '');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }
