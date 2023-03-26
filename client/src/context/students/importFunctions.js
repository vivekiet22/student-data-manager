export async function sendCsvAsJson(url, csvFile) {
    // Read the CSV file as text
    const csvText = await readFile(csvFile);
  
    // Convert the CSV data to JSON
    const json = convertCsvToJson(csvText);
  
    // Send the JSON data in the request body
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-auth-token": localStorage.getItem("token"),
      
      },
      body: JSON.stringify(json)
    });
  
  }
  
  export function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  }
  
  export function convertCsvToJson(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const jsonData = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = values[j];
      }
      jsonData.push(obj);
    }
    return jsonData;
  }
  