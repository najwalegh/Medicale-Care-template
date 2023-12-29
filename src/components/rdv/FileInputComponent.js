
import React from "react";
// { onChange }
// onChange={onChange}
const FileInputComponent = () => {
  return (
    <div>
      <label htmlFor="file1">Scanner Photos </label>
      <input type="file" id="scanner" name="scanner"  />

      <label htmlFor="file2">Analyse Results</label>
      <input type="file" id="analyse" name="analyse" />
    </div>
  );
};

export default FileInputComponent;
