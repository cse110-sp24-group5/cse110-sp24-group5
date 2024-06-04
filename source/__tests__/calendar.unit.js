import {
    getMonthDetails 
} from './functions-to-unit-test.js';

// getMonthDetails unit test using jest

test('getMonthDetails for January should return {firstDayOfMonth: 1, daysInMonth: 31, lastDayOfMonth: 3}', () => {
    const testDate = new Date(2024, 0);
    const {firstDayOfMonth, daysInMonth, lastDayOfMonth} = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(1); // January 1, 2024 is a Monday which is index 1 (Sun-Sat indexed from 0-6)
    expect(daysInMonth).toBe(31); // January has 31 days // January has 31 days
    expect(lastDayOfMonth).toBe(3); // January 31, 2024 is a Wednesday which is index 3 (Sun-Sat indexed from 0-6)
});

test('getMonthDetails for February should return {firstDayOfMonth: 4, daysInMonth: 29, lastDayOfMonth: 4}', () => {
    const testDate = new Date(2024, 1); // February 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(4); // February 1, 2024 is a Thursday (index 4, since Sunday is 0)
    expect(daysInMonth).toBe(29); // February 2024 is a leap year, so it has 29 days
    expect(lastDayOfMonth).toBe(4); // February 29, 2024 is a Thursday (index 4)
});

test('getMonthDetails for March should return {firstDayOfMonth: 5, daysInMonth: 31, lastDayOfMonth: 0}', () => {
    const testDate = new Date(2024, 2); // March 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(5); // March 1, 2024 is a Friday (index 5)
    expect(daysInMonth).toBe(31); // March has 31 days
    expect(lastDayOfMonth).toBe(0); // March 31, 2024 is a Sunday (index 0)
});

test('getMonthDetails for April should return {firstDayOfMonth: 1, daysInMonth: 30, lastDayOfMonth: 2}', () => {
    const testDate = new Date(2024, 3); // April 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(1); // April 1, 2024 is a Monday (index 1)
    expect(daysInMonth).toBe(30); // April has 30 days
    expect(lastDayOfMonth).toBe(2); // April 30, 2024 is a Tuesday (index 2)
});

test('getMonthDetails for May should return {firstDayOfMonth: 3, daysInMonth: 31, lastDayOfMonth: 5}', () => {
    const testDate = new Date(2024, 4); // May 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(3); // May 1, 2024 is a Wednesday (index 3)
    expect(daysInMonth).toBe(31); // May has 31 days
    expect(lastDayOfMonth).toBe(5); // May 31, 2024 is a Friday (index 5)
});

test('getMonthDetails for June should return {firstDayOfMonth: 6, daysInMonth: 30, lastDayOfMonth: 0}', () => {
    const testDate = new Date(2024, 5); // June 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(6); // June 1, 2024 is a Saturday (index 6)
    expect(daysInMonth).toBe(30); // June has 30 days
    expect(lastDayOfMonth).toBe(0); // June 30, 2024 is a Sunday (index 0)
});

test('getMonthDetails for July should return {firstDayOfMonth: 1, daysInMonth: 31, lastDayOfMonth: 3}', () => {
    const testDate = new Date(2024, 6); // July 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(1); // July 1, 2024 is a Monday (index 1)
    expect(daysInMonth).toBe(31); // July has 31 days
    expect(lastDayOfMonth).toBe(3); // July 31, 2024 is a Wednesday (index 3)
});

test('getMonthDetails for August should return {firstDayOfMonth: 4, daysInMonth: 31, lastDayOfMonth: 6}', () => {
    const testDate = new Date(2024, 7); // August 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(4); // August 1, 2024 is a Thursday (index  4
    expect(daysInMonth).toBe(31); // August has 31 days
    expect(lastDayOfMonth).toBe(6); // August 31, 2024 is a Saturday (index 6)
});

test('getMonthDetails for September should return {firstDayOfMonth: 0, daysInMonth: 30, lastDayOfMonth: 1}', () => {
    const testDate = new Date(2024, 8); // September 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(0); // September 1, 2024 is a Sunday (index 0)
    expect(daysInMonth).toBe(30); // September has 30 days
    expect(lastDayOfMonth).toBe(1); // September 30, 2024 is a Monday (index 1)
});

test('getMonthDetails for October should return {firstDayOfMonth: 1, daysInMonth: 31, lastDayOfMonth: 4}', () => {
    const testDate = new Date(2024, 9); // October 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(2); // October 1, 2024 is a Tuesday (index 1)
    expect(daysInMonth).toBe(31); // October has 31 days
    expect(lastDayOfMonth).toBe(4); // October 31, 2024 is a Thursday (index 4)
});

test('getMonthDetails for November should return {firstDayOfMonth: 5, daysInMonth: 30, lastDayOfMonth: 6}', () => {
    const testDate = new Date(2024, 10); // November 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(5); // November 1, 2024 is a Friday (index 5)
    expect(daysInMonth).toBe(30); // November has 30 days
    expect(lastDayOfMonth).toBe(6); // November 30, 2024 is a Saturday (index 6)
});

test('getMonthDetails for December should return {firstDayOfMonth: 0, daysInMonth: 31, lastDayOfMonth: 2}', () => {
    const testDate = new Date(2024, 11); // December 2024
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(testDate);
    expect(firstDayOfMonth).toBe(0); // December 1, 2024 is a Sunday (index 0)
    expect(daysInMonth).toBe(31); // December has 31 days
    expect(lastDayOfMonth).toBe(2); // December 31, 2024 is a Tuesday (index 2)
});