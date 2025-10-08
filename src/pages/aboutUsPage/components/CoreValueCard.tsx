import React from "react";
import { IconType } from "react-icons";

type CoreValueCardProps = {
  title: string;
  description: string;
  Icon: IconType;
};

export const CoreValueCard: React.FC<CoreValueCardProps> = ({
  title,
  description,
  Icon,
}) => {
  return (
    <div className="bg-blue-50 shadow-md rounded-lg h-full p-6 flex flex-col items-center cursor-pointer text-center hover:shadow-xl transition duration-300">
       <Icon className="text-4xl text-blue-700 mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
