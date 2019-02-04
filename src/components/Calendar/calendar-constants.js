import { northwesternRichBlack10 } from 'util/colors';
import { getHours } from './calendar-helpers';

export const HOURS = getHours();
export const DOWS = ['Mo', 'Tu', 'We', 'Th', 'Fr'];
export const columnBorderStyle = `1px solid ${northwesternRichBlack10}`;
export const dowColumnHeaderHeight = 24;
export const cellMinHeight = 50;
export const columnHeight = `calc(100% - ${dowColumnHeaderHeight}px)`;
// cellMinHeight + 1 for border height
export const columnMinHeight = (cellMinHeight + 1) * HOURS.length + dowColumnHeaderHeight;
