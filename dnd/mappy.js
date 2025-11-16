        // Constants
        const TILE_SIZE = 32;
        const MAX_MAP_SIZE = 50;
        const MIN_MAP_SIZE = 10;
        const MAX_TRAILS = 5;
        const MIN_TRAIL_LENGTH = 0;
        const MAX_TRAIL_LENGTH = 20;
        const MAP_STORAGE_KEY = 'mappyMaps';
        let mappyInitialized = false;

        // Viewport (canvas) settings
        const USE_CANVAS_VIEW = true; // use canvas for interactive view
        const MIN_ZOOM = 0.5;
        const MAX_ZOOM = 4;
        const ZOOM_FACTOR = 1.1;
        const view = { zoom: 1, offsetX: 0, offsetY: 0, dragging: false, dragStartX: 0, dragStartY: 0 };
        const PLAYER_VIEW_STATE_KEY = 'mappyPlayerViewState';
        let IS_PLAYER_VIEW = !!window.IS_PLAYER_VIEW;

        // Only these are base, generative terrains (used in probabilities and dropdown)
        const BASE_TERRAINS = ['grass', 'forest', 'rocky', 'water'];

        // LOD settings & fallback colors for low-zoom rendering
        const LOW_ZOOM_THRESHOLD = 0.8;
        const HIGH_ZOOM_THRESHOLD = 2.25; // forest splits later to feel more natural
        const FOREST_FADE_END_ZOOM = 3.0; // smoothly fade canopy toward grass by this zoom
        const TERRAIN_COLORS = {
            grass: '#6faa44',
            forest: '#2f5d2f',
            rocky: '#7d7e7f',
            rocky_mid: '#8a8b8c',  
            rocky_top: '#9a9b9c', 
            water: '#3c77b7',
            trail: '#b08b4f',
            structure: '#c94f4f'
        };
        // Elevation-aware rocky variants
const ROCKY_MID_THRESHOLD = 0.60;
const ROCKY_TOP_THRESHOLD = 0.80;

function rockyVariantAt(x, y){
  const e = elevation[y]?.[x] ?? 0;
  if (e >= ROCKY_TOP_THRESHOLD) return 'rocky_top';
  if (e >= ROCKY_MID_THRESHOLD) return 'rocky_mid';
  return 'rocky';
}

