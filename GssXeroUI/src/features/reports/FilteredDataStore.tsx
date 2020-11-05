import { observable, computed, action } from "mobx";
import moment from 'moment';
import { exampleData } from "./example-data";
import _ from 'lodash';

export class FilteredDataStore {

    constructor() {
        let start = this.reportStart.clone();
        let to  = start.unix();
        let from = start.add(-this.reportSpanDays, 'days').unix();
        this.dateRange = [ from, to ];
    }

    @observable dateRange: number[];

    @computed get max() {
        return this.reportStart.unix()
    }
    
    @computed get min() {
        return this.reportStart.add(-(this.reportSpanDays), 'days').unix()
    }

    
    @computed get filteredData() {
        return _.filter(exampleData, (x) => {
            let dataUnix = moment(x.name, "DD/MM/YYYY h:mm:ss").unix();
            return dataUnix >= this.dateRange[0] && dataUnix <= this.dateRange[1];
        });
    }

    @action handleChange = (event: any, newValue: number | number[]) => {
        var minMax = newValue as number[];
        this.dateRange[0] = minMax[0];
        this.dateRange[1] = minMax[1];
    };

    unixToDate(value: number) {
        return moment.unix(value).format("Do MMM");
    }

    countdata = [
        { name: 'Feb', bikes: 3038, people: 8399, avspd: 22 },
        { name: 'Mar', bikes: 2500, people: 7429, avspd: 21 },
        { name: 'Apr', bikes: 2200, people: 6342, avspd: 20 },
        { name: 'May', bikes: 1500, people: 5431, avspd: 18 },
        { name: 'Jun', bikes: 1700, people: 5832, avspd: 18 },
        { name: 'Jul', bikes: 1539, people: 4382, avspd: 19 },
        { name: 'Aug', bikes: 1721, people: 3728, avspd: 18 },
        { name: 'Sep', bikes: 1832, people: 4232, avspd: 20 },
        { name: 'Oct', bikes: 2832, people: 4832, avspd: 19 },
        { name: 'Nov', bikes: 3832, people: 6382, avspd: 23 },
        { name: 'Dec', bikes: 4388, people: 7550, avspd: 25 },
        { name: 'Jan', bikes: 4229, people: 7800, avspd: 25 },
    ];

    kphFormatter = (value: string) => `${value}kph`;
    dateFormatter = (value: string | number) => {
        var momentDate = moment(value, "DD/MM/YYYY h:mm:ss");
        return momentDate.format("Do MMM h:mm");
    }

    reportStart = moment("28/11/2019", "DD/MM/YYYY");
    reportSpanDays = 7;

    
}
