import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TodoListScreenPresenter } from './src/features/todos/UI/TodoListScreenPresenter';
import { TodoListScreen } from './src/features/todos/UI/TodoListScreen';
import { AuthRepositoryLocal } from './src/features/auth/data/AuthRepositoryLocal';
import { AuthenticateUseCase } from './src/features/auth/domain/AuthenticateUseCase';
import { TodoRepositoryAsyncStorage } from './src/features/todos/data/TodoRepositoryAsyncStorage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { TodoUseCase } from './src/features/todos/domain/TodoUseCase';
import { TodoCounter } from './src/features/todos/UI/TodoCounter';

const Stack = createStackNavigator();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    };
    prepare();
  }, []);

  if (!isReady) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const authRepository = new AuthRepositoryLocal();
  const todoRepository = new TodoRepositoryAsyncStorage();

  const authenticateUseCase = new AuthenticateUseCase(authRepository);

  const boundExecute = authenticateUseCase.execute.bind(authenticateUseCase);
  const todoUseCase = new TodoUseCase(todoRepository, boundExecute);

  return (
    <KeyboardProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <TodoListScreenPresenter todoUseCase={todoUseCase}>
            <Stack.Navigator>
              <Stack.Screen
                name="Todos"
                component={TodoListScreen}
                options={{
                  title: 'TODO List',
                  headerRightContainerStyle: {
                    marginEnd: 15,
                  },
                  headerRight: () => <TodoCounter />,
                }}
              ></Stack.Screen>
            </Stack.Navigator>
          </TodoListScreenPresenter>
        </NavigationContainer>
      </GestureHandlerRootView>
    </KeyboardProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  counter: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
