# 1. OBJECTIVE

Create an animated desktop webpage displaying a city skyline with buildings, rain, lightning, and two archers on separate buildings shooting at each other. Use a 2D game framework (Phaser 3) with SNK/Metal Slug inspired sprite graphics. The project should run locally using Vite with `npm start`.

# 2. CONTEXT SUMMARY

- **Project Type**: 2D animated game scene with Phaser 3 + Vite
- **Tech Stack**: HTML5, JavaScript, Phaser 3 (2D game framework), Vite
- **Constraints**: 
  - Desktop only (no mobile support needed)
  - SNK/Metal Slug inspired pixel art sprite graphics
  - No SVG paths - all visuals via sprites/images
  - No external plugins beyond Phaser
  - Clean, modular code structure

# 3. APPROACH OVERVIEW

Build the scene using Phaser 3 with sprite-based graphics:
1. **Background Layer**: Parallax city silhouette (far background)
2. **Sky Layer**: Stormy gradient sky with cloud sprites
3. **Building Layer**: Multiple building sprites with varied heights
4. **Archer Layer**: Two archer sprites with animation frames (Metal Slug style pixel art)
5. **Arrow Layer**: Animated arrow sprites with physics-based curved trajectory
6. **Weather Layer**: Rain particle system and lightning effects

Use Phaser's sprite animation, particle emitters, and physics for realistic movement.

# 4. IMPLEMENTATION STEPS

## Step 1: Initialize Vite project with Phaser 3
**Goal**: Set up Node.js project with Vite and Phaser 3 for local development
**Method**: 
- Create package.json with Vite and Phaser 3 as dependencies
- Configure Vite for HTML entry point
- Add "start" script to package.json

## Step 2: Create project structure
**Goal**: Set up clean file organization
**Method**: 
- Create index.html at root
- Create js/ directory with main game entry
- Create assets/ directory for sprite sheets
- Create css/ directory for minimal styling (just to center canvas)

## Step 3: Generate sprite graphics (Metal Slug style)
**Goal**: Create all sprite assets programmatically using canvas
**Method**:
- Use JavaScript Canvas API to programmatically generate pixel art sprites
- Create sprite generator utilities for:
  - Building sprites (dark silhouettes with window lights)
  - Archer sprites (4-8 frames: idle, draw bow, release)
  - Arrow sprite
  - Bow sprite
  - Rain drop particles
  - Lightning bolt sprite
  - Cloud sprites
- Use limited color palette (dark blues, purples, grays for background; bright colors for archers)
- Pixel art aesthetic: sharp edges, limited colors per sprite, chunky pixels

## Step 4: Implement Phaser scene structure
**Goal**: Set up Phaser game with proper scene organization
**Method**:
- Create main Scene class with preload, create, update methods
- Set canvas size for desktop (e.g., 1024x768 or fullscreen)
- Initialize physics system for arrow movement

## Step 5: Create background and buildings
**Goal**: Render city skyline with parallax effect
**Method**:
- Generate and load background gradient (stormy sky)
- Generate building sprites at various heights
- Place buildings to form city skyline
- Add subtle window light animations

## Step 6: Create archer sprites and animations
**Goal**: Create two archers with bow animations
**Method**:
- Generate archer sprites with bright costume colors (red cape, gold trim, blue armor)
- Create sprite sheets for archer animations: idle, drawing bow
- Place archers on two different buildings
- Add idle animation (subtle breathing/swaying)

## Step 7: Implement arrow shooting with curved trajectory
**Goal**: Animate arrows flying in parabolic arc with physics
**Method**:
- Create arrow sprite
- Implement physics-based movement:
  - High initial velocity on X axis
  - Gravity applied to Y axis for realistic curve
  - Arrow rotates to match trajectory direction
- Alternate shooting between archers
- Use appropriate timing (1.5-2 seconds flight)

## Step 8: Add rain effect
**Goal**: Create falling rain particles
**Method**:
- Use Phaser particle emitter for rain
- Generate rain drop sprites
- Configure particles to fall from top to bottom with slight angle
- Vary particle speed and size for natural effect

## Step 9: Add lightning effect
**Goal**: Create intermittent lightning with flash
**Method**:
- Generate lightning bolt sprite
- Use JavaScript to trigger random lightning strikes
- Flash background briefly when lightning strikes
- Add screen shake for impact

## Step 10: Desktop-only optimization
**Goal**: Ensure optimal performance on desktop
**Method**:
- Set fixed canvas size or fullscreen desktop resolution
- No touch controls needed
- Use keyboard or mouse for any interactions (if needed)
- Enable hardware acceleration

# 5. TESTING AND VALIDATION

- **Build Check**: `npm start` runs Vite dev server successfully
- **Visual Check**: Skyline renders with multiple distinct building sprites
- **Visual Check**: Two archer sprites visible on separate buildings with distinct costumes (red/gold/blue)
- **Visual Check**: Pixel art style matches Metal Slug aesthetic
- **Animation Check**: Arrows fly in curved parabolic arc with physics
- **Animation Check**: Arrow shows acceleration (fast launch, slows at peak, accelerates on fall)
- **Animation Check**: Rain falls continuously from top to bottom
- **Animation Check**: Lightning flashes intermittently with visible bolt
- **Desktop Check**: Works on desktop browser at proper resolution
- **Code Quality**: All visuals via programmatically-generated pixel art sprites
