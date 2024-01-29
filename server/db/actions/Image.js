const accountId = process.env.BACKBLAZE_BUCKET_ID;
const applicationKeyId = process.env.BACKBLAZE_KEY_ID;
const applicationKey = process.env.BACKBLAZE_APP_KEY;

export async function backblazeConnect() {
  return fetch("https://api.backblazeb2.com/b2api/v3/b2_authorize_account", {
    method: "GET",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(applicationKeyId + ":" + applicationKey).toString("base64"),
    },
  })
    .then((response) => response.json())
    .then((res) => {
      return {
        success: true,
        data: res,
      };
    })
    .catch((err) => {
      return {
        success: false,
        error: err,
      };
    });
}
