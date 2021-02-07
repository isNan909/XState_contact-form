import React, { useContext, useRef } from 'react';
import { MachineContext } from '../state/index';

import { Submit } from './Submitbutton';
import team from '../assets/team.png';

function ContactForm() {
  const name = useRef();
  const address = useRef();
  const phone = useRef();
  const about = useRef();
  const [machine, sendToMachine] = useContext(MachineContext);

  const sendMessage = async () => {
    const Name = name.current.value;
    const Address = address.current.value;
    const Phone = phone.current.value;
    const About = about.current.value;
    sendToMachine('SEND', { Name, Address, Phone, About });
  };

  return (
    <div>
      <section id="hero">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-6 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <small className="pb-2 text-primary fw-bold">
                BUILD SOFTWARE WITH CONFIDENCE
              </small>
              <h2 className="mb-4 fw-bolder">
                We are team of talented developers working to turn the strategy
                into an actionable plan.
              </h2>
              <form type="submit">
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    ref={name}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    ref={address}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never spam your email.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputNumber"
                    aria-describedby="emailHelp"
                    ref={phone}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Tell us about your project
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    ref={about}
                  />
                </div>
              </form>
              {machine.matches('sending') && (
                <span>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </span>
              )}
              {machine.matches('success') && (
                <span>
                  Thankyou for contacting us. we will get back to you soon.
                </span>
              )}
              {machine.matches('idle') && (
                <Submit clickSubmit={() => sendMessage()} />
              )}
              {machine.matches('failed') && <span>Failed in submittion</span>}
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img">
              <img src={team} className="img-fluid" alt="team members" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactForm;
