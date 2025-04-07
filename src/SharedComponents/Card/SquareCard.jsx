import { memo } from "react";

const SquareCard = memo(({ item }) => {

    console.log(item);







    return (
        <>
            <div className={`card w-80 ratio-1/1 bg-base-100 shadow-md bg-[url('${item.image}')]`}>
                <p>
                    {/* {item.category} */}
                    Category
                </p>
            </div>

        </>
    );
});

export default SquareCard;