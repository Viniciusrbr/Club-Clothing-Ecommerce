const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

const formatPrice = (value: number) => priceFormatter.format(value)

export default formatPrice
