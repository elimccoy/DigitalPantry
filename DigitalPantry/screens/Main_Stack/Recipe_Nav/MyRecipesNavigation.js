import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeAddScreen from './RecipeAddScreen';
import RecipeScreen from './RecipeScreen';


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