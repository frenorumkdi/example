# 1. OBJECTIVE

Create an animated HTML5 page displaying a city skyline with buildings, rain, lightning, and two archers on separate buildings shooting at each other. All visuals using only SVG paths. The page must be fully responsive (mobile + desktop) with no external plugins or images required. The project should run locally using Vite with `npm start`.

# 2. CONTEXT SUMMARY

- **Project Type**: Single-page animated SVG scene with Vite dev server
- **Tech Stack**: Plain HTML5, CSS3, JavaScript, Vite
- **Constraints**: 
  - Only SVG paths for visuals (no raster images)
  - No external plugins
  - Responsive design for mobile and desktop
  - Clean, modular code structure

# 3. APPROACH OVERVIEW

Build the scene using layered SVG elements:
1. **Background Layer**: Gradient sky (dark stormy colors)
2. **Skyline Layer**: Multiple SVG path-based buildings with varied heights and widths
3. **Archer Layer**: Two archers with bows and arrows on different buildings
4. **Arrow Animation Layer**: Animated arrows flying between archers
5. **Rain Layer**: SVG line elements with CSS animation
6. **Lightning Layer**: SVG path-based bolt with flash animation

Use CSS animations for rain, lightning, and arrow flight effects. Separate each visual component into distinct SVG groups for maintainability.

# 4. IMPLEMENTATION STEPS

## Step 1: Initialize Vite project
**Goal**: Set up Node.js project with Vite for local development
**Method**: 
- Create package.json with Vite as dependency
- Configure Vite for HTML entry point
- Add "start" script to package.json

## Step 2: Create project structure
**Goal**: Set up clean file organization
**Method**: 
- Create index.html at root
- Create css/ and js/ directories for modular code
- Reference: Main SVG container

## Step 3: Build SVG container and background
**Goal**: Create responsive SVG canvas with stormy sky gradient
**Method**: 
- Use viewBox for responsive scaling (recommended: 800x600 viewBox)
- Create linear gradient from dark purple to dark blue for sky
- Reference: Main SVG container

## Step 4: Draw city skyline with SVG paths
**Goal**: Create multiple buildings using only SVG paths
**Method**:
- Design 5-7 buildings with varied heights, widths, and architectural details (windows, spires)
- Use `<path>` elements with d attributes for building shapes
- Group buildings in a `<g id="skyline">` container
- Create varied building styles: rectangular, stepped, with antenna/spire
- Ensure two buildings are at good height/size for archer positions

## Step 5: Draw archers with bows and arrows
**Goal**: Create two archer figures using SVG paths
**Method**:
- Create smaller, proportionally-sized archers (approximately 30-40px tall relative to 800px viewBox)
- Design archer costume with bright/distinct colors (red cape, golden trim, or armor highlights) to contrast with dark buildings
- Use `<path>` elements for body, head with helmet, cape/clothing
- Create bow using curved `<path>` with string line
- Create arrow using `<line>` for shaft and `<path>` for arrowhead
- Group each archer in `<g id="archer-left">` and `<g id="archer-right">`
- Place on two separate buildings at roof level
- Add bow draw animation using CSS keyframes

## Step 6: Add arrow flight animation
**Goal**: Animate arrows flying between buildings with curved trajectory
**Method**:
- Create arrow elements in `<g id="arrows">` group
- Use CSS keyframes with cubic-bezier timing for realistic physics:
  - Fast initial velocity (arrow launches quickly)
  - Decelerates as it rises (gravity effect)
  - Accelerates downward as it falls
- Create separate X and Y animations to achieve parabolic arc
- Animate one arrow at a time (alternating between archers)
- Set arrow travel time to ~1.5-2 seconds for visible curve

## Step 7: Add rain effect with CSS animation
**Goal**: Create animated rain drops using SVG lines
**Method**:
- Create multiple `<line>` elements for raindrops
- Use CSS `@keyframes` animation to move rain downward
- Vary animation delays and speeds for natural effect
- Group in `<g id="rain">` container

## Step 8: Add lightning effect with CSS animation
**Goal**: Create intermittent lightning bolt with flash
**Method**:
- Draw lightning bolt using SVG `<path>`
- Add flash effect on background using opacity animation
- Use JavaScript to trigger random lightning strikes
- Group in `<g id="lightning">` container

## Step 9: Add responsive styling
**Goal**: Ensure works on mobile and desktop
**Method**:
- Use viewBox with preserveAspectRatio="xMidYMid slice"
- Add CSS media queries if needed for animation performance
- Test viewport scaling

# 5. TESTING AND VALIDATION

- **Build Check**: `npm start` runs Vite dev server successfully
- **Visual Check**: Skyline renders with multiple distinct buildings
- **Visual Check**: Two archers are proportionally sized (small, ~30-40px tall)
- **Visual Check**: Archers have distinct costume colors (red/gold/armor) visible against dark buildings
- **Animation Check**: Arrows fly in curved parabolic arc
- **Animation Check**: Arrow physics shows acceleration/deceleration (fast launch, slows at peak, accelerates on fall)
- **Animation Check**: Rain falls continuously from top to bottom
- **Animation Check**: Lightning flashes intermittently with visible bolt
- **Responsive Check**: Scene scales properly on narrow (mobile) and wide (desktop) viewports
- **Code Quality**: No external dependencies, all visuals via SVG paths only