function spriteKeyFor(x, y, tile){
  if (tile === 'rocky') return rockyVariantAt(x, y);
  return tile;
}
        // Deterministic tiny jitter per tile so trees don't "swim" while panning
        function stableNoise(x, y, k=0){
            // x,y are tile coords encoded via sx,sy in caller
            // Use a simple integer hash -> [0,1)
            let h = (x * 374761393) ^ (y * 668265263) ^ (k * 2246822519);
            h = (h ^ (h >>> 13)) * 1274126177;
            h ^= h >>> 16;
            // Unsigned to 0..2^32-1 then normalize
            return ((h >>> 0) / 4294967296);
        }

        function drawForestDetail(ctx, img, sx, sy, sw, sh, z, tx, ty){
            // Natural, tile-stable scatter (no swimming). 2–4 overlays depending on zoom.
            const baseCount = z >= 3 ? 4 : 3;
            const count = Math.max(2, Math.min(4, baseCount));
            const margin = Math.max(1, Math.floor(Math.min(sw, sh) * 0.08));
            const minSize = Math.max(4, Math.floor(Math.min(sw, sh) * 0.22));
            const maxSize = Math.max(minSize+1, Math.floor(Math.min(sw, sh) * 0.32));
            const minDist = Math.max(4, Math.floor(Math.min(sw, sh) * 0.20));

            // rejection sampling using stableNoise seeded by tile coords
            const placed = [];
            let attempts = 0;
            while(placed.length < count && attempts < count * 12){
                attempts++;
                // derive pseudo-randoms purely from tile index and attempt id
                const rx = stableNoise(tx*131 + attempts*17, ty*137 + attempts*23, 11);
                const ry = stableNoise(tx*149 + attempts*19, ty*151 + attempts*29, 17);
                const rs = stableNoise(tx*157 + attempts*31, ty*163 + attempts*37, 23);

                const w = minSize + Math.floor(rs * (maxSize - minSize));
                const h = w;
                const px = sx + margin + Math.floor(rx * Math.max(1, sw - 2*margin - w));
                const py = sy + margin + Math.floor(ry * Math.max(1, sh - 2*margin - h));

                let ok = true;
                for(const p of placed){
                    const dx = (px + w*0.5) - (p.x + p.w*0.5);
                    const dy = (py + h*0.5) - (p.y + p.h*0.5);
                    if(Math.hypot(dx, dy) < minDist){ ok = false; break; }
                }
                if(!ok) continue;
                placed.push({x:px, y:py, w, h});
            }

            // draw overlays with gentle alpha; keep tight to canopy
            for(const p of placed){
                const alpha = 0.9 - stableNoise(tx*97 + p.x|0, ty*103 + p.y|0, 29) * 0.2;
                ctx.save();
                ctx.globalAlpha = alpha;
                if(img && img.complete){
                    ctx.drawImage(img, p.x, p.y, p.w, p.h);
                } else {
                    ctx.fillStyle = TERRAIN_COLORS['forest'] || '#2f5d2f';
                    ctx.fillRect(p.x, p.y, p.w, p.h);
                }
                ctx.restore();
            }
        }

        // Draw a tile with LOD (level of detail) handling for viewport rendering
        function drawTileLOD(ctx, tile, img, sx, sy, sw, sh, z, tx, ty){
            // Low zoom: solid color rectangles for clarity/perf
            if(z <= LOW_ZOOM_THRESHOLD){
                ctx.fillStyle = TERRAIN_COLORS[tile] || '#888';
                ctx.fillRect(sx, sy, sw, sh);
                return;
            }

            // Forest: at high zoom, draw grass beneath and fade canopy in smoothly as we zoom in
            if((tile === 'forest') && z >= HIGH_ZOOM_THRESHOLD){
                // 1) Always lay a grass ground first at close zoom
                const grassImg = IMAGES['grass'];
                if (grassImg && grassImg.complete) {
                    ctx.drawImage(grassImg, sx, sy, sw, sh);
                } else {
                    ctx.fillStyle = TERRAIN_COLORS['grass'] || '#6faa44';
                    ctx.fillRect(sx, sy, sw, sh);
                }

                // 2) Compute canopy alpha that fades from 1.0 -> 0.55 across the zoom band
                const z0 = HIGH_ZOOM_THRESHOLD;
                const z1 = FOREST_FADE_END_ZOOM;
                const t = Math.max(0, Math.min(1, (z - z0) / Math.max(0.0001, (z1 - z0))));
                const canopyAlpha = 1 - 0.45 * t; // stays partially visible at max zoom

                // 3) Draw the main canopy with that alpha
                ctx.save();
                ctx.globalAlpha = canopyAlpha;
                if(img && img.complete){
                    ctx.drawImage(img, sx, sy, sw, sh);
                } else {
                    ctx.fillStyle = TERRAIN_COLORS['forest'] || '#2f5d2f';
                    ctx.fillRect(sx, sy, sw, sh);
                }
                ctx.restore();

                // 4) Overlay small tree details (tile-stable)
                drawForestDetail(ctx, img, sx, sy, sw, sh, z, tx, ty);
                return;
            }

            // High zoom (non-forest): subdivide into 2x2 mosaic
            if(z >= HIGH_ZOOM_THRESHOLD && img && img.complete){
                const halfW = Math.ceil(sw/2);
                const halfH = Math.ceil(sh/2);
                ctx.drawImage(img, sx,        sy,        halfW, halfH);
                ctx.drawImage(img, sx+halfW,  sy,        halfW, halfH);
                ctx.drawImage(img, sx,        sy+halfH,  halfW, halfH);
                ctx.drawImage(img, sx+halfW,  sy+halfH,  halfW, halfH);
                return;
            }

            // Normal zoom: single sprite draw
            if(img && img.complete){
                ctx.drawImage(img, sx, sy, sw, sh);
            } else {
                ctx.fillStyle = TERRAIN_COLORS[tile] || '#888';
                ctx.fillRect(sx, sy, sw, sh);
            }
        }


        // Seedable RNG (Mulberry32)
        let rng = Math.random;
        function mulberry32(a) {
            return function() {
                a |= 0; a = a + 0x6D2B79F5 | 0;
                let t = Math.imul(a ^ a >>> 15, 1 | a);
                t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            };
        }
        function setSeed(seedStr) {
            if (!seedStr) { rng = Math.random; return; }
            // hash a string to 32-bit int
            let h = 2166136261;
            for (let i = 0; i < seedStr.length; i++) {
                h ^= seedStr.charCodeAt(i);
                h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
            }
            rng = mulberry32(h >>> 0);
        }
        function rand() { return rng(); }

        // Tile and terrain definitions
        const TILE_SPRITES = {
            'grass': 'images/grass_sprite.png',
            'forest': 'images/forest_sprite.png',
            'rocky': 'images/rocky_sprite.png',
            'rocky_mid': 'images/rocky_mid_sprite.png',    
            'rocky_top': 'images/rocky_top_sprite.png',
            'water': 'images/water_sprite.png',
            'trail': 'images/trail_sprite.png',
            'structure': 'images/structure_sprite.png',
            'encounter': 'images/encounter_icon.png'
        };

        const TERRAIN_TYPES = BASE_TERRAINS; // only base terrains participate in generation
        // Preload sprite images once for fast rendering and reliable PNG exports
        const IMAGES = {};
        function preloadSprites(callback) {
            const entries = Object.entries(TILE_SPRITES);
            let remaining = entries.length;
            entries.forEach(([key, src]) => {
                const img = new Image();
                img.src = src;
                img.onload = () => { IMAGES[key] = img; if (--remaining === 0) callback && callback(); };
                img.onerror = () => { IMAGES[key] = img; if (--remaining === 0) callback && callback(); };
            });
        }
        let mapGrid = [];
        let encounters = [];
        let terrainProbabilities = {
            'grass': 0.2,
            'forest': 0.65,
            'rocky': 0.1,
            'water': 0.05
        };

        let multiSelectMode = false;
        let selectedTiles = [];
        let readOnly = IS_PLAYER_VIEW;
        let dmReadOnlyPreference = false;
        // Labels & measuring state
        let labelMode = false;
        let labels = []; // {x,y,text}
        let measureMode = false;
        let measureStart = null; // {x,y} in world tile coords (floats)
        let measureEnd = null;

        // Elevation (for contours & river bias)
        let elevation = []; // 2D array of floats 0..1
        // Fog of war state (0 = visible, 1 = fog)
        let fogEnabled = false;
        let fogEditMode = false;
        let fogMask = []; // 2D array matches mapGrid dims
        let fogPainting = false;

        function ensureFogSize(){
            const H = mapGrid.length, W = mapGrid[0].length;
            if(!fogMask || fogMask.length !== H || fogMask[0]?.length !== W){
                fogMask = Array(H).fill(0).map(()=>Array(W).fill( fogEnabled ? 1 : 0 ));
            }
        }
        function toggleFogEnabled(){
            if (!IS_PLAYER_VIEW) {
                const toggle = document.getElementById('fogToggle');
                if (toggle) {
                    fogEnabled = toggle.checked;
                }
            }
            const fc = document.getElementById('fogControls');
            if(fc) fc.style.display = fogEnabled ? 'block' : 'none';
            ensureFogSize();
            renderViewport();
            renderMinimap();
        }
        function toggleFogEditMode(){
            if (IS_PLAYER_VIEW) {
                fogEditMode = false;
                return;
            }
            const toggle = document.getElementById('fogEditToggle');
            fogEditMode = !!toggle && toggle.checked;
        }
        function clearFog(){
            if (readOnly) return;
            if(!fogEnabled) return;
            pushState();
            const H = fogMask.length, W = fogMask[0]?.length||0;
            for(let y=0;y<H;y++) for(let x=0;x<W;x++) fogMask[y][x]=0;
            renderViewport();
        }
        function toggleReadOnly(){
            const toggleEl = document.getElementById('readOnlyToggle');
            if (IS_PLAYER_VIEW) {
                if (toggleEl) {
                    dmReadOnlyPreference = !!toggleEl.checked;
                }
                readOnly = true;
            } else {
                readOnly = !!toggleEl?.checked;
                dmReadOnlyPreference = readOnly;
            }
            // disable some editing UI in read-only mode for safety
            const dd = document.getElementById('terrainDropdown');
            const ms = document.getElementById('toggle-multi-select');
            if (dd) dd.disabled = readOnly;
            if (ms) ms.disabled = readOnly;
            // visual feedback on the viewport
            const vp = document.getElementById('viewport');
            if (vp) vp.style.cursor = readOnly ? 'grab' : 'default';
        }
        function toggleMeasureMode(){
            measureMode = document.getElementById('measureToggle').checked;
            // measurement is non-destructive; allowed in read-only
            if(measureMode){ labelMode = false; const lt=document.getElementById('labelToggle'); if(lt) lt.checked=false; }
        }
        function toggleLabelMode(){
            labelMode = document.getElementById('labelToggle').checked;
            if(labelMode){ measureMode = false; const mt=document.getElementById('measureToggle'); if(mt) mt.checked=false; }
        }
        function clearLabels(){
            if (readOnly) return;
            pushState();
            labels = [];
            renderViewport();
        }
        // --- Undo/Redo ---
        let undoStack = [];
        let redoStack = [];
        function cloneState(){
            return {
                mapGrid: mapGrid.map(r => r.slice()),
                encounters: encounters.map(e => ({x:e.x,y:e.y})),
                labels: labels.map(lb => ({x: lb.x, y: lb.y, text: lb.text})),
                settings: {
                    mapSize: document.getElementById('mapSize').value,
                    numTrails: document.getElementById('numTrails').value,
                    minTrailLength: document.getElementById('minTrailLength').value,
                    maxTrailLength: document.getElementById('maxTrailLength').value,
                    seed: (document.getElementById('seed')?.value||'')
                },
                probs: {...terrainProbabilities}
            };
        }
        function publishPlayerViewState(){
            try{
                const payload = cloneState();
                payload.fogEnabled = fogEnabled;
                payload.fogMask = fogMask.map(row => row.slice());
                localStorage.setItem(PLAYER_VIEW_STATE_KEY, JSON.stringify(payload));
            } catch(err){
                console.error('Failed to publish player view state', err);
            }
        }
        function loadPlayerViewState(){
            try{
                const raw = localStorage.getItem(PLAYER_VIEW_STATE_KEY);
                return raw ? JSON.parse(raw) : null;
            } catch(err){
                console.error('Failed to load player view state', err);
                return null;
            }
        }
        function restoreState(s){
            mapGrid = s.mapGrid.map(r => r.slice());
            encounters = s.encounters.map(e => ({x:e.x,y:e.y}));
            labels = Array.isArray(s.labels) ? s.labels.map(lb => ({x: lb.x, y: lb.y, text: lb.text})) : [];
            const st = s.settings;
            document.getElementById('mapSize').value = st.mapSize;
            document.getElementById('numTrails').value = st.numTrails;
            document.getElementById('minTrailLength').value = st.minTrailLength;
            document.getElementById('maxTrailLength').value = st.maxTrailLength;
            document.getElementById('seed').value = st.seed;
            Object.assign(terrainProbabilities, s.probs);
            BASE_TERRAINS.forEach(k=>{
                const el = document.getElementById(`${k}-probability`); if(el) el.value = terrainProbabilities[k];
            });
            fitViewToMap();
            renderMap();
        }
        function pushState(){
            undoStack.push(cloneState());
            if(undoStack.length>50) undoStack.shift();
            redoStack.length = 0;
        }
        function undo(){ if(undoStack.length){ const cur=cloneState(); const prev=undoStack.pop(); redoStack.push(cur); restoreState(prev); } }
        function redo(){ if(redoStack.length){ const cur=cloneState(); const next=redoStack.pop(); undoStack.push(cur); restoreState(next); } }

        // --- Preset helpers ---
        function setProbs(p) {
            // p: {grass, forest, rocky, water} that sum ~1
            BASE_TERRAINS.forEach(k => {
                terrainProbabilities[k] = p[k] ?? terrainProbabilities[k];
            });
            // reflect in UI inputs if visible/created
            BASE_TERRAINS.forEach(k => {
                const el = document.getElementById(`${k}-probability`);
                if (el) el.value = terrainProbabilities[k];
            });
        }
        function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
        function inBounds(x,y){ return y>=0 && y<mapGrid.length && x>=0 && x<mapGrid[0].length; }
        // --- Elevation & smoothing ---
        function generateElevation(size){
            // simple value noise: initialize coarse grid then bilinear upsample + blur
            const coarse = 6; // controls roughness
            const gw = coarse, gh = coarse;
            const g = [];
            for(let j=0;j<gh;j++){ g[j]=[]; for(let i=0;i<gw;i++){ g[j][i]=rand(); } }
            elevation = Array(size).fill(0).map(()=>Array(size).fill(0));
            for(let y=0;y<size;y++){
                for(let x=0;x<size;x++){
                    const fx = x*(gw-1)/(size-1);
                    const fy = y*(gh-1)/(size-1);
                    const x0 = Math.floor(fx), y0 = Math.floor(fy);
                    const x1 = Math.min(x0+1, gw-1), y1 = Math.min(y0+1, gh-1);
                    const tx = fx - x0, ty = fy - y0;
                    const v00=g[y0][x0], v10=g[y0][x1], v01=g[y1][x0], v11=g[y1][x1];
                    const vx0 = v00*(1-tx)+v10*tx;
                    const vx1 = v01*(1-tx)+v11*tx;
                    let v = vx0*(1-ty)+vx1*ty;
                    elevation[y][x]=v;
                }
            }
            // 2-pass box blur to soften
            for(let pass=0; pass<2; pass++){
                const tmp = elevation.map(r=>r.slice());
                for(let y=0;y<size;y++){
                    for(let x=0;x<size;x++){
                        let sum=0, c=0;
                        for(let dy=-1; dy<=1; dy++){
                            for(let dx=-1; dx<=1; dx++){
                                const nx=x+dx, ny=y+dy;
                                if(nx>=0 && ny>=0 && nx<size && ny<size){ sum+=tmp[ny][nx]; c++; }
                            }
                        }
                        elevation[y][x]=sum/c;
                    }
                }
            }
        }

        function smoothTerrain(iter=1){
            const H = mapGrid.length, W = mapGrid[0].length;
            const pick = (x,y)=> (x<0||y<0||x>=W||y>=H) ? null : mapGrid[y][x];
            for(let k=0;k<iter;k++){
                const next = mapGrid.map(r=>r.slice());
                for(let y=0;y<H;y++){
                    for(let x=0;x<W;x++){
                        const here = mapGrid[y][x];
                        const neigh = [pick(x+1,y),pick(x-1,y),pick(x,y+1),pick(x,y-1),pick(x+1,y+1),pick(x-1,y-1),pick(x+1,y-1),pick(x-1,y+1)].filter(Boolean);
                        const candidates = neigh.filter(t => BASE_TERRAINS.includes(t));
                        if(!BASE_TERRAINS.includes(here) || candidates.length<3) continue;
                        const counts = {}; candidates.forEach(t=>counts[t]=(counts[t]||0)+1);
                        const winner = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
                        next[y][x] = winner;
                    }
                }
                mapGrid = next;
            }
        }
        function thinDenseForests(){
            const H = mapGrid.length, W = mapGrid[0].length;
            const next = mapGrid.map(row => row.slice());
            for(let y=0; y<H; y++){
                for(let x=0; x<W; x++){
                    if(mapGrid[y][x] !== 'forest') continue;
                    let neighbors = 0;
                    for(let dy=-1; dy<=1; dy++){
                        for(let dx=-1; dx<=1; dx++){
                            if(dx===0 && dy===0) continue;
                            const nx = x+dx, ny = y+dy;
                            if(inBounds(nx,ny) && mapGrid[ny][nx] === 'forest'){
                                neighbors++;
                            }
                        }
                    }
                    if(neighbors >= 6 && rand() < 0.45){
                        next[y][x] = 'grass';
                    } else if(neighbors <= 2 && rand() < 0.2){
                        next[y][x] = 'grass';
                    }
                }
            }
            mapGrid = next;
        }
            // --- View bounds helpers ---
