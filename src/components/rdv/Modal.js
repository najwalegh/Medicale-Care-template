import React, { useState } from "react";
import "./Modal.css";

function Modal({ setOpenModal , start  }) {

  const [formData, setFormData] = useState({
    title: "Prendre un rendez-vous",
    hour: start.getHours(),
    appointmentType: "Consultation",
  });

  const formatHour = (hour) => {
    if (hour >= 8 && hour <= 12) {
      return hour + " AM";
    } else if (hour >= 13 && hour <= 17) {
      return (hour -12 )  + " PM";
    } else {
      return ""; 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Formulaire soumis :", formData);
    setOpenModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
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
        <div className="body">
        <form>
            <div className="form-group">
              <label htmlFor="hour">Heure </label>
              <select
                id="hour"
                name="hour"
                defaultValue={formatHour(formData.hour)}
                onChange={handleChange}
              >
                <option value="8 AM">8 AM</option>
                <option value="9 AM">9 AM</option>
                <option value="10 AM">10 AM</option>
                <option value="11 AM">11 AM</option>
                <option value="12 AM">12 AM</option>
                <option value="1 PM">1 PM</option>
                <option value="2 PM">2 PM</option>
                <option value="3 PM">3 PM</option>
                <option value="4 PM">4 PM</option>
                <option value="5 PM">5 PM</option>
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
          </form>           
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
          <button onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;