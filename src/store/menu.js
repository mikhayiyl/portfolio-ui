import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'menu',
    initialState: {
        mobileBurger: false,
        friendsNavMenu: false,
        profileNavMenu: false,
        searchMenu: false,
    },
    reducers: {
        burgerOpenned: (menu, action) => {
            if (action.payload.burger === "open") {
                menu.mobileBurger = true;
                menu.searchMenu = false;
                menu.friendsNavMenu = false;
                menu.profileNavMenu = false;
            }
        },
        burgerClosed: (menu, action) => {
            if (action.payload.burger === "close") menu.mobileBurger = false;

        },

        friendsBarOpenned: (menu, action) => {
            if (action.payload === "open") {
                menu.friendsNavMenu = true;
                menu.searchMenu = false;
                menu.mobileBurger = false;
                menu.profileNavMenu = false;
            }
        },

        friendsBarClosed: (menu, action) => {
            if (action.payload === "close") menu.friendsNavMenu = false;
        },

        profileBarOpenned: (menu, action) => {
            if (action.payload === "open") {
                menu.profileNavMenu = true;
                menu.friendsNavMenu = false;
                menu.mobileBurger = false;
                menu.searchMenu = false;
            }
        },

        profileBarClosed: (menu, action) => {
            if (action.payload === "close") menu.profileNavMenu = false;
        },

        searchMenuOpenned: (menu, action) => {
            if (action.payload === "open") {
                menu.searchMenu = true;
                menu.profileNavMenu = false;
                menu.friendsNavMenu = false;
                menu.mobileBurger = false;
            }
        },

        searchMenuClosed: (menu, action) => {
            if (action.payload === "close") menu.searchMenu = false;
        },




    }
})

export default slice.reducer;
export const { burgerOpenned, friendsBarOpenned, profileBarOpenned, burgerClosed, friendsBarClosed, profileBarClosed, searchMenuOpenned, searchMenuClosed } = slice.actions;


