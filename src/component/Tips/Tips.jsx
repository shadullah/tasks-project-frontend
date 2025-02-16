import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import laptop from "../../assets/Laptop1.jpeg";
import logs from "../../assets/dashboard.webp";
import custom from "../../assets/custom.webp";
import {
  IoMdCheckmarkCircle,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
// import useTasks from "../../hooks/useTasks";

const Tips = ({ setCompleted }) => {
  return (
    <div className="w-full md:w-80 mx-auto">
      <Swiper
        grabCursor={true}
        effect={"creative"}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper3 p-2 md:p-6"
      >
        <SwiperSlide className=" bg-gray-600/60 rounded-lg">
          <img
            className="rounded-t-lg h-64 w-72 md:h-64 md:w-80"
            src={laptop}
            alt=""
          />
          <h3 className="mb-3 text-sm md:text-xl mt-6 font-bold px-6 md:px-12 text-center">
            Manage Your Daily Task with Work Notes
          </h3>
          <p className="mb-12 px-6 md:px-12 text-xs md:text-sm text-justify">
            Categorizing your task in regular, urgent, important priority. so
            that you dont have to hassle
          </p>
        </SwiperSlide>
        <SwiperSlide className=" bg-gray-600/60 rounded-lg">
          <img
            className="rounded-t-lg h-64 w-72 md:h-72 md:w-80 bg-transparent"
            src={logs}
            alt=""
          />
          <h3 className="mb-3 text-sm md:text-xl mt-6 font-bold px-6 md:px-12 text-center">
            Sign Up to Explore
          </h3>
          <p className="mb-12 px-6 md:px-12 text-xs md:text-sm text-justify">
            Create an account and Manage your works as per your priority. Get
            updates of your progress daily.
          </p>
        </SwiperSlide>
        <SwiperSlide className=" bg-gray-600/60 rounded-lg">
          <img
            className="rounded-t-lg h-64 w-72 md:h-64 md:w-80"
            src={custom}
            alt=""
          />
          <h3 className="mb-3 text-sm md:text-xl mt-6 font-bold px-6 md:px-12 text-center">
            Customize your Notes as your Want
          </h3>
          <p className="mb-12 px-6 md:px-12 text-xs md:text-sm text-justify">
            You can edit, delete nd add task as per your requirement. your task
            can be sort as Priorities too
          </p>
        </SwiperSlide>
      </Swiper>

      <div className="p-6">
        <h1 className="text-xl mb-6">Filter by:</h1>
        <div className="block md:flex space-x-1 items-center justify-between">
          {/* <p className=`{hover: <RiCompass2Fill />}`>Completed</p>
           */}
          <button onClick={() => setCompleted("true")}>
            <p className="bg-gray-600 flex items-center px-2 py-2 rounded-lg my-2">
              Completed <IoMdCheckmarkCircle className="ml-2 text-green-600" />
            </p>
          </button>
          <button onClick={() => setCompleted("false")}>
            <p className="bg-gray-600 flex items-center px-2 py-2 rounded-lg my-2">
              Incompleted{" "}
              <IoMdCheckmarkCircleOutline className="inline ml-2 text-red-600" />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tips;
