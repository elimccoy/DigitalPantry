import { ScrollView } from "react-native-web"
import RecipeRow from "./RecipeRow";


const RecipeGrid = ({ categories }) => {

    return (
        <ScrollView
            vertical={true}
        >
            {categories.map((category) => (
                <RecipeRow recipes={category.recipes} />
            ))}

        </ScrollView>


    )
}

export default RecipeGrid