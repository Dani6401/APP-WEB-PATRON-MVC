document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los formularios y otros elementos HTML necesarios
    const addForm = document.getElementById('add-form');
    const deleteForm = document.getElementById('delete-form');
    const updateForm = document.getElementById('update-form');
    const showButton = document.getElementById('show-button');
    const userList = document.getElementById('user-list');

    // Función para cargar usuarios desde la API y mostrarlos en la página
    const fetchUsers = async () => {
        const response = await fetch('/api/users');
        const users = await response.json();

        userList.innerHTML = ''; // Limpiar lista antes de actualizar

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.nombre} ${user.apellido} - ${user.edad} - ${user.email}`;
            userList.appendChild(li);
        });
    };

    // Función para agregar un usuario
    addForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = addForm.querySelector('input[name="nombre"]').value;
        const apellido = addForm.querySelector('input[name="apellido"]').value;
        const edad = addForm.querySelector('input[name="edad"]').value;
        const email = addForm.querySelector('input[name="email"]').value;

        await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, edad, email })
        });

        addForm.reset(); // Limpiar formulario
        fetchUsers(); // Actualizar lista de usuarios
    });

    // Función para eliminar un usuario
    deleteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userId = deleteForm.querySelector('input[name="userId"]').value;

        await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        });

        deleteForm.reset(); // Limpiar formulario
        fetchUsers(); // Actualizar lista de usuarios
    });

    // Función para actualizar un usuario
    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userId = updateForm.querySelector('input[name="userId"]').value;
        const nombre = updateForm.querySelector('input[name="nombre"]').value;
        const apellido = updateForm.querySelector('input[name="apellido"]').value;
        const edad = updateForm.querySelector('input[name="edad"]').value;
        const email = updateForm.querySelector('input[name="email"]').value;

        await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, edad, email })
        });

        updateForm.reset(); // Limpiar formulario
        fetchUsers(); // Actualizar lista de usuarios
    });

    // Función para mostrar todos los usuarios
    showButton.addEventListener('click', fetchUsers);
});
