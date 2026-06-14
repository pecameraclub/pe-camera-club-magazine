const PDF_URL = 'magazines/latest.pdf';
const MAGAZINE_TITLE = 'Latest Monthly Magazine';

const bookEl = document.getElementById('book');
const messageEl = document.getElementById('message');
const statusEl = document.getElementById('page-status');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const titleEl = document.getElementById('magazine-title');
const downloadLink = document.getElementById('download-link');
const fallbackLink = document.getElementById('fallback-link');

titleEl.textContent = MAGAZINE_TITLE;
downloadLink.href = PDF_URL;
fallbackLink.href = PDF_URL;

function showMessage(html) {
  bookEl.hidden = true;
  messageEl.hidden = false;
  messageEl.innerHTML = html;
}

async function renderPdfToImages(pdfUrl) {
  if (!window.pdfjsLib) {
    throw new Error('PDF.js did not load. Check your internet connection or CDN access.');
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  const images = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    statusEl.textContent = `Loading page ${pageNumber} of ${pdf.numPages}…`;

    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.6 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    images.push(canvas.toDataURL('image/jpeg', 0.9));
  }

  return images;
}

function updateStatus(pageFlip) {
  const pageIndex = pageFlip.getCurrentPageIndex();
  const pageCount = pageFlip.getPageCount();
  statusEl.textContent = `Page ${pageIndex + 1} of ${pageCount}`;
}

async function start() {
  try {
    const images = await renderPdfToImages(PDF_URL);

    if (!window.St || !window.St.PageFlip) {
      throw new Error('PageFlip library did not load.');
    }

    const pageFlip = new St.PageFlip(bookEl, {
      width: 420,
      height: 594,
      size: 'stretch',
      minWidth: 260,
      maxWidth: 1000,
      minHeight: 360,
      maxHeight: 720,
      maxShadowOpacity: 0.35,
      showCover: true,
      mobileScrollSupport: false,
      usePortrait: true
    });

    pageFlip.loadFromImages(images);
    pageFlip.on('flip', () => updateStatus(pageFlip));

    prevBtn.addEventListener('click', () => pageFlip.flipPrev());
    nextBtn.addEventListener('click', () => pageFlip.flipNext());

    updateStatus(pageFlip);
  } catch (error) {
    console.error(error);
    statusEl.textContent = 'PDF view available';
    showMessage(`
      <strong>The flipbook could not load.</strong><br>
      You can still read the magazine as a PDF:<br><br>
      <a href="${PDF_URL}" target="_blank" rel="noopener">Open the magazine PDF</a><br><br>
      Common causes: the PDF file is missing, the filename is different, or the free CDN scripts are blocked.
    `);
  }
}

start();
