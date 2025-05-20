

const SpiceLevelFilter = ({ spiceLevel, onSpiceLevelChange }) => {
    return (
        <>
            <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">Spice Level</h3>
                <select
                    value={spiceLevel}
                    onChange={onSpiceLevelChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Any Spice Level</option>
                    <option value="not_spicy">Not Spicy</option>
                    <option value="mild">Mild</option>
                    <option value="medium">Medium</option>
                    <option value="spicy">Spicy</option>
                    <option value="hot">Very Spicy</option>
                </select>
            </div>
        </>
    );
};

export default SpiceLevelFilter;