import './styles/style.css'

import Phaser from 'phaser'
import GameScene from './js/GameScene.js'
import LoadingScene from './js/LoadingScene.js'
import GameOverScene from './js/GameOverScene'

import FirebasePlugin from 'phaser3-rex-plugins/plugins/firebase-plugin.js'
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js'
import LeaderBoardScene from './js/LeaderBoardScene'

const firebaseConfig = {
  apiKey: 'AIzaSyDkqmLI2JMxEzMQTRDhugw689WIjc1K_qk',
  authDomain: 'avoid-bullets.firebaseapp.com',
  projectId: 'avoid-bullets',
  storageBucket: 'avoid-bullets.appspot.com',
  messagingSenderId: '915500545244',
  appId: '1:915500545244:web:9f02b1d4e57896cbf8f019',
}

firebase.initializeApp(firebaseConfig)

const WIDTH = 900
const HEIGHT = 1200

const config = {
  parent: 'app',
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  pixelArt: true,
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    debug: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    global: [
      {
        key: 'rexFirebase',
        plugin: FirebasePlugin,
        start: true,
      },
      {
        key: 'rexInputTextPlugin',
        plugin: InputTextPlugin,
        start: true,
      },
    ],
  },

  scene: [LoadingScene, GameScene, GameOverScene, LeaderBoardScene],
}

const game = new Phaser.Game(config)
