import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DatePicker } from './native-base/basic/DatePicker';

const styles = {
  dateInput: (error) => ({
    height: 45,
    borderWidth: 0.5,
    marginBottom: 5,
    borderColor: error ? '#F44336' : '#CCC',
    borderRadius: 5,
  }),
  error: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 2.5,
    marginBottom: 5,
  },
};

export default class DatePickerExample extends Component {
  static defaultProps = {
    value: 0,
    onChange: () => {},
    input: {
      value: 0,
      onChange: () => {},
    },
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = { chosenDate: null };
    this.setDate = this.setDate.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const value = nextProps.input.value || nextProps.value;
    if (value) {
      return { ...prevState, chosenDate: new Date(value) };
    }
    return { ...prevState };
  }

  setDate(newDate) {
    this.props.input.onChange(new Date(newDate).getTime());
    this.props.onChange(new Date(newDate).getTime());
  }

  render() {
    const { meta, disabled } = this.props;
    return (
      <View style={styles.dateInput()}>
        <DatePicker
          defaultDate={this.state.chosenDate}
          minimumDate={new Date(1900, 1, 1)}
          maximumDate={new Date(2100, 12, 31)}
          locale="en"
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType="fade"
          androidMode="default"
          textStyle={{ color: '#333' }}
          placeHolderTextStyle={{ color: '#d3d3d3' }}
          onDateChange={this.setDate}
          disabled={disabled}
        />

        {meta.touched && meta.error && (
          <Text style={styles.error}>{meta.error}</Text>
        )}
      </View>
    );
  }
}
