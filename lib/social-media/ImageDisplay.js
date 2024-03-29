import React, { Component } from 'react';
import { View, Text } from 'react-native';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import UploadingTile from './UploadingTile';
import uploadAssetAsync from './uploading/Uploader';

class ImageDisplay extends Component {
  static defaultProps = {
    assets: [],
    endpoint: '/fileapi/upload/image',
    onUpload: () => {},
    onProgress: () => {},
    resize: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      assets: [],
    };

    this.onProgress = debounce(this.onProgress, 500);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(prevState.assets, nextProps.assets)) {
      return { ...prevState, assets: [...nextProps.assets] };
    }
    return { ...prevState };
  }

  componentDidMount() {
    this.uploadFiles();
  }

  onProgress = (item) => {
    const { assets } = this.state;
    const newassets = assets.map((asset) => {
      if (asset.id === item.id) {
        return item;
      }
      return asset;
    });

    this.setState({ asset: newassets });

    this.props.onProgress(newassets);
  };

  uploadFiles = () => {
    const { assets } = this.state;
    const { resize } = this.props;

    const uploadedAssets = assets
      .filter((f) => Boolean(f.uri))
      .map(
        (asset) =>
          new Promise(async (resolve) => {
            const newasset = await uploadAssetAsync({
              asset,
              endpoint: this.props.endpoint,
              resize,
              onProgress: this.onProgress,
            });
            resolve(newasset[0] || {});
          })
      );

    if (uploadedAssets.length > 0) {
      Promise.all(uploadedAssets).then((uploadedassets) => {
        this.setState({ assets: [...uploadedassets] });
        this.props.onUpload(uploadedassets);
      });
    }
  };

  renderOne = () => {
    const asset = this.state.assets[0] || {};
    return (
      <View style={styles.single}>
        <UploadingTile asset={asset} />
      </View>
    );
  };

  renderTwo = () => {
    const first = this.state.assets[0] || {};
    const second = this.state.assets[1] || {};
    return (
      <View style={styles.dual}>
        <View style={{ flex: 1, marginBottom: 2 }}>
          <UploadingTile asset={first} />
        </View>
        <View style={{ flex: 1 }}>
          <UploadingTile asset={second} />
        </View>
      </View>
    );
  };

  renderThree = () => {
    const first = this.state.assets[0] || {};
    const second = this.state.assets[1] || {};
    const third = this.state.assets[2] || {};
    return (
      <View style={styles.tripple}>
        <View style={{ flex: 1, marginRight: 2 }}>
          <UploadingTile asset={first} />
        </View>
        <View style={styles.dual}>
          <View style={{ flex: 1, marginBottom: 2 }}>
            <UploadingTile asset={second} />
          </View>
          <View style={{ flex: 1 }}>
            <UploadingTile asset={third} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { assets } = this.state;
    if (assets.length === 1) {
      return this.renderOne();
    }
    if (assets.length === 2) {
      return this.renderTwo();
    }
    if (assets.length >= 3) {
      return this.renderThree();
    }
    return null;
  }
}

const styles = {
  single: {
    flex: 1,
  },
  dual: {
    flex: 1,
  },
  tripple: {
    flex: 1,
    flexDirection: 'row',
  },
};
export default ImageDisplay;
