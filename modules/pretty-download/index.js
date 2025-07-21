import promisify from 'util';
import { existsSync, unlinkSync } from 'fs';

export default {
  routes() {
    return {
      get: {
        async '/api/v1/pretty-download/:id'(req, res) {
          const _id = req.params.id;
          let attachment;
          const copyOut = promisify(self.apos.attachment.uploadfs.copyOut);
          let tempFile;
          try {
            attachment = await self.apos.attachment.db.findOne({ _id });
            if (!attachment) {
              return res.status(404).send('notfound');
            }
            const uploadfsPath = self.apos.attachment.url(attachment, { uploadfsPath: true });
            tempFile = self.uploadfs.getTempPath() + '/' + self.apos.util.generateId() + '.' + attachment.extension;
            await copyOut(uploadfsPath, tempFile);
            const sendFile = promisify(res.sendFile.bind(res));
            await sendFile(tempFile, {
              headers: {
                'content-disposition': `attachment; filename="${attachment.name}.${attachment.extension}`
              }
            });
          } catch (e) {
            self.apos.util.error('error in pretty download:', e);
            return res.status(500).send('error');
          } finally {
            if (tempFile && existsSync(tempFile)) {
              unlinkSync(tempFile);
            }
          }
        }
      }
    };
  }
}