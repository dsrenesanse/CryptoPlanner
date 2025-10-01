import { useTodoContext } from './TodoContext';
import { View, Text } from 'react-native';

export const TodoCounter = () => {
  const { todos } = useTodoContext();

  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <View>
      <Text>
        <Text style={{ color: 'red' }}>{completedTodosCount}</Text> /{' '}
        {todos.length}
      </Text>
    </View>
  );
};
