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

  _getLastWeekDate() {
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);  
    const lastdate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    console.log(lastdate);
    return lastdate;
  }


  //GET https://newsapi.org/v2/everything
  getNewsResults(request, numberCards = 100, from = "2021-08-14", sortBy = "popularity") {
    return fetch(this._baseUrl + '?q=' + request + '&apiKey=' + this._apiKey + '&pageSize=' + numberCards + '&from=' + this._getLastWeekDate() + '&sortBy=' + sortBy, {
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