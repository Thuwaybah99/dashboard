/* Bravo Wallet Transfer Analysis Board
 * All visualization URLs below come from user-provided Tableau Public embed snippets.
 * Customer behaviour tab uses user-provided GitHub image links.
 */
import { TableauEventType, FilterUpdateType } from 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';

const ROOT = 'https://public.tableau.com/views/WalletTransferSheet/';
const FILTER_FIELDS = {
  service: ['Service', 'Services', 'Service Type', 'Service type', 'SERVICE', 'service', 'service_type'],
  wallet: ['Wallet Class', 'Wallet class', 'account_class', 'Account Class', 'Account class', 'wallet_class', 'WalletClass', 'wallet class', 'AccountClass', 'ACCOUNT_CLASS', 'Class', 'class'],
  transactionDate: ['date (Count&amount)', 'date (Count&Amount)', 'date', 'Date', 'Transaction Date', 'Transaction date', 'Tran Date', 'tran_date', 'TRAN_DATE', 'TransactionDate'],
  registrationDate: ['date (Count&amount)', 'date (Count&Amount)', 'Registration Date', 'Registration date', 'RegistrationDate', 'Created At', 'created_at', 'registration_date', 'registered_at', 'date (Customers)', 'Date'],
  customerDate: ['date (Count&amount)', 'date (Count&Amount)', 'tran_date', 'Transaction Date', 'Registration Date', 'registration_date', 'created_at', 'Date', 'date'],
};

const VIEWS = [
  {id:'s1',tab:'services',container:'service-kpis',sheet:'TransactionsamountSDG',title:'Transactions Amount (SDG)',description:'Value of wallet transfer service transactions',height:195,date:'transactionDate',category:'service'},
  {id:'s2',tab:'services',container:'service-kpis',sheet:'Totaltransactioncount',title:'Total Transactions Count',description:'Number of transactions across services',height:195,date:'transactionDate',category:'service'},
  {id:'s3',tab:'services',container:'service-kpis',sheet:'AverageticketSDG_1',title:'Average Ticket (SDG)',description:'Average transaction value',height:195,date:'transactionDate',category:'service'},
  {id:'s4',tab:'services',container:'service-composition',sheet:'ServiceShareofValue',title:'Service Share of Value',description:'Relative contribution of each service to transaction value · comparison view',height:440,date:'transactionDate',category:'service',wide:true},
  {id:'s5',tab:'services',container:'service-trends',sheet:'Servicesdailytotals',title:'Services Daily Totals',description:'Daily transaction performance by service',height:470,date:'transactionDate',category:'service',wide:true},
  {id:'s6',tab:'services',container:'service-trends',sheet:'Sheet6',title:'Service Transactions per Day',description:'Daily transaction count by service',height:470,date:'transactionDate',category:'service',wide:true},
  {id:'c0',tab:'customers',container:'customer-overview',sheet:'Customersinextract',title:'All Active Customers',description:'Customers included in the Tableau extract · snapshot metric',height:195,date:'customerDate',category:'wallet'},
  {id:'c1',tab:'customers',container:'customer-overview',sheet:'RegisteredinNov',title:'Registered in November',description:'New customer registrations in November',height:195,date:'registrationDate',category:'wallet'},
  {id:'c2',tab:'customers',container:'customer-activity',sheet:'Sheet9',title:'Active Users by Day',description:'Daily active customers',height:410,date:'transactionDate',category:'wallet',wide:true},
  {id:'c3',tab:'customers',container:'customer-classes',sheet:'Sheet102',title:'Wallet Class Mix (All Customers)',description:'Distribution of the overall customer base · comparison view',height:400,date:'customerDate',category:'wallet'},
  {id:'c4',tab:'customers',container:'customer-classes',sheet:'WalletClassShareofValue2',title:'Wallet Class Share of Transaction Value',description:'Value contribution by wallet class · comparison view',height:400,date:'transactionDate',category:'wallet'},
  {id:'c5',tab:'customers',container:'customer-location',sheet:'Sheet10',title:'Customers by State',description:'Customer distribution by location',height:480,date:'customerDate',category:'wallet'},
  {id:'c6',tab:'customers',container:'customer-overview',sheet:'Stateunknown',title:'Unknown State',description:'Customers with missing or unknown state information',height:195,date:'customerDate',category:'wallet'},
];

