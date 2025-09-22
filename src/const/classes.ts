import { scrollToBottom, type Command } from "../../main";
import { HELP_COMMANDS, ABOUT_COMMANDS, SKILLS_COMMANDS, PROJECTS_COMMANDS, CONTACT_COMMANDS } from "./commands";
import { portfolioPrompt } from "./functions.const";

export class TerminalPortfolio {
  public output: HTMLElement;
  public input: HTMLInputElement;
  private floatingMenu: HTMLElement;
  private commands: Map<string, Command>;
  private commandHistory: string[] = [];
  private historyIndex: number = -1;
  private started = false;

  constructor() {
    this.output = document.getElementById('output')!;
    this.input = document.getElementById('commandInput')! as HTMLInputElement;
    this.input.disabled = true;
    this.floatingMenu = document.getElementById('floatingMenu')!;
    this.commands = this.initializeCommands();
  }

  private initializeCommands(): Map<string, Command> {
    return new Map([
      ['help', {
        name: 'help',
        description: 'Muestra comandos disponibles',
        execute: () => HELP_COMMANDS
      }],
      ['h', {
        name: 'help',
        description: 'Muestra comandos disponibles',
        execute: () => HELP_COMMANDS
      }],
      ['about', {
        name: 'about',
        description: 'Información personal',
        execute: () => ABOUT_COMMANDS
      }],
      ['a', {
        name: 'about',
        description: 'Información personal',
        execute: () => ABOUT_COMMANDS
      }],
      ['skills', {
        name: 'skills',
        description: 'Habilidades técnicas',
        execute: () => SKILLS_COMMANDS
      }],
      ['s', {
        name: 'skills',
        description: 'Habilidades técnicas',
        execute: () => SKILLS_COMMANDS
      }],
      ['projects', {
        name: 'projects',
        description: 'Proyectos realizados',
        execute: () => PROJECTS_COMMANDS
      }],
      ['p', {
        name: 'projects',
        description: 'Proyectos realizados',
        execute: () => PROJECTS_COMMANDS
      }],
      ['contact', {
        name: 'contact',
        description: 'Información de contacto',
        execute: () => CONTACT_COMMANDS
      }],
      ['c', {
        name: 'contact',
        description: 'Información de contacto',
        execute: () => CONTACT_COMMANDS
      }],
      ['clear', {
          name: 'clear',
          description: 'Limpia la terminal',
          execute: () => {
            this.output.innerHTML = '';
            return [`<span class="info">Escribe <b>'help'</b> para ver comandos disponibles.</span>`];
          }
      }],
      ['cls', {
          name: 'clear',
          description: 'Limpia la terminal',
          execute: () => {
            this.output.innerHTML = '';
            return [`<span class="info">Escribe <b>'help'</b> para ver comandos disponibles.</span>`];
          }
      }],
      ['menu', {
          name: 'menu',
          description: 'Abre menú del sistema',
          execute: () => {
            this.showFloatingMenu();
            return ['<div class="gap"></div><span class="success">Menú del sistema abierto.</span>'];
          }
      }],
      ['m', {
          name: 'menu',
          description: 'Abre menú del sistema',
          execute: () => {
            this.showFloatingMenu();
            return ['<div class="gap"></div><span class="success">Menú del sistema abierto.</span>'];
          }
      }]
    ]);
  }

  public start(): void {
    this.started = true;
    this.input.disabled = false;
    this.input.focus();
  }

  public setupEventListeners(): void {
    if (!this.started) return;
    this.input.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'Enter':
          e.preventDefault();
          this.executeCommand();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.navigateHistory('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.navigateHistory('down');
          break;
      }
    });

    // ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.floatingMenu.className.includes('active')) {
        this.hideFloatingMenu();
      }
    });

    document.addEventListener('click', () => this.input.focus());

    document.addEventListener('click', (e) => {
      if (!this.floatingMenu.contains(e.target as Node)) {
          this.hideFloatingMenu();
      }
    });
  }

  private executeCommand(): void {
    if (!this.started) return;
    const commandText = this.input.value.trim();
    if (!commandText) return;

    this.addToOutput(portfolioPrompt(commandText));

    this.commandHistory.push(commandText);
    this.historyIndex = this.commandHistory.length;

    const command = this.commands.get(commandText.toLowerCase());
    if (command) {
      const result = command.execute();
      result.forEach(line => this.addToOutput(line));
    } else {
      this.addToOutput(`<span class="error">bash: <b>'${commandText}'</b>: comando no encontrado.</span>`);
      this.addToOutput(`<span class="info">Escribe <b>'help'</b> para ver comandos disponibles.</span>`);
    }

    this.input.value = '';
    scrollToBottom(command);
  }

  private addToOutput(content: string): void {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = content;
    this.output.appendChild(line);
  }

  private navigateHistory(direction: 'up' | 'down'): void {
    if (direction === 'up' && this.historyIndex > 0) {
      this.historyIndex--;
      this.input.value = this.commandHistory[this.historyIndex];
    } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
      this.historyIndex++;
      this.input.value = this.commandHistory[this.historyIndex];
    } else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {
      this.historyIndex = this.commandHistory.length;
      this.input.value = '';
    }
  }

  private showFloatingMenu(): void {
    this.input.disabled = true;
    this.floatingMenu.classList.add('active');
  }

  private hideFloatingMenu(): void {
    this.floatingMenu.classList.remove('active');
    this.input.disabled = false;
    this.input.focus(); 
  }
}