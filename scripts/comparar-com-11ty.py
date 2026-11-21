# Compara o texto do <main> de cada página do site antigo (_site) com o do novo (dist).
import re,sys,glob,os,html,difflib
A='/mnt/windows/versionado/site/_site'; N='dist'
def texto(arq):
    t=open(arq,encoding='utf8').read()
    m=re.search(r'<main\b[^>]*>(.*)</main>',t,re.S).group(1)
    m=re.sub(r'<(script|style)\b.*?</\1>','',m,flags=re.S)
    m=re.sub(r'<[^>]+>',' ',m)
    return re.sub(r'\s+',' ',html.unescape(m)).strip()
def meta(arq):
    t=open(arq,encoding='utf8').read()
    return html.unescape(re.search(r'<title>(.*?)</title>',t,re.S).group(1)), html.unescape(re.search(r'<meta name="description" content="([^"]*)"',t).group(1))
dif=0; tot=0
for a in sorted(glob.glob(A+'/**/*.html',recursive=True)):
    rel=os.path.relpath(a,A); n=os.path.join(N,rel); tot+=1
    if not os.path.exists(n): print('FALTA',rel); dif+=1; continue
    ta,tn=texto(a),texto(n)
    if ta!=tn:
        dif+=1; print('DIFERE',rel)
        pa,pn=ta.split(' '),tn.split(' ')
        for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,pa,pn,autojunk=False).get_opcodes():
            if op!='equal': print('   -',' '.join(pa[i1:i2])[:200],'\n   +',' '.join(pn[j1:j2])[:200])
    if '-v' in sys.argv and meta(a)!=meta(n): print('META',rel,'\n   -',meta(a),'\n   +',meta(n))
print(tot,'páginas,',dif,'com diferença')
