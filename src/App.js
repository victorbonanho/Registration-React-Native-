import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserList from './views/UserList';
import UserForm from './views/UserForm';
import {Button, Icon} from '@rneui/themed';
import {UsersProvider} from './context/UsersContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserList"
          screenOptions={screenOptions}>
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({navigation}) => {
              return {
                title: 'Lista de Usuários',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('UserForm')}
                    type="clear"
                    icon={<Icon name="add" size={25} color="white" />}
                  />
                ),
              };
            }}
          />
          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{
              title: 'Formulário de usuários',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
};

export default App;

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
