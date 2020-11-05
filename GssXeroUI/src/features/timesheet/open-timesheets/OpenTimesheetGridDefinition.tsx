import React from 'react'
import { Column } from 'material-table';
import { Chip } from '@material-ui/core';
import { TimesheetRequest } from 'client/backendclient';
import { convertDateForDisplay, convertMonthYearForDisplay } from 'shared-components/utils/helper-functions';

export const OpenTimesheetGridDefinition: Column<TimesheetRequest>[] = [
  {
    title: 'Date',
    field: 'date',
    render: (data: TimesheetRequest) => convertMonthYearForDisplay(data.date)
  }
];
