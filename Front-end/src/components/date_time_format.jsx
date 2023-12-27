export function formatTime(dateTime) {
    const date = new Date(dateTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
export function formatDate(dateTime) {
    const date = new Date(dateTime);
    const day = date.getDate();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
// function eventTypeIconMap {
//     sprintRunning: sprintRunningIcon,
//     javelinThrowing: javelinThrowingIcon,
//     discusThrow: discusThrowIcon,
//     longJump: longJumpIcon
//   };