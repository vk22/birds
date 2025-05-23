export default ({ app }, inject) => {
  inject('numberWithSpaces', x => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
      return 0;
    }
  })
}