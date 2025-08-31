# Sessions-Web

Application web Angular 19 front-end de l'application **Sessions**.  
→ API .NET back-end de l'application **Sessions** : [SurfSessions-API](https://github.com/gdelaunay/SurfSessions-API)  
<br>
En standalone / mode invité, elle permet de visualiser les prévisions de météo marine (houle, vent...) à une position donnée (lat/long).  
<br>
Couplée avec l'API, elle permet aux utilisateurs de paramétrer leurs spots, leurs conditions idéales, et des notifications par mail basées sur les prévisions, ainsi que d'enregistrer leurs sessions.  
<br>

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Développement](#développement)
- [Déploiement manuel](#déploiement-manuel)
- [Déploiement avec Docker](#déploiement-avec-docker)
- [Développement ou déploiement avec l'API back-end](#développement-ou-déploiement-avec-lapi-back-end)
- [Ressources additionnelles](#ressources-additionnelles)
- [License](#license)  
<br>


## Prérequis

S'assurer d'avoir **Node.js**, **npm**, et **Angular CLI** d'installés.

1. Vérifier que **Node.js** et **npm** sont installés :
```bash
node -v
npm -v
```
Si les commandes ne sont pas trouvées, installer [Node.js](https://nodejs.org) (npm est inclus).

2. Vérifier qu'**Angular CLI** est installé :
```bash
ng version
```
Si la commande n’est pas trouvée, installer Angular CLI globalement :
```bash
npm install -g @angular/cli
```  
<br>

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/gdelaunay/SurfSessions-Web.git
cd SurfSessions-Web
```
2. Installer les dépendances du projet :
```bash
npm install
```  
<br>

## Développement

Pour lancer un serveur local de développement :
```bash
ng serve
```
Une fois que le serveur tourne, ouvrir son navigateur et aller à l'adresse [`http://localhost:4200/`](http://localhost:4200/).
L'application rechargera automatiquement quand les fichiers sources seront modifiés.  
<br>


## Déploiement manuel

Pour générer un build de production :
```bash
ng build -c production
```
Les fichiers générés seront dans le dossier `dist/`.  
<br>


## Déploiement avec Docker

1. Vérifier que **Docker** et **docker compose** sont installés :
```bash
docker --version
docker compose version
```
Si les commandes ne sont pas trouvées, installer [Docker](https://docs.docker.com/get-docker/).  
<br>

2. Run avec docker compose :
```bash
docker compose up --build
```
Configuration dans ``compose.yaml``, ``Dockerfile``, et ``nginx.conf``  
<br>


## Développement ou déploiement avec l'API back-end

1. Fournir dans le fichier ``src/app/app.ts - ligne:7`` la valeur de ``sessionsApiUrl`` correspondante au mode de déploiement (``DEV``, ``HTTP`` ou ``HTTPS``):
```typescript
const sessionsApiUrl_DEV = 'http://localhost:5050/api';
const sessionsApiUrl_HTTP = 'http://localhost/api';
const sessionsApiUrl_HTTPS = 'https://mydomain.com/api';

export const sessionsApiUrl: string = sessionsApiUrl_HTTP;
```
2. Suivre les instruction d'installation et de déploiement (``Développement``/``Développement du front-end``/``Déploiement`` ou ``Déploiement HTTPS``) de [SurfSessions-API](https://github.com/gdelaunay/SurfSessions-API).  
   <br>


## Ressources additionnelles

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:
```bash
ng generate component component-name
```
For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:
```bash
ng generate --help
```
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.  
<br>


## License

[MIT](https://choosealicense.com/licenses/mit/)
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.  

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:
```bash
ng generate component component-name
```
For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:
```bash
ng generate --help
```
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## License

[MIT](https://choosealicense.com/licenses/mit/)
