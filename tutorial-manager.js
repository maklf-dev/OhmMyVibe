/* PSpice / OrCAD phase 3: independent RTL lessons and offline guided overlay.
   Intentionally self-contained; no CDN/network access.  Content follows pspice.docx.
   The built-in guide is the phase-3 implementation; Compatible with official Driver.js 1.x when the original distribution is supplied; offline fallback is fully functional.
*/
(()=>{'use strict';
const $=sel=>document.querySelector(sel), esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const C=window.PSpiceCaptureBridge;
const step=(title,text,target,workspace='capture',demo=null)=>({title,text,target,workspace,demo});
const catalog=[
{ id:'intro',category:'مقدمات و نصب',title:'آشنایی با PSpice و تاریخچه',pages:'۱ تا ۳',status:'intro',lead:'PSpice نرم‌افزار تحلیل مدار است و OrCAD Capture محیط ترسیم شماتیک را فراهم می‌کند.',summary:['SPICE مخفف Simulation Program with Integrated Circuit Emphasis است.','مدار در Capture طراحی می‌شود و محاسبه شبیه‌سازی بر عهده PSpice است.','این کلون، نسخه غیررسمی آموزشی و محدود به سناریوهای مشخص است.'],steps:[step('PSpice چیست؟','طبق مقدمه فایل، با PSpice می‌توان مدارهای الکتریکی را قبل از ساخت فیزیکی تحلیل کرد. این محیط، بخش شبیه‌سازی را نمایش می‌دهد.','#pspice-surface','pspice'),step('رابط طراحی و تحلیل','در مجموعه OrCAD، طراحی شماتیک در Capture و بررسی نتایج در PSpice انجام می‌شود. دو محیط از یکدیگر جدا هستند.','#launch-capture-main','pspice','switch-capture'),step('مرور محیط Capture','محیط Capture شامل منوها، نوار ابزار، فهرست پروژه و صفحه شماتیک است. در مباحث بعد با آن‌ها کار می‌کنیم.','#capture-area','capture')]},
{ id:'install',category:'مقدمات و نصب',title:'دانلود، نصب و راه‌اندازی',pages:'تکمیل آموزشی با منابع رسمی',status:'intro',lead:'شناخت نسخه‌ها، دسترسی به دانلود رسمی و مرور گام‌به‌گام نصب و نخستین اجرا.',summary:['نسخه و نیازمندی‌های سیستم باید از منبع رسمی بررسی شوند.','دریافت نصب‌کننده از منبع رسمی، نصب، راه‌اندازی و ایجاد پروژه آزمایشی، مسیر کلی هستند.','راهنمای فارسی به‌صورت آفلاین باز می‌شود، اما دریافت نصب‌کننده از سایت رسمی اینترنت می‌خواهد.'],steps:[step('انتخاب نسخه صحیح','تصاویر سند مربوط به خانواده کلاسیک OrCAD Capture و PSpice هستند. هنگام نصب، نسخه سیستم و مجوز آن را با راهنمای رسمی همان نسخه بررسی کن.','#app-caption','capture'),step('دریافت نصب‌کننده','صفحه آغازین اکنون لینک‌های رسمی دانلود و مراحل کلی نصب را دارد؛ از فهرست آموزش، مبحث نصب را انتخاب کن.','#start-view','capture'),step('شروع کار پس از نصب','در محیط واقعی پس از اجرای Capture می‌توان از مسیر File > New > Project یک پروژه جدید ساخت.','#menus','capture')]},
{ id:'workspace',category:'شناخت محیط',title:'آشنایی با پنجره اصلی Capture',pages:'۳ تا ۵',status:'ready',lead:'شناخت ناحیه طراحی، نوار عنوان، منوها، Project Manager و Session Log.',summary:['نوار بالای صفحه شامل منوها و ابزارهای پرکاربرد است.','Project Manager فایل‌ها و صفحات طراحی را نمایش می‌دهد.','محل طراحی شماتیک در بخش مرکزی قرار دارد و Session Log پیام‌های برنامه را نشان می‌دهد.'],steps:[step('نوار عنوان','نام نرم‌افزار و نام پروژه یا صفحه فعال در بالاترین بخش پنجره دیده می‌شوند.','.windows-title'),step('منوهای برنامه','File، Edit، View، Place و PSpice از منوهای مهم محیط Capture هستند.','#menus'),step('نوار ابزار اصلی','دکمه‌های سریع همان دستورهایی را در اختیار می‌گذارند که از منوها نیز قابل دسترسی هستند.','#tools-main'),step('Project Manager','در پنل سمت چپ، ساختار پروژه و صفحه طراحی قرار می‌گیرد.','#project-panel'),step('Session Log','پیام‌های عملیات و وضعیت برنامه در بخش پایینی ثبت می‌شوند.','#session-log')]},
{ id:'top-tools',category:'شناخت محیط',title:'منوها و نوار ابزار بالا',pages:'۴ و ۵',status:'ready',lead:'آشنایی با کنترل‌های File، Zoom و ابزارهای پرکاربرد.',summary:['دستورهای New، Open، Save و Print در File قرار می‌گیرند.','Zoom In و Zoom Out مقیاس را تغییر می‌دهند و Zoom All نمای کلی را نشان می‌دهد.','هر آیکن Tooltip دارد؛ ابزارهای خارج از محدوده فعلی کلون با توضیح مشخص شده‌اند.'],steps:[step('منوی File','از File برای ایجاد، باز کردن، ذخیره و چاپ پروژه استفاده می‌شود.','.menu-item[data-menu="File"]'),step('ابزارهای فایل','این آیکن‌ها میانبر New / Open / Save / Print هستند.','#tools-main'),step('ابزارهای بزرگنمایی','Zoom In و Zoom Out و Zoom All نمایش شماتیک را تغییر می‌دهند.','#tools-main'),step('دستورات تخصصی','نوار دوم شامل Place Part، Wire، Ground و گزینه‌های شبیه‌سازی است.','#tools-secondary')]},
{ id:'panels',category:'شناخت محیط',title:'پنل‌ها، پالت طراحی و میانبرها',pages:'۵ و ۶',status:'ready',lead:'جایگاه ابزارهای سمت راست، نوار وضعیت و پنل‌های اصلی.',summary:['پالت سمت راست راه دسترسی سریع به ابزارهای ترسیم است.','Status Bar مختصات، مقیاس و پیام وضعیت را نشان می‌دهد.','میانبرهای ابزارها با توجه به نسخه نرم‌افزار باید کنترل شوند.'],steps:[step('پالت Place','دکمه‌های سمت راست مانند Part، Wire، Ground، Junction و Bus برای طراحی مدار استفاده می‌شوند.','#capture-palette'),step('صفحه شماتیک','قطعات و اتصال‌ها در صفحه سفید مرکزی قرار می‌گیرند.','#start-view'),step('نوار وضعیت','مختصات نشانگر و میزان بزرگنمایی در پایین صفحه دیده می‌شود.','.status-line'),step('پنل پروژه','ساختار فایل شماتیک پس از ساخت پروژه در سمت چپ ظاهر می‌شود.','#project-panel')]},
{ id:'new-project',category:'طراحی مدار',title:'ساخت پروژه جدید',pages:'۹ تا ۱۱',status:'ready',lead:'ایجاد پروژه Analog or Mixed A/D و صفحه شماتیک خالی.',summary:['مسیر اصلی: File > New > Project.','برای شبیه‌سازی، نوع Analog or Mixed A/D انتخاب می‌شود.','با Create a blank project صفحه‌ای خالی برای طراحی ایجاد می‌شود.','مسیر Location در این کلون صرفاً مجازی است و معادل ذخیره واقعی در ویندوز نیست.'],steps:[step('شروع پروژه','از منوی File به New Project می‌رسیم. در نمونه آموزشی می‌توان پنجره واقعی بازسازی‌شده را با دکمه زیر باز کرد.','.menu-item[data-menu="File"]','capture','new-project'),step('نام و نوع پروژه','در پنجره New Project نام موردنظر را وارد کن و گزینه Analog or Mixed A/D را انتخاب کن.','#dialog-root .win-dialog'),step('پروژه خالی','بعد از تأیید، Create a blank project را انتخاب کن تا صفحه شماتیک باز شود.','#dialog-root .win-dialog'),step('نمایش پروژه','پس از ساخت، صفحه PAGE1 در قسمت مرکزی و ساختار پروژه در Project Manager نمایش داده می‌شود.','#project-panel')]},
{ id:'libraries',category:'طراحی مدار',title:'کتابخانه‌ها و انتخاب قطعه',pages:'۶ تا ۹',status:'ready',lead:'آشنایی با Place Part، کتابخانه ANALOG و SOURCE و پنجره انتخاب.',summary:['قطعاتی مثل مقاومت و خازن از کتابخانه‌های مرتبط انتخاب می‌شوند.','کتابخانه ANALOG شامل قطعات پایه آنالوگ است.','پنجره Place Part با جست‌وجوی قطعات و افزودن یا حذف کتابخانه‌های ANALOG و SOURCE و CAPSYM کار می‌کند.'],steps:[step('ابزار Place Part','این ابزار پنجره انتخاب قطعه را باز می‌کند. برای مشاهده پنجره می‌توان از دکمه نمایش نمونه استفاده کرد.','#capture-palette','capture','part'),step('فهرست قطعات','در پنجره بازشده عبارت R را جست‌وجو کن. در نسخه اصلی کتابخانه‌ها با Add Library مدیریت می‌شوند.','#dialog-root .win-dialog'),step('پیش‌نمایش نماد','پس از انتخاب یک قطعه، نماد آن قبل از قرار دادن روی شماتیک نمایش داده می‌شود.','#dialog-root .win-dialog'),step('کتابخانه‌های اساسی','ANALOG برای مقاومت و خازن و SOURCE برای منابع ولتاژ استفاده می‌شوند.','#capture-palette')]},
{ id:'place-wire',category:'طراحی مدار',title:'رسم مدار و سیم‌کشی',pages:'۱۱ تا ۱۳',status:'ready',lead:'قرار دادن قطعات، سیم‌کشی الکتریکی و اعتبارسنجی مدار مرجع.',summary:['قطعات در صفحه شماتیک قرار داده می‌شوند.','دستور Wire برای رسم اتصال بین پایه‌ها به کار می‌رود.','پس از پایان عملیات با Esc یا End Mode از ابزار خارج می‌شویم.','با ابزار «بررسی اتصال‌ها» می‌توان کامل بودن اتصال‌های مدار مرجع را کنترل کرد.'],steps:[step('بارگذاری مدار نمونه','مدار مقاومتی سه‌مقاومتیِ فایل را برای تمرین نمایش بده.','#schematic-view','capture','load-demo'),step('قطعات مدار','این مدار از V1، R1، R2، R3 و زمین تشکیل شده است.','#capture-components'),step('ابزار سیم‌کشی','ابزار Wire از پالت سمت راست یا با کلید W قابل انتخاب است.','#capture-palette'),step('پایان عملیات','پس از اتمام سیم‌کشی، راست‌کلیک و End Mode یا کلید Esc حالت ترسیم را خاتمه می‌دهد.','#capture-svg')]},
{ id:'attributes',category:'طراحی مدار',title:'ویرایش مقاومت، منبع و زمین',pages:'۱۳ تا ۱۵',status:'ready',lead:'ویرایش مقدار قطعه و بررسی مفهوم Display Properties.',summary:['R1 = 2kΩ، R2 = 4kΩ و R3 = 3kΩ مقادیر مدار مرجع هستند.','منبع VDC باید روی ۲۰۰ ولت تنظیم شود.','زمین به گره مرجع با ولتاژ صفر اشاره دارد.'],formulas:['R1 = 2 kΩ   |   R2 = 4 kΩ   |   R3 = 3 kΩ','V1 = 200 V DC'],steps:[step('مدار آزمایشی','برای نمایش مدار مرجع، نمونه آماده را بارگذاری کن.','#capture-svg','capture','load-demo'),step('مقدار مقاومت','با دوبار کلیک روی مقاومت، پنجره Display Properties باز می‌شود و می‌توان مقدار را تغییر داد.','#capture-components'),step('منبع DC','منبع VDC مقدار ثابت ولتاژ را تعیین می‌کند. در مدار مثال این مقدار ۲۰۰ ولت است.','#capture-components'),step('نماد زمین','گره 0 مرجع تمام ولتاژهای مدار است.','#capture-components')]},
{ id:'sim-profile',category:'شبیه‌سازی و اندازه‌گیری',title:'ساخت Simulation Profile',pages:'۱۵ و ۱۶',status:'ready',lead:'آشنایی با ساخت پروفایل شبیه‌سازی و پنجره Simulation Settings.',summary:['یک نام برای پروفایل شبیه‌سازی انتخاب می‌شود.','از Analysis type نوع تحلیل مشخص می‌شود.','پنجره Simulation Settings فعال است؛ با آن نوع تحلیل و پارامترها را مشخص کن.'],steps:[step('گزینه PSpice','دستور New Simulation Profile از منوی PSpice در Capture در دسترس است.','.menu-item[data-menu="PSpice"]'),step('نام پروفایل','پس از ساخت پروفایل، پنجره Simulation Settings برای تنظیم نوع تحلیل نمایش داده می‌شود.','#tools-secondary'),step('نوع تحلیل','انواع اصلی مطرح‌شده در فایل شامل Time Domain، DC Sweep، AC Sweep و Bias Point هستند.','#tools-secondary')]},
{ id:'bias-labels',category:'شبیه‌سازی و اندازه‌گیری',title:'نمایش ولتاژ، جریان و توان',pages:'۱۷ و ۱۸',status:'ready',lead:'تفسیر محاسبات مدار مرجع و آشنایی با ابزارهای V، I و W.',summary:['گره A برابر ۲۰۰ ولت و زمین برابر صفر ولت است.','جریان R1 برابر ۱۰۰ میلی‌آمپر است.','توان R1 برابر ۲۰ وات، توان R2 حدود ۳٫۲۶۵ وات و توان R3 حدود ۲٫۴۴۹ وات است.','با انتخاب V، I و W مقدارهای حل‌شده روی شماتیک نمایش داده می‌شوند.'],formulas:['I(R1) = 200 V / 2 kΩ = 100 mA','P(R1) = V × I = 200 × 0.1 = 20 W','I(R2) = I(R3) = 200 V / (3 kΩ + 4 kΩ) ≈ 28.57 mA','V(R2) = I(R2) × 4 kΩ ≈ 114.29 V','P(R2) = I(R2)² × 4 kΩ ≈ 3.265 W','P(R3) = I(R3)² × 3 kΩ ≈ 2.449 W'],steps:[step('مدار مرجع','مدار نمونه ۲۰۰ ولتی با سه مقاومت در سند، نمونه مبنای محاسبات است.','#capture-svg','capture','load-demo'),step('دکمه Voltage','ابزار V برای نمایش ولتاژ گره‌ها پس از تحلیل استفاده می‌شود.','#tools-secondary'),step('دکمه Current','ابزار I جریان شاخه‌ها را روی شماتیک نمایش می‌دهد.','#tools-secondary'),step('دکمه Power','ابزار W توان مصرفی یا تولیدی اجزا را مشخص می‌کند.','#tools-secondary')]},
{ id:'probe',category:'شبیه‌سازی و اندازه‌گیری',title:'پراب‌ها و مشاهده نمودار',pages:'۱۸ و ۱۹',status:'ready',lead:'انتخاب محل اندازه‌گیری و تفسیر نمودار ولتاژ.',summary:['Voltage Marker بر گره موردنظر قرار داده می‌شود.','در مدار مقاومتی با منبع DC ثابت، خروجی زمانی در حالت پایدار خط افقی است.','با Run پنجره Probe باز می‌شود و نمودار محاسبه‌شده را نمایش می‌دهد.'],steps:[step('ابزار Marker','این ابزار نقطه‌ای را برای مشاهده شکل موج ولتاژ یا جریان انتخاب می‌کند.','#tools-secondary'),step('جای قرار دادن پراب','در مثال فایل، پراب ولتاژ روی گره بالایی R2 قرار می‌گیرد.','#capture-svg'),step('نمایش نمودار','بعد از Run نمودار مربوط به ولتاژ همان گره نمایش داده خواهد شد.','#tools-secondary')]},
{ id:'transient',category:'انواع تحلیل',title:'Time Domain (Transient)',pages:'۱۹ تا ۲۱',status:'ready',lead:'تحلیل کمیت‌های مدار بر حسب زمان و تنظیم گام محاسبه.',summary:['Run to time مدت کل شبیه‌سازی را مشخص می‌کند.','Maximum step size حداکثر گام زمانی را محدود می‌کند.','گام کوچک‌تر معمولاً جزئیات بیشتری نشان می‌دهد، اما محاسبات بیشتری می‌طلبد.'],formulas:['t = 0 … Tstop','Δt ≤ Maximum step size'],steps:[step('تعریف تحلیل زمانی','Transient تغییرات ولتاژ و جریان را در طول زمان بررسی می‌کند.','#tools-secondary'),step('مدت تحلیل','Run to time زمان پایان تحلیل را مشخص می‌کند.','.menu-item[data-menu="PSpice"]'),step('تنظیم گام زمانی','بخش Transient Options روی تفکیک زمانی نتیجه اثر دارد. پنجره Simulation Settings را باز کن و Run to time و Maximum step size را تنظیم کن.','#tools-secondary')]},
{ id:'dc-sweep',category:'انواع تحلیل',title:'DC Sweep',pages:'۲۱',status:'ready',lead:'بررسی تغییرات خروجی با تغییر مقدار منبع DC.',summary:['منبع مورد بررسی، مقدار شروع، پایان و گام تغییر انتخاب می‌شوند.','برای مدار مقاومتی مرجع، تغییر ولتاژ R2 با ولتاژ منبع خطی است.','نمودار DC Sweep با استفاده از مقادیر فعلی قطعات محاسبه می‌شود.'],formulas:['V(R2) = V1 × R2 / (R3 + R2)','V(R2) = V1 × 4 / 7'],steps:[step('انتخاب DC Sweep','این تحلیل با تغییر پله‌ای یک منبع، نتایج مدار را در چند حالت حل می‌کند.','.menu-item[data-menu="PSpice"]'),step('تنظیم دامنه','پارامترهای Start Value و End Value و Increment بازه تغییر را تعیین می‌کنند.','#tools-secondary'),step('مشاهده رابطه خروجی','با مدار ۳kΩ و ۴kΩ در یک شاخه، ولتاژ روی R2 برابر چهار هفتم ولتاژ منبع است.','#capture-svg','capture','load-demo')]},
{ id:'ac-sweep',category:'انواع تحلیل',title:'AC Sweep / Noise',pages:'۲۱ و ۲۲',status:'ready',lead:'بررسی پاسخ فرکانسی مدار در یک بازه مشخص.',summary:['AC Sweep مقدار و فاز پاسخ را برحسب فرکانس بررسی می‌کند.','Start Frequency و End Frequency بازه را مشخص می‌کنند.','مثال RC برای محاسبه پاسخ فرکانسی، تکمیل آموزشی برنامه در فاز ششم است و عیناً در سند وجود ندارد.'],formulas:['|H(jω)| = 1 / √(1 + (ωRC)²)  (مثال تکمیلی RC)'],steps:[step('مفهوم پاسخ فرکانسی','AC Sweep عملکرد مدار را هنگام تغییر فرکانس ورودی تحلیل می‌کند.','#tools-secondary'),step('انواع Sweep','می‌توان بازه فرکانسی را به شکل Linear یا Logarithmic بررسی کرد.','.menu-item[data-menu="PSpice"]'),step('مثال تکمیلی','برای آزمایش واقعی مدار RC مستقل برای تحلیل فرکانسی در پنجره Simulation Settings قابل انتخاب است.','#capture-svg')]},
{ id:'bias-point',category:'انواع تحلیل',title:'Bias Point',pages:'۲۲ و ۲۳',status:'ready',lead:'محاسبه نقطه کار DC و تفسیر خروجی آن.',summary:['Bias Point وضعیت DC مدار را در نقطه کار مشخص می‌کند.','ولتاژ گره‌ها و جریان شاخه‌ها از نتایج اصلی هستند.','برای مدار نمونه، این تحلیل از همان حل گره‌ای DC استفاده خواهد کرد.'],formulas:['V(A) = 200 V','V(R2 top) = 200 × 4 / 7 ≈ 114.29 V','V(GND) = 0 V'],steps:[step('نقطه کار مدار','تحلیل Bias Point مقادیر DC مدار را در شرایط مشخص گزارش می‌کند.','.menu-item[data-menu="PSpice"]'),step('مقادیر مرجع','با منبع ۲۰۰ ولتی در مدار نمونه، جریان‌ها و ولتاژها از قوانین اهم و کیرشهف محاسبه می‌شوند.','#capture-svg','capture','load-demo'),step('نتایج خروجی','در این نسخه، مقدارهای نقطه کار DC روی شماتیک نمایش داده می‌شوند.','#tools-secondary')]}
];
const categories=['مقدمات و نصب','شناخت محیط','طراحی مدار','شبیه‌سازی و اندازه‌گیری','انواع تحلیل'];
const KEY='pspice-orcad-training-phase3-v1';
const RULES={
 'new-project':{0:'new-project-open',1:'new-project-form',2:'project-created'},
 'libraries':{0:'part-open'},
 'place-wire':{0:'reference-loaded',2:'wire-mode'},
 'attributes':{0:'reference-loaded',1:'attributes-open'},
 'sim-profile':{0:'profile-window',1:'profile-created'},
 'bias-labels':{0:'reference-loaded',1:'result-created'},
 'probe':{0:'reference-loaded',1:'probe-open'},
 'dc-sweep':{2:'dc-result'},
 'ac-sweep':{2:'ac-result'},
 'bias-point':{2:'bias-result'},
 'transient':{2:'transient-result'}
};
const commands={
  'new-project-open':{name:'باز کردن New Project',run:()=>C.openNewProject()},
  'reference-loaded':{name:'بارگذاری مدار مرجع',run:()=>C.loadSample()},
  'part-open':{name:'باز کردن Place Part',run:()=>{if(!C.getSnapshot().project)C.loadSample();C.perform('part');}},
  'wire-mode':{name:'فعال کردن Wire',run:()=>{if(!C.getSnapshot().project)C.loadSample();C.perform('wire');}},
  'attributes-open':{name:'ویرایش مقاومت R1',run:()=>{if(!C.getSnapshot().project)C.loadSample();C.perform('end-mode');const node=document.querySelector('#capture-svg .component[data-id="R1"]');if(node)node.dispatchEvent(new MouseEvent('dblclick',{bubbles:true}));}},
  'profile-window':{name:'باز کردن New Simulation',run:()=>{if(!C.getSnapshot().project)C.loadSample();window.PSpicePhase6.action('profile');}},
  'profile-created':{name:'ساخت پروفایل نمونه',run:()=>{if(!C.getSnapshot().project)C.loadSample();window.PSpicePhase6.setProfile({name:'Run1',type:'transient',circuit:'reference'});document.querySelector('#p6-modal #p6-dialog-x')?.click();}},
  'new-project-form':{name:'ثبت مشخصات پروژه',run:()=>{if(!document.querySelector('#dialog-root #project-name'))C.openNewProject();const input=document.querySelector('#project-name');if(input)input.value='PSpice_Demo';}},
  'project-created':{name:'تکمیل ایجاد پروژه',run:()=>{if(document.querySelector('#dialog-root #project-name'))document.querySelector('#create-next')?.click();document.querySelector('#blank-ok')?.click();}},
  'result-created':{name:'اجرای Bias Point',run:()=>runReference('bias')},
  'probe-open':{name:'نمایش نمودار Transient',run:()=>runReference('transient')},
  'dc-result':{name:'اجرای DC Sweep',run:()=>runReference('dc')},
  'ac-result':{name:'اجرای مثال RC (AC Sweep)',run:()=>runReference('ac')},
  'bias-result':{name:'محاسبه Bias Point',run:()=>runReference('bias')},
  'transient-result':{name:'اجرای Transient',run:()=>runReference('transient')}
};
function runReference(kind){if(!C.getSnapshot().project)C.loadSample();const P=window.PSpicePhase6;if(!P)return;P.setProfile({name:'Training_'+kind,type:kind,circuit:kind==='ac'?'rc':'reference'});P.action('play');}
function check(rule){const S=C.getSnapshot(),P=window.PSpicePhase6;const profile=P?.getProfile(),result=P?.getResult();switch(rule){
 case 'new-project-open':return !!document.querySelector('#dialog-root #project-name');
 case 'new-project-form':return (!!document.querySelector('#dialog-root #project-name')?.value.trim()&&!!document.querySelector('input[name="project-type"]:checked'))||!!document.querySelector('#blank-ok')||!!S.project;
 case 'project-created':return !!S.project;
 case 'part-open':return !!document.querySelector('#dialog-root .win-dialog')&&!!document.querySelector('#dialog-root input');
 case 'reference-loaded':return S.partCount>=5 && S.wireCount>=4;
 case 'wire-mode':return S.mode==='wire';
 case 'attributes-open':return !!document.querySelector('#dialog-root .win-dialog');
 case 'profile-window':return !!document.querySelector('#p6-modal')||!!profile;
 case 'profile-created':return !!profile;
 case 'result-created':return !!result;
 case 'probe-open':return !!result&&!document.querySelector('#p6-probe')?.classList.contains('hidden');
 case 'dc-result':return result?.meta?.kind==='dc';
 case 'ac-result':return result?.meta?.kind==='ac';
 case 'bias-result':return result?.meta?.kind==='bias';
 case 'transient-result':return result?.meta?.kind==='transient';
 default:return true;
}}
const planFor=(id,index)=>RULES[id]?.[index]||null;
const actionFor=(stepData,rule)=>rule?commands[rule]:stepData.demo?{
 'switch-capture':{name:'ورود به Capture',run:()=>C.switchWorkspace('capture')},
 'load-demo':commands['reference-loaded'],
 'new-project':commands['new-project-open'],
 'part':commands['part-open']
}[stepData.demo]:null;
let store={completed:[],last:null,collapsed:false,location:null};
try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');if(saved&&typeof saved==='object'){
 store.completed=Array.isArray(saved.completed)?saved.completed.filter(x=>catalog.some(t=>t.id===x)):[];
 store.last=saved.last&&catalog.some(t=>t.id===saved.last.topic)?saved.last:null;store.collapsed=!!saved.collapsed;
 const loc=saved.location;if(loc&&Number.isFinite(loc.x)&&Number.isFinite(loc.y))store.location={x:loc.x,y:loc.y};
}}catch(_){/* file:// may prevent storage on some browsers */}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch(_){}}
let active=null,summaryOpen=false,dragging=null,nativeDriver=null,usingDriver=false,silentDestroy=false,problem='';
const driverFactory=()=>window.driver?.js?.driver || null;
function progress(){const count=store.completed.length;$('#edu-progress-label').textContent=`${count} از ${catalog.length} مبحث`;$('#edu-progress-fill').style.width=(100*count/catalog.length)+'%';$('#edu-resume').disabled=!store.last;}
function buildList(){const query=$('#edu-search').value.trim().toLocaleLowerCase('fa');$('#edu-topic-list').innerHTML=categories.map(category=>{const topics=catalog.filter(t=>t.category===category&&(t.title+' '+t.lead).toLocaleLowerCase('fa').includes(query));if(!topics.length)return '';return `<section class="edu-category"><h3>${esc(category)} <small>${topics.filter(t=>store.completed.includes(t.id)).length}/${topics.length}</small></h3>${topics.map(t=>`<button type="button" class="edu-topic ${store.completed.includes(t.id)?'is-complete':''}" data-topic="${t.id}"><span class="edu-topic-mark">${store.completed.includes(t.id)?'✓':'○'}</span><span class="edu-topic-label">${esc(t.title)}<small>${store.completed.includes(t.id)?'تکمیل‌شده · اجرای مجدد':t.status==='intro'?'مقدماتی':'آموزش مرحله‌ای و تعاملی'}</small></span><span class="edu-topic-arrow">‹</span></button>`).join('')}</section>`}).join('')||'<p class="edu-no-results">مبحثی پیدا نشد.</p>';progress();}
function setCollapsed(collapsed){const shell=$('#edu-shell');shell.classList.toggle('minimized',collapsed);$('#edu-collapse').textContent=collapsed?'▣':'−';$('#edu-collapse').setAttribute('aria-label',collapsed?'باز کردن مرکز آموزش':'کوچک کردن مرکز آموزش');store.collapsed=collapsed;persist();}
function setPosition(x,y){const shell=$('#edu-shell'),r=shell.getBoundingClientRect();const nx=Math.max(8,Math.min(innerWidth-r.width-8,x)),ny=Math.max(28,Math.min(innerHeight-r.height-22,y));shell.style.left=nx+'px';shell.style.top=ny+'px';shell.style.right='auto';shell.style.bottom='auto';store.location={x:nx,y:ny};persist();}
function currentLesson(){return catalog.find(t=>t.id===active?.topic)||null;}
function pickTarget(s){const choices=Array.isArray(s.target)?s.target:[s.target];for(const sel of choices){try{const target=document.querySelector(sel);if(target&&target.getClientRects().length){const b=target.getBoundingClientRect();if(b.width>2&&b.height>2)return target;}}catch(_){}}return document.querySelector('.windows-title');}
function ensureWorkspace(topic,stepData){if(window.PSpiceWelcome?.isOpen?.())window.PSpiceWelcome.close();const snap=C.getSnapshot();if(stepData.workspace&&snap.workspace!==stepData.workspace)C.switchWorkspace(stepData.workspace);
 const exampleIds=['place-wire','attributes','bias-labels','probe','transient','dc-sweep','ac-sweep','bias-point'];if(exampleIds.includes(topic.id)&&!C.getSnapshot().project)C.loadSample();
 if(topic.id==='sim-profile'&&!C.getSnapshot().project)C.loadSample();}
