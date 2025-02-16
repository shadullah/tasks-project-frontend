import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { PiPushPinBold } from "react-icons/pi";
import { TbUrgent } from "react-icons/tb";
import { CiStickyNote } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";
import useTasks from "../../../../hooks/useTasks";

const KeenSlider = ({ setQuery }) => {
  const [tasks] = useTasks();
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    autoSlide: true,
    slides: {
      origin: "center",
      perView: 2,
      spacing: 15,
    },
  });

  const urgent = tasks.filter((task) => task?.priority[0] == "urgent").length;
  const important = tasks.filter(
    (task) => task?.priority[0] == "important"
  ).length;
  const regular = tasks.filter((task) => task?.priority[0] == "regular").length;

  return (
    <div className="mt-6 md:mt-0">
      <h3 className="text-xl text-center">Priorities</h3>
      <div ref={sliderRef} className="keen-slider mt-6">
        <div className="keen-slider__slide number-slide3 bg-gray-700 p-4 rounded-md border-gray-500 border-[1px]">
          <button onClick={() => setQuery("urgent")}>
            <span className="text-4xl">
              <TbUrgent className="text-amber-400" />
            </span>
            <div className="flex items-center mt-2">
              <h3 className="text-xl mr-3">Urgent Task</h3>
              <FaLongArrowAltRight />
            </div>
            <p className="text-start">{urgent} Tasks</p>
          </button>
        </div>
        <div className="keen-slider__slide number-slide3 bg-gray-700 p-4 rounded-md border-gray-500 border-[1px]">
          <button onClick={() => setQuery("important")}>
            <span className="text-4xl">
              <PiPushPinBold className="text-pink-400" />
            </span>
            <div className="flex items-center mt-2">
              <h3 className="text-xl mr-3">Important Task</h3>
              <FaLongArrowAltRight />
            </div>
            <p className="text-start">{important} Tasks</p>
          </button>
        </div>
        <div className="keen-slider__slide number-slide3 bg-gray-700 p-4 rounded-md border-gray-500 border-[1px]">
          <button onClick={() => setQuery("regular")}>
            <span className="text-4xl">
              <CiStickyNote className="text-sky-400" />
            </span>
            <div className="flex items-center mt-2">
              <h3 className="text-xl mr-3">Regular Task</h3>
              <FaLongArrowAltRight />
            </div>
            <p className="text-start">{regular} Tasks</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeenSlider;
