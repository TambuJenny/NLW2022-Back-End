export function ConvertHourStringToMinute (hourString: string)
{
    const [hours, minutes] = hourString.split(':').map(Number)

    const hoursToMinutes = (hours * 60) + minutes;

    return hoursToMinutes;
}