function driverDispose(){if(!nativeDriver)return;silentDestroy=true;try{nativeDriver.destroy()}catch(e){console.warn('Driver.js cleanup:',e);}finally{nativeDriver=null;silentDestroy=false;}}
function endPrevious(){driverDispose();$('#edu-guide-layer').classList.add('hidden');}
function closeTransientDialogs(){C?.closeSoftwareDialog?.();document.querySelector('#p6-modal #p6-dialog-x')?.click();document.querySelector('#p6-probe')?.classList.add('hidden');}
function startTopic(id,index=0){if(id==='install'&&window.PSpiceWelcome){cancelTour(false);setCollapsed(true);window.PSpiceWelcome.open('install');return;}const topic=catalog.find(t=>t.id===id);if(!topic)return;endPrevious();closeTransientDialogs();$('#edu-summary-backdrop').classList.add('hidden');summaryOpen=false;active={topic:id,index:Math.max(0,Math.min(topic.steps.length-1,Number(index)||0))};problem='';setCollapsed(true);ensureWorkspace(topic,topic.steps[active.index]);prepareDriver(topic);renderStep();}
function warningText(rule){const descriptions={
 'new-project-open':'ابتدا پنجره New Project را باز کن.','new-project-form':'ابتدا نام پروژه و نوع Analog or Mixed A/D را انتخاب کن.','project-created':'برای ادامه، ساخت پروژه خالی را با OK تکمیل کن.','part-open':'پنجره Place Part را باز کن.','reference-loaded':'مدار نمونه باید بارگذاری شده و قطعات آن موجود باشند.','wire-mode':'ابتدا ابزار Wire را فعال کن.','attributes-open':'پنجره Display Properties را با دوبارکلیک روی مقاومت باز کن.','profile-window':'پنجره New Simulation را باز کن.','profile-created':'ابتدا پروفایل شبیه‌سازی را ایجاد و ذخیره کن.','result-created':'برای ادامه، تحلیل را اجرا کن.','probe-open':'پنجره Probe و نتیجه شبیه‌سازی باید باز باشند.', 'dc-result':'ابتدا تحلیل DC Sweep را اجرا کن.', 'ac-result':'ابتدا تحلیل AC Sweep مثال RC را اجرا کن.', 'bias-result':'ابتدا Bias Point را اجرا کن.', 'transient-result':'ابتدا Transient را اجرا کن.'};return descriptions[rule]||'عمل این مرحله هنوز انجام نشده است.';}
