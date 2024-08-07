import { NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false, // Disabling the default body parser
  },
};

const uploadFileToFtp = async (file, email) => {

console.log(file[0].filepath);
console.log(file[0].originalFilename);
  const client = new ftp.Client();
  client.ftp.verbose = true;
  const remoteFilePath = `${email}/` + file[0].originalFilename;
  try {
    await client.access({
        host: process.env.FTP_HOST ,
        user: process.env.FTP_USERNAME,
        password: process.env.FTP_PASSWORD,
        secure: false,
    });

    await client.uploadFrom(file[0].filepath, remoteFilePath);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.close();
  }
};

const parseForm = (req) => {
    const form = new IncomingForm();
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
  };

export async function POST(req) {
  const buffers = [];
  for await (const chunk of req.body) {
    buffers.push(chunk);
  }
  const buffer = Buffer.concat(buffers);

  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);

  try {
    const headers = {
        'content-type': req.headers.get('content-type'),
        'content-length': buffer.length,
      };

    readable.headers = headers;

    const { fields, files } = await parseForm(readable);
    const file = files.file;
    const email = fields.email;

    await uploadFileToFtp(file, email);

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading the file' }, { status: 500 });
  }
}
