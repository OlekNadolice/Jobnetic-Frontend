import { useContext } from "react";
import { appContext } from "Context/App.context";
import AddNewAdvertisment from "features/Advertisment/AddNewAdvertisment";
import SendCv from "features/SendCv/SendCv";

const ModalContainer = () => {
  const { isAddNewAdvertismentModalOpen, isSendCvModalOpen } = useContext(appContext);

  return (
    <>
      {isAddNewAdvertismentModalOpen && <AddNewAdvertisment />}
      {isSendCvModalOpen && <SendCv />}
    </>
  );
};

export default ModalContainer;
