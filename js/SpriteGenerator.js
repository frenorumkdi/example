// Sprite Generator - Creates pixel art programmatically
// Metal Slug inspired pixel art style

export class SpriteGenerator {
  constructor() {
    this.scale = 2; // Pixel art scaling
  }
  
  // Generate a building sprite with windows
  generateBuilding(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width * this.scale;
    canvas.height = height * this.scale;
    const ctx = canvas.getContext('2d');
    
    // Building base color - dark blue-gray
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Building outline - slightly lighter
    ctx.strokeStyle = '#2a2a4a';
    ctx.lineWidth = 2 * this.scale;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Windows - random lit windows
    const windowWidth = 4 * this.scale;
    const windowHeight = 6 * this.scale;
    const windowSpacingX = 12 * this.scale;
    const windowSpacingY = 16 * this.scale;
    
    for (let y = windowSpacingY; y < height - 20; y += windowSpacingY) {
      for (let x = windowSpacingX; x < width - 10; x += windowSpacingX) {
        // Random chance of lit window
        if (Math.random() > 0.3) {
          const color = Math.random() > 0.5 ? '#ffdd88' : '#88aaff';
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.6 + Math.random() * 0.4;
          ctx.fillRect(x * this.scale, y * this.scale, windowWidth, windowHeight);
          ctx.globalAlpha = 1;
        }
      }
    }
    
    return canvas;
  }
  
  // Generate an archer sprite (idle pose)
  generateArcher(isRight = false) {
    const canvas = document.createElement('canvas');
    const w = 24, h = 40;
    canvas.width = w * this.scale;
    canvas.height = h * this.scale;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    
    // Body - blue armor
    ctx.fillStyle = '#2a3a5a';
    ctx.fillRect(8 * this.scale, 16 * this.scale, 8 * this.scale, 12 * this.scale);
    
    // Cape - red (Metal Slug style)
    ctx.fillStyle = '#8b2020';
    ctx.fillRect(4 * this.scale, 14 * this.scale, 6 * this.scale, 16 * this.scale);
    if (!isRight) {
      ctx.fillRect(14 * this.scale, 14 * this.scale, 6 * this.scale, 16 * this.scale);
    }
    
    // Gold trim
    ctx.fillStyle = '#c0a040';
    ctx.fillRect(8 * this.scale, 14 * this.scale, 8 * this.scale, 2 * this.scale);
    ctx.fillRect(8 * this.scale, 26 * this.scale, 8 * this.scale, 2 * this.scale);
    
    // Head/helmet
    ctx.fillStyle = '#4a4a6a';
    ctx.fillRect(8 * this.scale, 6 * this.scale, 8 * this.scale, 8 * this.scale);
    ctx.fillStyle = '#c0a040';
    ctx.fillRect(6 * this.scale, 4 * this.scale, 12 * this.scale, 3 * this.scale);
    
    // Bow
    ctx.strokeStyle = '#5a4a2a';
    ctx.lineWidth = 2 * this.scale;
    ctx.beginPath();
    if (isRight) {
      ctx.moveTo(14 * this.scale, 10 * this.scale);
      ctx.quadraticCurveTo(20 * this.scale, 16 * this.scale, 14 * this.scale, 24 * this.scale);
    } else {
      ctx.moveTo(10 * this.scale, 10 * this.scale);
      ctx.quadraticCurveTo(4 * this.scale, 16 * this.scale, 10 * this.scale, 24 * this.scale);
    }
    ctx.stroke();
    
    // Bow string
    ctx.strokeStyle = '#aaaaaa';
    ctx.lineWidth = 1 * this.scale;
    ctx.beginPath();
    if (isRight) {
      ctx.moveTo(14 * this.scale, 10 * this.scale);
      ctx.lineTo(14 * this.scale, 24 * this.scale);
    } else {
      ctx.moveTo(10 * this.scale, 10 * this.scale);
      ctx.lineTo(10 * this.scale, 24 * this.scale);
    }
    ctx.stroke();
    
    // Arrow
    ctx.strokeStyle = '#5a4030';
    ctx.lineWidth = 2 * this.scale;
    if (isRight) {
      ctx.beginPath();
      ctx.moveTo(4 * this.scale, 16 * this.scale);
      ctx.lineTo(14 * this.scale, 16 * this.scale);
      ctx.stroke();
      // Arrowhead
      ctx.fillStyle = '#5a4030';
      ctx.beginPath();
      ctx.moveTo(14 * this.scale, 16 * this.scale);
      ctx.lineTo(10 * this.scale, 14 * this.scale);
      ctx.lineTo(10 * this.scale, 18 * this.scale);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(10 * this.scale, 16 * this.scale);
      ctx.lineTo(20 * this.scale, 16 * this.scale);
      ctx.stroke();
      // Arrowhead
      ctx.fillStyle = '#5a4030';
      ctx.beginPath();
      ctx.moveTo(20 * this.scale, 16 * this.scale);
      ctx.lineTo(16 * this.scale, 14 * this.scale);
      ctx.lineTo(16 * this.scale, 18 * this.scale);
      ctx.fill();
    }
    
    return canvas;
  }
  