const BEHAVIOUR_GROUPS = {
  'behaviour-weeks': [
    {title:'Weeks of the months', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/Weeks%20of%20the%20months.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/Weeks%20of%20the%20months.png'},
  ],
  'behaviour-cohorts': [
    {title:'Customers', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/Customers.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/Customers.png'},
    {title:'% of cohort active', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/%25%20of%20cohort%20active.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/%25%20of%20cohort%20active.png'},
  ],
  'behaviour-segments': [
    {title:'A. Behaviour segments — latest 7 days', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/A.%20Behaviour%20segments%20%E2%80%94%20latest%207%20days.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/A.%20Behaviour%20segments%20%E2%80%94%20latest%207%20days.png'},
  ],
  'behaviour-recency-frequency': [
    {title:'B. Recency — days since last transaction (all customers seen this month)', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/B.%20Recency%20%E2%80%94%20days%20since%20last%20transaction%20%28all%20customers%20seen%20this%20month%29.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/B.%20Recency%20%E2%80%94%20days%20since%20last%20transaction%20(all%20customers%20seen%20this%20month).png'},
    {title:'B. Frequency bands (transactions month to date)', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/B.%20Frequency%20bands%20%28transactions%20month%20to%20date%29.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/B.%20Frequency%20bands%20(transactions%20month%20to%20date).png'},
  ],
  'behaviour-value-ticket': [
    {title:'A. Value segments', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/A.%20Value%20segments.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/A.%20Value%20segments.png'},
    {title:'A. Average ticket-size bands', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/A.%20Average%20ticket-size%20bands.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/A.%20Average%20ticket-size%20bands.png'},
  ],
  'behaviour-concentration': [
    {title:'B. Share of value held by the top customers', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/B.%20Share%20of%20value%20held%20by%20the%20top%20customers.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/B.%20Share%20of%20value%20held%20by%20the%20top%20customers.png'},
  ],
  'behaviour-cross': [
    {title:'C. Value segment × latest-7-day behaviour — customers', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/C.%20Value%20segment%20%C3%97%20latest-7-day%20behaviour%20%E2%80%94%20customers.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/C.%20Value%20segment%20%C3%97%20latest-7-day%20behaviour%20%E2%80%94%20customers.png'},
    {title:'D. Value segment × latest-7-day behaviour — value MTD (SDG)', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/D.%20Value%20segment%20%C3%97%20latest-7-day%20behaviour%20%E2%80%94%20value%20MTD%20%28SDG%29.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/D.%20Value%20segment%20%C3%97%20latest-7-day%20behaviour%20%E2%80%94%20value%20MTD%20(SDG).png'},
    {title:'E. Share of each segment’s value by behaviour', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/E.%20Share%20of%20each%20segment%E2%80%99s%20value%20by%20behaviour.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/E.%20Share%20of%20each%20segment%E2%80%99s%20value%20by%20behaviour.png'},
  ],
};
const state = {tab:'services',from:null,to:null,service:[],wallet:[],generation:0,editedDate:false};
const mounted = new Map();
const categoryDomainLoaded = { service: false, wallet: false };
let minDataDate=null,maxDataDate=null;
const preferredDateField='date (Count&amount)';
const $ = id => document.getElementById(id);
const dateLabel = v => new Date(`${v}T12:00:00`).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const htmlEscape = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = v => String(v||'').trim().toLowerCase().replace(/\s+/g,' ');
const friendly = e => String(e?.message||e||'Filter rejected').replace(/\s+/g,' ').slice(0,140);
const canonicalWalletOrder = ['Standard','Silver','Gold Plus','Agent','Merchant','Pos','POS'];

function makeCards(){
  for(const view of VIEWS){
    const card=document.createElement('article');
    card.className='chart-card'+(view.wide?' wide':'');
    card.id=`card-${view.id}`;
    card.style.setProperty('--viz-height',`${view.height}px`);
    const url=ROOT+encodeURIComponent(view.sheet);
    card.innerHTML=`<div class="chart-head"><div><h4 class="chart-title">${htmlEscape(view.title)}</h4><p class="chart-description">${htmlEscape(view.description)}</p></div><span class="chart-num">${htmlEscape(view.id.toUpperCase())}</span></div><div class="chart-body" id="body-${view.id}"><div class="chart-placeholder">Loading Tableau...</div></div><div class="chart-foot" aria-hidden="true"><span class="chart-status" id="status-${view.id}"><span class="status-text">Loading</span></span><a href="${url}" target="_blank" rel="noopener noreferrer">Open on Tableau</a></div>`;
    $(view.container).appendChild(card);
  }
}

function makeBehaviourCards(){
  for(const [containerId, items] of Object.entries(BEHAVIOUR_GROUPS)){
    const host = $(containerId);
    if(!host || host.children.length) continue;
    items.forEach(item => {
      const card = document.createElement('figure');
      card.className = 'behaviour-image-card';
      card.innerHTML = `<a href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="Open original image: ${htmlEscape(item.title)}" title="Open original image at full resolution"><img loading="lazy" src="${item.image}" alt="${htmlEscape(item.title)}" onerror="this.alt='Table image unavailable. Open the original on GitHub.'"></a>`;
      host.appendChild(card);
    });
  }
}

function setStatus(view,text,isError=false){
  const el=$(`status-${view.id}`);
  el.className='chart-status '+(isError?'warning':'ready');
  el.querySelector('.status-text').textContent=text;
  el.title=text;
}
function toUTCDate(s,dayAfter=false){const [y,m,d]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,d+(dayAfter?1:0)));}
function getWorksheets(viz){const sheet=viz.workbook?.activeSheet; if(!sheet) return []; return sheet.sheetType==='worksheet'?[sheet]:[...(sheet.worksheets||[])];}
async function availableFilters(ws){try{return await ws.getFiltersAsync();}catch{return [];}}
function prioritizeNames(filters,candidates){
  const names=filters.map(f=>f.fieldName).filter(Boolean);
  const exact=candidates.filter(c=>names.includes(c));
  const normalized=candidates.filter(c=>!exact.includes(c)&&names.some(n=>normalize(n)===normalize(c)));
  const other=candidates.filter(c=>!exact.includes(c)&&!normalized.includes(c));
  return [...new Set([...exact,...normalized,...other])];
}
async function applyFirst(ws,candidates,action){
  const filters=await availableFilters(ws); const errors=[];
  for(const field of prioritizeNames(filters,candidates)){
    try{await action(field); return {ok:true,field};}
    catch(e){errors.push(`${field}: ${friendly(e)}`);}
  }
  return {ok:false,error:errors[0]||'No matching field'};
}
async function resolvedCategoryValue(ws, kind, desired, fieldName){
  if(kind !== 'service') return desired;
  const filters=await availableFilters(ws);
  const filter=filters.find(f=>normalize(f.fieldName)===normalize(fieldName));
  if(!filter || typeof filter.getDomainAsync!=='function') return desired;
  try {
    const domain=await filter.getDomainAsync();
    const values=(domain?.values||[]).map(v=>String(v.value??v.formattedValue??'')).filter(Boolean);
    return desired.map(item=>values.find(v=>normalize(v)===normalize(item))||item);
  }catch{return desired;}
}
function buildWalletOptions(values){
  const map = new Map();
  values.forEach(v=>{ if(v && v!=='(All)'){ const key=normalize(v); if(!map.has(key)) map.set(key,v); } });
  const preferred=[];
  canonicalWalletOrder.forEach(v=>{ const found=[...map.entries()].find(([k,val])=>k===normalize(v)); if(found){ preferred.push(found[1]); map.delete(found[0]); } });
  const remaining=[...map.values()].sort((a,b)=>a.localeCompare(b));
  return ['all', ...preferred, ...remaining];
}
function resetSelectOptions(select, values, allLabel){
  const previous=new Set([...select.selectedOptions].map(o=>o.value).filter(v=>v!=='all'));
  select.replaceChildren(...values.filter(v=>v!=='all').map(v=>new Option(v,v,false,previous.has(v))));
  renderMultiSelect(select.id==='service-filter'?'service':'wallet');
}
function getSelections(kind){return [...$(kind==='service'?'service-filter':'class-filter').selectedOptions].map(o=>o.value).filter(v=>v!=='all');}
function renderMultiSelect(kind){
  const select=$(kind==='service'?'service-filter':'class-filter');
  const host=$(kind==='service'?'service-multi':'class-multi');
  const title=kind==='service'?'services':'wallet classes';
  const options=[...select.options].filter(o=>o.value!=='all');
  const old=host.querySelector('details');
  const wasOpen=old?.open||false, oldSearch=old?.querySelector('.multi-search')?.value||'';
  const oldScroll=old?.querySelector('.multi-items')?.scrollTop||0;
  host.replaceChildren();
  const details=document.createElement('details');details.open=wasOpen;
  const summary=document.createElement('summary');summary.className='multi-summary';
  const summaryText=document.createElement('span');summaryText.className='multi-summary-text';
  const count=document.createElement('span');count.className='multi-count';
  summary.append(summaryText,count);details.append(summary);
  const menu=document.createElement('div');menu.className='multi-menu';
  const search=document.createElement('input');search.type='search';search.className='multi-search';
  search.placeholder=`Search ${title}…`;search.setAttribute('aria-label',`Search ${title}`);search.value=oldSearch;
  const toolbar=document.createElement('div');toolbar.className='multi-toolbar';
  const selectAll=document.createElement('button');selectAll.type='button';selectAll.textContent='Select all';
  const clear=document.createElement('button');clear.type='button';clear.textContent='Clear';
  toolbar.append(selectAll,clear);
  const items=document.createElement('div');items.className='multi-items';
  const footer=document.createElement('div');footer.className='multi-footer';
  const status=document.createElement('span');
  const done=document.createElement('button');done.type='button';done.textContent='Done';
  done.addEventListener('click',()=>{details.open=false;summary.focus();});
  footer.append(status,done);
  const rows=options.map(option=>{
    const row=document.createElement('label');row.className='multi-option';
    const tick=document.createElement('input');tick.type='checkbox';tick.checked=option.selected;tick.value=option.value;
    const name=document.createElement('span');name.textContent=option.text;
    row.append(tick,name);items.append(row);
    tick.addEventListener('change',()=>{option.selected=tick.checked;refresh();});
    return {row,option,tick};
  });
  function refresh(){
    const chosen=options.filter(o=>o.selected);
    summaryText.textContent=chosen.length===0?`All ${title}`:chosen.length===1?chosen[0].text:`${chosen.length} ${title} selected`;
    count.textContent=chosen.length?String(chosen.length):'All';
    count.classList.toggle('is-all',chosen.length===0);
    status.textContent=chosen.length?`${chosen.length} selected`:`All ${title} included`;
    rows.forEach(r=>r.tick.checked=r.option.selected);
    clear.disabled=chosen.length===0;
  }
  function searchRows(){
    const term=search.value.toLocaleLowerCase().trim();
    let shown=0;
    rows.forEach(({row,option})=>{row.hidden=!option.text.toLocaleLowerCase().includes(term);if(!row.hidden)shown++;});
    let empty=items.querySelector('.multi-empty');
    if(!shown){if(!empty){empty=document.createElement('p');empty.className='multi-empty';empty.textContent='No matching options';items.append(empty);}}
    else empty?.remove();
  }
  search.addEventListener('input',searchRows);
  selectAll.addEventListener('click',()=>{rows.filter(r=>!r.row.hidden).forEach(r=>r.option.selected=true);refresh();});
  clear.addEventListener('click',()=>{options.forEach(o=>o.selected=false);refresh();});
  menu.append(search,toolbar,items,footer);details.append(menu);host.append(details);
  refresh();searchRows();items.scrollTop=oldScroll;
}
document.addEventListener('pointerdown',event=>{
  for(const id of ['service-multi','class-multi']){
    const host=$(id);
    if(!host.contains(event.target)){const details=host.querySelector('details');if(details)details.open=false;}
  }
});
async function loadCategoryDomain(ws,kind){
  
  const filters=await availableFilters(ws);
  const selected=filters.find(f=>FILTER_FIELDS[kind].some(n=>normalize(n)===normalize(f.fieldName)));
  if(!selected || typeof selected.getDomainAsync!=='function') return;
  try{
    const domain=await selected.getDomainAsync();
    const values=(domain?.values||[]).map(v=>String(v.value??v.formattedValue??'')).filter(v=>v&&v!=='(All)'&&!v.startsWith('%'));
    if(!values.length) return;
    const el=$(kind==='service'?'service-filter':'class-filter');
    if(kind==='wallet'){
      const normalized = buildWalletOptions(values);
      resetSelectOptions(el, normalized.slice(1), 'All wallet classes');
      categoryDomainLoaded.wallet = true;
    }else{
      const clean=[...new Map(values.map(v=>[normalize(v),v])).values()];
      resetSelectOptions(el, clean, 'All services');
      categoryDomainLoaded.service = true;
    }
  }catch(e){console.info('Tableau domain lookup unavailable:',friendly(e));}
}
function isoFromTableau(value){
  if(value==null)return null;
  const raw=(typeof value==='object' && 'value' in value)?value.value:value;
  if(raw instanceof Date&&!isNaN(raw))return raw.toISOString().slice(0,10);
  const text=String(raw??'').trim();if(/^\d{4}-\d{2}-\d{2}/.test(text))return text.slice(0,10);
  const parsed=new Date(text);return !isNaN(parsed)?parsed.toISOString().slice(0,10):null;
}
async function discoverDataDates(ws){
  // Tableau published data is the authority; an unavailable domain never becomes a hard-coded cutoff.
  const found=[];
  try{
    const data=await ws.getSummaryDataAsync({maxRows:10000,ignoreAliases:false});
    const indexes=(data.columns||[]).map((col,i)=>({name:col.fieldName||col.caption||'',i})).filter(c=>normalize(c.name)===normalize(preferredDateField));
    for(const row of data.data||[])for(const c of indexes){const iso=isoFromTableau(row[c.i]);if(iso)found.push(iso);}
  }catch(e){console.info('Tableau date summary unavailable:',friendly(e));}
  if(!found.length){
    for(const filter of await availableFilters(ws)){
      if(normalize(filter.fieldName)!==normalize(preferredDateField))continue;
      try{const domain=await filter.getDomainAsync();for(const v of domain?.values||[]){const iso=isoFromTableau(v);if(iso)found.push(iso);}}catch{}
    }
  }
  if(found.length){
    const earliest=found.sort()[0],latest=found[found.length-1];
    minDataDate=minDataDate&&minDataDate<earliest?minDataDate:earliest;
    maxDataDate=maxDataDate&&maxDataDate>latest?maxDataDate:latest;
    if(!state.editedDate && $('date-range-popup').hidden){calendarUI.month=new Date(Number(earliest.slice(0,4)),Number(earliest.slice(5,7))-1,1);renderCalendar();}
  }
}
function mountTab(tab){
  for(const view of VIEWS.filter(v=>v.tab===tab)){
    if(mounted.has(view.id)) continue;
    const viz=document.createElement('tableau-viz');
    viz.id=`viz-${view.id}`;
    viz.setAttribute('src',ROOT+encodeURIComponent(view.sheet));
    viz.setAttribute('toolbar','hidden');
    viz.setAttribute('hide-tabs','');
    viz.setAttribute('width','100%');
    viz.setAttribute('height',`${view.height}px`);
    mounted.set(view.id,{viz,ready:false,view,appliedFields:{},outcome:null});
    viz.addEventListener(TableauEventType.FirstInteractive,async()=>{
      const entry=mounted.get(view.id); entry.ready=true; setStatus(view,'Ready');
      for(const ws of getWorksheets(viz)){ if(view.category) await loadCategoryDomain(ws,view.category); if(view.id==='s2'||view.id==='s1'||view.id==='c2') await discoverDataDates(ws); }
      if(state.service.length||state.wallet.length||state.editedDate){
        await applyToView(view,state.generation); updateMessage();
      }
    });
    viz.addEventListener('error',()=>{setStatus(view,'Tableau failed to load',true); mounted.get(view.id).outcome={failed:['load'],ok:[]}; updateMessage();});
    $(`body-${view.id}`).replaceChildren(viz);
  }
}

const customerFieldCache = new WeakMap();
async function customerFieldNames(ws){
  if(customerFieldCache.has(ws)) return customerFieldCache.get(ws);
  let names=[];
  try{ const sources=await ws.getDataSourcesAsync(); names=sources.flatMap(source=>(source.fields||[]).map(field=>field.name)).filter(Boolean); }
  catch(e){ console.info('Cannot inspect customer data-source fields',ws.name,friendly(e)); }
  try{ names.push(...(await ws.getFiltersAsync()).map(f=>f.fieldName).filter(Boolean)); }
  catch(e){ console.info('Cannot inspect customer quick filters',ws.name,friendly(e)); }
  names=[...new Set(names)]; if(names.length) customerFieldCache.set(ws,names); return names;
}
function customerCandidates(names,kind,view){
  const favorites=kind==='wallet'?FILTER_FIELDS.wallet:(view.date==='registrationDate'?FILTER_FIELDS.registrationDate:view.date==='transactionDate'?FILTER_FIELDS.transactionDate:FILTER_FIELDS.customerDate);
  const matching=favorites.flatMap(want=>names.filter(n=>normalize(n)===normalize(want)));
  const likely=names.filter(n=>kind==='wallet'?/(?:wallet|account)[_\s-]*class|^class$/i.test(n):/date|created|registered|timestamp/i.test(n));
  return [...new Set([...matching,...likely,...favorites])];
}
async function applyCustomerField(ws,kind,view,value){
  const names=await customerFieldNames(ws);
  const candidates=customerCandidates(names,kind,view);
  const metadataKnown=names.length>0;
  const possibilities=metadataKnown?candidates.filter(n=>names.some(actual=>normalize(actual)===normalize(n))):candidates;
  if(!possibilities.length) return {ok:false,error:`No ${kind==='wallet'?'Wallet Class':'date'} field exposed by this published worksheet. Add the field in Tableau and republish.`};
  let lastError='Tableau rejected the field';
  for(const field of possibilities){
    try{
      if(kind==='wallet') await ws.applyFilterAsync(field,value,FilterUpdateType.Replace);
      else await ws.applyRangeFilterAsync(field,{min:toUTCDate(state.from),max:toUTCDate(state.to,true)});
      const filters=await ws.getFiltersAsync();
      const applied=filters.find(f=>normalize(f.fieldName)===normalize(field));
      if(!applied){ lastError=`${field}: Tableau did not create a worksheet filter`; continue; }
      if(kind==='wallet' && Array.isArray(applied.appliedValues) && applied.appliedValues.length){
        const actual=applied.appliedValues.map(v=>String(v.value??v.formattedValue??''));
        if(!value.every(v=>actual.some(a=>normalize(a)===normalize(v)))){ lastError=`${field}: selected wallet class "${value}" was not accepted`; continue; }
      }
      return {ok:true,field};
    }catch(e){ lastError=`${field}: ${friendly(e)}`; }
  }
  return {ok:false,error:lastError};
}
async function clearCustomerField(ws,field){ if(!field) return {ok:true,skipped:true}; try{ await ws.clearFilterAsync(field); return {ok:true}; } catch(e){ return {ok:false,error:`${field}: ${friendly(e)}`}; } }
async function applyToView(view,generation){
  const entry=mounted.get(view.id); if(!entry?.ready) return;
  const worksheets=getWorksheets(entry.viz); if(!worksheets.length){ entry.outcome={ok:[],failed:['No active Tableau worksheet']}; return; }
  const ok=[], failed=[]; const selected=view.category==='service'?state.service:state.wallet;
  for(const ws of worksheets){
    const previous=entry.appliedFields[ws.name] || {};
    if(view.tab==='customers'){
      if(!state.wallet.length){
        if(previous.wallet){ const cleared=await clearCustomerField(ws,previous.wallet); if(cleared.ok){ ok.push(`${ws.name}: wallet class cleared`); delete previous.wallet; } else failed.push(`${ws.name}: wallet class clear: ${cleared.error}`); }
      } else {
        const result=await applyCustomerField(ws,'wallet',view,state.wallet);
        if(result.ok){ const old=previous.wallet; if(old&&old!==result.field) await clearCustomerField(ws,old); previous.wallet=result.field; ok.push(`${ws.name}: wallet class (${result.field})`); }
        else failed.push(`${ws.name}: wallet class: ${result.error}`);
      }
      const dateResult=state.editedDate?await applyCustomerField(ws,'date',view):await clearCustomerField(ws,previous.date);
      if(dateResult.ok){ const old=previous.date; if(state.editedDate){if(old&&old!==dateResult.field)await clearCustomerField(ws,old);previous.date=dateResult.field;}else delete previous.date;ok.push(`${ws.name}: ${state.editedDate?'date ('+dateResult.field+')':'all dates'}`); }
      else failed.push(`${ws.name}: date: ${dateResult.error}`);
      entry.appliedFields[ws.name]=previous;
      continue;
    }
    if(view.category && !selected.length && previous.field){
      try{ await ws.clearFilterAsync(previous.field); ok.push(`${ws.name}: cleared`); delete entry.appliedFields[ws.name]; }
      catch(e){ failed.push(`${ws.name}: clear ${friendly(e)}`); }
    }
    if(view.category && selected.length){
      const result=await applyFirst(ws,FILTER_FIELDS[view.category],async name=>{
        const categoryValue=await resolvedCategoryValue(ws,view.category,selected,name);
        await ws.applyFilterAsync(name,categoryValue,FilterUpdateType.Replace);
      });
      if(result.ok){ entry.appliedFields[ws.name]={...previous,field:result.field}; ok.push(`${ws.name}: ${view.category} (${result.field})`); }
      else failed.push(`${ws.name}: ${view.category}: ${result.error}`);
    }
    if(view.date && !state.editedDate && previous.date){try{await ws.clearFilterAsync(previous.date);delete previous.date;ok.push(`${ws.name}: all dates`);}catch(e){failed.push(`${ws.name}: ${friendly(e)}`);}}
    if(view.date && state.editedDate){
      const result=await applyFirst(ws,FILTER_FIELDS[view.date],name=>ws.applyRangeFilterAsync(name,{min:toUTCDate(state.from),max:toUTCDate(state.to,true)}));
      if(result.ok){previous.date=result.field;entry.appliedFields[ws.name]=previous;ok.push(`${ws.name}: date (${result.field})`);}
      else failed.push(`${ws.name}: date: ${result.error}`);
    }
  }
  entry.outcome={ok,failed};
  if(failed.length) setStatus(view,failed.join(' | '),true); else setStatus(view,ok.length?'Filter applied':'Loaded');
  if(generation!==state.generation) return;
}
function updateMessage(){
  if(state.tab==='behaviour'){
    const el=$('filter-message'); el.classList.remove('warning'); el.textContent='Behaviour tab displays fixed image tables only; website filters do not apply there.'; return;
  }
  const visible=VIEWS.filter(v=>v.tab===state.tab);
  const ready=visible.filter(v=>mounted.get(v.id)?.ready);
  const fails=ready.flatMap(v=>(mounted.get(v.id).outcome?.failed||[]).map(t=>`${v.title}: ${t}`));
  const successes=ready.flatMap(v=>mounted.get(v.id).outcome?.ok||[]);
  const pending=visible.length-ready.length;
  const el=$('filter-message'); el.classList.toggle('warning',fails.length>0);
  if(fails.length){ el.textContent=`${successes.length} filter action(s) succeeded; ${fails.length} issue(s). ${fails.slice(0,3).join(' | ')}${fails.length>3?' | More errors in browser console.':''}`; console.warn('Tableau filter diagnostics',fails); }
  else if(successes.length){ el.textContent=`Applied ${successes.length} filter action(s). ${pending?pending+' chart(s) still loading.':''} Some published views may not contain these fields.`; }
  else { el.textContent=pending?`Waiting for ${pending} Tableau chart(s) to load. Apply again once they appear.`:'No applicable filter was requested, or the charts have no compatible fields.'; }
}
async function applyAll(){
  if(state.tab==='behaviour'){ updateMessage(); return; }
  const generation=++state.generation;
  const button=$('apply-filters'); button.disabled=true;
  const views=VIEWS.filter(v=>v.tab===state.tab);
  $('filter-message').textContent='Applying to Tableau charts...';
  try{ await Promise.allSettled(views.filter(v=>mounted.get(v.id)?.ready).map(v=>applyToView(v,generation))); }
  finally{ button.disabled=false; }
  updateMessage();
}
// Hover selects the range; clicking the LAST date locks the selection.
// Manual date entry and accessible keyboard range selection remain available.
const calendarUI = {month:new Date(2026,10,1),from:null,to:null,pickingEnd:false,hoverAnchor:null,locked:false,manualDirty:false};
const calendarMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function dayISO(y,m,d){return `${String(y).padStart(4,'0')}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;}
function validISO(value){
  if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(value))return false;
  const [y,m,d]=value.split('-').map(Number);
  if(y<1||m<1||m>12||d<1||d>31)return false;
  const dt=new Date(0);dt.setFullYear(y,m-1,d);
  return dt.getFullYear()===y&&dt.getMonth()===m-1&&dt.getDate()===d;
}
function calendarError(message){const el=$('calendar-error');el.textContent=message;el.hidden=!message;}
function manualSync(){
  $('calendar-start-input').value=calendarUI.from||'';
  $('calendar-end-input').value=calendarUI.to||'';
  calendarUI.manualDirty=false;calendarError('');
}
function calendarShift(months){calendarUI.month=new Date(calendarUI.month.getFullYear(),calendarUI.month.getMonth()+months,1);renderCalendar();}
function paintCalendar(){
  const low=calendarUI.from,high=calendarUI.to;
  $('calendar-months').querySelectorAll('.calendar-day').forEach(button=>{
    const iso=button.dataset.date;
    button.classList.toggle('selected',!!low&&!!high&&(iso===low||iso===high));
    button.classList.toggle('in-range',!!low&&!!high&&iso>low&&iso<high);
    button.setAttribute('aria-pressed',String(!!low&&!!high&&iso>=low&&iso<=high));
  });
  const hint=$('calendar-hint');
  hint.textContent=calendarUI.locked?'Range locked. Apply to filter, or choose New range.':calendarUI.hoverAnchor?'Move across dates, then CLICK the last date to lock your range.':'Hover over the first date, move to the last date, then click to lock.';
  $('calendar-new-range').hidden=!calendarUI.locked;
}
function chooseCalendarDate(iso){
  if(calendarUI.locked)return;
  if(!calendarUI.hoverAnchor){calendarUI.hoverAnchor=iso;calendarUI.from=iso;calendarUI.to=iso;}
  else{calendarUI.from=iso<calendarUI.hoverAnchor?iso:calendarUI.hoverAnchor;calendarUI.to=iso<calendarUI.hoverAnchor?calendarUI.hoverAnchor:iso;}
  calendarUI.locked=true;
  calendarUI.pickingEnd=false;
  manualSync();paintCalendar();
}
function renderCalendar(){
  const month=$('calendar-month');month.replaceChildren(...calendarMonths.map((label,i)=>new Option(label,String(i))));
  month.value=String(calendarUI.month.getMonth());$('calendar-year').value=String(calendarUI.month.getFullYear());
  const today=new Date(),todayValue=dayISO(today.getFullYear(),today.getMonth(),today.getDate());
  const fragment=document.createDocumentFragment();
  for(let offset=0;offset<2;offset++){
    const base=new Date(calendarUI.month.getFullYear(),calendarUI.month.getMonth()+offset,1);
    const y=base.getFullYear(),m=base.getMonth();
    const box=document.createElement('div');box.className='calendar-month';
    const title=document.createElement('div');title.className='calendar-month-title';title.textContent=`${calendarMonths[m].slice(0,3)} ${y}`;box.appendChild(title);
    const weekdays=document.createElement('div');weekdays.className='calendar-weekdays';
    for(const name of ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']){const span=document.createElement('span');span.textContent=name;weekdays.appendChild(span);}
    box.appendChild(weekdays);
    const days=document.createElement('div');days.className='calendar-days';
    const first=new Date(y,m,1).getDay(), count=Math.ceil((first+new Date(y,m+1,0).getDate())/7)*7;
    for(let i=0;i<count;i++){
      const dt=new Date(y,m,1+i-first),iso=dayISO(dt.getFullYear(),dt.getMonth(),dt.getDate());
      const button=document.createElement('button');button.type='button';button.className='calendar-day';button.textContent=String(dt.getDate());
      button.dataset.date=iso;
      button.setAttribute('aria-label',`${calendarMonths[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`);
      if(dt.getMonth()!==m)button.classList.add('outside');
      if(iso===todayValue)button.classList.add('today');
      button.addEventListener('pointerenter',event=>{
        if(event.pointerType==='touch'||calendarUI.locked||calendarUI.manualDirty)return;
        if(!calendarUI.hoverAnchor)calendarUI.hoverAnchor=iso;
        calendarUI.from=iso<calendarUI.hoverAnchor?iso:calendarUI.hoverAnchor;
        calendarUI.to=iso<calendarUI.hoverAnchor?calendarUI.hoverAnchor:iso;
        manualSync();paintCalendar();
      });
      button.addEventListener('click',()=>chooseCalendarDate(iso));
      days.appendChild(button);
    }
    box.appendChild(days);fragment.appendChild(box);
  }
  $('calendar-months').replaceChildren(fragment);
  paintCalendar();
}
function closeCalendar(){$('date-range-popup').hidden=true;$('date-range-trigger').setAttribute('aria-expanded','false');}
function openCalendar(){
  calendarUI.from=state.editedDate?$('date-from').value:null;calendarUI.to=state.editedDate?$('date-to').value:null;
  calendarUI.hoverAnchor=null;calendarUI.locked=!!state.editedDate;calendarUI.pickingEnd=false;
  const base=calendarUI.from||minDataDate||new Date().toISOString().slice(0,10);const [y,m]=base.split('-').map(Number);calendarUI.month=new Date(y,m-1,1);
  manualSync();renderCalendar();$('date-range-popup').hidden=false;$('date-range-trigger').setAttribute('aria-expanded','true');
}
function syncDateLabel(){$('date-range-text').textContent=state.editedDate?`${$('date-from').value} → ${$('date-to').value}`:'All available dates';}
$('date-range-trigger').addEventListener('click',()=>{$('date-range-popup').hidden?openCalendar():closeCalendar();});
$('calendar-prev').addEventListener('click',()=>calendarShift(-1));
$('calendar-next').addEventListener('click',()=>calendarShift(1));
$('calendar-month').addEventListener('change',()=>{calendarUI.month=new Date(calendarUI.month.getFullYear(),Number($('calendar-month').value),1);renderCalendar();});
$('calendar-year').addEventListener('change',()=>{const year=Number($('calendar-year').value);if(Number.isInteger(year)&&year>=1&&year<=9999){calendarUI.month=new Date(year,calendarUI.month.getMonth(),1);renderCalendar();}});
$('calendar-new-range').addEventListener('click',()=>{
  calendarUI.from=null;calendarUI.to=null;calendarUI.hoverAnchor=null;calendarUI.locked=false;
  manualSync();paintCalendar();
});
// Text fields can be freely edited; valid input is reflected in the calendar.
for(const id of ['calendar-start-input','calendar-end-input']){
  $(id).addEventListener('input',()=>{calendarUI.manualDirty=true;calendarError('');});
  $(id).addEventListener('change',()=>{
    const from=$('calendar-start-input').value.trim(),to=$('calendar-end-input').value.trim();
    if(validISO(from)&&validISO(to)&&from<=to){calendarUI.from=from;calendarUI.to=to;calendarUI.pickingEnd=false;calendarUI.locked=true;calendarUI.hoverAnchor=null;calendarUI.manualDirty=false;const [y,m]=from.split('-').map(Number);calendarUI.month=new Date(y,m-1,1);renderCalendar();}
  });
}
$('calendar-cancel').addEventListener('click',closeCalendar);
$('calendar-apply').addEventListener('click',()=>{
  const from=$('calendar-start-input').value.trim(),to=$('calendar-end-input').value.trim();
  if(!validISO(from)||!validISO(to)){calendarError('Enter both dates in YYYY-MM-DD format (for example, 2026-11-12).');return;}
  if(from>to){calendarError('End date must be on or after the start date.');return;}
  calendarUI.from=from;calendarUI.to=to;
  $('date-from').value=from;$('date-to').value=to;
  state.editedDate=true;syncDateLabel();closeCalendar();if(readInputs())applyAll();
});
document.addEventListener('pointerdown',event=>{if(!$('date-range-field').contains(event.target))closeCalendar();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('date-range-popup').hidden){closeCalendar();$('date-range-trigger').focus();}});

function updatePeriod(){ $('period-label').textContent=state.editedDate?`Dates selected: ${dateLabel(state.from)} – ${dateLabel(state.to)}`:'Dates selected: All available dates'; }
function changeTab(tab){
  state.tab=tab;
  for(const name of ['services','customers','behaviour']){
    const active=name===tab, button=$(`tab-${name}`);
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active)); button.tabIndex=active?0:-1;
    $(`panel-${name}`).hidden=!active;
  }
  $('service-field').hidden=tab!=='services';
  $('class-field').hidden=tab!=='customers';
  const behaviourTab = tab==='behaviour';
  $('filterbar').hidden = behaviourTab;
  $('apply-filters').disabled=behaviourTab;
  $('reset-filters').disabled=behaviourTab;
  $('date-range-trigger').disabled=behaviourTab;
  if(behaviourTab) closeCalendar();
  if(behaviourTab){
    $('filter-message').textContent='Behaviour tab displays static image tables; website filters do not apply on this page.';
    $('filter-message').classList.remove('warning');
  } else {
    $('filter-message').textContent='Choose a service or wallet class and click Apply filters. Filter results and failures appear here.';
    $('filter-message').classList.remove('warning');
  }
  if(tab==='services' || tab==='customers') mountTab(tab);
  window.dispatchEvent(new Event('resize'));
}
function readInputs(){
  const from=$('date-from').value,to=$('date-to').value;
  if(state.editedDate&&(!from||!to||from>to)){ $('filter-message').classList.add('warning'); $('filter-message').textContent='Choose a valid date range.'; return false; }
  state.from=state.editedDate?from:null;state.to=state.editedDate?to:null;state.service=getSelections('service');state.wallet=getSelections('wallet');updatePeriod();return true;
}

makeCards();
makeBehaviourCards();
document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{ changeTab(button.dataset.tab); history.replaceState(null,'',`#${button.dataset.tab}`); }));
for(const id of ['date-from','date-to']) $(id).addEventListener('change',()=>{ state.editedDate=true; });
$('apply-filters').addEventListener('click',async()=>{ if(readInputs()) await applyAll(); });
$('reset-filters').addEventListener('click',async()=>{state.editedDate=false;$('date-from').value='';$('date-to').value='';syncDateLabel();closeCalendar();for(const id of ['service-filter','class-filter'])for(const o of $(id).options)o.selected=false;renderMultiSelect('service');renderMultiSelect('wallet');if(readInputs())await applyAll();});
for(const kind of ['service','wallet'])renderMultiSelect(kind);
$('calendar-all').addEventListener('click',async()=>{state.editedDate=false;state.from=null;state.to=null;$('date-from').value='';$('date-to').value='';syncDateLabel();closeCalendar();updatePeriod();await applyAll();});
updatePeriod();syncDateLabel();
const initial = location.hash==='#customers' ? 'customers' : (location.hash==='#behaviour' ? 'behaviour' : 'services');
changeTab(initial);
