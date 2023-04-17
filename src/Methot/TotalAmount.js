function TotalAmount(data) {
  return data.reduce((ac, el) => {
    return (ac = ac + el.quantity * Number(el.price));
  }, 0);
}
export default TotalAmount;