  // Generate arrow sprite (flying)
  generateArrow() {
    const canvas = document.createElement('canvas');
    canvas.width = 20 * this.scale;
    canvas.height = 4 * this.scale;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    
    // Arrow shaft
    ctx.strokeStyle = '#5a4030';
    ctx.lineWidth = 2 * this.scale;
    ctx.beginPath();
    ctx.moveTo(0, 2 * this.scale);
    ctx.lineTo(16 * this.scale, 2 * this.scale);
    ctx.stroke();
    
    // Arrowhead
    ctx.fillStyle = '#5a4030';
    ctx.beginPath();
    ctx.moveTo(20 * this.scale, 2 * this.scale);
    ctx.lineTo(14 * this.scale, 0);
    ctx.lineTo(14 * this.scale, 4 * this.scale);
    ctx.fill();
    
    // Fletching
    ctx.fillStyle = '#8b6060';
    ctx.fillRect(0, 0, 4 * this.scale, 4 * this.scale);
    
    return canvas;
  }
  
  // Generate rain drop
  generateRaindrop() {
    const canvas = document.createElement('canvas');
    canvas.width = 2 * this.scale;
    canvas.height = 8 * this.scale;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#6699cc';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, 2 * this.scale, 8 * this.scale);
    
    return canvas;
  }
  
  // Generate lightning bolt
  generateLightning() {
    const canvas = document.createElement('canvas');
    canvas.width = 40 * this.scale;
    canvas.height = 80 * this.scale;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3 * this.scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 10 * this.scale;
    
    ctx.beginPath();
    ctx.moveTo(20 * this.scale, 0);
    ctx.lineTo(16 * this.scale, 25 * this.scale);
    ctx.lineTo(24 * this.scale, 25 * this.scale);
    ctx.lineTo(12 * this.scale, 55 * this.scale);
    ctx.lineTo(28 * this.scale, 40 * this.scale);
    ctx.lineTo(20 * this.scale, 40 * this.scale);
    ctx.lineTo(32 * this.scale, 80 * this.scale);
    ctx.stroke();
    
    return canvas;
  }
  
  // Generate cloud sprite
  generateCloud() {
    const canvas = document.createElement('canvas');
    canvas.width = 60 * this.scale;
    canvas.height = 20 * this.scale;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#3a3a4a';
    ctx.globalAlpha = 0.5;
    
    // Draw cloud blobs
    ctx.beginPath();
    ctx.arc(15 * this.scale, 10 * this.scale, 10 * this.scale, 0, Math.PI * 2);
    ctx.arc(30 * this.scale, 8 * this.scale, 12 * this.scale, 0, Math.PI * 2);
    ctx.arc(45 * this.scale, 10 * this.scale, 10 * this.scale, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas;
  }
  
  // Generate sky gradient
  generateSky(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(0.5, '#2d1b4e');
    gradient.addColorStop(1, '#0f1729');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    return canvas;
  }
}