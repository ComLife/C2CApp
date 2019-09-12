import Request from '../api/request';

export default new (class FacebookService extends Request {
  getMovies() {
    return this.request({
      url: 'https://facebook.github.io/react-native/movies.json',
    })();
  }
  // next
})();
