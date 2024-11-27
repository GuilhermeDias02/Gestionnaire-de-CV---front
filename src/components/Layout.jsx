import PropTypes from 'prop-types';
import DashboardButton from './DashboardButton';


const Layout = ({ children }) => {
    return (
      <div>
        {children}
        <DashboardButton />
      </div>
    );
  };
  
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default Layout;
  