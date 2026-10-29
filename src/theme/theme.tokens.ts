const Tokens = {
    fonts: {
        display: "'Instrument Serif', Georgia, 'Times New Roman', serif",
        body: "'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif"
    },
    radius: {
        sm: '6px',
        md: '10px',
        lg: '16px'
    },
    // Sombras com tom quente, seguindo o fundo da página
    shadow: {
        sm: '0 1px 2px rgba(42, 33, 22, 0.06)',
        md: '0 1px 2px rgba(42, 33, 22, 0.06), 0 12px 32px -16px rgba(42, 33, 22, 0.22)',
        lg: '0 24px 64px -24px rgba(42, 33, 22, 0.35)'
    },
    zIndex: {
        header: 10,
        cart: 30,
        loading: 40,
        skipLink: 50
    },
    easing: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)'
    },
    container: '1360px',
    breakpoints: {
        sm: '560px',
        md: '768px',
        lg: '1080px'
    }
}

export default Tokens
