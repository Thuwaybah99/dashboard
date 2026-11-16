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
  registrationDate: ['Registration Date', 'Registration date', 'RegistrationDate', 'Created At', 'created_at', 'registration_date', 'registered_at', 'date (Customers)', 'Date'],
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
  'behaviour-top': [
    {title:'Weeks of the months', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/Weeks%20of%20the%20months.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/Weeks%20of%20the%20months.png', wide:true},
    {title:'Customers', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/Customers.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/Customers.png'},
    {title:'% of cohort active', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/%25%20of%20cohort%20active.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/%25%20of%20cohort%20active.png'}
  ],
  'behaviour-middle': [
    {title:'A. Behaviour segments — latest 7 days', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/A.%20Behaviour%20segments%20%E2%80%94%20latest%207%20days.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/A.%20Behaviour%20segments%20%E2%80%94%20latest%207%20days.png'},
    {title:'B. Recency — days since last transaction (all customers seen this month)', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/B.%20Recency%20%E2%80%94%20days%20since%20last%20transaction%20%28all%20customers%20seen%20this%20month%29.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/B.%20Recency%20%E2%80%94%20days%20since%20last%20transaction%20(all%20customers%20seen%20this%20month).png'},
    {title:'B. Frequency bands (transactions month to date)', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/B.%20Frequency%20bands%20%28transactions%20month%20to%20date%29.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/B.%20Frequency%20bands%20(transactions%20month%20to%20date).png'}
  ],
  'behaviour-value': [
    {title:'A. Value segments', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/A.%20Value%20segments.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/A.%20Value%20segments.png'},
    {title:'B. Share of value held by the top customers', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/B.%20Share%20of%20value%20held%20by%20the%20top%20customers.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/B.%20Share%20of%20value%20held%20by%20the%20top%20customers.png'},
    {title:'A. Average ticket-size bands', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/A.%20Average%20ticket-size%20bands.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/A.%20Average%20ticket-size%20bands.png'}
  ],
  'behaviour-cross': [
    {title:'C. Value segment × latest-7-day behaviour — customers', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/C.%20Value%20segment%20%C3%97%20latest-7-day%20behaviour%20%E2%80%94%20customers.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/C.%20Value%20segment%20%C3%97%20latest-7-day%20behaviour%20%E2%80%94%20customers.png'},
    {title:'D. Value segment × latest-7-day behaviour — value MTD (SDG)', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/D.%20Value%20segment%20%C3%97%20latest-7-day%20behaviour%20%E2%80%94%20value%20MTD%20%28SDG%29.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/D.%20Value%20segment%20%C3%97%20latest-7-day%20behaviour%20%E2%80%94%20value%20MTD%20(SDG).png'},
    {title:'E. Share of each segment’s value by behaviour', image:'https://raw.githubusercontent.com/Thuwaybah99/dashboard/main/Customer%20behaviour/E.%20Share%20of%20each%20segment%E2%80%99s%20value%20by%20behaviour.png', href:'https://github.com/Thuwaybah99/dashboard/blob/main/Customer%20behaviour/E.%20Share%20of%20each%20segment%E2%80%99s%20value%20by%20behaviour.png'}
  ]
};

const state = {tab:'services',from:'2026-11-01',to:'2026-11-11',service:'all',wallet:'all',generation:0,editedDate:false};
const mounted = new Map();
const categoryDomainLoaded = { service: false, wallet: false };
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
      const card = document.createElement('article');
      card.className = 'behaviour-card' + (item.wide ? ' wide' : '');
      card.innerHTML = `<a class="behaviour-link" href="${item.href}" target="_blank" rel="noopener noreferrer"><div class="behaviour-head"><h4>${htmlEscape(item.title)}</h4><span>Open source</span></div><div class="behaviour-image-wrap"><img loading="lazy" src="${item.image}" alt="${htmlEscape(item.title)}"></div></a>`;
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
    const match=values.find(v=>normalize(v)===normalize(desired));
    return match||desired;
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
  const current = select.value;
  select.innerHTML='';
  select.add(new Option(allLabel,'all'));
  values.forEach(v=>{ if(v!=='all') select.add(new Option(v, v)); });
  if([...select.options].some(o=>o.value===current)) select.value=current;
}
async function loadCategoryDomain(ws,kind){
  if(kind==='wallet' && categoryDomainLoaded.wallet) return;
  if(kind==='service' && categoryDomainLoaded.service) return;
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
      for(const ws of getWorksheets(viz)){ if(view.category) await loadCategoryDomain(ws,view.category); }
      if(view.tab==='customers'||state.service!=='all'||state.wallet!=='all'||state.editedDate){
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
      if(kind==='wallet') await ws.applyFilterAsync(field,[value],FilterUpdateType.Replace);
      else await ws.applyRangeFilterAsync(field,{min:toUTCDate(state.from),max:toUTCDate(state.to,true)});
      const filters=await ws.getFiltersAsync();
      const applied=filters.find(f=>normalize(f.fieldName)===normalize(field));
      if(!applied){ lastError=`${field}: Tableau did not create a worksheet filter`; continue; }
      if(kind==='wallet' && Array.isArray(applied.appliedValues) && applied.appliedValues.length){
        const actual=applied.appliedValues.map(v=>String(v.value??v.formattedValue??''));
        if(!actual.some(v=>normalize(v)===normalize(value))){ lastError=`${field}: selected wallet class "${value}" was not accepted`; continue; }
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
      if(state.wallet==='all'){
        if(previous.wallet){ const cleared=await clearCustomerField(ws,previous.wallet); if(cleared.ok){ ok.push(`${ws.name}: wallet class cleared`); delete previous.wallet; } else failed.push(`${ws.name}: wallet class clear: ${cleared.error}`); }
      } else {
        const result=await applyCustomerField(ws,'wallet',view,state.wallet);
        if(result.ok){ const old=previous.wallet; if(old&&old!==result.field) await clearCustomerField(ws,old); previous.wallet=result.field; ok.push(`${ws.name}: wallet class (${result.field})`); }
        else failed.push(`${ws.name}: wallet class: ${result.error}`);
      }
      const dateResult=await applyCustomerField(ws,'date',view);
      if(dateResult.ok){ const old=previous.date; if(old&&old!==dateResult.field) await clearCustomerField(ws,old); previous.date=dateResult.field; ok.push(`${ws.name}: date (${dateResult.field})`); }
      else failed.push(`${ws.name}: date: ${dateResult.error}`);
      entry.appliedFields[ws.name]=previous;
      continue;
    }
    if(view.category && selected==='all' && previous.field){
      try{ await ws.clearFilterAsync(previous.field); ok.push(`${ws.name}: cleared`); delete entry.appliedFields[ws.name]; }
      catch(e){ failed.push(`${ws.name}: clear ${friendly(e)}`); }
    }
    if(view.category && selected!=='all'){
      const result=await applyFirst(ws,FILTER_FIELDS[view.category],async name=>{
        const categoryValue=await resolvedCategoryValue(ws,view.category,selected,name);
        await ws.applyFilterAsync(name,[categoryValue],FilterUpdateType.Replace);
      });
      if(result.ok){ entry.appliedFields[ws.name]={field:result.field}; ok.push(`${ws.name}: ${view.category} (${result.field})`); }
      else failed.push(`${ws.name}: ${view.category}: ${result.error}`);
    }
    if(view.date){
      const result=await applyFirst(ws,FILTER_FIELDS[view.date],name=>ws.applyRangeFilterAsync(name,{min:toUTCDate(state.from),max:toUTCDate(state.to,true)}));
      if(result.ok) ok.push(`${ws.name}: date (${result.field})`);
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
function updatePeriod(){ $('period-label').textContent=`Dates selected: ${dateLabel(state.from)} – ${dateLabel(state.to)}`; }
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
  $('filterbar').classList.toggle('filters-disabled', behaviourTab);
  $('apply-filters').disabled=behaviourTab;
  $('reset-filters').disabled=behaviourTab;
  $('date-from').disabled=behaviourTab;
  $('date-to').disabled=behaviourTab;
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
  if(!from||!to||from>to){ $('filter-message').classList.add('warning'); $('filter-message').textContent='Choose a valid date range.'; return false; }
  state.from=from; state.to=to; state.service=$('service-filter').value; state.wallet=$('class-filter').value; updatePeriod(); return true;
}

makeCards();
makeBehaviourCards();
document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{ changeTab(button.dataset.tab); history.replaceState(null,'',`#${button.dataset.tab}`); }));
for(const id of ['date-from','date-to']) $(id).addEventListener('change',()=>{ state.editedDate=true; });
$('apply-filters').addEventListener('click',async()=>{ if(readInputs()) await applyAll(); });
$('reset-filters').addEventListener('click',async()=>{ $('date-from').value='2026-11-01'; $('date-to').value='2026-11-11'; $('service-filter').value='all'; $('class-filter').value='all'; state.editedDate=false; if(readInputs()) await applyAll(); });
updatePeriod();
const initial = location.hash==='#customers' ? 'customers' : (location.hash==='#behaviour' ? 'behaviour' : 'services');
changeTab(initial);
