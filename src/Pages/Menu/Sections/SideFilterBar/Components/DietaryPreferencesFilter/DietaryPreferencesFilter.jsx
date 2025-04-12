

const DietaryPreferencesFilter = ({ dietaryPreferences, onDietaryChange }) => {
    return (
        <>
            <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">Dietary Preferences</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="vegetarian"
                            name="vegetarian"
                            checked={dietaryPreferences.vegetarian}
                            onChange={onDietaryChange}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="vegetarian" className="ml-2 text-gray-700">
                            Vegetarian
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="vegan"
                            name="vegan"
                            checked={dietaryPreferences.vegan}
                            onChange={onDietaryChange}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="vegan" className="ml-2 text-gray-700">
                            Vegan
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="glutenFree"
                            name="glutenFree"
                            checked={dietaryPreferences.glutenFree}
                            onChange={onDietaryChange}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="glutenFree" className="ml-2 text-gray-700">
                            Gluten Free
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="dairyFree"
                            name="dairyFree"
                            checked={dietaryPreferences.dairyFree}
                            onChange={onDietaryChange}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="dairyFree" className="ml-2 text-gray-700">
                            Dairy Free
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DietaryPreferencesFilter;