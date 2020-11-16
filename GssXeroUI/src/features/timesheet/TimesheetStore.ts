import { ClientResponse, EditTimesheetResponse, TimesheetRequest, TimesheetResponse, TimesheetRowRequest } from "client/backendclient"
import { clientClient, timesheetClient } from "client/backendclientinstances"
import { GlobalStore } from "features/shared/stores/GlobalStore"
import { observable, action, computed } from "mobx"
import moment from "moment"
import { createContext } from "react"
import FormErrorHandler from "shared-components/input-props/form-error-handler"

export class ObservableTimesheetRow {
    @observable duration = 0
    @observable notes = ""
    @observable clientName = ""
    @observable clientId = 0
    @observable date = ""
}

export interface DayAndClient {
    day: string,
    client: string
}

export class TimesheetStore {
    globalStore?: GlobalStore

    constructor(globalStore?: GlobalStore) {
        this.globalStore = globalStore
    }

    @observable timesheetDate = moment(new Date()).toDate();
    @observable timesheetDaysAndClients = [] as DayAndClient[];

    @observable isNewTimesheet = true

    @observable timesheetRows2 = [] as ObservableTimesheetRow[]
    @observable timesheetRows = [] as TimesheetRowRequest[]

    @observable openTimesheets = [] as TimesheetResponse[]
    @observable existingTimesheet = new EditTimesheetResponse()

    @observable timesheetId = 0

    @observable clients = [] as ClientResponse[]
    @observable email = ""
    @observable firstName = ""
    @observable lastName = ""
    @observable password1 = ""
    @observable password2 = ""

    @observable isSaving = false
    @observable userRegisteredSuccessfully = false

    @observable errorHandler = new FormErrorHandler()

    @action getClients = async () => {
        this.clients = await clientClient.getClients();
    }

    @action getOpenTimesheets = async () => {
        this.openTimesheets = await timesheetClient.getTimesheets(1);
    }

    @action getTimesheetById = async (timesheetId: number) => {
        this.existingTimesheet = await timesheetClient.getTimesheet(timesheetId)
        console.log(this.existingTimesheet)
        this.isNewTimesheet = false
    }

    @action saveTimesheet = async () => {
        this.isSaving = true
        try {
            if (await this.validation()) {
                console.log(this.timesheetRows2)
                debugger
                const timesheet: TimesheetRequest = new TimesheetRequest(
                    {
                        timesheetId: this.isNewTimesheet ? undefined : this.existingTimesheet.timesheetId,
                        date: this.timesheetDate, 
                        employeeId: 1, 
                        timesheetRows: this.timesheetRows2.map((x, index) => new TimesheetRowRequest ({
                            timesheetId: 0,
                            clientId: x.clientId,
                            duration: x.duration,
                            clientName: x.clientName,
                            date: x.date,
                            notes: x.notes,
                            timesheetRowId: 0
                        }))
                    }
                )

                if (this.isNewTimesheet) {
                    await timesheetClient.saveTimesheet(timesheet)
                } else {
                    await timesheetClient.updateTimesheet(timesheet, timesheet.timesheetId!)
                }
            }
        } catch (error) {
            console.log(error)
        }
        this.isSaving = false
    }

    @action initialiseTimesheetRows = () => {
        if (!this.isNewTimesheet) {
            debugger
            this.timesheetRows2 = this.existingTimesheet.timesheetRows!.map(x => ({
                clientId: x.clientId,
                duration: x.duration,
                clientName: x.clientName!,
                date: x.date!, 
                notes: x.notes!,
            }));
        }
        else {
            let days = moment(this.timesheetDate).daysInMonth();
            while (days) {
                this.timesheetRows.unshift(new TimesheetRowRequest(
                    { 
                        date: moment().month(this.timesheetDate.getMonth()).date(days).format('LL'), 
                        clientId: 0,
                        clientName: "",
                        timesheetId: 0,
                        duration: 0
                    }
                ));
                let row = new ObservableTimesheetRow()
                row.date = moment().month(this.timesheetDate.getMonth()).date(days).format('LL');
                this.timesheetRows2.unshift(row)
                days--;
        }
        }
        console.log(this.timesheetRows2);
    }

