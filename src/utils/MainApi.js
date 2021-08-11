class MainApi {
  constructor({
    baseUrl,
  }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`)
  }

  // GET https://api.news-explorer.info/users/me
  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }


  //GET https://api.news-explorer.info/articles
  getSavedArticles(token) {
    return fetch(this._baseUrl + '/articles', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // POST https://api.news-explorer.info/articles
  postNewArticle(keyword, title, text, date, source, link, image, token) {
    return fetch(this._baseUrl + '/articles', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image,
      }),
    }).then((res) => this._checkResponse(res))
  }

  // DELETE https://api.news-explorer.info/articles/articleId
  deleteArticle(id, token) {
    return fetch(this._baseUrl + '/articles/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }
}


const mainApi = new MainApi({
  baseUrl: 'https://api.news-explorer.info',
})

export default mainApi;