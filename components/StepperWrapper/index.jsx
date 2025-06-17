import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { SoftButton } from "@elas/shared/components";

export default function StepperWrapper({ steps, className }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className={className} height={"75%"}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ margin: "10px" }}>
        {steps.map((step, index) => {
          const stepProps = {};
          return (
            <Step key={step.name} {...stepProps}>
              <StepLabel>{step.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Typography sx={{ mt: 0, mb: 0.2 }}>{steps[activeStep].children}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", marginRight: "10px" }}>
          {activeStep !== 0 && (
            <SoftButton
              color="info"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ ml: 1, mb: 1 }}
            >
              Back
            </SoftButton>
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep !== steps.length - 1 && (
            <SoftButton
              variant="outlined"
              size="medium"
              color="info"
              sx={{ mr: 1, mb: 1 }}
              onClick={handleNext}
            >
              Next
            </SoftButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const StepPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
});
StepperWrapper.propTypes = {
  steps: PropTypes.arrayOf(StepPropType).isRequired,
  className: PropTypes.string,
};
