import { Component } from '@angular/core';
import { evaluate } from 'mathjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculadora-angular';
  // Valor actual de la pantalla
  currentInput: string = ''; 
  // Indicador de resultado
  hasResult: boolean = false;

  // Función para manejar los clics en los botones
  handleButtonClick(value: string) {
    if (this.hasResult && !isNaN(Number(value))) {
      // Reiniciar la calculadora al presionar un número después de obtener un resultado
      this.resetCalculator(); 
    }

    if (value === '=') {
      this.calculateResult();
    } else if (value === 'reset') {
      this.resetCalculator();
    } else {
      this.addToCurrentInput(value);
    }
  }

  // Agregar elementos al valor actual de la pantalla
  addToCurrentInput(value: string) {
    this.currentInput += value;
    this.hasResult = false; 
  }

  // Calcular el resultado de la expresión actual en la pantalla
  calculateResult() {
    try {
      const expression = this.currentInput.replace(/x/g, '*');
      const result = evaluate(expression);
      this.currentInput = result.toString();
      this.hasResult = true; 
    } catch (error) {
      this.currentInput = 'Error';
    }
  }

  // Reiniciar la calculadora
  resetCalculator() {
    this.currentInput = '';
    this.hasResult = false; 
  }
}