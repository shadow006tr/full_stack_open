import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotification(state, action) {
      return action.payload
    }
  }
})

export const { changeNotification } = notificationSlice.actions

export const setNotification = (notification, timer) => {
  return dispatch => {
    dispatch(changeNotification(notification))
    setTimeout(() => dispatch(changeNotification('')), timer * 1000)
  }
}
export default notificationSlice.reducer
