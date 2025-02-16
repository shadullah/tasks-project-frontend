import useTasks from "../../../../hooks/useTasks";
// import KeenSlider from "./KeenSlider";
import CountUp from "react-countup";

const Infomation = () => {
  const [tasks] = useTasks();

  const completedtask = tasks.filter((task) => task.completed).length;
  const inProgress = tasks.filter((task) => !task.completed).length;

  // const handleCompleteness = () => {
  //   const completeness = tasks.filter((task) => task.completed);
  //   console.log("i am clicked");
  //   handleComplete(completeness);
  // };

  return (
    <>
      <div className="md:mr-2">
        <h3 className="text-xl">Information</h3>
        <div className="grid grid-cols-3 gap-6 mt-6 md:h-32">
          <div className="bg-red-400 p-2 md:p-4 rounded-md w-full">
            <h4 className="text-xs md:text-xl mb-3">All Tasks</h4>
            <p>
              <span className="text-sm md:text-4xl">
                <CountUp start={0} end={tasks.length} duration={5} />{" "}
              </span>{" "}
              Tasks
            </p>
          </div>
          <div className="bg-indigo-400 p-2 md:p-4 rounded-md cursor-pointer">
            <h4 className="text-xs md:text-xl mb-3">Completed</h4>
            <p>
              <span className="text-sm md:text-4xl">
                <CountUp start={0} end={completedtask} duration={5} />{" "}
              </span>{" "}
              Tasks
            </p>
          </div>
          <div className="bg-cyan-400 p-2 md:p-4 rounded-md">
            <h4 className="text-xs md:text-xl md:mb-3">In Progress</h4>
            <p>
              <span className="text-sm md:text-4xl">
                <CountUp start={0} end={inProgress} duration={5} />{" "}
              </span>{" "}
              Tasks
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Infomation;
