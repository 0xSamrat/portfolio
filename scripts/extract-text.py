import re,sys,urllib.request
raw=urllib.request.urlopen(sys.argv[1]).read().decode('utf-8','replace')
s=re.sub(r'<script[\s\S]*?</script>','',raw)
s=re.sub(r'<style[\s\S]*?</style>','',s)
s=re.sub(r'<[^>]+>',' ',s)
print(len(re.sub(r'\s+',' ',s).strip()))
