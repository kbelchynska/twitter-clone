import { initMongoose } from "../../lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import Like from "../../models/Like";

export default async function handle(req,res) {
    await initMongoose();
    const session = await unstable_getServerSession(req, res, authOptions);

    const postId = req.body.id;
    const userId = session.user.id;
    const existingLike = await Like.findOne({author:userId,post:postId});
    if (existingLike) {
        await existingLike.remove();
        res.json(null);
    } else {
        const like = await Like.create({author:userId,post:postId});
        res.json({like});
    }
}