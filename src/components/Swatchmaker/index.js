import React from 'react';
import {generateSwatchData} from './generate';
import './swatchmaker.scss';

class Swatchmaker extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      swatchObject: {
        colors: {
          bg: `#${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
          fg: `#${Math.random().toString(16).slice(2, 8).toUpperCase()},#${Math.random().toString(16).slice(2, 8).toUpperCase()},#${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
        },
      },
      darkModeSwitch: {
        checked: false,
      },
      menu: {
        checked: true,
      }
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleHeadingDarkModeSwitch = this.handleHeadingDarkModeSwitch.bind(this)
    this.handleSlidingMenu = this.handleSlidingMenu.bind(this);
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

  handleSlidingMenu() {
    if (this.state.menu.checked) {
      this.setState(prevState => ({
        ...prevState.menu.checked = false
      }));
    } else {
      this.setState(prevState => ({
        ...prevState.menu.checked = true
      }));
    }
  }

  handleHeadingDarkModeSwitch() {
    if (this.state.darkModeSwitch.checked) {
      this.setState(prevState => ({
        ...prevState.darkModeSwitch.checked = false
      }));
    } else {
      this.setState(prevState => ({
        ...prevState.darkModeSwitch.checked = true
      }));
    }
  }

  render () {
    const containerClasses = 'swm-container';
    const headerContainerClasses = 'swm-header-container';
    const headingClasses = 'swm-typo-heading';
    const swmHeadingDarkModeSwitchClasses = `swm-heading-darkmodeswitch ${this.state.darkModeSwitch.checked ? 'switch-on' : 'switch-off'}`;
    const swmHeadingDarkModeSwitchCheckboxClasses = 'swm-heading-darkmodeswitch-checkbox';
    const swmInterfaceContainerClasses = `swm-interface-container ${this.state.menu.checked ? 'menu-open' : 'menu-closed'}`;
    const swmSlidingMenuClasses = 'swm-sliding-menu';
    const swmCanvasContainerClasses = 'swm-canvas-container';
    const swmFormContainerClasses = 'swm-form-container';
    const swmFormClasses = 'swm-form';
    const swmFormInputFgClasses = 'swm-input-fg';
    const swmFormInputBgClasses = 'swm-input-bg';
    const swmDownloadLinkClasses = 'swm-download-link';
    const swmMenuButtonClasses = `swm-menu-button swm-noselect ${this.state.menu.checked ? 'menu-open' : 'menu-closed'}`;
    const swmMenuCheckboxClasses = 'swm-menu-checkbox';

    const headingDarkModeSwitchCheckedAttribute = this.state.darkModeSwitch.checked ? 'checked' : false;
    const menuCheckedAttribute = this.state.menu.checked ? 'checked' : false;

    const swmHeaderStyles = {
      background: this.state.darkModeSwitch.checked ? '#444444' : '#FAFAFA',
      color: this.state.darkModeSwitch.checked ? '#EAEAEA' : '#3A3A3A',
    };

    const swmSlidingMenuStyles = {
      background: this.state.darkModeSwitch.checked ? '#555555' : '#F5F5F5',
    };

    const swmFormStyles = {
      color: this.state.darkModeSwitch.checked ? '#EAEAEA' : '#3A3A3A',
    };

    const swmCanvasContainerStyles = {
      background: this.state.darkModeSwitch.checked ? '#333333' : '#FFFFFF',
    };

    const swmCanvas = {
      style: {
        height: '15vw',
        width: '60vw',
      },
    };

    return (
      <div id="swmContainer" className={containerClasses}>
        <div className={headerContainerClasses} style={swmHeaderStyles}>
          <h1 className={headingClasses}>Swatchmaker</h1>
          <div className={swmHeadingDarkModeSwitchClasses} title="Toggle Header Fill">
            <label>
              <input className={swmHeadingDarkModeSwitchCheckboxClasses} type="checkbox" value={headingDarkModeSwitchCheckedAttribute} checked={!!headingDarkModeSwitchCheckedAttribute} onChange={this.handleHeadingDarkModeSwitch} />
            </label>
          </div>
        </div>
        <div className={swmInterfaceContainerClasses}>
          <aside className={swmSlidingMenuClasses} style={swmSlidingMenuStyles}>
            <div className={swmFormContainerClasses} style={swmFormStyles}>
              <form className={swmFormClasses}>
                <label>Background</label>
                <input className={swmFormInputBgClasses} name="bg" placeholder="Background" type="text" value={this.state.swatchObject.colors.bg} onChange={this.handleFormChange} />
                <label>Foreground</label>
                <textarea className={swmFormInputFgClasses} name="fg" placeholder="Foreground" type="text" value={this.state.swatchObject.colors.fg} onChange={this.handleFormChange} />
                <a className={swmDownloadLinkClasses} href={this.updateSwatchDownloadUrl()} download="swatch.png">Download</a>
              </form>
            </div>
          </aside>
          <div className={swmCanvasContainerClasses} style={swmCanvasContainerStyles}>
            <canvas ref={this.canvasRef} height="1000" width="4000" style={swmCanvas.style} />
          </div>
        </div>
        <label className={swmMenuButtonClasses} title="Switch between Editor View and Full View">
          <span>{menuCheckedAttribute ? '↸' : '⇥'}</span>
          {menuCheckedAttribute ? 'Full View' : 'Editor'}
          <input className={swmMenuCheckboxClasses} type="checkbox" value={menuCheckedAttribute} checked={!!menuCheckedAttribute} onChange={this.handleSlidingMenu} />
        </label>
      </div>
    );
  }
}

export default Swatchmaker;
