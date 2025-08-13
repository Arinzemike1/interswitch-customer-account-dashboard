"use client";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Modal from "./Modal";
import Button from "./Button";

const IdleTimer = () => {
  const logoutTimer: any = useRef(null);
  const [showIdleModal, setShowIdleModal] = useState(false);

  const logout = () => {
    Cookies.remove("access_token");
    window.location.href = "/auth/login";
  };

  const startLogoutTimer = () => {
    const isAuthenticated = Cookies.get("access_token");
    if (!isAuthenticated) return;

    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => {
      setShowIdleModal(true);
    }, 1000 * 60 * 1); // 5 minutes
  };

  const handleStay = () => {
    setShowIdleModal(false);
    startLogoutTimer(); // Reset the timer
  };

  const handleLogout = () => {
    setShowIdleModal(false);
    logout();
  };

  useEffect(() => {
    startLogoutTimer();

    const handleUserActivity = () => {
      if (!showIdleModal) {
        startLogoutTimer();
      }
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, [showIdleModal]);

  return (
    <Modal
      isOpen={showIdleModal}
      title="You've been idle for a while"
      subTitle="Do you want to stay logged in?"
      icon="warning"
    >
      <div className="text-center py-4">
        <div className="flex justify-center gap-4">
          <Button className="w-[100px]" plain onClick={handleLogout}>
            Logout
          </Button>
          <Button className="w-[100px]" primary onClick={handleStay}>
            Stay
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default IdleTimer;
