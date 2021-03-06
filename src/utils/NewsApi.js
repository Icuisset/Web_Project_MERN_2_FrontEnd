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
    /* just double checking today's result*/
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);  
    /* adding const for number of days */
    const numberDaysforSearch = 7;
    const lastWeekDate = new Date(Date.now() - Number(numberDaysforSearch) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    console.log(lastWeekDate);
    return lastWeekDate;
  }


  //GET https://newsapi.org/v2/everything
  getNewsResults(request, numberCards = 100, from = "2021-08-14", sortBy = "relevancy") {
    return fetch(this._baseUrl + '?q=' + request + '&apiKey=' + this._apiKey + '&pageSize=' + numberCards + '&from=' + this._getLastWeekDate() + '&sortBy=' + sortBy, {
      method: 'GET',
      redirect: 'follow'
      }
    ).then((res) => this._checkResponse(res))
  }
}



const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2/everything",
  apiKey: '739496b8c350484585037c731a791729',
})

export default newsApi;