import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

export const timeAgo = new TimeAgo('en-US')

export const baseURL = 'http://localhost:3000';