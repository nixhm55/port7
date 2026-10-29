export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  statusNote: string;
  layoutType: 'wide-asymmetric' | 'narrow-vertical' | 'expanding-frame' | 'perspective-editorial';
  description: string;
  challenge: string;
  spatialApproach: string;
  deliverables: string[];
  metricsOrNotes: string;
  livePreviewLabel: string;
  livePreviewAnchor: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  visualComposition: {
    aspectRatio: string;
    caption: string;
    architecturalMotif: 'aperture' | 'monolith' | 'axis' | 'strata';
    svgOverlayText: string;
  };
}

export interface FeaturedStoryChapter {
  id: string;
  step: string;
  label: string;
  heading: string;
  body: string;
  caption: string;
  aspectState: 'portrait' | 'panoramic' | 'architectural';
  toneNote: string;
}

export interface DisciplineItem {
  index: string;
  title: string;
  focus: string;
  summary: string;
  capabilities: string[];
}

export interface MilestoneItem {
  phase: string;
  periodPlaceholder: string;
  title: string;
  contextNote: string;
  description: string;
  artifactTag: string;
}

export interface ArchiveStudyItem {
  code: string;
  title: string;
  medium: string;
  yearPlaceholder: string;
  note: string;
  motif: 'grid-shift' | 'clip-plane' | 'type-tension' | 'depth-study';
}

export const SITE_IDENTITY = {
  name: 'Nisam',
  editionLabel: 'EDITION 01 — DIGITAL PORTFOLIO & SPATIAL ARCHIVE',
  availabilityLabel: 'STATUS: AVAILABLE FOR SELECTED CREATIVE DIRECTION & COMMISSIONS (EDITABLE)',
  rolePlaceholder: 'Multidisciplinary Creative Practice — Direction, Spatial Interface & Editorial Systems',
  heroHeadline: {
    topLine: 'Quiet',
    middleLine: 'Spatial',
    bottomLine: 'Precision.',
  },
  heroSubcopy:
    'An art-directed digital monograph for Nisam. Exploring how typography, measured negative space, and choreographed motion transform flat screens into tactile architectural environments.',
  editorialDisclaimer:
    'Note: All project studies, dates, and practice milestones below are structured as replaceable demonstration templates so real biographical and client details can be updated without altering the motion architecture.',
  contactEmail: 'hello@Nisam.studio',
  locationPlaceholder: 'Location / Timezone — Configurable Placeholder',
  socials: [
    { label: 'Are.na (Placeholder)', href: '#contact', handle: '@Nisam-archive' },
    { label: 'Instagram (Placeholder)', href: '#contact', handle: '@Nisam.studio' },
    { label: 'Read.cv / Monograph (Placeholder)', href: '#contact', handle: 'cv / Nisam' },
    { label: 'GitHub / Code Studies (Placeholder)', href: '#contact', handle: 'github / Nisam' },
  ],
};

export const INTRO_STATEMENT = {
  index: '01 / MANIFESTO',
  leadLines: [
    'Motion is not decoration',
    'applied after layout;',
    'it is the spatial grammar',
    'that gives structure breath.',
  ],
  supportingParagraph:
    'Designed around restraint rather than spectacle, this portfolio treats scrolling as camera movement through an editorial gallery. Every shift in scale, clipping plane, and typographic tension is calibrated to guide attention without visual noise.',
  metrics: [
    { label: 'TYPOGRAPHIC HIERARCHY', value: 'Editorial Serif + Neo-Grotesque + Technical Mono' },
    { label: 'SPATIAL DEPTH', value: 'Multi-Plane Parallax, Mask Choreography & Perspective Planes' },
    { label: 'CONTENT ARCHITECTURE', value: 'Modular & Replaceable Demonstration Data' },
  ],
};

export const ABOUT_CONTENT = {
  index: '02 / ABOUT Nisam',
  headingLines: ['Between editorial stillness', 'and kinetic response.'],
  portraitCaption: 'FIG. 01 — Spatial Portrait Placeholder / Replaceable Studio Plate',
  leadCopy:
    'Nisam approaches digital environments as living editorial publications—where the relationship between a headline, an image frame, and the surrounding silence carries as much weight as the content itself.',
  secondaryCopy:
    'Rather than relying on heavy decorative 3D objects or visual excess, the work centers on timing, proportion, and tactile responsiveness. Interfaces are composed so every entrance feels deliberate and every transition preserves spatial continuity.',
  editableNote:
    'Biographical Note (Editable Template): This section is intentionally written without invented employers, degrees, or personal history. Replace these paragraphs with Nisam’s direct biography, studio statement, or curatorial focus.',
  principles: [
    {
      code: 'P.01',
      title: 'Deliberate Empty Space',
      detail: 'Allowing negative space to act as an active structural element so typography and motion can breathe.',
    },
    {
      code: 'P.02',
      title: 'Choreographed Depth',
      detail: 'Creating three-dimensional presence through layered planes, mask velocity, and subtle perspective shifts.',
    },
    {
      code: 'P.03',
      title: 'Tactile Restraint',
      detail: 'Ensuring every micro-interaction responds with physical clarity while respecting readability and calm.',
    },
  ],
};

