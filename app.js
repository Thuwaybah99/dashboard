/* Bravo Wallet Transfer Analysis Board
 * All visualization URLs below come from user-provided Tableau Public embed snippets.
 * Filter field names are configurable; the actual names must match published Tableau fields.
 */
import { TableauEventType, FilterUpdateType } from 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';

const ROOT = 'https://public.tableau.com/views/WalletTransferSheet/';
const FILTER_FIELDS = {
  service: ['Services', 'Service', 'Service Type', 'Service type', 'SERVICE', 'service', 'service_type'],
  wallet: ['Wallet Class', 'wallet_class', 'Wallet class', 'Account Class', 'account_class', 'class'],
  transactionDate: ['date (Count&amount)', 'date (Count&Amount)', 'date', 'Date', 'Transaction Date', 'Transaction date', 'Tran Date', 'tran_date', 'TRAN_DATE', 'TransactionDate'],
  registrationDate: ['Registration Date', 'Registration date', 'RegistrationDate', 'Created At', 'created_at', 'Date'],
};
// For filtering: 'service', 'wallet', or none. Date role: transactionDate, registrationDate, or none.
// 'comparison' views stay unfiltered by wallet class/service to preserve meaningful percentages.
const VIEWS = [
  {id:'s1',tab:'services',container:'service-kpis',sheet:'TransactionsamountSDG',title:'Transactions Amount (SDG)',description:'Value of wallet transfer service transactions',height:195,date:'transactionDate',category:'service'},
  {id:'s2',tab:'services',container:'service-kpis',sheet:'Totaltransactioncount',title:'Total Transactions Count',description:'Number of transactions across services',height:195,date:'transactionDate',category:'service'},
  {id:'s3',tab:'services',container:'service-kpis',sheet:'AverageticketSDG_1',title:'Average Ticket (SDG)',description:'Average transaction value',height:195,date:'transactionDate',category:'service'},
  {id:'s4',tab:'services',container:'service-composition',sheet:'ServiceShareofValue',title:'Service Share of Value',description:'Relative contribution of each service to transaction value · comparison view',height:440,date:'transactionDate',category:null,wide:true},
  {id:'s5',tab:'services',container:'service-trends',sheet:'Servicesdailytotals',title:'Services Daily Totals',description:'Daily transaction performance by service',height:470,date:'transactionDate',category:'service',wide:true},
  {id:'s6',tab:'services',container:'service-trends',sheet:'Sheet6',title:'Service Transactions per Day',description:'Daily transaction count by service',height:470,date:'transactionDate',category:'service',wide:true},
  {id:'c0',tab:'customers',container:'customer-overview',sheet:'Customersinextract',title:'All Active Customers',description:'Customers included in the Tableau extract · snapshot metric',height:195,date:null,category:'wallet'},
  {id:'c1',tab:'customers',container:'customer-overview',sheet:'RegisteredinNov',title:'Registered in November',description:'New customer registrations in November',height:195,date:'registrationDate',category:'wallet'},
  {id:'c2',tab:'customers',container:'customer-activity',sheet:'Sheet9',title:'Active Users by Day',description:'Daily active customers',height:410,date:'transactionDate',category:'wallet',wide:true},
  {id:'c3',tab:'customers',container:'customer-classes',sheet:'Sheet102',title:'Wallet Class Mix (All Customers)',description:'Distribution of the overall customer base · comparison view',height:400,date:null,category:null},
  {id:'c4',tab:'customers',container:'customer-classes',sheet:'WalletClassShareofValue2',title:'Wallet Class Share of Transaction Value',description:'Value contribution by wallet class · comparison view (verify metric in Tableau)',height:400,date:'transactionDate',category:null},
  {id:'c5',tab:'customers',container:'customer-location',sheet:'Sheet10',title:'Customers by State',description:'Customer distribution by location',height:480,date:null,category:'wallet'},
  {id:'c6',tab:'customers',container:'customer-overview',sheet:'Stateunknown',title:'Unknown State',description:'Customers with missing or unknown state information',height:195,date:null,category:'wallet'},
];

