/* Phase 4: zero-network, progressive Persian welcome and installation guide. */
(()=>{'use strict';
const $=selector=>document.querySelector(selector);
const root=$('#welcome-root');if(!root)return;
const stepDefinitions=[
 {title:'انتخاب نسخه متناسب با هدف',description:'برای آشنایی با ابزارهای فعلی، گزینه دانشگاهی Cadence یا نسخه رایگان PSpice for TI را انتخاب کن. این دو، همان نسخه تاریخی Capture Lite 17.2 نیستند.',note:'این کلون آموزشی، نصب نرم‌افزار اصلی را شبیه‌سازی نمی‌کند؛ مراحل نصب صرفاً راهنمای متنی‌اند.'},
 {title:'مراجعه به منبع رسمی',description:'روی «صفحه رسمی دریافت» در کارت بالا کلیک کن. در وب‌سایت Cadence بخش Academic را بررسی کن؛ در TI درخواست دسترسی به ابزار PSpice for TI را دنبال کن.',note:'این پیوند اینترنتی است. هیچ دانلود پنهانی یا اتصال خودکار هنگام اجرای کلون انجام نمی‌شود.'},
 {title:'ثبت‌نام و بررسی شرایط دسترسی',description:'برای مجوز دانشگاهی، شرایط دانشجویی و فرایند ثبت‌نام سایت Cadence را دنبال کن. برای TI، اگر سامانه درخواست دسترسی نمایش داد، درخواست را مطابق راهنمای همان صفحه ثبت کن.',note:'شرایط مجوز یا صفحه ثبت‌نام ممکن است تغییر کند. تنها نسخه منتشرشده در وب‌سایت رسمی معتبر است.'},
 {title:'دریافت نصب‌کننده',description:'پس از دریافت مجوز یا دسترسی، فایل نصب مناسب ویندوز و نسخه‌ای که انتخاب کرده‌ای را از همان منبع رسمی دانلود کن. پیش از اجرا، منبع فایل و نیازمندی‌های سیستم را بررسی کن.',note:'از نصب‌کننده‌های ناشناس یا نسخه‌های بازنشرشده بدون اعتبارسنجی استفاده نکن.'},
 {title:'نصب برنامه',description:'نصب‌کننده را اجرا کن، مسیر نصب و اجزای موردنیاز برای طراحی شماتیک و شبیه‌سازی را انتخاب کن و دستورالعمل‌های نسخه خودت را دنبال کن. نام دقیق گزینه‌ها بین نسخه‌ها فرق دارد.',note:'مراحل داخل Wizard نسخه واقعی ممکن است با تصاویر قدیمی سند دانشگاهی یکسان نباشند.'},
 {title:'اولین اجرا و ساخت پروژه',description:'پس از تکمیل نصب، محیط Capture را باز کن. با File > New > Project یک پروژه از نوع Analog or Mixed A/D بساز؛ در نسخه‌های جدید ممکن است نام برخی گزینه‌ها یا جای آن‌ها تغییر کرده باشد.',note:'در همین کلون آفلاین می‌توانی این جریان آموزشی را بدون نصب برنامه اصلی تمرین کنی.'}
];
const versionDetails={
 academic:{
  1:'روی «صفحه رسمی دریافت» در کارت OrCAD X Academic کلیک کن. صفحه مربوط به مجوز دانشگاهی Cadence را باز کن و روش شروع ثبت‌نام را دنبال کن.',
  2:'در وب‌سایت Cadence شرایط دریافت مجوز دانشگاهی را بررسی کن. فرایند ثبت‌نام ممکن است نیازمند ایمیل دانشگاهی یا بررسی وضعیت دانشجویی باشد.',
  4:'نصب‌کننده OrCAD X را اجرا کن و طبق راهنمای همان نسخه اجزای Capture و PSpice را نصب کن. جزئیات مسیر نصب و مجوز ممکن است با تصاویر OrCAD 17.2 فرق داشته باشند.',
  5:'پس از نصب و راه‌اندازی نسخه OrCAD X، ابزار شماتیک را باز کن و از بخش پروژه جدید، نوع مناسب برای تحلیل مدار را انتخاب کن. جای بعضی کنترل‌ها در این نسخه جدیدتر است.'
 },
 ti:{
  1:'روی «صفحه رسمی دریافت» در کارت PSpice for TI کلیک کن. در وب‌سایت Texas Instruments فرایند درخواست دسترسی به ابزار را آغاز کن.',
  2:'اگر TI درخواست حساب کاربری یا ثبت اطلاعات را نشان داد، طبق راهنمای همان سایت ادامه بده. بعد از دریافت دسترسی، فایل نصب را از بخش رسمی ابزار دریافت کن.',
  4:'فایل نصب PSpice for TI را اجرا کن و مراحل روی صفحه را دنبال کن. کتابخانه‌های TI همراه این محیط طراحی و شبیه‌سازی عرضه می‌شوند.',
  5:'پس از نصب، محیط PSpice for TI را باز کن و یک مدار نمونه یا پروژه جدید ایجاد کن. گزینه‌ها و قطعات ممکن است با مثال‌های آموزشی نسخه 17.2 یکسان نباشند.'
 }
};
let currentTab='overview',kind='academic',currentStep=0;
function show(tab){const available=['overview','install','resources'];if(!available.includes(tab))tab='overview';currentTab=tab;root.classList.remove('hidden');root.setAttribute('aria-hidden','false');document.querySelectorAll('.welcome-view').forEach(el=>el.classList.toggle('hidden',el.id!=='home-'+tab));document.querySelectorAll('.welcome-tabs [data-home-tab]').forEach(el=>{const selected=el.dataset.homeTab===tab;el.classList.toggle('is-active',selected);if(selected)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});$('#welcome-scroll').scrollTop=0;}
function close(){root.classList.add('hidden');root.setAttribute('aria-hidden','true');}
function startApp(){close();window.PSpiceCaptureBridge?.switchWorkspace?.('pspice');}
function finishInstall(){close();window.PSpiceTutorial?.completeExternal?.('install');}
function drawSteps(){const body=$('#welcome-install-steps');body.innerHTML=stepDefinitions.map((s,i)=>`<button type="button" data-install-step="${i}" class="${currentStep===i?'active':''}" aria-current="${currentStep===i?'step':'false'}"><b>${String(i+1).padStart(2,'0')}</b><span>${s.title}</span></button>`).join('');const s=stepDefinitions[currentStep];const detail=versionDetails[kind]?.[currentStep]||s.description;$('#welcome-install-detail').innerHTML=`<span class="w-step-counter">${kind==='academic'?'OrCAD X Academic':'PSpice for TI'} · مرحله ${currentStep+1} از ۶</span><h3>${s.title}</h3><p>${detail}</p><div class="w-step-caution">${s.note}</div><div class="w-step-actions"><button type="button" data-step-delta="-1" ${currentStep===0?'disabled':''}>مرحله قبل</button><button type="button" data-step-delta="1" ${currentStep===stepDefinitions.length-1?'disabled':''}>مرحله بعد</button></div>`;document.querySelectorAll('[data-install-kind]').forEach(el=>el.classList.toggle('is-selected',el.dataset.installKind===kind));}
root.addEventListener('click',event=>{const tab=event.target.closest('[data-home-tab]');if(tab){show(tab.dataset.homeTab);return;}const selectedKind=event.target.closest('[data-install-kind]');if(selectedKind){kind=selectedKind.dataset.installKind;currentStep=0;drawSteps();return;}const selectedStep=event.target.closest('[data-install-step]');if(selectedStep){currentStep=Number(selectedStep.dataset.installStep);drawSteps();return;}const delta=event.target.closest('[data-step-delta]');if(delta){currentStep=Math.max(0,Math.min(stepDefinitions.length-1,currentStep+Number(delta.dataset.stepDelta)));drawSteps();return;}});
['welcome-start-main','welcome-enter-top','welcome-enter-from-install'].forEach(id=>$('#'+id).addEventListener('click',startApp));$('#welcome-finish-install').addEventListener('click',finishInstall);
const home=$('#edu-home');if(home)home.addEventListener('click',()=>{window.PSpiceTutorial?.close?.();show('overview');});
drawSteps();show('overview');
window.PSpiceWelcome=Object.freeze({open:show,close,isOpen:()=>!root.classList.contains('hidden'),goToApp:startApp});
})();
