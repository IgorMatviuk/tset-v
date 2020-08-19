function apiResponse(route, req = {}) {
  let results

  const res = {
    jsonp(obj) {
      results = obj
    }
  }

  route(req, res)

  return results
}

module.exports = apiResponse
