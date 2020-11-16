import React from 'react'
import { Column } from 'material-table';
import { Chip } from '@material-ui/core';
import { TimesheetRequest, TimesheetResponse } from 'client/backendclient';
import { convertDateForDisplay, convertMonthYearForDisplay } from 'shared-components/utils/helper-functions';

export const OpenTimesheetGridDefinition: Column<TimesheetResponse>[] = [
  {
    title: 'Date',
    field: 'date',
    render: (data: TimesheetResponse) => convertMonthYearForDisplay(data.date)
  }
];
