export const formatDate = (date) => {
  date = new Date(date)
  return (date.getMonth() + 1) + '/' + 
    date.getDate() + '/' +   
    date.getFullYear() + ' ' + 
    date.getHours() + ':' + 
    date.getMinutes();
}