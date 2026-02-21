import { Chapter } from "./javaContent";

export const cssChapters: Chapter[] = [
    {
        id: 1,
        slug: "modern-box-model",
        title: "Advanced Box Model & Sizing",
        description: "Mastering margin-collapse, box-sizing, and intrinsic vs extrinsic sizing.",
        sections: [
            {
                heading: "The Box Model Deep Dive",
                content: "Every element in CSS is a rectangular box. Understanding how `padding`, `border`, and `margin` interact is crucial for layout precision.",
                code: `.card {
  box-sizing: border-box; /* Standard Industry Practice */
  width: 100%;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  margin-block: 1.5rem; /* Logical properties */
}`,
                codeTitle: "box-model.css",
                note: "Always use `box-sizing: border-box` to ensure padding and borders are included in the element's total width/height."
            },
            {
                heading: "Logical Properties",
                content: "Modern CSS uses logical properties (like `margin-inline` or `padding-block`) instead of physical properties (like `margin-left` or `padding-top`) to better support RTL (Right-to-Left) languages.",
                code: `.hero {
  padding-inline: 20px; /* Adapts to text direction */
  margin-block-start: 10px;
}`,
                codeTitle: "logical.css"
            }
        ]
    },
    {
        id: 2,
        slug: "flexbox-mastery",
        title: "Flexbox Layout Mastery",
        description: "Responsive alignment and distribution with CSS Flexible Box Layout.",
        sections: [
            {
                heading: "One-Dimensional Layouts",
                content: "Flexbox is designed for layouts in a single dimension (either a row or a column). It's perfect for headers, navigation bars, and centering items.",
                code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.nav-item {
  flex: 1; /* Grow to fill space equally */
}`,
                codeTitle: "flex-layout.css"
            },
            {
                heading: "Centering with Flexbox",
                content: "The easiest way to center an element both horizontally and vertically.",
                code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
                codeTitle: "centering.css"
            }
        ]
    },
    {
        id: 3,
        slug: "css-grid",
        title: "CSS Grid Architecture",
        description: "Building complex, two-dimensional layouts with Grid areas and templates.",
        sections: [
            {
                heading: "Two-Dimensional Layouts",
                content: "Grid allows you to define both rows and columns. Use `grid-template-areas` for clean, semantic layout definitions.",
                code: `.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

header { grid-area: header; }
main { grid-area: main; }
aside { grid-area: sidebar; }
footer { grid-area: footer; }`,
                codeTitle: "grid-areas.css"
            },
            {
                heading: "The 'repeat' and 'minmax' functions",
                content: "Create responsive grids without media queries using `auto-fit` or `auto-fill`.",
                code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}`,
                codeTitle: "responsive-grid.css"
            }
        ]
    },
    {
        id: 4,
        slug: "responsive-design",
        title: "Responsive Web Design (RWD)",
        description: "Media queries, container queries, and the fluid typography approach.",
        sections: [
            {
                heading: "Modern Media Queries",
                content: "Use the newer range syntax for more readable media queries.",
                code: `/* Legacy way */
@media (max-width: 600px) { ... }

/* Modern way */
@media (width <= 600px) { ... }`,
                codeTitle: "media-queries.css"
            },
            {
                heading: "Container Queries",
                content: "A game-changer for component-based architecture. Style components based on their parent container's size rather than the viewport.",
                code: `.parent {
  container-type: inline-size;
}

@container (width > 400px) {
  .child {
    display: flex;
  }
}`,
                codeTitle: "container-queries.css"
            }
        ]
    },
    {
        id: 5,
        slug: "css-variables-theming",
        title: "Variables & Theming",
        description: "Design systems with CSS Custom Properties and Dark Mode implementation.",
        sections: [
            {
                heading: "Power of CSS Variables",
                content: "Variables make your CSS maintainable and allow for dynamic theming via JavaScript.",
                code: `:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --surface: #ffffff;
}

[data-theme='dark'] {
  --surface: #1a1b26;
  --text: #ffffff;
}

.button {
  background-color: var(--primary-color);
}`,
                codeTitle: "theming.css"
            }
        ]
    },
    {
        id: 6,
        slug: "animations-transitions",
        title: "Animations & Micro-interactions",
        description: "Smooth UI transitions and performance-optimized @keyframes.",
        sections: [
            {
                heading: "High-Performance Animations",
                content: "Always animate `transform` and `opacity` to avoid layout thrashing and utilize GPU acceleration.",
                code: `@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-in {
  animation: slideIn 0.5s ease-out forwards;
}`,
                codeTitle: "animations.css"
            },
            {
                heading: "Transitions",
                content: "Subtle hover effects for better UX.",
                code: `.btn {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
  transform: scale(1.05);
}`,
                codeTitle: "transitions.css"
            }
        ]
    },
    {
        id: 7,
        slug: "selectors-specificity",
        title: "Advanced Selectors & specificity",
        description: "Understanding BEM, cascading layers, and specialized pseudo-selectors.",
        sections: [
            {
                heading: "The Cascade & Layers",
                content: "CSS Cascade Layers (@layer) allow you to explicitly manage the hierarchy of CSS rules, solving specificity wars.",
                code: `@layer base, components, utilities;

@layer components {
  .btn {
    padding: 10px;
  }
}`,
                codeTitle: "layers.css"
            },
            {
                heading: "Pseudo-selectors",
                content: "Use `:has()`, `:is()`, and `:where()` to write more efficient and powerful CSS.",
                code: `/* Style card only if it has an image */
.card:has(img) {
  padding: 0;
}

/* Grouping selectors without adding specificity */
:where(h1, h2, h3) {
  margin-top: 1em;
}`,
                codeTitle: "selectors.css"
            }
        ]
    }
];
