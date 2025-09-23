import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Vibration } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTodoContext } from './TodoContext';
import { TodoListItem } from './TodoListItem';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export const TodoListScreen = () => {
  const {
    todos,
    text,
    setText,
    handleAddTodo: handleAddTodoOriginal,
    handleUpdateTodo: handleUpdateTodoOriginal,
    handleDeleteTodo: handleDeleteTodoOriginal,
    handleReorder: handleReorderOriginal,
    handleEditTodo,
    editingTodoId,
  } = useTodoContext();

  const flatListRef = useRef(null);
  const inputRef = useRef(null);
  const itemRefs = useRef({});
  const insets = useSafeAreaInsets();

  const [hasShownDemo, setHasShownDemo] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (editingTodoId) {
      inputRef.current?.focus();
    }
  }, [editingTodoId]);

  useEffect(() => {
    if (todos.length === 1 && !hasShownDemo) {
      setHasShownDemo(true);
      setTimeout(() => {
        const firstItemId = todos[0].id;
        const ref = itemRefs.current[firstItemId];
        if (ref) {
          ref.swipeLeft();
          setTimeout(() => {
            ref.close();
            setTimeout(() => {
              ref.swipeRight();
              setTimeout(() => ref.close(), 500);
            }, 500);
          }, 500);
        }
      }, 100);
    }
  }, [todos.length, hasShownDemo]);

  const handleAddTodo = async () => {
    Vibration.vibrate(50);
    await handleAddTodoOriginal();
  };

  const handleUpdateTodo = id => {
    Vibration.vibrate(50);
    handleUpdateTodoOriginal(id);
  };

  const handleDeleteTodo = id => {
    Vibration.vibrate(50);
    handleDeleteTodoOriginal(id);
  };

  const handleReorder = data => {
    Vibration.vibrate(50);
    handleReorderOriginal(data);
  };

  const renderItem = ({ item, _, drag, isActive }) => (
    <TodoListItem
      ref={el => (itemRefs.current[item.id] = el)}
      item={item}
      drag={drag}
      isActive={isActive}
      onUpdate={handleUpdateTodo}
      onDelete={handleDeleteTodo}
      onEdit={handleEditTodo}
    />
  );

  //todo: write own keyboardHeight listener
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={100}
      behavior={'padding'}
    >
      <DraggableFlatList
        containerStyle={styles.listContainer}
        keyboardDismissMode="interactive"
        ref={flatListRef}
        onPlaceholderIndexChange={() => Vibration.vibrate(50)}
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onDragEnd={({ data }) => handleReorder(data)}
        scrollEventThrottle={16}
        onReorde
      />
      <View style={{ paddingBottom: insets.bottom, ...styles.inputContainer }}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Add a new todo..."
          value={text}
          onChangeText={setText}
        />
        <Button
          title={editingTodoId ? 'Change' : 'Add'}
          onPress={async () => {
            await handleAddTodo();
            setTimeout(() => {
              requestAnimationFrame(() => {
                if (flatListRef.current && todos.length > 0) {
                  flatListRef.current.scrollToIndex({
                    index: todos.length - 1,
                    animated: true,
                  });
                }
              });
            }, 370);
          }}
          color="red"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
