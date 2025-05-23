class SidebarHandler {
    constructor() {
        this.sidebar = document.querySelector('aside');
        this.menuButton = document.querySelector('header button');
        this.collapseButton = document.querySelector('#sidebar-collapse');
        
        // Initialize default state
        this.loadState();
        
        // Add event listeners
        this.menuButton.addEventListener('click', () => this.toggleMenu());
        this.collapseButton.addEventListener('click', () => this.toggleCollapse());
    }

    loadState() {
        // Default state: expanded and visible
        this.setState({ collapsed: false, hidden: false });
    }

    // Save state to localStorage
    saveState(state) {
        localStorage.setItem('sidebarState', JSON.stringify(state));
    }

    // Set sidebar state
    setState({ collapsed = false, hidden = false }) {
        // Remove all state classes
        this.sidebar.classList.remove('collapsed', 'hidden', 'expanded');

        // Add appropriate state class
        if (collapsed) {
            this.sidebar.classList.add('collapsed');
        } else if (hidden) {
            this.sidebar.classList.add('hidden');
        } else {
            this.sidebar.classList.add('expanded');
        }

        // Update button text/icon
        this.collapseButton.querySelector('.label').textContent =
            collapsed ? 'Expand' : 'Collapse';
        this.collapseButton.querySelector('#collapse-icon').textContent =
            collapsed ? '▶' : '◀';

        // Save state
        this.saveState({ collapsed, hidden });
    }

    // Toggle collapse state
    toggleCollapse() {
        // Get current state
        const currentState = JSON.parse(localStorage.getItem('sidebarState')) || 
            { collapsed: false, hidden: false };
        
        // Update state
        this.setState({ 
            collapsed: !currentState.collapsed, 
            hidden: false 
        });
    }

    // Toggle menu visibility
    toggleMenu() {
        // Get current state
        const currentState = JSON.parse(localStorage.getItem('sidebarState')) || 
            { collapsed: false, hidden: false };
        
        // Update state
        this.setState({
            collapsed: false,
            hidden: !currentState.hidden
        });
    }
}

// Initialize sidebar handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SidebarHandler();
});