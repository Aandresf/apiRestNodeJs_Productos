// controller/clientsController.js

// Expresión regular para validar el formato de un correo electrónico
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

// Arreglo en memoria para almacenar clientes
let clients = [];
let nextId = 1;

// GET /api/clients - Obtener todos los clientes
exports.getAllClientsActive = (req, res) => {
    // Filtramos los clientes eliminados
    let clientsActive = clients.filter(c => c.status != "delete");

    res.json(clientsActive);
};

// GET /api/clients/delete - Obtener todos los clientes
exports.getAllClientsDelete = (req, res) => {
    // Filtramos los clientes activos
    let clientsDelete = clients.filter(c => c.status != "active");

    res.json(clientsDelete);
};

// GET /api/clients/:id - Obtener un cliente por su ID
exports.getClientById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const client = clients.find(c => c.id === id);
    
    if (client.status == "delete" || !client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(client);
};

// POST /api/clients - Crear un nuevo cliente
exports.createClient = (req, res) => {
    const { name, lastName, phone, email } = req.body;
    
    if (!name || !lastName || !phone || !email) {
        return res.status(400).json({ message: 'Todos los datos son requeridos' });
    }
    if (!isValidEmail(email)){
        return res.status(400).json({ message: 'Formato de correo electronico incorrecto' });
    }

    const newClient = {
        id: nextId++,
        name,
        lastName,
        phone,
        email,
        status : "active"
    };

    clients.push(newClient);
    res.status(201).json(newClient);
};

// PUT /api/clients/:id - Actualizar un cliente existente
exports.updateClient = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, lastName, phone, email } = req.body;
    const client = clients.find(c => c.id === id);
    
    if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    if (email !== undefined && !isValidEmail(email)){
        return res.status(400).json({ message: 'Formato de correo electronico incorrecto' });
    }

    // Actualizar propiedades solo si se envían en el body
    if (name !== undefined) client.name = name;
    if (lastName !== undefined) client.lastName = lastName;
    if (phone !== undefined) client.phone = phone;
    if (email !== undefined) client.email = email;
    
    // reactivamos el estado si el cliente fue previamente eliminado
    client.status = "active"

    res.json(client);
};

// DELETE /api/clients/:id - Eliminar un cliente
exports.deleteClient = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const client = clients.find(c => c.id === id);
    
    if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    
    client.status = "delete"
    
    res.json({ message: 'Cliente eliminado', client });
};

