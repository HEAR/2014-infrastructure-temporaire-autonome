#infrastructure temporaire autonome - code#


###ITAirc###
Serveur des bornes d'accueil avec :

- index.html
- système de chat irc en nodeJS

Envisagé un moment KiwiIRC (https://kiwiirc.com) mais trop lourd à modifier.

Le serveur node utilise les outils suivants :

- express
- node-irc (https://github.com/martynsmith/node-irc/tree/0.3.x)
- express.io : express + socket.io (http://express-io.org / https://github.com/techpines/express.io) qui permet de créer un socket en nodeJS

La logique est la suivante :

serveur IRC <-irc-> serveur nodeJS <-socket-> page client html + JS

### www ###

Code de la page d'accueil publique du projet