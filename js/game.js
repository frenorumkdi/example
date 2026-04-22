// Main Game Entry
import Phaser from 'phaser';
import { MainScene } from './MainScene.js';

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#0a0a15',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [MainScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

// Create game instance
const game = new Phaser.Game(config);

// Handle window resize
window.addEventListener('resize', () => {
  // Phaser handles resize via Scale Manager
});

export default game;