function getFogBrush(){
    const size = parseInt(document.getElementById('fogBrush')?.value || '2');
    return Math.max(1, Math.min(5, size));
}
function getFogMode(){
    const modes = document.getElementsByName('fogMode');
    for(const m of modes){ if(m.checked) return m.value; }
    return 'reveal';
}
function applyFogBrush(cx, cy){
    // cx, cy are in tile coords (floats allowed). Apply disk brush to fogMask.
    const H = fogMask.length, W = fogMask[0]?.length||0;
    if(!H || !W) return;
    const r = getFogBrush();
    const r2 = r*r;
    const x0 = Math.max(0, Math.floor(cx - r - 1));
    const x1 = Math.min(W-1, Math.ceil(cx + r + 1));
    const y0 = Math.max(0, Math.floor(cy - r - 1));
    const y1 = Math.min(H-1, Math.ceil(cy + r + 1));
    const hide = (getFogMode() === 'hide');
    for(let y=y0;y<=y1;y++){
        for(let x=x0;x<=x1;x++){
            const dx = (x+0.5) - cx;
            const dy = (y+0.5) - cy;
            if(dx*dx + dy*dy <= r2){ fogMask[y][x] = hide ? 1 : 0; }
        }
    }
}
function applyFogBrushFromEvent(e){
    if(!fogEnabled || !fogEditMode) return;
    const vp = document.getElementById('viewport');
    const rect = vp.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const worldX = view.offsetX + sx / view.zoom;
    const worldY = view.offsetY + sy / view.zoom;
    const cx = worldX / TILE_SIZE;
    const cy = worldY / TILE_SIZE;
    pushState();
    applyFogBrush(cx, cy);
}
function worldSizePx(){
    if(!mapGrid || !mapGrid.length) return { w: 0, h: 0 };
    return { w: mapGrid[0].length * TILE_SIZE, h: mapGrid.length * TILE_SIZE };
}
function calcMinZoom(){
    const vp = document.getElementById('viewport');
    if(!vp) return MIN_ZOOM;
    const { w, h } = worldSizePx();
    if(w === 0 || h === 0) return MIN_ZOOM;
    const fitZoom = Math.min(vp.width / w, vp.height / h);
    // prevent zooming out further than fully-fitting the map
    return Math.max(MIN_ZOOM, Math.min(fitZoom, MAX_ZOOM));
}
function ensureViewInBounds(){
    const vp = document.getElementById('viewport');
    if(!vp) return;
    const { w, h } = worldSizePx();
    const maxOffX = Math.max(0, w - vp.width / view.zoom);
    const maxOffY = Math.max(0, h - vp.height / view.zoom);
    view.offsetX = clamp(view.offsetX, 0, maxOffX);
    view.offsetY = clamp(view.offsetY, 0, maxOffY);
}
function fitViewToMap(){
    const minZ = calcMinZoom();
    if(view.zoom < minZ) view.zoom = minZ; // only bump up if below min; no centering
    ensureViewInBounds();                   // clamp offsets to edges
}

        // UI Control Functions
        function toggleControls() {
            const controls = document.getElementById('controls');
            const probWrap = document.getElementById('terrain-probabilities');
            const checkbox = document.getElementById('toggle-controls');
            const shouldShow = !!checkbox && checkbox.checked;
            [controls, probWrap].forEach(el => {
                if (!el) return;
                el.classList.toggle('is-visible', shouldShow);
            });
        }

        function wireMappyControls() {
            const simpleBindings = [
                ['generatePresetBtn', 'click', generatePreset],
                ['generateMapBtn', 'click', generateMap],
                ['saveMapBtn', 'click', saveMap],
                ['loadMapBtn', 'click', loadMap],
                ['downloadMapBtn', 'click', downloadMap],
                ['undoMapBtn', 'click', undo],
                ['redoMapBtn', 'click', redo],
                ['clearLabelsBtn', 'click', clearLabels],
                ['clearFogBtn', 'click', clearFog],
                ['toggle-multi-select', 'change', toggleMultiSelect],
                ['readOnlyToggle', 'change', toggleReadOnly],
                ['measureToggle', 'change', toggleMeasureMode],
                ['labelToggle', 'change', toggleLabelMode],
                ['fogToggle', 'change', toggleFogEnabled],
                ['fogEditToggle', 'change', toggleFogEditMode],
                ['terrainDropdown', 'change', changeSelectedTilesTerrain]
            ];
            simpleBindings.forEach(([id, event, handler]) => {
                const el = document.getElementById(id);
                if (!el) return;
                el.addEventListener(event, handler);
            });

            const advToggle = document.getElementById('toggle-controls');
            if (advToggle) {
                advToggle.addEventListener('change', toggleControls);
            }
            toggleControls();

            const playerBtn = document.getElementById('openPlayerViewBtn');
            if (playerBtn && !IS_PLAYER_VIEW) {
                playerBtn.addEventListener('click', () => {
                    publishPlayerViewState();
                    const url = new URL(window.location.href);
                    url.searchParams.set('view', 'player');
                    window.open(url.toString(), '_blank');
                });
            }
        }

        function toggleMultiSelect() {
            multiSelectMode = document.getElementById('toggle-multi-select').checked;
            selectedTiles = [];  // Clear selection when toggling mode
            renderMap();  // Update the map to reflect any changes
        }

        function createTerrainProbabilityInputs() {
            const container = document.getElementById('terrain-probabilities');
            container.innerHTML = '';

            BASE_TERRAINS.forEach(terrain => {
                const label = document.createElement('label');
                label.textContent = `${terrain} probability:`;
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '0';
                input.max = '1';
                input.step = '0.05';
                input.value = terrainProbabilities[terrain];
                input.id = `${terrain}-probability`;
                container.appendChild(label);
                container.appendChild(input);
            });
        }

        function populateTerrainDropdown() {
            const dropdown = document.getElementById('terrainDropdown');
            dropdown.innerHTML = '<option value="">Select terrain</option>';
            const options = BASE_TERRAINS.concat(['trail', 'structure']);
            options.forEach(terrain => {
                const option = document.createElement('option');
                option.value = terrain;
                option.textContent = terrain.charAt(0).toUpperCase() + terrain.slice(1);
                dropdown.appendChild(option);
            });
        }

        // Validation Functions
        function updateTerrainProbabilities() {
            BASE_TERRAINS.forEach(terrain => {
                terrainProbabilities[terrain] = parseFloat(document.getElementById(`${terrain}-probability`).value);
            });
            const total = Object.values(terrainProbabilities).reduce((sum, prob) => sum + prob, 0);
            if (Math.abs(total - 1) > 0.01) {
                alert("Terrain probabilities must sum to 1. Please adjust your values.");
                return false;
            }
            return true;
        }

        function validateTrailLengths() {
            const minLength = parseInt(document.getElementById('minTrailLength').value);
            const maxLength = parseInt(document.getElementById('maxTrailLength').value);
            if (minLength > maxLength) {
                alert("Min Trail Length cannot exceed Max Trail Length.");
                return false;
            }
            return true;
        }

        // --- Preset API and post-processors ---
        function generatePreset(){
            const val = document.getElementById('presetSelect').value;
            applyPreset(val);
        }

        function applyPreset(preset){
            // reasonable defaults; individual presets override as needed
            document.getElementById('mapSize').value = 30;
            document.getElementById('numTrails').value = 2;
            document.getElementById('minTrailLength').value = 8;
            document.getElementById('maxTrailLength').value = 18;

            switch(preset){
                case 'archipelago':
                    setProbs({ grass: 0.45, forest: 0.35, rocky: 0.15, water: 0.05 });
                    document.getElementById('mapSize').value = 34;
                    document.getElementById('numTrails').value = 1;
                    break;
                case 'riverlands':
                    setProbs({ grass: 0.5, forest: 0.3, rocky: 0.15, water: 0.05 });
                    document.getElementById('mapSize').value = 32;
                    document.getElementById('numTrails').value = 1;
                    break;
                case 'island':
                    setProbs({ grass: 0.45, forest: 0.35, rocky: 0.15, water: 0.05 });
                    document.getElementById('mapSize').value = 32;
                    document.getElementById('numTrails').value = 1;
                    break;
                case 'mountain_caves':
                    setProbs({ grass: 0.05, forest: 0.15, rocky: 0.7, water: 0.10 });
                    document.getElementById('mapSize').value = 28;
                    document.getElementById('numTrails').value = 3;
                    document.getElementById('minTrailLength').value = 10;
                    document.getElementById('maxTrailLength').value = 20;
                    break;
                case 'village':
                    setProbs({ grass: 0.6, forest: 0.2, rocky: 0.1, water: 0.1 });
                    document.getElementById('mapSize').value = 26;
                    document.getElementById('numTrails').value = 2;
                    break;
                case 'old_ruins':
                    setProbs({ grass: 0.25, forest: 0.55, rocky: 0.15, water: 0.05 });
                    document.getElementById('mapSize').value = 30;
                    document.getElementById('numTrails').value = 1;
                    break;
                case 'jungle':
                    setProbs({ grass: 0.15, forest: 0.75, rocky: 0.05, water: 0.05 });
                    document.getElementById('mapSize').value = 34;
                    document.getElementById('numTrails').value = 3;
                    document.getElementById('minTrailLength').value = 12;
                    document.getElementById('maxTrailLength').value = 22;
                    break;
                default:
                    // default
                    break;
            }

            // build the base layer
            generateMap();

            // post processing unique to the preset
            switch(preset){
                case 'island':
                    applyIslandMask();
                    carveRivers(1 + Math.floor(rand()*2));
                    break;
                case 'archipelago':
                    applyArchipelagoMask();
                    carveRivers(1);
                    break;
                case 'riverlands':
                    carveRivers(2 + Math.floor(rand()*2));
                    break;
                case 'mountain_caves':
                    emphasizeMountains();
                    carveCavesAndTunnels();
                    break;
                case 'village':
                    buildVillageCenter();
                    break;
                case 'old_ruins':
                    scatterRuins();
                    overgrowTrails();
                    break;
                case 'jungle':
                    addClearings(6, {rMin:2, rMax:4});
                    addJungleWaterholes(3);
                    tangleTrails(10, {lenMin:5, lenMax:10});
                    overgrowTrailsRate(0.15);
                    break;
            }

            renderMap();
        }

        // --- Post-processors ---
        function applyIslandMask(){
            const h = mapGrid.length, w = mapGrid[0].length;
            const cx = (w-1)/2, cy = (h-1)/2;
            const maxR = Math.min(w, h)/2;
            for(let y=0;y<h;y++){
                for(let x=0;x<w;x++){
                    const dx = (x - cx), dy = (y - cy);
                    const d = Math.sqrt(dx*dx + dy*dy) / maxR; // 0 center -> 1 edge
                    // feathered coast with randomness
                    const cutoff = 0.85 + (rand()*0.08 - 0.04); // ~0.81..0.93
                    if(d > cutoff){
                        mapGrid[y][x] = 'water';
                    } else if (d > cutoff - 0.05 && mapGrid[y][x] === 'rocky' && rand()<0.5){
                        mapGrid[y][x] = 'grass'; // a bit of beach/lowland near coast
                    }
                }
            }
        }

        function applyArchipelagoMask(){
            const h = mapGrid.length, w = mapGrid[0].length;
            const islands = 3 + Math.floor(rand()*2); // 3-4 islands
            const centers = [];
            for(let i=0;i<islands;i++){
                centers.push({
                    x: Math.floor(w*(0.2 + 0.6*rand())),
                    y: Math.floor(h*(0.2 + 0.6*rand())),
                    r: Math.min(w,h)*(0.18 + 0.08*rand())
                });
            }
            for(let y=0;y<h;y++){
                for(let x=0;x<w;x++){
                    let nearest = Infinity; let rr=0;
                    for(const c of centers){
                        const d = Math.hypot(x-c.x, y-c.y); if(d<nearest){ nearest=d; rr=c.r; }
                    }
                    const jitter = (rand()-0.5)*2.5; // rough coastline
                    if(nearest - jitter > rr){ mapGrid[y][x] = 'water'; }
                }
            }
        }

        function emphasizeMountains(){
            const h = mapGrid.length, w = mapGrid[0].length;
            for(let y=2;y<h-2;y++){
                for(let x=2;x<w-2;x++){
                    // bias interior to rocky
                    if(rand()<0.5) mapGrid[y][x] = 'rocky';
                }
            }
        }

        function carveCavesAndTunnels(){
            const h = mapGrid.length, w = mapGrid[0].length;
            const walkers = 3 + Math.floor(rand()*3);
            for(let i=0;i<walkers;i++){
                let x = Math.floor(w*0.25 + rand()*w*0.5);
                let y = Math.floor(h*0.25 + rand()*h*0.5);
                const len = 40 + Math.floor(rand()*60);
                for(let s=0;s<len;s++){
                    if(!inBounds(x,y)) break;
                    mapGrid[y][x] = 'trail'; // cave corridor
                    // widen slightly
                    if(rand()<0.5 && inBounds(x+1,y)) mapGrid[y][x+1]='trail';
                    if(rand()<0.3 && inBounds(x,y+1)) mapGrid[y+1][x]='trail';
                    // bias wandering
                    const dir = Math.floor(rand()*4);
                    x += [1,-1,0,0][dir];
                    y += [0,0,1,-1][dir];
                }
            }
        }

        function buildVillageCenter(){
            const h = mapGrid.length, w = mapGrid[0].length;
            const cx = Math.floor(w*0.5 + (rand()-0.5)*4);
            const cy = Math.floor(h*0.5 + (rand()-0.5)*4);
            // clear to grass in a small radius
            const R = 4;
            for(let y=cy-R; y<=cy+R; y++){
                for(let x=cx-R; x<=cx+R; x++){
                    if(inBounds(x,y)) mapGrid[y][x] = 'grass';
                }
            }
            // roads (plus shape)
            for(let dx=-R*2; dx<=R*2; dx++) if(inBounds(cx+dx,cy)) mapGrid[cy][cx+dx] = 'trail';
            for(let dy=-R*2; dy<=R*2; dy++) if(inBounds(cx,cy+dy)) mapGrid[cy+dy][cx] = 'trail';
            // place houses around center
            const houses = 10 + Math.floor(rand()*6);
            let placed = 0, attempts = 0;
            while(placed < houses && attempts < houses*20){
                attempts++;
                const x = cx + Math.floor((rand()-0.5)*R*2.5);
                const y = cy + Math.floor((rand()-0.5)*R*2.5);
                if(inBounds(x,y) && mapGrid[y][x] === 'grass'){
                    mapGrid[y][x] = 'structure';
                    placed++;
                }
            }
        }

        function scatterRuins(){
            const h = mapGrid.length, w = mapGrid[0].length;
            const ruins = 12 + Math.floor(rand()*10);
            for(let i=0;i<ruins;i++){
                const x = Math.floor(rand()*w);
                const y = Math.floor(rand()*h);
                if(mapGrid[y][x] !== 'water') mapGrid[y][x] = 'structure';
            }
        }

        function overgrowTrails(){
            const h = mapGrid.length, w = mapGrid[0].length;
            for(let y=0;y<h;y++){
                for(let x=0;x<w;x++){
                    if(mapGrid[y][x] === 'trail' && rand()<0.35){
                        mapGrid[y][x] = 'forest';
                    }
                }
            }
        }

        // --- Jungle preset helpers ---
        function addClearings(count=6, opts={}){
            const h = mapGrid.length, w = mapGrid[0].length;
            const rMin = opts.rMin ?? 2, rMax = opts.rMax ?? 4;
            let attempts = 0, placed = 0;
            while(placed < count && attempts < count*20){
                attempts++;
                const cx = Math.floor(w*0.15 + rand()*w*0.7);
                const cy = Math.floor(h*0.15 + rand()*h*0.7);
                const R = rMin + Math.floor(rand()*(rMax-rMin+1));
                // prefer areas dominated by forest
                let forestScore = 0, cells = 0;
                for(let y=cy-R-1;y<=cy+R+1;y++){
                    for(let x=cx-R-1;x<=cx+R+1;x++){
                        if(!inBounds(x,y)) continue;
                        cells++;
                        if(mapGrid[y][x]==='forest') forestScore++;
                    }
                }
                if(forestScore < cells*0.5) continue; // not foresty enough
                // carve to grass
                for(let y=cy-R;y<=cy+R;y++){
                    for(let x=cx-R;x<=cx+R;x++){
                        if(!inBounds(x,y)) continue;
                        const dx=x-cx, dy=y-cy; if(dx*dx+dy*dy<=R*R){ mapGrid[y][x]='grass'; }
                    }
                }
                placed++;
            }
        }

        function addJungleWaterholes(count=3){
            const h = mapGrid.length, w = mapGrid[0].length;
            let attempts = 0, placed = 0;
            while(placed < count && attempts < count*30){
                attempts++;
                const cx = Math.floor(w*0.2 + rand()*w*0.6);
                const cy = Math.floor(h*0.2 + rand()*h*0.6);
                const R = 2 + Math.floor(rand()*2); // radius 2..3
                // must be in mostly forest
                let ok = true; let trees=0, cells=0;
                for(let y=cy-R-1;y<=cy+R+1;y++){
                    for(let x=cx-R-1;x<=cx+R+1;x++){
                        if(!inBounds(x,y)) continue; cells++;
                        if(mapGrid[y][x]==='forest') trees++;
                        if(mapGrid[y][x]==='structure') ok=false;
                    }
                }
                if(!ok || trees < cells*0.6) continue;
                for(let y=cy-R;y<=cy+R;y++){
                    for(let x=cx-R;x<=cx+R;x++){
                        if(!inBounds(x,y)) continue;
                        const dx=x-cx, dy=y-cy; if(dx*dx+dy*dy<=R*R){ mapGrid[y][x]='water'; }
                    }
                }
                placed++;
            }
        }

        function tangleTrails(branches=8, opts={}){
            const h = mapGrid.length, w = mapGrid[0].length;
            const lenMin = opts.lenMin ?? 4, lenMax = opts.lenMax ?? 9;
            // collect existing trail tiles
            const trailTiles = [];
            for(let y=1;y<h-1;y++){
                for(let x=1;x<w-1;x++){
                    if(mapGrid[y][x]==='trail') trailTiles.push({x,y});
                }
            }
            let tries = 0, made = 0;
            while(made < branches && tries < branches*10){
                tries++;
                if(!trailTiles.length) break;
                const base = trailTiles[Math.floor(rand()*trailTiles.length)];
                let x = base.x, y = base.y;
                const len = lenMin + Math.floor(rand()*(lenMax-lenMin+1));
                // random start direction
                let dir = [[1,0],[-1,0],[0,1],[0,-1]][Math.floor(rand()*4)];
                for(let i=0;i<len;i++){
                    if(!inBounds(x,y)) break;
                    if(mapGrid[y][x] === 'water') break;
                    mapGrid[y][x] = 'trail';
                    // occasional gentle turn
                    if(rand()<0.35){
                        const turn = rand()<0.5 ? 1 : -1;
                        dir = (turn===1) ? [dir[1], -dir[0]] : [-dir[1], dir[0]]; // rotate 90°
                    }
                    x += dir[0]; y += dir[1];
                }
                made++;
            }
        }

        function overgrowTrailsRate(rate=0.2){
            const h = mapGrid.length, w = mapGrid[0].length;
            for(let y=0;y<h;y++){
                for(let x=0;x<w;x++){
                    if(mapGrid[y][x] === 'trail' && rand()<rate){
                        mapGrid[y][x] = 'forest';
                    }
                }
            }
        }

        // --- Rivers utilities ---
        function isWater(x,y){ return inBounds(x,y) && mapGrid[y][x] === 'water'; }
        function isLand(x,y){ return inBounds(x,y) && mapGrid[y][x] !== 'water'; }
        function edgeTargets(){
            const h = mapGrid.length, w = mapGrid[0].length;
            const pts = [];
            const steps = 6;
            for(let i=0;i<=steps;i++){
                const t = Math.floor(i*(w-1)/steps);
                pts.push({x:t,y:0}); pts.push({x:t,y:h-1});
            }
            for(let i=1;i<steps;i++){
                const t = Math.floor(i*(h-1)/steps);
                pts.push({x:0,y:t}); pts.push({x:w-1,y:t});
            }
            return pts;
        }
        function dist(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
        function stepToward(a,b){
            const dirs = [ {x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1} ];
            let best = {dx:0,dy:0, score: Infinity};
            for(const dvec of dirs){
                const nx = a.x + dvec.x, ny = a.y + dvec.y;
                if(!inBounds(nx,ny)) continue;
                const dGoal = dist({x:nx, y:ny}, b);
                const eHere = elevation[a.y]?.[a.x] ?? 0.5;
                const eNext = elevation[ny]?.[nx] ?? 0.5;
                const down = Math.max(0, eHere - eNext); // prefer flowing downhill
                const jitter = rand()*0.5;
                const score = dGoal - down*2 + jitter; // lower score is better
                if(score < best.score){ best = {dx:dvec.x, dy:dvec.y, score}; }
            }
            return {x:a.x+best.dx, y:a.y+best.dy};
        }
        function widenRiver(x,y){
            const around = [ [1,0],[-1,0],[0,1],[0,-1] ];
            for(const [dx,dy] of around){ if(rand()<0.45 && inBounds(x+dx,y+dy)) mapGrid[y+dy][x+dx] = 'water'; }
        }
        function carveRivers(count=2){
            const h = mapGrid.length, w = mapGrid[0].length;
            const sinks = edgeTargets();
            let attempts = 0, carved = 0;
            while(carved < count && attempts < count*20){
                attempts++;
                // inland start (favor middle)
                let x = Math.floor(w*0.2 + rand()*w*0.6);
                let y = Math.floor(h*0.2 + rand()*h*0.6);
                if(!inBounds(x,y) || mapGrid[y][x] === 'water') continue;

                const start = {x,y};
                // nearest border “sea” sink
                let sink = sinks[0], d0 = Infinity;
                for(const s of sinks){ const d = dist(start,s); if(d<d0){ d0=d; sink=s; } }

                let cur = start;
                const maxLen = Math.max(w,h)*2 + 20;
                for(let i=0;i<maxLen;i++){
                    if(!inBounds(cur.x,cur.y)) break;
                    mapGrid[cur.y][cur.x] = 'water';
                    // widen more as we approach the border (mouth)
                    const toEdge = Math.min(cur.x, cur.y, mapGrid[0].length-1-cur.x, mapGrid.length-1-cur.y);
                    const widenChance = (toEdge<5) ? 0.7 : 0.35;
                    if(rand()<widenChance) widenRiver(cur.x,cur.y);
                    if(cur.x===sink.x && cur.y===sink.y) break;
                    // if we meet an existing waterbody after a few steps, we stop
                    const touchesWater = [[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>isWater(cur.x+dx,cur.y+dy));
                    if(touchesWater && i>6) break;
                    cur = stepToward(cur, sink);
                }
                carved++;
            }
        }

        // Map Generation Logic
        function generateMap() {
            const seedVal = (document.getElementById('seed')?.value || '').trim();
            setSeed(seedVal || null);
            if (!updateTerrainProbabilities() || !validateTrailLengths()) return;

            const mapSize = parseInt(document.getElementById('mapSize').value);
            mapGrid = Array(mapSize).fill().map(() => Array(mapSize).fill('grass'));
            encounters = [];
            fitViewToMap();
            generateElevation(mapSize);

            for (let y = 0; y < mapSize; y++) {
                for (let x = 0; x < mapSize; x++) {
                    const r = rand();
                    let cumulativeProbability = 0;
                    for (const [terrain, probability] of Object.entries(terrainProbabilities)) {
                        cumulativeProbability += probability;
                        if (r < cumulativeProbability) {
                            mapGrid[y][x] = terrain;
                            break;
                        }
                    }
                }
            }

            if(document.getElementById('smoothToggle')?.checked){
                smoothTerrain(1);
            }
            thinDenseForests();

            pushState();
            createTrails(mapSize);
            renderMap();
        }

        function createTrails(mapSize) {
            const numTrails = parseInt(document.getElementById('numTrails').value);
            const minTrailLength = parseInt(document.getElementById('minTrailLength').value);
            const maxTrailLength = parseInt(document.getElementById('maxTrailLength').value);
            const startX = Math.floor(mapSize / 2);
            const startY = mapSize - 1;

            for (let i = 0; i < numTrails; i++) {
                const direction = ['n', 'e', 'w'][Math.floor(rand() * 3)];
                const length = minTrailLength + Math.floor(rand() * (maxTrailLength - minTrailLength + 1));
                createTrail(startX, startY, length, direction);
            }
        }

        function createTrail(x, y, length, direction) {
            if (length <= 0 || x < 0 || y < 0 || y >= mapGrid.length || x >= mapGrid[0].length) return;

            mapGrid[y][x] = 'trail';

            const dirs = {
                'n': [0, -1], 's': [0, 1], 'e': [1, 0], 'w': [-1, 0]
            };

            if (rand() < 0.2) {
                const newDir = ['n', 'e', 'w'][Math.floor(rand() * 3)];
                if (newDir !== direction) {
                    createTrail(x + dirs[newDir][0], y + dirs[newDir][1], length - 1, newDir);
                }
            }
            createTrail(x + dirs[direction][0], y + dirs[direction][1], length - 1, direction);
        }

        // Rendering Logic
        function renderMap() {
            const mapContainer = document.getElementById('map-container');
            const canvas = document.getElementById('mapCanvas');
            const context = canvas.getContext('2d');

            // Keep export canvas synced with full grid for PNG
            canvas.width = mapGrid[0].length * TILE_SIZE;
            canvas.height = mapGrid.length * TILE_SIZE;
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < mapGrid.length; y++) {
                for (let x = 0; x < mapGrid[0].length; x++) {
                    const key = spriteKeyFor(x, y, mapGrid[y][x]);
                    const img = IMAGES[key];
                    if (img && img.complete) {
                        context.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    }
                }
            }

            if (USE_CANVAS_VIEW) {
                // hide DOM grid when using canvas view
                mapContainer.style.display = 'none';
                renderViewport();
            } else {
                // Fallback: build DOM grid
                mapContainer.style.display = '';
                mapContainer.innerHTML = '';
                mapContainer.style.gridTemplateColumns = `repeat(${mapGrid[0].length}, ${TILE_SIZE}px)`;
                mapGrid.forEach((row, y) => {
                    row.forEach((tile, x) => {
                        const tileElement = document.createElement('div');
                        tileElement.className = 'tile';
                        tileElement.style.backgroundImage = `url('${TILE_SPRITES[tile]}')`;
                        if (selectedTiles.some(t => t.x === x && t.y === y)) {
                            tileElement.style.border = '1px dashed red';
                        }
                        tileElement.onclick = () => {
                            if (readOnly) return; // no edits in read-only
                            if (multiSelectMode) { toggleTileSelection(x, y); } else { handleTileClick(x, y); }
                        };
                        mapContainer.appendChild(tileElement);
                    });
                });
                addEncountersToMap();
            }

            // minimap always updates
            renderMinimap();
        }

        function renderViewport(){
            const vp = document.getElementById('viewport');
            if(!vp) return;
            const ctx = vp.getContext('2d');
            const z = view.zoom;
            const w = vp.width, h = vp.height;
            ctx.clearRect(0,0,w,h);

            // compute visible tile bounds in world space (pixels at base scale)
            const worldL = view.offsetX;
            const worldT = view.offsetY;
            const worldR = view.offsetX + w / z;
            const worldB = view.offsetY + h / z;

            const x0 = Math.floor(worldL / TILE_SIZE);
            const y0 = Math.floor(worldT / TILE_SIZE);
            const x1 = Math.ceil(worldR / TILE_SIZE);
            const y1 = Math.ceil(worldB / TILE_SIZE);

            for(let y = y0; y < y1; y++){
                if(y < 0 || y >= mapGrid.length) continue;
                for(let x = x0; x < x1; x++){
                    if(x < 0 || x >= mapGrid[0].length) continue;
                    const base = mapGrid[y][x];
                    const key = spriteKeyFor(x, y, base);
                    const img = IMAGES[key];
                    const sx = Math.floor((x * TILE_SIZE - view.offsetX) * z);
                    const sy = Math.floor((y * TILE_SIZE - view.offsetY) * z);
                    const sw = Math.ceil(TILE_SIZE * z);
                    const sh = Math.ceil(TILE_SIZE * z);

                    drawTileLOD(ctx, key, img, sx, sy, sw, sh, z, x, y);

                    // selection highlight
                    if (selectedTiles.some(t => t.x === x && t.y === y)) {
                        ctx.save();
                        ctx.strokeStyle = 'rgba(255,0,0,0.9)';
                        ctx.lineWidth = Math.max(1, 1.5 * z);
                        ctx.setLineDash([4*z, 3*z]);
                        ctx.strokeRect(sx+0.5, sy+0.5, sw-1, sh-1);
                        ctx.restore();
                    }
                }
            }

            // encounters overlay (red dots)
            ctx.fillStyle = 'rgba(200,0,0,0.85)';
            encounters.forEach(e => {
                const cx = (e.x * TILE_SIZE - view.offsetX + TILE_SIZE/2) * z;
                const cy = (e.y * TILE_SIZE - view.offsetY + TILE_SIZE/2) * z;
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(3, 3*z), 0, Math.PI*2);
                ctx.fill();
            });

            // draw labels (above tiles)
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = 'rgba(0,0,0,0.6)';
            ctx.lineWidth = 2;
            ctx.font = `${Math.max(10, 10*z)}px Arial`;
            labels.forEach(lb=>{
                const cx = (lb.x * TILE_SIZE - view.offsetX + TILE_SIZE/2) * z;
                const cy = (lb.y * TILE_SIZE - view.offsetY + TILE_SIZE/2) * z;
                ctx.strokeText(lb.text, cx+1, cy+1);
                ctx.fillText(lb.text, cx, cy);
            });

            // contours (optional)
            if(document.getElementById('contourToggle')?.checked){
                const step = 0.1; // every 0.1 elevation
                ctx.strokeStyle = 'rgba(255,255,255,0.25)';
                ctx.lineWidth = Math.max(1, 1*z);
                const H = elevation.length, W = elevation[0]?.length||0;
                for(let y=0;y<H;y++){
                    for(let x=0;x<W;x++){
                        const e = elevation[y][x];
                        const level = Math.round(e/step)*step;
                        // draw a small tick/short line to suggest contour
                        if(Math.abs(e-level) < 0.01){
                            const sx = Math.floor((x * TILE_SIZE - view.offsetX) * z);
                            const sy = Math.floor((y * TILE_SIZE - view.offsetY) * z);
                            ctx.beginPath();
                            ctx.moveTo(sx, sy);
                            ctx.lineTo(sx + Math.max(2, 3*z), sy);
                            ctx.stroke();
                        }
                    }
                }
            }

            // fog overlay
            if(fogEnabled && fogMask.length){
                ctx.save();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
                for(let y=y0; y<y1; y++){
                    if(y < 0 || y >= fogMask.length) continue;
                    for(let x=x0; x<x1; x++){
                        if(x < 0 || x >= fogMask[0].length) continue;
                        if(fogMask[y][x] !== 1) continue;
                        const sx = Math.floor((x * TILE_SIZE - view.offsetX) * z);
                        const sy = Math.floor((y * TILE_SIZE - view.offsetY) * z);
                        const sw = Math.ceil(TILE_SIZE * z);
                        const sh = Math.ceil(TILE_SIZE * z);
                        ctx.fillRect(sx, sy, sw, sh);
                    }
                }
                ctx.restore();
            }

            // measurement overlay
            if(measureMode && measureStart && measureEnd){
                const ax = (measureStart.x * TILE_SIZE - view.offsetX) * z;
                const ay = (measureStart.y * TILE_SIZE - view.offsetY) * z;
                const bx = (measureEnd.x * TILE_SIZE - view.offsetX) * z;
                const by = (measureEnd.y * TILE_SIZE - view.offsetY) * z;
                ctx.strokeStyle = 'rgba(255,255,0,0.9)';
                ctx.lineWidth = Math.max(2, 2*z);
                ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
                const dx = measureEnd.x - measureStart.x;
                const dy = measureEnd.y - measureStart.y;
                const distTiles = Math.hypot(dx, dy).toFixed(1);
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect((ax+bx)/2 + 6, (ay+by)/2 - 14, 60, 16);
                ctx.fillStyle = '#fff';
                ctx.font = `${Math.max(10, 10*z)}px Arial`;
                ctx.fillText(`${distTiles} tiles`, (ax+bx)/2 + 8, (ay+by)/2 - 2);
            }

            // scale bar (bottom-left)
            const pxPerTile = TILE_SIZE * z;
            let scaleTiles = 10;
            let scalePx = scaleTiles * pxPerTile;
            if(scalePx > 160){ scaleTiles = Math.max(1, Math.floor(160/pxPerTile)); scalePx = scaleTiles*pxPerTile; }
            const margin = 10;
            const yBase = vp.height - margin;
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fillRect(margin-1, yBase-6, scalePx+2, 8);
            ctx.fillStyle = 'rgba(0,0,0,0.85)';
            for(let i=0;i<scaleTiles;i++){
                const x0 = margin + i*pxPerTile;
                ctx.fillRect(x0, yBase-6, pxPerTile/2, 8);
            }
            ctx.font = `${Math.max(10, 10*z)}px Arial`;
            ctx.fillText(`${scaleTiles} tiles`, margin, yBase-10);
        }

        function initViewportInteractions(){
            const vp = document.getElementById('viewport');
            if(!vp) return;
            // wheel to zoom at cursor
vp.addEventListener('wheel', (e)=>{
  e.preventDefault();
  const rect = vp.getBoundingClientRect();
  const sx = e.clientX - rect.left;
  const sy = e.clientY - rect.top;
  const worldX = view.offsetX + sx / view.zoom;
  const worldY = view.offsetY + sy / view.zoom;
  const dir = e.deltaY < 0 ? 1/ZOOM_FACTOR : ZOOM_FACTOR;

  const minZ = calcMinZoom();
  const newZoom = clamp(view.zoom * dir, minZ, MAX_ZOOM);
  view.zoom = newZoom;

  view.offsetX = worldX - sx / view.zoom;
  view.offsetY = worldY - sy / view.zoom;

  ensureViewInBounds();
  renderViewport();
}, { passive:false });

            // drag to pan
            vp.addEventListener('mousedown', (e)=>{
                const rect = vp.getBoundingClientRect();
                const sx = e.clientX - rect.left;
                const sy = e.clientY - rect.top;
                const worldX = view.offsetX + sx / view.zoom;
                const worldY = view.offsetY + sy / view.zoom;
                if(fogEnabled && fogEditMode){
                    if(!fogPainting){
                        pushState();
                        fogPainting = true;
                    }
                    applyFogBrush(worldX / TILE_SIZE, worldY / TILE_SIZE);
                    renderViewport();
                    return;
                }
                view.dragging = true;
                view.dragStartX = e.clientX;
                view.dragStartY = e.clientY;
                if(measureMode){
                    measureStart = { x: worldX / TILE_SIZE, y: worldY / TILE_SIZE };
                    measureEnd = {...measureStart};
                }
            });
            window.addEventListener('mouseup', ()=>{ view.dragging = false; fogPainting = false; });
            window.addEventListener('mousemove', (e)=>{
  if(fogPainting){
      const rect = vp.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const worldX = view.offsetX + sx / view.zoom;
      const worldY = view.offsetY + sy / view.zoom;
      applyFogBrush(worldX / TILE_SIZE, worldY / TILE_SIZE);
      renderViewport();
      return;
  }
  if(!view.dragging) return;
  const dx = e.clientX - view.dragStartX;
  const dy = e.clientY - view.dragStartY;
  view.dragStartX = e.clientX;
  view.dragStartY = e.clientY;
  view.offsetX = view.offsetX - dx / view.zoom;
  view.offsetY = view.offsetY - dy / view.zoom;
  ensureViewInBounds();
  if(measureMode && measureStart){
      const rect = vp.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const worldX = view.offsetX + sx / view.zoom;
      const worldY = view.offsetY + sy / view.zoom;
      measureEnd = { x: worldX / TILE_SIZE, y: worldY / TILE_SIZE };
  }
  renderViewport();
});

            // click to interact with tiles
            vp.addEventListener('click', (e)=>{
                if(labelMode){
                    if (readOnly) return; // block label edits in read-only
                    const rect = vp.getBoundingClientRect();
                    const sx = e.clientX - rect.left;
                    const sy = e.clientY - rect.top;
                    const worldX = view.offsetX + sx / view.zoom;
                    const worldY = view.offsetY + sy / view.zoom;
                    const tx = Math.floor(worldX / TILE_SIZE);
                    const ty = Math.floor(worldY / TILE_SIZE);
                    if(inBounds(tx,ty)){
                        const text = prompt('Label text:');
                        if(text){ pushState(); labels.push({x:tx, y:ty, text}); renderViewport(); }
                    }
                    return; // do not fall through to edit/select
                }
                const rect = vp.getBoundingClientRect();
                const sx = e.clientX - rect.left;
                const sy = e.clientY - rect.top;
                const worldX = view.offsetX + sx / view.zoom;
                const worldY = view.offsetY + sy / view.zoom;
                const tx = Math.floor(worldX / TILE_SIZE);
                const ty = Math.floor(worldY / TILE_SIZE);
                if(!inBounds(tx,ty)) return;
                if(fogEnabled && fogEditMode) return;
                if (readOnly) return; // prevent edits while in read-only view
                if (multiSelectMode) { toggleTileSelection(tx, ty); } else { handleTileClick(tx, ty); }
            });

            // right-click to delete nearest label
            vp.addEventListener('contextmenu', (e)=>{
                e.preventDefault();
                if(readOnly) return;
                const rect = vp.getBoundingClientRect();
                const sx = e.clientX - rect.left;
                const sy = e.clientY - rect.top;
                const worldX = view.offsetX + sx / view.zoom;
                const worldY = view.offsetY + sy / view.zoom;
                let bestI = -1, bestD = 1e9;
                for(let i=0;i<labels.length;i++){
                    const lx = (labels[i].x + 0.5) * TILE_SIZE;
                    const ly = (labels[i].y + 0.5) * TILE_SIZE;
                    const d = Math.hypot(worldX - lx, worldY - ly);
                    if(d < bestD){ bestD = d; bestI = i; }
                }
                if(bestI !== -1 && bestD <= TILE_SIZE*0.6){
                    pushState();
                    labels.splice(bestI,1);
                    renderViewport();
                }
            });
        }

        function renderMinimap(){
            const mini = document.getElementById('minimap');
            if(!mini) return;
            const ctx = mini.getContext('2d');
            if(!mini._jumpHooked){
                mini._jumpHooked = true;
                mini.onclick = (e)=>{
                    const rect = mini.getBoundingClientRect();
                    const mx = (e.clientX - rect.left);
                    const my = (e.clientY - rect.top);
                    const sxLocal = mini.width / (mapGrid[0].length * TILE_SIZE);
                    const syLocal = mini.height / (mapGrid.length * TILE_SIZE);
                    const targetWorldX = (mx / sxLocal);
                    const targetWorldY = (my / syLocal);
                    view.offsetX = targetWorldX - (mini.width / (2*view.zoom));
                    view.offsetY = targetWorldY - (mini.height / (2*view.zoom));
                    ensureViewInBounds();
                    renderViewport();
                };
            }
            const h = mapGrid.length;
            const w = mapGrid[0].length;
            const sx = mini.width / (w * TILE_SIZE);
            const sy = mini.height / (h * TILE_SIZE);
            ctx.clearRect(0, 0, mini.width, mini.height);
            // draw scaled tiles from the preloaded sprite cache
            for(let y=0; y<h; y++){
                for(let x=0; x<w; x++){
                    const key = spriteKeyFor(x, y, mapGrid[y][x]);
                    const img = IMAGES[key];
                    if(!img || !img.complete) continue;
                    ctx.drawImage(img, x * TILE_SIZE * sx, y * TILE_SIZE * sy, TILE_SIZE * sx, TILE_SIZE * sy);
                }
            }
            // overlay encounters as small red dots
            ctx.fillStyle = 'rgba(200,0,0,0.85)';
            encounters.forEach(({x,y}) => {
                ctx.beginPath();
                ctx.arc((x + 0.5) * TILE_SIZE * sx, (y + 0.5) * TILE_SIZE * sy, Math.max(2, 2 * sx * TILE_SIZE), 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function handleTileClick(x, y) {
            if (readOnly) return;
            pushState();
            if (mapGrid[y][x] === 'structure') {
                mapGrid[y][x] = 'grass';  // Remove structure
            } else if (['grass', 'trail', 'forest', 'rocky', 'water'].includes(mapGrid[y][x])) {
                addPointOfInterest(x, y);
            }
            renderMap();
        }

        function addEncountersToMap() {
            if (USE_CANVAS_VIEW) return; // encounters are drawn in renderViewport()
            const mapContainer = document.getElementById('map-container');
            encounters.forEach(({ x, y }, index) => {
                const encounterElement = document.createElement('div');
                encounterElement.className = 'encounter';
                encounterElement.onclick = () => {
                    if (readOnly) return;
                    if (confirm(`Do you want to remove the encounter at (${x}, ${y})?`)) {
                        pushState();
                        encounters.splice(index, 1);
                        renderMap();
                    }
                };
                const indexInMap = y * mapGrid[0].length + x;
                mapContainer.children[indexInMap].appendChild(encounterElement);
            });
        }

        function toggleTileSelection(x, y) {
            if (readOnly) return;
            const index = selectedTiles.findIndex(tile => tile.x === x && tile.y === y);
            if (index > -1) {
                selectedTiles.splice(index, 1);  // Deselect the tile
            } else {
                selectedTiles.push({ x, y });  // Select the tile
            }
            renderMap();  // Re-render to show selection
        }

        function changeSelectedTilesTerrain() {
            if (readOnly) return;
            pushState();
            const terrain = document.getElementById('terrainDropdown').value;
            selectedTiles.forEach(({ x, y }) => {
                mapGrid[y][x] = terrain;
            });
            selectedTiles = [];  // Clear the selection
            renderMap();  // Re-render the map
        }

        function addPointOfInterest(x, y) {
            if (x === undefined || y === undefined) {
                alert("Click on the map to add a point of interest.");
                return;
            }
            mapGrid[y][x] = 'structure';
            renderMap();
        }

        function getActiveCharacterKey() {
            const name = document.getElementById('characterName')?.value?.trim();
            return name || 'default';
        }

        function readStoredMaps() {
            try {
                const raw = localStorage.getItem(MAP_STORAGE_KEY);
                return raw ? JSON.parse(raw) : {};
            } catch (err) {
                console.warn('Unable to parse stored maps', err);
                return {};
            }
        }

        function writeStoredMaps(payload) {
            localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(payload));
        }

        function serializeMapState() {
            ensureFogSize();
            return {
                mapGrid: mapGrid.map(row => row.slice()),
                encounters: encounters.map(e => ({ x: e.x, y: e.y })),
                labels: labels.map(lb => ({ x: lb.x, y: lb.y, text: lb.text })),
                fogMask: fogMask.map(row => row.slice()),
                terrainProbabilities: { ...terrainProbabilities },
                settings: {
                    mapSize: document.getElementById('mapSize')?.value || '20',
                    numTrails: document.getElementById('numTrails')?.value || '1',
                    minTrailLength: document.getElementById('minTrailLength')?.value || '0',
                    maxTrailLength: document.getElementById('maxTrailLength')?.value || '0',
                    seed: document.getElementById('seed')?.value || '',
                    smooth: !!document.getElementById('smoothToggle')?.checked,
                    contour: !!document.getElementById('contourToggle')?.checked
                }
            };
        }

        function applyStoredSettings(settings = {}) {
            const applyValue = (id, value) => {
                const el = document.getElementById(id);
                if (!el || value === undefined) return;
                el.value = value;
            };
            applyValue('mapSize', settings.mapSize);
            applyValue('numTrails', settings.numTrails);
            applyValue('minTrailLength', settings.minTrailLength);
            applyValue('maxTrailLength', settings.maxTrailLength);
            applyValue('seed', settings.seed);

            const smoothToggle = document.getElementById('smoothToggle');
            if (smoothToggle && typeof settings.smooth === 'boolean') {
                smoothToggle.checked = settings.smooth;
            }
            const contourToggle = document.getElementById('contourToggle');
            if (contourToggle && typeof settings.contour === 'boolean') {
                contourToggle.checked = settings.contour;
            }
        }

        function applyStoredMapState(data) {
            if (!data) return;
            if (Array.isArray(data.mapGrid)) {
                mapGrid = data.mapGrid.map(row => row.slice());
            }
            if (Array.isArray(data.encounters)) {
                encounters = data.encounters.map(e => ({ x: e.x, y: e.y }));
            }
            if (Array.isArray(data.labels)) {
                labels = data.labels.map(lb => ({ x: lb.x, y: lb.y, text: lb.text }));
            }
            if (Array.isArray(data.fogMask)) {
                fogMask = data.fogMask.map(row => row.slice());
            }
            if (data.terrainProbabilities) {
                Object.assign(terrainProbabilities, data.terrainProbabilities);
                createTerrainProbabilityInputs();
            }
            applyStoredSettings(data.settings);
            selectedTiles = [];
            ensureFogSize();
        }

        // Save/Load Functions
        function saveMap() {
            const key = getActiveCharacterKey();
            const stored = readStoredMaps();
            stored[key] = serializeMapState();
            writeStoredMaps(stored);
            alert(`Map saved${key === 'default' ? '' : ` for ${key}`}!`);
        }

        function loadMap() {
            const key = getActiveCharacterKey();
            const stored = readStoredMaps();
            let payload = stored[key];
            if (!payload && key !== 'default') {
                payload = stored['default'];
            }
            if (!payload) {
                const legacyGrid = localStorage.getItem('savedMap');
                if (legacyGrid) {
                    try {
                        payload = {
                            mapGrid: JSON.parse(legacyGrid),
                            encounters: JSON.parse(localStorage.getItem('savedEncounters') || '[]')
                        };
                        stored[key] = payload;
                        writeStoredMaps(stored);
                    } catch (err) {
                        console.warn('Failed to load legacy map data', err);
                    }
                }
            }
            if (!payload) {
                alert('No saved map found for this character!');
                return;
            }
            applyStoredMapState(payload);
            fitViewToMap();
            renderMap();
            renderViewport();
            renderMinimap();
            pushState();
            alert(`Map loaded${key === 'default' ? '' : ` for ${key}`}!`);
        }

        function downloadMap() {
            // force a fresh draw to the canvas before exporting
            renderMap();
            const canvas = document.getElementById('mapCanvas');
            const link = document.createElement('a');
            link.download = 'map.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
        
        function setMappyPlayerViewMode(isPlayer) {
            IS_PLAYER_VIEW = !!isPlayer;
            window.IS_PLAYER_VIEW = IS_PLAYER_VIEW;
            if (!mappyInitialized) {
                return;
            }
            const readOnlyToggle = document.getElementById('readOnlyToggle');
            if (readOnlyToggle) {
                if (IS_PLAYER_VIEW) {
                    dmReadOnlyPreference = !!readOnlyToggle.checked;
                    readOnlyToggle.checked = true;
                    readOnlyToggle.disabled = true;
                } else {
                    readOnlyToggle.disabled = false;
                    readOnlyToggle.checked = dmReadOnlyPreference;
                }
            }
            const advToggle = document.getElementById('toggle-controls');
            if (advToggle) {
                advToggle.disabled = IS_PLAYER_VIEW;
                if (IS_PLAYER_VIEW && advToggle.checked) {
                    advToggle.checked = false;
                }
                toggleControls();
            }
            toggleReadOnly();
            toggleFogEnabled();
            toggleFogEditMode();
        }
        
        function initializeMappy() {
            const container = document.getElementById('map-container');
            if (!container || mappyInitialized) {
                return;
            }
            mappyInitialized = true;
            const preloadedPlayerState = IS_PLAYER_VIEW ? loadPlayerViewState() : null;
            wireMappyControls();
            preloadSprites(() => {
                createTerrainProbabilityInputs();
                populateTerrainDropdown();
                if(preloadedPlayerState){
                    applyStoredMapState(preloadedPlayerState);
                    if (Array.isArray(preloadedPlayerState.fogMask)) {
                        fogMask = preloadedPlayerState.fogMask.map(row => row.slice());
                    }
                    fogEnabled = !!preloadedPlayerState.fogEnabled;
                    ensureFogSize();
                } else {
                    generateMap();
                }
                fitViewToMap();
                pushState();
                initViewportInteractions();
                renderViewport();
                toggleReadOnly(); // sync initial UI state (unchecked => not read-only)
                if(!IS_PLAYER_VIEW){
                    toggleMeasureMode();
                    toggleLabelMode();
                    toggleFogEnabled();
                    toggleFogEditMode();
                } else {
                    toggleFogEnabled();
                }
                setMappyPlayerViewMode(IS_PLAYER_VIEW);
            });
        }

        window.setMappyPlayerViewMode = setMappyPlayerViewMode;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeMappy);
        } else {
            initializeMappy();
        }
