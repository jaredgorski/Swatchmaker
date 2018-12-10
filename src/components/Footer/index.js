var React = require('react');
import './footer.scss';
import Icon from './images/icon-stoked.svg';

const footerClasses = 'swm-footer swm-noselect';

class Footer extends React.Component {
  render () {
    return (
      <a className={footerClasses} href="https://github.com/jaredgorski" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-75 -75 540 540" width="18" height="18" className="footer-icon"><use xlinkHref="images/icon-stoked.svg#icon"></use></svg>
        <span>Jared Gorski</span>
      </a>
    );
  }
}

export default Footer;
