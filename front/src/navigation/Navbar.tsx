import leaf from "../assets/images/LeafWitheRbg.png";
import logOut from "../assets/icons/logOut.svg";
import home from "../assets/icons/home.svg";
import chart from "../assets/icons/chart.svg";
import social from "../assets/icons/social.svg";
import puzzle from "../assets/icons/puzzle.svg";
import progil from "../assets/icons/profil.svg";

const Navbar = () => {
  return (
    <div
      style={{
        width: "10vw",
        height: "100vh",
        backgroundColor: "#25A55F",
      }}
    >
      <div style={{ height: "20%", display: "flex", justifyContent: "center" ,alignItems:'center', backgroundColor:'pink' }}>
        <img src={leaf} alt="checkRegister" style={{ width: '60%', height: '70%' }} />
      </div>
      <div>
        <img src={home} alt="checkRegister" style={{ width: 50, height: 50 }} />
        <img
          src={chart}
          alt="checkRegister"
          style={{ width: 50, height: 50 }}
        />
        <img
          src={social}
          alt="checkRegister"
          style={{ width: 50, height: 50 }}
        />
        <img
          src={puzzle}
          alt="checkRegister"
          style={{ width: 50, height: 50 }}
        />
        <img
          src={progil}
          alt="checkRegister"
          style={{ width: 50, height: 50 }}
        />
      </div>
      <div>
        <img
          src={logOut}
          alt="checkRegister"
          style={{ width: 50, height: 50 }}
        />
      </div>
    </div>
  );
};

export default Navbar;
