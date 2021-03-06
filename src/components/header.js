import { View, Platform } from 'react-native';
import React from 'react';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { changePage, back } from '../store/page-reducer';
import { connect } from 'react-redux';
import { invalidateToken } from '../store/user-reducer';

const mapDispatchToProps = { changePage, back, invalidateToken };

function Header(props) {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const signOut = () => {
    props.invalidateToken();
    props.changePage('Sign In');
  }

  const back = () => {
    //change props
    props.back();
  }

  return (

    <View>
      <Appbar.Header>
        <Appbar.BackAction disabled={props.page.navigationStack.length <= 1} onPress={() => { back() }} />
        <Appbar.Content title={props.page.page} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={< Appbar.Action color={'white'} icon={MORE_ICON} onPress={openMenu}
          />}>
          <Menu.Item onPress={() => { props.changePage('Add Medication'), closeMenu() }} title="Add Medication" />
          <Divider />
          <Menu.Item onPress={() => { props.changePage('Take Medication'), closeMenu() }} title="Take Medication" />
          <Divider />
          <Menu.Item onPress={() => { props.changePage('Medication History'), closeMenu() }} title="Medication History" />
          <Divider />
          <Menu.Item onPress={() => { signOut(), closeMenu() }} title="Sign Out" />
        </Menu>
      </Appbar.Header>
    </View>
  )
}

const mapStateToProps = state => ({
  page: state.pageReducer
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);