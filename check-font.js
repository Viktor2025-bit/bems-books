const https = require('https');

https.get('https://bookzen-demo.myshopify.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const fontMatches = data.match(/font-family[^;>]*;/g);
    const googleFonts = data.match(/fonts\.googleapis\.com[^"']*/g);
    
    console.log("Google Fonts Linked:");
    console.log(googleFonts);
    
    if (fontMatches) {
        console.log("\nFont Families defined:");
        const unique = [...new Set(fontMatches)];
        console.log(unique.slice(0, 20)); // print first 20
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
