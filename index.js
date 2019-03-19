import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  PanResponder,
  Dimensions,
  ViewPropTypes
} from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

class ImageDiff extends Component {
  constructor (props) {
    super(props)

    this.state = {
      width: props.width,
      height: props.initialHeight,
      offset: props.width * props.initialOffsetPercentage
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.locationPageOffset = evt.nativeEvent.pageX - evt.nativeEvent.locationX
      },
      onPanResponderMove: (evt, gestureState) => {
        const locationX = evt.nativeEvent.pageX - this.locationPageOffset
        const offset = Math.max(Math.min(locationX, this.state.width), 0)
        this.setState({ offset: offset })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {},
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => true
    })
  }

  componentDidMount () {
    this.getSize()
  }

  getSize = () => {
    if (this.props.after && this.props.after.uri != null) {
      Image.getSize(this.props.after.uri, (width, height) => {
        this.setState({ height: this.state.width * (height / width) })
      })
    } else {
      const image = Image.resolveAssetSource(this.props.after)
      this.setState({ height: this.state.width * (image.height / image.width) })
    }
  }

  render () {
    const IMAGE_WIDTH = this.state.width
    const IMAGE_HEIGHT = this.state.height
    return (
      <View style={[this.props.style, { height: IMAGE_HEIGHT, width: IMAGE_WIDTH }]} {...this._panResponder.panHandlers}>
        <Image
          style={{
            height: IMAGE_HEIGHT,
            width: IMAGE_WIDTH,
            position: 'absolute'
          }}
          source={this.props.before}
          resizeMode='contain'
        />
        <View style={{
          width: IMAGE_WIDTH - this.state.offset,
          height: IMAGE_HEIGHT,
          overflow: 'hidden',
          position: 'absolute',
          left: this.state.offset
        }}>
          <Image
            style={{
              marginLeft: -this.state.offset,
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT
            }}
            source={this.props.after}
            resizeMode='contain'
          />
        </View>
        <View style={{
          height: IMAGE_HEIGHT,
          width: this.props.separatorWidth,
          backgroundColor: this.props.separatorColor,
          position: 'absolute',
          left: this.state.offset - (this.props.separatorWidth * 0.5)
        }} />
      </View>
    )
  }
}

ImageDiff.propTypes = {
  before: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string)
    }),
    PropTypes.number // require('./image.jpg')
  ]).isRequired,
  after: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string)
    }),
    PropTypes.number // require('./image.jpg')
  ]).isRequired,
  initialOffsetPercentage: PropTypes.number,
  // styles
  width: PropTypes.number,
  initialHeight: PropTypes.number,
  separatorWidth: PropTypes.number,
  separatorColor: PropTypes.string,
  style: ViewPropTypes.style
}

ImageDiff.defaultProps = {
  initialOffsetPercentage: 0.5,
  width: screenWidth,
  initialHeight: screenWidth * 0.5,
  separatorWidth: 1,
  separatorColor: 'black',
  style: {}
}

export default ImageDiff
