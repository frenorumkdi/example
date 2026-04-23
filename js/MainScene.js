// Main Game Scene
import { SpriteGenerator } from './SpriteGenerator.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }
  
  preload() {
    // Generate sprites programmatically
    const spriteGen = new SpriteGenerator();
    
    // Preload the NASA moon image
    this.load.image('moon', 'https://images-assets.nasa.gov/image/PIA00405/PIA00405~large.jpg?w=1920&h=1920&fit=clip&crop=faces%2Cfocalpoint');
    
    // We'll generate and cache sprites in create()
    this.spriteGen = spriteGen;
  }
  
  create() {
    const { width, height } = this.scale;
    
    // Generate background sky
    const skyCanvas = this.spriteGen.generateSky(width, height);
    this.textures.addCanvas('sky', skyCanvas);
    this.add.image(width / 2, height / 2, 'sky');
    
    // Add moon image in the upper sky area (positioned behind buildings)
    this.moon = this.add.image(width - 150, 120, 'moon');
    this.moon.setScale(0.4);
    
    // Generate and add clouds
    this.clouds = this.add.group();
    for (let i = 0; i < 5; i++) {
      const cloudCanvas = this.spriteGen.generateCloud();
      const texture = this.textures.addCanvas(`cloud${i}`, cloudCanvas);
      const cloud = this.add.image(
        Math.random() * width,
        30 + Math.random() * 100,
        `cloud${i}`
      );
      cloud.setAlpha(0.3 + Math.random() * 0.3);
      this.clouds.add(cloud);
    }
    
    // Generate building sprites and create skyline
    this.createBuildings();
    
    // Generate archer sprites
    this.createArchers();
    
    // Setup arrow physics group
    this.arrows = this.physics.add.group();
    
    // Start shooting arrows
    this.shootArrow('left');
    
    // Create rain particles
    this.createRain();
    
    // Setup lightning effect
    this.setupLightning();
    
    // Add subtle camera shake on lightning
    this.cameras.main.shake(0, 0);
    
    // Desktop keyboard input if needed
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  
  createBuildings() {
    const { width, height } = this.scale;
    const groundY = height - 50;
    
    // Building configurations: [x, width, height]
    const buildings = [
      { x: 0, w: 80, h: 200 },
      { x: 80, w: 100, h: 280 },
      { x: 180, w: 90, h: 220 },
      { x: 270, w: 120, h: 320 },
      { x: 390, w: 80, h: 260 },
      { x: 470, w: 100, h: 300 },
      { x: 570, w: 110, h: 240 },
      { x: 680, w: 90, h: 280 },
      { x: 770, w: 100, h: 200 },
      { x: 870, w: 90, h: 260 },
      { x: 960, w: 100, h: 220 },
    ];
    
    this.buildings = [];
    
    for (const b of buildings) {
      // Generate building sprite
      const canvas = this.spriteGen.generateBuilding(b.w, b.h);
      const texture = this.textures.addCanvas(`building_${b.w}_${b.h}`, canvas);
      
      const building = this.add.image(
        b.x + b.w / 2,
        groundY - b.h / 2,
        `building_${b.w}_${b.h}`
      );
      
      // Store building position for archer placement
      building.groundY = groundY;
      building.roofY = groundY - b.h;
      building.xPos = b.x + b.w / 2;
      
      this.buildings.push(building);
    }
  }
  
  createArchers() {
    // Find suitable buildings for archers
    const sortedByHeight = [...this.buildings].sort((a, b) => b.height - a.height);
    
    // Left archer on shorter building (index 2)
    const leftBuilding = sortedByHeight[2];
    const leftArcherCanvas = this.spriteGen.generateArcher(false);
    this.textures.addCanvas('archer_left', leftArcherCanvas);
    this.archerLeft = this.add.sprite(leftBuilding.xPos, leftBuilding.roofY - 20, 'archer_left');
    this.archerLeft.setOrigin(0.5, 1);
    this.archerLeft.building = leftBuilding;
    this.archerLeft.direction = 'right';
    
    // Right archer on another building (index 5)
    const rightBuilding = sortedByHeight[5];
    const rightArcherCanvas = this.spriteGen.generateArcher(true);
    this.textures.addCanvas('archer_right', rightArcherCanvas);
    this.archerRight = this.add.sprite(rightBuilding.xPos, rightBuilding.roofY - 20, 'archer_right');
    this.archerRight.setOrigin(0.5, 1);
    this.archerRight.building = rightBuilding;
    this.archerRight.direction = 'left';
  }
  
  shootArrow(fromDirection) {
    const { width, height } = this.scale;
    
    // Create arrow texture if not already
    if (!this.textures.exists('arrow')) {
      const arrowCanvas = this.spriteGen.generateArrow();
      this.textures.addCanvas('arrow', arrowCanvas);
    }
    
    // Determine shooting archer and direction
    const archer = fromDirection === 'left' ? this.archerLeft : this.archerRight;
    const targetArcher = fromDirection === 'left' ? this.archerRight : this.archerLeft;
    const targetX = targetArcher.x;
    
    // Create arrow
    const arrow = this.add.sprite(archer.x, archer.y - 30, 'arrow');
    arrow.setOrigin(0.5, 0.5);
    
    // Calculate trajectory
    const flightTime = 1800;
    const startY = archer.y - 30;
    const peakY = Math.min(archer.y, targetArcher.y) - 80;
    const endY = targetArcher.y - 30;
    
    // X movement - linear (constant horizontal speed)
    this.tweens.add({
      targets: arrow,
      x: targetX,
      duration: flightTime,
      ease: 'Linear.easeNone',
      onComplete: () => {
        arrow.destroy();
      }
    });
    
    // Y movement - parabola (slows at peak, accelerates on fall)
    this.tweens.add({
      targets: arrow,
      y: { from: startY, to: endY },
      duration: flightTime,
      ease: 'Quad.easeInOut',
    });
    
    // Rotate arrow based on velocity (points in direction of travel)
    this.tweens.add({
      targets: arrow,
      angle: fromDirection === 'left' ? 10 : -10,
      duration: flightTime / 4,
      yoyo: true,
      repeat: 1,
    });
    
    // Alternate arrows after flight
    this.time.delayedCall(flightTime + 500, () => {
      const nextFrom = fromDirection === 'left' ? 'right' : 'left';
      this.shootArrow(nextFrom);
    });
  }
  
  createRain() {
    // Generate raindrop texture
    const raindropCanvas = this.spriteGen.generateRaindrop();
    this.textures.addCanvas('raindrop', raindropCanvas);
    
    // Create particle emitter
    this.rain = this.add.particles(0, 0, 'raindrop', {
      x: { min: 0, max: this.scale.width },
      y: -10,
      lifespan: 2000,
      speedY: { min: 200, max: 400 },
      speedX: { min: -20, max: 20 },
      scale: { start: 1, end: 0.5 },
      alpha: { start: 0.6, end: 0 },
      quantity: 1,
      frequency: 30,
      follow: null,
    });
  }
  
  setupLightning() {
    // Generate lightning texture
    const lightningCanvas = this.spriteGen.generateLightning();
    this.textures.addCanvas('lightning', lightningCanvas);
    
    // Flash overlay
    this.flashOverlay = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      0xffffff,
      0
    );
    
    // Schedule random lightning
    this.scheduleLightning();
  }
  
  scheduleLightning() {
    const delay = 3000 + Math.random() * 5000;
    
    this.time.delayedCall(delay, () => {
      this.triggerLightning();
    });
  }
  
  triggerLightning() {
    const { width } = this.scale;
    
    // Add lightning sprite
    const lightning = this.add.image(
      width / 2 + (Math.random() - 0.5) * 200,
      100,
      'lightning'
    );
    lightning.setOrigin(0.5, 0);
    
    // Flash effect
    this.flashOverlay.setFillStyle(0xffffff, 0.7);
    this.tweens.add({
      targets: this.flashOverlay,
      alpha: 0,
      duration: 100,
      ease: 'Quad.easeOut',
    });
    
    // Camera shake
    this.cameras.main.shake(200, 0.005);
    
    // Remove lightning after flash
    this.time.delayedCall(150, () => {
      lightning.destroy();
    });
    
    // Schedule next lightning
    this.scheduleLightning();
  }
  
  update(time, delta) {
    // Animate clouds slowly
    this.clouds.getChildren().forEach((cloud, i) => {
      cloud.x -= 0.1 + i * 0.05;
      if (cloud.x < -60) {
        cloud.x = this.scale.width + 60;
      }
    });
  }
}