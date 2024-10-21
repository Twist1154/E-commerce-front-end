import axios from "axios";

// Endpoint to get presigned URL
const PRESIGNED_URL_ENDPOINT = "http://localhost:8080/store/s3/presigned-url";

/**
 * Function to get presigned URL from the backend
 * @param {string} fileName - Name of the file to be uploaded
 * @param {string} contentType - MIME type of the file
 * @returns {Object} - Object containing the presigned URL
 */
const getPresignedUrl = async (fileName, contentType) => {
  console.log(
    `Requesting presigned URL for file: ${fileName} with content type: ${contentType}`,
  );

  try {
    const response = await axios.post(PRESIGNED_URL_ENDPOINT, null, {
      params: { fileName, contentType }, // Send params in the request
    });

    console.log("Presigned URL response:", response.data);

    // Validate response structure
    if (!response.data || !response.data.url) {
      console.error(
        'Presigned URL response does not contain "url" property:',
        response.data,
      );
      throw new Error("Invalid response from presigned URL endpoint.");
    }

    return response.data; // { url: '...' }
  } catch (error) {
    console.error("Error getting presigned URL:", error);

    // Enhanced error logging
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw error;
  }
};

/**
 * Function to upload a file to S3 using the presigned URL
 * @param {File} file - The file object to be uploaded
 * @returns {string} - The URL of the uploaded file
 */
export const uploadFileToS3 = async (file) => {
  console.log("Starting uploadFileToS3");
  console.log("File details:", {
    name: file.name,
    type: file.type,
    size: file.size,
  });

  try {
    const { name: fileName, type: contentType } = file;

    // Get presigned URL
    const { url: presignedUrl } = await getPresignedUrl(fileName, contentType);
    console.log("Received presigned URL:", presignedUrl);

    // Validate presignedUrl
    if (!presignedUrl) {
      console.error("Presigned URL is undefined or empty.");
      throw new Error("Failed to retrieve presigned URL.");
    }

    // Upload file to S3 using presigned URL
    console.log("Uploading file to S3 at presigned URL...");
    const uploadResponse = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": contentType,
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });

    console.log("Upload response:", uploadResponse);

    // Check if upload was successful
    if (uploadResponse.status !== 200) {
      console.error(
        `Failed to upload file to S3. Status code: ${uploadResponse.status}`,
      );
      throw new Error(
        `Upload failed with status code ${uploadResponse.status}`,
      );
    }

    // Return the URL of the uploaded file (without query parameters)
    const uploadedFileUrl = presignedUrl.split("?")[0];
    console.log("File successfully uploaded. Accessible at:", uploadedFileUrl);
    return uploadedFileUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);

    // Enhanced error logging
    if (error.response) {
      console.error("Upload error response data:", error.response.data);
      console.error("Upload error response status:", error.response.status);
      console.error("Upload error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received during file upload:", error.request);
    } else {
      console.error("Error setting up file upload request:", error.message);
    }

    throw error;
  }
};
