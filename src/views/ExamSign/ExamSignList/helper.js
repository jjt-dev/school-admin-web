export const formatCascaderCoaches = (coaches) => {
  return coaches.map((item) => ({
    value: item.id,
    label: item.username,
    isLeaf: false,
  }))
}
