import { TerminalPortfolio } from "./src/const/classes";

const app = new TerminalPortfolio();
const LOAD_TIME = 5500;
const wrapper = document.getElementById("wrapper");


export interface Command {
  name: string;
  description: string;
  execute: () => string[];
}

function init(): void {
  setTitle();

  setTimeout(() => {
    app.start();
    app.setupEventListeners();
  }, LOAD_TIME);
}

export function scrollToBottom(command: Command | undefined): void {
  if (command?.name === 'projects') {
    return;
  }

  if (wrapper) {
    wrapper.scrollTop = app.output.scrollHeight;
  }
}

function setTitle(): void {
  const welcome = document.getElementById("welcome");
  const ran = Math.max(1, Math.random() * 999);

  if (welcome) {
    welcome.textContent = 'SISTEMA DE PORTFOLIO TURBO-FX-4000 - Bienvenido Usuario nº ' + String(Math.round(ran));
  }
}

document.addEventListener('DOMContentLoaded', () => init());