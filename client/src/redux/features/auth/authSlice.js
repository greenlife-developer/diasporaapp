import { createSlice } from "@reduxjs/toolkit";

const surname = 'JSON.parse(localStorage.getItem("surname"))';

const initialState = {
  isLoggedIn: false,
  name: surname ? surname : "",
  user: {
    title: "",
    surname: "",
    otherNames: "",
    maritalStatus: "",
    email: "",
    occupation: "",
    dob: "",
    gender: "",
    religion: "",
    nextOfKin: "",
    residentialAddress: "",
    localGovernmentArea: "",
    country: "",
    yearOfTravel: "",
    password: "",
    photo: "",
    assetType: "",
    businessName: "",
    businessAddress: "",
    phone: "",
    bio: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("surname", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      console.log(profile);
      state.user.title = profile.title;
      state.user.surname = profile.surname;
      state.user.otherNames = profile.otherNames;
      state.user.maritalStatus = profile.maritalStatus;
      state.user.email = profile.email;
      state.user.occupation = profile.occupation;
      state.user.dob = profile.dob;
      state.user.gender = profile.gender;
      state.user.religion = profile.religion;
      state.user.nextOfKin = profile.nextOfKin;
      state.user.residentialAddress = profile.residentialAddress;
      state.user.localGovernmentArea = profile.localGovernmentArea;
      state.user.country = profile.country;
      state.user.yearOfTravel = profile.yearOfTravel;
      state.user.password = profile.password;
      state.user.photo = profile.photo;
      state.user.assetType = profile.assetType;
      state.user.businessName = profile.businessName;
      state.user.businessAddress = profile.businessAddress;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
