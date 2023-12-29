
import React from "react";
// { onChange }
// onChange={onChange}
const FileInputComponent = () => {
  return (
    <div>
      <label htmlFor="file1">Fichier 1</label>
      <input type="file" id="file1" name="file1"  />

      <label htmlFor="file2">Fichier 2</label>
      <input type="file" id="file2" name="file2" />
    </div>
  );
};

export default FileInputComponent;
