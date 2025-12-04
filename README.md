## Installation
1. ```npm install -g pnpm``` <br />
Tõmbab pnpm package, mida tuleb kasutada projekti package'ite installimiseks.

2. ```pnpm i``` <br />
Seda peab tegema, et saaks ilma liigsete failideta installida projekti package'id.

## Usage
1. ```pnpm expo start``` <br />
Alustab Expo Go, mille kaudu projekt töötab.

## Deployment
### Web-platform - Kasutades GitHub Pages
1. Esiteks kontrolli üle package.json, et muuta "homepage": "https://{Sinu GitHubi nimi}.github.io/hinnapox_app/"
2. ```pnpm run deploy``` <br />
Oota kuni see runnib ära ja loob web-build kausta ning terminal lubab käsklusi uuesti kirjutada
3. ```pnpx gh-pages -d web-build -m 'Deploying Expo Web build to GitHub Pages'``` <br />
See deployib GitHub Page'i.

## Contributing
- [@JarlBurget](https://github.com/JarlBurget) - Projektijuht
- [@Mart556](https://github.com/Mart556) - Arendusjuht
- [@robinristo78](https://github.com/robinristo78) - Personalijuht
- [@TaaviOrro](https://github.com/TaaviOrro/)
