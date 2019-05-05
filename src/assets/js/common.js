export function timeFormat (str) {
  var oDate = new Date(Number(str))
  var oYear = oDate.getFullYear()
  var oMonth = oDate.getMonth() + 1
  var oDay = oDate.getDate()
  return `${oYear}-${getZf(oMonth)}-${getZf(oDay)}`
}
function getZf (num) {
  return num < 10 ? '0' + num : num
}
