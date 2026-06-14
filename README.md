# PE Camera Club Flipbook Starter

This is a free GitHub Pages flipbook setup for a monthly magazine PDF.

## Files

- `index.html` - the main page
- `style.css` - the design
- `script.js` - turns the PDF into a flipbook
- `magazines/latest.pdf` - put your latest magazine PDF here

## Setup

1. Create a public GitHub repository, for example `pe-camera-club-magazine`.
2. Upload all these files to the repository.
3. Upload your magazine PDF into the `magazines` folder.
4. Rename the PDF to `latest.pdf`.
5. Go to repository `Settings` > `Pages`.
6. Under `Build and deployment`, choose `Deploy from a branch`.
7. Select the `main` branch and `/root`, then Save.
8. Your site should publish at a URL like:
   `https://YOUR-GITHUB-USERNAME.github.io/pe-camera-club-magazine/`

## Updating each month

Simple method:

1. Replace `magazines/latest.pdf` with the new issue.
2. Keep the filename exactly `latest.pdf`.
3. Commit the change.

Optional archive method:

1. Save the issue as `magazines/2026-06.pdf`.
2. Also save a copy as `magazines/latest.pdf`.
3. Add archive links to `index.html` if you want previous issues listed.

## Wix embed code

Use this in Wix's HTML Embed element:

```html
<iframe 
  src="https://YOUR-GITHUB-USERNAME.github.io/pe-camera-club-magazine/" 
  width="100%" 
  height="850" 
  style="border:0; overflow:hidden;" 
  loading="lazy">
</iframe>
```
