var React = require('react');
import './typography.scss';
import Swatchmaker from '../Swatchmaker/';
import Footer from '../Footer/';

class App extends React.Component {
  render () {
    return (
      <div>
        <Swatchmaker />
        <Footer />
      </div>
    );
  }
}

export default App;
