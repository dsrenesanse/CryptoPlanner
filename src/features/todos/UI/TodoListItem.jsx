import React, { useRef, useImperativeHandle } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export const TodoListItem = React.forwardRef((props, ref) => {
  const swipeableRef = useRef(null);

  useImperativeHandle(ref, () => ({
    swipeLeft: () => swipeableRef.current?.openLeft(),
    swipeRight: () => swipeableRef.current?.openRight(),
    close: () => swipeableRef.current?.close(),
  }));

  const renderLeftActions = (_, __, id) => {
    return (
      <RectButton
        style={styles.editButton}
        onPress={() => handleEdit(props.item.id, props.item.text)}
      >
        <Animated.View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </Animated.View>
      </RectButton>
    );
  };

  const renderRightActions = (_, __, id) => {
    return (
      <RectButton
        style={styles.deleteButton}
        onPress={() => props.onDelete(id)}
      >
        <Animated.View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Animated.View>
      </RectButton>
    );
  };

  const handleEdit = (id, text) => {
    props.onEdit(id, text);
    swipeableRef.current?.close();
  };

  return (
    <Swipeable
      ref={swipeableRef}
      containerStyle={{ backgroundColor: 'white' }}
      renderLeftActions={(progress, dragX) =>
        renderLeftActions(progress, dragX, props.item.id)
      }
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, props.item.id)
      }
      overshootLeft={false}
      overshootRight={false}
      leftThreshold={30}
      rightThreshold={30}
    >
      <TouchableOpacity
        onPress={() => props.onUpdate(props.item.id)}
        onLongPress={props.drag}
        style={[styles.todoItem, props.isActive && styles.activeItem]}
      >
        <Text
          style={[styles.todoText, props.item.completed && styles.completed]}
        >
          {props.item.text}
        </Text>
        <View style={styles.dragHandle}>
          <View style={styles.dragLine} />
          <View style={styles.dragLine} />
          <View style={styles.dragLine} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
});

const styles = {
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  activeItem: {
    backgroundColor: '#f0f0f0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
  },
  todoText: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff5c5c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  dragHandle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 5,
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  dragLine: {
    width: 20,
    height: 2,
    backgroundColor: '#888',
    borderRadius: 2,
    marginVertical: 2,
  },
};
