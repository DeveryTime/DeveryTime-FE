import { useParams } from "react-router-dom";
import { SignupPage1 } from "./SignupPage1/SignupPage1";
import { SignupPage2 } from "./SignipPage2/SignupPage2";
import { SignupPage3 } from "./SignupPage3/SignupPage3";

export const SignupPage = () => {
  const { step } = useParams<{ step: string }>();
  switch (step) {
    case "1":
      return <SignupPage1 />;

    case "2":
      return <SignupPage2 />;

    case "3":
      return <SignupPage3 />;
    default:
      return <SignupPage1 />;
  }
  return <></>;
};