function markupStep(t,s,rule){let source='مبنای آموزش: سند ارسالی، صفحه '+t.pages;let action=rule?'برای ادامه، عملکرد این مرحله باید در نرم‌افزار انجام شود.':'برای ادامه، روی «بعدی» کلیک کن.';
 return `<div class="edu-driver-content" dir="rtl"><p>${esc(s.text)}</p><div class="edu-driver-tip ${rule?'edu-interactive':''}" data-phase7-feedback>${esc(problem||(rule?`${action} ${warningText(rule)}`:'مرحله توضیحی'))}</div><small>${esc(source)}</small><div class="edu-driver-action" data-phase7-action-root></div></div>`;}
function addDriverAction(){const s=currentLesson()?.steps[active.index];if(!s)return;const rule=planFor(active.topic,active.index),cmd=actionFor(s,rule);const root=document.querySelector('.driver-popover [data-phase7-action-root]');if(!root)return;root.replaceChildren();if(cmd){const btn=document.createElement('button');btn.type='button';btn.className='edu-driver-demo';btn.textContent=cmd.name;btn.addEventListener('click',()=>executeAction(cmd));root.append(btn);}if(rule){const verify=document.createElement('button');verify.type='button';verify.className='edu-driver-verify';verify.textContent='بررسی انجام مرحله';verify.addEventListener('click',()=>{problem=check(rule)?'✓ مرحله انجام شده است.':'⚠ '+warningText(rule);updateFeedback()});root.append(verify);}}
function updateFeedback(){const node=usingDriver?document.querySelector('.driver-popover [data-phase7-feedback]'):$('#edu-step-status');if(node&&active){const rule=planFor(active.topic,active.index);node.textContent=problem||(rule?'برای ادامه، عمل لازم را انجام بده یا از دکمه نمایش نمونه استفاده کن.':'مرحله توضیحی');node.classList.toggle('edu-is-warning',problem.startsWith('⚠'));}}
function renderStep(){const topic=currentLesson();if(!topic)return;const s=topic.steps[active.index];ensureWorkspace(topic,s);const rule=planFor(topic.id,active.index),cmd=actionFor(s,rule);
 store.last={topic:topic.id,index:active.index};persist();
 if(usingDriver&&nativeDriver){
  if(nativeDriver.isActive?.())nativeDriver.moveTo(active.index);else nativeDriver.drive(active.index);requestAnimationFrame(addDriverAction);
  return;
 }
 $('#edu-guide-layer').classList.remove('hidden');$('#edu-step-progress').textContent=`${topic.title} · مرحله ${active.index+1} از ${topic.steps.length}`;
 $('#edu-step-title').textContent=s.title;$('#edu-step-text').textContent=s.text;
 $('#edu-prev').disabled=active.index===0;$('#edu-demo').classList.toggle('hidden',!cmd);$('#edu-demo').textContent=cmd?.name||'نمایش نمونه';
 $('#edu-next').textContent=active.index===topic.steps.length-1?'پایان و جمع‌بندی':'بعدی';updateFeedback();requestAnimationFrame(positionGuide);
}
function positionGuide(){if(!active||usingDriver)return;const s=currentLesson().steps[active.index],target=pickTarget(s);if(!target)return;const r=target.getBoundingClientRect(),focus=$('#edu-focus');
 const x=Math.max(5,r.left-5),y=Math.max(29,r.top-5),w=Math.max(35,Math.min(innerWidth-x-7,r.width+10)),h=Math.max(26,Math.min(innerHeight-y-6,r.height+10));Object.assign(focus.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});
 const p=$('#edu-popover'),pw=p.offsetWidth||350,ph=p.offsetHeight||260,leftRoom=r.left,rightRoom=innerWidth-r.right;
 let px,py;if(rightRoom>=pw+25){px=r.right+14;py=r.top;}else if(leftRoom>=pw+25){px=r.left-pw-14;py=r.top;}else if(innerHeight-r.bottom>=ph+20){px=r.left;py=r.bottom+15;}else{px=r.left;py=r.top-ph-15;}
 Object.assign(p.style,{left:Math.max(10,Math.min(innerWidth-pw-10,px))+'px',top:Math.max(30,Math.min(innerHeight-ph-12,py))+'px'});
}
function cancelTour(openMenu=true){active=null;endPrevious();closeTransientDialogs();problem='';if(openMenu){setCollapsed(false);buildList();}}
function move(delta){const topic=currentLesson();if(!topic)return;const rule=planFor(topic.id,active.index);if(delta>0&&rule&&!check(rule)){problem='⚠ '+warningText(rule);updateFeedback();return;}
 const next=active.index+delta;if(next<0)return;if(next>=topic.steps.length){finishTopic();return;}
 // Keep software state intact on Previous; no fabricated clicks are performed.
 active.index=next;problem='';renderStep();}
