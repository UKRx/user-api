CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    location VARCHAR(100)
);

CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE ProductVariations (
    variation_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    variation_type VARCHAR(100), -- Example: color, size, etc.
    variation_value VARCHAR(100), -- Example: Red, Medium, etc.
    UNIQUE(product_id, variation_type, variation_value),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE ShoppingCart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE CartItems (
    cart_item_id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT,
    product_id INT,
    quantity INT,
    variation_id INT,
    FOREIGN KEY (cart_id) REFERENCES ShoppingCart(cart_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (variation_id) REFERENCES ProductVariations(variation_id)
);
