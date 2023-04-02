function open_new_window(location) {
  fetch(`${window.location.origin}/memes/${location}`, {
    method: 'POST'
  }).then((results) => {
    console.log(results)
    window.location.href = results.url;
  }).catch((err) => {
    console.log(err)
  });
}