function TotalQuantity(data) {
  return data.reduce((ac, el) => {
    return (ac = ac + el.quantity);
  }, 0);
}
export default TotalQuantity;
