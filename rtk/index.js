const store = require('./app/store');
const { fetchVideos } = require('./features/asyncVideo/asyncVideoSlice');

store.subscribe(() => {
  
})

store.dispatch(fetchVideos());