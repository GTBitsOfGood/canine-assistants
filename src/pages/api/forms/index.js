import dbConnect from "../../../../server/db/dbConnect";
import Form from "../../../../server/db/models/Form";
export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      await dbConnect();
      const form = new Form(req.body);
      await form.save();
    } catch (e) {
      console.log(e);
      res.json({
        message: "failed",
      });
      return;
    }
    return res.json({
      success: true,
      message: "Successfully created form",
    });
  }
}
