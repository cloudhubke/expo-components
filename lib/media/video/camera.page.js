import React from 'react';
import { View, Text } from 'react-native';

import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

import styles from './styles';
import Toolbar from './ToolBar';
import Gallery from './gallery.component';

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    captures: [],
    flashMode: null,
    capturing: null,
    cameraType: null,
    hasCameraPermission: null,
  };

  setFlashMode = (flashMode) => this.setState({ flashMode });

  setCameraType = (cameraType) => this.setState({ cameraType });

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures],
    });
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures],
    });
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const audio = await Audio.requestPermissionsAsync();
    const hasCameraPermission =
      camera.status === 'granted' && audio.status === 'granted';

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission, flashMode, cameraType, capturing, captures } =
      this.state;

    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={(camera) => (this.camera = camera)}
          />
        </View>

        {captures.length > 0 && <Gallery captures={captures} />}

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}
