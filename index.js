const store = require('./rtk/app/store');
const { fetchVideo, fetchRelatedVidoes } = require('./rtk/features/asyncVideo/asyncVideoSlice');

// store.subscribe(() => {
//   // console.log(store.getState().video?.video?.tags)
// });


store.dispatch(fetchVideo());

// fetch related videos
setTimeout(() => {
  store.dispatch(fetchRelatedVidoes(store.getState().video?.video?.tags));
}, 1000)
