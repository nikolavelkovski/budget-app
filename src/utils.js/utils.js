
export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

export const getProgressBarVariant = (max,amount) => {
    const ratio = amount/max;
     if(ratio < 0.5) return 'primary';
     if(ratio < 0.8) return 'warning';
     return 'danger'
}