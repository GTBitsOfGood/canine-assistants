const bucketId = process.env.BACKBLAZE_BUCKET_ID;
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

/**
 * Deletes an image from the Backblaze database
 * @param {*} dogId id of the dog's image to be deleted
 * @param {*} imageUrl url of the image from the dog's image field
 * @returns JSON object with success status and name and fileId of deleted image or error message
 */
export async function deleteImage(dogId, imageUrl) {
  const connection = await backblazeConnect();

  if (!connection.success) {
    return connection;
  }

  const imageName = (
    typeof dogId === "object" ? dogId.toString() : dogId
  ).concat(".jpg");
  const imageId = imageUrl.split("fileId=")[1];

  return fetch(
    `${connection.data.apiInfo.storageApi.apiUrl}/b2api/v3/b2_delete_file_version`,
    {
      method: "POST",
      headers: {
        Authorization: connection.data.authorizationToken,
      },
      body: JSON.stringify({
        fileName: imageName,
        fileId: imageId,
      }),
    },
  )
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
