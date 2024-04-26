const urlParams = new URLSearchParams(window.location.search);
const scrollToText = urlParams.get('focus').replaceAll('-', '');

if (scrollToText) {
    console.log(scrollToText);
    for (p of document.querySelectorAll('p,h1,h2,h3,h4,h5,h6')) {
        const pText = p.textContent.toLowerCase().replaceAll(/[^a-zA-Z0-9]+/g, '');
        console.log(pText);
        if (pText.includes(scrollToText)) {
            p.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}