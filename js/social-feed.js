// Opzione 1: Usando Facebook Page Plugin (più semplice)
function loadFacebookPlugin() {
    const fbContainer = document.getElementById('facebook-feed');
    fbContainer.innerHTML = `
        <div class="fb-page" 
             data-href="https://www.facebook.com/YOUR_FACEBOOK_PAGE" 
             data-tabs="timeline" 
             data-width="500" 
             data-height="600" 
             data-small-header="false" 
             data-adapt-container-width="true" 
             data-hide-cover="false" 
             data-show-facepile="true">
        </div>
    `;
    
    // Carica SDK Facebook
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v18.0';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

// Opzione 2: Feed personalizzato (richiede più configurazione)
async function loadCustomFeed() {
    try {
        // Qui dovrai usare un servizio come RSS Bridge o un backend
        // che recupera i post da Facebook Graph API
        const response = await fetch('YOUR_RSS_FEED_URL');
        const data = await response.json();
        
        const feedContainer = document.getElementById('facebook-feed');
        feedContainer.innerHTML = data.posts.map(post => `
            <div class="post-card">
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                <div class="post-content">
                    <p class="post-date">${formatDate(post.date)}</p>
                    <p class="post-text">${post.text}</p>
                    <a href="${post.link}" target="_blank" class="post-link">Leggi su Facebook →</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Errore caricamento feed:', error);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Carica il feed all'avvio
document.addEventListener('DOMContentLoaded', () => {
    loadFacebookPlugin(); // o loadCustomFeed()
});
