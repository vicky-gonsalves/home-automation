import MomentUtils from '@date-io/moment';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const DateRangePicker = ({ headCell, handleSubmit, handleCancel, isFetching }) => {
  const [from, setFrom] = React.useState(moment());
  const [to, setTo] = React.useState(moment());
  const submitDateTimeRange = () => {
    const datetime = `${moment(from).valueOf()}:${moment(to).valueOf()}`;
    handleSubmit(headCell.id, datetime);
  };

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils} data-test="muiPickersUtilsProviderComponent">
        <DateTimePicker
          disabled={isFetching}
          value={from}
          disableFuture
          showTodayButton
          label="From"
          format="YYYY/MM/DD hh:mm A"
          onChange={setFrom}
          data-test="dateTimePickerFromDateTime"
        />
        <DateTimePicker
          disabled={isFetching}
          value={to}
          disableFuture
          showTodayButton
          label="To"
          format="YYYY/MM/DD hh:mm A"
          onChange={setTo}
          data-test="dateTimePickerToDateTime"
        />
      </MuiPickersUtilsProvider>
      <IconButton
        aria-label="search"
        size="small"
        type="button"
        variant="contained"
        color="primary"
        disabled={isFetching}
        data-test="dateRangeSubmitButton"
        onClick={submitDateTimeRange}
      >
        <CheckIcon fontSize="small" />
      </IconButton>
      <IconButton
        disabled={isFetching}
        type="button"
        aria-label="search"
        size="small"
        onClick={handleCancel}
        data-test="dateRangeCancelButton"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
};

DateRangePicker.propTypes = {
  headCell: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default DateRangePicker;
