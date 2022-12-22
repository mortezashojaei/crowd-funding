import { useEffect, useState } from "react";
import { getProjects, invest } from "../services";

export const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvesting, setIsInvesting] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setIsLoading(true);
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleInvest(address, share) {
    setIsInvesting({ ...isInvesting, [address]: true });
    invest(address, share).then(() => {
      setIsInvesting({ ...isInvesting, [address]: false });
      fetchProjects();
    });
  }
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
          {projects.map((project, index) => (
            <tr key={project.address}>
              <th>{index + 1}</th>
              <td className="font-medium">{project.name}</td>
              <td className="text-center font-bold">{project.share}</td>
              <td>
                <div className="flex flex-col justify-center items-center text-purple-600 font-extrabold">
                  <small>{`${project.balance} / ${project.goal}`}</small>
                  <progress
                    className="progress progress-primary w-24"
                    value={project.balance}
                    max={project.goal}
                  ></progress>
                </div>
              </td>
              <td>
                {project.balance._hex === project.goal._hex ? (
                  <button
                    className={`btn btn-info btn-sm btn-accent w-32 cursor-not-allowed`}
                  >
                    Closed
                  </button>
                ) : (
                  <button
                    disabled={isInvesting[project.address]}
                    onClick={() => handleInvest(project.address, project.share)}
                    className={`btn btn-active btn-sm btn-accent w-32 ${
                      !!isInvesting[project.address] ? "loading" : ""
                    }`}
                  >
                    {isInvesting[project.address] ? "Investing" : "Invest"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="flex justify-center w-full mt-12">
          <progress className="progress w-56 progress-info"></progress>
        </div>
      )}
    </div>
  );
};
