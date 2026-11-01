/* OrCAD Capture / PSpice A/D 17.2 educational shell, offline; phase 2. */
(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const icon=n=>`<svg viewBox="0 0 20 20" aria-hidden="true"><use href="#ic-${n}"></use></svg>`;
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={workspace:'pspice',project:null,menu:null,parts:[],wires:[],mode:'select',placing:null,wireFrom:null,zoom:1,activeTab:'start',lastInfo:null,logs:[],selected:null,selectedWire:null,drag:null,libraries:['ANALOG','SOURCE','CAPSYM'],validation:null};
const descriptions={
'new-project':['New Project','ایجاد یک پروژه جدید در Capture و انتخاب نوع Analog or Mixed A/D.'],
'open-project':['Open Project','بارگذاری فایل پروژه نمایشی این کلون از رایانه. فرمت بومی DSN در این نسخه پشتیبانی نمی‌شود.'],
'new':['New','ایجاد سند یا پروژه جدید.'],
'open':['Open','باز کردن پروژه یا فایل.'],
'save':['Save','ذخیره فایل پروژه آزمایشی با فرمت JSON.'],
'print':['Print','چاپ صفحه با فرمان مرورگر.'],
'undo':['Undo','بازگشت آخرین تغییر؛ در این مرحله صرفاً معرفی شده است.'],
'redo':['Redo','انجام دوباره تغییر؛ در این مرحله صرفاً معرفی شده است.'],
'cut':['Cut','برش قطعه یا داده انتخاب‌شده؛ در مراحل بعد پیاده‌سازی می‌شود.'],
'copy':['Copy','کپی انتخاب؛ در مراحل بعد پیاده‌سازی می‌شود.'],
'paste':['Paste','چسباندن؛ در مراحل بعد پیاده‌سازی می‌شود.'],
'zin':['Zoom In','بزرگ‌نمایی شماتیک.'],
'zout':['Zoom Out','کوچک‌نمایی شماتیک.'],
'fit':['Zoom All','قرار دادن کل صفحه شماتیک در محدوده نمایش.'],
'area':['Zoom Area','بزرگ‌نمایی ناحیه انتخابی؛ فعلاً فقط معرفی شده است.'],
'select':['Select','انتخاب و جابه‌جایی عناصر روی صفحه.'],
'part':['Place Part','باز کردن پنجره Place Part و قرار دادن قطعات روی صفحه.'],
'wire':['Place Wire','اتصال الکتریکی واقعی بین پایه‌های قطعات، با مسیر افقی و عمودی.'],
'ground':['Place Ground','قرار دادن نماد گره زمین 0.'],
'bus':['Bus','ایجاد گذرگاه چندسیگنالی؛ آموزش عملکرد در فازهای بعد.'],
'junction':['Junction','نقطه اتصال گره‌ها؛ آموزش عملکرد در فازهای بعد.'],
'power':['Power','افزودن نماد تغذیه؛ در بخش آموزش ابزارها تکمیل می‌شود.'],
'rotate':['Rotate','چرخش عنصر انتخاب‌شده ۹۰ درجه.'],
'delete':['Delete','پاک کردن قطعه یا سیم انتخاب‌شده.'],
'profile':['New Simulation Profile','ایجاد پروفایل، انتخاب یکی از چهار نوع تحلیل و تعیین پارامترهای شبیه‌سازی.'],
'play':['Run PSpice','اجرای موتور محدود تحلیل مدار مقاومتی و مثال تکمیلی RC.'],
'edit':['Edit Simulation Profile','ویرایش پروفایل و نوع تحلیل؛ خروجی پس از Run به‌روز می‌شود.'],
'probe':['Voltage Marker','انتخاب نقطه ولتاژ روی شماتیک و بررسی آن در Probe.'],
'volt':['Bias Voltage','نمایش یا پنهان کردن ولتاژ گره‌های مدار مرجع.'],
'current':['Bias Current','نمایش یا پنهان کردن جریان شاخه‌ها بر حسب میلی‌آمپر.'],
'powerw':['Bias Power','نمایش یا پنهان کردن توان مقاومت‌ها و منبع.'],
'grid':['Grid','نمایش شبکه نقطه‌چین صفحه شماتیک.'],
'panel':['Project Manager','نمایش درخت پروژه و صفحات شماتیک.'],
'help':['Help','معرفی کنترل‌ها و ابزارهای این نسخه آموزشی.'],
'info':['Info','مشاهده پیام‌ها و وضعیت برنامه.'],
'wave':['Waveforms','مشاهده نمودار نتایج PSpice.'],
'stop':['Stop Simulation','توقف شبیه‌سازی در نسخه اصلی.'],
'cursor':['Cursor','نمایش مکان‌نمای اندازه‌گیری در نمودار.'],
'folder':['Design','باز کردن یک طراحی شماتیک.'],
'sheet':['Schematic Page','صفحه طراحی مدار.'],
'lock':['Lock','قفل تنظیمات؛ در فاز بعد صرفاً معرفی خواهد شد.']
};
const toolDefs={
pspice:[
 [['new','new'],['open','open'],['save','save'],['print','print'],'|',['cut','cut'],['copy','copy'],['paste','paste'],['undo','undo'],['redo','redo'],'|',['wave','wave'],['cursor','cursor'],['play','play'],['stop','stop']],
 [['zin','zin'],['zout','zout'],['fit','fit'],['area','area'],'|',['volt','volt'],['current','current'],['powerw','powerw'],'|',['probe','probe'],['grid','grid'],['help','help']],
 []],
capture:[
 [['new','new-project'],['open','open-project'],['save','save'],['print','print'],'|',['cut','cut'],['copy','copy'],['paste','paste'],['undo','undo'],['redo','redo'],'|',['zin','zin'],['zout','zout'],['fit','fit'],['area','area'],'|',['panel','panel'],['help','help']],
 [['part','part'],['wire','wire'],['ground','ground'],['bus','bus'],['junction','junction'],'|',['profile','profile'],['edit','edit'],['play','play'],['stop','stop'],'|',['probe','probe'],['volt','volt'],['current','current'],['powerw','powerw']],
 [['select','select'],['rotate','rotate'],['grid','grid'],'|',['res','part-r'],['cap','part-c'],['vdc','part-vdc'],'|',['info','show-guide']]
]};
const paletteDefs=[['select','select'],['part','part'],['wire','wire'],['bus','bus'],['junction','junction'],['ground','ground'],['power','power'],['rotate','rotate'],'|',['res','part-r'],['cap','part-c'],['vdc','part-vdc'],['delete','delete']];
const menuDefs={
pspice:{File:[['New Simulation','info-only'],['Open','open'],['Save','save'],'|',['Print','print'],['Exit','exit']],View:[['Zoom In','zin'],['Zoom Out','zout'],['Fit','fit']],Simulation:[['Run','play'],['Stop','stop'],['Simulation Settings','profile']],Tools:[['Options…','info-only']],Window:[['Capture CIS Lite','switch-capture']],Help:[['About PSpice A/D','show-guide'],['Toolbar Guide','show-guide']]},
capture:{File:[['New ▶','new-project','File > New > Project…'],['Open ▶','open-project'],['Close','close-project'],'|',['Save','save'],['Save As…','save'],'|',['Print…','print']],Design:[['New Design','new-project'],['Design Properties…','info-only']],Edit:[['Undo','undo'],['Redo','redo'],['Cut','cut'],['Copy','copy'],['Paste','paste'],['Delete','delete'],['Properties…','info-only']],View:[['Zoom In','zin'],['Zoom Out','zout'],['Zoom All','fit'],['Grid','grid'],['Project Manager','panel'],['Session Log','toggle-log']],Tools:[['Customize…','show-guide'],['Options…','info-only']],Place:[['Part…','part','P'],['Wire','wire','W'],['Bus','bus','B'],['Junction','junction','J'],['Ground…','ground','G'],['Power…','power','F'],['No Connect','info-only','X']], 'SI Analysis':[['Enable SI Analysis','info-only']],PSpice:[['New Simulation Profile…','profile'],['Edit Simulation Profile…','edit'],['Run','play'],['Markers ▶','probe'],['Bias Voltage','volt'],['Bias Current','current'],['Bias Power','powerw']],Accessories:[['PSpice Models','info-only']],Options:[['Preferences','info-only'],['Design Template','info-only']],Window:[['PSpice A/D','switch-pspice'],['Cascade','info-only']],Help:[['Help','show-guide'],['About OrCAD Capture','show-guide']]}};
function setStatus(msg){$('#status-detail').textContent=msg;}
function log(text){const now='['+new Date().toLocaleTimeString('en-GB')+'] ';state.logs.push(now+text);if(state.logs.length>60)state.logs.shift();$('#log-lines').textContent=state.logs.join('\n');$('#log-lines').scrollTop=$('#log-lines').scrollHeight}
function tip(text){const n=$('#help-tooltip');n.textContent=text;n.classList.remove('hidden');clearTimeout(tip._id);tip._id=setTimeout(()=>n.classList.add('hidden'),3700)}
function updateChrome(){let w=state.workspace;$('#pspice-area').classList.toggle('hidden',w!=='pspice');$('#capture-area').classList.toggle('hidden',w!=='capture');$('#app-caption').textContent=w==='pspice'?'PSpice A/D Lite':`OrCAD Capture - Lite - [${state.project?state.project.name+' : '+(state.activeTab==='schematic'?'SCHEMATIC1 : PAGE1':'Project Manager'):'Start Page'}]`;
 const menus=$('#menus');menus.innerHTML=Object.keys(menuDefs[w]).map(name=>`<span class="menu-item" data-menu="${escapeHTML(name)}" tabindex="0">${escapeHTML(name)}</span>`).join('');
 ['main','secondary','third'].forEach((name,i)=>{$('#tools-'+name).innerHTML=toolDefs[w][i].map(t=>{if(t==='|')return'<span class="tooldivider" aria-hidden="true"></span>';let [ic,action]=t,desc=descriptions[action]||descriptions[ic]||[action,''];let future=['cut','copy','paste','undo','redo','area','bus','junction','power','info-only'].includes(action);return `<button class="toolbtn ${future?'future':''} ${state.mode===action?'active':''}" data-act="${action}" title="${escapeHTML(desc[0])} - ${escapeHTML(desc[1])}" aria-label="${escapeHTML(desc[0])}">${icon(ic)}</button>`}).join('')});
 $('#tools-third').classList.toggle('hidden',w!=='capture');
 $('#pspice-left').innerHTML=['info','wave','cursor','zin','fit','panel'].map(ic=>`<button data-act="${ic==='panel'?'switch-capture':ic}" title="${escapeHTML(descriptions[ic]?.[1]||'Open Capture')}">${icon(ic)}</button>`).join('');
 $('#capture-palette').innerHTML=paletteDefs.map(t=>t==='|'?'<div class="tooldivider"></div>':`<button data-act="${t[1]}" class="${state.mode===t[1]?'selected':''}" title="${escapeHTML(descriptions[t[1]]?.[1]||descriptions[t[0]]?.[1]||t[1])}">${icon(t[0])}</button>`).join('');
 $('#app-caption').title='نمونه آموزشی غیررسمی؛ وابسته به Cadence نیست';
}
function switchWorkspace(w){state.workspace=w;closeMenu();updateChrome();setStatus(w==='capture'?'Capture workspace ready':'PSpice simulation workspace ready');}
function closeMenu(){state.menu=null;$('#popup-root').innerHTML='';$$('.menu-item').forEach(m=>m.classList.remove('open'))}
function showMenu(name,anchor){if(state.menu===name){closeMenu();return}closeMenu();state.menu=name;anchor.classList.add('open');const rect=anchor.getBoundingClientRect();let entries=menuDefs[state.workspace][name];let html=entries.map(x=>x==='|'?'<div class="menu-separator"></div>':`<div class="item ${x[1]==='info-only'?'muted':''}" data-act="${x[1]}" data-label="${escapeHTML(x[0])}"><span>${escapeHTML(x[0])}</span><em>${escapeHTML(x[2]||'')}</em></div>`).join('');const el=document.createElement('div');el.className='menu-popup';el.style.left=rect.left+'px';el.style.top=(rect.bottom+1)+'px';el.innerHTML=html;$('#popup-root').append(el);}
function dialog(title,body,buttons=''){closeDialog();$('#dialog-backdrop').classList.remove('hidden');const d=document.createElement('section');d.className='win-dialog';d.role='dialog';d.setAttribute('aria-modal','true');d.innerHTML=`<div class="dialog-title"><span>${escapeHTML(title)}</span><button data-dialog-close aria-label="Close">×</button></div><div class="dialog-content">${body}${buttons?`<div class="dialog-footer">${buttons}</div>`:''}</div>`;$('#dialog-root').append(d);d.querySelectorAll('[data-dialog-close]').forEach(b=>b.onclick=closeDialog);return d;}
function closeDialog(){$('#dialog-root').innerHTML='';$('#dialog-backdrop').classList.add('hidden');}
function actionButton(text,a){return `<button class="dialog-btn" data-dialog-act="${a}">${escapeHTML(text)}</button>`}
function newProject(){switchWorkspace('capture');const d=dialog('New Project',`<div class="newproject-form"><div class="full"><label for="project-name">Name</label><input id="project-name" type="text" value="PSpice_Demo" maxlength="50" style="width:100%"></div><fieldset class="project-types"><legend>Create a New Project Using</legend><label><input type="radio" name="project-type" value="Analog or Mixed A/D" checked> Analog or Mixed A/D</label><label><input type="radio" name="project-type" value="PC Board Wizard"> PC Board Wizard</label><label><input type="radio" name="project-type" value="Schematic"> Schematic</label></fieldset><div class="project-types" style="line-height:1.8">Tip for New Users:<br>Choose Analog or Mixed A/D to create a PSpice simulation project.</div><div class="full"><label>Location (educational virtual path)</label><input id="project-location" type="text" value="Documents\\PSpice_Demo" style="width:100%"><small style="color:#777;display:block;margin-top:4px">این آدرس فقط نمایشی است. فایل واقعی در Downloads ذخیره می‌شود.</small></div></div>`,`<button class="dialog-btn" id="create-next">OK</button>${actionButton('Cancel','close')}`);d.querySelector('#create-next').onclick=()=>{const name=d.querySelector('#project-name').value.trim();if(!name){tip('نام پروژه را وارد کن.');return}state._pending={name,kind:d.querySelector('input[name="project-type"]:checked').value,location:d.querySelector('#project-location').value};showBlankDialog()};}
function showBlankDialog(){const d=dialog('Create PSpice Project',`<div style="width:370px;line-height:2.2"><label><input type="radio" name="project-base" value="existing"> Create based upon an existing project</label><div style="margin:0 0 10px 20px;color:#999">hierarchical.opj</div><label><input type="radio" name="project-base" value="blank" checked> Create a blank project</label></div>`,`<button class="dialog-btn" id="blank-ok">OK</button>${actionButton('Cancel','close')}`);d.querySelector('#blank-ok').onclick=()=>{const p=state._pending;if(d.querySelector('input[name="project-base"]:checked').value==='existing'){tip('قالب آماده در این نسخه پشتیبانی نمی‌شود؛ Create a blank project را انتخاب کن.');return;}if(p.kind!=='Analog or Mixed A/D'){tip('این نسخه فقط پروژه Analog or Mixed A/D را پشتیبانی می‌کند.');return;}state.project={name:p.name,kind:p.kind,location:p.location};state.parts=[];state.wires=[];state.selected=null;state.selectedWire=null;state.zoom=1;state.libraries=['ANALOG','SOURCE','CAPSYM'];state.validation=null;window.PSpicePhase6?.reset?.();state.activeTab='schematic';closeDialog();showTab('schematic');updateChrome();renderTree();drawSchematic();log('New project created: '+p.name+' (SCHEMATIC1/PAGE1)');setStatus('Project created. Place > Part…');tip('پروژه خالی آماده شد. برای افزودن قطعه از Place → Part استفاده کن.')};}
function renderTree(){let t=$('#project-tree');if(!state.project){t.innerHTML='<div class="tree-empty">No active project<br>Use File → New → Project…</div>';return;}t.innerHTML=`<div class="tree-node">${icon('folder')} ${escapeHTML(state.project.name+'.opj')}</div><div class="tree-indent"><div class="tree-node">${icon('folder')} Design Resources</div><div class="tree-indent"><div class="tree-node">${icon('sheet')} ${escapeHTML(state.project.name+'.dsn')}</div><div class="tree-indent"><div class="tree-node">${icon('folder')} SCHEMATIC1</div><div class="tree-indent"><div class="tree-node selected" data-act="show-sheet">${icon('sheet')} PAGE1</div></div></div></div><div class="tree-node">${icon('folder')} PSpice Resources</div></div>`;}
function showTab(tab){state.activeTab=tab;$('#start-view').classList.toggle('hidden',tab!=='start');$('#schematic-view').classList.toggle('hidden',tab!=='schematic');$('#doc-tabs').innerHTML=`<button data-tab="start" class="tab ${tab==='start'?'selected':''}">Start Page</button>`+(state.project?`<button data-tab="schematic" class="tab ${tab==='schematic'?'selected':''}">PAGE1 : ${escapeHTML(state.project.name)}</button>`:'');updateChrome()}
const availableParts=[{name:'R',library:'ANALOG',desc:'Resistor (analog)',icon:'res'}, {name:'C',library:'ANALOG',desc:'Capacitor (analog)',icon:'cap'}, {name:'VDC',library:'SOURCE',desc:'DC Voltage Source',icon:'vdc'}, {name:'0',library:'CAPSYM',desc:'Analog ground node 0',icon:'ground'}];
function partBrowser(){
 if(!state.project){tip('ابتدا با File → New → Project یک پروژه بساز.');return;}
 const d=dialog('Place Part',`<div class="part-dialog-grid p5-part-grid"><div><label for="part-input">Part</label><input id="part-input" type="text" style="width:100%" placeholder="R / C / VDC"><label style="margin-top:12px">Part List</label><div class="parts-list" id="parts-list"></div><label style="margin-top:10px">Libraries</label><div id="libraries-list" class="library-list"></div><label class="p5-lib-picker-label">Available for Add Library</label><select id="library-candidate" aria-label="Available library to add"></select></div><div><label>Graphic</label><div class="part-preview" id="part-preview"></div><div id="part-desc" class="p5-description"></div><div class="p5-library-helper" dir="rtl">قطعه R و C در ANALOG، منبع VDC در SOURCE و زمین 0 در CAPSYM قرار دارند.</div></div><div class="right-buttons"><button class="dialog-btn" id="part-ok">OK</button>${actionButton('Cancel','close')}<button class="dialog-btn" id="lib-add">Add Library…</button><button class="dialog-btn" id="lib-remove">Remove Library</button><button class="dialog-btn" id="part-search">Part Search…</button><button class="dialog-btn" id="part-help">Help</button></div></div>`);
 let current='R',selectedLib='ANALOG';
 function refresh(){const q=d.querySelector('#part-input').value.trim().toUpperCase();const avail=availableParts.filter(p=>state.libraries.includes(p.library)&&(p.name.includes(q)||p.desc.toUpperCase().includes(q)));if(!avail.some(x=>x.name===current))current=avail[0]?.name||'';d.querySelector('#parts-list').innerHTML=avail.map(p=>`<button data-part="${p.name}" class="${p.name===current?'active':''}">${p.name}</button>`).join('')||'<div class="p5-empty">No matching parts</div>';
 d.querySelector('#libraries-list').innerHTML=state.libraries.map(l=>`<button data-library="${l}" class="${selectedLib===l?'active':''}">${l}</button>`).join('')||'<div class="p5-empty">No libraries loaded</div>';d.querySelector('#library-candidate').innerHTML=['ANALOG','SOURCE','CAPSYM'].filter(x=>!state.libraries.includes(x)).map(x=>`<option value="${x}">${x}</option>`).join('')||'<option value="">All loaded</option>'; 
 const p=availableParts.find(p=>p.name===current);d.querySelector('#part-preview').innerHTML=p?`<div class="p5-symbol-preview">${p.type||p.name}<svg viewBox="0 0 100 60" width="160" height="95">${p.name==='R'?'<path d="M7 30H25L31 19 39 41 47 19 55 41 63 19 69 30H93"/>':p.name==='C'?'<path d="M7 30H43M57 30H93M43 10V50M57 10V50"/>':p.name==='VDC'?'<path d="M7 30H25M75 30H93"/><circle cx="50" cy="30" r="25"/><path d="M40 23h10m-5 -5v10M54 38h10"/>':'<path d="M50 4v22M28 26h44M36 35h28M43 43h14"/>'}</svg></div>`:'';d.querySelector('#part-desc').textContent=p?p.desc:'No part selected';}
 refresh();d.querySelector('#part-input').oninput=refresh;
 d.querySelector('#parts-list').onclick=e=>{const b=e.target.closest('[data-part]');if(b){current=b.dataset.part;selectedLib=availableParts.find(p=>p.name===current)?.library||selectedLib;refresh();}};
 d.querySelector('#libraries-list').onclick=e=>{const b=e.target.closest('[data-library]');if(b){selectedLib=b.dataset.library;refresh();}};
 d.querySelector('#part-ok').onclick=()=>{if(!current){tip('ابتدا قطعه‌ای از فهرست انتخاب کن.');return;}closeDialog();beginPlace(current);};
 d.querySelector('#lib-add').onclick=()=>{const choices=['ANALOG','SOURCE','CAPSYM'].filter(x=>!state.libraries.includes(x));if(!choices.length){tip('تمام کتابخانه‌های موردنیاز این پروژه اضافه شده‌اند.');return;}const up=d.querySelector('#library-candidate').value;if(!choices.includes(up)){tip('در این نسخه فقط کتابخانه‌های ANALOG و SOURCE و CAPSYM پشتیبانی می‌شوند.');return;}state.libraries.push(up);selectedLib=up;refresh();log('Added library: '+up)};
 d.querySelector('#lib-remove').onclick=()=>{const idx=state.libraries.indexOf(selectedLib);if(idx<0){tip('یک کتابخانه را انتخاب کن.');return;}state.libraries.splice(idx,1);const removed=selectedLib;selectedLib=state.libraries[0]||'';refresh();log('Removed library from browser: '+removed)};
 d.querySelector('#part-search').onclick=()=>d.querySelector('#part-input').focus();d.querySelector('#part-help').onclick=()=>tip('ابتدا کتابخانه و قطعه را انتخاب کن؛ OK و سپس کلیک روی صفحه. Esc یا راست‌کلیک > End Mode.');
}
function beginPlace(type){if(!state.project){tip('برای طراحی ابتدا یک پروژه بساز.');return}if(state.activeTab!=='schematic')showTab('schematic');state.mode='place';state.placing=type;updateChrome();setStatus('Place '+type+' | ESC to end mode');}
function beginWire(){if(!state.project){tip('ابتدا یک پروژه ایجاد کن.');return;}showTab('schematic');state.mode='wire';state.wireFrom=null;updateChrome();setStatus('Wire mode: click start/end; ESC to end.');}
/* Phase 5: circuit geometry + connectivity; independent from phase-6 numerical solver. */
function endpoints(part){
 if(part.type==='0')return [{key:part.id+':0',x:part.x,y:part.y-40}];
 const rad=(part.rotation||0)*Math.PI/180,c=Math.round(Math.cos(rad)),s=Math.round(Math.sin(rad));
 return [-45,45].map((xx,i)=>({key:part.id+':'+(i?'b':'a'),x:part.x+xx*c,y:part.y+xx*s}));
}
function segs(w){const out=[];let x=w.x1,y=w.y1;if(x!==w.x2){out.push({x1:x,y1:y,x2:w.x2,y2:y});x=w.x2}if(y!==w.y2)out.push({x1:x,y1:y,x2:x,y2:w.y2});return out;}
const between=(v,a,b)=>v>=Math.min(a,b)-0.1&&v<=Math.max(a,b)+0.1;
function onSeg(x,y,seg){return Math.abs(seg.x1-seg.x2)<.01 ? Math.abs(x-seg.x1)<.01&&between(y,seg.y1,seg.y2):Math.abs(y-seg.y1)<.01&&between(x,seg.x1,seg.x2)}
function touchesAtEnd(a,b){const ea=[{x:a.x1,y:a.y1},{x:a.x2,y:a.y2}],eb=[{x:b.x1,y:b.y1},{x:b.x2,y:b.y2}];return ea.some(p=>onSeg(p.x,p.y,b))||eb.some(p=>onSeg(p.x,p.y,a));}
function analyzeConnections(){
 const segments=[];state.wires.forEach((w,wi)=>segs(w).forEach(segment=>segments.push({...segment,wire:wi})));const pins=state.parts.flatMap(endpoints);
 const count=segments.length+pins.length,parent=Array.from({length:count},(_,i)=>i),find=i=>parent[i]===i?i:(parent[i]=find(parent[i]));
 const union=(a,b)=>{let x=find(a),y=find(b);if(x!==y)parent[x]=y};
 for(let i=0;i<segments.length;i++)for(let j=0;j<i;j++)if(segments[i].wire===segments[j].wire||touchesAtEnd(segments[i],segments[j]))union(i,j);
 pins.forEach((pin,i)=>segments.forEach((seg,j)=>{if(onSeg(pin.x,pin.y,seg))union(segments.length+i,j)}));
 const nodes={};pins.forEach((pin,i)=>nodes[pin.key]=find(segments.length+i));
 // Pins at exactly the same location connect even in absence of a wire.
 for(let i=0;i<pins.length;i++)for(let j=0;j<i;j++)if(pins[i].x===pins[j].x&&pins[i].y===pins[j].y)union(segments.length+i,segments.length+j);
 pins.forEach((pin,i)=>nodes[pin.key]=find(segments.length+i));
 return {nodes,pins,segments,find};
}
function parseEngineering(value){let t=String(value||'').trim().replace(/\s/g,'').replace(/Ω/gi,'').replace(/µ/g,'u');const m=t.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(meg|[kmunp]?)(v|ohm|f)?$/i);if(!m)return NaN;const mult={meg:1e6,k:1e3,m:1e-3,u:1e-6,n:1e-9,p:1e-12,'':1}[m[2].toLowerCase()];return Number(m[1])*mult}
function validateCircuit(){
 const issues=[];
 if(!state.project)return {ok:false,issues:['ابتدا یک پروژه Analog or Mixed A/D ایجاد کن.']};
 const rs=state.parts.filter(p=>p.type==='R'),src=state.parts.filter(p=>p.type==='VDC'),ground=state.parts.filter(p=>p.type==='0');
 if(rs.length!==3)issues.push('مدار مرجع باید سه مقاومت R1، R2 و R3 داشته باشد. اکنون '+rs.length+' مقاومت دارد.');
 if(src.length!==1)issues.push('یک منبع VDC لازم است.');
 if(ground.length!==1)issues.push('یک زمین با گره 0 لازم است.');
 const parts=Object.fromEntries(state.parts.map(x=>[x.id,x]));
 for(const id of ['R1','R2','R3','V1'])if(!parts[id])issues.push('قطعه '+id+' پیدا نشد.');
 for(const p of [...rs,...src]){const v=parseEngineering(p.value);if(!Number.isFinite(v)||(p.type==='R'&&v<=0))issues.push('مقدار '+p.id+' معتبر نیست: '+p.value);}
 if(!issues.length){
  const {nodes}=analyzeConnections(),n=(id,letter)=>nodes[id+':'+letter];
  const same=(a,b)=>a!==undefined&&b!==undefined&&a===b;
  const plus=n('V1','a'),minus=n('V1','b'),a=n('R1','a'),b=n('R1','b'),r2a=n('R2','a'),r2b=n('R2','b'),r3a=n('R3','a'),r3b=n('R3','b'),g=n(ground[0].id,'0');
  const parallel=(same(a,plus)&&same(b,minus))||(same(a,minus)&&same(b,plus));
  const chain=(same(r3a,plus)&&same(r3b,r2a)&&same(r2b,minus))||(same(r3b,plus)&&same(r3a,r2a)&&same(r2b,minus))||(same(r3a,plus)&&same(r3b,r2b)&&same(r2a,minus))||(same(r3b,plus)&&same(r3a,r2b)&&same(r2a,minus)) || (same(r2a,plus)&&same(r2b,r3a)&&same(r3b,minus))||(same(r2b,plus)&&same(r2a,r3a)&&same(r3b,minus))||(same(r2a,plus)&&same(r2b,r3b)&&same(r3a,minus))||(same(r2b,plus)&&same(r2a,r3b)&&same(r3a,minus));
  if(same(plus,minus))issues.push('اتصال کوتاه بین دو سر منبع V1 تشخیص داده شد.');
  if(!same(g,minus))issues.push('زمین 0 باید به گره منفی منبع متصل شود.');
  if(!parallel)issues.push('R1 باید بین گره مثبت منبع و زمین، موازی با شاخه R3+R2 باشد.');
  if(!chain)issues.push('R3 و R2 باید سری باشند و شاخه آن‌ها بین مثبت V1 و زمین قرار بگیرد.');
  for(const r of rs)if(same(n(r.id,'a'),n(r.id,'b')))issues.push('دو سر '+r.id+' به هم اتصال کوتاه شده‌اند.');
 }
 return {ok:issues.length===0,issues,nodes:analyzeConnections().nodes};
}
function invalidate(){window.PSpicePhase6?.invalidate?.();state.validation=null;const v=document.querySelector('#circuit-validation');if(v){v.className='p5-validation';v.textContent='هنوز بررسی نشده';}}
function inspectCircuit(openDialog=true){const result=validateCircuit();state.validation=result;const box=$('#circuit-validation');if(box){box.className='p5-validation '+(result.ok?'valid':'invalid');box.textContent=result.ok?'✓ اتصالات مدار مرجع صحیح است':`⚠ ${result.issues.length} مورد نیاز به اصلاح`;}setStatus(result.ok?'Circuit connections valid - Ready for analysis':'Circuit inspection: '+result.issues.length+' issue(s)');log('Circuit inspection: '+(result.ok?'PASS':'FAIL: '+result.issues.join(' / ')));
 if(openDialog){const content=result.ok?`<div class="p5-result-good">✓ ساختار مدار مطابق شکل صفحات ۱۲ تا ۱۵ فایل ورد است.</div><ul><li>V1 = ${escapeHTML(state.parts.find(p=>p.id==='V1').value)}</li>${['R1','R2','R3'].map(id=>`<li>${id} = ${escapeHTML(state.parts.find(p=>p.id===id).value)}</li>`).join('')}<li>گره 0 به منبع متصل است و R1 با شاخه سری R3 و R2 موازی است.</li></ul><div class="p5-notice">اکنون می‌توانی از PSpice > New Simulation Profile و سپس Run استفاده کنی.</div>`:`<div class="p5-result-bad">اتصال‌های مدار هنوز کامل نیستند:</div><ol>${result.issues.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ol><div class="p5-notice">نقاط اتصال را به پایه‌های قطعات برسان؛ اتصالات ناقص به‌عنوان اتصال صحیح پذیرفته نمی‌شوند.</div>`;const d=dialog('Electrical Connection Check',`<section class="p5-inspection" dir="rtl">${content}</section>`,actionButton('بستن','close'));}
 return result;
}
function anchorPoint(p){let best=null,bd=12;for(const pin of state.parts.flatMap(endpoints)){const dist=Math.hypot(p.x-pin.x,p.y-pin.y);if(dist<bd){best={x:pin.x,y:pin.y};bd=dist}}if(best)return best;for(const seg of state.wires.flatMap(segs)){let proj=seg.x1===seg.x2?{x:seg.x1,y:Math.min(Math.max(p.y,Math.min(seg.y1,seg.y2)),Math.max(seg.y1,seg.y2))}:{x:Math.min(Math.max(p.x,Math.min(seg.x1,seg.x2)),Math.max(seg.x1,seg.x2)),y:seg.y1};const dist=Math.hypot(p.x-proj.x,p.y-proj.y);if(dist<bd){best=proj;bd=dist}}return best||p;}
function endMode(){state.mode='select';state.placing=null;state.wireFrom=null;state.drag=null;$('#capture-temp').innerHTML='';updateChrome();setStatus('Ready - End Mode');}