export const SELECTED_PROJECTS: ProjectItem[] = [
  {
    id: 'project-atelier-kuro',
    index: '01',
    title: 'Atelier Mono / Spatial Monograph',
    subtitle: 'Editorial Exhibition & Kinetic Archive (Demonstration Study)',
    category: 'Art Direction / Motion Architecture',
    year: '2026 — Editable',
    statusNote: 'Replaceable Demonstration Project 01',
    layoutType: 'wide-asymmetric',
    description:
      'A digital exhibition system designed around vertical shutter masks and synchronized typographic counter-movement, allowing architectural photography to unfold at a measured reading pace.',
    challenge:
      'Conventional masonry grids flatten architectural scale. The objective was to let each photograph command its own spatial volume while keeping navigation effortless on a single continuous canvas.',
    spatialApproach:
      'Implemented dual-velocity clipping frames where the outer aperture expands vertically while the inner plate translates along a counter-axis with subtle perspective depth.',
    deliverables: [
      'Design System & Typographic Scale',
      'Scroll-Linked Aperture Transitions',
      'Exhibition Index & Reading Mode',
    ],
    metricsOrNotes: 'Demonstration template — replace with actual client metrics, live URL, and production photography.',
    livePreviewLabel: 'Inspect Exhibition Study',
    livePreviewAnchor: '#featured-story',
    palette: {
      primary: '#191817',
      secondary: '#D9D4CC',
      accent: '#C84B31',
    },
    visualComposition: {
      aspectRatio: '16 / 10',
      caption: 'PLATE 01 — Vertical Mask & Counter-Parallax Study (Sample Visual)',
      architecturalMotif: 'aperture',
      svgOverlayText: 'ATELIER MONO // SPATIAL PLATE I',
    },
  },
  {
    id: 'project-kinetic-type-foundry',
    index: '02',
    title: 'Verbum / Variable Type Specimen',
    subtitle: 'Interactive Editorial Specimen & Reading System (Demonstration Study)',
    category: 'Editorial Typography / Interaction Design',
    year: '2025 — Editable',
    statusNote: 'Replaceable Demonstration Project 02',
    layoutType: 'narrow-vertical',
    description:
      'An interactive specimen exploring optical size, weight distribution, and horizontal line choreography as the reader traverses dense and open editorial spreads.',
    challenge:
      'Type specimens often overwhelm visitors with static glyph tables or chaotic animations that obscure letterform proportions.',
    spatialApproach:
      'Paired lateral sliding baselines with pinned marginalia, enabling readers to inspect micro-typography alongside oversized display forms in real time.',
    deliverables: [
      'Interactive Specimen Architecture',
      'Custom Kinetic Baseline Engine',
      'Editorial Marginalia System',
    ],
    metricsOrNotes: 'Demonstration template — replace with actual project specifications and live link.',
    livePreviewLabel: 'Inspect Specimen Study',
    livePreviewAnchor: '#archive',
    palette: {
      primary: '#232220',
      secondary: '#EAE5DD',
      accent: '#B84A32',
    },
    visualComposition: {
      aspectRatio: '4 / 5',
      caption: 'PLATE 02 — Horizontal Axis & Optical Proportion Study (Sample Visual)',
      architecturalMotif: 'axis',
      svgOverlayText: 'VERBUM // SPECIMEN 02',
    },
  },
  {
    id: 'project-solstice-pavilion',
    index: '03',
    title: 'Solstice / Acoustic Pavilion',
    subtitle: 'Spatial Sound & Light Documentation (Demonstration Study)',
    category: 'Creative Direction / Digital Experience',
    year: '2025 — Editable',
    statusNote: 'Replaceable Demonstration Project 03',
    layoutType: 'expanding-frame',
    description:
      'A sensory documentation site that translates shifting daylight and acoustic resonance into expanding visual frames and layered translucent planes.',
    challenge:
      'Communicating physical acoustics and changing natural light inside a browser without resorting to heavy WebGL gimmicks.',
    spatialApproach:
      'Used progressive frame expansion and layered SVG depth contours that respond to scroll velocity and pointer position.',
    deliverables: [
      'Visual Direction & Spatial Storyboard',
      'Progressive Frame Choreography',
      'Responsive Mobile Adaptation',
    ],
    metricsOrNotes: 'Demonstration template — replace with actual project assets and credits.',
    livePreviewLabel: 'Inspect Pavilion Study',
    livePreviewAnchor: '#approach',
    palette: {
      primary: '#141413',
      secondary: '#CFC9BF',
      accent: '#C84B31',
    },
    visualComposition: {
      aspectRatio: '21 / 11',
      caption: 'PLATE 03 — Expanding Aperture & Acoustic Strata (Sample Visual)',
      architecturalMotif: 'strata',
      svgOverlayText: 'SOLSTICE // PAVILION ARCHIVE',
    },
  },
  {
    id: 'project-forma-index',
    index: '04',
    title: 'Forma / Curatorial Object Index',
    subtitle: 'Tactile Catalog & Spatial Filtering System (Demonstration Study)',
    category: 'Interface Architecture / Design Systems',
    year: '2024 — Editable',
    statusNote: 'Replaceable Demonstration Project 04',
    layoutType: 'perspective-editorial',
    description:
      'A minimalist catalog for industrial design objects where index rows transform seamlessly into multi-angle spatial inspection sheets.',
    challenge:
      'Bridging the precision of an archival spreadsheet with the emotional resonance of an art book.',
    spatialApproach:
      'Introduced subtle 3D perspective planes (`rotateX` / `rotateY` / `translateZ`) that tilt compositions gently into alignment as they cross the viewport center.',
    deliverables: [
      'Archival Grid & Index System',
      'Perspective Plane Transitions',
      'Accessible Keyboard Navigation',
    ],
    metricsOrNotes: 'Demonstration template — replace with actual catalog links and case notes.',
    livePreviewLabel: 'Inspect Catalog Study',
    livePreviewAnchor: '#journey',
    palette: {
      primary: '#1E1D1B',
      secondary: '#E2DDD4',
      accent: '#A83F28',
    },
    visualComposition: {
      aspectRatio: '5 / 4',
      caption: 'PLATE 04 — Perspective Plane & Archival Index (Sample Visual)',
      architecturalMotif: 'monolith',
      svgOverlayText: 'FORMA // OBJECT INDEX 04',
    },
  },
];

