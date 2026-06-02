import { marked } from "marked";
import { readFile, writeFile, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Professional HTML template optimized for PDF generation
const htmlTemplate = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @page {
      size: A4;
      margin: 0;
    }

    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 9pt;
      line-height: 1.35;
      color: #1a1a1a;
      background: white;
      padding: 15mm 16mm 15mm 16mm;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Header - Name and Contact */
    h1 {
      font-size: 24pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4pt;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }

    h1 + p {
      font-size: 8.5pt;
      color: #475569;
      margin-bottom: 10pt;
      line-height: 1.3;
      font-weight: 400;
    }

    h1 + p a {
      color: #2563eb;
      text-decoration: none;
      margin: 0 2px;
    }

    /* Professional Summary */
    h1 + p + p {
      font-size: 9pt;
      line-height: 1.4;
      color: #334155;
      margin-bottom: 12pt;
      text-align: justify;
      padding: 8pt 0;
      border-top: 1.5pt solid #e2e8f0;
      border-bottom: 1.5pt solid #e2e8f0;
    }

    /* Section Headings */
    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 14pt;
      margin-bottom: 8pt;
      padding-bottom: 3pt;
      border-bottom: 1.5pt solid #2563eb;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    h2:first-of-type {
      margin-top: 10pt;
    }

    /* Position title (first bold text after Experience heading) */
    h2 + p strong:only-child {
      display: block;
      font-size: 10.5pt;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 10pt;
      font-style: normal;
    }

    /* Company names - keeping bold and prominent */
    h2 + p + p strong,
    p + p strong {
      font-size: 9.5pt;
      font-weight: 600;
      color: #0f172a;
    }

    /* Company and date lines - make dates subtle */
    h2 + p + p,
    ul + p {
      font-size: 8.5pt;
      color: #64748b;
      margin-bottom: 4pt;
      font-style: italic;
    }

    /* Keep company names in normal style within the italic context */
    h2 + p + p strong,
    ul + p strong {
      color: #475569;
      font-weight: 600;
      font-style: normal;
    }

    /* Job Titles (legacy - keeping for other sections if needed) */
    h3 {
      font-size: 10.5pt;
      font-weight: 600;
      color: #0f172a;
      margin-top: 10pt;
      margin-bottom: 2pt;
      line-height: 1.3;
    }

    /* Company and Date */
    h3 + p {
      font-size: 8.5pt;
      color: #64748b;
      margin-bottom: 4pt;
      font-style: italic;
    }

    h3 + p strong {
      color: #475569;
      font-weight: 600;
      font-style: normal;
    }

    /* Spacing between job entries */
    p strong + br + br {
      display: block;
      margin-bottom: 8pt;
    }

    /* Regular paragraphs */
    p {
      margin: 4pt 0;
      text-align: justify;
      hyphens: auto;
    }

    /* Bullet lists */
    ul {
      margin: 4pt 0 8pt 0;
      padding-left: 14pt;
      list-style-type: none;
    }

    li {
      margin: 3.5pt 0;
      line-height: 1.4;
      position: relative;
      padding-left: 11pt;
      text-align: justify;
    }

    li::before {
      content: "▸";
      position: absolute;
      left: 0;
      color: #2563eb;
      font-weight: 700;
    }

    /* Links */
    a {
      color: #2563eb;
      text-decoration: none;
    }

    /* Skills section special styling */
    h2:last-of-type ~ p {
      margin-top: 2pt;
      margin-bottom: 2pt;
      font-size: 9pt;
      color: #1a1a1a;
      font-style: normal;
      text-align: left;
      line-height: 1.4;
    }

    h2:last-of-type + p {
      margin-top: 2pt;
    }

    h2:last-of-type ~ p strong {
      color: #0f172a;
      font-weight: 700;
      display: inline-block;
      min-width: 80pt;
      font-style: normal;
    }

    /* Page break control */
    h2, h3 {
      page-break-after: avoid;
    }

    ul, p {
      page-break-inside: avoid;
    }

    /* Ensure content doesn't overflow */
    * {
      max-width: 100%;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;

async function generateCV(inputPath, outputPathPDF, title) {
  try {
    console.log(`Generating ${outputPathPDF}...`);

    // Read markdown file
    const markdown = await readFile(inputPath, "utf-8");

    // Convert to HTML
    const htmlContent = marked(markdown, {
      headerIds: false,
      mangle: false,
    });

    // Wrap in template
    const html = htmlTemplate(title, htmlContent);

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.pdf({
      path: outputPathPDF,
      format: "A4",
      printBackground: true,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });

    await browser.close();

    console.log(`✓ Successfully generated ${outputPathPDF}`);
  } catch (error) {
    console.error(`✗ Error generating ${outputPathPDF}:`, error.message);
    process.exit(1);
  }
}

async function main() {
  const projectRoot = join(__dirname, "..");
  const sourceDir = join(projectRoot, "src", "assets");
  const outputDir = join(projectRoot, "_site", "assets");

  // Ensure output directory exists
  await mkdir(outputDir, { recursive: true });

  console.log("\n🚀 Generating professional CV PDFs...\n");

  // Generate both CVs as PDFs
  await generateCV(
    join(sourceDir, "Currículum ES.md"),
    join(outputDir, "curriculum-es.pdf"),
    "Currículum - Gabriel Cuétara Flores",
  );

  await generateCV(
    join(sourceDir, "Currículum EN.md"),
    join(outputDir, "curriculum-en.pdf"),
    "CV - Gabriel Cuétara Flores",
  );

  console.log("\n✨ All CVs generated successfully!");
  console.log(`📄 PDFs available at: ${outputDir}\n`);
}

main().catch(console.error);
