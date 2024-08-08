import * as m from "./Modal.styled";
import BackBtn from "assets/icons/BackBtn.png";

const Index = ({ name, children, onClose }) => {
  return (
    <m.Container>
      <m.BlackBox onClick={onClose} />
      <m.Wrap>
        <m.Backdrop>
          <img src={BackBtn} alt="close" onClick={onClose} />
        </m.Backdrop>
        <m.ModalName>{name}</m.ModalName>
        {children}
      </m.Wrap>
    </m.Container>
  );
};

export default Index;
