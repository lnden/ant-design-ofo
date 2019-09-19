import { GENDER_OPTIONS, STATUS_OPTIONS, INTEREST_OPTIONS } from '../config/constant';

/**
 * 一些字典的过滤方法
 * @param {array} OPTIONS
 * @return {function(number): (string)}
 */
const optionsFilter = OPTIONS => value => OPTIONS.find(item => item.value === value).label || '';

export const genderFilter = optionsFilter(GENDER_OPTIONS);

export const statusFilter = optionsFilter(STATUS_OPTIONS);

export const interestFilter = optionsFilter(INTEREST_OPTIONS);
