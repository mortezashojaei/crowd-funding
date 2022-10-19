import { useEffect, useState } from "react";
import { getProjects } from "../services";

export const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
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
            <tr>
              <th>{index + 1}</th>
              <td className="font-medium">{project.name}</td>
              <td className="text-center font-bold">{project.share}</td>
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
      {isLoading && (
        <div className="flex justify-center w-full mt-12">
          <progress class="progress w-56 progress-info"></progress>
        </div>
      )}
    </div>
  );
};
