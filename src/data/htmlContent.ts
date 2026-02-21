import { Chapter } from "./javaContent";

export const htmlChapters: Chapter[] = [
    {
        id: 1,
        slug: "modern-html-semantics",
        title: "Modern HTML5 & Semantic Web",
        description: "Beyond <div> and <span> - Building meaningful document structures.",
        sections: [
            {
                heading: "The Power of Semantic HTML",
                content: "Semantic HTML is the foundation of accessible and SEO-friendly web development. It uses tags that describe the meaning of the content rather than just its appearance.",
                code: `<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/tutorials">Tutorials</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>The Impact of Semantics</h1>
    <p>Using <section>, <aside>, and <figure> helps search engines and screen readers.</p>
  </article>
</main>
<footer>
  <p>&copy; 2024 Techmiya EdTech</p>
</footer>`,
                codeTitle: "semantics.html"
            },
            {
                heading: "Why It Matters for Industry",
                content: "Industry-level projects prioritize SEO and Accessibility (a11y). Semantic tags allow search engines to index your content accurately and help assistive technologies navigate your site.",
                note: "Never use a <div> for a button. Use <button> to ensure keyboard focus and screen reader compatibility."
            }
        ]
    },
    {
        id: 2,
        slug: "seo-metadata",
        title: "Advanced Metadata & SEO",
        description: "Optimizing for Search Engines and Social Media sharing.",
        sections: [
            {
                heading: "The <head> section",
                content: "A well-optimized head section is crucial for ranking. This includes Meta descriptions, Open Graph (OG) tags for Facebook, and Twitter Cards.",
                code: `<!-- Standard SEO -->
<title>HTML Mastery | Techmiya</title>
<meta name="description" content="Master industrial-level HTML5 techniques.">

<!-- Open Graph for Social Media -->
<meta property="og:title" content="HTML Mastery">
<meta property="og:image" content="https://techmiya.com/og-html.jpg">
<meta property="og:type" content="website">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@techmiya">`,
                codeTitle: "metadata.html"
            },
            {
                heading: "Canonical Tags",
                content: "Prevent duplicate content issues by telling Google which version of a URL is the 'source of truth'.",
                code: `<link rel="canonical" href="https://techmiya.com/tutorials/html">`,
                codeTitle: "canonical.html"
            }
        ]
    },
    {
        id: 3,
        slug: "multimedia-optimization",
        title: "Multimedia & Performance Optimization",
        description: "Handling Images, Videos, and SVG with performance in mind.",
        sections: [
            {
                heading: "Modern Image Handling",
                content: "Using the <picture> element and 'srcset' for responsive images and WebP format.",
                code: `<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>`,
                codeTitle: "responsive_images.html",
                note: "The 'loading=\"lazy\"' attribute is a native way to improve performance by loading images only when they enter the viewport."
            },
            {
                heading: "SVG vs Raster",
                content: "SVG is XML-based and resolution-independent. Use it for icons, diagrams, and animations to keep files small and crisp.",
                code: `<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>`,
                codeTitle: "sample.svg"
            }
        ]
    },
    {
        id: 4,
        slug: "web-components",
        title: "Web Components & Templates",
        description: "Reusable, encapsulated HTML elements for modern apps.",
        sections: [
            {
                heading: "HTML Templates & Slots",
                content: "The <template> tag holds content that isn't rendered immediately but can be cloned via JavaScript.",
                code: `<template id="user-card">
  <div class="card">
    <h2><slot name="username">Default User</slot></h2>
    <p><slot name="bio">No bio available.</slot></p>
  </div>
</template>`,
                codeTitle: "template.html"
            },
            {
                heading: "Shadow DOM Basics",
                content: "Shadow DOM allows you to attach a hidden, separated DOM to an element, preventing CSS styles from leaking out or in.",
                note: "This is a core technology behind frameworks like Angular and Polymer."
            }
        ]
    },
    {
        id: 5,
        slug: "accessibility-a11y",
        title: "Web Accessibility (A11y)",
        description: "Building interfaces that everyone can use, including ARIA roles.",
        sections: [
            {
                heading: "WAI-ARIA Roles",
                content: "Accessible Rich Internet Applications (ARIA) attributes define ways to make Web content more accessible.",
                code: `<div role="alert" aria-live="assertive">
  This is a critical update for the user.
</div>
<button aria-label="Close settings menu">X</button>`,
                codeTitle: "aria.html"
            },
            {
                heading: "Color Contrast & Focus States",
                content: "Ensure text is readable and interactive elements have visible focus rings for keyboard users.",
                note: "WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text."
            }
        ]
    },
    {
        id: 6,
        slug: "forms-validation",
        title: "Modern Forms & Validation",
        description: "Deep dive into Constraint Validation API and Input types.",
        sections: [
            {
                heading: "Advanced Input Types",
                content: "HTML5 introduced specialized inputs for data like dates, colors, and ranges.",
                code: `<input type="date" min="2024-01-01">
<input type="range" min="0" max="100" step="10">
<input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">`,
                codeTitle: "inputs.html"
            },
            {
                heading: "Native Validation",
                content: "Use attributes like 'required', 'pattern', and 'minlength' to validate forms without JavaScript.",
                code: `<form>
  <input type="email" required placeholder="Enter email">
  <button type="submit">Join</button>
</form>`,
                codeTitle: "form_validation.html"
            }
        ]
    },
    {
        id: 7,
        slug: "performance-best-practices",
        title: "Performance & Resource Hints",
        description: "Optimizing the Critical Rendering Path.",
        sections: [
            {
                heading: "Resource Hints",
                content: "Tell the browser which resources will be needed soon to speed up page loads.",
                code: `<link rel="dns-prefetch" href="//example.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="critical-style.css" as="style">`,
                codeTitle: "hints.html"
            },
            {
                heading: "Critical Rendering Path",
                content: "Understanding how HTML is parsed and how script placement affects the DOM construction (async vs defer).",
                code: `<!-- Non-blocking script -->
<script src="app.js" defer></script>`,
                codeTitle: "scripts.html",
                note: "Always use 'defer' for scripts that require the DOM to be ready but don't need to block parsing."
            }
        ]
    }
];
