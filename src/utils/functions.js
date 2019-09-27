export function arrayMove (arr, oldIndex, newIndex) {
  if (newIndex === -1) return
  if (newIndex >= arr.length) return

  while (oldIndex < 0) {
    oldIndex += arr.length
  }
  while (newIndex < 0) {
    newIndex += arr.length
  }
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length
    while ((k--) + 1) {
      arr.push(undefined)
    }
  }

  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
}
