
import { createClient } from 'ftp';
import { Readable } from 'stream';

export class FtpDownload {
  'use server'   
    static async ftpdown() {
      
      try {
        const ftpOptions = {
            host: 'ftp.heptagonss.com',
            user: 'uploadheptagon',
            password: 'o5c219Px#',
          };
        
           console.log("kani");
          // Connect to FTP server
          const ftpClient = new createClient();
          ftpClient.connect(ftpOptions);
        
          ftpClient.on('ready', () => {
            ftpClient.get(`/upload/gggg.d@g.lk/${img}`, (err, stream) => {
              if (err) {
                console.error('FTP Error:', err);
                res.status(500).json({ error: 'Error downloading image' });
                return;
              }
        
              // If the file is retrieved successfully, pipe it to the response stream
              stream.once('close', () => ftpClient.end()); // Close the FTP connection after the transfer
              const readableStream = new Readable().wrap(stream);
              readableStream.pipe(res);
              res.status(200).json({ ok: true });
            });
          });
          // Handle FTP connection errors
          ftpClient.on('error', (err) => {
            console.error('FTP Error:', err);
            res.status(500).json({ error: 'FTP Error' });
          });

      } catch (error) {
        //console.error("Error fetching user details:", error);// You can handle the error in your component if needed
      }
    }
  }

