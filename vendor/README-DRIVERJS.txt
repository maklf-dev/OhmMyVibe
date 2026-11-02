وضعیت نسخه 0.9.1: فایل رسمی Driver.js هنوز در این بسته نیست.
موتور داخلی فارسی بدون اینترنت و بدون نصب هیچ وابستگی فعال است.

برای نصب اختیاری Driver.js رسمی روی رایانه متصل به اینترنت:
  1) در PowerShell از ریشه پروژه اجرا کنید:
     powershell -ExecutionPolicy Bypass -File .\tools\Install-DriverJs.ps1
  2) سه فایل driver.js.iife.min.js، driver.min.css و LICENSE.driver-js.txt
     در پوشه vendor ذخیره می‌شوند.
  3) فایل index.html را باز کنید. موتور رسمی Driver.js به صورت محلی و آفلاین اجرا می‌شود.

برای ساخت دوباره فایل تک‌فایلی (فقط برای آماده‌سازی انتشار):
  py .\tools\build_standalone.py
پس از این کار، اگر کتابخانه رسمی نصب شده باشد، داخل index-standalone.html هم درج می‌شود.
هرگز فایل‌های اصلی داخل vendor را با نسخه‌های جعلی یا اسکریپت CDN runtime جایگزین نکنید.

منابع رسمی:
  https://driverjs.com/docs/installation
  https://www.npmjs.com/package/driver.js
  https://cdn.jsdelivr.net/npm/driver.js@1.10.2/dist/driver.js.iife.min.js
  https://cdn.jsdelivr.net/npm/driver.js@1.10.2/dist/driver.min.css
  https://cdn.jsdelivr.net/npm/driver.js@1.10.2/license
مجوز رسمی Driver.js: MIT؛ حتماً فایل مجوز را همراه نسخه رسمی حفظ کنید.

محدودیت: به دلیل عدم امکان دریافت باینری رسمی در محیط ساخت،
این بسته فقط راهنمای داخلی آفلاین را آزمایش کرده است؛
آزمون اتصال به فایل اصلی Driver.js باید بعد از نصب انجام شود.
