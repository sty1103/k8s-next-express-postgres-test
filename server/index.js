const express = require('express')
const app = express()
const multer = require('multer');
const fs = require('fs');
const port = 8080

// CORS 설정
// const cors = require('cors');
// const whitelist = ['http://localhost:3000'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('not allowed origin'));
//     }
//   }
// }
// app.use(cors(corsOptions));

app.get('/api', (req, res) => {
  res.status(200).send({hello:'world'});
});

//////////////// 파일 업로드 //////////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `/var/www/uploads`;
    // const path = './test'
    cb(null, path)
    
    // 디렉터리 없으면 디렉터리를 새로 생성
    if ( !fs.existsSync(path) )
      fs.mkdirSync(path, { recursive: true })
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

app.post('/api/upload', (req, res) => {
    const upload = multer({storage}).single('img');

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.status(200).json({hello:'world'});    
      } else {
        res.status(500).send({data: err});
      }
  })
})

// app.post('/api/upload', (req, res) => {
//   res.status(200).json({hello:'world'});
// })

//////////////// 디비 테스트 //////////////////////
const { Client } = require('pg')
const client = new Client({
  user: "test",
  host: "http://35.243.73.50",
  database: "prod",
  password: "test",
  port: 5432
});

app.post('/api/db', (req, res) => {
  client.connect()

  client.query(`INSERT INTO customer(password) VALUES('1234')`).then((res) => {
    client.end()
    res.send(req)
  })
  .catch(err => {
    res.send(err);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})