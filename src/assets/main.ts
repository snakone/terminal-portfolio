let started = false;

const wrapper = document.getElementById("wrapper");

interface Command {
  name: string;
  description: string;
  execute: () => string[];
}

const welcome = document.getElementById("welcome");
const ran = Math.max(1, Math.random() * 999);

function start(): void {
  const app = new TerminalPortfolio();

  setTimeout(() => {
    started = true;
    app.input.disabled = false;
    app.input.focus();
    app.setupEventListeners();
}, 5500);
}

if (welcome) {
  welcome.textContent = 'SISTEMA DE PORTFOLIO TURBO-FX-4000 - Bienvenido Usuario nº ' + String(Math.round(ran));
}
        
class TerminalPortfolio {
  private output: HTMLElement;
  public input: HTMLInputElement;
  private floatingMenu: HTMLElement;
  private commands: Map<string, Command>;
  private commandHistory: string[] = [];
  private historyIndex: number = -1;

  constructor() {
    this.output = document.getElementById('output')!;
    this.input = document.getElementById('commandInput')! as HTMLInputElement;
    this.input.disabled = true;
    this.floatingMenu = document.getElementById('floatingMenu')!;
    this.commands = new Map();
    this.initializeCommands();
  }

  private initializeCommands(): void {
    this.commands = new Map([
      ['help', {
        name: 'help',
        description: 'Muestra comandos disponibles',
        execute: () => [
          '<div class="gap"></div>',
          '<span class="command-help">COMANDOS DISPONIBLES:</span>',
          '═════════════════════════════════',
          '<span class="success">help</span> - Muestra esta ayuda.',
          '<span class="success">about</span> - Información personal.',
          '<span class="success">skills</span> - Habilidades técnicas.',
          '<span class="success">projects</span> - Proyectos realizados.',
          '<span class="success">contact</span> - Información de contacto.',
          '<span class="success">clear/cls</span> - Limpia la terminal.',
          '<span class="success">menu</span> - Abre menú del sistema.',
          '═════════════════════════════════'
        ]
      }],
      ['about', {
        name: 'about',
        description: 'Información personal',
        execute: () => [
          '<div class="gap"></div>',
          '<span class="command-help">INFORMACIÓN PERSONAL</span>',
          '═════════════════════════════════',
          '<span class="info">Sujeto:</span> <b>Sergio Martínez Pérez.',
          '<span class="info">Profesión:</span> <b>Ingeniero/Desarrollador de Software</b>.',
          '<span class="info">Experiencia:</span> <b>Primera web 2003. Experiencia activa profesionalmente desde 2019.',
          '<span class="info">Ubicación:</span> <b>Barcelona, España</b>.',
          '<br>',
          '<div class="gap"></div>',
          '<span class="command-help">DESCRIPCIÓN</span>',
          '<div class="gap"></div>',
          '<span class="success">Apasionado por crear soluciones innovadoras usando tecnologías modernas. Especializado en desarrollo web y todo tipo de aplicaciones usando <a href="https://angular.dev/" target="blank">Angular</a> en cualquiera de sus versiones.</span>',
          '<div class="gap"></div>',
          '<span class="success">Curiosidad, compromiso, fiabilidad son algunas de sus cualidades. Según los datos, ha entregado valor directo y sin demora durante <b>6 años</b> consecutivos. Ha trabajado en grandes compañias bajo entornos <a href="https://learn.microsoft.com/es-es/compliance/regulatory/offering-gxp" target="blank">GxP</a> y se ha enfrentado a despliegues en <b>producción</b> en varias ocasiones garantizando calidad y cumplimiento.</span>',
          '<div class="gap"></div>',
          '<span class="success">Nuestros estudios indican una comunicación efectiva con otros módulos del <b>equipo</b> y una visión enfocada en el producto y especialmente en el <b>cliente</b>. Protocolos de colaboración ejecutados con éxito en entornos de alta exigencia. Dispone de módulos de expansión libres para aumentar su potencia.</span>',
          '<div class="gap"></div>',
          '<div class="gap"></div>',
          '<span class="success">- Nivel de adaptabilidad: <b>ÓPTIMO</b></span>',
          '<span class="success">- Disponibilidad: <b>2 SEMANAS</b></span>',
          '<span class="success">- Teletrabajo: <b>COMPATIBLE</b></span>',
          '<div class="gap"></div>',
          '═════════════════════════════════'
        ]
      }],
      ['skills', {
        name: 'skills',
        description: 'Habilidades técnicas',
        execute: () => [
          '<div class="gap"></div>',
          '<span class="command-help">HABILIDADES TÉCNICAS</span>',
          '═════════════════════════════════',
          '<b>Frontend</b>:',
          '  • <span class="success">TypeScript/JavaScript</span>',
          '  • <span class="success">Angular, React Native, Ionic, Astro</span>',
          '  • <span class="success">HTML5, CSS3, SASS, RXJS, NGRX, TSX</span>',
          '<div class="gap"></div>',
          '<b>Backend</b>:',
          '  • <span class="success">Node.js, NPM</span>',
          '  • <span class="success">Express, OAuth, JWT, Socket.io</span>',
          '  • <span class="success">MongoDB, SQLite</span>',
          '<div class="gap"></div>',
          '<b>DevOps</b>:',
          '  • <span class="success">Jenkins, Openshift, Netlify, Render</span>',
          '  • <span class="success">Git, Bitbucket, Jira, Teams</span>',
          '  • <span class="success">Windows, MacOS</span>',
          '<div class="gap"></div>',
          '═════════════════════════════════'
        ]
      }],
      ['projects', {
        name: 'projects',
        description: 'Proyectos realizados',
        execute: () => [
          '<div class="gap"></div>',
          '<span class="command-help">PROYECTOS DESTACADOS</span>',
          '═════════════════════════════════',
          '<b>[1] Mi Generali</b>',
          '<span class="success">Tech: Ionic, Java, SQL, Android/IOS</span>',
          '<span class="success">Descripción: Aplicación pública de la aseguradora <a href="https://www.generali.es/" target="blank">Generali</a> en el apartado de “Siniestros”, con corrección de errores, optimización de formularios, nuevas implementaciones y soporte desde un centro especializado de alto rendimiento brindando a los clientes una experiencia más simple, confiable y eficiente.</span>',
          '<div class="gap"></div>',
          '<b>[2] Generali Tarjeta Visita</b>',
          '<span class="success">Tech: Angular, Java, SQL</span>',
          '<span class="success">Descripción: Página web pública para mostrar información sobre Agentes de la aseguradora <a href="https://www.generali.es/" target="blank">Generali</a>. Funciona como una tarjeta personal virtual. El identificador se comparte por la URL. <a href="https://www.generali.es/webapps/agentCard/#/home/foo" target="blank">Tarjeta Visita</a>.</span>',
          '<div class="gap"></div>',
          '<b>[3] App Warehouse</b>',
          '<span class="success">Tech: Angular, Python, Django</span>',
          '<span class="success">Descripción:  Aplicación interna para <a href="https://www.boehringer-ingelheim.com/es" target="blank">Boehringer Ingelheim</a> diseñada como índice central de referencia de una de sus delegaciones de investigación, con un <b>CRUD</b> para administrar la información de las aplicaciones y ofrecer a los usuarios un acceso rápido, organizado y eficiente a sus consultas, incluyendo para cada aplicación su información detallada, imágenes, enlaces directos y recursos asociados.</span>',
          '<div class="gap"></div>',
          '<b>[4] LOKI - Integration Studio</b>',
          '<span class="success">Tech: Angular, Node.js, Lua, Inmation, MongoDB</span>',
          '<span class="success">Descripción: Aplicación interna para <a href="https://www.boehringer-ingelheim.com/es" target="blank">Boehringer Ingelheim</a>, desarrollada bajo políticas <a href="https://learn.microsoft.com/es-es/compliance/regulatory/offering-gxp" target="blank">GxP</a> con el objetivo de automatizar procesos previamente manuales, permitiendo la integración y consulta de datos, gestión de usuarios, roles e idiomas, así como compatibilidad con hojas de cálculo <b>Excel</b> para la configuración de sistemas y fuentes de datos aplicadas a <b>procesos automáticos</b> de producción; un sistema auditado que incorpora documentación, registro, firmas electrónicas y generación de reportes en PDF, respaldado por un equipo multidisciplinario de UI/UX, especialistas, integradores, DevOps, QA, Power BI... que escucha activamente a los <b>usuarios</b>, desarrolla soluciones a medida mediante una metodología ágil, asegura el seguimiento de tareas y resultados, y fomenta la mejora continua a través del aprendizaje constante.</span>',
          '<div class="gap"></div>',
          '<div class="gap"></div>',
          '<span class="command-help">PROYECTOS PERSONALES</span>',
          '<b>[1] The Formatted Blog</b>',
          '<span class="success">Tech: Angular, Node.js, MongoDB</span>',
          '═════════════════════════════════'
        ]
      }],
      ['contact', {
        name: 'contact',
        description: 'Información de contacto',
        execute: () => [
          '<span class="highlight">INFORMACIÓN DE CONTACTO</span>',
          '═════════════════════════════════',
          '<span class="success">Email:</span> tu.email@ejemplo.com',
          '<span class="success">LinkedIn:</span> linkedin.com/in/tuusuario',
          '<span class="success">GitHub:</span> github.com/tuusuario',
          '<span class="success">Portfolio:</span> tu-dominio.com',
          '',
          '<span class="info">¡Conectemos!</span>',
          'Siempre abierto a nuevas oportunidades',
          'y colaboraciones interesantes.',
          '═════════════════════════════════'
        ]
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
      }]
    ]);
  }

  public setupEventListeners(): void {
    if (!started) return;
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
    if (!started) return;
    const commandText = this.input.value.trim();
    if (!commandText) return;

    this.addToOutput(`<div class="gap"></div><span class="terminal-prompt">user@portfolio:~$</span> <span class="text">${commandText}</span>`);

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
    this.scrollToBottom(command);
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

  private scrollToBottom(command: Command | undefined): void {
    if (command?.name === 'projects') {
      return;
    }

    if (wrapper) {
      wrapper.scrollTop = this.output.scrollHeight;
    }
  }
}

// Inicializar el portfolio cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    start();
});