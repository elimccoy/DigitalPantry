import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeScreen from './RecipeScreen';
import RecipeAddScreen from './RecipeAddScreen';


const RecipeStack = createNativeStackNavigator();

const RecipeStackNav = () => {

    return (
        <RecipeStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <RecipeStack.Screen name="RecipeScreen" component={RecipeScreen} />
            <RecipeStack.Screen name="RecipeAddScreen" component={RecipeAddScreen} />

        </RecipeStack.Navigator>
    );
}

export default RecipeStackNav;