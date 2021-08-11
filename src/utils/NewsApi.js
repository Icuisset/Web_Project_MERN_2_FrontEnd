class NewsApi {
  constructor({
    baseUrl,
    apiKey
  }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`)
  }


  //GET https://newsapi.org/v2/everything
  getNewsResults(request) {
    return fetch(this._baseUrl + '?q=' + request + '&apiKey=' + this._apiKey, {
      method: 'GET',
      redirect: 'follow'
      }
    ).then((res) => this._checkResponse(res))
  }
}



const newsApi = new NewsApi({
  baseUrl: "https://newsapi.org/v2/everything",
  apiKey: '739496b8c350484585037c731a791729',
})

export default newsApi;