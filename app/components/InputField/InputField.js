/**
 * Custom Floating Text Field
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Platform
} from 'react-native'
import styles from './InputFieldStyle';

class FloatingLabel extends Component {
  constructor(props) {
    super(props);

    let initialPadding = 9;
    let initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity)
    }
  }

  componentWillReceiveProps(newProps) {
    Animated.timing(this.state.paddingAnim, {
      toValue: newProps.visible ? 5 : 9,
      duration: 230,
      useNativeDriver: false,
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 230,
      useNativeDriver: false,
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.floatingLabel, { paddingTop: this.state.paddingAnim, opacity: this.state.opacityAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class TextFieldHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
    }
  }

  componentWillReceiveProps(newProps) {
    return Animated.timing(this.state.marginAnim, {
      toValue: newProps.withValue ? 10 : 0,
      duration: 230,
      useNativeDriver: false,
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class FloatLabelTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      text: this.props.value
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty('value') && newProps.value !== this.state.text) {
      this.setState({ text: newProps.value })
    }
  }

  leftPadding() {
    return { width: this.props.leftPadding || 0 }
  }

  withBorder() {
    if (!this.props.noBorder) {
      return styles.withBorder;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.paddingView, this.leftPadding()]} />
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={this.state.text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>{this.placeholderValue()}</Text>
            </FloatingLabel>
            <TextFieldHolder withValue={this.state.text}>
              <TextInput {...this.props}
                ref={(input) => { this.props.setReference && this.props.setReference(input) }}
                underlineColorAndroid="transparent"
                style={this.props.style ? this.props.style : styles.valueText}
                placeholderTextColor={'#aeaeae'}
                defaultValue={this.props.defaultValue}
                value={this.state.text}
                maxLength={this.props.maxLength}
                onFocus={() => this.setFocus()}
                onBlur={() => this.unsetFocus()}
                onChangeText={(value) => this.setText(value)}
                autoCapitalize={false}
                onSubmitEditing={this.props.onSubmitEditing}
                textContentType={this.props.textContentType}
                />
            </TextFieldHolder>
          </View>
        </View>
      </View>
    );
  }

  inputRef() {
    return this.refs.input;
  }

  focus() {
    this.inputRef().focus();
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }

  setFocus() {
    this.setState({
      focused: true
    });
    try {
      return this.props.onFocus();
    } catch (_error) { }
  }

  unsetFocus() {
    this.setState({
      focused: false
    });
    try {
      return this.props.onBlur();
    } catch (_error) { }
  }

  labelStyle() {
    if (this.state.focused) {
      return styles.focused;
    }
  }

  placeholderValue() {
    if (this.state.text) {
      return this.props.placeholder;
    }
  }

  setText(value) {
    this.setState({
      text: value
    });
    try {
      return this.props.onChangeTextValue(value);
    } catch (_error) { }
  }
}

export default FloatLabelTextField;
