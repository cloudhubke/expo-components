import React, { useState } from 'react';
import { FlatList, Platform, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import * as IntentLauncherAndroid from 'expo-intent-launcher';

import APhoneNumber from 'awesome-phonenumber';

import Fuse from 'fuse.js';

import Ripple from './bread/Components/Ripple';

import Block from './Block';
import Text from './Text';
import Button from './Button';
import SearchComponent from './SearchComponent';
import ThemeContext from './theme/ThemeContext';

const ContactSelector = React.forwardRef((props, ref) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [permissions, setPermissions] = useState(true);

  const phonevalue = props.input.value || props.value;

  const [val, setVal] = useState(phonevalue);

  const thisFlatlist = React.useRef();
  const inputRef = React.useRef();

  const getContacts = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS);
      if (status !== 'granted') {
        setPermissions(false);
      }
    } catch (error) {
      // do nothing
      setPermissions(false);
    }

    if (permissions) {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const contacts = data
          .map((c) => {
            const phone = [...(c.phoneNumbers || [])][0] || {};
            return {
              id: c.id,
              name: c.name,
              phone: phone.number,
            };
          })
          .filter((f) => Boolean(f.phone));

        setContacts(contacts);
        setFiltered(contacts);
      }
    }
  };

  const thisfuse = React.useMemo(() => {
    const options = {
      // includeScore: true,
      useExtendedSearch: true,
      keys: ['name'],
    };

    return new Fuse(contacts, options);
  }, [contacts.length]);

  const handleFilterChange = (value) => {
    const str = `${value}`
      .split(' ')
      .filter((i) => Boolean(i))
      .map((str) => `'${str}`)
      .join(' ');
    // const filtered = thisfuse.search(str || '');
    const filtered = !value ? contacts : thisfuse.search(str || '');
    if (thisFlatlist) {
    }

    setFiltered(filtered.map((i) => i.item || i));
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }

    if (Platform.OS === 'android') {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_MANAGE_APPLICATIONS_SETTINGS
      );
    }
  };

  React.useEffect(() => {
    getContacts();
  }, []);

  React.useEffect(() => {
    if (props.onChangeText && typeof props.onChangeText === 'function') {
      props.onChangeText(val);
    }
  }, [val]);

  const onSelectContact = (contact) => {
    if (contact && contact.phone) {
      const code = APhoneNumber(contact.phone).getRegionCode();
      const pn = new APhoneNumber(contact.phone || '', code || 'KE');
      setVal(pn.getNumber());
    }
  };

  const renderContact = ({ item }) => (
    <Ripple onPress={() => onSelectContact(item)}>
      <Block
        flex={false}
        row
        style={{
          height: 45,
          borderBottomWidth: 0.5,
          borderBottomColor: colors.gray2,
        }}
        padding={[sizes.padding / 3, 0]}
      >
        <Block>
          <Text semibold>{`${item.name}`}</Text>
          <Text darkGray>{`${item.phone}`}</Text>
        </Block>
      </Block>
    </Ripple>
  );

  React.useImperativeHandle(ref, () => ({
    clearInput: () => {
      inputRef.current.clearInput();
    },
  }));

  return (
    <Block flex={false} padding={sizes.padding} pointerEvents="box-none">
      <Block color={colors.milkyWhite}>
        <SearchComponent onChange={handleFilterChange} />
      </Block>
      {!permissions && (
        <Block
          color={colors.milkyWhite}
          card
          shadow
          padding={sizes.padding}
          flex={false}
        >
          <Block flex={false}>
            <Text error>Please enable permission to access contacts</Text>
          </Block>

          <Block row right padding={[sizes.padding / 2, 0]} flex={false}>
            <Button onPress={openSettings}>
              <Text cropped milkyWhite>
                grant permissions
              </Text>
            </Button>
          </Block>
        </Block>
      )}
      <FlatList
        data={filtered}
        renderItem={renderContact}
        keyExtractor={(item, index) => `index-${item.id}-${index}`}
        ref={thisFlatlist}
        keyboardShouldPersistTaps="always"
      />
    </Block>
  );
});

ContactSelector.defaultProps = {
  input: {
    onChange: () => {},
    onBlur: () => {},
    value: '',
  },
  onPhoneChanged: () => {},
};

export default ContactSelector;