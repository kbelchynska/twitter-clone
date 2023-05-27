import multiparty from 'multiparty';
import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import { initMongoose } from '../../lib/mongoose';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import User from '../../models/User';

export default async function handle (req, res) {
    await initMongoose();
    const session = await unstable_getServerSession(req, res, authOptions);

    const s3Client = new S3({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    })

    const form = new multiparty.Form({
        uploadDir: './public'
    });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            throw err;
        }
        const type = Object.keys(files)[0];
        const fileInfo = files[type][0];
        const filename = fileInfo.path.split('/')[1];
        s3Client.upload({
            Bucket: 'kateryna-twitter-clone',
            Body: fs.readFileSync(fileInfo.path),
            ACL: 'public-read',
            Key: filename,
            ContentType: fileInfo.headers['content-type'],
        }, async (err, data) => {
            const user = User.findByIdAndUpdate(session.user.id, {
                [type]: data.Location,
            });
            res.json({files, err, data, fileInfo, src: data.Location});
        });

        res.json(fileInfo);
    });
}

export const config = {
    api: {
        bodyParser: false,
    }
};