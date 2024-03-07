const crypto = require("crypto");

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
        success: !res.status || res.status == "200",
        data: res,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
      };
    });
}

/**
 * Uploads an image to the Backblaze database
 * @param {String} dogId Id of the dog associated with the image
 * @param {Buffer} image Buffer of the image, use API endpoint for help
 * @returns JSON object with success status and information about the upload or error message
 */
export async function uploadImage(dogId, image) {
  const connection = await backblazeConnect();

  if (!connection.success) {
    return connection;
  }

  const uploadData = await fetch(
    `${connection.data.apiInfo.storageApi.apiUrl}/b2api/v3/b2_get_upload_url?bucketId=${bucketId}`,
    {
      method: "GET",
      headers: {
        Authorization: connection.data.authorizationToken,
      },
    },
  )
    .then((response) => response.json())
    .then((res) => {
      return {
        success: !res.status || res.status == "200",
        data: res,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
      };
    });

  if (!uploadData.success) {
    return uploadData;
  }

  const imageName = (
    typeof dogId === "object" ? dogId.toString() : dogId
  ).concat(".png");

  return fetch(uploadData.data.uploadUrl, {
    method: "POST",
    headers: {
      Authorization: uploadData.data.authorizationToken,
      "Content-Type": "image/png",
      "Content-Length": image.length,
      "X-Bz-File-Name": imageName,
      "X-Bz-Content-Sha1": crypto
        .createHash("sha1")
        .update(image)
        .digest("hex"),
    },
    body: image,
  })
    .then((response) => response.json())
    .then((res) => {
      return {
        success: !res.status || res.status == "200",
        data: res,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
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
  ).concat(".png");
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
        success: !res.status || res.status == "200",
        data: res,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
      };
    });
}
