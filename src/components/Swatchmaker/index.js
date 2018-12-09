import React from 'react';
import {generateSwatchData} from './generate';
import './swatchmaker.scss';

class Swatchmaker extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      canvas: {
        downloadLink: '',
        height: '300px',
        width: (3 * 90) + 24 + 'px',
      },
      swatchObject: {
        colors: {
          bg: '#330044',
          fg: '#119900,#667711,#FF0041',
        },
      },
    }

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentDidMount() {
    const currentSwatchArrays = this.updateSwatchArrays();
    this.generateSwatch(currentSwatchArrays);
  }

  componentDidUpdate() {
    const currentSwatchArrays = this.updateSwatchArrays();
    const fgArray = currentSwatchArrays.colors.fg;
    const bgArray = currentSwatchArrays.colors.bg;

    const validColors = this.validateHexColors(fgArray) && this.validateHexColors(bgArray);
    if (validColors) {
      this.generateSwatch(currentSwatchArrays);
    }
  }

  updateSwatchArrays() {
    const currentSwatchArrays = {
      colors: {
        fg: this.state.swatchObject.colors.fg.split(','),
        bg: this.state.swatchObject.colors.bg.split(','),
      }
    }

    return currentSwatchArrays;
  }

  generateSwatch(currentSwatchArrays) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imgData = encodeURIComponent(generateSwatchData(currentSwatchArrays));

    let img = new Image();

    img.src = "data:image/svg+xml," + imgData;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }

    this.updateSwatchDownloadUrl();
  }

  updateSwatchDownloadUrl() {
    const canvas = this.canvasRef.current;
    const downloadUrl = canvas ? canvas.toDataURL('image/png') : null;

    return downloadUrl;
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState.swatchObject.colors[name] = String(value)
    }));
  }

  validateHexColors(array) {
    if (array) {
      for (let i = 0; i < array.length; i++) {
        if (!array[i].match('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  render () {

    const containerClasses = 'swm-container';
    const swmCanvasContainerClasses = 'swm-canvas-container';
    const swmCanvas = {
      style: {
        border: '1px solid #000000',
        height: this.state.canvas.height,
        width: this.state.canvas.width,
      },
    };

    return (
      <div id="swmContainer" className={containerClasses}>
        <p>Swatchmaker</p>
        <div className={swmCanvasContainerClasses}>
          <canvas id="canvas" ref={this.canvasRef} style={swmCanvas.style} />
          <form>
            <textarea name="fg" placeholder="Foreground" type="text" value={this.state.swatchObject.colors.fg} onChange={this.handleFormChange} />
            <input name="bg" placeholder="Background" type="text" value={this.state.swatchObject.colors.bg} onChange={this.handleFormChange} />
          </form>

          <a href={this.updateSwatchDownloadUrl()} download="swatch.png">Download as png</a>
        </div>
      </div>
    );
  }
}

export default Swatchmaker;
