import React, { Component } from 'react';
import logo from './bbc-icon.png';
import './App.scss';

  /*
    Helper functions.
    */

    function getJSON(url, callback) {

      const xhr = new XMLHttpRequest();

      // Set callback for request.

      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {

            // Attempt to get JSON.

            const jsonString = this.responseText;
            var json;

            try {
              json = JSON.parse(jsonString);
            } catch (err) {
              return callback('Error parsing JSON.');
            }

            // Return JSON.

            if (callback) {
              callback(null, json);
            }

          } else {

            if (callback) {
              callback('[' + this.status + '] The request failed.');
            }

          }
        }
      };

      // Open request.

      xhr.open("GET", url);
    xhr.send();

    }

    /*
    Article builder with JSON.
    */

    function addEntriesFromJSON(json, parentEl) {

      // Get the first 5 articles.

      var articles = json.articles.slice(0, 10);

      // For each article, add article to the DOM.

      for (var i = 0; i < articles.length; i++) {

        var title = articles[i].title;
        var description = articles[i].description;
        var url = articles[i].url;
        var img = articles[i].urlToImage;

        // Create DOM element.
        var eltwo = document.createElement("p"); 
        var el = document.createElement('a');

      eltwo.textContent = description;
        el.innerHTML = '<img class="article-image" src=' + img + '></div><span class="bbc-title">' + title + '</span></a><br><span class="description">' + description + '</span><br><a href="' + url + '" target="_blank" class="learn-more">Learn More</a>'  ;
        el.setAttribute("href", url);
        el.setAttribute("target","_blank");
        el.classList.add("article-linker");

        // Give the first element a special class.

        if (i === 0) {
          el.classList.add('resulter');
        }

        // Append element.

        parentEl.appendChild(el);
      }

      // Start timer that cycles through.

      setInterval(function() {

        // Go through children and find next one.

        var n = 0;

        for (var i = 0; i < parentEl.children.length; i++) {
          if (parentEl.children[i].classList.contains('resulter')) {
            parentEl.children[i].classList.remove('resulter');
            n = (i + 1) % parentEl.children.length;
            break;
          }
        }

        parentEl.children[n].classList.add('resulter');

      }, 7500);

    }

    /*
    Main function.
    */

    window.onload = function () {

      var parentEl = document.getElementById('news_2');
      var newsUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=89bf80a13bac4174b9181c4c30b7ad29';

      getJSON(newsUrl, function (err, res) {

        if (err) {

          console.log(err);

        } else {

          console.log(res);

          addEntriesFromJSON(res, parentEl);
        }

      });

    };

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="bbc-logo" />
          <h2
            className="breaking-news"
            >
              Breaking News!
            </h2>
          
        </header>
        <div 
            id="news_2">
         </div>
      </div>
    );
  }
}

export default App;
