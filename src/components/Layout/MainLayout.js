  
import CustomNavbar from '../Navbar/Navbar';

function MainLayout(props) {
  const { children } = props;
  
  return (
    <div className="MainLayout">
      <CustomNavbar />
      <div className="main-content">
        {children}
      </div>
    </div>
  )
};

export default MainLayout;
