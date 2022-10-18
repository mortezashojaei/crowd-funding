export const ProjectsList = () => {
  const list = [
    {
      address: "0x000000000000000000000000000000",
      name: "Koriko: A Magical Year",
      unit: 100,
      goal: 6000,
      balance: 5100,
      isClaimed: false,
      isCompleted: false,
    },
    {
      address: "0x000000000000000000000000000001",
      name: "The Invisible Dog, Season 14",
      unit: 250,
      goal: 10000,
      balance: 1000,
      isClaimed: false,
      isCompleted: false,
    },
    {
      address: "0x0000000000000000000000000000010",
      name: "Yarbo: An Intelligent Yard Robot to Meet All Yard Care Needs",
      unit: 50,
      goal: 600,
      balance: 278,
      isClaimed: false,
      isCompleted: false,
    },
    {
      address: "0x000000000000000000000000000011",
      name: "'Water' a photo book by Ian Berry",
      unit: 1000,
      goal: 200000,
      balance: 110000,
      isClaimed: false,
      isCompleted: false,
    },
  ];
  return (
    <div className="overflow-x-auto w-256">
      <h1 className="text-3xl font-bold  mb-16">
        Bring a creative project to life!
      </h1>

      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th className="text-center">Share</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((project, index) => (
            <tr>
              <th>{index + 1}</th>
              <td className="font-medium">{project.name}</td>
              <td className="text-center font-bold">{project.unit}</td>
              <td>
                <div className="flex flex-col justify-center items-center text-purple-600 font-extrabold">
                  <small>{`${project.balance} / ${project.goal}`}</small>
                  <progress
                    class="progress progress-primary w-24"
                    value={project.balance}
                    max={project.goal}
                  ></progress>
                </div>
              </td>
              <td>
                <button class="btn btn-active btn-sm btn-accent w-24">
                  Invest
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