function finishTopic(){const topic=currentLesson();if(!topic)return;if(!store.completed.includes(topic.id))store.completed.push(topic.id);store.last=null;persist();active=null;endPrevious();closeTransientDialogs();problem='';renderSummary(topic);buildList();}
function getSummaryFormulas(topic){const forms=[...(topic.formulas||[])];const result=window.PSpicePhase6?.getResult?.();
 if(['bias-labels','bias-point','dc-sweep','probe'].includes(topic.id)){
   try{const d=C.getCircuitData(),v=d.parts.find(x=>x.id==='V1')?.value||'200',r1=d.parts.find(x=>x.id==='R1')?.value||'2k',r2=d.parts.find(x=>x.id==='R2')?.value||'4k',r3=d.parts.find(x=>x.id==='R3')?.value||'3k';const E=window.PSpicePhase6.parseEngineering;
      const V=E(v),a=E(r1),b=E(r2),c=E(r3);if([V,a,b,c].every(Number.isFinite)&&a>0&&b>0&&c>0){
       forms.push(`Vout = V1 × R2/(R2+R3) = ${(V*b/(b+c)).toFixed(3)} V`);
       forms.push(`I(R1) = V1/R1 = ${(V/a*1000).toFixed(3)} mA`);
       forms.push(`I(R2) = I(R3) = ${(V/(b+c)*1000).toFixed(3)} mA`);
       forms.push(`P(R1) = V1²/R1 = ${(V*V/a).toFixed(3)} W`);
       }
     }catch(_){}
 }
 if(topic.id==='dc-sweep')forms.push('Vout(V1) = V1 × R2 / (R2 + R3)');
 if(topic.id==='transient')forms.push('Vout(t) = Constant (DC resistor-only circuit)','RC example: VC(t) = Vin × [1 − exp(−t/RC)]');
 if(topic.id==='ac-sweep')forms.push('fc = 1/(2πRC)  (independent RC example)');
 if(result&&['bias-point','bias-labels'].includes(topic.id)&&result.bias)forms.push(`V(R2 top) = ${result.bias.out.toFixed(3)} V (current simulation)`);
 return [...new Set(forms)];}
