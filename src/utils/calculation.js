function conversion (params) {
  if (params > 1024) {
    return (params / 1024 / 1024).toFixed(2)
  } else {
    return params
  }
}

export { conversion }
