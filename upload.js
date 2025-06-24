const fs = require('fs');
const s3 = require('./s3Client');

async function upload() {
    const stream = fs.createReadStream('file.txt');


    const params = {
        Buckey: process.env.BUCKET_NAME,
        Key: "",
        Body: stream,
        ContentType: 'text/plain'
    };

    const result = await s3.upload(params).promise();
    console.log('uploaded', result.Location);
}
upload();