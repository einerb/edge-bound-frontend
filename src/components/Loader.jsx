import { FidgetSpinner } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="container-loader">
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        backgroundColor="#2b24f7"
      />
    </div>
  );
};
