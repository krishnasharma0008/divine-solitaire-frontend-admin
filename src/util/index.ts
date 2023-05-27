const formatByCurrency = (val: number): string =>
  val.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

export { formatByCurrency };
