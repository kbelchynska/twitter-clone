import { initMongoose } from "../../lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req,res) {
    await initMongoose();
    const session = await unstable_getServerSession(req, res, authOptions);

    const postId = req.body.id;
    const userId = session.user.id;
    res.json({id});
}