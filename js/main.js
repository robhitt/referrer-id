"use strict";

window.addEventListener('load', app);

function app() {

  
  var urlPath = window.location;
  var queryString = urlPath.search;
  // console.log(urlPath);
  // console.log(urlPath.protocol); // => "http:"
  // console.log(urlPath.host);     // => "example.com:3000"
  // console.log(urlPath.hostname); // => "example.com"
  // console.log(urlPath.port);     // => "3000"
  // console.log(urlPath.pathname); // => "/pathname/"
  // console.log(urlPath.hash);     // => "#hash"
  // console.log(urlPath.search);   // => "?search=test"
  // console.log(urlPath.origin);   // => "http://example.com:3000"
  

  queryString = queryString.slice(1);
  // console.log(queryString);
     
  var splitParams = queryString.split('&');
  // console.log(splitParams);
  
  var mappedParams = {};
  for (var i = 0; i <splitParams.length; i++) {
    var el = splitParams[i].split('=');
    mappedParams[el[0]] = el[1];
  }
  console.log(mappedParams['referrerID']);
  
  var referrerValue = document.querySelector('.referrer-id');

  referrerValue.textContent = mappedParams['referrerID'];

  
  
  
  





  const url = customEndpoint();
  const request = new Request(url, {
    method: "GET",
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  });

  fetch(request)
    .then(response => response.json())
    .then(response => renderPage(response))
    .catch(err => console.log(err));
}

function renderPage(response) {
  const allArticlesContainer = document.querySelector(".all-articles");
  const list = response.list;
  
  list.forEach( (article, index) => {
    let individualArticleHTML;
    const thumbnailURL = article.thumbnail[0].url;
    const { name, branding, url } = article;
    
    individualArticleHTML = `
      <div class="article-container">
        <a href="${ url }" target="_blank" class="article-link">
          <div class="article-image-container">
            <div class="article-image article-image${ index }"></div>
            <div class="article-image-overlay">${ branding }</div>
          </div>
        </a>
        <div class="image-text">${ name }</div>
      </div>
    `;

    allArticlesContainer.insertAdjacentHTML("beforeend", individualArticleHTML);

    const individualImage = document.querySelector(`.article-image${ index }`);
    individualImage.style.backgroundImage = `url(${ thumbnailURL })`;
  });
}

function customEndpoint() {
  // I broke this out into a function for scalability in case we
  // wanted to add the domain, publisher ID, or arguments into this 
  // function via a submission form for a new endpoint at a future date
  // note: the below are all REQUIRED for api 1.1
  const domain = "https://api.taboola.com/1.1/json",
        publisherId = "taboola-templates";

  // arguments for the query string
  const appType = "desktop",
        apiKey = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4",
        count = 6,
        sourceType = "video",
        sourceId = "robhitt",
        sourceURL = `https://${window.location.href}`,
        userSession = "init";

  // I wanted to include these comments below for 
  // future development/conversation  as these are not
  // required arguments but I would consider 
  // smaller/cropped files for  load efficiency
  // const imgWidth = 500; arg: rec.thumbnail.width
  // const imgHeight = 200; arg: rec.thumbnail.height
  
  const url = `
      ${ domain }/${ 
      publisherId }/recommendations.get?app.type=${ 
      appType }&app.apikey=${ 
      apiKey }&rec.count=${     
      count }&source.type=${
      sourceType }&source.id=${
      sourceId }&source.url=${ 
      sourceURL }&user.session=${
      userSession }
    `;

  return url;
}