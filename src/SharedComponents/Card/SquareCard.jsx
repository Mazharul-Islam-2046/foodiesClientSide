import { memo, useState } from "react";

const SquareCard = memo(({ item }) => {

    console.log(item);

    const [isHovered, setIsHovered] = useState(false);







    return (
        <>
            <div className= "card w-80 h-80 ratio-1/1 bg-base-100 shadow-md relative flex justify-center items-center  rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img className={`w-full h-full object-cover transition duration-300 ease-in-out ${isHovered ? "scale-105" : "scale-100"}`} src={item?.imageUrl} alt={item?.name} />
                <div className="absolute flex justify-center items-center h-full w-full bg-black bg-opacity-30 text-white">
                    <p className="text-xl font-medium pb-2">
                        {item.name}
                    </p>
                </div>
            </div>

        </>
    );
});

export default SquareCard;