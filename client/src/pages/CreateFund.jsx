import { useState } from "react";
import { createProject } from "../services";

export const CreateFund = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fund, setFund] = useState({
    name: null,
    goal: null,
    share: null,
  });

  function handler(field) {
    return function (e) {
      setFund((f) => ({ ...f, [field]: e.target.value }));
    };
  }

  async function handleSubmit() {
    setIsLoading(true);
    createProject(fund)
      .catch(() => {
        alert("Project is not created please make sure you have enough Moken!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const { name, goal, share } = fund;
  const canSubmit = name && goal && share;

  return (
    <div className="flex flex-col justify-center items-center w-96">
      <h1 className="text-3xl font-bold  mb-16">Create A Project</h1>
      <input
        value={name}
        onChange={handler("name")}
        type="text"
        placeholder="Project Name"
        className="input input-bordered input-info w-full mb-4"
      />

      <input
        value={goal}
        onChange={handler("goal")}
        type="number"
        placeholder="Total Funding"
        className="input input-bordered input-info w-full mb-4"
      />

      <input
        value={share}
        onChange={handler("share")}
        type="number"
        placeholder="Funding Share per wallet"
        className="input input-bordered input-info w-full mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={!canSubmit || isLoading}
        className={`btn ${
          isLoading ? "loading" : "btn-active"
        } btn-accent w-full`}
      >
        {isLoading ? "Waiting for transaction" : "Submit"}
      </button>
    </div>
  );
};
