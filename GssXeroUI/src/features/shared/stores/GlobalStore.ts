import { observable, action } from "mobx"
import { createContext } from "react"
import React from "react"
import TimelineIcon from '@material-ui/icons/Timeline'
import { cloneObject } from "shared-components/utils/utils"
//import { userCacheHandler } from "client/auth"
import { SafetyReport } from "features/reports/SafetyReport";
import UsageReport from "features/reports/UsageReport";
import NewTimesheet from "features/timesheet/NewTimesheet"
import Landing from "features/landing-page/Landing"
import EditTimesheet from "features/timesheet/open-timesheets/EditTimesheet"
import OpenTimesheets from "features/timesheet/open-timesheets/OpenTimesheets"

interface IMenuItem {
    path: string
    name: string
    exact: boolean
    landingPage: boolean;
    component: React.ComponentType
    icon: React.ComponentType
    displaysInMenu: boolean
}
export interface IMenuItemGroup {
    divisionName: string
    icon?: string
    routes: IMenuItem[]
}

const defaultMenuItems: IMenuItemGroup[] = [
    {
        divisionName: "Reports",
        routes: [
            {
                landingPage: false, exact: false, displaysInMenu: true,
                name: "Usage Report", path: "/reports/usage/",
                component: UsageReport,
                icon: TimelineIcon
            },
            {
                landingPage: false, exact: false, displaysInMenu: true,
                name: "Safety Report", path: "/reports/safety/",
                component: SafetyReport,
                icon: TimelineIcon
            },
            {
                landingPage: false, exact: true, displaysInMenu: false, 
                name: "New Timesheet", path: "/new-timesheet",
                component: NewTimesheet,
                icon: TimelineIcon
            },
            {
                landingPage: false, exact: true, displaysInMenu: false, 
                name: "Open Timesheets", path: "/open-timesheets",
                component: OpenTimesheets,
                icon: TimelineIcon
            },
            {
                landingPage: false, exact: true, displaysInMenu: false, 
                name: "Edit Timesheet", path: "/edit-timesheet/:id",
                component: EditTimesheet,
                icon: TimelineIcon
            },
            {
                landingPage: false, exact: true, displaysInMenu: false, 
                name: "Landing Page", path: '/',
                component: Landing,
                icon: TimelineIcon
            },
            // {
            //     landingPage: false, exact: true, displaysInMenu: false, 
            //     name: "Reset Password", path: "/reset-password/",
            //     component: ResetPassword,
            //     icon: TimelineIcon
            // },
            // {
            //     landingPage: false, exact: false, displaysInMenu: false, 
            //     name: "Reset Password", path: "/reset-password/",
            //     component: ResetPassword,
            //     icon: TimelineIcon
            // },
        ],
    },
    // {
    //     divisionName: "",
    //     routes: [
    //         {
    //             landingPage: false, exact: false, displaysInMenu: false, 
    //             name: "Reset Password", path: "/reset-password/",
    //             component: ResetPassword,
    //             icon: TimelineIcon
    //         },
    //     ],
    // },
]

export class GlobalStore {

    constructor(load: boolean = true) {
        if (load) {
            this.renderMenuItems()
        }
    }

    @observable existingTimesheetId = 0
    @observable menuItems: IMenuItemGroup[] = []
    
    // @observable currentUser? = userCacheHandler.get()
    // @action logout = () => {
    //     this.currentUser = undefined
    //     userCacheHandler.set(undefined)
    // }
    // @action login = (user: UserLoginResponse) => {
    //     userCacheHandler.set(user)
    //     this.currentUser = user
    // }

    @action private renderMenuItems = () => {
        // ** this can be used to render the menu from an api call
        let newMenuItems: IMenuItemGroup[] = []

        for (const defaultMenuItemGroup of defaultMenuItems) {
            const menuItemGroup = cloneObject(defaultMenuItemGroup)
            menuItemGroup.routes = []
            for (const defaultRoute of defaultMenuItemGroup.routes) {
                if (defaultRoute.landingPage) {
                    const landing = cloneObject(defaultRoute)
                    landing.path = '/'
                    landing.exact = true
                    landing.displaysInMenu = false
                    landing.component = defaultRoute.component
                    landing.icon = defaultRoute.icon
                    menuItemGroup.routes.push(landing)
                }
                const menuItem = cloneObject(defaultRoute)
                menuItem.component = defaultRoute.component
                menuItem.icon = defaultRoute.icon
                menuItemGroup.routes.push(menuItem)
            }
            if (menuItemGroup.routes.length > 0) {
                newMenuItems.push(menuItemGroup)
            }
        }
        this.menuItems = newMenuItems
    }
    /** defines if the menu drawer is open */
    @observable drawerOpen = false
}

export const GlobalStoreContext = createContext(new GlobalStore(false)) // this is to be accessed by the react components