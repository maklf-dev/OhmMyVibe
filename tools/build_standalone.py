#!/usr/bin/env python3
"""Offline HTML packer; used by maintainers, NOT needed to run the app.
   Optional official Driver.js files are bundled only if present and non-placeholder.
"""
from pathlib import Path
import re

root=Path(__file__).resolve().parent.parent
s=(root/'index.html').read_text('utf-8')

def is_real_vendor(name,body):
    return not (name.startswith('vendor/') and (len(body)<1024 or 'placeholder' in body[:500].lower()))

def replace_css(match):
    name=match.group(1).removeprefix('./')
    content=(root/name).read_text('utf-8')
    if not is_real_vendor(name, content): return ''
    # CSS local assets are inlined, external URLs are deliberately not supported.
    return '\n<style>\n/* Bundled: '+name+' */\n'+content+'\n</style>\n'

def replace_js(match):
    name=match.group(1).removeprefix('./')
    content=(root/name).read_text('utf-8')
    if not is_real_vendor(name, content): return ''
    if '</script' in content.lower():
        raise RuntimeError('Cannot safely inline script: '+name)
    return '\n<script>\n/* Bundled: '+name+' */\n'+content+'\n</script>\n'

s=re.sub(r'<link\s+rel="stylesheet"\s+href="([^\"]+)"\s*/?>', replace_css, s)
s=re.sub(r'<script\s+src="([^\"]+)"></script>', replace_js, s)
if 'src="./' in s and '<script src="./' in s:
    raise RuntimeError('External module script remains')
if re.search(r'<(link|script)[^>]+(https?:)?//',s):
    raise RuntimeError('Unexpected network dependency')
(root/'index-standalone.html').write_text(s,'utf-8')
print('Wrote index-standalone.html:',len(s),'bytes', 'official Driver.js included' if 'Bundled: vendor/driver.js.iife.min.js' in s else 'internal guide only')
