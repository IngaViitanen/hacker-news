import './style.css'
import type { Article } from './api.types'
import { getSearchResults } from './api';
import { nextBtnEl, prevBtnEl, renderPagination } from './pagination';
import { handleError } from './errorHandler';

export const searchQueryBase = import.meta.env.VITE_API_SEARCH_QUERY_BASE;
const searchFormEl = document.querySelector<HTMLFormElement>("#searchForm")!;
const articlesEl = document.querySelector<HTMLUListElement>("#news")!;
const resultHeaderEl = document.querySelector<HTMLHeadingElement>("#resultHeader")!

let articles: Article[] = [];

export const getArticlesAndRender = async () => { 
  try {
    if(window.location.search) {
      let searchRes = await getSearchResults(window.location.search)
      articles = searchRes.hits
      let paginationAmount = [...Array(searchRes.nbPages).keys()]
    
      resultHeaderEl.style.display = "block";
      nextBtnEl.style.display = "block"
      prevBtnEl.style.display = "block"
      renderArticles()
      renderPagination(paginationAmount)
    } 
  } catch (err) {
    handleError(err)
  }
}

// show articles
const renderArticles = () => {
  articlesEl.innerHTML = articles.map((article) => {
    return `<li>
          <div class="wrapper">
          <h3>${article.title || article.story_title}</h3>
          <p>author: <strong>${article.author}</strong></p>
          <p>points: <strong>${article.points}</strong></p>
          <a href=${article.url || article.story_url}>link: <br><strong>${article.url || article.story_url}</strong></a>
          </div>
          <p class="article-date">DATE: <strong>${article.created_at}</strong></p>
        </li>`
  }).join("");
};


//register back/forward buttons click in browser
window.addEventListener('popstate', () => {
  getArticlesAndRender()
})


// listener for searchbar
searchFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchEl = document.querySelector<HTMLInputElement>("#searchInput")!;

  try {

    window.history.pushState('', '', searchQueryBase + searchEl.value)
    getArticlesAndRender()

  } catch (err) {
    handleError(err)
  }
});


//filter on date
const filterForm = document.querySelector<HTMLFormElement>("#filterForm")!;

filterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const dateInput = document.querySelector<HTMLInputElement>("#dateInput")!;
    const timestamp = new Date(dateInput.value).getTime() / 1000

    window.history.pushState('', '', searchQueryBase +'&numericFilters=created_at_i>' + timestamp)
    getArticlesAndRender()
})




getArticlesAndRender()