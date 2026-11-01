/* Phase 6 — offline, dependency-free educational analysis engine.
   This is NOT Cadence PSpice: only the reference 3-resistor circuit plus an isolated
   analytical RC teaching example are supported. No network or dynamic imports. */
(()=>{'use strict';
const C=window.PSpiceCaptureBridge,$=q=>document.querySelector(q);
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const K={transient:'Time Domain (Transient)',dc:'DC Sweep',ac:'AC Sweep/Noise',bias:'Bias Point'};
const engineering=x=>{const m=String(x??'').trim().replace(/\s/g,'').replace(/[µμ]/g,'u').match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(meg|[kmunp]?)(v|a|f|s|hz|ohm|Ω)?$/i);if(!m)return NaN;return Number(m[1])*({meg:1e6,k:1e3,m:1e-3,u:1e-6,n:1e-9,p:1e-12,'':1}[m[2].toLowerCase()]);};
const fm=(n,unit='',digits=2)=>Number.isFinite(n)?(Math.abs(n)<1e-12&&n!==0?n.toExponential(2):Number(n.toFixed(digits)).toLocaleString('en-US',{maximumFractionDigits:digits}))+unit:'—';
const DEFAULT=()=>({name:'Run1',type:'transient',circuit:'reference',runTo:'100ms',maxStep:'0.1ms',delay:'0',start:'0V',end:'200V',increment:'10V',source:'V1',sweepMode:'linear',fStart:'10Hz',fEnd:'100kHz',points:20,rcR:'1k',rcC:'1u',rcV:'5V'});
let profile=null,last=null,annotationBias=null,markers=[],visibility={volt:false,current:false,powerw:false},cursorIndex=0,visibleSeries=[true,true];
const root=$('#phase6-root');
function error(message){C.showTip(message);C.writeLog('Simulation error: '+message);}
function getRaw(){return C.getCircuitData()}
function numeric(source){const d=getRaw(),result={};for(const p of d.parts)if(['R','C','VDC'].includes(p.type))result[p.id]=engineering(p.value);return result;}
function dcSolve(voltage){const d=getRaw(),v=d.validation;if(!v.ok)throw Error('مدار اتصال‌های معتبری ندارد: '+v.issues.join(' ؛ '));const a=numeric();const R1=a.R1,R2=a.R2,R3=a.R3;if(!(R1>0&&R2>0&&R3>0&&Number.isFinite(voltage)))throw Error('مقادیر مدار معتبر نیستند.');
 // Circuit: R1 is across the source; R3 and R2 form the second series branch.
 const i1=voltage/R1,i23=voltage/(R2+R3),vo=i23*R2,p1=i1*i1*R1,p2=i23*i23*R2,p3=i23*i23*R3;
 return {input:voltage,out:vo,i1,i23,itotal:i1+i23,p1,p2,p3,pSource:-voltage*(i1+i23),r1:R1,r2:R2,r3:R3,nodes:d.nodes};}
function rcParams(p){const R=engineering(p.rcR),Cval=engineering(p.rcC),V=engineering(p.rcV);if(!(R>0&&Cval>0&&Number.isFinite(V)))throw Error('مقادیر مدار تکمیلی RC نامعتبرند.');return {R,C:Cval,V,tau:R*Cval}}
function positive(x,label){const v=engineering(x);if(!Number.isFinite(v)||v<=0)throw Error('مقدار '+label+' باید مثبت و معتبر باشد.');return v}
function calculate(p){let series=[],meta={},bias=null;
 if(p.type!=='ac'&&p.circuit==='reference')bias=dcSolve(numeric().V1);
 if(p.type==='bias'){
  if(p.circuit!=='reference')throw Error('Bias Point فقط برای مدار مقاومتی مرجع پشتیبانی می‌شود.');
  const b=bias;series=[{x:0,y1:0,y2:0},{x:1,y1:b.input,y2:b.out}];meta={title:'DC Bias Point',xTitle:'گره‌های مدار',yTitle:'Voltage (V)',labels:['V(A)','V(R2 top)'],kind:'bias',notes:'مقادیر نقطه کار DC روی شماتیک نیز قابل نمایش‌اند.'};
 } else if(p.type==='dc'){
  if(p.circuit!=='reference')throw Error('DC Sweep فقط برای مدار مقاومتی مرجع پشتیبانی می‌شود.');
  if(p.source!=='V1')throw Error('در این نمونه فقط منبع V1 قابل Sweep است.');
  const st=engineering(p.start),en=engineering(p.end),inc=positive(p.increment,'Increment');
  if(!Number.isFinite(st)||!Number.isFinite(en)||en<st)throw Error('Start و End باید معتبر باشند و End از Start کوچک‌تر نباشد.');
  const count=Math.floor((en-st)/inc+1e-8)+1;if(count>2001)throw Error('حداکثر ۲۰۰۱ نقطه برای DC Sweep مجاز است.');
  for(let i=0;i<count;i++){const x=st+i*inc,b=dcSolve(x);series.push({x,y1:b.out,y2:b.i23*1e3});}
  if(series.length&&Math.abs(series.at(-1).x-en)>Math.max(1e-9,inc*1e-6)){const b=dcSolve(en);series.push({x:en,y1:b.out,y2:b.i23*1e3});}
  meta={title:'DC Sweep – V1',xTitle:'V1 (V)',yTitle:'V(R2 top) (V)',labels:['V(R2 top) (V)','I(R2) (mA)'],kind:'dc',notes:'ولتاژ خروجی متناسب با V1 تغییر می‌کند؛ جریان شاخه به میلی‌آمپر رسم می‌شود.'};
 } else if(p.type==='transient'){
  const T=positive(p.runTo,'Run to time'),step=positive(p.maxStep,'Maximum step size'),delay=engineering(p.delay||'0');if(!Number.isFinite(delay)||delay<0||delay>=T)throw Error('Start saving data after باید بین صفر و زمان پایان باشد.');
  const count=Math.min(1600,Math.max(2,Math.ceil((T-delay)/step)+1));const dt=(T-delay)/(count-1);
  if(p.circuit==='reference'){
   for(let i=0;i<count;i++)series.push({x:(delay+i*dt)*1000,y1:bias.out,y2:bias.input});
   meta={title:'Transient – DC resistor circuit',xTitle:'Time (ms)',yTitle:'Voltage (V)',labels:['V(R2 top)','V(A)'],kind:'transient',notes:'در مدار صرفاً مقاومتی با منبع DC ثابت، ولتاژها در طول زمان ثابت هستند. این رفتار صحیح است.'};
  }else{
   const rc=rcParams(p);for(let i=0;i<count;i++){const t=delay+i*dt;series.push({x:t*1000,y1:rc.V*(1-Math.exp(-t/rc.tau)),y2:rc.V});}
   meta={title:'Transient – RC example (independent)',xTitle:'Time (ms)',yTitle:'Voltage (V)',labels:['V(C)','Vin'],kind:'transient',notes:'مثال آموزشی RC مستقل از شماتیک ۲۰۰ ولتی است: پاسخ به پله DC با شرط اولیه V(C)=0.'};
  }
 }else if(p.type==='ac'){
  if(p.circuit!=='rc')throw Error('AC Sweep نیاز به مثال تکمیلی RC دارد. مدار مقاومتی اصلی منبع AC ندارد.');
  const r=rcParams(p),f1=positive(p.fStart,'Start Frequency'),f2=positive(p.fEnd,'End Frequency'),points=Number(p.points);
  if(f2<=f1)throw Error('End Frequency باید از Start Frequency بزرگ‌تر باشد.');
  if(!Number.isInteger(points)||points<2||points>500)throw Error('Points باید عدد صحیح بین ۲ و ۵۰۰ باشد.');
  const decades=Math.log10(f2/f1),count=p.sweepMode==='log'?Math.ceil(decades*points)+1:points;
  if(count>2001)throw Error('تعداد نمونه‌های فرکانسی نباید بیش از ۲۰۰۱ باشد.');
  for(let i=0;i<count;i++){const f=p.sweepMode==='log'?f1*Math.pow(f2/f1,i/(count-1)):f1+(f2-f1)*i/(count-1),w=2*Math.PI*f*r.tau,mag=1/Math.sqrt(1+w*w);series.push({x:f,y1:20*Math.log10(mag),y2:-Math.atan(w)*180/Math.PI});}
  meta={title:'AC Sweep – RC example (independent)',xTitle:'Frequency (Hz)',yTitle:'Magnitude (dB)',labels:['Gain (dB)','Phase (degrees)'],kind:'ac',logX:p.sweepMode==='log',notes:'این پاسخ فرکانسی تحلیلی یک فیلتر RC مستقل است، نه نتیجه مدار ۲۰۰ ولتی.'};
 } else throw Error('نوع تحلیل شناسایی نشد.');
 return {profile:{...p},meta,bias,series};
}
function rootMarkup(){root.innerHTML=`<div id="p6-probe" class="p6-window hidden" dir="ltr" role="dialog" aria-label="PSpice Probe"><div class="p6-win-title"><b>▣ PSpice A/D Lite — Probe</b><div><button id="p6-export" title="Download CSV">CSV</button><button id="p6-probe-close" title="Close">×</button></div></div><div class="p6-probe-toolbar"><span id="p6-plot-title">Trace</span><div><label><input type="checkbox" id="p6-trace1" checked><span id="p6-name1"></span></label><label><input type="checkbox" id="p6-trace2" checked><span id="p6-name2"></span></label></div></div><div class="p6-plot-wrap" id="p6-plot-wrap"><svg id="p6-chart" viewBox="0 0 960 510" preserveAspectRatio="none" role="img" aria-label="Simulated waveform"></svg></div><div class="p6-legend" dir="rtl"><span id="p6-cursor-values">برای خواندن مقدار یک نقطه، روی نمودار کلیک کن.</span><span id="p6-plot-note"></span></div><div class="p6-footer">Educational limited solver · not native PSpice · Source: pspice.docx pp. 16–23</div></div>`;
 $('#p6-probe-close').onclick=()=>$('#p6-probe').classList.add('hidden');$('#p6-export').onclick=downloadCSV;
 $('#p6-trace1').onchange=e=>{visibleSeries[0]=e.target.checked;renderPlot()};$('#p6-trace2').onchange=e=>{visibleSeries[1]=e.target.checked;renderPlot()};$('#p6-chart').addEventListener('click',e=>{if(!last)return;const rect=e.currentTarget.getBoundingClientRect();const n=last.series.length;const rel=(e.clientX-rect.left)/rect.width;cursorIndex=Math.max(0,Math.min(n-1,Math.round(((rel*960)-73)/(960-73-29)*(n-1))));renderPlot()});
}
function profileName(){return profile?.name||'Run1';}
function validateSettings(p){
 if(p.type==='transient'){
  const T=positive(p.runTo,'Run to time'),dt=positive(p.maxStep,'Maximum step size'),d=engineering(p.delay||'0');
  if(!Number.isFinite(d)||d<0||d>=T)throw Error('Start saving data after باید بین صفر و زمان پایان باشد.');
  if(p.circuit==='rc')rcParams(p);
 }else if(p.type==='dc'){
  if(p.circuit!=='reference'||p.source!=='V1')throw Error('DC Sweep فقط منبع V1 مدار مرجع را پشتیبانی می‌کند.');
  const a=engineering(p.start),b=engineering(p.end),st=positive(p.increment,'Increment');
  if(!Number.isFinite(a)||!Number.isFinite(b)||b<a)throw Error('محدوده DC Sweep معتبر نیست.');
  if((b-a)/st>2000)throw Error('حداکثر ۲۰۰۱ نقطه مجاز است.');
 }else if(p.type==='ac'){
  if(p.circuit!=='rc')throw Error('AC Sweep به مثال مستقل RC نیاز دارد.');rcParams(p);
  const a=positive(p.fStart,'Start Frequency'),b=positive(p.fEnd,'End Frequency'),n=Number(p.points);
  if(b<=a||!Number.isInteger(n)||n<2||n>500)throw Error('تنظیمات فرکانس یا تعداد نقاط معتبر نیست.');
  if((p.sweepMode==='log'?Math.ceil(Math.log10(b/a)*n)+1:n)>2001)throw Error('تعداد نقاط تحلیل بیش از حد مجاز است.');
 }else if(p.type==='bias'&&p.circuit!=='reference')throw Error('Bias Point فقط برای مدار مرجع در دسترس است.');
}

const profileMarkup=p=>`<div class="p6-settings" dir="ltr"><div class="p6-tabs"><b>General</b><b class="selected">Analysis</b><b>Include Files</b><b>Libraries</b><b>Options</b><b>Probe Window</b></div><div class="p6-analysis-grid"><div><label>Analysis type<select id="p6-kind">${Object.entries(K).map(([id,name])=>`<option value="${id}" ${p.type===id?'selected':''}>${name}</option>`).join('')}</select></label><div class="p6-option-list"><div class="highlight">☑ General Settings</div><div>□ Monte Carlo/Worst Case</div><div>□ Parametric Sweep</div><div>□ Temperature (Sweep)</div><div>□ Save Bias Point</div></div></div><div class="p6-setting-main"><div class="p6-scenario"><strong>Analysis sample</strong><label><input type="radio" name="p6-circuit" value="reference" ${p.circuit==='reference'?'checked':''}> 200V resistors (schematic)</label><label><input type="radio" name="p6-circuit" value="rc" ${p.circuit==='rc'?'checked':''}> RC teaching example (separate)</label><small dir="rtl" id="p6-circuit-note">توضیح مدار انتخابی</small></div><div id="p6-fields"></div></div></div><div id="p6-setting-error" class="p6-validation hidden" dir="rtl"></div><div class="p6-settings-notice" dir="rtl">این پنجره بازسازی آموزشی تنظیمات PSpice 17.2 است. مدل تحلیل فقط مدار مقاومتی مرجع و مثال مستقل RC را پشتیبانی می‌کند.</div></div>`;
function settings(){if(!C.getCircuitData().project){error('ابتدا مدار نمونه یا یک پروژه Capture ایجاد کن.');return;}const p=profile?{...profile}:DEFAULT();let d=makeDialog('Simulation Settings - '+profileName(),profileMarkup(p),`<button id="p6-settings-save" class="p6-btn-primary">OK</button><button id="p6-settings-cancel">Cancel</button><button id="p6-settings-apply">Apply</button>`);const kind=d.querySelector('#p6-kind'),fields=d.querySelector('#p6-fields');
 function getCircuit(){return d.querySelector('[name="p6-circuit"]:checked').value}
 function choice(type){const n=d.querySelector('#p6-circuit-note');n.textContent=type==='rc'?'مثال RC صرفاً یک مدل تحلیلی مستقل است و به مدار طراحی‌شده متصل نیست.':'مدار مقاومتیِ صفحه شماتیک به‌صورت واقعی تحلیل می‌شود.';}
 function render(){let k=kind.value,c=getCircuit();if(k==='ac'){d.querySelector('[name="p6-circuit"][value="rc"]').checked=true;c='rc'}if(k==='dc'||k==='bias'){d.querySelector('[name="p6-circuit"][value="reference"]').checked=true;c='reference'}d.querySelectorAll('[name="p6-circuit"]').forEach(r=>r.disabled=k==='ac'?r.value!=='rc':(['dc','bias'].includes(k)&&r.value!=='reference'));
  choice(c);
  fields.innerHTML=k==='transient'?`<div class="p6-form-rows"><label>Run to time <input data-p6="runTo" value="${escape(p.runTo)}"></label><label>Start saving data after <input data-p6="delay" value="${escape(p.delay)}"></label><fieldset><legend>Transient options</legend><label>Maximum step size <input data-p6="maxStep" value="${escape(p.maxStep)}"></label></fieldset></div>`:
  k==='dc'?`<fieldset><legend>Sweep variable</legend><label>◉ Voltage source　Name: <input data-p6="source" value="${escape(p.source)}"></label></fieldset><fieldset><legend>Sweep type</legend><label>◉ Linear</label><div class="p6-form-rows"><label>Start value <input data-p6="start" value="${escape(p.start)}"></label><label>End value <input data-p6="end" value="${escape(p.end)}"></label><label>Increment <input data-p6="increment" value="${escape(p.increment)}"></label></div></fieldset>`:
  k==='ac'?`<fieldset><legend>AC Sweep Type</legend><label><input type="radio" name="p6-sweepMode" value="log" ${p.sweepMode==='log'?'checked':''}> Logarithmic</label><label><input type="radio" name="p6-sweepMode" value="linear" ${p.sweepMode==='linear'?'checked':''}> Linear</label><div class="p6-form-rows"><label>Start Frequency <input data-p6="fStart" value="${escape(p.fStart)}"></label><label>End Frequency <input data-p6="fEnd" value="${escape(p.fEnd)}"></label><label>Points/Decade or Total Points <input type="number" min="2" max="500" data-p6="points" value="${escape(p.points)}"></label></div></fieldset>`:
  `<div class="p6-bias-note">Bias Point computes DC node voltages and branch currents at the operating point. No time/frequency axis is required.</div>`;
  const supplements=d.querySelector('.p6-setting-main');supplements.querySelector('#p6-rc')?.remove();if(['transient','ac'].includes(k)){const el=document.createElement('fieldset');el.id='p6-rc';el.innerHTML=`<legend>Independent RC example (only if selected)</legend><div class="p6-rc-row"><label>R <input data-p6="rcR" value="${escape(p.rcR)}"></label><label>C <input data-p6="rcC" value="${escape(p.rcC)}"></label><label>Input amplitude <input data-p6="rcV" value="${escape(p.rcV)}"></label></div>`;supplements.append(el)}
 }
 kind.onchange=()=>{p.type=kind.value;render()};d.querySelectorAll('[name="p6-circuit"]').forEach(e=>e.onchange=()=>choice(getCircuit()));render();
 function collect(){let result={...p,type:kind.value,circuit:getCircuit()};d.querySelectorAll('[data-p6]').forEach(el=>result[el.dataset.p6]=el.value);const sw=d.querySelector('[name="p6-sweepMode"]:checked');if(sw)result.sweepMode=sw.value;return result;}
 function apply(close){const next=collect();try{validateSettings(next);profile=next;C.writeLog(`Simulation profile saved: ${profile.name} [${K[profile.type]}]`);C.writeStatus('Active Profile: '+profile.name+' · '+K[profile.type]);if(close)closeDialog();else{const err=d.querySelector('#p6-setting-error');err.classList.add('hidden');}return true;}catch(ex){const err=d.querySelector('#p6-setting-error');err.textContent=ex.message;err.classList.remove('hidden');return false;}}
 d.querySelector('#p6-settings-save').onclick=()=>apply(true);d.querySelector('#p6-settings-apply').onclick=()=>apply(false);d.querySelector('#p6-settings-cancel').onclick=closeDialog;
}
function makeDialog(title,body,buttons){closeDialog();let layer=document.createElement('div');layer.id='p6-modal';layer.className='p6-backdrop';layer.innerHTML=`<section class="p6-dialog" role="dialog" aria-modal="true" aria-label="${escape(title)}"><div class="p6-dialog-title">${escape(title)}<button id="p6-dialog-x" aria-label="Close">×</button></div><div class="p6-dialog-body">${body}</div><footer class="p6-dialog-footer">${buttons}</footer></section>`;root.appendChild(layer);layer.querySelector('#p6-dialog-x').onclick=closeDialog;layer.addEventListener('click',e=>{if(e.target===layer)closeDialog()});return layer}
function closeDialog(){root.querySelector('#p6-modal')?.remove()}
function newProfile(){if(!getRaw().project){error('ابتدا با File > New > Project پروژه بساز یا مدار نمونه را بارگذاری کن.');return;}const d=makeDialog('New Simulation',`<div class="p6-new-profile"><label>Name <input id="p6-new-name" maxlength="45" value="${escape(profile?.name||'Run1')}"></label><label>Inherit From <select><option>none</option></select></label><div>Root Schematic: SCHEMATIC1</div></div>`,`<button class="p6-btn-primary" id="p6-create">Create</button><button id="p6-cancel-new">Cancel</button>`);d.querySelector('#p6-create').onclick=()=>{const name=d.querySelector('#p6-new-name').value.trim();if(!/^[\w -]{1,45}$/.test(name)){error('نام پروفایل فقط باید شامل حروف انگلیسی، اعداد، فاصله، زیرخط یا خط تیره باشد.');return;}profile={...DEFAULT(),name};settings()};d.querySelector('#p6-cancel-new').onclick=closeDialog;}
function run(){if(!getRaw().project){error('ابتدا پروژه و مدار مرجع را بارگذاری کن.');return;}if(!profile){newProfile();C.showTip('یک Simulation Profile بساز و سپس Run را انتخاب کن.');return;}try{last=calculate(profile);cursorIndex=0;visibleSeries=[true,!['dc','ac'].includes(profile.type)];visibility={volt:false,current:false,powerw:false};annotationBias=null;renderAnnotations();showProbe();C.writeLog(`Simulation PASS: ${profile.name} / ${K[profile.type]} / ${last.series.length} samples`);C.writeStatus('Simulation successful: '+K[profile.type]);}catch(e){last=null;renderAnnotations();error(e.message);showError(e.message);}}
function showError(text){const d=makeDialog('PSpice Simulation Error',`<div class="p6-error" dir="rtl">⚠ ${escape(text)}<p>نقاط اتصال، زمین 0، مقدار مقاومت‌ها و پارامترهای Simulation Settings را بررسی کن.</p></div>`,`<button id="p6-error-ok">Close</button>`);d.querySelector('#p6-error-ok').onclick=closeDialog;}
function showProbe(){if(!last)return;$('#p6-probe').classList.remove('hidden');$('#p6-plot-title').textContent=last.meta.title;$('#p6-name1').textContent=last.meta.labels[0];$('#p6-name2').textContent=last.meta.labels[1];$('#p6-trace1').checked=visibleSeries[0];$('#p6-trace2').checked=visibleSeries[1];$('#p6-plot-note').textContent=last.meta.notes;renderPlot()}
const point=(x,y)=>`${x.toFixed(2)},${y.toFixed(2)}`;
function renderPlot(){if(!last)return;const S=last.series,chart=$('#p6-chart'),m=last.meta;
 const wrap=$('#p6-plot-wrap');wrap.querySelector('.p6-bias-table')?.remove();
 if(m.kind==='bias'&&last.bias){const b=last.bias;chart.style.display='none';const d=document.createElement('div');d.className='p6-bias-table';d.innerHTML=`<h2>DC Bias Point — ${escape(profileName())}</h2><p dir="rtl">مقادیر نقطه کار DC مدار مقاومتی مرجع بر اساس قوانین اهم و کیرشهف محاسبه شدند.</p><table><thead><tr><th>Quantity</th><th>Calculated value</th></tr></thead><tbody>${[['V(A)',fm(b.input,' V',3)],['V(R2 top)',fm(b.out,' V',3)],['V(GND)','0 V'],['I(R1)',fm(b.i1*1000,' mA',3)],['I(R2)=I(R3)',fm(b.i23*1000,' mA',3)],['P(R1)',fm(b.p1,' W',3)],['P(R2)',fm(b.p2,' W',3)],['P(R3)',fm(b.p3,' W',3)],['P(source)',fm(b.pSource,' W',3)]].map(q=>`<tr><td>${escape(q[0])}</td><td>${escape(q[1])}</td></tr>`).join('')}</tbody></table>`;wrap.append(d);$('#p6-cursor-values').textContent='DC solution; no time axis or sweep.';return;}
 chart.style.display='block';const W=960,H=510,left=73,top=36,right=29,bottom=64,pw=W-left-right,ph=H-top-bottom;
 let xmin=S[0].x,xmax=S.at(-1).x;if(xmax<=xmin)xmax=xmin+1;
 const xmap=x=>left+((m.logX?Math.log10(x/xmin)/Math.log10(xmax/xmin):(x-xmin)/(xmax-xmin))*pw);
 const keys=visibleSeries.flatMap((yes,i)=>yes?[i?'y2':'y1']:[]);const values=S.flatMap(row=>keys.map(k=>row[k]));let ymin=values.length?Math.min(...values):0,ymax=values.length?Math.max(...values):1;
 if(!Number.isFinite(ymin)||!Number.isFinite(ymax)){ymin=0;ymax=1}if(ymin===ymax){const pad=Math.max(1,Math.abs(ymin)*.12);ymin-=pad;ymax+=pad}else{const pad=(ymax-ymin)*.09;ymin-=pad;ymax+=pad}
 const dual=(m.kind==='ac'||m.kind==='dc')&&visibleSeries[1];const v2=S.map(r=>r.y2);let y2min=dual?Math.min(...v2):ymin,y2max=dual?Math.max(...v2):ymax;
 if(y2min===y2max){y2min-=1;y2max+=1}else{const pad=(y2max-y2min)*.09;y2min-=pad;y2max+=pad}
 if(dual){const vals1=visibleSeries[0]?S.map(r=>r.y1):[0,1];ymin=Math.min(...vals1);ymax=Math.max(...vals1);if(ymin===ymax){ymin-=1;ymax+=1}else{let pad=(ymax-ymin)*.09;ymin-=pad;ymax+=pad}}
 const ymap=y=>top+(ymax-y)/(ymax-ymin)*ph, ymap2=y=>top+(y2max-y)/(y2max-y2min)*ph;let content=`<rect width="960" height="510" fill="#07090b"/>`;
 for(let i=0;i<=10;i++){const x=left+pw*i/10,yy=top+ph*i/10;content+=`<path d="M${x} ${top}V${top+ph} M${left} ${yy}H${left+pw}" stroke="#26302d" stroke-width="1"/>`;}
 for(let i=0;i<=5;i++){let x=left+pw*i/5,xx=m.logX?xmin*Math.pow(xmax/xmin,i/5):xmin+(xmax-xmin)*i/5, y=top+ph*i/5,vy=ymax+(ymin-ymax)*i/5;content+=`<text x="${x}" y="${H-34}" text-anchor="middle" font-size="13" fill="#9caeaa">${escape(fm(xx,'',2))}</text><text x="${left-10}" y="${y+5}" text-anchor="end" font-size="13" fill="#9caeaa">${escape(fm(vy,'',2))}</text>`;if(dual)content+=`<text x="${left+pw+6}" y="${y+5}" text-anchor="start" font-size="11" fill="#ffd45f">${escape(fm(y2max+(y2min-y2max)*i/5,'',1))}</text>`;}
 content+=`<path d="M${left} ${top}V${top+ph}H${left+pw}" stroke="#7d8b82" fill="none"/><text x="${left+pw/2}" y="${H-7}" fill="#acbbb6" text-anchor="middle" font-size="15">${escape(m.xTitle)}</text><text x="19" y="${top+ph/2}" fill="#acbbb6" text-anchor="middle" font-size="14" transform="rotate(-90 19 ${top+ph/2})">${escape(m.yTitle)}</text>${dual?`<text x="${W-6}" y="${top+ph/2}" fill="#ffd45f" text-anchor="middle" font-size="11" transform="rotate(90 ${W-6} ${top+ph/2})">${escape(m.kind==='ac'?'Phase (degrees)':'Current (mA)')}</text>`:''}`;
 const colors=['#51e489','#ffd45f'];for(let si=0;si<2;si++){if(!visibleSeries[si])continue;let d='';for(let i=0;i<S.length;i++){const row=S[i],y=si&&dual?ymap2(row.y2):ymap(row[si?'y2':'y1']),x=xmap(row.x);d+=(i?'L':'M')+point(x,y)}content+=`<path d="${d}" fill="none" stroke="${colors[si]}" stroke-width="2.4" vector-effect="non-scaling-stroke"/>`;}
 const row=S[Math.min(S.length-1,cursorIndex)],cx=xmap(row.x);content+=`<path d="M${cx} ${top}V${top+ph}" stroke="#f8f9fc" stroke-width="1.4" stroke-dasharray="5 4"/>`;for(let si=0;si<2;si++)if(visibleSeries[si])content+=`<circle cx="${cx}" cy="${si&&dual?ymap2(row.y2):ymap(row[si?'y2':'y1'])}" r="4.5" fill="${colors[si]}" stroke="#fff" stroke-width="1"/>`;
 chart.innerHTML=content;$('#p6-cursor-values').textContent=`${m.xTitle}: ${fm(row.x,'',3)}  ·  ${m.labels[0]}: ${fm(row.y1,'',3)}  ·  ${m.labels[1]}: ${fm(row.y2,'',3)}`;
}
function downloadCSV(){if(!last)return;const rows=[['x',...last.meta.labels].join(','),...last.series.map(r=>[r.x,r.y1,r.y2].join(','))].join('\r\n');const blob=new Blob([rows],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=(profile?.name||'Run1')+'_'+last.meta.kind+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function marker(){if(!getRaw().project){error('ابتدا مدار نمونه را بارگذاری کن.');return}C.setMarkerMode();C.showTip('روی یک گره مدار، مثلاً بالای R2، کلیک کن.');}
function placeMarker(p){const id=p.x>650?'output':'input';markers=[id];if(last)showProbe();else C.showTip('پراب قرار گرفت؛ پس از اجرای Run نمودار نمایش داده می‌شود.');renderAnnotations();C.writeLog('Voltage marker placed at '+id);}
function annotate(kind){if(!getRaw().project){error('ابتدا مدار مرجع را بارگذاری کن.');return;}if(!last?.bias){try{annotationBias=dcSolve(numeric().V1);}catch(e){error(e.message);return}}
 visibility[kind]=!visibility[kind];renderAnnotations();C.writeStatus('Bias ' + (kind==='volt'?'Voltage':kind==='current'?'Current':'Power') + (visibility[kind]?' ON':' OFF'));
}
function renderAnnotations(){const el=$('#capture-analysis-labels');if(!el)return;el.innerHTML='';const d=getRaw(),rs=Object.fromEntries(d.parts.map(p=>[p.id,p]));if(!rs.R1||!rs.R2||!rs.R3||!rs.V1)return;const b=last?.bias||annotationBias;
 const labels=[];
 if(b&&visibility.volt){labels.push({x:rs.R1.x-120,y:105,t:'V(A) '+fm(b.input,'V',2),c:'#a32063'},{x:rs.R2.x-135,y:rs.R2.y-120,t:'V(B) '+fm(b.out,'V',2),c:'#a32063'},{x:rs.R1.x-130,y:545,t:'0 V',c:'#a32063'});}
 if(b&&visibility.current){for(const [id,current] of [['R1',b.i1],['R2',b.i23],['R3',b.i23],['V1',b.itotal]]){const p=rs[id];labels.push({x:p.x+(id==='R3'?0:-100),y:p.y+(id==='R3'?60:95),t:fm(current*1000,'mA',2),c:'#bb1221'});}}
 if(b&&visibility.powerw){for(const [id,power] of [['R1',b.p1],['R2',b.p2],['R3',b.p3],['V1',b.pSource]]){const p=rs[id];labels.push({x:p.x+(id==='R3'?0:74),y:p.y+(id==='R3'?-40:18),t:fm(power,'W',3),c:'#264c9a'});}}
 if(markers.length){const p=markers[0]==='output'?rs.R2:rs.R1;labels.push({x:p.x-35,y:p.y-185,t:'▼ V(marker)',c:'#19844b'})}
 el.innerHTML=labels.map(l=>{let w=Math.min(185,Math.max(48,l.t.length*8.1+12)),x=Math.max(55,Math.min(1170-w,l.x)),y=Math.max(45,Math.min(725,l.y));return `<g transform="translate(${x},${y})"><rect x="0" y="-18" width="${w}" height="24" fill="${l.c}" rx="1"/><text x="6" y="-1" fill="#fff" font-size="15" font-family="Arial" font-weight="bold">${escape(l.t)}</text></g>`}).join('');
}
function invalidate(){last=null;annotationBias=null;markers=[];visibility={volt:false,current:false,powerw:false};const probe=$('#p6-probe');if(probe)probe.classList.add('hidden');const labels=$('#capture-analysis-labels');if(labels)labels.innerHTML='';}
function reset(){invalidate();profile=null;}
function action(name){if(name==='profile')return newProfile();if(name==='edit')return profile?settings():newProfile();if(name==='play')return run();if(name==='stop'){C.showTip('این موتور محاسبات را بلافاصله انجام می‌دهد؛ عملیات طولانی برای توقف وجود ندارد.');return}if(name==='volt'||name==='current'||name==='powerw')return annotate(name);if(name==='probe')return marker();if(name==='wave'||name==='cursor'){if(!last){error('ابتدا Run را اجرا کن.');return;}return showProbe();}}
function setProfile(p){profile=null;if(p&&typeof p==='object'&&['bias','dc','transient','ac'].includes(p.type)&&typeof p.name==='string'){profile={...DEFAULT(),...p};}}
rootMarkup();
window.PSpicePhase6=Object.freeze({action,getProfile:()=>profile?{...profile}:null,setProfile,invalidate,reset,placeMarker,getResult:()=>last?JSON.parse(JSON.stringify(last)):null,solveReference:(v)=>dcSolve(v),calculate,parseEngineering:engineering});
})();