const state = {tab:'services',from:'2026-11-01',to:'2026-11-11',service:'all',wallet:'all',generation:0};
const mounted = new Map();
const $ = id => document.getElementById(id);
const dateLabel = value => new Date(`${value}T12:00:00`).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const htmlEscape = str => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function makeCards(){
  for(const view of VIEWS){
    const card = document.createElement('article');
    card.className='chart-card'+(view.wide?' wide':'');
    card.id=`card-${view.id}`;
    card.style.setProperty('--viz-height',`${view.height}px`);
    const url = ROOT + encodeURIComponent(view.sheet);
    card.innerHTML=`<div class="chart-head"><div><h4 class="chart-title">${htmlEscape(view.title)}</h4><p class="chart-description">${htmlEscape(view.description)}</p></div><span class="chart-num">${htmlEscape(view.id.toUpperCase())}</span></div><div class="chart-body" id="body-${view.id}"><div class="chart-placeholder"><span class="placeholder-shape">▥</span><strong>Tableau visualization</strong><span>Loads when this tab is opened</span></div></div><div class="chart-foot" aria-hidden="true"><span class="chart-status" id="status-${view.id}"><span class="status-dot"></span><span class="status-text">Not loaded</span></span><a class="chart-link" target="_blank" rel="noopener noreferrer" href="${url}">Open on Tableau ↗</a></div>`;
    $(view.container).appendChild(card);
  }
}
function setStatus(view,text,warning=false){
  const element=$(`status-${view.id}`);
  element.className='chart-status '+(warning?'warning':'ready');
  element.querySelector('.status-text').textContent=text;
  element.title=text;
}
function toUTCDate(s,dayAfter=false){
  const [y,m,d]=s.split('-').map(Number);
  return new Date(Date.UTC(y,m-1,d+(dayAfter?1:0)));
}

function mountTab(tab){
  for(const view of VIEWS.filter(v=>v.tab===tab)){
    if(mounted.has(view.id))continue;
    const viz=document.createElement('tableau-viz');
    viz.id=`viz-${view.id}`;
    viz.setAttribute('src',ROOT + encodeURIComponent(view.sheet));
    viz.setAttribute('toolbar','hidden');
    viz.setAttribute('hide-tabs','');
    viz.setAttribute('width','100%');
    viz.setAttribute('height',`${view.height}px`);
    const body=$(`body-${view.id}`);
    body.replaceChildren(viz);
    mounted.set(view.id,{viz,ready:false,view});
    setStatus(view,'Loading Tableau…');
    viz.addEventListener(TableauEventType.FirstInteractive,async()=>{
      const item=mounted.get(view.id);if(!item)return;
      item.ready=true;
      setStatus(view,'Loaded · filters not yet checked');
      await applyToView(view,state.generation);
    });
    viz.addEventListener('error',()=>setStatus(view,'Could not load Tableau. Try “Open on Tableau”.',true));
  }
}

function activeWorksheet(viz){
  const sheet=viz.workbook?.activeSheet;
  if(!sheet)return null;
  if(sheet.sheetType==='worksheet')return sheet;
  // This viewer expects a single worksheet. For dashboards, the first worksheet is used.
  return sheet.worksheets?.[0] || null;
}
async function tryField(sheet,candidates,callback){
  // Try exact field names first. Tableau's field names are case-sensitive and can be renamed.
  let known=[];
  try { known=(await sheet.getFiltersAsync()).map(f=>f.fieldName).filter(Boolean); }catch(e){}
  const ordered=[...candidates].sort((a,b)=>(known.includes(b)?1:0)-(known.includes(a)?1:0));
  for(const name of ordered){
    try {await callback(name);return name;}catch(e) { /* Try the next configured candidate. */ }
  }
  return null;
}
async function applyToView(view,generation){
  const item=mounted.get(view.id);
  if(!item?.ready || generation!==state.generation)return;
  const ws=activeWorksheet(item.viz);
  if(!ws){setStatus(view,'Tableau view loaded; filtering unavailable',true);return;}
  const attempted=[];
  const succeeded=[];
  if(view.date){
    attempted.push('date');
    const field=await tryField(ws,FILTER_FIELDS[view.date],n=>ws.applyRangeFilterAsync(n,{min:toUTCDate(state.from),max:toUTCDate(state.to,true)}));
    if(field)succeeded.push('date');
  }
  if(view.category){
    const value=view.category==='service'?state.service:state.wallet;
    // Apply category filter even at 'All', clearing filters applied by the website.
    if(value!=='all'){
      attempted.push(view.category==='service'?'service':'class');
      const candidates=FILTER_FIELDS[view.category];
      const field=await tryField(ws,candidates,n=>ws.applyFilterAsync(n,[value],FilterUpdateType.Replace));
      if(field)succeeded.push(view.category==='service'?'service':'class');
    }else if(item.appliedCategory){
      try{await ws.clearFilterAsync(item.appliedCategory);item.appliedCategory=null;}catch(e){}
    }
  }
  // Remember which field we applied to ensure Reset clears that exact filter.
  // Note: if user filters directly in Tableau, website reset does not reset arbitrary manual filters.
  if(generation!==state.generation)return;
  if(!attempted.length){setStatus(view,'Loaded · overall comparison/snapshot');return;}
  if(succeeded.length===attempted.length){setStatus(view,`Filtered: ${succeeded.join(' + ')}`);return;}
  const missing=attempted.filter(x=>!succeeded.includes(x));
  setStatus(view,`Loaded · filter field not found: ${missing.join(', ')}`,true);
}
// Override category application to remember the successful Tableau field name per view.
async function applyAll(){
  const generation=++state.generation;
  const views=VIEWS.filter(v=>v.tab===state.tab && mounted.get(v.id)?.ready);
  $('apply-filters').disabled=true;
  $('filter-message').classList.remove('warning');
  $('filter-message').textContent=`Applying filters to ${views.length} loaded Tableau charts…`;
  const results=await Promise.allSettled(views.map(async v=>{
    const item=mounted.get(v.id);
    if(item.appliedCategory && (v.category==='service'?state.service:state.wallet)==='all'){
      try{await activeWorksheet(item.viz).clearFilterAsync(item.appliedCategory);}catch(e){}
      item.appliedCategory=null;
    }
    await applyToView(v,generation);
  }));
  $('apply-filters').disabled=false;
  const warnings=views.filter(v=>$(`status-${v.id}`).classList.contains('warning')).length;
  if(warnings){$('filter-message').classList.add('warning');$('filter-message').textContent=`${views.length-warnings} chart(s) ready; ${warnings} chart(s) could not apply every requested filter: ${views.filter(v => $('status-'+v.id).classList.contains('warning')).map(v=>v.title).join(', ')}. Confirm those fields exist in the Tableau worksheets.`;}
  else {$('filter-message').textContent='Filter request completed. Charts without relevant fields may remain unchanged; comparison and snapshot charts intentionally retain their broader view.';}
  void results;
}

