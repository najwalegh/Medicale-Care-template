import React, { useState } from "react";
import "./Modal.css";
import FileInputComponent from "./FileInputComponent";
import { useForm } from "react-hook-form";
import { useTokenContext } from "../../context/AuthContextProvider";

function Modal({ setOpenModal , start, end ,performNewRdv,performNewDoc,datadoc,idDoctor }) {
  const [nextForm,setNextForm] = useState(false);
  const { token } = useTokenContext();
  const { register, handleSubmit, formState, control, reset } = useForm({
   
  });

  const [formData, setFormData] = useState({
    title: "Prendre un rendez-vous",
    day:start.toISOString().substring(0, 10),
    hour: start.getHours(),
    appointmentType: "Consultation",
    diseases: [],
    scanner: null,
    analyse: null,
  });


  // const formatHour = (hour) => {
  //   if (hour >= 8 && hour <= 12) {
  //     return hour + " AM";
  //   } else if (hour >= 13 && hour <= 17) {
  //     return (hour -12 )  + " PM";
  //   } else {
  //     return ""; 
  //   }
  // };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedDiseases = checked
        ? [...formData.diseases, value]
        : formData.diseases.filter((disease) => disease !== value);
      setFormData({ ...formData, diseases: updatedDiseases });
    } else {
      if (name === "appointmentType" || name === "hour") {
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };
  
  const handleChangeFile = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [fieldName]: file });
  };

  const handleNext = () => {
    setNextForm(true);
    
  };

  const onSubmit = (form) => {
    console.log("Formulaire soumis :", form);
    const documentData ={
      scanner :formData.scanner,
      analyse : formData.analyse
    };

    performNewDoc(documentData);
    alert("id "+datadoc.id);
    const consultationData = {
      description: formData.appointmentType, 
      id_medcin: idDoctor, 
      id_doc: datadoc._id, 
      patient: (token.user.id), 
      startDate: start, 
      endDate: end,
    };
    
    performNewRdv(consultationData);

    setOpenModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="titleCloseBtn">
        
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
        <h1>{formData.title}</h1>
        </div>
        {!nextForm && (
          <>
        <div className="body">
        
            <div className="form-group">
              <label htmlFor="hour">Heure </label>
              <select
                id="hour"
                name="hour"
                defaultValue={formData.hour}
                onChange={handleChange}
              >
                <option value="8">8 AM</option>
                <option value="9">9 AM</option>
                <option value="10">10 AM</option>
                <option value="11">11 AM</option>
                <option value="12">12 AM</option>
                <option value="1">1 PM</option>
                <option value="2">2 PM</option>
                <option value="3">3 PM</option>
                <option value="4">4 PM</option>
                <option value="5">5 PM</option>
              </select>
           </div>
            <div className="form-group">
              <label htmlFor="appointmentType">Type </label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                
              >
                 <option value="Controle">Contrôle</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
          {/* </form>            */}
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
        </>
        )}
        {nextForm && (
          <>
          <div className="body">
        {/* <form > */}
            <div className="Checkbox">
            <label htmlFor="diseases" className="diseases">Tu souffres de quelles maladies</label>
              <div className="checkbox-group">
                <div className="label-input">
                  <label>
                  Maladie 1
                    <input
                      type="checkbox"
                      name="diseases"
                      value="Maladie1"
                      checked={formData.diseases.includes("Maladie1")}
                      onChange={handleChange}
                      
                    />
                  </label>
                </div>
                 <div className="label-input">
                  <label>
                  Maladie 2
                    <input
                      type="checkbox"
                      name="diseases"
                      value="Maladie2"
                      checked={formData.diseases.includes("Maladie2")}
                      onChange={handleChange}
                      
                    />
                  </label>
                </div>
              </div>
              <div className="checkbox-group">  
                <div className="label-input">
                  <label>
                  Maladie 3
                    <input
                      type="checkbox"
                      name="diseases"
                      value="Maladie3"
                      checked={formData.diseases.includes("Maladie3")}
                      onChange={handleChange}
                      
                    />
                  </label>
                </div>
                <div className="label-input">
                  <label>
                  Maladie 4
                    <input
                      type="checkbox"
                      name="diseases"
                      value="Maladie4"
                      checked={formData.diseases.includes("Maladie4")}
                      onChange={handleChange}
                      
                    />
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="file1">Scanner Photos </label>
                <input type="file" id="scanner" name="scanner"  onChange={(e) => handleChangeFile(e, 'scanner')} />

                <label htmlFor="file2">Analyse Results</label>
                <input type="file" id="analyse" name="analyse"  onChange={(e) => handleChangeFile(e, 'analyse')}/>
              </div>
           </div>
          {/* </form>            */}
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button type="submit"  > Validate </button>
        </div>
          </>
        )}
      
      </form >
      </div>
    </div>
  );
}
export default Modal;