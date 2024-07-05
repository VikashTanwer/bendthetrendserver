const connectToMongo = require("./db")
const express = require('express')

connectToMongo()

const app = express()
const port = 4000

app.use(express.json())

app.use("/api/auth", require("./routes/auth"))
app.use("/api/customer", require("./routes/customer"))
app.use("/api/customer/male", require("./routes/male"))
app.use("/api/customer/female", require("./routes/female"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})