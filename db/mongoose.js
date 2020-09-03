const mongoose = require("mongoose");

try {
  const url = "mongodb://localhost:27017/polling";
  mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`DB initiated`);
} catch (e) {
  console.error(e);
}
