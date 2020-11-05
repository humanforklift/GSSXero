import { observable, action } from "mobx"
import { createContext } from "react"
// import { deviceClient, deviceCountClient } from "client/backendclientinstances"
// import { Iotdevices } from "client/backendclient"

export class ReportsStore {
    @observable menuTitle = "This is menu 1"
    @observable detail = "And this is the detail of menu 1"
    @observable deviceDescriptions: string[] = []
    //@observable devices: Iotdevices[] = []
    @observable columns: any[] = []
    @observable xAxisValues: string[] = []


    @action changeTitle = () => {
        this.menuTitle = "Hey watcha doing?"
    }

    @action getDeviceDescriptions = async () => {
        try {
            //this.deviceDescriptions = await deviceClient.getDeviceDescriptions()
            console.log(this.deviceDescriptions)
		} catch (error) {
			console.log(error);
		}
    }

    @action getDevices = async () => {
        try {
            //this.devices = await deviceClient.getIotdevicesAll()
            console.log(this)
		} catch (error) {
			console.log(error);
		}
    }

    @action arrangeColumns = async () => {
        await this.getDevices()
        console.log(this)
    }

    @action getXAxisValues = async () => {
        //this.xAxisValues = await deviceCountClient.getCountCreatedDates()
    }
}

export const ReportsStoreContext = createContext(new ReportsStore())