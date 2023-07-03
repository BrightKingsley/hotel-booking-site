import { ChangeEvent, useContext, useEffect, useState } from "react";
import Dropdown from "../Dropdown";

import { FaUser, FaUserEdit } from "react-icons/fa";
import { readURI, updatePhotoURL } from "@/utils";
import { AuthContext, ModalContext, NotificationContext } from "@/context";
import { useButtonStyle, useImageURI } from "@/hooks";
import { BiExit } from "react-icons/bi";

export default function UserProfile() {
  //use state
  const [open, setOpenDropdown] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [img, setImg] = useState<any>();
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null | undefined
  >("");
  const [changePassword, setChangePassword] = useState(false);

  // use context
  const { user, setUser, logoutUser } = useContext(AuthContext);
  const { triggerNotification } = useContext(NotificationContext);
  const { triggerModal } = useContext(ModalContext);

  // use hooks
  const buttonStyle = useButtonStyle({ color: "primary" });
  // const imageURI = useImageURI(e);

  const readURI = (e: ChangeEvent<HTMLInputElement>) => {
    let result;
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (ev: ProgressEvent<FileReader>) {
        result = ev.target?.result;
        setPreviewImage(result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFileSubmit = async () => {
    const newDoc = await updatePhotoURL({uid:user.uid, image: img });
    if (newDoc==="success") {
      triggerNotification("image updated successfully");
    } else {
      triggerNotification("image upload failed");
    }
  };

  return (
    <div className="divide-y-2">
      <div className="space-y-5 pb-4">
        <div className="relative w-fit inline-block">
          <div className="p- w-[4.2rem] flex items-center justify-center h-[4.2rem] bg-gradient-primary rounded-lg text-white text-4xl overflow-clip">
            {previewImage ? (
              // NOTE
              // @ts-ignore
              <img src={previewImage} />
            ) : user?.photoURL && user?.photoURL.length > 1 ? (
              <img src={user.photoURL} />
            ) : (
              <FaUser />
            )}
       
          </div>
          <div className="relative">
            <span
              className="cursor-pointer rounded-full text-2xl p-1 bg-body z-10 absolute active:scale-75 -bottom-4 -right-4 border-2 border-primary duration-200"
              onClick={() => setOpenDropdown(true)}
            >
              <FaUserEdit />
            </span>
            <Dropdown
              show={open}
              text="change profile image?"
              actionCancel={() => {
                // setPreviewImage(user?.image);
                setOpenDropdown(false);
              }}
              altConfirm={
                <>
                  <label htmlFor="profileImg" className={buttonStyle}>
                    confirm
                  </label>
                  <input
                    onChange={(e) => {
                      readURI(e);
                      if (e.target?.files) {
                        setImg(e.target?.files[0]);
                      }

                      setOpenDropdown(false);
                      setConfirm(true);
                    }}
                    accept="image/*"
                    hidden
                    id="profileImg"
                    type="file"
                  />
                </>
              }
            />
            <Dropdown
              show={confirm}
              text="save"
              actionCancel={() => {
                setPreviewImage(user?.photoURL);
                setConfirm(false);
              }}
              actionConfirm={() => {
                setConfirm(false);
                handleFileSubmit();
              }}
            />
          </div>
        </div>
        <div className="inline-block ml-4">
          <h3>{user && user?.firstname ? user.firstname : ""}</h3>
          <p>{user && user?.email ? user.email : ""}</p>
        </div>
      </div>
      <div className="py-4 space-y-2">
        <div className="" onClick={() => setChangePassword(true)}>
          <p className="rounded-md bg-gradient-primary text-white p-2 shadow-sm shadow-primary/40 cursor-pointer hover:shadow-md hover:shadow-primary/40 active:shadow-sm active:shadow-primary/40">
            Change Password
          </p>
        </div>
        <p
          onClick={() =>
            triggerModal({
              message: "Are you sure you want to logout?",
              confirm: () => logoutUser,
              cancel: () => triggerModal,
              clickToDisable: true,
              // show: true,
            })
          }
          className="flex items-center space-x-4 hover:bg-primary/50 transition-all duration-200 hover:text-white w-fit p-2 rounded-md cursor-pointer active:scale-95"
        >
          Logout
          <span className="inline-block ml-1">
            <BiExit />
          </span>
        </p>
      </div>
    </div>
  );
}
