#spore.py
import json
import urllib.request

spore = {}
spore['json'] = 'https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/python/spore.json'

files_root = spore['json'].split("spore.json")[0]

with urllib.request.urlopen(spore['json']) as response:
    spore = json.loads(response.read().decode())

for file in spore['files']:
    print(files_root + file)
    urllib.request.urlretrieve(files_root + file, file)