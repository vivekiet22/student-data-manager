import React, { useState } from 'react';
import Papa from 'papaparse';

function CsvToJsonConverter() {
  const [csvFile, setCsvFile] = useState(null);
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
  };

  const handleFileConversion = () => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const csvData = event.target.result;
      const json = Papa.parse(csvData, { header: true });
      setJsonOutput(JSON.stringify(json.data));
    };
    fileReader.readAsText(csvFile);
  };

  return (
    <div>
      <h1>CSV to JSON Converter</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={handleFileConversion} disabled={!csvFile}>
        Convert
      </button>
      {jsonOutput && (
        <pre>{jsonOutput}</pre>
      )}
    </div>
  );
}

export default CsvToJsonConverter;
