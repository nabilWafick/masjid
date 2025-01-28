import { FC } from "react";

interface AboutSectionProps {
  isEver: boolean;
  title: string;
  image: string;
  description: string;
}

const AboutSection: FC<AboutSectionProps> = ({
  isEver,
  title,
  image,
  description,
}) => {
  return (
    <div className={` ${!isEver ? "bg-muted" : ""}`}>
      <h3 className="text-lg font-semibold pt-7 pb-5 pl-5">{title}</h3>

      {isEver ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center'">
          <div className="h-[400px] relative">
            <img
              src={image}
              alt={title}
              className=" object-cover h-full w-full"
            />
          </div>

          <p className=" text-wrap text-start p-5">{description}</p>
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <p className=" text-wrap text-start p-5">{description}</p>
          <div className="h-[400px] relative">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
