import React, { FormEvent, useState } from "react";
import Select from "react-select";
import UserDetailsForm from "./UserDetailsForm";
import BillingDetailsForm from "./BillingDetailsForm";
import SuccessfulPayment from "./SuccessfulPayment";

const MultiStepSignUpForm = (props) => {
  switch (props.step) {
    case 1:
      return (
        <UserDetailsForm
          values={props.values}
          handleInputChange={props.handleInputChange}
          handleInputChangeSelect={props.handleInputChangeSelect}
          updateValue={props.updateValue}
          setAddressValue={props.setAddressValue}
          setFormattedAddressValue={props.setFormattedAddressValue}
          formattedAddress={props.formattedAddress}
          setClassification={props.setClassification}
          setValues={props.setValues}
          setCity={props.setCity}
          setState={props.setState}
          setCountry={props.setCountry}
          setCoordinates={props.setCoordinates}
        />
      );
    case 2:
      return (
        <BillingDetailsForm
          values={props.values}
          handleInputChange={props.handleInputChange}
          handleInputChangeSelect={props.handleInputChangeSelect}
          updateValue={props.updateValue}
          nextStep={props.nextButton}
          handleChangeCheckbox={props.handleChangeCheckbox}
          termsOfPrivacyChecked={props.termsOfPrivacyChecked}
          termsOfServiceChecked={props.termsOfServiceChecked}
          validateBillingForm={props.validateBillingForm}
          canceledPaypalPayment={props.canceledPaypalPayment}
          successfulPayment={props.successfulPayment}
        />
      );
    case 3:
      return <SuccessfulPayment values={props.values} />;
  }
};

export default MultiStepSignUpForm;