export const FEATURED_STORY = {
  index: '04 / FEATURED VISUAL STORY',
  badge: 'DEEP DIVE CASE STUDY (REPLACEABLE DEMONSTRATION)',
  title: 'Nocturne — Architecture of Silence',
  subtitle: 'A scroll-linked spatial narrative exploring light, proportion, and frame transformation.',
  year: '2026 — Editable Demonstration',
  role: 'Creative Direction, Spatial Motion & Frontend Architecture (Sample)',
  overview:
    'This featured sequence demonstrates how a single-page portfolio can host an immersive editorial story. As you scroll, the visual frame expands from a compressed vertical aperture into a full architectural stage while narrative chapters progress alongside it.',
  chapters: [
    {
      id: 'chapter-01',
      step: 'I / APERTURE',
      label: 'THE INITIAL THRESHOLD',
      heading: 'Compression before expansion.',
      body:
        'Every spatial experience begins with restraint. By constraining the initial viewport into a narrow vertical column, the eye focuses on proportion and edge tension before the full composition reveals itself.',
      caption: 'STAGE 01 — Narrow architectural aperture (42% width) with counter-moving inner plane.',
      aspectState: 'portrait',
      toneNote: 'Focal Depth: 600px Perspective',
    },
    {
      id: 'chapter-02',
      step: 'II / EXPANSION',
      label: 'SPATIAL UNFOLDING',
      heading: 'The frame opens in response to movement.',
      body:
        'As scroll progress advances, the outer clipping mask widens smoothly across the grid while internal layers shift along independent horizontal and vertical axes—creating depth without a single 3D mesh.',
      caption: 'STAGE 02 — Panoramic expansion (86% width) with synchronized typographic shift.',
      aspectState: 'panoramic',
      toneNote: 'Parallax Ratio: 1 : 1.35',
    },
    {
      id: 'chapter-03',
      step: 'III / RESOLUTION',
      label: 'ARCHITECTURAL STILLNESS',
      heading: 'Settling into balanced equilibrium.',
      body:
        'At full resolution, foreground metadata, structural grid lines, and atmospheric light planes align into a quiet editorial spread before releasing smoothly back into the main portfolio flow.',
      caption: 'STAGE 03 — Full architectural stage with resolved typographic layers.',
      aspectState: 'architectural',
      toneNote: 'Resolution State: Locked & Readable',
    },
  ] as FeaturedStoryChapter[],
};

