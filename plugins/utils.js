export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('formatDate', date => {
    var date = new Date(date)
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    var yyyy = date.getFullYear();
    var time = date.toLocaleTimeString();
    return (dd + "." + MM + "." + yyyy + " " + time );
  })
  
}