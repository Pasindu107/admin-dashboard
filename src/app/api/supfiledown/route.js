// src/app/api/ftp/download.js
import ftp from 'ftp';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
//import {imageName} from '@/src/app/supplier/page'

export async function GET(req) {
  const client = new ftp();
  const { searchParams } = new URL(req.url);
  const imageName = searchParams.get('imageName');


  // Remote file path on the FTP server
  const remoteFilePath = `/gggg.d@g.lk/${imageName}`; 
 
  // Local file path to save the downloaded file temporarily
  const localFilePath = path.join(process.cwd(), 'downloads', path.basename(remoteFilePath));

  return new Promise((resolve, reject) => {
    client.on('ready', () => {
      client.get(remoteFilePath, (err, stream) => {
        if (err) {
          client.end();
          console.error('Error downloading file:', err);
          resolve(
            NextResponse.json({ error: 'Error downloading file from FTP server' }, { status: 500 })
          );
          return;
        }

        // Ensure the downloads directory exists
        if (!fs.existsSync(path.dirname(localFilePath))) {
          fs.mkdirSync(path.dirname(localFilePath), { recursive: true });
        }

        const fileStream = fs.createWriteStream(localFilePath);

        stream.pipe(fileStream);

        stream.once('close', () => {
          client.end();
          fs.readFile(localFilePath, (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              resolve(
                NextResponse.json({ error: 'Error reading downloaded file' }, { status: 500 })
              );
              return;
            }

            // Send the file as a response
            resolve(
              new NextResponse(data, {
                status: 200,
                headers: {
                  'Content-Disposition': `attachment; filename="${path.basename(localFilePath)}"`,
                  'Content-Type': 'application/octet-stream',
                },
              })
            );

            // Optionally delete the file after sending it
            fs.unlink(localFilePath, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
          });
        });

        stream.on('error', (err) => {
          client.end();
          console.error('Error streaming file:', err);
          resolve(
            NextResponse.json({ error: 'Error streaming file from FTP server' }, { status: 500 })
          );
        });
      });
    });

    client.on('error', (err) => {
      console.error('FTP connection error:', err);
      resolve(
        NextResponse.json({ error: 'FTP connection error' }, { status: 500 })
      );
    });

    client.connect({
      host: 'ftp.heptagonss.com',
      user: 'uploadheptagon',
      password: 'o5c219Px#',
    });
  });
}
