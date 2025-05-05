import React, { useState } from "react";

export default function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (selectedFile) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setError(
          "Invalid file type. Please upload a PDF, image, Word, or Excel file."
        );
        setFile(null);
        return;
      }

      setLoading(true);
      setTimeout(() => {
        setFile(selectedFile);
        setLoading(false);
      }, 1500); // simulate upload time
    }
  };

  const formatFileSize = (size) => {
    return (size / 1024).toFixed(2) + " KB";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Upload a File</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />

        {loading && (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="text-blue-500">Uploading...</span>
          </div>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {file && !loading && (
          <div className="mt-4 text-green-600">
            <p>
              <strong>File Type:</strong> {file.type}
            </p>
            <p>
              <strong>File Size:</strong> {formatFileSize(file.size)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
