npx create-react-app file-upload-modal
cd file-upload-modal
npm install axios react-dropzone
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
🛠️ Tailwind Setup
In tailwind.config.js:

js
Copy
Edit
content: ["./src/**/*.{js,jsx,ts,tsx}"],
In src/index.css:

css
Copy
Edit
@tailwind base;
@tailwind components;
@tailwind utilities;
✅ Step 2: Implement the App
Replace src/App.js with:

jsx
Copy
Edit
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/*': ['.pdf', '.doc', '.docx', '.txt'] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://example.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': 'your-api-key-here',
        },
      });
      alert('File uploaded successfully!');
      setFile(null);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert('Upload failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload File
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Upload File</h2>

            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-400 p-6 text-center cursor-pointer rounded mb-4 bg-gray-50"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : file ? (
                <p className="text-green-700 font-medium">{file.name}</p>
              ) : (
                <p>Drag and drop a file here, or click to select</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
✅ Step 3: Run the App
bash
Copy
Edit
npm start
