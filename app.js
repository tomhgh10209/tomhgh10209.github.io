fetch('news-data.json')
    .then(response => response.json())
    .then(data => {
       
        if (window.location.pathname.includes('latestNews.html')) {
            data.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
        }
        
        const isHomepageOrNewsPage = document.body.classList.contains('homepage') || window.location.pathname.includes('news.html');
        const articlesToDisplay = isHomepageOrNewsPage ? data.filter(article => article.featured) : data;

        generateArticles(articlesToDisplay);
    })
    .catch(error => console.error('Error fetching data:', error));


function generateArticles(articles) {
    const newsSection = document.querySelector('.news');

    articles.forEach(article => {
        const articleBox = document.createElement('article');
        articleBox.classList.add('article-box');

        articleBox.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.link}">Read More</a>
        `;

        newsSection.appendChild(articleBox);
    });
}
