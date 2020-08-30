const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://localhost/polling", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`DB initiated`);
} catch (e) {
  console.error(e);
}
