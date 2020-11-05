import { TimesheetRowRequest } from "client/backendclient";
import { GlobalStore } from "features/shared/stores/GlobalStore";
import { observable, action } from "mobx";
import { createContext, ReactNode } from "react";
import FormErrorHandler from "shared-components/input-props/form-error-handler";
import { TimesheetStore } from "./TimesheetStore";

class ObservableTimesheetRow {
    @observable duration = 0
    @observable notes = ""
    @observable clientName = ""
}

export default class TimesheetRowStore {
    timesheetStore: TimesheetStore

    constructor(timesheetStore: TimesheetStore) {
        this.timesheetStore = timesheetStore
    }

    @observable errorHandler = new FormErrorHandler()

    @observable rows = [] as ObservableTimesheetRow[]

    @observable duration = 0
    @observable notes = ""
    @observable date = ""
    @observable clientName = ''

    @action handleClientChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        //const record = this.getDaysAndClientsArray().find(x => x.day === dayAndClient.day);
        if (this.timesheetStore.timesheetRows.length === 0) {
            this.timesheetStore.initialiseTimesheetRows()
        }
        
        const array = this.timesheetStore.timesheetRows
        const clone = this.timesheetStore.timesheetRows[index]
        console.log(clone)
        array.splice(index, 1, new TimesheetRowRequest(
            {
                timesheetId: 0,
                date: clone.date!, 
                clientName: event.target.value, 
                clientId: 0,
                duration: this.duration, 
                notes: this.notes
            }
        ))
        //array[index].client = event.target.value;
        debugger
        console.log(this.timesheetStore.timesheetRows)
        this.clientName = event.target.value
    }

    // @action getClientForRow = (index: number) => {
    //     if (this.timesheetStore.timesheetRows.length === 0) {
    //         debugger
    //         this.timesheetStore.initialiseTimesheetRows()
    //     }
        
    //     console.log(this.timesheetStore.timesheetRows[index])
    //     return this.timesheetStore.timesheetRows[index].clientName
    // }
}

export const TimesheetRowStoreContext = createContext(new TimesheetRowStore(new TimesheetStore()))
