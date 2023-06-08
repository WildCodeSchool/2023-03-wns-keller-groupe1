import leaf from "../assets/images/LeafWitheRbg.png";
import logOut from "../assets/icons/logOut.svg";
const Navbar = () => {
  return (
    <div style={{ width: "10vw", height: "100vh", backgroundColor: "#25A55F" }}>
      <div>
        <img
          src={leaf}
          alt="checkRegister"
          style={{ width: 150, height: 150 }}
        />
      </div>
      <div></div>
      <div>
        <img
          src={logOut}
          alt="checkRegister"
          style={{ width: 150, height: 150 }}
        />
      </div>
    </div>
  );
};

export default Navbar;
