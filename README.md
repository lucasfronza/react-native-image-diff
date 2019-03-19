# react-native-image-diff [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
*Image Diff component for React Native: swipe between two images for comparison.*

<img src="https://github.com/lucasfronza/react-native-image-diff/blob/develop/demo.gif?raw=true" width="300">

## Installation
```
npm install react-native-image-diff --save
```

## Usage
```jsx
import ImageDiff from 'react-native-image-diff'
...
{/* Basic usage */}
<ImageDiff
  before={require('./code.jpg')} // before={{ uri: 'https://...' }}
  after={require('./code_bw.jpg')}
/>

{/* With custom options */}
<ImageDiff
  before={require('./code.jpg')}
  after={require('./code_bw.jpg')}
  width={200} // other example: screenWidth * 0.7
  initialHeight={100} // final height will be calculated to maintain aspect ratio
  initialOffsetPercentage={0.3}
  separatorWidth={3}
  separatorColor='red'
  style={{}}
/>
```

## Props
| Prop | Type | Default | Note |
|---|---|---|---|
| **`before`** | Image source | `undefined` | **(Required)** Source of 'before' image |
| **`after`** | Image source | `undefined` | **(Required)** Source of 'after' image |
| **`initialOffsetPercentage`** | `number` | `0.5` | Percentage (0 to 1) of width to describe the initial separator position |
| **`width`** | `number` | Screen width | Image's width |
| **`initialHeight`** | `number` | Half of screen width | Initial height of image. Final height will be calculated after image is loaded to maintain aspect ratio. |
| **`separatorWidth`** | `number` | `1` | Separator's width. Set as 0 to hide it. |
| **`separatorColor`** | `color` | `'black'` | Color of separator |
| **`style`** | `style` | `{}` | Style of component's container. You can't override `height` or `width` here, for that, set `width` prop. This is for margins, background color, etc. |

## Example
```jsx
import ImageDiff from 'react-native-image-diff'

export default class Screen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <ImageDiff before={require('./code.jpg')} after={require('./code_bw.jpg')} />
        </ScrollView>
      </View>
    )
  }
}
```
