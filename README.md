# SurfSessions-Web

Application web Angular front-end de l'application Sessions. En standalone/mode invité, elle permet de visualiser les prévisions de météo marine (houle, vent...) à une position donnée (lat/long).  
Couplée avec l'API [SurfSessions-API](https://github.com/gdelaunay/SurfSessions-API), elle permet aux utilisateurs de paramétrer leurs spots, leurs conditions idéales, et des notifications basées sur les prévisions, ainsi que d'enregistrer leurs sessions.


## Prérequis

Assurez-vous d'avoir **Node.js**, **npm**, et **Angular CLI** installés.

1. Vérifier la version de Node.js et npm :
```bash
  node -v
  npm -v
```
Sinon, installer [Node.js](https://nodejs.org) (npm est inclus).

2. Vérifier la version d'Angular CLI :
```bash
  ng version
```
Si la commande ng n’est pas trouvée, installer Angular CLI globalement :
```bash
  npm install -g @angular/cli
```

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

## Serveur de développement

Pour lancer un serveur local de développement :

```bash
  ng serve
```

Une fois que le serveur tourne, ouvrir son navigateur et aller à l'adresse  [`http://localhost:4200/`](http://localhost:4200/).
L'application rechargera automatiquement quand les fichiers sources seront modifiés.


## Déploiement manuel

Pour générer un build de production : 
```bash
  ng build -c production
```
Les fichiers générés seront dans le dossier `dist/`.



## Déploiement avec Docker

```bash
  docker compose up --build
```


## Additional Resources

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
