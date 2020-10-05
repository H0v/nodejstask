const moment = require("moment");
const stream = require("stream");
// moment.locale("ru");
// console.log(moment().format("dddd, MMMM DD YYYY, h:mm:ss"));

class ReadableStream extends stream.Readable {
  _read() {
    console.log("reading");
  }
}
class TransformStream extends stream.Transform {
  _transform(chunk, enc, callback) {
    const data = chunk.toString();
    callback(null, `[Date : ${data}]`);
  }
}

class WritableStream extends stream.Writable {
  _write(chunk, enc, callback) {
    console.log("chunk:", chunk.toString());
    callback(null);
  }
}

const readableStream = new ReadableStream();
const transformStream = new TransformStream();
const writableStream = new WritableStream();

// setInterval(() => {
//   readableStream.push("Hello World");
// }, 2000);
// readableStream.pipe(writableStream);

setInterval(() => {
  readableStream.push(moment().format("dddd, MMMM DD YYYY, h:mm:ss"));
}, 2000);
readableStream.pipe(transformStream).pipe(writableStream);
