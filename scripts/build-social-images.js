import puppeteer from "puppeteer";
import { mkdir, readdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOCIAL_IMAGE_WIDTH = 1200;
const SOCIAL_IMAGE_HEIGHT = 630;

async function generateSocialImages() {
  console.log("🎨 Generating social media images...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: SOCIAL_IMAGE_WIDTH,
      height: SOCIAL_IMAGE_HEIGHT,
      deviceScaleFactor: 2, // High DPI for better quality
    });

    // Ensure output directory exists
    const outputDir = join(__dirname, "..", "_site", "social");
    await mkdir(outputDir, { recursive: true });

    // Generate default social image
    const defaultUrl = `file://${join(__dirname, "..", "_site", "social", "index.html")}`;
    console.log(`  📸 Generating default social image...`);
    await page.goto(defaultUrl, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: join(outputDir, "default.png"),
      type: "png",
      clip: {
        x: 0,
        y: 0,
        width: SOCIAL_IMAGE_WIDTH,
        height: SOCIAL_IMAGE_HEIGHT,
      },
    });
    console.log(`  ✅ Created: /social/default.png`);

    // Generate blog post social images
    const blogSocialDir = join(__dirname, "..", "_site", "social", "blog");
    try {
      const blogDirs = await readdir(blogSocialDir);
      let blogCount = 0;

      for (const blogSlug of blogDirs) {
        const blogPath = join(blogSocialDir, blogSlug);

        // Check for English version
        const enUrl = `file://${join(blogPath, "index.html")}`;
        try {
          await page.goto(enUrl, { waitUntil: "networkidle0" });
          await page.screenshot({
            path: join(blogPath, "social.png"),
            type: "png",
            clip: {
              x: 0,
              y: 0,
              width: SOCIAL_IMAGE_WIDTH,
              height: SOCIAL_IMAGE_HEIGHT,
            },
          });
          blogCount++;
        } catch (error) {
          // Skip if file doesn't exist
        }

        // Check for Spanish version
        const esUrl = `file://${join(blogPath, "es", "index.html")}`;
        try {
          await page.goto(esUrl, { waitUntil: "networkidle0" });
          const esDir = join(blogPath, "es");
          await mkdir(esDir, { recursive: true });
          await page.screenshot({
            path: join(esDir, "social.png"),
            type: "png",
            clip: {
              x: 0,
              y: 0,
              width: SOCIAL_IMAGE_WIDTH,
              height: SOCIAL_IMAGE_HEIGHT,
            },
          });
          blogCount++;
        } catch (error) {
          // Skip if file doesn't exist
        }
      }

      console.log(`  ✅ Created ${blogCount} blog social images`);
    } catch (error) {
      console.log(`  ℹ️  No blog posts found, skipping blog images`);
    }
  } catch (error) {
    console.error("❌ Error generating social images:", error);
    throw error;
  } finally {
    await browser.close();
  }

  console.log("✨ Social media images generated successfully!");
}

generateSocialImages().catch((error) => {
  console.error(error);
  process.exit(1);
});
