import { createNotif, removeNotificationById } from "../utils/utils"

describe("Utils Tests", () => {
  it("Should create a valid notification", () => {
    [{ text: 'Test', isError: true }, { text: 'Test 2', isError: false }].forEach(notif => {
      const { id, isError, text } = createNotif(notif.text, notif.isError)
      expect(id).not.toBeUndefined()
      expect(isError).toBe(notif.isError)
      expect(text).toBe(notif.text)
    })
  })

  it("Should remove the correct notification", () => {
    const notifications = [
      { id: 1, text: 'Test 1', isError: true },
      { id: 2, text: 'Test 2', isError: true },
      { id: 3, text: 'Test 3', isError: true }
    ]
    const newNotifications = removeNotificationById(notifications, 2);
    expect(newNotifications).toEqual([
      { id: 1, text: 'Test 1', isError: true },
      { id: 3, text: 'Test 3', isError: true }
    ])
  })
})
