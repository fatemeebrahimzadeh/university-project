const sharp = require("sharp");

// Path to your base icon (512x512 px or larger)
const inputIcon = "static/icon-base.png";

// Output paths
const output192 = "static/icon-192x192.png";
const output512 = "static/icon-512x512.png";

// Generate 192x192 icon
sharp(inputIcon)
  .resize({ width: 192, height: 192 })
  .toFile(output192, (err) => {
    if (err) console.error("Error generating 192x192 icon:", err);
    else console.log("192x192 icon created successfully.");
  });

// Generate 512x512 icon
sharp(inputIcon)
  .resize({ width: 512, height: 512 })
  .toFile(output512, (err) => {
    if (err) console.error("Error generating 512x512 icon:", err);
    else console.log("512x512 icon created successfully.");
  });