function snap(x){return Math.round(x/5)*5}
function addPart(type,x,y){
 const prefix=type==='R'?'R':type==='C'?'C':type==='VDC'?'V':'G';let i=1;while(state.parts.some(c=>c.id===prefix+i))i++;
 const c={id:prefix+i,type,x:snap(x),y:snap(y),rotation:0,value:type==='R'?'1k':type==='C'?'1u':type==='VDC'?'0V':'0',display:'Name and Value'};
 state.parts.push(c);invalidate();log('Placed '+type+' ('+c.id+')');drawSchematic();return c;
}
function renderPart(p){
 const r=p.rotation||0;let visual='';if(p.type==='R')visual='<path d="M-45 0H-30L-24 -9-12 9 0 -9 12 9 24 -9 30 0H45" class="part-graphic"/>';
 else if(p.type==='C')visual='<path d="M-45 0H-7M7 0H45M-7 -21v42M7 -21v42" class="part-graphic"/>';
 else if(p.type==='VDC')visual='<path d="M-45 0H-25M25 0H45" class="part-graphic"/><circle cx="0" cy="0" r="25" class="part-graphic"/><path d="M-17 -6v12M-23 0h12M11 0h12" class="part-graphic"/>';
 else visual='<path d="M0 -40v20M-25 -20h50M-16 -12h32M-8 -5h16" class="part-graphic"/>';
 const term=p.type==='0'?'<circle data-terminal="'+escapeHTML(p.id)+'|0" cx="0" cy="-40" r="8" class="p5-pin"/>':`<circle data-terminal="${escapeHTML(p.id)}|a" cx="-45" cy="0" r="8" class="p5-pin"/><circle data-terminal="${escapeHTML(p.id)}|b" cx="45" cy="0" r="8" class="p5-pin"/>`;
 const name=p.type==='0'?'0':p.id,showValue=p.display!=='Name Only'&&p.display!=='Do Not Display',showName=p.display!=='Value Only'&&p.display!=='Do Not Display';
 return `<g class="component ${state.selected===p.id?'selected':''}" data-id="${escapeHTML(p.id)}" transform="translate(${p.x},${p.y})"><g transform="rotate(${r})"><rect x="-49" y="-32" width="98" height="64" fill="transparent"/>${visual}${term}</g>${showName?`<text x="29" y="-24" class="symbol-label">${escapeHTML(name)}</text>`:''}${showValue&&p.type!=='0'?`<text x="29" y="-7" class="symbol-label">${escapeHTML(p.value)}</text>`:''}</g>`;
}
function drawSchematic(){const layer=$('#capture-components');if(!layer)return;layer.innerHTML=state.parts.map(renderPart).join('');$('#capture-wires').innerHTML=state.wires.map((w,i)=>`<path class="wire-segment ${state.selectedWire===i?'selected':''}" data-wire="${i}" d="M${w.x1},${w.y1} H${w.x2} V${w.y2}"/>`).join('');$('#status-zoom').textContent='Scale='+(state.zoom*100).toFixed(0)+'%';}
function svgPoint(e){let svg=$('#capture-svg');const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=svg.getScreenCTM()?.inverse();if(!m)return{x:0,y:0};let o=p.matrixTransform(m);return{x:snap(o.x),y:snap(o.y)};}
function loadDemo(){
 switchWorkspace('capture');if(!state.project)state.project={name:'DC_Circuit_Demo',kind:'Analog or Mixed A/D',location:'Local Demo'};
 window.PSpicePhase6?.reset?.();state.parts=[];state.wires=[];state.zoom=1;state.mode='select';state.selected=null;state.selectedWire=null;state.libraries=['ANALOG','SOURCE','CAPSYM'];
 const a=addPart('VDC',180,350),r1=addPart('R',480,340),r2=addPart('R',900,350),r3=addPart('R',690,145),g=addPart('0',500,590);
 r1.rotation=90;r2.rotation=90;r3.rotation=0;a.rotation=90;g.rotation=0;
 a.value='200V';r1.value='2k';r2.value='4k';r3.value='3k';
 state.wires=[{x1:180,y1:305,x2:180,y2:145},{x1:180,y1:145,x2:645,y2:145},{x1:735,y1:145,x2:900,y2:145},{x1:900,y1:145,x2:900,y2:305},{x1:900,y1:395,x2:900,y2:530},{x1:180,y1:395,x2:180,y2:530},{x1:180,y1:530,x2:900,y2:530},{x1:480,y1:295,x2:480,y2:145},{x1:480,y1:385,x2:480,y2:530},{x1:500,y1:530,x2:500,y2:550}];
 showTab('schematic');renderTree();drawSchematic();endMode();invalidate();log('Loaded 200V resistor circuit (page 12-15 document)');inspectCircuit(false);tip('مدار ۲۰۰ ولتی بارگذاری و اتصالات بررسی شدند.');
}
function downloadData(name,content){const b=new Blob([content],{type:'application/json'}),url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function save(){if(!state.project){tip('پروژه‌ای برای ذخیره وجود ندارد.');return;}const data={format:'pspice-capture-educational-v3',project:state.project,parts:state.parts,wires:state.wires,libraries:state.libraries,simulationProfile:window.PSpicePhase6?.getProfile?.()||null};downloadData(state.project.name+'.capture-demo.json',JSON.stringify(data,null,2));setStatus('Saved educational JSON file');log('Educational JSON export requested.');}
function openProject(){const input=document.createElement('input');input.type='file';input.accept='.json';input.onchange=async()=>{try{
 if(!input.files?.[0])return;const data=JSON.parse(await input.files[0].text());
 if(!['pspice-capture-educational-v2','pspice-capture-educational-v3'].includes(data.format)||!Array.isArray(data.parts)||!Array.isArray(data.wires)||data.parts.length>200||data.wires.length>800||!data.project||typeof data.project.name!=='string')throw Error('Unsupported format');
 if(data.parts.some(p=>!['R','C','VDC','0'].includes(p.type)||!Number.isFinite(p.x)||!Number.isFinite(p.y)||!Number.isFinite(p.rotation)||p.rotation<0||p.rotation>=360||p.rotation%90!==0||typeof p.value!=='string'||p.value.length>60||typeof p.id!=='string'||!/^([RCVG]\d{1,3})$/.test(p.id)))throw Error('Invalid parts');
 if(data.wires.some(w=>!['x1','y1','x2','y2'].every(k=>Number.isFinite(w[k])&&Math.abs(w[k])<=3000)))throw Error('Invalid wires');if(data.project.name.length>60)throw Error('Invalid project name');
 state.project={name:data.project.name,kind:String(data.project.kind||'Analog or Mixed A/D').slice(0,60),location:String(data.project.location||'').slice(0,150)};state.parts=data.parts;state.wires=data.wires;state.selected=null;state.selectedWire=null;state.libraries=Array.isArray(data.libraries)?data.libraries.filter(x=>['ANALOG','SOURCE','CAPSYM'].includes(x)):['ANALOG','SOURCE','CAPSYM'];
 switchWorkspace('capture');showTab('schematic');renderTree();drawSchematic();invalidate();window.PSpicePhase6?.setProfile?.(data.simulationProfile);log('Educational project loaded.');tip('پروژه از JSON بارگذاری شد.');
 }catch(err){tip('خطا در باز کردن فایل: '+err.message)}};input.click();}
function showGuide(){const d=dialog('راهنمای محیط PSpice / OrCAD',`<div class="help-guide"><strong>فاز پنجم: طراحی واقعی مدار نمونه</strong><p>با <b>File → New → Project</b> پروژه بساز؛ سپس از <b>Place → Part</b> قطعات R، VDC و 0 را قرار بده. برای سیم‌کشی W و برای خروج Esc یا راست‌کلیک > End Mode.</p><p>برای ویرایش قطعه، دوبار کلیک کن. با گزینه «بررسی اتصال» مطمئن شو که سه مقاومت و منبع و زمین مطابق مدار سند متصل شده‌اند.</p><p>اکنون می‌توانی با PSpice > New Simulation Profile تنظیمات Bias Point، DC Sweep، Transient و AC Sweep را باز کنی. نتایج تحلیل محدود به مدار مقاومتی مرجع و مثال تکمیلی RC است.</p><div class="legacy-note">نمونه آموزشی RC قبلی در <b>legacy/index-standalone.html</b> حفظ شده است.</div></div>`,actionButton('بستن','close'));d.dir='ltr';}
function unsupported(action){let desc=descriptions[action];tip((desc?desc[0]+': '+desc[1]:'این گزینه')+' (در برنامه کامل نسخه اصلی وجود دارد؛ اجرای آن در این فاز فعال نیست.)');}
function runAction(act){closeMenu();if(['profile','edit','play','probe','volt','current','powerw','wave','cursor','stop'].includes(act)&&window.PSpicePhase6){window.PSpicePhase6.action(act);return;}switch(act){case'switch-pspice':switchWorkspace('pspice');break;case'switch-capture':switchWorkspace('capture');break;case'new':case'new-project':newProject();break;case'open':case'open-project':openProject();break;case'save':save();break;case'print':window.print();break;case'show-guide':case'help':showGuide();break;case'part':partBrowser();break;case'part-r':beginPlace('R');break;case'part-c':beginPlace('C');break;case'part-vdc':beginPlace('VDC');break;case'ground':beginPlace('0');break;case'wire':beginWire();break;case'validate-circuit':inspectCircuit();break;case'end-mode':endMode();break;case'clear-wires':if(!state.project)return;state.wires=[];state.wireFrom=null;state.selectedWire=null;invalidate();drawSchematic();log('Removed all wires');break;case'select':endMode();break;case'fit':state.zoom=1;$('#capture-svg').setAttribute('viewBox','0 0 1200 760');drawSchematic();break;case'zin':case'zout':state.zoom=Math.max(.65,Math.min(2.2,state.zoom*(act==='zin'?1.25:.8)));$('#capture-svg').setAttribute('viewBox',`0 0 ${1200/state.zoom} ${760/state.zoom}`);drawSchematic();break;case'grid':{const bg=$('#capture-dots');bg.setAttribute('width',bg.getAttribute('width')==='12'?'24':'12');tip('نمایش شبکه تغییر کرد.');break}case'panel':$('#project-panel').classList.toggle('hidden');$('#capture-area .capture-main').style.gridTemplateColumns=$('#project-panel').classList.contains('hidden')?'minmax(0,1fr) 44px':'';break;case'toggle-log':$('#session-log').classList.toggle('collapsed');break;case'load-demo':loadDemo();break;case'show-sheet':showTab('schematic');break;case'rotate':{const p=state.parts.find(p=>p.id===state.selected);if(!p){tip('ابتدا قطعه‌ای انتخاب کن.');break;}p.rotation=(p.rotation+90)%360;invalidate();drawSchematic();break}case'delete':if(state.selected){state.parts=state.parts.filter(p=>p.id!==state.selected);state.selected=null;}else if(state.selectedWire!==null){state.wires.splice(state.selectedWire,1);state.selectedWire=null;}invalidate();drawSchematic();break;case'close-project':state.project=null;state.parts=[];state.wires=[];window.PSpicePhase6?.reset?.();renderTree();showTab('start');break;case'exit':tip('برای خروج، برگه مرورگر را ببند.');break;default:unsupported(act)}}
function init(){log('PSpice / OrCAD 17.2 educational workspace initialized (offline).');log('Phase 6: supported reference circuit / RC analysis engine connected.');updateChrome();renderTree();
 $('#menus').addEventListener('click',e=>{let m=e.target.closest('[data-menu]');if(m)showMenu(m.dataset.menu,m)});
 document.addEventListener('click',e=>{const action=e.target.closest('[data-act]');if(action){e.preventDefault();runAction(action.dataset.act);return;}const popup=e.target.closest('.menu-popup [data-act]');if(popup){runAction(popup.dataset.act);return;}const d=e.target.closest('[data-dialog-act]');if(d){if(d.dataset.dialogAct==='close')closeDialog();return;}const tab=e.target.closest('[data-tab]');if(tab){showTab(tab.dataset.tab);return;}if(!e.target.closest('#popup-root')&&!e.target.closest('#menus'))closeMenu();});
 $('#launch-capture-main').onclick=()=>switchWorkspace('capture');
 $('#dialog-backdrop').onclick=closeDialog;document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDialog();closeMenu();endMode();return;}if(e.target.matches('input,textarea,select'))return;if(e.ctrlKey&&e.key.toLowerCase()==='s'){e.preventDefault();save();return;}if(state.workspace!=='capture'||!state.project||e.ctrlKey||e.altKey)return;if(e.key.toLowerCase()==='p')partBrowser();if(e.key.toLowerCase()==='w')beginWire();if(e.key.toLowerCase()==='g'&&e.shiftKey)beginPlace('0');if(e.key.toLowerCase()==='r'&&state.selected)runAction('rotate');if(e.key==='Delete')runAction('delete');});
 $('#capture-svg').addEventListener('pointerdown',e=>{
  if(!state.project||e.button!==0)return;const raw=svgPoint(e),p=anchorPoint(raw);$('#status-cursor').textContent=`X=${(raw.x/100).toFixed(2)} Y=${(raw.y/100).toFixed(2)}`;
  if(state.mode==='marker'){window.PSpicePhase6?.placeMarker?.(raw);endMode();return;}
  if(state.mode==='place'){if(e.target.closest('.component'))return;addPart(state.placing,raw.x,raw.y);setStatus('Placed '+state.placing+'; click for another or ESC.');return;}
  if(state.mode==='wire'){if(!state.wireFrom){state.wireFrom=p;setStatus('Click wire endpoint');}else{if(p.x!==state.wireFrom.x||p.y!==state.wireFrom.y){state.wires.push({x1:state.wireFrom.x,y1:state.wireFrom.y,x2:p.x,y2:p.y});invalidate();drawSchematic();log('Added electrical wire: '+p.x+','+p.y);}state.wireFrom=null;$('#capture-temp').innerHTML='';}return;}
  const c=e.target.closest('.component'),wire=e.target.closest('[data-wire]');state.selected=c?.dataset.id||null;state.selectedWire=wire?Number(wire.dataset.wire):null;$$('#capture-components .component.selected').forEach(el=>el.classList.remove('selected'));$$('#capture-wires .wire-segment.selected').forEach(el=>el.classList.remove('selected'));if(c)c.classList.add('selected');if(wire)wire.classList.add('selected');
  if(c){state.drag={id:c.dataset.id,x:raw.x,y:raw.y,origx:state.parts.find(x=>x.id===c.dataset.id).x,origy:state.parts.find(x=>x.id===c.dataset.id).y};}
 });
 $('#capture-svg').addEventListener('pointermove',e=>{
  if(!state.project)return;const raw=svgPoint(e);$('#status-cursor').textContent=`X=${(raw.x/100).toFixed(2)} Y=${(raw.y/100).toFixed(2)}`;
  if(state.drag){const c=state.parts.find(x=>x.id===state.drag.id);if(c){const nx=snap(state.drag.origx+raw.x-state.drag.x),ny=snap(state.drag.origy+raw.y-state.drag.y);if(nx!==c.x||ny!==c.y){c.x=nx;c.y=ny;invalidate();drawSchematic()}}}
  if(state.mode==='wire'&&state.wireFrom){const p=anchorPoint(raw);$('#capture-temp').innerHTML=`<path class="p5-wire-preview" d="M${state.wireFrom.x},${state.wireFrom.y} H${p.x} V${p.y}"/>`;}
  else if(state.mode==='place'&&state.placing){$('#capture-temp').innerHTML=`<circle cx="${raw.x}" cy="${raw.y}" r="12" class="p5-place-cursor"/>`;}
 });
 window.addEventListener('pointerup',()=>state.drag=null);
 $('#capture-svg').addEventListener('contextmenu',e=>{
  if(!state.project)return;e.preventDefault();closeMenu();const c=e.target.closest('.component'),wire=e.target.closest('[data-wire]');if(c){state.selected=c.dataset.id;state.selectedWire=null;}else if(wire){state.selected=null;state.selectedWire=Number(wire.dataset.wire);}drawSchematic();
  const pop=document.createElement('div');pop.className='menu-popup p5-context';pop.style.left=Math.min(e.clientX,innerWidth-220)+'px';pop.style.top=Math.min(e.clientY,innerHeight-220)+'px';pop.innerHTML=`<div class="item" data-act="end-mode">End Mode <em>Esc</em></div><div class="item" data-act="rotate">Rotate <em>R</em></div><div class="item" data-act="delete">Delete <em>Del</em></div><div class="menu-separator"></div><div class="item" data-act="validate-circuit">Check Connections</div>`;$('#popup-root').append(pop);
 });
 $('#capture-svg').addEventListener('dblclick',e=>{const target=e.target.closest('.component');if(!target||state.mode!=='select')return;const c=state.parts.find(p=>p.id===target.dataset.id);if(!c)return;
  const d=dialog('Display Properties',`<section class="p5-props" dir="ltr"><div><strong>Reference</strong><span>${escapeHTML(c.id)}</span></div><label for="part-value">Value</label><input id="part-value" type="text" value="${escapeHTML(c.value)}" maxlength="40"><fieldset><legend>Display Format</legend>${['Do Not Display','Value Only','Name and Value','Name Only'].map(opt=>`<label><input type="radio" name="part-display" value="${opt}" ${(c.display||'Name and Value')===opt?'checked':''}> ${opt}</label>`).join('')}</fieldset><small dir="rtl">مقادیر معتبر: 2k، 4k، 3k برای مقاومت و 200V برای منبع. با تغییر مقدار، اعتبارسنجی دوباره لازم است.</small></section>`,`<button class="dialog-btn" id="apply-value">OK</button>${actionButton('Cancel','close')}`);
  d.querySelector('#apply-value').onclick=()=>{const next=d.querySelector('#part-value').value.trim();const parsed=parseEngineering(next);if(c.type!=='0'&&(!Number.isFinite(parsed)||(c.type==='R'&&parsed<=0))){tip('مقدار واردشده معتبر نیست. مانند 2k یا 200V.');return;}if(c.type!=='0')c.value=next;c.display=d.querySelector('input[name="part-display"]:checked').value;closeDialog();invalidate();drawSchematic();log('Updated '+c.id+' value to '+c.value);};
 });
 window.addEventListener('resize',closeMenu);
 }
window.PSpiceCaptureBridge=Object.freeze({
 switchWorkspace, perform:runAction, openNewProject:newProject,
 loadSample:loadDemo, checkCircuit:inspectCircuit, getCircuitReport:()=>validateCircuit(), getNetNodes:()=>analyzeConnections().nodes, closeSoftwareDialog:closeDialog,
 showSoftwareGuide:showGuide,
 getCircuitData:()=>({project:state.project?{...state.project}:null,parts:state.parts.map(x=>({...x})),wires:state.wires.map(x=>({...x})),validation:validateCircuit(),nodes:analyzeConnections().nodes}),
 setMarkerMode:()=>{if(!state.project)return;state.mode='marker';updateChrome();setStatus('Voltage Marker: choose a circuit node');},
 writeStatus:setStatus,writeLog:log,showTip:tip,
 getSnapshot:()=>({workspace:state.workspace,project:state.project?{...state.project}:null,partCount:state.parts.length,wireCount:state.wires.length,activeTab:state.activeTab,libraries:[...state.libraries],mode:state.mode}),
 getToolDescriptions:()=>Object.fromEntries(Object.entries(descriptions).map(([key,value])=>[key,{name:value[0],description:value[1]}]))
});
init();})();
