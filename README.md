## Installation
1. ```npm install -g pnpm``` <br />
Tõmbab pnpm package, mida tuleb kasutada projekti package'ite installimiseks. <br /><br />

2. ```pnpm i``` <br />
Seda peab tegema, et saaks ilma liigsete failideta installida projekti package'id. <br /><br />

## Usage
1. ```pnpm expo start``` <br />
Alustab Expo Go, mille kaudu projekt töötab.

## Deployment
### Web - Kasutades GitHub Pages
1. Esiteks kontrolli üle ```package.json```, et muuta ```"homepage": "https://{Sinu GitHubi nimi}.github.io/hinnapox_app/"```<br /><br />

2. ```pnpm run deploy``` <br />
Oota kuni see runnib ära ja loob web-build kausta ning terminal lubab käsklusi uuesti kirjutada. <br /><br />

3. ```pnpx gh-pages -d web-build -m 'Deploying Expo Web build to GitHub Pages'``` <br />
See deployib GitHub Page'i.

### Android (Development) - Local (Windows)
1. ```pnpx expo prebuild``` <br />
Loob ```android/``` kausta, milles on buildimiseks valmis failid.<br /><br />

2. ```cd ./android``` <br />
<br />

3. ```./gradlew.bat assembleDebug``` <br />
Lokaalselt buildib development buildi. Vajab JAVA_HOME env path. <br /><br />

4. ```cd ./app/build/outputs/apk/debug``` <br />
apk asukoht. <br /><br />

## Contributing
- [@JarlBurget](https://github.com/JarlBurget) - Projektijuht
- [@Mart556](https://github.com/Mart556) - Arendusjuht
- [@robinristo78](https://github.com/robinristo78) - Personalijuht
- [@TaaviOrro](https://github.com/TaaviOrro/)
