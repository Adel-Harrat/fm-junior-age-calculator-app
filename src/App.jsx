import { useState } from "react";
import "./App.css";
import ArrowIcon from "./components/ArrowIcon";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useSpring, animated } from "react-spring";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
}

function App() {
  const [displayDay, setDisplayDay] = useState(null);
  const [displayMonth, setDisplayMonth] = useState(null);
  const [displayYear, setDisplayYear] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const validateDate = () => {
    const day = watch("day");
    const month = watch("month");
    const year = watch("year");
    const date = new Date(year, month - 1, day);

    const isValidDate =
      date.getDate() === parseInt(day) &&
      date.getMonth() + 1 === parseInt(month) &&
      date.getFullYear() === parseInt(year);

    if (!isValidDate) {
      return "Must be a valid day";
    }

    return true;
  };

  const calculateAge = () => {
    const day = watch("day");
    const month = watch("month");
    const year = watch("year");

    const currentDate = moment();
    const birthDate = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");

    const years = currentDate.diff(birthDate, "years");
    birthDate.add(years, "years");

    const months = currentDate.diff(birthDate, "months");
    birthDate.add(months, "months");

    const days = currentDate.diff(birthDate, "days");

    setDisplayDay(days);
    setDisplayMonth(months);
    setDisplayYear(years);

    return { years, months, days };
  };

  function onSubmit(data) {
    calculateAge();
  }

  return (
    <div className="min-h-screen bg-tw-off-white overflow-auto md:grid md:place-items-center">
      <main className="rounded-3xl rounded-br-[8rem] bg-tw-white mx-5 mt-24 md:mt-0 md:max-w-2xl shadow-sm zing-1 ring-zinc-950/10">
        <form
          id="calc-form"
          className="grid grid-cols-3 gap-5 p-6 md:px-12 pb-0 md:w-9/12 md:relative md:z-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="day"
              className={`uppercase text-tw-smokey-grey text-sm tracking-widest ${
                errors.day?.message && "!text-tw-red"
              }`}
            >
              day
            </label>
            <input
              id="day"
              type="number"
              placeholder="DD"
              className={`shadow-sm w-full [appearance:textfield] ring-1 ring-zinc-950/10 focus:outline-none rounded-lg text-xl md:text-2xl px-4 py-3 focus:ring-tw-purple transition duration-300 cursor-pointer ${
                errors.day?.message && "ring-tw-red"
              }`}
              {...register("day", {
                required: "This field is required",
                pattern: {
                  value: /^[1-9][0-9]{0,1}$/,
                  message: "Must be a valid day",
                },
                min: { value: 1, message: "Must be a valid day" },
                max: { value: 31, message: "Must be a valid day" },
                validate: validateDate,
              })}
            />
            {errors.day && (
              <p className="text-xs text-tw-red italic mt-2">
                {errors.day.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="month"
              className={`uppercase text-tw-smokey-grey text-sm tracking-widest ${
                errors.month?.message && "!text-tw-red"
              }`}
            >
              month
            </label>
            <input
              id="month"
              type="number"
              placeholder="MM"
              className={`shadow-sm w-full [appearance:textfield] ring-1 ring-zinc-950/10 focus:outline-none rounded-lg text-xl md:text-2xl px-4 py-3 focus:ring-tw-purple transition duration-300 cursor-pointer ${
                errors.month?.message && "ring-tw-red"
              }`}
              {...register("month", {
                required: "This field is required",
                pattern: {
                  value: /^[1-9][0-9]{0,1}$/,
                  message: "Must be a valid month",
                },
                min: { value: 1, message: "Must be a valid month" },
                max: { value: 12, message: "Must be a valid month" },
              })}
            />
            {errors.month && (
              <p className="text-xs text-tw-red italic mt-2">
                {errors.month.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="year"
              className={`uppercase text-tw-smokey-grey text-sm tracking-widest ${
                errors.year?.message && "!text-tw-red"
              }`}
            >
              year
            </label>
            <input
              id="year"
              type="number"
              placeholder="YYYY"
              className={`shadow-sm w-full [appearance:textfield] ring-1 ring-zinc-950/10 focus:outline-none rounded-lg text-xl md:text-2xl px-4 py-3 focus:ring-tw-purple transition duration-300 cursor-pointer ${
                errors.year?.message && "ring-tw-red"
              }`}
              {...register("year", {
                required: "This field is required",
                pattern: {
                  value: /^(19|20)\d{2}$/,
                  message: "Must be a valid year",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: "Must be in the past",
                },
              })}
            />
            {errors.year && (
              <p className="text-xs text-tw-red italic mt-2">
                {errors.year.message}
              </p>
            )}
          </div>
        </form>

        <div className="relative text-center md:text-right px-6 md:px-12 md:-mt-10">
          <button
            form="calc-form"
            className="bg-tw-purple hover:bg-tw-black transition duration-300 p-3 md:p-6 rounded-full translate-y-6 md:translate-y-10 focus:outline-none"
          >
            <ArrowIcon />
          </button>

          <hr className="border border-tw-off-white" />
        </div>

        <section className="px-6 md:px-12 py-12">
          <h1 className="sr-only">Age in years, months and days</h1>

          <p className="text-5xl md:text-7xl font-bold italic">
            <span className="text-tw-purple">
              {displayYear ? <Number n={displayYear} /> : "--"}
            </span>{" "}
            <span className="text-tw-black">years</span>
          </p>

          <p className="text-5xl md:text-7xl font-bold italic mt-2">
            <span className="text-tw-purple">
              {displayMonth ? <Number n={displayMonth} /> : "--"}
            </span>{" "}
            <span className="text-tw-black">months</span>
          </p>

          <p className="text-5xl md:text-7xl font-bold italic mt-2">
            <span className="text-tw-purple inline">
              {displayDay ? <Number n={displayDay} /> : "--"}
            </span>{" "}
            <span className="text-tw-black">days</span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
