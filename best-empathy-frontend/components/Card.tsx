import React from "react";
import Image from "next/image";

const Card = ({ img }) => {
  return (
    <div className="w-[100%] bg-[#fab1a0] shadow-xl">
      <div>
        <Image
          src={img}
          className="h-[250px] w-[100%] object-cover"
          alt="Reviewer"
        />
        <div className="flex flex-col gap-4 p-[20px]">
          <div>
            <h2 className="font-bold">Member</h2>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              rerum rem. Necessitatibus ipsa dolorum quidem ex numquam
              blanditiis dolore maiores. Laboriosam et, inventore nihil dolore
              facere rerum fuga qui delectus!
            </p>
          </div>
          <div>
            <a className="text-[#4200d0]" href="#">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
