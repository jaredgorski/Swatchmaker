var React = require('react');
import './footer.scss';

const footerClasses = 'cp-footer cp--non-selectable';

class Footer extends React.Component {
  render () {
    return (
      <p className={footerClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-75 -75 540 540" width="18" height="18" className="footer-icon"><use xlinkHref="images/icon-stoked.svg#icon"></use></svg>
        <span>Jared Gorski</span>
      </p>
    );
  }
}

export default Footer;
