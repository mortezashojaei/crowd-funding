import { useState } from "react";

export const CreateFund = () => {
  const [fund, setFund] = useState({
    name: null,
    goal: null,
    unit: null,
  });

  function handler(field) {
    return function (e) {
      setFund((f) => ({ ...f, [field]: e.target.value }));
    };
  }
  const { name, goal, unit } = fund;
  const canSubmit = name && goal && unit;

  return (
    <div className="flex flex-col justify-center items-center w-96">
      <h1 className="text-3xl font-bold  mb-16">Create The Project</h1>
      <input
        value={name}
        onChange={handler("name")}
        type="text"
        placeholder="Project Name"
        class="input input-bordered input-info w-full mb-4"
      />

      <input
        value={goal}
        onChange={handler("goal")}
        type="number"
        placeholder="Total Funding"
        class="input input-bordered input-info w-full mb-4"
      />

      <input
        value={unit}
        onChange={handler("unit")}
        type="number"
        placeholder="Funding Unit"
        class="input input-bordered input-info w-full mb-4"
      />

      <button disabled={!canSubmit} class="btn btn-active btn-accent w-full">
        Submit
      </button>
    </div>
  );
};
