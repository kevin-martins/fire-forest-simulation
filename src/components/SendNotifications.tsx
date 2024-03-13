import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import NotificationProps from "../models/notification";
import { IoAlert, IoCheckmark } from "react-icons/io5";
import { removeNotification } from "../features/terrainSlice";

const Notification = ({ text, id, isError, removeNotif }: NotificationProps & { removeNotif: Function }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id)
    }, 5000)

    return () => clearTimeout(timeoutRef)
  }, [])

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
    >
      {isError ? <IoAlert className="mt-0.5 scale-150" /> : <IoCheckmark className="mt-0.5 scale-150" />}
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  )
}

const SendNotifications = () => {
  const notifications = useSelector((state: RootState) => state.terrainConfig.notifications)
  const dispatch = useDispatch()

  const removeNotif = (id: number) => {
    dispatch(removeNotification(notifications.filter((n) => n.id !== id)))
  }

  return (
    <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
      <AnimatePresence>
      {notifications.map((n) => (
        <Notification removeNotif={removeNotif} {...n} key={n.id} />
      ))}
    </AnimatePresence>
    </div>
  )
}

export default SendNotifications