    // @action handleTimesheetRowChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    //     //const record = this.getDaysAndClientsArray().find(x => x.day === dayAndClient.day);
    //     debugger
    //     const array = this.timesheetRows
    //     const clone = array[index]
    //     array.splice(index, 1, new TimesheetRowRequest({date: clone.date, clientName: event.target.value, }));
    //     //array[index].client = event.target.value;
    //     debugger
    //     console.log(this.timesheetDaysAndClients)
    // }

    @action getDaysAndClientsArray = () => {
        const clientsHaveValues = this.timesheetDaysAndClients.some(x => x.client.length > 0);
        let clientArray = [];

        if (clientsHaveValues) {
            for (var i = 0; i < this.timesheetDaysAndClients.length; i++) {
                clientArray.push(this.timesheetDaysAndClients[i].client);
            }
        }

        this.resetDaysAndClientsArray();
        let days = moment(this.timesheetDate).daysInMonth();

        while (days) {
            this.timesheetDaysAndClients.unshift({ day: moment().month(this.timesheetDate.getMonth()).date(days).format('LL'), client: clientArray.length > 0 ? clientArray[days] : "" });
            days--;
        }

        return this.timesheetDaysAndClients;
    }

    @action handleClientChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, rows: ObservableTimesheetRow[]) => {
        console.log(rows)
        console.log(event.target)
        rows[index].clientName = event.target.value
        console.log(rows)
    }

    // @action handleClientChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    //     //const record = this.getDaysAndClientsArray().find(x => x.day === dayAndClient.day);
    //     if (this.timesheetRows.length === 0) {
    //         this.initialiseTimesheetRows()
    //     }
        
    //     const array = this.timesheetRows
    //     const clone = this.timesheetRows[index]
    //     console.log(clone)
    //     array.splice(index, 1, new TimesheetRowRequest(
    //         {
    //             timesheetId: 0,
    //             date: clone.date!, 
    //             clientName: event.target.value, 
    //             clientId: 0,
    //             duration: clone.duration!, 
    //             notes: clone.notes!
    //         }
    //     ))
    //     //array[index].client = event.target.value;
    //     debugger
    //     console.log(this.timesheetRows)
    // }

    @action getClientForIndex = (index: number) => {
        return this.timesheetDaysAndClients.length > 0 ? this.timesheetDaysAndClients[index].client : ""
    }

    // @action handleClientChange = (dayAndClient: DayAndClient) => {
    //     debugger
    //     const record = this.getDaysAndClientsArray().find(x => x.day === dayAndClient.day);

    //     record!.client = dayAndClient.client
    // }

    resetDaysAndClientsArray = () => {
        this.timesheetDaysAndClients.length = 0;
    }

    // @action submitTimesheet = async () => {
    //     this.isSaving = true
    //     try {
    //         const timesheet = new Timesheet ({
    //           timesheetId: 0,
    //           date: this.timesheetDate,
    //           employeeId: 1,
    //           timesheetRows: this.
    //         })
    //     } catch (error) {
    //         //this.error = error
    //         console.log(error)
    //     }
    //     this.isSaving = false
    // }

    @computed get isButtonDisabled() {
        return this.firstName.trim().length < 1
            || this.lastName.trim().length < 1
            || this.email.trim().length < 1
            || this.password1.trim().length < 1
            || this.password2.trim().length < 1
    }

    clearInputs = () => {
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.password1 = ''
        this.password2 = ''
    }

    validation = async () => {
        this.errorHandler.reset()

        if (this.password2 !== this.password1) {
            this.errorHandler.error("password2", "Password values don't match")
            return false
        }

        // ensure there are no empty input fields
        // we should never get here as submit button should be disabled in UI
        // but user could potentially manually set button to enabled by manipulating HTML, so this is a backup
        if (this.isButtonDisabled) {
            this.errorHandler.error("password2", "All fields are mandatory")
        }

        return true
    }
}

export const TimesheetStoreContext = createContext(new TimesheetStore())