const http = require("./index");

http.listen(3005, err => {
  if (err) {
    console.log(err);
  }
  console.log(`App running on 3005`);
});
