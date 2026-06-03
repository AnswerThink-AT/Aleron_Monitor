const moment = require('moment');

function _toV4Date() {}

function _toV2Date({from = 'abap', dateString}) {
  if (!dateString) {
    return;
  }
  let dt;
  if (from === 'abap') {
    dt = `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}T00:00:00Z`;
  } else if (from === 'Edm.Date') {
    dt = dateString;
  }
  return `/Date(${Date.parse(dt)})/`;
}

function toODataDate({odataVersion = 'v4', from = 'abap', dateString}) {
  if (!dateString) {
    return;
  }
  const fnToRun = odataVersion === 'v4' ? _toV4Date : _toV2Date;

  return fnToRun({from, dateString});
}

function toEmployeeType(employeeSubgroup) {
  let employeeType = '';
  if (['8', '10'].includes(employeeSubgroup)) {
    employeeType = 'DAY';
  } else if (['1', '3', '5', '12', '13'].includes(employeeSubgroup)) {
    employeeType = 'SAL';
  } else if (['2', '4', '6', '7', '9'].includes(employeeSubgroup)) {
    employeeType = 'HOU';
  }

  return employeeType;
}

function todateConvert_Project(date, flag) {
  let year = parseInt(date.substring(0, 4));
  if (flag === 'E') {
    year += 10;
  }
  return `${year}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
}

module.exports = {
  toODataDate,
  toEmployeeType,
  todateConvert_Project,
};