function renderSummary(topic){summaryOpen=true;$('#edu-summary-title').textContent=topic.title;$('#edu-summary-lead').textContent=topic.lead;
 $('#edu-summary-points').innerHTML=topic.summary.map(x=>`<li>${esc(x)}</li>`).join('');const forms=getSummaryFormulas(topic),f=$('#edu-summary-formulas');f.classList.toggle('hidden',!forms.length);
 f.innerHTML=forms.length?`<h3>فرمول‌ها و محاسبات مرتبط</h3>${forms.map(x=>`<div class="edu-equation" dir="ltr">${esc(x)}</div>`).join('')}`:'';
 $('#edu-summary-source').textContent='مبنای آموزشی: pspice.docx، صفحه '+topic.pages+(topic.id==='ac-sweep'?' · مثال RC از توسعه آموزشی است.':'');
 const idx=catalog.indexOf(topic);$('#edu-summary-next').disabled=idx===catalog.length-1;$('#edu-summary-next').textContent=idx===catalog.length-1?'تمام مباحث':'مبحث بعدی: '+catalog[idx+1].title;$('#edu-summary-backdrop').classList.remove('hidden');}
function closeSummary(){summaryOpen=false;$('#edu-summary-backdrop').classList.add('hidden');setCollapsed(false);buildList();}
function completeExternal(id){const topic=catalog.find(t=>t.id===id);if(!topic)return;active=null;endPrevious();if(!store.completed.includes(id))store.completed.push(id);store.last=null;persist();renderSummary(topic);buildList();}
function executeAction(cmd){if(!active||!cmd)return;try{cmd.run();problem='';if(usingDriver){setTimeout(()=>{if(active){updateFeedback();addDriverAction();}},60)}else requestAnimationFrame(positionGuide);}catch(e){problem='⚠ '+e.message;updateFeedback();}}
function doDemo(){const topic=currentLesson();if(!topic)return;executeAction(actionFor(topic.steps[active.index],planFor(topic.id,active.index)));}
// Create an independent Driver.js instance for each lesson. The previous implementation
// destroyed the only instance on every start, silently reverting to the internal guide.
// This lifecycle is safe with the real UMD/IIFE distribution and keeps fallback offline.
function driverOptions(){return {
 showProgress:true,progressText:'{{current}} از {{total}}',nextBtnText:'بعدی',prevBtnText:'قبلی',doneBtnText:'پایان و جمع‌بندی',
 showButtons:['previous','next','close'],allowClose:false,overlayClickBehavior:'none',stagePadding:7,stageRadius:5,
 popoverClass:'pspice-driver-popover',closeBtnText:'بستن راهنما',closeBtnLabel:'بستن راهنما',
 onNextClick:()=>move(1),onPrevClick:()=>move(-1),onDoneClick:()=>move(1),onCloseClick:()=>cancelTour(),
 onPopoverRender:()=>requestAnimationFrame(addDriverAction),
 onDestroyed:()=>{if(!silentDestroy&&active)cancelTour();}
};}
function updateGuideEngine(){const label=$('#edu-engine-label');if(label)label.textContent=usingDriver?'موتور فعال: Driver.js (نسخه محلی)':'موتور فعال: راهنمای داخلی آفلاین';}
function prepareDriver(topic){
 const factory=driverFactory();usingDriver=typeof factory==='function';
 if(usingDriver){try{
  nativeDriver=factory(driverOptions());
  nativeDriver.setSteps(topic.steps.map((entry,i)=>({
   element:()=>pickTarget(entry),
   popover:{title:entry.title,description:markupStep(topic,entry,planFor(topic.id,i)),side:'auto',align:'start'}
  })));
 }catch(e){console.warn('Driver.js unavailable, using offline guide:',e);driverDispose();usingDriver=false;}}
 updateGuideEngine();
}
function initDriver(){usingDriver=typeof driverFactory()==='function';updateGuideEngine();}
function bind(){const shell=$('#edu-shell');$('#edu-collapse').addEventListener('click',()=>setCollapsed(!shell.classList.contains('minimized')));
 $('#edu-topic-list').addEventListener('click',e=>{const b=e.target.closest('[data-topic]');if(b)startTopic(b.dataset.topic)});$('#edu-search').addEventListener('input',buildList);
 $('#edu-reset').addEventListener('click',()=>{if(confirm('پیشرفت آموزشی همه مباحث پاک شود؟')){store.completed=[];store.last=null;persist();buildList()}});
 $('#edu-resume').addEventListener('click',()=>{if(store.last)startTopic(store.last.topic,store.last.index)});
 $('#edu-prev').addEventListener('click',()=>move(-1));$('#edu-next').addEventListener('click',()=>move(1));$('#edu-demo').addEventListener('click',doDemo);$('#edu-tour-close').addEventListener('click',()=>cancelTour());
 $('#edu-summary-close').addEventListener('click',closeSummary);$('#edu-summary-next').addEventListener('click',()=>{const idx=catalog.findIndex(t=>t.title===$('#edu-summary-title').textContent);if(idx>=0&&idx+1<catalog.length)startTopic(catalog[idx+1].id);else closeSummary()});
 const h=$('#edu-drag-handle');h.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;const r=shell.getBoundingClientRect();dragging={dx:e.clientX-r.left,dy:e.clientY-r.top};h.setPointerCapture(e.pointerId);shell.classList.add('dragging')});h.addEventListener('pointermove',e=>{if(dragging)setPosition(e.clientX-dragging.dx,e.clientY-dragging.dy)});
 const end=()=>{dragging=null;shell.classList.remove('dragging')};h.addEventListener('pointerup',end);h.addEventListener('pointercancel',end);
 document.addEventListener('keydown',e=>{if(!active&&!summaryOpen)return;if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();if(active)cancelTour();else closeSummary();}},true);
 window.addEventListener('resize',()=>{if(active)positionGuide();if(store.location)setPosition(store.location.x,store.location.y)});
}
initDriver();if(store.location)requestAnimationFrame(()=>setPosition(store.location.x,store.location.y));setCollapsed(store.collapsed);bind();buildList();
window.PSpiceTutorial=Object.freeze({getCatalog:()=>catalog.map(t=>({id:t.id,category:t.category,title:t.title,pages:t.pages,status:t.status,steps:t.steps.length})),start:startTopic,close:cancelTour,completeExternal,getProgress:()=>({completed:[...store.completed],last:store.last}),getActive:()=>active?{...active}:null,getGuideEngine:()=>usingDriver?'Official Driver.js':'Offline integrated guide',verifyStep:()=>active?check(planFor(active.topic,active.index)):false});
})();
