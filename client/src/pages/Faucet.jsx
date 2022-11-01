import { requestToken } from "../services";

export const Faucet = () => {
  //   function requestToken() {
  //     requestToken()
  //   }
  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="text-2xl font-semibold text-gray-600">
        Get some tokens, then use it for funding projects!
      </h1>

      <button
        onClick={() => requestToken()}
        className="btn btn-info btn-primary mt-8 mx-auto"
      >
        Request for Moken!
      </button>
    </div>
  );
};
