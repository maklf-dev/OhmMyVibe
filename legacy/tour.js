/* Persian guided tour for the RC demo. All tour content is here.
   Optional native Driver.js support: drop the official IIFE + CSS in vendor/ and
   add the two local references described in README. The built-in tour requires nothing. */
(()=>{'use strict';
const $=s=>document.querySelector(s);
const {App}=window;
const steps=[
 {title:'آشنایی با محیط PSpice',target:'#workstation',desc:'این محیط برای طراحی شماتیک مدارهای الکتریکی استفاده می‌شود. نوار منو در بالا، ابزارهای طراحی در سمت چپ و صفحه نقطه‌چین در مرکز قرار دارد. در این آموزش یک مدار RC می‌سازیم و پاسخ گذرای آن را بررسی می‌کنیم.',hint:'برای شروع روی «بعدی» کلیک کنید.',mode:'auto'},
 {title:'منوی Draw و انتخاب قطعات',target:'[data-menu-trigger="Draw"]',desc:'در محیط کلاسیک PSpice Schematics برای اضافه‌کردن قطعات از منوی Draw استفاده می‌کنیم. گزینه Get New Part پنجره جست‌وجوی قطعات را باز می‌کند.',hint:'می‌توانید روی Draw کلیک کنید. سپس به مرحله بعد بروید.',mode:'interactive'},
 {title:'آشنایی با Part Browser Basic',target:'.part-dialog',desc:'در قسمت Part Name نام قطعه را وارد می‌کنیم. برای منبع ولتاژ پالسی عبارت VPULSE را بنویسید و Place & Close را انتخاب کنید. در مرحله بعد محل قطعه را مشخص می‌کنیم.',hint:'پنجره انتخاب قطعه واقعی است و می‌توانید قطعات R، C، VPULSE و 0 را جست‌وجو کنید.',mode:'interactive'},
 {title:'قرار دادن منبع ولتاژ',target:'#schematic',desc:'پس از انتخاب VPULSE، قطعه همراه نشانگر جابه‌جا می‌شود. با کلیک در بخش چپ صفحه آن را قرار دهید. در نسخه کلاسیک، کلیک راست یا Esc ابزار فعال را متوقف می‌کند.',hint:'نمونه منبع V1 روی صفحه آماده است. در حالت آزاد می‌توانید قطعات را در محل دلخواه بگذارید.',mode:'interactive'},
 {title:'افزودن مقاومت R1',target:'#component-layer',desc:'از Draw > Get New Part، قطعه R را انتخاب و در مسیر بالای مدار قرار می‌دهیم. مقاومت جریان شارژ خازن را محدود می‌کند و همراه ظرفیت خازن، ثابت زمانی را مشخص می‌سازد.',hint:'از دکمه Part یا منوی Draw برای بازکردن فهرست قطعات استفاده کنید.',mode:'interactive'},
 {title:'افزودن خازن C1',target:'#component-layer',desc:'قطعه C را در سمت راست صفحه قرار می‌دهیم. ولتاژ دو سر خازن نمی‌تواند به‌صورت ناگهانی تغییر کند و به همین دلیل نمودار خروجی، رفتار نمایی دارد.',hint:'نام قطعه C1 و مقدار اولیه آن در کنار نماد شماتیک دیده می‌شود.',mode:'auto'},
 {title:'مرجع زمین مدار',target:'#component-layer',desc:'قطعه 0 نشانگر زمین آنالوگ یا گره مرجع مدار است. برای شبیه‌سازی معتبر، وجود گره 0 ضروری است. آن را زیر مدار قرار می‌دهیم.',hint:'در این نسخه فقط نماد گره 0 برای مدار RC پشتیبانی می‌شود.',mode:'auto'},
 {title:'ابزار سیم‌کشی Wire',target:'[data-action="wire"]',desc:'از Draw > Wire یا آیکن سیم‌کشی استفاده می‌کنیم. ابتدا ترمینال مبدأ و سپس ترمینال مقصد را انتخاب کنید. در حالت آزاد، سیم‌ها به شبکه متصل می‌شوند و با جابه‌جایی قطعات به‌روز می‌شوند.',hint:'حین سیم‌کشی روی دایره‌های کوچک انتهای پایه‌ها کلیک کنید. Esc برای خروج.',mode:'interactive'},
 {title:'ساخت اتصال‌های مدار',target:'#schematic',desc:'پایه مثبت V1 به یک سر مقاومت، سر دیگر مقاومت به خازن، و سمت پایین خازن به مسیر بازگشت منبع وصل می‌شود. زمین نیز باید به مسیر بازگشت متصل باشد. اکنون حلقه RC بسته است.',hint:'در حالت آزاد، حذف یک اتصال باعث خطای Electrical Rule Check می‌شود.',mode:'auto'},
 {title:'تغییر مقدار مقاومت',target:'#component-layer',desc:'با دوبار کلیک روی مقاومت یا انتخاب Edit > Attributes پنجره ویرایش ظاهر می‌شود. مقدار R1 را برابر 1k بگذارید که معادل ۱۰۰۰ اهم است.',hint:'پس از پایان آموزش این مقدار را به 2k تغییر دهید و تفاوت نمودار را ببینید.',mode:'interactive'},
 {title:'تغییر ظرفیت خازن',target:'#component-layer',desc:'مقدار C1 را روی 1u یا یک میکروفاراد قرار می‌دهیم. ثابت زمانی مدار برابر τ = R × C = 1ms خواهد بود.',hint:'مقادیر p، n، u، m و k برای قطعات پشتیبانی می‌شوند.',mode:'interactive'},
 {title:'تنظیم منبع پالسی VPULSE',target:'#component-layer',desc:'در پنجره Attributes منبع، V1=0V و V2=5V، زمان‌های TR و TF برابر 1us، عرض پالس PW برابر 5ms و دوره تناوب PER برابر 10ms تنظیم می‌شوند.',hint:'با دوبار کلیک روی V1 می‌توانید این پارامترها را بعداً تغییر دهید.',mode:'interactive'},
 {title:'قرار دادن Voltage Marker',target:'[data-action="marker"]',desc:'از منوی Markers گزینه Mark Voltage/Level را فعال می‌کنیم. دو نشانگر روی گره ورودی و گره خروجی خازن قرار می‌دهیم تا در پنجره Probe ولتاژهای VIN و VOUT دیده شوند.',hint:'نشانگرهای سبزرنگ بالای گره‌ها قرار گرفته‌اند.',mode:'interactive'},
 {title:'پنجره Analysis Setup',target:'.analysis-dialog',desc:'اکنون از Analysis > Setup وارد تنظیمات شبیه‌سازی می‌شویم. PSpice چند نوع تحلیل دارد، ولی در نمونه فعلی فقط Transient Analysis فعال است.',hint:'گزینه Transient را انتخاب کنید تا پنجره تنظیمات زمانی باز شود.',mode:'interactive'},
 {title:'انتخاب Transient Analysis',target:'.analysis-dialog',desc:'تحلیل گذرا تغییرات ولتاژ را برحسب زمان محاسبه می‌کند. این تحلیل برای مشاهده شارژ و دشارژ خازن مناسب است. پنجره Transient را باز کرده و زمان‌ها را تعیین کنید.',hint:'فقط تحلیل گذرا در این نسخه محاسبه می‌شود.',mode:'interactive'},
 {title:'تنظیم زمان شبیه‌سازی',target:'.analysis-dialog',desc:'Final Time را برابر 30ms، Print Step را 10us و Step Ceiling را 1us قرار می‌دهیم. No-Print Delay برابر صفر می‌ماند. این بازه سه دوره کامل منبع پالسی را پوشش می‌دهد.',hint:'در پنجره، مقادیر را می‌توانید بررسی و تغییر دهید؛ برای ادامه «بعدی» را بزنید.',mode:'interactive'},
 {title:'ذخیره شماتیک',target:'[data-action="save"]',desc:'با File > Save یا Ctrl+S پروژه را با نام RC_DEMO ذخیره می‌کنیم. در این کلون فایل JSON محلی ذخیره می‌شود؛ این فایل با فرمت بومی SCH نرم‌افزار PSpice یکی نیست.',hint:'در حالت آزاد، دکمه Save فایل واقعی را در رایانه دانلود می‌کند.',mode:'interactive'},
 {title:'اجرای شبیه‌سازی',target:'[data-action="simulate"]',desc:'از Analysis > Simulate یا دکمه سبز Run استفاده می‌کنیم. برنامه کامل بودن اتصالات، وجود زمین و مقادیر قطعات را بررسی و سپس ولتاژ خازن را محاسبه می‌کند.',hint:'اگر قطعه‌ای حذف شود یا سیمی قطع شود، شبیه‌سازی خطا می‌دهد.',mode:'interactive'},
 {title:'مشاهده نمودار Probe',target:'#probe-window',desc:'پنجره PSpice A/D Probe باز شده است. منحنی سبز، ولتاژ ورودی پالسی VIN و منحنی قرمز، پاسخ نمایی خازن VOUT را نشان می‌دهد. برای مشاهده مقدار ولتاژ در هر زمان، ماوس را روی نمودار حرکت دهید.',hint:'دکمه Cursor امکان نمایش خط نشانگر را فراهم می‌کند.',mode:'interactive'},
 {title:'پایان آموزش و آزمایش مستقل',target:'#probe-window',desc:'فرایند طراحی و تحلیل مدار RC پایان یافت. اکنون می‌توانید پنجره Probe را ببندید، مقدار مقاومت یا خازن را تغییر دهید، مدار را دوباره شبیه‌سازی کنید و خروجی جدید ببینید. تمامی ابزارهای آموزش‌داده‌شده مستقل از راهنما کار می‌کنند.',hint:'«پایان آموزش» راهنما را می‌بندد، ولی مدار و نمودار موجود باقی می‌مانند.',mode:'auto'},
];
let index=-1,active=false,nativeDriver=null,resizeTimer=0;
function hasNative(){return !!window.driver?.js?.driver}
function nativeStart(){try{
 const driver=window.driver.js.driver;
 const nativeSteps=steps.map((s,i)=>({
  element:s.target,
  waitForElement:400,
  popover:{
   title:s.title,
   description:`<div dir="rtl" style="font-family:Tahoma;line-height:1.9;text-align:right">${s.desc}<p style="font-size:11px;color:#31744c">${s.hint}</p></div>`
  },
  onNextClick:()=>{
   if(i===steps.length-1){stop();return}
   App.loadTourStage(i+1);
   nativeDriver.moveNext();
  },
  onPrevClick:()=>{
   if(i===0)return;
   App.loadTourStage(i-1);
   nativeDriver.movePrevious();
  }
 }));
 nativeDriver=driver({showProgress:true,allowClose:true,animate:false,overlayOpacity:0.35,
  disableActiveInteraction:false,overlayClickBehavior:'none',
  showButtons:['next','previous','close'],nextBtnText:'بعدی ←',prevBtnText:'قبلی',doneBtnText:'پایان آموزش',
  closeBtnLabel:'بستن آموزش',progressText:'{{current}} از {{total}}',steps:nativeSteps,
  onDoneClick:()=>stop(),
  onDestroyed:()=>{active=false;nativeDriver=null}
 });
 active=true;App.loadTourStage(0);nativeDriver.drive(0);return true;
 }catch(e){console.warn('Driver.js unavailable, using offline built-in tour',e);active=false;nativeDriver=null;return false}}

function targetFor(s){const n=$(s.target);return n?s.target:'#workstation'}
function start(){if(active)stop();$("#toast-root").innerHTML="";if(hasNative()&&nativeStart())return;active=true;index=0;render()}
function next(){if(!active)return;if(index>=steps.length-1){stop();return}index++;render()}
function prev(){if(index<=0)return;index--;render()}
function stop(){active=false;index=-1;$('#tour-overlay').classList.add('hidden');$('#tour-card').classList.add('hidden');if(nativeDriver){const d=nativeDriver;nativeDriver=null;d.destroy()}App.closeDialog();}
function render(){const s=steps[index];App.loadTourStage(index);$('#tour-title').textContent=s.title;$('#tour-desc').textContent=s.desc;$('#tour-hint').textContent=(s.mode==='interactive'?'● مرحله تعاملی: ':'● مرحله نمایشی: ')+s.hint;$('#tour-counter').textContent=`${index+1} / ${steps.length}`;$('#tour-progress-fill').style.width=((index+1)/steps.length*100)+'%';$('#tour-prev').disabled=index===0;$('#tour-next').textContent=index===steps.length-1?'پایان آموزش':'بعدی ←';$('#tour-card').classList.remove('hidden');$('#tour-overlay').classList.remove('hidden');requestAnimationFrame(position)}
function position(){if(!active||nativeDriver)return;const s=steps[index];let t=$(s.target);if(!t||t.classList.contains('hidden')||!t.getBoundingClientRect().width)t=$('#workstation');const r=t.getBoundingClientRect();const margin=6;const spot=$('#tour-spotlight');spot.style.left=Math.max(3,r.left-margin)+'px';spot.style.top=Math.max(3,r.top-margin)+'px';spot.style.width=Math.min(innerWidth-8,r.width+margin*2)+'px';spot.style.height=Math.min(innerHeight-10,r.height+margin*2)+'px';const card=$('#tour-card');const cw=card.offsetWidth||410,ch=card.offsetHeight||290;let left=innerWidth-cw-24,top=Math.max(14,Math.min(innerHeight-ch-20,r.top+8));if(s.target==='#workstation'||s.target==='#schematic'||s.target==='#probe-window'||s.target==='#component-layer'){left=innerWidth-cw-35;top=Math.min(innerHeight-ch-72,85)}else if(r.right>innerWidth-cw-55){left=Math.max(12,r.left-cw-20)}else left=Math.min(innerWidth-cw-12,r.right+18);if(r.top<145)top=Math.min(innerHeight-ch-16,Math.max(175,r.bottom+18));if(s.target==='.analysis-dialog'||s.target==='.part-dialog'){left=Math.max(15,r.left-cw-22);top=Math.max(60,Math.min(r.top,innerHeight-ch-60))}if(s.target==='#probe-window'){left=innerWidth-cw-40;top=85}card.style.left=left+'px';card.style.top=top+'px';}
$('#tour-next').onclick=next;$('#tour-prev').onclick=prev;$('#tour-close').onclick=stop;
addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(position,70)});
window.Tour={start,stop,next,prev,steps,get active(){return active}};
})();
