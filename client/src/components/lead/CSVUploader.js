import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import './CSVUploader.css';
import CircularProgress from '../ui/CircularProgress';

const CSVUploader = ({ onCancel, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [step, setStep] = useState('initial'); // 'initial', 'confirming', 'uploading', 'display'
  const [progress, setProgress] = useState(0);
  const [csvData, setCsvData] = useState([]);

  const handleNext = () => {
      if (files.length > 0) {
          setStep('confirming');
      }
  };

  const handleUpload = () => {
    setStep('uploading');
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                // Parse CSV after upload simulation
                parseCSV(files[0]);
                setStep('display');
                return 100;
            }
            return prev + 10;
        });
    }, 200);
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        if (onUpload) onUpload(results.data);
      },
      error: (err) => {
        alert('Failed to parse CSV: ' + err.message);
      }
    });
  };

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
    }))]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: { 'text/csv': ['.csv'] }
  });

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const renderInitial = () => (
    <>
      <div {...getRootProps({className: 'drop-zone'})}>
        <input {...getInputProps()} />
        <p>Drag your file(s) to start uploading or <button type="button" onClick={open} className="browse-link">Browse files</button></p>
      </div>
      <div className="file-list">
        {files.map(file => (
            <div className="file-item" key={file.path}>
                <span>{file.path} - {file.size} bytes</span>
                <button onClick={() => removeFile(file.name)}>X</button>
            </div>
        ))}
      </div>
      <div className="modal-actions">
        <button className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn-primary" onClick={handleNext} disabled={files.length === 0}>Next</button>
      </div>
    </>
  );

  const renderConfirming = () => (
      <>
        <div className="file-list">
            {/* Using the first file for simplicity */}
            <div className="file-item-lg">
                <span>{files[0].name}</span>
                <span>{(files[0].size / 1024 / 1024).toFixed(2)}MB</span>
            </div>
        </div>
        <p className="confirmation-text">
            All the Leads will be distributed among other employees Equally.
        </p>
        <div className="modal-actions">
            <button className="btn-secondary" onClick={() => setStep('initial')}>Cancel</button>
            <button className="btn-primary" onClick={handleUpload}>Confirm</button>
        </div>
    </>
  );

  const renderUploading = () => (
      <div className="uploading-view">
        <CircularProgress progress={progress} />
        <p>Verifying...</p>
        <button className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
  );

  const renderDisplay = () => (
    <div className="csv-display-table-wrapper">
      <h4>CSV Data</h4>
      {csvData.length === 0 ? <p>No data found in CSV.</p> : (
        <table className="csv-display-table">
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, idx) => (
              <tr key={idx}>
                {Object.keys(csvData[0]).map((key) => (
                  <td key={key}>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="modal-actions">
        <button className="btn-primary" onClick={onCancel}>Done</button>
      </div>
    </div>
  );

  const renderStep = () => {
      switch (step) {
          case 'confirming': return renderConfirming();
          case 'uploading': return renderUploading();
          case 'display': return renderDisplay();
          case 'initial':
          default:
              return renderInitial();
      }
  }

  return (
    <div className="csv-uploader">
      <h3 className="uploader-title">CSV Upload</h3>
      <p className="uploader-subtitle">Add your documents here</p>
      {renderStep()}
    </div>
  );
};

export default CSVUploader; 