export const getFileNameFromDownloadUrl = (downloadUrl) => {
  const fileName = downloadUrl.split("/").pop();
  return fileName;
};
