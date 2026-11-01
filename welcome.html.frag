<!-- Phase 4 offline educational welcome and installation guide. This overlay never loads remote resources. -->
<div id="welcome-root" class="welcome-root" dir="rtl" role="region" aria-label="صفحه آغازین و راهنمای نصب PSpice">
  <div class="welcome-scroll" id="welcome-scroll">
    <header class="welcome-nav">
      <div class="welcome-nav-inner">
        <div class="welcome-identity"><span class="welcome-logo" aria-hidden="true"><svg viewBox="0 0 40 40" width="29" height="29"><path d="M2 22h7l5-12 7 22 6-14 5 4h6" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><strong>PSpice <b>/</b> OrCAD</strong><small>آموزش تعاملی مدارهای الکتریکی</small></span></div>
        <nav class="welcome-tabs" aria-label="بخش‌های صفحه نخست">
          <button type="button" data-home-tab="overview" class="is-active" aria-current="page">معرفی نرم‌افزار</button>
          <button type="button" data-home-tab="install">دانلود و نصب</button>
          <button type="button" data-home-tab="resources">منابع و راهنما</button>
        </nav>
        <button class="welcome-enter welcome-nav-enter" type="button" id="welcome-enter-top">ورود به محیط شبیه‌ساز <span aria-hidden="true">←</span></button>
      </div>
    </header>
    <main class="welcome-main">
      <section id="home-overview" class="welcome-view" aria-labelledby="welcome-title">
        <div class="welcome-hero">
          <div class="welcome-hero-copy">
            <div class="welcome-eyebrow"><span class="welcome-dot"></span> راهنمای فارسی · بر اساس محتوای ارائه دانشگاهی</div>
            <h1 id="welcome-title">از شناخت مدار <span>تا شبیه‌سازی آن</span></h1>
            <p class="welcome-lead"><strong>PSpice</strong> برای تحلیل رفتار مدارها استفاده می‌شود و <strong>OrCAD Capture</strong> محیط ترسیم شماتیک را در اختیارمان می‌گذارد. این پروژه، بخش‌هایی از محیط کلاسیک نرم‌افزار را برای یادگیری گام‌به‌گام بازسازی می‌کند.</p>
            <div class="welcome-hero-actions"><button type="button" class="welcome-primary" id="welcome-start-main">ورود به نرم‌افزار و انتخاب مبحث <span aria-hidden="true">←</span></button><button type="button" class="welcome-secondary" data-home-tab="install">مشاهده راهنمای نصب</button></div>
            <div class="welcome-metrics"><span><b>۱۶</b> مبحث آموزشی</span><i></i><span><b>۲</b> محیط کلاسیک</span><i></i><span><b>آفلاین</b> بدون نیاز به اینترنت</span></div>
          </div>
          <div class="welcome-hero-art" aria-label="نمای مفهومی مدار الکتریکی و نتیجه شبیه‌سازی">
            <div class="welcome-art-top"><span class="welcome-window-leds"><i></i><i></i><i></i></span><span>SCHEMATIC1 · educational workspace</span><span class="welcome-art-status">● Simulation</span></div>
            <svg viewBox="0 0 570 340" role="img" aria-label="مدار شامل منبع ۲۰۰ ولت و سه مقاومت و نمودار پاسخ"><defs><pattern id="w-dotgrid" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1.1" cy="1.1" r=".8" fill="#cfd9ec"/></pattern><linearGradient id="w-shadow" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5f8ff"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>
              <rect x="0" y="0" width="570" height="340" rx="0" fill="url(#w-shadow)"/><rect x="0" y="0" width="570" height="340" fill="url(#w-dotgrid)"/>
              <g fill="none" stroke="#5374af" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M69 130V62H130M220 62H320V119M320 173V251H69V185"/><path d="M130 62l9-9 12 18 12-18 12 18 12-18 12 18 12-9H220"/><path d="M320 119l-9 9 18 12-18 12 9 21"/><path d="M204 62v63l-9 9 18 12-18 12 9 21v72"/><circle cx="69" cy="156" r="26" fill="#fff"/><path d="M69 143v14m-7-7h14m-6 18h7"/><path d="M204 251v13m-17 0h34m-28 6h22m-16 6h10"/></g>
              <g fill="#41599b" font-family="Arial,sans-serif" font-size="15" font-weight="600"><text x="150" y="42">R3  3kΩ</text><text x="225" y="142">R1</text><text x="225" y="163" font-size="13">2kΩ</text><text x="345" y="147">R2</text><text x="345" y="167" font-size="13">4kΩ</text><text x="24" y="127">V1</text><text x="17" y="201" font-size="13">200V</text></g><circle cx="204" cy="62" r="5" fill="#d74c9f"/><circle cx="204" cy="251" r="5" fill="#d74c9f"/>
              <g transform="translate(381 62)"><rect width="167" height="196" rx="10" fill="#142c49"/><g stroke="#436078" stroke-width=".65"><path d="M20 26V168m25-142V168m25-142V168m25-142V168m25-142V168m25-142V168M20 47h130M20 78h130M20 109h130M20 140h130M20 168h130"/></g><path d="M20 155L45 130 70 109 95 85 120 61 150 34" stroke="#79e3bd" stroke-width="2.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/><text x="17" y="17" fill="#c2d8eb" font-family="Arial" font-size="10">V(R2) · DC Sweep</text><circle cx="120" cy="61" r="4" fill="#79e3bd"/></g>
              <rect x="26" y="295" width="240" height="27" rx="8" fill="#ecf3ff"/><text x="146" y="313" font-family="Arial" font-size="12" text-anchor="middle" fill="#5775a8">OrCAD Capture  ·  PSpice A/D</text>
            </svg>
            <div class="welcome-art-bottom"><span><span class="welcome-green"></span> آماده برای تمرین</span><span>شماتیک + تحلیل</span></div>
          </div>
        </div>
        <div class="welcome-section-title"><span>۰۱ / آشنایی</span><h2>این دو ابزار چه کاری انجام می‌دهند؟</h2><p>مسیر یادگیری را از طراحی یک مدار تا بررسی نتیجه آن می‌بینیم.</p></div>
        <div class="welcome-three-cards">
          <article class="welcome-info-card"><span class="welcome-card-index">01</span><h3>طراحی شماتیک</h3><p>در Capture قطعاتی مثل مقاومت و منبع ولتاژ را انتخاب می‌کنیم، روی صفحه قرار می‌دهیم و سیم‌کشی را انجام می‌دهیم.</p><small>OrCAD Capture CIS</small></article>
          <article class="welcome-info-card"><span class="welcome-card-index">02</span><h3>تنظیم و اجرای تحلیل</h3><p>نوع تحلیل و پارامترهای آن را مشخص می‌کنیم؛ سپس PSpice رفتار الکتریکی مدار را محاسبه می‌کند.</p><small>PSpice Simulation</small></article>
          <article class="welcome-info-card"><span class="welcome-card-index">03</span><h3>خواندن نتایج</h3><p>ولتاژ گره‌ها، جریان شاخه‌ها، توان قطعات یا نمودار شکل موج را بررسی می‌کنیم و درباره مدار نتیجه می‌گیریم.</p><small>Probe &amp; Results</small></article>
        </div>
        <div class="welcome-history-grid">
          <div class="welcome-history-copy"><span class="welcome-section-kicker">۰۲ / تاریخچه کوتاه</span><h2>از SPICE تا PSpice</h2><p>ریشه SPICE به پروژه‌های دانشگاه برکلی در دهه ۱۹۷۰ برمی‌گردد. بعدها PSpice شبیه‌سازی مدار را برای رایانه‌های شخصی آسان‌تر کرد.</p><p>MicroSim در سال ۱۹۸۴ نسخه تجاری PSpice را ارائه کرد. OrCAD در ۱۹۹۸ شرکت MicroSim را خرید و Cadence در ۱۹۹۹ مالک OrCAD شد.</p><div class="welcome-notice"><strong>اصلاح آموزشی:</strong> در متن ورد، سال خرید MicroSim به‌اشتباه ۱۹۸۸ آمده است؛ تاریخ درست ۱۹۹۸ است.</div></div>
          <div class="welcome-timeline"><div><b>۱۹۷۰</b><span>توسعه SPICE در دانشگاه برکلی</span></div><div><b>۱۹۸۴</b><span>عرضه PSpice توسط MicroSim</span></div><div><b>۱۹۹۸</b><span>پیوستن MicroSim به OrCAD</span></div><div><b>۱۹۹۹</b><span>خرید OrCAD توسط Cadence</span></div></div>
        </div>
        <div class="welcome-source-caption">منبع محتوای مقدماتی: صفحات ۱ تا ۳ فایل ارسالی؛ تاریخ‌های مالکیت با منابع رسمی Cadence بررسی و اصلاح شده‌اند.</div>
      </section>
      <section id="home-install" class="welcome-view hidden" aria-label="راهنمای نصب و دانلود">
        <div class="welcome-page-heading"><span class="welcome-section-kicker">راهنمای نصب و راه‌اندازی</span><h1>نصب نرم‌افزار را از کجا شروع کنیم؟</h1><p>این راهنما بدون اینترنت خوانده می‌شود؛ فقط برای دریافت نصب‌کننده باید به وب‌سایت منبع وصل شوید. دانلود فایل‌های اصلی داخل این پروژه قرار ندارد.</p></div>
        <div class="welcome-install-alert"><span aria-hidden="true">!</span><p><strong>تفاوت نسخه‌ها:</strong> نسخه مرجع آموزش ما <span dir="ltr">OrCAD Capture CIS Lite 17.2</span> است. دو گزینه رسمی زیر نسخه‌های در دسترس برای یادگیری هستند و ظاهرشان ممکن است با تصاویر فایل دانشگاهی تفاوت داشته باشد. لینک رسمی و تأییدشده برای دریافت نسخه تاریخی 17.2 در این پروژه ارائه نمی‌کنیم.</p></div>
        <div class="welcome-download-grid">
          <article class="welcome-download-card is-featured" data-install-card="academic"><div class="welcome-download-meta"><span>Cadence · دانشجویی</span><span class="welcome-card-badge">دسترسی دانشگاهی</span></div><h2>OrCAD X Academic</h2><p>مجموعه طراحی شماتیک و شبیه‌سازی Cadence با مجوز دانشگاهی شش‌ماهه برای دانشجویان واجد شرایط.</p><a class="welcome-external-link" href="https://www.cadence.com/en_US/home/tools/pcb-design-and-analysis/orcad/academic.html" target="_blank" rel="noopener noreferrer">صفحه رسمی دریافت <span aria-hidden="true">↗</span></a><span class="welcome-internet-note">برای ثبت‌نام و دانلود، اتصال اینترنت لازم است.</span></article>
          <article class="welcome-download-card" data-install-card="ti"><div class="welcome-download-meta"><span>Texas Instruments · رایگان</span><span class="welcome-card-badge welcome-badge-free">بدون هزینه</span></div><h2>PSpice for TI</h2><p>ابزار رایگان شبیه‌سازی مبتنی بر فناوری PSpice و محیط Capture، با کتابخانه‌ای متمرکز بر قطعات TI.</p><a class="welcome-external-link" href="https://www.ti.com/tool/PSPICE-FOR-TI" target="_blank" rel="noopener noreferrer">صفحه رسمی دریافت <span aria-hidden="true">↗</span></a><span class="welcome-internet-note">دریافت آن ممکن است نیازمند درخواست دسترسی باشد.</span></article>
        </div>
        <section class="welcome-install-guide" aria-label="مراحل راه‌اندازی">
          <div class="welcome-guide-header"><div><span class="welcome-section-kicker">قدم به قدم</span><h2>مراحل عمومی نصب</h2><p>این مراحل آگاهانه عمومی نوشته شده‌اند، چون پنجره‌های نصب در نسخه‌های مختلف یکسان نیستند.</p></div><div class="welcome-install-choice" role="group" aria-label="انتخاب نسخه برای راهنما"><button type="button" data-install-kind="academic" class="is-selected">OrCAD X</button><button type="button" data-install-kind="ti">PSpice for TI</button></div></div>
          <div class="welcome-installer-grid"><div class="welcome-installer-list" id="welcome-install-steps"></div><div class="welcome-installer-detail" id="welcome-install-detail" aria-live="polite"></div></div>
        </section>
        <div class="welcome-guide-end"><div><h3>این آموزش را خواندی؟</h3><p>می‌توانی وارد شبیه‌ساز شوی یا پایان مبحث نصب را ثبت کنی تا خلاصه آن نمایش داده شود.</p></div><div><button type="button" id="welcome-finish-install" class="welcome-primary">پایان مبحث نصب و نمایش جمع‌بندی</button><button type="button" id="welcome-enter-from-install" class="welcome-secondary">ورود مستقیم به شبیه‌ساز</button></div></div>
      </section>
      <section id="home-resources" class="welcome-view hidden" aria-label="منابع و فایل‌های آموزش">
        <div class="welcome-page-heading"><span class="welcome-section-kicker">کتابخانه منابع</span><h1>مرجع‌ها و فایل‌های آموزشی</h1><p>توضیحات اصلی از سند فارسی ارسالی گرفته شده‌اند. برای اطمینان از صحت نسخه‌ها و لینک‌ها، منابع رسمی جداگانه مشخص شده‌اند.</p></div>
        <div class="welcome-resource-grid">
          <article class="welcome-resource-card"><img src="./reference/images/image03.png" alt="تصویر محیط PSpice در صفحه ۴ سند" loading="lazy"><div><b>محیط PSpice A/D</b><p>تصویر مرجع صفحه ۴ فایل دانشگاهی، برای چیدمان پنجره و نوار ابزار.</p><small>منبع محلی · آفلاین</small></div></article>
          <article class="welcome-resource-card"><img src="./reference/images/image07.png" alt="تصویر OrCAD Capture 17.2 در صفحه ۶ سند" loading="lazy"><div><b>محیط Capture 17.2</b><p>مرجع پنل پروژه، پالت و منوهای طراحی مدار در نسخه کلاسیک.</p><small>منبع محلی · آفلاین</small></div></article>
          <article class="welcome-resource-card"><img src="./reference/images/image11.jpeg" alt="پنجره New Project در صفحه ۱۰ سند" loading="lazy"><div><b>پنجره New Project</b><p>مرجع مراحل ایجاد یک پروژه جدید با نوع Analog or Mixed A/D.</p><small>منبع محلی · آفلاین</small></div></article>
        </div>
        <div class="welcome-reference-actions"><a href="./reference-atlas.html" target="_blank" rel="noopener">باز کردن اطلس ۲۹ تصویر مرجع <span aria-hidden="true">↗</span></a><a href="./legacy/index-standalone.html" target="_blank" rel="noopener">اجرای نمونه آموزشی RC قبلی <span aria-hidden="true">↗</span></a></div>
        <div class="welcome-verified-list"><h2>منابع تکمیلی خارجی</h2><p>برای مطالعه آنها به اینترنت نیاز است؛ محتوا و اجرای خود کلون هیچ وابستگی به این وب‌سایت‌ها ندارند.</p><a href="https://www.flowcad.de/AN/FlowCAD_AN_Quick_Start_PSpice_172_Lite.pdf" target="_blank" rel="noopener noreferrer"><span>راهنمای PSpice 17.2 Lite در FlowCAD</span><span>PDF ↗</span></a><a href="https://www.cadence.com/en_US/home/tools/pcb-design-and-analysis/orcad/academic.html" target="_blank" rel="noopener noreferrer"><span>برنامه دانشگاهی Cadence</span><span>وب‌سایت رسمی ↗</span></a><a href="https://www.ti.com/tool/PSPICE-FOR-TI" target="_blank" rel="noopener noreferrer"><span>ابزار PSpice for TI</span><span>وب‌سایت رسمی ↗</span></a></div>
      </section>
    </main>
    <footer class="welcome-footer"><span>بازسازی آموزشی غیررسمی · این سایت محصول Cadence نیست.</span><span>نسخه پروژه 0.5.0 · صفحه معرفی و نصب</span></footer>
  </div>
</div>
