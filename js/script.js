const btns = document.querySelectorAll('.teclado button');
const display = document.querySelector('div.input');

btns.forEach(button => {
    button.addEventListener('click', (event) => {
        // Previne o comportamento padrão de recarregar a página
        event.preventDefault();

        // Obtém o número ou valor do botão
        const number = button.getAttribute('data-number');
        const value = button.value;

        // Exibe números no display
        if (number) {
            display.textContent += number;
        }

        // Lida com botões específicos
        if (value === "C") {
            display.textContent = ""; // Limpa o display
        } else if (value === "backspace") {
            display.textContent = display.textContent.slice(0, -1); // Remove o último caractere
        }
    });
});