function updatePeriod(){ $('period-label').textContent=`Dates selected: ${dateLabel(state.from)} – ${dateLabel(state.to)}`; }
function changeTab(tab){
  state.tab=tab;
  for(const name of ['services','customers']){
    const active=name===tab;
    const button=$(`tab-${name}`);
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
    button.tabIndex=active?0:-1;
    $(`panel-${name}`).hidden=!active;
  }
  $('service-field').hidden=tab!=='services';
  $('class-field').hidden=tab!=='customers';
  $('filter-message').textContent='Charts connect directly to Tableau Public. Use Apply filters to update compatible views.';
  $('filter-message').classList.remove('warning');
  mountTab(tab);
  // Allow embedded Tableau to measure its final visible dimensions.
  window.dispatchEvent(new Event('resize'));
}
function readInputs(){
  const from=$('date-from').value,to=$('date-to').value;
  if(!from||!to||from>to){$('filter-message').classList.add('warning');$('filter-message').textContent='Please choose a valid date range (From must be on or before To).';return false;}
  state.from=from;state.to=to;state.service=$('service-filter').value;state.wallet=$('class-filter').value;
  updatePeriod();return true;
}

// Store successfully applied category fields for reliable reset.
// Wrap original API method at view mount time rather than guessing the Tableau field label.
const oldApplyToView=applyToView;
applyToView=async function(view,generation){
  const item=mounted.get(view.id);if(!item?.ready||generation!==state.generation)return;
  const ws=activeWorksheet(item.viz);if(!ws){setStatus(view,'Tableau sheet unavailable for filters',true);return;}
  let total=0,ok=0;
  if(view.date){
    total++;
    const name=await tryField(ws,FILTER_FIELDS[view.date],f=>ws.applyRangeFilterAsync(f,{min:toUTCDate(state.from),max:toUTCDate(state.to,true)}));
    if(name)ok++;
  }
  if(view.category){
    const val=view.category==='service'?state.service:state.wallet;
    if(val==='all'){
      if(item.appliedCategory){try{await ws.clearFilterAsync(item.appliedCategory);}catch(e){}item.appliedCategory=null;}
    } else {
      total++;
      const name=await tryField(ws,FILTER_FIELDS[view.category],f=>ws.applyFilterAsync(f,[val],FilterUpdateType.Replace));
      if(name){ok++;item.appliedCategory=name;}
    }
  }
  if(generation!==state.generation)return;
  if(total===0){setStatus(view,'Loaded · overall comparison/snapshot');return;}
  if(total===ok){setStatus(view,'Filters applied');return;}
  setStatus(view,`Loaded · ${total-ok} filter field(s) unavailable`,true);
};

makeCards();
document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{changeTab(button.dataset.tab);history.replaceState(null,'',`#${button.dataset.tab}`);}));
$('apply-filters').addEventListener('click',async()=>{if(readInputs())await applyAll();});
$('reset-filters').addEventListener('click',async()=>{
  $('date-from').value='2026-11-01';$('date-to').value='2026-11-11';$('service-filter').value='all';$('class-filter').value='all';
  if(readInputs())await applyAll();
});
const startTab=location.hash==='#customers'?'customers':'services';
updatePeriod();changeTab(startTab);
