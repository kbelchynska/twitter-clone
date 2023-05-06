import { initMongoose } from "../../lib/mongoose";
import User from "../../models/User";

export default async function handle(req, res) {
    await initMongoose();

    const id = req.query.id;
    const user = await User.findById(id);

    res.json({user});
}