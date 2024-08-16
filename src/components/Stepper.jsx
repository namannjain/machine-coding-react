import React, { useState } from 'react';
import '../styles/stepper.css';

const defaultSteps = [
  {
    label: "Personal Info",
    content: <div>Personal Information Content</div>,
  },
  {
    label: "Account Info",
    content: <div>Account Info Content</div>,
  },
  {
    label: "Payment",
    content: <div>Payment Content</div>,
  },
  {
    label: "Confirmation",
    content: <div>Confirmation Content</div>,
  },
  {
    label: "Review",
    content: <div>Review Content</div>,
  },
];

function Stepper({ steps = defaultSteps }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="stepper">
      <div>
        {steps.map((step, ind) => {
          return (
            <div key={step.label}  className="step-container">
              <div className={`step-number ${ind <= currentStep ? 'active' : ''}`}>
                {ind+1}
                { ind<steps.length-1 && <div className={`step-line ${ind < currentStep ? 'active' : ''}`}></div>}
              </div>
              <div className="step-label">
                {step.label}
              </div>
            </div>
          )
        })}
      </div>
      <div className="stepper-content">{steps[currentStep].content}</div>
      <div className="stepper-controls">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  )
}

export default Stepper