const displayPercentCurrency = (num) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: "percent",
        minimumFractionDigits: 0
    });

    return formatter.format(num);
}

export default displayPercentCurrency;
