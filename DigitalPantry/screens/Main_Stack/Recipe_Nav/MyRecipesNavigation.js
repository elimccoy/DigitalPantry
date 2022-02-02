import RecipeAddScreen from "./RecipeAddScreen";
import RecipeScreen from "./RecipeScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RecipeStack = createNativeStackNavigator();

const MyRecipesNavigation = () => {
    return (
        <RecipeStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <RecipeStack.Screen name="RecipeScreen" component={RecipeScreen} />
            <RecipeStack.Screen name="RecipeAddScreen" component={RecipeAddScreen} />

        </RecipeStack.Navigator>
    );
}

export default MyRecipesNavigation;