export const APPROACH_DISCIPLINES: DisciplineItem[] = [
  {
    index: 'D.01',
    title: 'Creative & Editorial Direction',
    focus: 'Visual Identity / Art Direction / Spatial Pacing',
    summary:
      'Translating conceptual narratives into cohesive digital environments through restrained color systems, asymmetric grids, and typographic contrast.',
    capabilities: [
      'Editorial Grid Architecture',
      'Typographic Direction & Pairing',
      'Visual Rhythm & Scene Pacing',
    ],
  },
  {
    index: 'D.02',
    title: 'Spatial Motion & Choreography',
    focus: 'Scroll-Linked Systems / Masking / Depth',
    summary:
      'Designing motion with clear physical intent—using velocity, clipping masks, layered parallax, and perspective planes so interfaces feel three-dimensional.',
    capabilities: [
      'GSAP & ScrollTrigger Choreography',
      'Multi-Plane Depth & Perspective',
      'Micro-Interaction Polish',
    ],
  },
  {
    index: 'D.03',
    title: 'Interactive Frontend Engineering',
    focus: 'Component Architecture / Performance / Accessibility',
    summary:
      'Building resilient, maintainable codebases where complex animations run smoothly at 60fps, respect reduced-motion preferences, and adapt across devices.',
    capabilities: [
      'React & TypeScript Systems',
      'GPU-Accelerated CSS Transforms',
      'Responsive & Accessible Semantics',
    ],
  },
  {
    index: 'D.04',
    title: 'Design Systems & Living Archives',
    focus: 'Design Tokens / Modular Content / Scalability',
    summary:
      'Structuring design tokens and separation of data from presentation so portfolios, exhibitions, and brand systems evolve cleanly over time.',
    capabilities: [
      'CSS Custom Property Tokens',
      'Reusable Motion Primitives',
      'Structured Content Schemas',
    ],
  },
];

export const JOURNEY_MILESTONES: MilestoneItem[] = [
  {
    phase: 'PHASE 01',
    periodPlaceholder: 'TIMELINE SLOT 01 (EDITABLE)',
    title: 'Foundations in Visual Composition & Typography',
    contextNote: 'Replaceable Milestone Placeholder',
    description:
      'Exploration of grid systems, negative space, and editorial hierarchy. Replace this entry with Nisam’s formative design focus, studio origins, or early creative milestones.',
    artifactTag: 'TYPOGRAPHIC SYSTEMS',
  },
  {
    phase: 'PHASE 02',
    periodPlaceholder: 'TIMELINE SLOT 02 (EDITABLE)',
    title: 'Transition from Static Layouts to Kinetic Interfaces',
    contextNote: 'Replaceable Milestone Placeholder',
    description:
      'Integrating timeline choreography, scroll-linked transitions, and spatial masking to bridge graphic design precision with interactive engineering.',
    artifactTag: 'KINETIC ARCHITECTURE',
  },
  {
    phase: 'PHASE 03',
    periodPlaceholder: 'TIMELINE SLOT 03 (EDITABLE)',
    title: 'Independent Creative Direction & Spatial Web Systems',
    contextNote: 'Replaceable Milestone Placeholder',
    description:
      'Crafting bespoke digital experiences, exhibition sites, and cohesive design systems. Update this slot with specific collaborations, exhibitions, or independent launches.',
    artifactTag: 'CURRENT PRACTICE',
  },
];

export const ARCHIVE_STUDIES: ArchiveStudyItem[] = [
  {
    code: 'ARC — 01',
    title: 'Perspective Plane Study I',
    medium: 'CSS 3D Transform / Scroll Velocity',
    yearPlaceholder: '2026 (Sample)',
    note: 'Investigating subtle X/Y rotation limits that preserve crisp subpixel text rendering.',
    motif: 'depth-study',
  },
  {
    code: 'ARC — 02',
    title: 'Dual-Shutter Aperture Mask',
    medium: 'Clip-Path Choreography',
    yearPlaceholder: '2025 (Sample)',
    note: 'Opposing inset masks opening at asymmetric cubic-bezier curves.',
    motif: 'clip-plane',
  },
  {
    code: 'ARC — 03',
    title: 'Optical Margin & Counter-Scroll',
    medium: 'Editorial Typography Study',
    yearPlaceholder: '2025 (Sample)',
    note: 'Anchoring marginalia while display headlines drift horizontally.',
    motif: 'type-tension',
  },
  {
    code: 'ARC — 04',
    title: 'Modular Grid Tension IV',
    medium: 'Asymmetric Layout System',
    yearPlaceholder: '2024 (Sample)',
    note: 'Balancing 12-column architectural divisions with intentional empty columns.',
    motif: 'grid-shift',
  },
];
