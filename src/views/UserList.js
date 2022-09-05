import {View, FlatList, StyleSheet, Alert} from 'react-native';
import React, {useContext} from 'react';
import {ListItem} from '@rneui/base/dist/ListItem';
import {Avatar} from '@rneui/base/dist/Avatar';
import {Button} from '@rneui/base/dist/Button';
import {Icon} from '@rneui/base';
import UsersContext from '../context/UsersContext';

const UserList = props => {
  const {state, dispatch} = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        },
      },
      {
        text: 'não',
      },
    ]);
  }

  function getUserItem({item: user}) {
    return (
      <View style={estilo.list}>
        <ListItem
          chevron={{color: 'black'}}
          onPress={() => props.navigation.navigate('UserForm', user)}>
          <Avatar source={{uri: user.avatarUrl}} />
          <ListItem.Content style={estilo.boxlist}>
            <View style={estilo.textList}>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </View>
            <View style={estilo.buttonList}>
              <Button
                type="clear"
                onPress={() => props.navigation.navigate('UserForm', user)}
                icon={<Icon name="edit" size={25} color="orange" />}
              />
              <Button
                type="clear"
                onPress={() => confirmUserDeletion(user)}
                icon={<Icon name="delete" size={25} color="red" />}
              />
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};

export default UserList;

const estilo = StyleSheet.create({
  list: {marginBottom: 2},
  boxlist: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textList: {
    width: '70%',
  },
  buttonList: {
    flexDirection: 'row',
    width: '30%',
    float: 'right',
  },
});
