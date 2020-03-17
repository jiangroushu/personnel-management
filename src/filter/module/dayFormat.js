import dayjs from 'dayjs'

function dayFormat(day, format) {
    return dayjs(day).format(format)
}

export default dayFormat
