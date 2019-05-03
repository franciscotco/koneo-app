import React from 'react';
import { Icon } from 'expo';
import { Platform } from 'react-native';

export default class StarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
        size={22}
        color={this.props.color}
      />
    );
  }
}