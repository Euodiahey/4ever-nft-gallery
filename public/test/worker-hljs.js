onmessage = (event) => {
  console.log(event)
  importScripts('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js')
  const result = self.hljs.highlightAuto(event.data)
  // , {
  //   language: 'json',
  // }
  postMessage(result.value)
}
