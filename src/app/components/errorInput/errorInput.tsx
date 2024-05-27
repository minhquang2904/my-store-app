import { ErrorMessage } from "formik";

const ErrorInput = (props: any) => {
  const { name } = props;
  return (
    <ErrorMessage
      name={name}
      component="div"
      className="text-secondary text-[1.4em] mt-[4px] font-medium capitalize"
    />
  );
};

export default ErrorInput;
