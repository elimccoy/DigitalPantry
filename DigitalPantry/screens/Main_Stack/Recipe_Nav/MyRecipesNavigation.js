import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeAddScreen from './RecipeAddScreen';
import RecipeScreen from './RecipeScreen';
import RecipeEditScreen from './RecipeEditScreen';
import RecipeInfoScreen from './RecipeInfoScreen';

const RecipeStack = createNativeStackNavigator();

const MyRecipesNavigation = () => {
    return (
        <RecipeStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <RecipeStack.Screen name="RecipeScreen" component={RecipeScreen} />
            <RecipeStack.Screen name="RecipeAddScreen" component={RecipeAddScreen} />
            <RecipeStack.Screen name="RecipeEditScreen" component={RecipeEditScreen} />
            <RecipeStack.Screen name="RecipeInfoScreen" component={RecipeInfoScreen} />

        </RecipeStack.Navigator>
    );
}

export default MyRecipesNavigation;