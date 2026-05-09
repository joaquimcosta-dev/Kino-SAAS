document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('orderSearch');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tableRows = document.querySelectorAll('#ordersTable tbody tr');
    const statusItems = document.querySelectorAll('.status-menu li');

    // Tab Filtering Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            tableRows.forEach(row => {
                const type = row.getAttribute('data-type');
                if (filter === 'todos' || type === filter) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        tableRows.forEach(row => {
            const text = row.innerText.toLowerCase();
            if (text.includes(term)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Status Selection Logic
    statusItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const newStatus = e.target.innerText;
            const dropdown = e.target.closest('.status-dropdown');
            const btn = dropdown.querySelector('.status-btn');
            
            // Update button text but keep the arrow
            const isUp = btn.querySelector('.arrow-up');
            btn.innerHTML = `${newStatus} <span class="${isUp ? 'arrow-up' : 'arrow-down'}"></span>`;
            
            // Optional: add visual feedback
            console.log(`Status changed to: ${newStatus}`);
            
            // Close menu manually if needed (though :hover handles it in CSS)
            const menu = dropdown.querySelector('.status-menu');
            menu.style.display = 'none';
            setTimeout(() => menu.style.display = '', 100);
        });
    });
});
