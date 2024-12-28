    const btns = document.querySelectorAll('.teclado button');
    const display = document.querySelector('div.input');
    const output = document.querySelector('div.output');

    let operation = null;
    let firstNumber = null;
    let secondNumber = null;

    btns.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        const number = button.getAttribute('data-number');
        const value = button.value;
        const op = button.getAttribute('data-op');

        // Lógica para números
        if (number) {
          display.textContent += number;
          if (!operation) {
            // Se a operação ainda não foi definida, acumulamos no primeiro número
            firstNumber = (firstNumber || "") + number;
          } else {
            // Se a operação já foi definida, acumulamos no segundo número
            secondNumber = (secondNumber || "") + number;
          }
        }

        // Lógica para operadores
        else if (op) {
          if (firstNumber && !secondNumber && !operation) {
            display.textContent += ` ${op} `;
            operation = op; // Define a operação atual
          }
        }

        // Lógica para "="
        else if (value === "=") {
            //alert('=')
          if (firstNumber !== null && secondNumber !== null && operation) {
            const num1 = parseFloat(firstNumber);
            const num2 = parseFloat(secondNumber);

            let result;
            switch (operation) {
              case '+':
                result = num1 + num2;
                break;
              case '-':
                result = num1 - num2;
                break;
              case 'x':
                result = num1 * num2;
                break;
              case '/':
                result = num2 !== 0 ? num1 / num2 : "Erro: Divisão por 0";
                break;
            }

            //output.textContent = result;
            display.textContent = result;

            // Reseta os valores para uma nova operação
            firstNumber = result;
            secondNumber = null;
            operation = null;
          }
        }

        // Limpar o display
        else if (value === "C") {
          display.textContent = "";
          output.textContent = "";
          firstNumber = null;
          secondNumber = null;
          operation = null;
        }

        // Backspace
        else if (value === "backspace") {
          display.textContent = display.textContent.slice(0, -1);
          if (secondNumber) {
            secondNumber = secondNumber.slice(0, -1);
          } else if (operation) {
            operation = null;
          } else if (firstNumber) {
            firstNumber = firstNumber.slice(0, -1);
          }
        }
      });
    });

