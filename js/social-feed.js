// Caricamento feed RSS FITARCO usando rss2json API
async function loadFitarcoFeed() {
    try {
        const RSS_URL = 'https://www.fitarco.it/media-fitarco/news/19-territorio.feed?type=rss';
        const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=3`;
        
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.status !== 'ok') {
            console.error('Errore nel caricamento del feed RSS:', data.message);
            showErrorMessage();
            return;
        }
        
        const feedContainer = document.getElementById('facebook-feed');
        if (!feedContainer) return;
        
        feedContainer.innerHTML = '';
        
        data.items.forEach(item => {
            const newsCard = createNewsCard(item);
            feedContainer.appendChild(newsCard);
        });
        
    } catch (error) {
        console.error('Errore nel fetch del feed:', error);
        showErrorMessage();
    }
}

function createNewsCard(item) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    const date = new Date(item.pubDate);
    const formattedDate = formatDate(date);
    
    const description = stripHTML(item.description);
    const shortDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;
    
    card.innerHTML = `
        <div class="news-header">
            <strong>FITARCO</strong>
            <span class="news-date">${formattedDate}</span>
        </div>
        <h3 class="news-title">${item.title}</h3>
        <div class="news-content">
            <p>${shortDescription}</p>
        </div>
        <div class="news-footer">
            <a href="${item.link}" target="_blank" rel="noopener">Leggi su FITARCO</a>
        </div>
    `;
    
    return card;
}

function stripHTML(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('it-IT', options);
}

function showErrorMessage() {
    const feedContainer = document.getElementById('facebook-feed');
    if (!feedContainer) return;
    
    feedContainer.innerHTML = `
        <div class="news-error">
            <p>⚠️ Al momento non è possibile caricare le ultime notizie da FITARCO.</p>
            <p><a href="https://www.fitarco.it/media-fitarco/news/19-territorio" target="_blank" rel="noopener">Visita il sito FITARCO</a></p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadFitarcoFeed);
