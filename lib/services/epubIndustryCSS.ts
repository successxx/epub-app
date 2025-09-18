// Industry-standard CSS for premium EPUB generation
// Following best practices from major publishers

export const industryStandardCSS = `
  /* ===========================================
     EPUB Industry Standards CSS
     Following best practices from:
     - Penguin Random House
     - HarperCollins
     - Simon & Schuster
     =========================================== */

  /* Reset and Foundation */
  @page {
    margin: 30px 40px;
  }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1em;
    line-height: 1.625;
    color: #000000;
    margin: 0;
    padding: 0.5em 1em;
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
    -epub-hyphens: auto;
    -moz-hyphens: auto;
    word-wrap: break-word;
    orphans: 2;
    widows: 2;
  }

  /* Chapter Structure */
  .chapter-container {
    page-break-before: always;
    margin: 0;
    padding: 0;
  }

  .chapter-header {
    margin: 0 0 3em 0;
    padding: 2em 0;
    text-align: center;
    page-break-after: avoid;
  }

  .chapter-number {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 0.875em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #666666;
    margin-bottom: 0.5em;
  }

  .chapter-title {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 1.75em;
    font-weight: 700;
    line-height: 1.2;
    margin: 0.5em 0;
    color: #000000;
    text-align: center;
  }

  .chapter-divider {
    width: 3em;
    height: 2px;
    background-color: #333333;
    margin: 1.5em auto;
  }

  /* Typography - Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700;
    line-height: 1.2;
    margin-top: 1.5em;
    margin-bottom: 0.75em;
    page-break-after: avoid;
    text-align: left;
  }

  h1 {
    font-size: 1.75em;
    margin-top: 0;
  }

  h2 {
    font-size: 1.5em;
    margin-top: 2em;
  }

  h3 {
    font-size: 1.25em;
    font-weight: 600;
  }

  h4 {
    font-size: 1.125em;
    font-weight: 600;
  }

  /* Paragraphs */
  p {
    margin: 0 0 1em 0;
    text-indent: 1.5em;
  }

  /* First paragraph after heading or break */
  h1 + p,
  h2 + p,
  h3 + p,
  h4 + p,
  .chapter-header + p,
  .section-break + p,
  blockquote + p {
    text-indent: 0;
  }

  /* First paragraph of chapter */
  .chapter-content > p:first-child {
    text-indent: 0;
  }

  /* Drop caps for chapter openings (optional) */
  .chapter-content > p:first-child:first-letter {
    float: left;
    font-size: 3.5em;
    line-height: 1;
    font-weight: bold;
    margin: 0 0.05em 0 0;
    padding: 0;
  }

  /* Text Emphasis */
  strong, b {
    font-weight: 700;
    color: inherit;
  }

  em, i {
    font-style: italic;
  }

  /* Blockquotes */
  blockquote {
    margin: 1.5em 2em;
    padding: 0;
    font-style: italic;
    color: #333333;
    page-break-inside: avoid;
  }

  blockquote p {
    text-indent: 0;
  }

  /* Lists */
  ul, ol {
    margin: 1em 0 1em 2em;
    padding: 0;
  }

  li {
    margin-bottom: 0.5em;
    line-height: 1.625;
  }

  /* Links */
  a {
    color: #0066cc;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Section Breaks */
  .section-break {
    text-align: center;
    margin: 2em 0;
    page-break-after: avoid;
  }

  .section-break::before {
    content: "* * *";
    font-size: 1em;
    letter-spacing: 0.5em;
    color: #666666;
  }

  /* Table of Contents */
  .table-of-contents {
    page-break-before: always;
    padding: 1em;
  }

  .toc-heading {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 1.75em;
    font-weight: 700;
    text-align: center;
    margin: 0 0 2em 0;
  }

  .toc-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .toc-item {
    margin-bottom: 0.75em;
    page-break-inside: avoid;
  }

  .toc-link {
    display: flex;
    align-items: baseline;
    text-decoration: none;
    color: #000000;
  }

  .toc-number {
    font-weight: 600;
    margin-right: 0.5em;
  }

  .toc-title {
    flex: 1;
  }

  .toc-dots {
    flex: 1;
    border-bottom: 1px dotted #999999;
    margin: 0 0.5em;
    min-width: 2em;
  }

  .toc-page {
    text-align: right;
    font-weight: 500;
  }

  /* Call to Action Boxes */
  .cta-box {
    background-color: #f5f5f5;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 1.5em;
    margin: 2em 0;
    page-break-inside: avoid;
    text-align: center;
  }

  .cta-box h3 {
    margin-top: 0;
    font-size: 1.25em;
    color: #000000;
  }

  .cta-box p {
    text-indent: 0;
    text-align: center;
    margin-bottom: 0.5em;
  }

  .cta-button {
    display: inline-block;
    padding: 0.5em 1.5em;
    background-color: #0066cc;
    color: #ffffff;
    text-decoration: none;
    border-radius: 3px;
    font-weight: 600;
    margin-top: 1em;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.5em auto;
    page-break-inside: avoid;
  }

  /* Footnotes */
  .footnote {
    font-size: 0.875em;
    vertical-align: super;
    line-height: 1;
  }

  .footnote-text {
    font-size: 0.875em;
    line-height: 1.5;
    margin-top: 2em;
    padding-top: 1em;
    border-top: 1px solid #cccccc;
  }

  /* Copyright and Legal */
  .copyright {
    font-size: 0.875em;
    text-align: center;
    margin-top: 3em;
    page-break-before: always;
  }

  /* Responsive Design for Different Readers */
  @media screen and (max-width: 480px) {
    body {
      font-size: 0.875em;
      padding: 0.25em 0.5em;
    }

    .chapter-title {
      font-size: 1.5em;
    }

    blockquote {
      margin: 1em;
    }
  }

  /* Night Mode Support */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #1a1a1a;
      color: #e0e0e0;
    }

    .chapter-number {
      color: #999999;
    }

    .chapter-title,
    h1, h2, h3, h4 {
      color: #ffffff;
    }

    blockquote {
      color: #cccccc;
    }

    .cta-box {
      background-color: #2a2a2a;
      border-color: #444444;
    }
  }

  /* Print Styles */
  @media print {
    body {
      font-size: 11pt;
      line-height: 1.5;
    }

    .chapter-container {
      page-break-before: always;
    }

    .cta-box {
      border: 2px solid #000000;
    }
  }
`

export default industryStandardCSS