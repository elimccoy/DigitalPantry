import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeScreen from './RecipeScreen';
import RecipeAddScreen from './RecipeAddScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MySuggested from './MySuggested';

const RecipeStack = createNativeStackNavigator();

const RecipeStackNav = () => {
    return (
        <RecipeStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <RecipeStack.Screen name="RecipeAddScreen" component={RecipeAddScreen} />
            <RecipeStack.Screen name="RecipeScreen" component={RecipeScreen} />

        </RecipeStack.Navigator>
    );
}

export default RecipeStackNav;